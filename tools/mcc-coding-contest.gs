// MCC coding-contest submission intake + timed close.
//
// Reference copy only -- like tools/mcc-access-check.gs, the real Apps
// Script lives bound to the contest's own Google Form (Form > the three
// dots > Script editor), not in this repo. Copy-paste this in after
// creating the Form; this file is the source of truth for future edits.
//
// ---------------------------------------------------------------------
// ONE-TIME SETUP (do this before 4 Oct)
// ---------------------------------------------------------------------
// 1. Create one Google Form, "MCC Coding Contest -- Submit a Problem",
//    with exactly these three questions, in this order (the code below
//    reads them by POSITION, so don't reorder/add/remove questions
//    without updating COL_* below):
//      Q1  Student ID          (Short answer)
//      Q2  Problem number      (Short answer -- e.g. "MS7" or "HS12";
//                                keep it free text, not a dropdown, so
//                                new problems never need a Form edit)
//      Q3  Your Python code    (Paragraph)
//    Do NOT turn on "Collect email addresses" or "Limit to 1 response" --
//    a student submits once per problem per attempt, and identity comes
//    from the Student ID answer + the same roster check used everywhere
//    else on the site, not from the Google account.
// 2. Form > Responses tab > the green Sheets icon > "Create a new
//    spreadsheet" -- this becomes CONTEST_SHEET below. Rename its two
//    tabs: the auto-created response tab stays "RawResponses" (don't
//    touch its columns, Forms owns that layout); add a second tab named
//    "Official" with header row:
//      StudentID | ProblemID | Timestamp | CodePath | Flag
// 3. Form > the three dots (top right) > Script editor. Paste this whole
//    file in, replacing the placeholder ROSTER_SHEET_ID / CONTEST_FOLDER_ID
//    below with the real IDs (roster spreadsheet's ID is already in
//    mcc-access-check.gs's deployment; the contest Drive folder is any
//    folder you create and share appropriately).
// 4. Triggers (clock icon, left sidebar):
//      - "onFormSubmit"      -> From form -> On form submit
//      - "closeContestForm"  -> Time-driven -> Day timer, or (simpler and
//        exact) a one-off per-contest trigger set for 8:50 AM that
//        Sunday -- see closeContestForm()'s comment for why a recurring
//        trigger is awkward for a biweekly, not-every-Sunday schedule.
//      - "reopenContestForm" -> same idea, set for 7:55 AM the next
//        contest Sunday.
//    Apps Script's UI trigger picker can only do daily/weekly recurrence,
//    not "every other Sunday" -- simplest reliable approach for a first
//    pilot is deleting and re-creating both time triggers by hand each
//    round (2 minutes), or switching to ScriptApp.newTrigger(...).at(...)
//    once the cadence is proven out. Not automated yet -- flag this if
//    it becomes a recurring chore.
//
// ---------------------------------------------------------------------
// WHAT THIS SCRIPT DOES
// ---------------------------------------------------------------------
// Every form submission is one (StudentID, ProblemID, Code) triple.
// Nothing is ever overwritten in RawResponses -- Forms only appends.
// onFormSubmit() reacts to each new row:
//   1. Confirms StudentID is on the roster (same sheet/tab
//      mcc-access-check.gs already reads) -- unknown IDs are still kept
//      (never silently dropped) but flagged in Official!Flag for a human
//      to look at, matching "log everything, don't guess."
//   2. Writes the pasted code to Drive as a versioned file:
//        <CONTEST_FOLDER>/<StudentID>/<ProblemID>_attemptN.py
//      where N is however many prior submissions this (student, problem)
//      pair already has -- never overwritten, full history kept.
//   3. Updates (or inserts) that (StudentID, ProblemID) pair's one row in
//      the Official tab to point at this newest attempt -- Official
//      always reflects "latest submission so far," which is exactly what
//      the 8:50 cutoff needs to freeze at close time (see plan doc,
//      decision B: latest-at-or-before-cutoff is official).
//
// closeContestForm() / reopenContestForm() just flip
// FormApp.setAcceptingResponses -- the server-side, not-just-hidden-button
// cutoff described in the plan (decision 2). After close, Google's own
// "not accepting responses" screen replaces the submit button entirely.

