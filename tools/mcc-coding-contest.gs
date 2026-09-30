// MCC Coding Contest -- submission intake, round clock and paper sharing.
//
// Bound to the "MCC Coding Contest - Submission" Google Form. The live copy
// is in the Apps Script editor; this file in the website repo
// (tools/mcc-coding-contest.gs) is a reference copy kept identical to it.
// Last rewritten 2026-09-29 after a full rehearsal with test students
// S007/S008 (see "Tested" below).
//
// WHAT HAPPENS ON A CONTEST SUNDAY (America/Vancouver time)
//   7:55  roundStart  publish + open the form; share that round's two papers
//                     (MCC-Coding-Test<n>-MS.pdf / -HS.pdf in the Papers
//                     folder) as viewer with every email in the roster's
//                     Final tab -- no notification email, like math tests
//   8:45             late cutoff: anything submitted after 8:45:00 is
//                     flagged "LATE -- not graded"
//   8:46  roundClose  stop accepting responses (a minute after the cutoff:
//                     one-off triggers were measured firing up to ~30 s
//                     early or late, and the form must never close early)
//   8:50  roundEnd    close again (belt and braces), remove everyone's access
//                     to the papers (they become that round's public
//                     lesson), then install the next round's triggers
// Round n is the n-th date in the Schedule tab of the response sheet. After
// installNextRound() has been run once, every round sets up the next one;
// nothing has to be redone by hand.
//
// EVERY SUBMISSION
//   The form asks Student ID, Problem number (validated: MS1-MS5 / HS1-HS5)
//   (validated against the roster IDs, see setStudentIdCheck_) and the
//   pasted code. onFormSubmit saves the code as
//   <Submissions folder>/<StudentID>/p<Problem>_attempt<k>.py, appends a row
//   to the "Intake log" tab (every attempt, kept for audit) and upserts the
//   "Official" tab (one row per student + problem = the latest attempt,
//   which is the one graded). Unknown Student IDs are flagged.
//
// TOOLS (run from the editor)
//   showClock()          read-only status: triggers, next round, papers, form
//   installNextRound()   (re)install the exact triggers for the next round
//   mockRoundNow()       full rehearsal on the next 7 minutes, test students
//                        only; restores the real schedule at the end
//   reprocessResponses() file any form response the trigger missed (never
//                        files one twice -- checks the Intake log)
//   installTriggers()    fresh install: submit trigger + next round
//
// TESTED 2026-09-29 (three rehearsals): paper share/unshare for testers,
// form publish/open/close, problem-number validation, submissions from a
// known and an unknown ID, a refused post-close submission, and pasted code
// with spaces and tabs saved byte-for-byte. Bugs found and fixed: the
// handler read e.values (a sheet-trigger field) and failed on every
// submission; the form was never published so it could not be opened; the
// old weekly "near 7:55 / near 8:50" triggers really ran at 7:57 / 8:44.

var FORM_ID = '1TXVbQe8oXNMR2D8_TGb3EUBUIb6QqRnKpdX1NGBlsiI';
var RESPONSE_SHEET_ID = '1cnBnVsjoGoYh9UsvA7BWZrmO-3rpDjyPT6fxxV3QHVQ';
var ROSTER_SHEET_ID = '1mgzzpK7pOyhjJz2qroO7G465BNcCjdgEw7_1CXzyTVI';
var ROSTER_TAB_NAME = 'Final';
var SUBMISSIONS_FOLDER_ID = '1UmJzApCrAnYzMLCvGrGsTaksCWrf_QqP';
var PAPER_FOLDER_ID = '1sUwL0EFIWoCn-3Gkfsrb-3OGKPgIm_ZD';   // My Drive > mcc-automation > Papers
var SCHEDULE_TAB_NAME = 'Schedule';
var PAPER_LOG_TAB = 'Paper share log';
var INTAKE_LOG_TAB = 'Intake log';
var TIMEZONE = 'America/Vancouver';
var TESTER_IDS = ['S007', 'S008'];

