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
// Ranking, within each level: chapters passed (more is better), then points
// = the sum of the passing scores (equal on both = same rank); teams that
// have not passed a chapter yet are listed without a rank.
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
      var rosterQ = "select " + [r.TeamID, r.Level, r.Status].join(", ") +
        " where " + r.TeamID + " is not null and not " + r.FullName + " starts with 'TEST'";
      var examsQ = "select " + [e.TeamID, e.Chapter, e.Attempt, e.Total, e.Result, e.GradedUTC].join(", ") +
        " where " + e.Result + " = 'Pass' or " + e.Result + " = 'Fail'";
      return Promise.all([gviz("Roster", rosterQ), gviz("Exams", examsQ)]);
    }).then(function (tables) {
      var teams = tables[0].rows.map(function (row) {
        return { teamId: String(cell(row, 0)).trim(), level: Number(cell(row, 1)) || 0,
          status: String(cell(row, 2) || "").trim().toLowerCase() };
      });
      var exams = tables[1].rows.map(function (row) {
        return { teamId: String(cell(row, 0)).trim(), chapter: Number(cell(row, 1)) || 0,
          attempt: Number(cell(row, 2)) || 1, total: Number(cell(row, 3)),
          result: String(cell(row, 4)), graded: parseDate(cell(row, 5)) };
      });
      return { teams: teams, exams: exams };
    });
  }

  // ---- pure computation ----------------------------------------------------

  // teams: [{teamId, level, status}] (one per student row is fine)
  // exams: [{teamId, chapter, attempt, total, result, graded}]
  // -> [{level, maxChapter, rows: [{rank, teamId, passed, points, attempts,
  //      chapters: {n: {score, passed}}, latest}]}], levels ascending
  function compute(teams, exams) {
    var byTeam = {};
    teams.forEach(function (t) {
      if (!t.teamId || (t.status && t.status !== "active")) return;
      if (!byTeam[t.teamId]) {
        byTeam[t.teamId] = { teamId: t.teamId, level: t.level, passed: 0, points: 0,
          attempts: 0, chapters: {}, latest: null };
      }
    });
    exams.forEach(function (x) {
      var t = byTeam[x.teamId];
      if (!t || !x.chapter || isNaN(x.total)) return;
      t.attempts++;
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
    return Object.keys(levels).map(Number).sort(function (a, b) { return a - b; }).map(function (lv) {
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
  }

  // ---- rendering -------------------------------------------------------------

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function shortDate(d) { return d ? MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() : ""; }

  function render(groups) {
    if (!groups.length) return '<p class="ls-empty">No teams yet.</p>';
    return groups.map(function (g) {
      var chCols = [];
      for (var n = 1; n <= g.maxChapter; n++) chCols.push(n);
      var head = "<tr><th>#</th><th>Team</th><th>Chapters passed</th><th>Points</th>" +
        chCols.map(function (n) { return '<th class="ls-num">C' + n + "</th>"; }).join("") +
        "<th>Attempts</th><th>Latest result</th></tr>";
      var body = g.rows.map(function (t) {
        var chCells = chCols.map(function (n) {
          var c = t.chapters[n];
          if (!c) return '<td class="ls-num"></td>';
          if (c.passed) return '<td class="ls-num ls-pass">' + esc(c.score) + "</td>";
          return '<td class="ls-num ls-notyet" title="Not passed yet (best ' + esc(c.best) + ')">&#10007;</td>';
        }).join("");
        var latest = t.latest
          ? "C" + esc(t.latest.chapter) + " &middot; " + esc(t.latest.total) + " &middot; " +
            '<span class="' + (t.latest.result === "Pass" ? "ls-pass" : "ls-fail") + '">' + esc(t.latest.result) + "</span>" +
            (t.latest.graded ? ' &middot; <span class="ls-date">' + esc(shortDate(t.latest.graded)) + "</span>" : "")
          : '<span class="ls-date">not started</span>';
        // No rank until a team has passed a chapter: at 0 passed and 0
        // points everyone would tie for 1st, which says nothing.
        return "<tr><td>" + (t.passed ? t.rank : "&ndash;") + "</td><td><strong>" + esc(t.teamId) + "</strong></td>" +
          '<td class="ls-num">' + t.passed + '</td><td class="ls-num">' + t.points + "</td>" +
          chCells + '<td class="ls-num">' + t.attempts + "</td><td>" + latest + "</td></tr>";
      }).join("");
      return '<h3 id="standings-level-' + g.level + '">Level ' + esc(g.level) + "</h3>" +
        '<div class="ls-wrap"><table class="ls-table"><thead>' + head + "</thead><tbody>" + body + "</tbody></table></div>";
    }).join("");
  }

  function mount(el) {
    el.innerHTML = '<p class="ls-status">Loading the latest results&hellip;</p>';
    load().then(function (d) {
      el.innerHTML = render(compute(d.teams, d.exams)) +
        '<p class="ls-status">Live from the <a href="' + PUBLIC_ROSTER_URL + '">MCC Public Roster</a>, loaded ' +
        esc(new Date().toLocaleString()) + ". A result appears here as soon as it is graded.</p>";
    }).catch(function (err) {
      el.innerHTML = '<p class="ls-status">The standings could not be loaded right now (' + esc(err.message) +
        '). You can see every graded test on the <a href="' + PUBLIC_ROSTER_URL + '">MCC Public Roster</a>.</p>';
    });
  }

  global.MCCStandings = { compute: compute, render: render, parseDate: parseDate };

  if (typeof document !== "undefined") {
    var start = function () {
      var el = document.getElementById("live-standings");
      if (el) mount(el);
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
  }
})(typeof window !== "undefined" ? window : this);
