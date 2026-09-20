// MCC coding-course roster helpers, shared by lesson-gate.html (per-student
// link) and lessons.html (typed-login hub). Plain static JS -- Jekyll only
// runs its Liquid template engine on files that start with YAML front
// matter (--- ... ---); this file has none, so it's copied through
// untouched. Keep it that way: this is exactly the kind of file where a
// stray {% or {{ used to be dangerous when it lived inside an HTML/Liquid
// include instead (see git history around 2026-09-20 for what that broke).
//
// Exposes window.MCCRoster = { ROSTER_CSV_URL, STORAGE_KEY, parseCsv, findStudent }

(function (global) {
  "use strict";

  // Published-to-web CSV of the coding-course roster (Student Name,
  // Student ID, Student Email Address, PIN). Publicly fetchable by design --
  // that's what lets a student's own browser check it with no server. The
  // sheet itself is NOT public (shared with coordinators only); this
  // published CSV is a separate, narrower export of the same tab.
  var ROSTER_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxkm8DlgUpQhYr7wmkA3lx-t3bhPsUSMq9xnQnKPfyBKINs4_egnNFa25t2eUK3Vkmvw6ZQleNu5HY/pub?gid=1600479189&single=true&output=csv";

  // Shared across every page that grants access, so a student verified on
  // one page (a personal lesson link, or the lessons hub's login form) is
  // recognized on all the others without re-entering anything.
  var STORAGE_KEY = "mcc_student";

  // Minimal CSV parser -- handles quoted fields (with embedded commas or
  // escaped quotes), which is all a Google Sheets export ever produces.
  // No need for a library over four plain columns.
  function parseCsv(text) {
    var rows = [], row = [], field = "", inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
        } else {
          field += c;
        }
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field); field = "";
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = "";
        if (row.length > 1 || row[0] !== "") rows.push(row);
        row = [];
      } else {
        field += c;
      }
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function findStudent(rows, studentId) {
    if (!rows.length) return null;
    var header = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    var idCol = header.indexOf("student id");
    var nameCol = header.indexOf("student name");
    var pinCol = header.indexOf("pin");
    if (idCol === -1) return null;
    var target = studentId.trim().toLowerCase();
    for (var r = 1; r < rows.length; r++) {
      var row = rows[r];
      if (row[idCol] && row[idCol].trim().toLowerCase() === target) {
        return {
          id: row[idCol].trim(),
          name: nameCol > -1 ? (row[nameCol] || "").trim() : "",
          pin: pinCol > -1 ? (row[pinCol] || "").trim() : ""
        };
      }
    }
    return null;
  }

  global.MCCRoster = {
    ROSTER_CSV_URL: ROSTER_CSV_URL,
    STORAGE_KEY: STORAGE_KEY,
    parseCsv: parseCsv,
    findStudent: findStudent
  };
})(window);