// close = the late cutoff; closeTrigger is when the form actually stops.
var ROUND_TIMES = { start: '07:55', close: '08:45', closeTrigger: '08:46', end: '08:50' };
var CLOCK_HANDLERS = ['roundStart', 'roundClose', 'roundEnd', 'weeklyOpenGate', 'weeklyCloseGate'];

// ---------------------------------------------------------------------
// Submission intake
// ---------------------------------------------------------------------

// Installable trigger on the FORM (not the sheet): the event carries
// e.response (a FormResponse). Reading e.values -- a sheet-trigger field --
// was the bug that made every submission fail before 2026-09-29.
function onFormSubmit(e) {
  handleResponse_(e.response);
}

function handleResponse_(r) {
  var timestamp = r.getTimestamp();
  var a = {};
  r.getItemResponses().forEach(function (ir) {
    a[ir.getItem().getTitle().trim().toLowerCase()] = String(ir.getResponse() || '');
  });
  var studentId = (a['student id'] || '').trim().toUpperCase();
  var problemId = (a['problem number'] || '').trim().toUpperCase();
  var code = a['your python code'] || '';

  var known = isKnownStudent_(studentId);
  var late = isLate_(timestamp, contestWindowFor_(timestamp));

  var studentFolder = getOrCreateSubfolder_(
    DriveApp.getFolderById(SUBMISSIONS_FOLDER_ID), studentId || 'UNKNOWN');
  var attemptNumber = countExistingAttempts_(studentFolder, problemId) + 1;
  var fileName = safeFileStem_(problemId) + '_attempt' + attemptNumber + '.py';
  var file = studentFolder.createFile(fileName, code, MimeType.PLAIN_TEXT);

  var flags = [];
  if (!known) flags.push('UNKNOWN STUDENT -- check Student ID against roster');
  if (late) flags.push('LATE -- submitted after the 8:45 close; not graded');

  intakeLog_().appendRow([r.getId(), timestamp, studentId, problemId, fileName, flags.join('; ')]);
  upsertOfficialRow_(studentId, problemId, timestamp, fileName, flags.join('; '));
}

// Recovery: files every form response not yet in the Intake log. Safe to run
// any time, e.g. if the submit trigger ever fails during a contest.
function reprocessResponses() {
  var seen = {};
  intakeLog_().getDataRange().getValues().forEach(function (row) { seen[row[0]] = true; });
  var n = 0;
  FormApp.openById(FORM_ID).getResponses().forEach(function (r) {
    if (!seen[r.getId()]) { handleResponse_(r); n++; }
  });
  Logger.log('reprocessed ' + n + ' response(s)');
}

// Matches against column B (Student ID) of the "Final" roster tab.
// Case-insensitive, trimmed, exact match only.
function isKnownStudent_(studentId) {
  if (!studentId) return false;
  var sheet = SpreadsheetApp.openById(ROSTER_SHEET_ID).getSheetByName(ROSTER_TAB_NAME);
  var ids = sheet.getRange(2, 2, Math.max(sheet.getLastRow() - 1, 0), 1).getValues();
  var target = studentId.toLowerCase();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]).trim().toLowerCase() === target) return true;
  }
  return false;
}

function getOrCreateSubfolder_(parent, name) {
  var it = parent.getFoldersByName(name);
  if (it.hasNext()) return it.next();
  return parent.createFolder(name);
}

function countExistingAttempts_(folder, problemId) {
  var stem = safeFileStem_(problemId) + '_attempt';
  var it = folder.getFiles();
  var count = 0;
  while (it.hasNext()) {
    if (it.next().getName().indexOf(stem) === 0) count++;
  }
  return count;
}

function safeFileStem_(s) {
  return ('p' + s).replace(/[^A-Za-z0-9_-]/g, '');
}

// One row per student + problem: the latest attempt (the one graded).
function upsertOfficialRow_(studentId, problemId, timestamp, codePath, flag) {
  var ss = SpreadsheetApp.openById(RESPONSE_SHEET_ID);
  var sheet = ss.getSheetByName('Official') || ss.insertSheet('Official');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['StudentID', 'ProblemID', 'Timestamp', 'CodePath', 'Flag']);
  }
  var data = sheet.getDataRange().getValues();
  for (var r = 1; r < data.length; r++) {
    if (data[r][0] === studentId && data[r][1] === problemId) {
      sheet.getRange(r + 1, 1, 1, 5).setValues([[studentId, problemId, timestamp, codePath, flag]]);
      return;
    }
  }
  sheet.appendRow([studentId, problemId, timestamp, codePath, flag]);
}

