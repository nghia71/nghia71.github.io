---
title: Current Standings
---

# Current Standings

This page is the club's live index: where the roster and every team's exam status can be seen by anyone, where the organizer and coordinator spreadsheets live for the people who run the club, and — while the new testing pipeline is being verified — a step-by-step walkthrough Mr. Nghia uses to exercise the whole system himself before real teams rely on it.

## Where the club's data lives

The club runs on three Google Sheets, kept deliberately separate so that what's safe for everyone to see and what's organizer-only never share a file:

| Spreadsheet | What it holds | Who can open it |
|---|---|---|
| **MCC Public Roster** | Every active team — name, team, level, region, status — plus a live row per test: placed, submitted, graded. | Anyone with the link |
| **MCC Master Registration** | Full student and parent details, team assignments, and the club's organizer and grader lists. | Organizers only |
| **MCC Regional Pacing** | One tab per region (UK, FR, EC, WC, VN) — each team's next chapter, testing frequency, and next test date — hand-edited by that region's coordinator. | Coordinators & organizers |

## The public roster

The **MCC Public Roster** is the one spreadsheet anyone — student, parent, or visitor — can open directly. The `Roster` tab lists every active team; the `Exams` tab shows, for each test session, whether the paper has been placed, submitted, or graded, updated automatically as the pipeline runs.

