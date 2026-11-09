// Live team standings, read straight from the MCC Public Roster.
// Plain static JS (no YAML front matter, so Jekyll copies it untouched).
//
// Publishing = pulling the grading. The page asks Google's public
// visualization endpoint for the Public Roster each time it is opened, so a
// team appears here as soon as its grade is pulled onto the Exams tab.
//
// Privacy: only team-level numbers are requested. The Roster query is run
// server-side by Google with a column list and a WHERE clause, so student
// names never reach the browser (they are only used, on Google's side, to
// leave out the club's "TEST - ..." accounts). Grading comments are not on
// the Public Roster at all (they live in the coordinator-only Regional
// Pacing file).
//
// Team names: a team is shown, in bold, by its own chosen name (Roster
// column TeamName, e.g. T205 "The Dragon Mathletes"); its ID appears only
// when it has no name of its own (blank, or the same as the ID). The column
// is optional, so the page still works on an older roster (IDs only).
//
// Ranking, within each level: chapters passed (more is better), then points
// = the sum of the passing scores (equal on both = same rank); teams that
// have not passed a chapter yet are listed without a rank.
//
// First-attempt measures (Nghia, 9 Nov 2026). Only Attempt 1 of chapters 1+
// counts: retakes are a second paper on material already seen, and entrance
// tests (chapter 0) are left out. They are shown, never used for ranking:
//   1st-try avg    mean Total of the first-attempt papers (a missed test
//                  counts in 1st-try passes but has no score to average)
//   1st-try passes first attempts passed / first attempts graded
//   Perfect problems  problems with full marks / problems received on those
//                  papers, with the % (one column, so the table fits the page)
//   Hard-problem % points earned / points available on each paper's hardest
//                  problems (those worth 20+ points: the 20-pt problems on
//                  T1/T3 papers, the 25-pt ones on T2/T4)
// Full marks per problem differ from paper to paper, so they come from
// window.MCC_PAPER_POINTS (assets/js/paper-points.js, generated from the
// compiled papers by tools/build-paper-points.js). A paper missing from that
// table, or one whose P 1-P 6 are not all filled in, still counts for the
// average and the pass rate but not for the per-problem measures.
//
// Exposes window.MCCStandings = { compute, render } for testing.