function intakeLog_() {
  var ss = SpreadsheetApp.openById(RESPONSE_SHEET_ID);
  var sh = ss.getSheetByName(INTAKE_LOG_TAB);
  if (!sh) {
    sh = ss.insertSheet(INTAKE_LOG_TAB);
    sh.appendRow(['ResponseId', 'Timestamp', 'StudentID', 'ProblemID', 'CodePath', 'Flag']);
  }
  return sh;
}

// Late = after 8:45:00 on a contest date (or after the mock close time).
function isLate_(when, window) {
  var testClose = PropertiesService.getScriptProperties().getProperty('CLOCK_TEST_CLOSE');
  if (testClose) return when.getTime() > Number(testClose);
  return window ? when.getTime() > at_(window.date, ROUND_TIMES.close).getTime() : false;
}

// {date} if the given moment falls on a Schedule date, else null.
function contestWindowFor_(when) {
  var day = Utilities.formatDate(when, TIMEZONE, 'yyyy-MM-dd');
  return contestDates_().indexOf(day) >= 0 ? { date: day } : null;
}

// ---------------------------------------------------------------------
// Round clock
// ---------------------------------------------------------------------

function installTriggers() {
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('onFormSubmit').forForm(FormApp.openById(FORM_ID)).onFormSubmit().create();
  installNextRound();
  Logger.log('Installed onFormSubmit + the next round clock triggers.');
}

function installNextRound() {
  deleteClockTriggers_();
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty('CLOCK_TEST');
  props.deleteProperty('CLOCK_TEST_CLOSE');
  var now = new Date();
  var dates = contestDates_();
  for (var i = 0; i < dates.length; i++) {
    var d = dates[i];
    if (at_(d, ROUND_TIMES.end) > now) {
      props.setProperty('CLOCK_DATE', d);
      if (at_(d, ROUND_TIMES.start) > now) newAt_('roundStart', at_(d, ROUND_TIMES.start));
      if (at_(d, ROUND_TIMES.closeTrigger) > now) newAt_('roundClose', at_(d, ROUND_TIMES.closeTrigger));
      newAt_('roundEnd', at_(d, ROUND_TIMES.end));
      Logger.log('Next round: Test ' + (i + 1) + ' on ' + d + ' (' + paperNames_(d).join(', ') + ')');
      return d;
    }
  }
  props.deleteProperty('CLOCK_DATE');
  Logger.log('No future contest dates in the Schedule tab.');
  return null;
}

function roundStart() {
  var d = PropertiesService.getScriptProperties().getProperty('CLOCK_DATE');
  step_('open form', function () { openForm_(); });              // form first: sharing takes ~20 s
  step_('share papers', function () { sharePapers_(d, clockEmails_(), 'add'); });
}

function roundClose() {
  step_('close form', function () { FormApp.openById(FORM_ID).setAcceptingResponses(false); });
}

function roundEnd() {
  var d = PropertiesService.getScriptProperties().getProperty('CLOCK_DATE');
  step_('close form', function () { FormApp.openById(FORM_ID).setAcceptingResponses(false); });
  step_('unshare papers', function () { sharePapers_(d, clockEmails_(), 'remove'); });
  step_('install next round', function () { installNextRound(); });
}

// Google Forms must be published before it can accept responses; it stays
// published between rounds (a published form not accepting responses just
// says it is closed). Also keeps Problem number to MS1-MS5 / HS1-HS5.
function openForm_() {
  var form = FormApp.openById(FORM_ID);
  if (typeof form.isPublished === 'function' && !form.isPublished()) form.setPublished(true);
  form.getItems(FormApp.ItemType.TEXT).forEach(function (it) {
    if (/problem number/i.test(it.getTitle())) {
      it.asTextItem().setValidation(FormApp.createTextValidation()
        .setHelpText('Type the problem number exactly as printed on the paper: MS1 to MS5, or HS1 to HS5.')
        .requireTextMatchesPattern('^(MS|HS)[1-5]$').build());
    }
  });
  step_('student id check', function () { setStudentIdCheck_(form); });   // never blocks opening
  form.setAcceptingResponses(true);
}