var ROSTER_SHEET_ID = "REPLACE_WITH_ROSTER_SPREADSHEET_ID"; // same sheet mcc-access-check.gs reads
var ROSTER_TAB_NAME = "Final";              // same tab mcc-access-check.gs reads
var CONTEST_FOLDER_ID = "REPLACE_WITH_DRIVE_FOLDER_ID"; // parent folder for all students' submissions
var CONTEST_SHEET_ID = "REPLACE_WITH_THIS_FORM_RESPONSE_SHEET_ID"; // the "CONTEST_SHEET" from step 2

// Raw Form response columns (1-indexed, matches Q1/Q2/Q3 order above).
var COL_TIMESTAMP = 1;
var COL_STUDENT_ID = 2;
var COL_PROBLEM_ID = 3;
var COL_CODE = 4;

function onFormSubmit(e) {
  var row = e.values; // [timestamp, studentId, problemId, code]
  var timestamp = row[COL_TIMESTAMP - 1];
  var studentId = (row[COL_STUDENT_ID - 1] || "").trim();
  var problemId = (row[COL_PROBLEM_ID - 1] || "").trim();
  var code = row[COL_CODE - 1] || "";

  var known = isKnownStudent_(studentId);

  var studentFolder = getOrCreateSubfolder_(
    DriveApp.getFolderById(CONTEST_FOLDER_ID), studentId || "UNKNOWN"
  );
  var attemptNumber = countExistingAttempts_(studentFolder, problemId) + 1;
  var fileName = problemId + "_attempt" + attemptNumber + ".py";
  var file = studentFolder.createFile(fileName, code, MimeType.PLAIN_TEXT);

  upsertOfficialRow_(studentId, problemId, timestamp, file.getName(), known ? "" : "UNKNOWN STUDENT ID -- check");
}

// True if studentId matches a row on the roster tab -- same lookup shape
// as mcc-access-check.gs's doGet(), kept independent (not a shared
// library) so this file stays a single paste-in-and-go script.
function isKnownStudent_(studentId) {
  if (!studentId) return false;
  var sheet = SpreadsheetApp.openById(ROSTER_SHEET_ID).getSheetByName(ROSTER_TAB_NAME);
  var data = sheet.getDataRange().getValues();
  var header = data[0].map(function (h) { return String(h).trim().toLowerCase(); });
  var idCol = header.indexOf("student id");
  if (idCol === -1) return false;
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][idCol]).trim() === studentId) return true;
  }
  return false;
}

function getOrCreateSubfolder_(parent, name) {
  var it = parent.getFoldersByName(name);
  if (it.hasNext()) return it.next();
  return parent.createFolder(name);
}

function countExistingAttempts_(folder, problemId) {
  var it = folder.getFilesByType(MimeType.PLAIN_TEXT);
  var count = 0;
  while (it.hasNext()) {
    var n = it.next().getName();
    if (n.indexOf(problemId + "_attempt") === 0) count++;
  }
  return count;
}

// Keeps exactly one row per (StudentID, ProblemID) in the Official tab,
// always pointing at the most recent attempt -- this is what "latest
// submission at or before the cutoff is official" (plan doc, decision B)
// actually reads from once grading starts.
function upsertOfficialRow_(studentId, problemId, timestamp, codePath, flag) {
  var sheet = SpreadsheetApp.openById(CONTEST_SHEET_ID).getSheetByName("Official");
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === studentId && data[i][1] === problemId) {
      sheet.getRange(i + 1, 1, 1, 5).setValues([[studentId, problemId, timestamp, codePath, flag]]);
      return;
    }
  }
  sheet.appendRow([studentId, problemId, timestamp, codePath, flag]);
}

// Server-side, not-just-a-hidden-button cutoff -- see plan doc decision 2.
// Run this from a one-off time trigger set for 8:50 AM on a contest Sunday.
function closeContestForm() {
  var form = FormApp.getActiveForm(); // works when bound to the Form itself
  form.setAcceptingResponses(false);
}

// Run from a one-off time trigger set for ~7:55 AM ahead of the next
// contest Sunday, so the same Form URL is open again before students join.
function reopenContestForm() {
  var form = FormApp.getActiveForm();
  form.setAcceptingResponses(true);
}
