// Live entrance-test results for the Join MCC page (register.md).
// Plain static JS, same approach as live-standings.js: the page asks
// Google's public visualization endpoint for the MCC Public Roster each
// time it is opened.
//
// An entrance test is Chapter 0 on the Exams tab: Attempt 1 / 2 = Day 1 /
// Day 2 (set A), Attempt 3 / 4 = Day 1 / Day 2 (set B). The two days are
// averaged; 51 or more places the team at that level.
//
// Privacy: only team names, Team IDs, Student IDs and numbers are requested
// and shown, never student names (the Roster query selects only TeamID,
// StudentID and TeamName).
//
// Team names: as on the standings (live-standings.js), a team is shown, in
// bold, by its own chosen name (Roster column TeamName); its ID appears only
// when it has no name of its own (blank, or the same as the ID). The column
// is optional, so the page still works on an older roster (IDs only).

(function () {
  "use strict";

  var ROSTER_ID = "1m_CzWRfQxUt7puw1mVBqAZCpm1zvYDrxievSJXKGGFI";
  var PASS_MARK = 51;

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

  function columnIds(sheet) {
    return gviz(sheet, "select * limit 0").then(function (t) {
      var ids = {};
      t.cols.forEach(function (c) { if (c.label) ids[c.label.trim()] = c.id; });
      return ids;
    });
  }

  function cell(row, i) { var c = row.c[i]; return c ? c.v : null; }

  function parseDate(v) {
    var m = /^Date\((\d+),(\d+),(\d+)/.exec(String(v || ""));
    return m ? new Date(+m[1], +m[2], +m[3]) : null;
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function shortDate(d) { return d ? MONTHS[d.getMonth()] + " " + d.getDate() : ""; }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function load() {
    return Promise.all([columnIds("Roster"), columnIds("Exams")]).then(function (res) {
      var r = res[0], e = res[1];
      ["TeamID", "Chapter", "Attempt", "Level", "ExamDate", "Total", "GradingStatus"].forEach(function (l) {
        if (!e[l]) throw new Error('column "' + l + '" not found on Exams');
      });
      var examsQ = "select " + [e.TeamID, e.Level, e.Attempt, e.ExamDate, e.Total, e.GradingStatus].join(", ") +
        " where " + e.Chapter + " = 0";
      var rosterQ = r.StudentID && r.TeamID
        ? "select " + r.TeamID + ", " + r.StudentID + (r.TeamName ? ", " + r.TeamName : "") +
          " where " + r.TeamID + " is not null"
        : null;
      return Promise.all([gviz("Exams", examsQ), rosterQ ? gviz("Roster", rosterQ) : Promise.resolve(null)]);
    }).then(function (tables) {
      var exams = tables[0].rows.map(function (row) {
        return { teamId: String(cell(row, 0) || "").trim(), level: cell(row, 1), attempt: Number(cell(row, 2)) || 1,
          date: parseDate(cell(row, 3)), total: cell(row, 4), graded: !!cell(row, 5) };
      });
      var students = {}, names = {};
      if (tables[1]) {
        tables[1].rows.forEach(function (row) {
          var t = String(cell(row, 0) || "").trim(), s = String(cell(row, 1) || "").trim();
          var n = row.c.length > 2 ? String(cell(row, 2) || "").trim() : "";
          if (t && s) (students[t] = students[t] || []).push(s);
          if (t && n && !names[t] && n.toLowerCase() !== t.toLowerCase()) names[t] = n;
        });
      }
      return { exams: exams, students: students, names: names };
    });
  }

  // -> [{teamId, teamName, level, students, day1, day2, average, state, latest}]
  function compute(exams, students, names) {
    names = names || {};
    var byTeam = {};
    exams.forEach(function (x) {
      if (!x.teamId) return;
      var t = byTeam[x.teamId] || (byTeam[x.teamId] = { teamId: x.teamId, level: x.level, day1: null, day2: null, latest: null });
      var day = x.attempt % 2 === 1 ? "day1" : "day2";
      t[day] = x;
      if (x.level) t.level = x.level;
      if (x.date && (!t.latest || x.date > t.latest)) t.latest = x.date;
    });
    return Object.keys(byTeam).map(function (id) {
      var t = byTeam[id];
      t.teamName = names[id] || "";
      t.students = (students[id] || []).sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true }); });
      var g1 = t.day1 && t.day1.graded && t.day1.total !== null && t.day1.total !== "";
      var g2 = t.day2 && t.day2.graded && t.day2.total !== null && t.day2.total !== "";
      if (g1 && g2) {
        t.average = Math.round(((Number(t.day1.total) + Number(t.day2.total)) / 2) * 10) / 10;
        t.state = t.average >= PASS_MARK ? "pass" : "fail";
      } else {
        t.average = null;
        t.state = "progress";
      }
      return t;
    }).sort(function (a, b) { return (b.latest || 0) - (a.latest || 0) || a.teamId.localeCompare(b.teamId); });
  }

  function dayCell(x) {
    if (!x) return '<td class="ls-num"></td>';
    if (x.graded && x.total !== null && x.total !== "") return '<td class="ls-num">' + esc(x.total) + "</td>";
    return '<td class="ls-num"><span class="ls-date">' + esc(shortDate(x.date)) + "</span></td>";
  }

  function render(rows) {
    if (!rows.length) return '<p class="ls-empty">No entrance tests yet this year.</p>';
    var head = "<tr><th>Team</th><th>Students</th><th>Level</th><th>Day 1</th><th>Day 2</th><th>Average</th><th>Result</th></tr>";
    var body = rows.map(function (t) {
      var result = t.state === "pass" ? '<span class="ls-pass">Placed at T' + esc(t.level) + "</span>"
        : t.state === "fail" ? '<span class="ls-fail">Below 51</span>'
        : '<span class="ls-date">in progress</span>';
      return "<tr><td><strong>" + esc(t.teamName || t.teamId) + "</strong></td><td>" + esc(t.students.join(", ")) + "</td>" +
        '<td class="ls-num">T' + esc(t.level) + "</td>" + dayCell(t.day1) + dayCell(t.day2) +
        '<td class="ls-num">' + (t.average === null ? "" : esc(t.average)) + "</td><td>" + result + "</td></tr>";
    }).join("");
    return '<div class="ls-wrap"><table class="ls-table"><thead>' + head + "</thead><tbody>" + body + "</tbody></table></div>";
  }

  function mount(el) {
    el.innerHTML = '<p class="ls-status">Loading the entrance results&hellip;</p>';
    load().then(function (d) {
      el.innerHTML = render(compute(d.exams, d.students, d.names)) +
        '<p class="ls-status">Live from the MCC Public Roster, loaded ' + esc(new Date().toLocaleString()) +
        ". A date means that day is scheduled; a score appears as soon as it is graded.</p>";
    }).catch(function (err) {
      el.innerHTML = '<p class="ls-status">The entrance results could not be loaded right now (' + esc(err.message) + ").</p>";
    });
  }

  window.MCCEntrance = { compute: compute, render: render };

  if (typeof document !== "undefined") {
    var start = function () {
      var el = document.getElementById("entrance-results");
      if (el) mount(el);
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
  }
})();