// Student ID check on the form: the ID must be one on the roster (tab
// "Final", column B), any letter case, spaces around it allowed. Forms can't
// look up a sheet while a student types, so the roster's IDs are written
// into the question's pattern -- rebuilt at every round start (openForm_),
// so roster changes made before 7:55 are picked up. Run refreshIdCheck()
// by hand after a roster change on contest morning.
function setStudentIdCheck_(form) {
  var sheet = SpreadsheetApp.openById(ROSTER_SHEET_ID).getSheetByName(ROSTER_TAB_NAME);
  var rows = sheet.getRange(2, 2, Math.max(sheet.getLastRow() - 1, 1), 1).getValues();
  var seen = {}, alts = [];
  rows.forEach(function (r) {
    var id = String(r[0]).trim().toUpperCase();
    if (!/^[A-Z0-9]+$/.test(id) || seen[id]) return;
    seen[id] = true;
    alts.push(id.replace(/[A-Z]/g, function (c) { return '[' + c + c.toLowerCase() + ']'; }));
  });
  if (!alts.length) throw new Error('no Student IDs found in the roster');
  var item = form.getItems(FormApp.ItemType.TEXT).filter(function (it) {
    return /student id/i.test(it.getTitle());
  })[0];
  if (!item) throw new Error('no "Student ID" question on the form');
  item.asTextItem().setValidation(FormApp.createTextValidation()
    .setHelpText('That is not a Student ID on the club roster. Type your own ID exactly, e.g. S12 -- ask your coordinator if unsure.')
    .requireTextMatchesPattern('^ *(' + alts.join('|') + ') *$').build());
  return alts.length;
}

function refreshIdCheck() {
  Logger.log('Student ID check set: ' + setStudentIdCheck_(FormApp.openById(FORM_ID)) + ' roster IDs');
}

// Runs one step; a failure is logged (Paper share log tab + execution log)
// and the remaining steps still run.
function step_(what, fn) {
  try { fn(); }
  catch (err) {
    Logger.log('FAILED ' + what + ': ' + err.message);
    try { paperLog_().appendRow([new Date(), what, '', '', 'FAILED: ' + err.message]); } catch (e) {}
  }
}

// Rehearsal on the next few minutes, testers only: papers of the next real
// round shared at +2 min, cutoff and close at +5, access removed at +7
// (which also restores the real schedule).
function mockRoundNow() {
  deleteClockTriggers_();
  var d = contestDates_().filter(function (x) { return at_(x, ROUND_TIMES.end) > new Date(); })[0];
  var t0 = new Date().getTime();
  var props = PropertiesService.getScriptProperties();
  props.setProperty('CLOCK_DATE', d);
  props.setProperty('CLOCK_TEST', '1');
  props.setProperty('CLOCK_TEST_CLOSE', String(t0 + 5 * 60000));
  newAt_('roundStart', new Date(t0 + 2 * 60000));
  newAt_('roundClose', new Date(t0 + 5 * 60000));
  newAt_('roundEnd', new Date(t0 + 7 * 60000));
  Logger.log('Mock round for ' + d + ': share +2 min, close +5 min, unshare +7 min, testers only: ' + clockEmails_().join(', '));
}