<div class="note" markdown="1">
**[Open the MCC Public Roster →](https://docs.google.com/spreadsheets/d/1m_CzWRfQxUt7puw1mVBqAZCpm1zvYDrxievSJXKGGFI/edit?usp=sharing)**
</div>

<figure class="screenshot">
<img src="./img/current-standings/roster-public.png" alt="The Roster tab of the MCC Public Roster spreadsheet, showing team name, level, region, and status columns">
<figcaption>The <code>Roster</code> tab — every active team, at a glance.</figcaption>
</figure>

<figure class="screenshot">
<img src="./img/current-standings/roster-exams.png" alt="The Exams tab of the MCC Public Roster spreadsheet, showing test sessions and their status">
<figcaption>The <code>Exams</code> tab — one row per test, updated as each one is placed, submitted, and graded.</figcaption>
</figure>

## Organizer & coordinator resources

<div class="note" markdown="1">
**Restricted access.** The two spreadsheets below hold family contact details and hand-edited pacing data, so they are shared individually with organizers and regional coordinators — not with the public. Opening a link below without access will prompt Google to request it; if you're an organizer or coordinator who should have access and doesn't, get in touch through the [Organization](./organization.md) page.
</div>

**MCC Master Registration** — `Students`, `Teams`, `Organizers`, and `Graders` tabs, plus a `Data Check` tab that flags anything inconsistent before it causes a problem downstream.

<div class="note" markdown="1">
**[Open the Master Registration Spreadsheet →](https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing)**
</div>

<figure class="screenshot">
<img src="./img/current-standings/master-students.png" alt="The Students tab of the Master Registration spreadsheet">
<figcaption>The <code>Students</code> tab on the Master Registration Spreadsheet.</figcaption>
</figure>

**MCC Regional Pacing** — one tab per region, plus a `Standings` tab recomputed automatically from graded results.

<div class="note" markdown="1">
**[Open the Regional Pacing Spreadsheet →](https://docs.google.com/spreadsheets/d/1BsRd05S7tK1lnr83vxidwDA87qAd1NWEMTFKvDfRkDg/edit?usp=sharing)**
</div>

<figure class="screenshot">
<img src="./img/current-standings/pacing-standings.png" alt="A regional tab of the Regional Pacing spreadsheet, with the Standings tab visible alongside it">
<figcaption>One region's tab on the Regional Pacing Spreadsheet — the <code>Standings</code> tab sits alongside it, recomputed from graded results.</figcaption>
</figure>

## Testing the pipeline — a walkthrough for Mr. Nghia

<div class="note" markdown="1">
**This section is a personal checklist, not general reading.** Mr. Nghia is verifying the new automated testing pipeline — paper release, submission, and grading — end to end, in each of the three roles it involves, before any real team relies on it. It stays here so it's one click away from the rest of the club's live data, and so the walkthrough can be re-run whenever it's useful.
</div>

The walkthrough uses the club's standing fixture team, `T-EC1`, and the two dedicated test accounts already set up for this — no real student data is touched.

### Before starting: reset to a clean baseline

From the Master Registration Spreadsheet's Apps Script editor, run each of these once, in order: `seedTestData()`, `seedRegionalPacing()`, `seedTestPapers()`, `resetExamsForTest_()` (via the temporary `zClaudeResetExams()` wrapper, since Apps Script hides functions ending in `_` from the run menu).

### Role 1 — Organizer

1. Open the Master Registration Spreadsheet's `Teams` tab. Confirm `T-EC1` shows `Active = TRUE`.
2. Click **MCC Tools → Check my data** from the spreadsheet's menu bar (approve the one-time permission prompt if asked), then check the `Data Check` tab: green rows mean that check is fine; a pink row names exactly what needs attention.
3. Open the Regional Pacing Spreadsheet's `EC` tab, find `T-EC1`, and set its `NextExamDate` to today — this locks it in right away instead of waiting for the real date.
4. Run `nightlyLockIn()` from the Apps Script editor to trigger tonight's lock-in immediately.
5. Check the Public Roster's `Exams` tab — a new row for `T-EC1` should appear, showing today's date and a status of "Scheduled" or similar.

<figure class="screenshot">
<img src="./img/current-standings/master-tools-menu.png" alt="The confirmation dialog that appears after choosing MCC Tools → Check my data">
<figcaption>Step 2 — the confirmation dialog after <strong>MCC Tools → Check my data</strong>.</figcaption>
</figure>

<figure class="screenshot">
<img src="./img/current-standings/master-data-check.png" alt="The Data Check tab, with one row flagged for attention and the rest green">
<figcaption>Step 2, expected result — the <code>Data Check</code> tab. Here it's caught a real example: a team due for a chapter with no test paper banked yet.</figcaption>
</figure>

### Role 2 — Parent / Student

Do this part signed into the actual test account in the browser (not your own) — the form matches whoever is signed in against the roster, so it only behaves correctly if you're really signed in as that student.

1. Signed in as the first test account, open the Test Paper Open/Submit Form and choose **"I'm ready to open my test paper."**
2. Check the `Exams` row for `T-EC1` again — `StartedUTC` and `Deadline` should now be filled in.
3. Check that account's Drive — it should now have viewer access to the test paper PDF.
4. Switch to the second test account, open the same form, choose **"Submit my solution,"** and upload any small PDF.
5. Check the `Exams` row once more — `SubmissionFileLink`, `SubmittedUTC`, and `ElapsedMinutes` should now be filled in, and `Status` should read as submitted.

<figure class="screenshot">
<img src="./img/current-standings/form-landing.png" alt="The Test Paper Open/Submit Form landing page, signed into a test account, before either option is chosen">
<figcaption>Step 1 — the form's landing choice.</figcaption>
</figure>

<figure class="screenshot">
<img src="./img/current-standings/form-upload.png" alt="The Test Paper form's submit-my-solution view with the PDF upload field">
<figcaption>Step 4 — submitting the solution PDF.</figcaption>
</figure>

### Role 3 — Grader

Back to your own account, now acting as the grader.

1. Run `setupWeeklyGrading_()` — this creates (or finds) this week's grading spreadsheet and shares it with everyone on the `Graders` tab.
2. On the `Exams` row for `T-EC1`, click the `SubmissionFileLink` — it should open the submitted PDF directly.
3. On the grading spreadsheet's `Grading` tab, add a row for this session by hand: `SessionID`, `TeamID T-EC1`, a `Score` (try 51 or above first, to see the pass path), `Comments`, your name as `GradedBy`, and check `Done`.
4. Run `pullWeeklyGrading()`.
5. Check the `Exams` row again — `Score`, `Result`, `GradedUTC`, `GradedBy`, and `GradingStatus` should all be filled in, and `Status` should read "Graded."
6. On a pass, check the Regional Pacing row for `T-EC1` — `NextChapter` should have advanced, and the `Standings` tab should reflect the new result.

<figure class="screenshot">
<img src="./img/current-standings/grading-sheet.png" alt="This week's grading spreadsheet with a completed row for T-EC1">
<figcaption>Step 3 — a completed row on the weekly grading spreadsheet.</figcaption>
</figure>

### Cleanup afterward

Run the same four reset functions from the top of this section again, so `T-EC1` is left clean for next time.
