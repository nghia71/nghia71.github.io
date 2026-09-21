// MCC coding-course access-check endpoint.
//
// Kept here for reference only -- Apps Script itself lives in Google's own
// editor (Extensions > Apps Script, opened from inside the roster
// spreadsheet), not in this repo. This file is never served by Jekyll or
// referenced by any page; it's just the source of truth for what's
// deployed, so a future edit to the check logic can be made here first and
// copy-pasted into the Apps Script editor.
//
// Deploy as a bound script (Extensions > Apps Script from inside the
// roster spreadsheet, tab "Final"), then Deploy > New deployment > type
// "Web app" > Execute as "Me" > Who has access "Anyone" > Deploy. Copy the
// resulting /exec URL into assets/js/mcc-roster.js's ACCESS_CHECK_URL.
//
// Why server-side at all: a published CSV of the roster is fetchable in
// full by anyone with the link -- one request downloads every student's
// PIN. This endpoint answers one id (+ optional pin) at a time and never
// returns the roster, so even someone with this endpoint's URL can only
// test guesses one at a time, never harvest the list. "Execute as: Me"
// means the script reads the sheet with the owner's own access, so the
// sheet itself can stay fully Restricted to coordinators -- nothing about
// this deployment requires loosening that.
//
// Two modes, both GET, both returning JSON:
//   ?id=S008          -- id-only re-check: is this id still on the roster?
//                         Used only to re-confirm a device that already
//                         passed a full id+PIN check earlier (its id is
//                         sitting in that browser's localStorage) -- the
//                         client-side code must never use this mode to
//                         grant fresh access from a bare link, only to
//                         re-confirm a previously-granted one.
//   ?id=S008&pin=xxxx -- full check: grants access only if the PIN matches
//                         that id's row.
// Response shape either way:
//   {"ok": true, "name": "Jason ...", "unlocked": true, "unlockedLessons": [2]}
// or {"ok": false}.
//
// STAGED ROLLOUT (added 2026-09-20; split into two flags later same day):
//
// "unlocked" gates the Start/Submit link on toml.html only -- true right
// now for TESTERS, true for every other student once the coding-contest
// pipeline has actually gone live (see SUBMIT_LIVE_DATE below). It is a
// simple calendar-date check on purpose: the link just needs to appear
// on the morning of the first round, comfortably before that round's own
// 8:00 AM start, and once true it stays true forever -- the same Form/
// URL is reused every future round, so this flag never needs touching
// again after round 1. Do NOT reuse "unlocked" to gate Lesson content --
// see the bug this caused, below.
//
// "unlockedLessons" gates each lesson's row on lessons.html (and, via
// lesson-gate.html's requires_unlock=<n> parameter, that lesson's own
// page if opened directly) -- a lesson number is in this array once its
// own round's contest has actually closed, per LESSON_THRESHOLDS below.
// This MUST be precise timestamps, not calendar dates, and MUST be
// per-round, not one flag for everything:
//
//   - Per-round, because a single "unlocked" flag that flips true once
//     and stays true forever (as "unlocked" itself deliberately does,
//     above) is exactly right for "has the pipeline gone live" but
//     exactly wrong for "which lessons are visible" -- Lesson 3 must
//     stay hidden through round 2 even after Lesson 2 has opened.
//   - Precise timestamps, because comparing only the calendar date
//     ("today >= that round's date") flips true at 12:00 AM -- 8 hours
//     before that round's contest even opens (8:00 AM), and well before
//     its 8:45 close / 8:50 hard cutoff (see
//     mcc-coding-contest-final.gs's isAfterCutoff_). A real student
//     could sign in that morning, read the lesson's official solutions,
//     then sit the contest already knowing the answers. This exact bug
//     shipped once (as a single date-only "LAUNCH_DATE"/"unlocked" flag
//     doing both jobs at once), was caught 2026-09-20 during a
//     TESTERS-account rehearsal before any real student was affected,
//     and got compounded by a first fix that moved the one shared
//     threshold to 9:00 AM -- which incidentally also delayed the
//     Start/Submit link past that round's own contest window, since at
//     the time both were still gated by the same flag. Splitting into
//     two independently-timed flags (this file, same day) is the actual
//     fix: SUBMIT_LIVE_DATE stays a simple date for the link,
//     LESSON_THRESHOLDS stays precise per-round timestamps for content.
//
// TESTERS matches the same way the roster match below does: trimmed,
// case-insensitive, against Student ID. Add/remove ids here as the
// rehearsal roster changes -- this list is intentionally separate from
// the "Final" sheet so test accounts don't need special roster flags.
// TESTERS see every lesson in LESSON_THRESHOLDS immediately, whether or
// not its own threshold has passed -- lets a full test -> grade ->
// comments -> Lesson rehearsal happen without waiting for the real date.
var TESTERS = ['S007', 'S008'];