(function (global) {
  "use strict";

  var ROSTER_ID = "1m_CzWRfQxUt7puw1mVBqAZCpm1zvYDrxievSJXKGGFI";
  var PUBLIC_ROSTER_URL = "https://docs.google.com/spreadsheets/d/" + ROSTER_ID + "/edit?usp=sharing";

  // ---- data access -------------------------------------------------------

  function gviz(sheet, tq) {
    var url = "https://docs.google.com/spreadsheets/d/" + ROSTER_ID +
      "/gviz/tq?tqx=out:json&headers=1&sheet=" + encodeURIComponent(sheet) +
      (tq ? "&tq=" + encodeURIComponent(tq) : "");
    return fetch(url, { credentials: "omit" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    }).then(function (text) {
      var json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
      if (json.status !== "ok") throw new Error("query failed");
      return json.table;
    });
  }

  // Column letter for each header label, from a zero-row query.
  function columnIds(sheet) {
    return gviz(sheet, "select * limit 0").then(function (t) {
      var ids = {};
      t.cols.forEach(function (c) { if (c.label) ids[c.label.trim()] = c.id; });
      return ids;
    });
  }

  function need(ids, labels, sheet) {
    labels.forEach(function (l) {
      if (!ids[l]) throw new Error('column "' + l + '" not found on ' + sheet);
    });
  }

  // gviz "Date(2026,8,28,10,0,0)" -> Date
  function parseDate(v) {
    if (v instanceof Date) return v;
    var m = /^Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+),(\d+))?\)$/.exec(String(v || ""));
    if (!m) return null;
    return new Date(+m[1], +m[2], +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
  }

  function cell(row, i) { var c = row.c[i]; return c ? c.v : null; }

  function load() {
    return Promise.all([columnIds("Roster"), columnIds("Exams")]).then(function (res) {
      var r = res[0], e = res[1];
      need(r, ["FullName", "TeamID", "Level", "Status"], "Roster");
      need(e, ["TeamID", "Chapter", "Attempt", "Total", "Result", "GradedUTC"], "Exams");
      var pLabels = ["P 1", "P 2", "P 3", "P 4", "P 5", "P 6"];
      // Optional columns: without them the page still shows the ranking.
      var extra = [e.Level || null].concat(pLabels.map(function (l) { return e[l] || null; }));
      var rosterCols = [r.TeamID, r.Level, r.Status];
      if (r.TeamName) rosterCols.push(r.TeamName);
      var rosterQ = "select " + rosterCols.join(", ") +
        " where " + r.TeamID + " is not null and not " + r.FullName + " starts with 'TEST'";
      var examsQ = "select " + [e.TeamID, e.Chapter, e.Attempt, e.Total, e.Result, e.GradedUTC]
        .concat(extra.filter(function (c) { return c; })).join(", ") +
        " where " + e.Result + " = 'Pass' or " + e.Result + " = 'Fail'";
      return Promise.all([gviz("Roster", rosterQ), gviz("Exams", examsQ), Promise.resolve(extra)]);
    }).then(function (tables) {
      var extra = tables[2];
      var teams = tables[0].rows.map(function (row) {
        return { teamId: String(cell(row, 0)).trim(), level: Number(cell(row, 1)) || 0,
          status: String(cell(row, 2) || "").trim().toLowerCase(),
          teamName: row.c.length > 3 ? String(cell(row, 3) || "").trim() : "" };
      });
      var exams = tables[1].rows.map(function (row) {
        var x = { teamId: String(cell(row, 0)).trim(), chapter: Number(cell(row, 1)) || 0,
          attempt: Number(cell(row, 2)) || 1, total: Number(cell(row, 3)),
          result: String(cell(row, 4)), graded: parseDate(cell(row, 5)), level: null, p: [] };
        var i = 6;
        if (extra[0]) { x.level = Number(cell(row, i)) || null; i++; }
        extra.slice(1).forEach(function (col) {
          if (!col) { x.p.push(null); return; }
          var v = cell(row, i++);
          x.p.push(v === null || v === "" || isNaN(Number(v)) ? null : Number(v));
        });
        return x;
      });
      return { teams: teams, exams: exams };
    });
  }

  // ---- pure computation ----------------------------------------------------

  // teams: [{teamId, level, status, teamName}] (one per student row is fine)
  // exams: [{teamId, chapter, attempt, total, result, graded}]
  // -> [{level, maxChapter, rows: [{rank, teamId, passed, points, attempts,
  //      chapters: {n: {score, passed}}, latest}]}], levels ascending
  function paperPoints(level, chapter, attempt) {
    var table = global.MCC_PAPER_POINTS || {};
    return table[level + "-" + chapter + "-" + attempt] || null;
  }

  function newFirst() {
    return { graded: 0, passed: 0, scored: 0, totalSum: 0, received: 0, perfect: 0, hardAvail: 0, hardEarned: 0 };
  }

  // One first-attempt paper into a team's first-attempt measures.
  // A missed test (Fail, Total 0, no problem scores) is a used attempt: it
  // counts as a first attempt not passed, but there is no paper to average.
  function addFirstAttempt(f, x, level, missing) {
    f.graded++;
    if (x.result === "Pass") f.passed++;
    var missed = x.total === 0 && (!x.p || x.p.every(function (v) { return v === null; }));
    if (missed) return;
    f.scored++;
    f.totalSum += x.total;
    var max = paperPoints(x.level || level, x.chapter, x.attempt);
    if (!max && missing && x.p && x.p.some(function (v) { return v !== null; })) {
      missing["L" + (x.level || level) + "-C" + x.chapter + "-A" + x.attempt] = true;
    }
    if (!max || !x.p || x.p.length !== 6 || x.p.some(function (v) { return v === null; })) return;
    for (var k = 0; k < 6; k++) {
      f.received++;
      if (x.p[k] >= max[k]) f.perfect++;
      if (max[k] >= 20) { f.hardAvail += max[k]; f.hardEarned += Math.min(x.p[k], max[k]); }
    }
  }

  function compute(teams, exams) {
    var byTeam = {}, missing = {};
    teams.forEach(function (t) {
      if (!t.teamId || (t.status && t.status !== "active")) return;
      if (!byTeam[t.teamId]) {
        byTeam[t.teamId] = { teamId: t.teamId, teamName: "", level: t.level, passed: 0, points: 0,
          attempts: 0, chapters: {}, latest: null, first: newFirst() };
      }
      if (t.teamName && !byTeam[t.teamId].teamName &&
          t.teamName.toLowerCase() !== t.teamId.toLowerCase()) {
        byTeam[t.teamId].teamName = t.teamName;
      }
    });
    exams.forEach(function (x) {
      var t = byTeam[x.teamId];
      if (!t || !x.chapter || isNaN(x.total)) return;
      t.attempts++;
      if (x.attempt === 1 && x.chapter >= 1) addFirstAttempt(t.first, x, t.level, missing);
      var ch = t.chapters[x.chapter] || (t.chapters[x.chapter] = { score: null, passed: false, best: null });
      if (ch.best === null || x.total > ch.best) ch.best = x.total;
      if (x.result === "Pass" && (!ch.passed || x.total > ch.score)) { ch.passed = true; ch.score = x.total; }
      if (!t.latest || (x.graded && (!t.latest.graded || x.graded > t.latest.graded))) t.latest = x;
    });
    var levels = {};
    Object.keys(byTeam).forEach(function (id) {
      var t = byTeam[id];
      Object.keys(t.chapters).forEach(function (n) {
        if (t.chapters[n].passed) { t.passed++; t.points += t.chapters[n].score; }
      });
      (levels[t.level] || (levels[t.level] = [])).push(t);
    });
    var result = Object.keys(levels).map(Number).sort(function (a, b) { return a - b; }).map(function (lv) {
      var rows = levels[lv].sort(function (a, b) {
        return b.passed - a.passed || b.points - a.points || a.teamId.localeCompare(b.teamId, undefined, { numeric: true });
      });
      var maxChapter = 1;
      rows.forEach(function (t, i) {
        Object.keys(t.chapters).forEach(function (n) { maxChapter = Math.max(maxChapter, Number(n)); });
        var prev = rows[i - 1];
        t.rank = prev && prev.passed === t.passed && prev.points === t.points ? prev.rank : i + 1;
      });
      return { level: lv, maxChapter: maxChapter, rows: rows };
    });
    // First-attempt papers that were graded but whose full marks per problem
    // are not in paper-points.js yet (re-run tools/build-paper-points.js).
    result.missingPapers = Object.keys(missing).sort();
    return result;
  }

  // ---- rendering -------------------------------------------------------------

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function shortDate(d) { return d ? MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() : ""; }
  // Latest result: the year is obvious within a school year and costs width.
  function shortDateNoYear(d) { return d ? MONTHS[d.getMonth()] + " " + d.getDate() : ""; }

  function pct(a, b) { return Math.round(100 * a / b) + "%"; }

  function firstCells(f) {
    if (!f || !f.graded) return '<td class="ls-num ls-first"></td><td class="ls-num"></td><td class="ls-num"></td><td class="ls-num"></td>';
    var avg = f.scored ? Math.round(10 * f.totalSum / f.scored) / 10 : "";
    var cells = [avg, f.passed + "/" + f.graded];
    if (f.received) {
      cells.push(f.perfect + "/" + f.received + ' <span class="ls-date">' + pct(f.perfect, f.received) + "</span>",
        f.hardAvail ? pct(f.hardEarned, f.hardAvail) : "");
    } else {
      cells.push("", "");
    }
    return cells.map(function (c, i) { return '<td class="ls-num' + (i ? "" : " ls-first") + '">' + c + "</td>"; }).join("");
  }

  // Two views of the same standings (Nghia, 9 Nov 2026), so the page stays
  // readable as chapters pile up during the year:
  //   "summary"  (default) rank, team, totals, first-try measures, latest
  //              result -- the same width whatever the number of chapters;
  //   "chapters" one column per chapter, scrolling sideways when there are
  //              many. In both views rank and team stay pinned on the left
  //              while the rest scrolls (phones, or a long year).
  var VIEWS = { summary: "Summary", chapters: "By chapter" };

  function rankCell(t) {
    // No rank until a team has passed a chapter: at 0 passed and 0 points
    // everyone would tie for 1st, which says nothing.
    return '<td class="ls-rank ls-pin1">' + (t.passed ? t.rank : "&ndash;") + "</td>";
  }
  function teamCell(t) {
    return '<td class="ls-team ls-pin2"><strong>' + esc(t.teamName || t.teamId) + "</strong></td>";
  }

  function latestCell(t) {
    var html = t.latest
      ? "C" + esc(t.latest.chapter) + " &middot; " + esc(t.latest.total) + " &middot; " +
        '<span class="' + (t.latest.result === "Pass" ? "ls-pass" : "ls-fail") + '">' + esc(t.latest.result) + "</span>" +
        (t.latest.graded ? '<br><span class="ls-date">' + esc(shortDateNoYear(t.latest.graded)) + "</span>" : "")
      : '<span class="ls-date">not started</span>';
    return "<td>" + html + "</td>";
  }

  function summaryTable(g) {
    var head = '<tr><th class="ls-rank ls-pin1">#</th><th class="ls-pin2">Team</th><th class="ls-num">Chapters<br>passed</th><th class="ls-num">Points</th>' +
      '<th class="ls-num">Attempts</th>' +
      '<th class="ls-num ls-first" title="Average score of the team\'s first attempts (retakes and entrance tests not counted)">1st-try<br>avg</th>' +
      '<th class="ls-num" title="Chapters passed at the first attempt / chapters attempted">1st-try<br>passes</th>' +
      '<th class="ls-num" title="Problems with full marks / problems received, first attempts only">Perfect<br>problems</th>' +
      '<th class="ls-num" title="Share of the points on each paper\'s hardest problems (worth 20+ points), first attempts only">Hard-<br>problem %</th>' +
      "<th>Latest<br>result</th></tr>";
    var body = g.rows.map(function (t) {
      return "<tr>" + rankCell(t) + teamCell(t) +
        '<td class="ls-num">' + t.passed + '</td><td class="ls-num">' + t.points + "</td>" +
        '<td class="ls-num">' + t.attempts + "</td>" + firstCells(t.first) + latestCell(t) + "</tr>";
    }).join("");
    return '<div class="ls-wrap"><table class="ls-table"><thead>' + head + "</thead><tbody>" + body + "</tbody></table></div>";
  }

  function chaptersTable(g) {
    var chCols = [];
    for (var n = 1; n <= g.maxChapter; n++) chCols.push(n);
    var head = '<tr><th class="ls-rank ls-pin1">#</th><th class="ls-pin2">Team</th>' +
      chCols.map(function (n) { return '<th class="ls-num">C' + n + "</th>"; }).join("") +
      '<th class="ls-num ls-first">Passed</th><th class="ls-num">Points</th></tr>';
    var body = g.rows.map(function (t) {
      var chCells = chCols.map(function (n) {
        var c = t.chapters[n];
        if (!c) return '<td class="ls-num"></td>';
        if (c.passed) return '<td class="ls-num ls-pass">' + esc(c.score) + "</td>";
        return '<td class="ls-num ls-notyet" title="Not passed yet (best ' + esc(c.best) + ')">&#10007;</td>';
      }).join("");
      return "<tr>" + rankCell(t) + teamCell(t) + chCells +
        '<td class="ls-num ls-first">' + t.passed + '</td><td class="ls-num">' + t.points + "</td></tr>";
    }).join("");
    return '<div class="ls-wrap"><table class="ls-table ls-chapters"><thead>' + head + "</thead><tbody>" + body + "</tbody></table></div>";
  }

  // view: "summary" (default) or "chapters"
  function render(groups, view) {
    if (!groups.length) return '<p class="ls-empty">No teams yet.</p>';
    var table = view === "chapters" ? chaptersTable : summaryTable;
    var html = groups.map(function (g) {
      return '<h3 id="standings-level-' + g.level + '">Level ' + esc(g.level) + "</h3>" + table(g);
    }).join("");
    if (view !== "chapters" && groups.missingPapers && groups.missingPapers.length) {
      html += '<p class="ls-status">Full marks per problem are not loaded yet for ' +
        esc(groups.missingPapers.join(", ")) + ", so those papers are left out of Perfect problems and Hard-problem %.</p>";
    }
    return html;
  }

  function switcher(view) {
    return '<div class="ls-views" role="group" aria-label="Standings view">' +
      Object.keys(VIEWS).map(function (v) {
        return '<button type="button" data-view="' + v + '"' + (v === view ? ' class="active" aria-pressed="true"' : ' aria-pressed="false"') +
          ">" + VIEWS[v] + "</button>";
      }).join("") + "</div>";
  }

  function savedView() {
    try { var v = global.localStorage.getItem("mccStandingsView"); return VIEWS[v] ? v : "summary"; } catch (e) { return "summary"; }
  }
  function saveView(v) { try { global.localStorage.setItem("mccStandingsView", v); } catch (e) { /* private mode */ } }

  function mount(el) {
    el.innerHTML = '<p class="ls-status">Loading the latest results&hellip;</p>';
    load().then(function (d) {
      var groups = compute(d.teams, d.exams), view = savedView();
      var footer = '<p class="ls-status">Live from the <a href="' + PUBLIC_ROSTER_URL + '">MCC Public Roster</a>, loaded ' +
        esc(new Date().toLocaleString()) + ". A result appears here as soon as it is graded.</p>";
      var draw = function () {
        el.innerHTML = switcher(view) + render(groups, view) + footer;
        Array.prototype.forEach.call(el.querySelectorAll(".ls-views button"), function (b) {
          b.addEventListener("click", function () {
            view = b.getAttribute("data-view"); saveView(view); draw();
          });
        });
      };
      draw();
    }).catch(function (err) {
      el.innerHTML = '<p class="ls-status">The standings could not be loaded right now (' + esc(err.message) +
        '). You can see every graded test on the <a href="' + PUBLIC_ROSTER_URL + '">MCC Public Roster</a>.</p>';
    });
  }

  global.MCCStandings = { compute: compute, render: render, parseDate: parseDate, load: load };

  if (typeof document !== "undefined") {
    var start = function () {
      var el = document.getElementById("live-standings");
      if (el) mount(el);
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
  }
})(typeof window !== "undefined" ? window : this);
