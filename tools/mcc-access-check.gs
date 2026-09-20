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
// Response shape either way: {"ok": true, "name": "Jason ..."} or
// {"ok": false}.

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
              result = { ok: true, name: rowName };
            }
          } else {
            // id-only re-check -- the device already proved itself once.
            result = { ok: true, name: rowName };
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
