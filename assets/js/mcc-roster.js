// MCC coding-course access-check helper, shared by lesson-gate.html
// (per-student link) and lessons.html (typed-login hub). Plain static JS --
// Jekyll only runs its Liquid template engine on files that start with YAML
// front matter (--- ... ---); this file has none, so it's copied through
// untouched. Keep it that way: this is exactly the kind of file where a
// stray {% or {{ used to be dangerous when it lived inside an HTML/Liquid
// include instead (see git history around 2026-09-20 for what that broke).
//
// Access checks are done server-side by a Google Apps Script Web App bound
// to the roster sheet (deployed "Execute as: Me", "Who has access: Anyone"),
// NOT by fetching a published CSV of the roster into the browser. That's a
// deliberate choice from 2026-09-20: a publicly fetchable roster CSV lets
// anyone who finds the link download every student's id+PIN in one shot.
// The Apps Script endpoint instead answers one id (+ optional pin) at a
// time and never returns the list, so even someone with the endpoint URL
// can only test guesses one at a time, never harvest it.
//
// Exposes window.MCCRoster = { ACCESS_CHECK_URL, STORAGE_KEY, checkAccess }

(function (global) {
  "use strict";

  // Apps Script Web App /exec URL. Set this after deploying the script --
  // see mcc-access-check.gs (kept alongside this file in the repo for
  // reference; Apps Script itself lives in Google's editor, not here).
  var ACCESS_CHECK_URL = "https://script.google.com/macros/s/AKfycby3_Rgjq_JY7A1Dihq6LjNBHNLNPQaLCQ2o1inouRVu0rNTpS5Y6bUUuC4f-H1_JPiulw/exec";

  // Shared across every page that grants access, so a student verified on
  // one page (a personal lesson link, or the lessons hub's login form) is
  // recognized on all the others without re-entering anything.
  var STORAGE_KEY = "mcc_student";

  // Checks one student id, optionally with a PIN.
  //   checkAccess(id)       -- id-only re-check: is this id still on the
  //                            roster? Used only for a device that already
  //                            passed a full id+PIN check earlier (its id
  //                            is sitting in localStorage) -- never used to
  //                            grant fresh access from a bare link.
  //   checkAccess(id, pin)  -- full check: grants access only if the PIN
  //                            matches that id's row.
  // Resolves to { ok: true, name } or { ok: false }.
  function checkAccess(id, pin) {
    var url = ACCESS_CHECK_URL + "?id=" + encodeURIComponent(id);
    if (typeof pin === "string") {
      url += "&pin=" + encodeURIComponent(pin);
    }
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("access check failed: " + r.status);
      return r.json();
    });
  }

  global.MCCRoster = {
    ACCESS_CHECK_URL: ACCESS_CHECK_URL,
    STORAGE_KEY: STORAGE_KEY,
    checkAccess: checkAccess
  };
})(window);