var TIMEZONE = 'America/Vancouver';

// Start/Submit link on toml.html: true for every id, tester or not, once
// today is on/after this date. Set once for round 1; never needs
// touching again (see the big comment above).
var SUBMIT_LIVE_DATE = '2026-10-04';

// Per-round Lesson unlock. Add one entry per round once that round's
// Lesson number is decided -- a round with no entry here yet simply
// never appears in unlockedLessons_, which is harmless (lessons.html and
// lesson-gate.html both fail closed: no matching number in the array
// means the row/page stays locked, exactly like "not listed yet" should
// behave). The -07:00 offset is Vancouver's PDT offset; still correct
// through early November (PDT doesn't end until the first Sunday of
// November) -- re-check the offset (-08:00 for PST) for any round's
// threshold added on/after that changeover.
var LESSON_THRESHOLDS = [
  { lesson: 2, threshold: new Date('2026-10-04T09:00:00-07:00') }
  // { lesson: 3, threshold: new Date('2026-10-18T09:00:00-07:00') },
  // add future rounds here once each one's Lesson number is decided
];

function isTester_(id) {
  var target = id.toLowerCase();
  for (var i = 0; i < TESTERS.length; i++) {
    if (TESTERS[i].toLowerCase() === target) return true;
  }
  return false;
}

function isSubmitUnlocked_(id) {
  if (isTester_(id)) return true;
  var today = Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd');
  return today >= SUBMIT_LIVE_DATE;
}

function unlockedLessons_(id) {
  if (isTester_(id)) {
    return LESSON_THRESHOLDS.map(function (t) { return t.lesson; });
  }
  var now = new Date().getTime();
  var out = [];
  for (var i = 0; i < LESSON_THRESHOLDS.length; i++) {
    if (now >= LESSON_THRESHOLDS[i].threshold.getTime()) out.push(LESSON_THRESHOLDS[i].lesson);
  }
  return out;
}

function doGet(e) {
  var id = (e.parameter.id || "").trim();
  var hasPin = typeof e.parameter.pin === "string";
  var pin = hasPin ? e.parameter.pin.trim() : "";

  var result = { ok: false };

  if (id) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Final");
    var data = sheet.getDataRange().getValues();
    var header = data[0].map(function (h) { return String(h).trim().toLowerCase(); });
    var idCol = header.indexOf("student id");
    var nameCol = header.indexOf("student name");
    var pinCol = header.indexOf("pin");

    if (idCol > -1) {
      var target = id.toLowerCase();
      for (var r = 1; r < data.length; r++) {
        var row = data[r];
        if (String(row[idCol]).trim().toLowerCase() === target) {
          var rowPin = pinCol > -1 ? String(row[pinCol]).trim() : "";
          var rowName = nameCol > -1 ? String(row[nameCol]).trim() : "";
          if (hasPin) {
            if (rowPin && pin === rowPin) {
              result = { ok: true, name: rowName, unlocked: isSubmitUnlocked_(id), unlockedLessons: unlockedLessons_(id) };
            }
          } else {
            // id-only re-check -- the device already proved itself once.
            result = { ok: true, name: rowName, unlocked: isSubmitUnlocked_(id), unlockedLessons: unlockedLessons_(id) };
          }
          break;
        }
      }
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