// Read-only status.
function showClock() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    Logger.log('trigger: ' + t.getHandlerFunction() + ' ' + t.getEventType());
  });
  var p = PropertiesService.getScriptProperties().getProperties();
  Logger.log('CLOCK_DATE=' + p.CLOCK_DATE + ' CLOCK_TEST=' + p.CLOCK_TEST);
  if (p.CLOCK_DATE) {
    Logger.log('round times: start ' + at_(p.CLOCK_DATE, ROUND_TIMES.start) + ', close ' +
      at_(p.CLOCK_DATE, ROUND_TIMES.closeTrigger) + ', end ' + at_(p.CLOCK_DATE, ROUND_TIMES.end));
    paperNames_(p.CLOCK_DATE).forEach(function (n) {
      Logger.log(n + ' -> ' + (findPaper_(n) ? 'found' : 'NOT FOUND'));
    });
  }
  var form = FormApp.openById(FORM_ID);
  Logger.log('form published: ' + (typeof form.isPublished === 'function' ? form.isPublished() : '?') +
    ', accepting responses: ' + form.isAcceptingResponses());
}

// Kept only so any trigger still pointing at them does nothing harmful.
function weeklyOpenGate() {}
function weeklyCloseGate() {}

function contestDates_() {
  var sheet = SpreadsheetApp.openById(RESPONSE_SHEET_ID).getSheetByName(SCHEDULE_TAB_NAME);
  if (!sheet) return [];
  var values = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1).getValues();
  var out = [];
  values.forEach(function (r) {
    var c = r[0];
    var s = c instanceof Date ? Utilities.formatDate(c, TIMEZONE, 'yyyy-MM-dd') : String(c).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) out.push(s);
  });
  return out.sort();
}

function paperNames_(dateStr) {
  var n = contestDates_().indexOf(dateStr) + 1;
  return ['MCC-Coding-Test' + n + '-MS.pdf', 'MCC-Coding-Test' + n + '-HS.pdf'];
}

function at_(dateStr, hhmm) {
  return Utilities.parseDate(dateStr + ' ' + hhmm + ':00', TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
}

function newAt_(handler, when) {
  ScriptApp.newTrigger(handler).timeBased().at(when).create();
}

function deleteClockTriggers_() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (CLOCK_HANDLERS.indexOf(t.getHandlerFunction()) >= 0) ScriptApp.deleteTrigger(t);
  });
}

// ---------------------------------------------------------------------
// Paper sharing
// ---------------------------------------------------------------------

function clockEmails_() {
  var test = PropertiesService.getScriptProperties().getProperty('CLOCK_TEST');
  return rosterEmails_(test ? TESTER_IDS : null);
}

// Unique, trimmed emails from roster column C; if ids is given, only those students.
function rosterEmails_(ids) {
  var rows = SpreadsheetApp.openById(ROSTER_SHEET_ID).getSheetByName(ROSTER_TAB_NAME).getDataRange().getValues();
  var seen = {}, out = [];
  for (var i = 1; i < rows.length; i++) {
    var id = String(rows[i][1]).trim(), email = String(rows[i][2]).trim().toLowerCase();
    if (!email || email.indexOf('@') < 0) continue;
    if (ids && ids.indexOf(id) < 0) continue;
    if (!seen[email]) { seen[email] = true; out.push(email); }
  }
  return out;
}

function findPaper_(name) {
  var it = DriveApp.getFolderById(PAPER_FOLDER_ID).getFilesByName(name);
  return it.hasNext() ? it.next() : null;
}

function sharePapers_(dateStr, emails, mode) {
  var log = paperLog_();
  var why = mode + (PropertiesService.getScriptProperties().getProperty('CLOCK_TEST') ? ' (mock)' : '') + ' ' + dateStr;
  paperNames_(dateStr).forEach(function (name) {
    var file = findPaper_(name);
    if (!file) { log.appendRow([new Date(), why, name, '', 'ERROR: paper not found in Papers folder']); return; }
    emails.forEach(function (email) {
      try {
        if (mode === 'add') file.addViewer(email); else file.removeViewer(email);
        log.appendRow([new Date(), why, name, email, 'ok']);
      } catch (err) {
        log.appendRow([new Date(), why, name, email, 'FAILED: ' + err.message]);
      }
    });
  });
}

function paperLog_() {
  var ss = SpreadsheetApp.openById(RESPONSE_SHEET_ID);
  var sh = ss.getSheetByName(PAPER_LOG_TAB);
  if (!sh) { sh = ss.insertSheet(PAPER_LOG_TAB); sh.appendRow(['When', 'What', 'Paper', 'Email', 'Result']); }
  return sh;
}
