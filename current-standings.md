---
title: Current Standings
---

# Current Standings

This page is the club's live index: where the roster and every team's exam status can be seen by anyone, where the coordinator and organizer spreadsheets live for the people who run the club, and — at the bottom — the example test suite Nghia runs against practice data to prove the whole automated pipeline works, end to end, before any real team relies on it.

## Where the club's data lives

The club runs on three Google Sheets, kept deliberately separate so that what's safe for everyone to see, what's editable by the people who run pacing, and what's family-private never share a file:

| Spreadsheet | What it holds | Who can open it |
|---|---|---|
| **MCC Public Roster** | Every active team — name, team, level, region, status — plus a live row per test: placed, submitted, graded. | Anyone with the link |
| **MCC Master Registration** | Full student and parent details, team assignments, and the club's coordinator and grader lists. | Coordinators only |
| **MCC Regional Pacing** | One tab per region (UK, FR, EC, WC, VN) — each team's next chapter, testing frequency, and next test date — hand-edited by that region's coordinator. | Coordinators (edit) & club organizers (view only) |

**Coordinators** are the volunteers who directly schedule and pace each region's teams — they get edit access to Regional Pacing. **Club organizers** is a separate, broader, read-only role for volunteers who run club activities day to day; they can see rosters and standings (Regional Pacing, view-only) but never edit anything and never touch the Master Registration Spreadsheet at all — that's where family contact details live, and organizers don't need it. See [Organization](./organization.md) for who's who.

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
<figcaption>The <code>Exams</code> tab — one row per test, updated as each one is placed, submitted, and graded. (Cropped to the identifying and status columns; the full row also tracks timestamps and Drive links in between.)</figcaption>
</figure>

## Coordinator & organizer resources

<div class="note" markdown="1">
**Restricted access.** The two spreadsheets below hold family contact details and hand-edited pacing data, so they're shared individually, not with the public. The Master Registration Spreadsheet goes to coordinators only (edit access); the Regional Pacing Spreadsheet goes to coordinators (edit) and organizers (view only). Opening a link below without access will prompt Google to request it; if you should have access and don't, get in touch through the [Organization](./organization.md) page.
</div>

**MCC Master Registration** — `Students`, `Teams`, `Coordinators`, `Graders`, and `Organizers` tabs, plus a `Data Check` tab that flags anything inconsistent before it causes a problem downstream. (The `Organizers` tab is just the contact list for that role — it's Nghia's record of who's an organizer, not something organizers themselves ever open; their own access is view-only on Regional Pacing, below, never on this spreadsheet.)

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

## Testing the pipeline — the example test suite (14 test cases, practice data)

<div class="note" markdown="1">
**What this section is.** This is the actual test suite that proves the whole automated pipeline — releasing a test paper, a family submitting it, a grader marking it, the standings updating — works correctly before any real team depends on it. It's organized as 14 numbered **test cases, labeled TC-1 through TC-14** ("TC" simply stands for *test case*). Each one checks a specific, real situation: the ordinary path where everything goes right (TC-1), a family missing a deadline (TC-4/TC-5), a team failing three times in a row (TC-3), someone signed into the wrong email (TC-14), and so on. Nghia runs all 14 himself, playing every role — coordinator, student, grader — using the club's standing **practice team** and two dedicated test accounts, never real student data.
</div>

**Why coordinators and organizers should read this, not just Nghia.** Before a real test day, you'll likely want to run a quick check of your own — smaller than this, maybe just "Check my data" and a glance at the roster. Your own check is really a *subset* of this full suite. Reading through all 14 cases first shows you exactly what a complete check looks like and why each piece matters, so you can see how your own shorter routine relates to it — and borrow any pieces of it you want. The **Objective** at the top of each case explains what real-world situation it's standing in for, and every **Expect** line tells you exactly what you should see on screen if everything is working.

<details class="admin-details">
<summary>For Nghia (system admin) only — the manual recovery sequence, if the reset button itself seems broken</summary>

<p>Coordinators reset the practice team with one click — see "Resetting between cases" just below. This manual sequence is the fallback only if that button itself stops working, or if every region needs resetting at once, not just the practice team's own regions. From the Master Registration Spreadsheet's Apps Script editor, run in order: <code>resetRegionalPacing()</code>, <code>seedRegionalPacing()</code>, <code>seedTestPapers()</code>, <code>resetExamsForTest_()</code> (via the temporary <code>zClaudeResetExams()</code> wrapper, since Apps Script hides functions ending in <code>_</code> from the run menu), then <code>nightlyLockIn()</code>. Don't skip <code>resetRegionalPacing()</code> — skipping it is exactly what caused the "StartedUTC/Deadline never fill in" bug TC-7 below documents.</p>

</details>

The suite uses the club's standing practice team — `T-EC1` and `T-WC1`, both covered by coordinator `O02` (`nghia71@gmail.com`) — and two dedicated test accounts already set up for the student role. No real student data is touched by any of this.

### Resetting between cases

**As coordinator, this is the everyday way:** open the <a href="https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing">Master Registration Spreadsheet</a> and click **MCC Tools → Reset my test team(s)**. One click resets `T-EC1`/`T-WC1` to chapter 1 with a fresh test date today, clears their test history, and immediately locks a new session in — no Apps Script needed, and this is genuinely the same button a real coordinator uses to retest anything, any time.

Each case below says if it needs anything beyond this standard reset.

### TC-1 — Positive: the full lifecycle, Pass on the first attempt

<div class="note" markdown="1">
**Objective:** this is the ordinary path — a paper is released, a family opens it, submits it, a grader marks it, and the standings update. Every other case is a variation or an exception on this one. If this doesn't work end to end, nothing else in the suite matters yet, because every other case assumes this baseline already works.
</div>

**Setup:** standard reset (see above).

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing">Master Registration Spreadsheet</a>'s <code>Teams</code> tab, confirm <code>T-EC1</code> shows <code>Active = TRUE</code> and <code>CoordinatorID = O02</code>.<br>
<em>Why it matters:</em> this is the one fact everything downstream depends on — an inactive or misassigned team simply never gets scheduled.<br>
<em>Expect:</em> both <code>TRUE</code> and <code>O02</code>.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Still on the Master Registration Spreadsheet, click <strong>MCC Tools → Check my data</strong>.<br>
<em>Why it matters:</em> this is what a real coordinator does before trusting anything else — it catches a bad reference or missing coverage before it turns into a confusing problem downstream.<br>
<em>Expect:</em> a <code>Data Check</code> tab appears, every row green.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/master-tools-menu.png" alt="The confirmation dialog that appears after choosing MCC Tools → Check my data">
<div class="tc-step-caption">The prompt that appears the moment you click — the green Data Check tab opens once you click OK.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/1m_CzWRfQxUt7puw1mVBqAZCpm1zvYDrxievSJXKGGFI/edit?usp=sharing">Public Roster</a>'s <code>Exams</code> tab, find the <code>T-EC1</code> row the reset just created.<br>
<em>Why it matters:</em> confirms the reset step actually created a fresh session, not just cleared the old one.<br>
<em>Expect:</em> a <code>SessionID</code> is set, the exam date reads today, and <code>Status</code> reads "Not started" or similar.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>4. [Student 1]</strong> Signed into the first test account, open the Test Paper Open/Submit Form, choose <strong>"I'm ready to open my test paper,"</strong> and submit.<br>
<em>Why it matters:</em> this is the actual moment a family starts their test. The form matches whichever email is signed in against the student's registered email, so it only works signed in as the real account.<br>
<em>Expect:</em> the form's own plain confirmation message.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/form-landing.png" alt="The Test Paper Open/Submit Form landing page, signed into a test account, before either option is chosen">
<div class="tc-step-caption">What step 4 looks like.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>5. [Student 1]</strong> Check the <code>Exams</code> row again.<br>
<em>Why it matters:</em> the form's own confirmation doesn't actually tell you whether starting the test succeeded (see TC-7 below, where it silently fails) — the spreadsheet is the real source of truth, always.<br>
<em>Expect:</em> a start time and deadline are now filled in, <code>Status</code> reads "In progress."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>6. [Student 1]</strong> Check that account's Google Drive.<br>
<em>Why it matters:</em> opening the test paper is the whole point of starting — access should appear automatically, without a human needing to share anything by hand.<br>
<em>Expect:</em> viewer access to the test paper PDF (this access is time-boxed — it's removed again automatically once the deadline plus a grace period passes).
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>7. [Student 2]</strong> Switch to the second test account, open the same form, choose <strong>"Submit my solution,"</strong> upload any small PDF, submit.<br>
<em>Why it matters:</em> either team member can submit for the team — this confirms that isn't restricted to whoever started it.<br>
<em>Expect:</em> the form's plain confirmation, same as any submission.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/form-upload.png" alt="The Test Paper form's submit-my-solution view with the PDF upload field">
<div class="tc-step-caption">What step 7 looks like.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>8. [Student 2]</strong> Check the <code>Exams</code> row once more.<br>
<em>Expect:</em> the submitted file link and submission time are filled in, <code>Status</code> reads "Submitted on time."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>9. [Grader]</strong> In Apps Script, run <code>setupWeeklyGrading_()</code> (no argument needed — it defaults to the current week). Its name ends in <code>_</code>, so — like <code>resetExamsForTest_()</code> in the admin box above — Apps Script hides it from the Run dropdown; run it through a small named wrapper, the same trick used there.<br>
<em>Why it matters:</em> this is the one grading step that still needs Apps Script — there's no self-service grader menu yet, unlike the coordinator's own tools.<br>
<em>Expect:</em> this week's grading spreadsheet is created (or found), shared automatically with everyone on the graders list.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>10. [Grader]</strong> On the <code>Exams</code> row, click the submitted-file link.<br>
<em>Why it matters:</em> confirms a grader — not just a coordinator — actually has access to the real submitted file.<br>
<em>Expect:</em> the submitted PDF opens.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>11. [Grader]</strong> On the weekly grading spreadsheet's <code>Grading</code> tab, add a row by hand: this session's ID, team <code>T-EC1</code>, a score of 51 or higher (a Pass), any comments, your name as grader, and check it done.<br>
<em>Expect:</em> the row saves normally.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/grading-sheet.png" alt="This week's grading spreadsheet with a completed row for T-EC1">
<div class="tc-step-caption">What step 11 looks like.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>12. [Grader]</strong> In Apps Script, run <code>pullWeeklyGrading()</code>.<br>
<em>Expect:</em> the log confirms the row was pulled and written back to the <code>Exams</code> tab.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>13. [Grader]</strong> Check the <code>Exams</code> row.<br>
<em>Expect:</em> score, result (Pass), grading time, and grader name are all filled in; <code>Status</code> reads "Graded."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>14. [Coordinator]</strong> Hover your mouse over the score cell.<br>
<em>Why it matters:</em> a grader's comments are deliberately a cell note, not a new shared file — a privacy boundary worth confirming for real.<br>
<em>Expect:</em> the grader's comment text appears as a note, without opening any new file.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>15. [Coordinator]</strong> Check <code>T-EC1</code>'s row on the <a href="https://docs.google.com/spreadsheets/d/1BsRd05S7tK1lnr83vxidwDA87qAd1NWEMTFKvDfRkDg/edit?usp=sharing">Regional Pacing Spreadsheet</a>'s <code>EC</code> tab, then its <code>Standings</code> tab.<br>
<em>Expect:</em> the team's next chapter has advanced by one, the last test date updated, and <code>Standings</code> reflects the new result.
</div>
</div>

---

### TC-2 — Edge case: Fail, with retakes remaining

<div class="note" markdown="1">
**Objective:** simulates a team that doesn't pass on the first try. A Fail shouldn't just sit there — the system should notice on its own and schedule a retake at the same chapter, without a coordinator having to catch it and act manually.
</div>

**Setup:** standard reset, then repeat TC-1's steps with a score under 51 at step 11 instead of a Pass.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> After the Fail is pulled in, check <code>T-EC1</code>'s <code>Exams</code> history on the Public Roster — there are now two rows for this team.<br>
<em>Why it matters:</em> confirms a retake was actually created automatically, not just that the Fail itself was recorded.<br>
<em>Expect:</em> the original row shows Result: Fail; a second row exists on its own, marked Attempt 2, same chapter, with a fresh date.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the Regional Pacing row for <code>T-EC1</code>.<br>
<em>Expect:</em> the next-chapter number is unchanged — a retake doesn't advance the team forward, only a Pass does.
</div>
</div>

---

### TC-3 — Edge case: retakes exhausted (Fail on the third attempt)

<div class="note" markdown="1">
**Objective:** simulates a team that keeps failing. The system shouldn't retry forever — it needs to stop at a defined limit (three attempts) and hand the decision back to a person, rather than looping forever or quietly giving up.
</div>

**Setup:** standard reset, then repeat TC-2's Fail sequence twice more so <code>T-EC1</code> reaches Attempt 3 (or, faster: after the first Fail, hand-edit the new retake row's Attempt number to 3 directly on the spreadsheet before grading it).

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Grader]</strong> Grade the Attempt 3 session as a Fail (score under 51), the same grading steps as TC-1.<br>
<em>Expect:</em> the grading step itself completes the same as any other — nothing about it looks different from grading a Pass. The retry-limit only shows up in step 2 below.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check <code>T-EC1</code>'s <code>Exams</code> history.<br>
<em>Why it matters:</em> this is the case where "the system will just handle it" stops being true — worth knowing exactly where that line is.<br>
<em>Expect:</em> Result: Fail on the Attempt 3 row; no Attempt 4 row is created automatically.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> Check the Regional Pacing row.<br>
<em>Expect:</em> the next-chapter number is still unchanged. This team genuinely needs a coordinator's own decision now — an in-person conversation with the family, a manually scheduled makeup, or moving on — the system won't do anything further on its own.
</div>
</div>

---

### TC-4 — Edge case: a submission arrives late, but still inside the grace period

<div class="note" markdown="1">
**Objective:** simulates a family with slow internet or a last-minute scramble. A slightly-late submission shouldn't be rejected outright — only flagged as late, so it still counts.
</div>

**Setup:** standard reset, start the test (TC-1 steps 1-6), then submit a little after the deadline but still within 30 minutes of it.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Student 2]</strong> Submit as in TC-1, but a few minutes after the deadline.<br>
<em>Expect:</em> the form's ordinary confirmation — identical to an on-time submission. (Worth noticing: the system itself distinguishes late from on-time; the confirmation screen the student sees does not.)
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the <code>Exams</code> row.<br>
<em>Expect:</em> the submission is accepted — file link and submission time filled in, <code>Status</code> reads "Submitted — N minutes late," not rejected.
</div>
</div>

---

### TC-5 — Exception: a submission arrives past the grace period

<div class="note" markdown="1">
**Objective:** confirms there's a real cutoff. Grace is generous but not infinite — a genuinely too-late submission needs to be rejected outright, not accepted with a scary-looking "very late" status that still counts.
</div>

**Setup:** standard reset, start the test (TC-1 steps 1-6), then submit well past the deadline plus 30 minutes.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Student 2]</strong> Submit past the grace period.<br>
<em>Expect:</em> the form's ordinary confirmation — the student still sees nothing indicating rejection. This is the sharpest version of a pattern worth remembering: the confirmation screen never tells a student whether something actually went wrong.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the <code>Exams</code> row.<br>
<em>Expect:</em> no submission was recorded at all — no file link, nothing. A real family in this situation needs to be told directly (a message, a call) that their submission didn't go through — the system will not tell them on its own.
</div>
</div>

---

### TC-6 — Positive: resubmission

<div class="note" markdown="1">
**Objective:** simulates a family correcting a mistake — the wrong file, or second thoughts. Their first attempt shouldn't be lost, and the system should always reflect whichever file they submitted most recently.
</div>

**Setup:** standard reset, run TC-1 through the first submission (its step 7).

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Student 2]</strong> Open the form again, choose "Submit my solution" again, upload a different file.<br>
<em>Expect:</em> the form's ordinary confirmation, same as any submission.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the <code>Exams</code> row's submitted-file link.<br>
<em>Expect:</em> it now points at the new file.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> Check Google Drive directly, not through the spreadsheet link.<br>
<em>Why it matters:</em> confirms the first file wasn't deleted, only superseded — families sometimes want their original attempt back.<br>
<em>Expect:</em> both the first and second uploaded files still exist.
</div>
</div>

---

### TC-7 — Exception: starting a test when no matching paper is ready yet (a real gap, found for real)

<div class="note" markdown="1">
**Objective:** this genuinely happened once, for real, the first time this suite was ever run — kept permanently as its own case precisely so it's never a surprise again. It's a real, still-open gap: the system doesn't yet tell a student when this specific thing goes wrong.
</div>

**Setup:** get a team into a state where its next-chapter number is ahead of what's been prepared on the Papers list (paper prep always starts at chapter 1) — for example, hand-edit that team's <code>NextChapter</code> cell on the Regional Pacing tab up by one and set <code>NextExamDate</code> to today, then let <code>nightlyLockIn()</code> create the session; running TC-1 to a Pass so the team advances normally works too, it just takes longer.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Student 1]</strong> Open the form, choose "I'm ready to open my test paper," submit.<br>
<em>Expect:</em> the form's ordinary confirmation — indistinguishable from a real success. This is the entire problem: the system doesn't yet surface a student-facing error for this specific case.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc7-step1-form-confirmation.png" alt="The test-paper form's confirmation screen, ordinary and unremarkable">
<div class="tc-step-caption">The confirmation looks exactly like a normal success — nothing here hints at the missing-paper problem.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the <code>Exams</code> row.<br>
<em>Expect:</em> the start time and deadline are still blank. Nothing ran on the backend, and nothing on the student's screen showed that anything was wrong.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc7-step2-exams-no-start.png" alt="The Exams sheet row for the team, with StartedUTC and Deadline both still blank">
<div class="tc-step-caption">T-EC1's row after the "open" attempt — StartedUTC and Deadline are still empty.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> What to actually do about it: run <strong>MCC Tools → Check my data</strong> <em>before</em> a test window opens, every time.<br>
<em>Why it matters:</em> this check is specifically built to catch exactly this in advance, by comparing every active team's next-due chapter against what's actually prepared on the Papers list. Catching it here, ahead of time, is the whole point — don't rely on a family ever reporting "nothing happened when I clicked start," because nothing on their screen will tell them something's wrong.<br>
<em>Expect:</em> a red row naming the exact team and the exact missing chapter.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc7-step3-data-check-flag.png" alt="The Data Check tab, with one row flagged: T-EC1 due for Level 3, Chapter 2, Attempt 1 next, but no matching Papers row exists yet">
<div class="tc-step-caption">The real Data Check output from this run — it names T-EC1 and the exact missing chapter, and warns their next Start click would fail with &quot;no-paper.&quot;</div>
</div>
</div>

---

### TC-8 — Exception: a team never submits (a no-show)

<div class="note" markdown="1">
**Objective:** confirms that access to a test paper isn't left open forever. Once there's no realistic chance a legitimate submission is still coming, the system should revoke access on its own.
</div>

**Setup:** standard reset, start the test (TC-1 steps 1-6), then hand-edit the <code>Exams</code> row's <code>Deadline</code> cell to well in the past (rather than actually waiting out the grace period).

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Admin]</strong> The nightly access-cleanup run happens on its own on schedule (or Nghia can trigger <code>sweepExpiredAccess()</code> directly).<br>
<em>Expect:</em> the team's <code>Exams</code> row is marked expired, and its shared access to the test paper is revoked.<br>
<em>Why it matters:</em> this is what makes "time-boxed access" actually true in practice, not just something documented.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc8-step1-sweep.png" alt="The Apps Script execution log confirming sweepExpiredAccess revoked access for T-EC1's session, naming both students removed">
<div class="tc-step-caption">A real sweep — names the exact session and the exact accounts it removed.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Student 1]</strong> Check Drive access to the test paper again, still signed into the same account.<br>
<em>Expect:</em> viewer access is now revoked — the file no longer opens for them.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc8-step2-drive-404.png" alt="Google Drive's 404 error page, shown when opening the test paper file signed in as the student account whose access was just revoked">
<div class="tc-step-caption">The file is really gone for them — Drive returns a plain 404, not even a "request access" screen.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> Check the <code>Exams</code> row's status.<br>
<em>Expect:</em> reads "Overdue — the grace period has ended, contact your coordinator." This is the cue for a coordinator to actually reach out to the family — nothing automatically retries a no-show the way it does a graded Fail.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc8-step3-status-overdue.png" alt="The Exams sheet showing T-EC1's Status column reading Overdue -- the grace period has ended, contact your coordinator">
<div class="tc-step-caption">The exact wording a coordinator sees, word for word.</div>
</div>
</div>

---

### TC-9 — Edge case: clicking "I'm ready" twice

<div class="note" markdown="1">
**Objective:** simulates an accidental double-click, or a student genuinely unsure whether their first click registered. Either way, it shouldn't reset the clock or cause any confusing duplicate state.
</div>

**Setup:** standard reset, start the test once (TC-1 steps 1-4).

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Student 1]</strong> Open the form again, choose "I'm ready to open my test paper" a second time, submit.<br>
<em>Expect:</em> the form's ordinary confirmation, identical to the first time — no visible difference.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc9-step1-second-click.png" alt="The same Opening your test paper screen, shown a second time">
<div class="tc-step-caption">The second click looks exactly like the first — nothing warns the student either way.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the <code>Exams</code> row.<br>
<em>Expect:</em> the start time and deadline are completely unchanged from the first click — the clock did not restart.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc9-step2-unchanged-row.png" alt="T-EC1's Exams row, with the same StartedUTC and Deadline as before the second click">
<div class="tc-step-caption">Same StartedUTC, same Deadline — the double-click changed nothing.</div>
</div>
</div>

---

### TC-10 — Edge case: an inactive team is skipped, not scheduled

<div class="note" markdown="1">
**Objective:** confirms that deactivating a team — a family taking a break, a team disbanding — actually stops new tests from being scheduled for them, without needing to also delete their data.
</div>

**Setup:** standard reset, then on the <code>Teams</code> tab set <code>T-EC1</code>'s Active column to <code>FALSE</code> before the next scheduling run.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> With <code>T-EC1</code> inactive, trigger scheduling again — clicking <strong>Reset my test team(s)</strong> still runs it at the end.<br>
<em>Expect:</em> the result dialog still names <code>T-EC1</code> in its opening line, but the "fresh session(s) locked in" list names only <code>T-WC1</code> — <code>T-EC1</code> gets no new session, and its own Regional Pacing row is left completely untouched.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc10-step1-done-dialog.png" alt="The Done dialog naming T-EC1 and T-WC1 as reset, but listing a fresh session for T-WC1 only">
<div class="tc-step-caption">A real result — T-EC1 is named, but gets no fresh session because it's inactive.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Set Active back to <code>TRUE</code> and trigger scheduling again.<br>
<em>Expect:</em> now it schedules normally, same as TC-1.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc10-step2-reactivated-dialog.png" alt="The Done dialog now listing fresh sessions for both T-EC1 and T-WC1">
<div class="tc-step-caption">Reactivated — T-EC1 gets a fresh session again, same as any other team.</div>
</div>
</div>

---

### TC-11 — Edge case: the next test date is set in the past

<div class="note" markdown="1">
**Objective:** confirms that a stale or mistyped date doesn't get quietly auto-corrected, or silently skipped forever — it should be flagged as something a coordinator actually needs to look at.
</div>

**Setup:** standard reset, then clear <code>T-EC1</code>'s freshly-locked row from the <code>Exams</code> sheet (the reset itself always locks in a fresh session as its last step, and that session has to be cleared first or it masks this test). Then, on the Regional Pacing <code>EC</code> tab, hand-set <code>T-EC1</code>'s next test date to well before today. (Don't use the reset button for this one — it sets the date to today itself and immediately locks in a session again; hand-edit the date instead.)

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Admin]</strong> Trigger scheduling.<br>
<em>Expect:</em> the run log names <code>T-EC1</code> as skipped because its next test date is in the past, printing that date back so a coordinator can see exactly what's stale — not scheduled, and not dropped either; it stays flagged, by name, on every run until fixed. (<code>T-WC1</code> shows up too, skipped for the unrelated reason that it already has its own unresolved session from the reset.)
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc11-step1-past-date-skip.png" alt="Apps Script execution log showing T-EC1 skipped because its NextExamDate is in the past, dated 2026-01-01">
<div class="tc-step-caption">A real run — T-EC1 flagged by name with the stale date it's still carrying.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Set the next test date to today, trigger scheduling again.<br>
<em>Expect:</em> now it schedules normally — a fresh session gets created for <code>T-EC1</code>. (<code>T-WC1</code> still shows as skipped, for that same unrelated leftover session.)
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc11-step2-normal-scheduling.png" alt="Apps Script execution log showing a fresh session created for T-EC1 once its date is set back to today">
<div class="tc-step-caption">Fixed — T-EC1 schedules normally again once its date is current.</div>
</div>
</div>

---

### TC-12 — Coordinator tool: "Check my data" catches a real problem

<div class="note" markdown="1">
**Objective:** confirms the self-check isn't just a formality that always reports green — it needs to actually catch a real broken state, which is the entire reason it exists.
</div>

**Setup:** standard reset, then deliberately break something small — for example, delete <code>T-EC1</code>'s Regional Pacing row entirely.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> Click <strong>MCC Tools → Check my data</strong>.<br>
<em>Expect:</em> two red rows, both naming <code>T-EC1</code> specifically — one explaining it's active but has no Regional Pacing row and won't be scheduled, the other that it's due for a chapter with no Regional Pacing row so it'll never be picked up by the nightly lock-in — not a generic "something's wrong," but the exact team and the exact consequence, twice over.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc12-step1-check-data.png" alt="The Data Check tab showing two red rows, both naming T-EC1 and its missing Regional Pacing row">
<div class="tc-step-caption">A real check — two rows, same root cause, both naming T-EC1 by name.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Click <strong>Reset my test team(s)</strong>.<br>
<em>Why it matters:</em> confirms the self-service reset also recovers from this, not just resets an already-clean state.<br>
<em>Expect:</em> completes normally — or, if it doesn't, that itself is a real finding worth reporting. In practice, it's the latter: the Done dialog names only <code>T-WC1</code> in its "fresh session(s) locked in" list, silently dropping <code>T-EC1</code>, and a check of the Regional Pacing tab afterward confirms why — <code>T-EC1</code>'s row is still entirely missing. The self-service button can't recover from a Regional Pacing row that doesn't exist at all; a coordinator hitting this needs to ask for help rather than trust the "Ready to test from the start again" message.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc12-step2-reset-incomplete.png" alt="The Done dialog locking in a fresh session for T-WC1 only, silently omitting T-EC1">
<div class="tc-step-caption">A real finding — T-EC1 is quietly left behind; the button doesn't say so.</div>
</div>
</div>

---

### TC-13 — Coordinator tool: "Reset my test team(s)" as the everyday reset

<div class="note" markdown="1">
**Objective:** this is genuinely the everyday way a coordinator retests something now — worth confirming end to end on its own, not just trusting it because every case above happened to use it along the way.
</div>

**Setup:** run TC-1 to completion first, so there's real state (a graded, advanced team) to reset away.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> Click <strong>MCC Tools → Reset my test team(s)</strong>.<br>
<em>Expect:</em> a confirmation dialog names both <code>T-EC1</code> and <code>T-WC1</code> (every region coordinator <code>O02</code> covers) and explains what it's about to do.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc13-reset-confirm.png" alt="The Reset your test team(s) confirmation dialog, naming T-EC1 and T-WC1">
<div class="tc-step-caption">The confirmation dialog after clicking Reset my test team(s).</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the result dialog after confirming.<br>
<em>Expect:</em> a fresh session ID is named for each team — confirming the reset and the re-scheduling both actually happened in one click.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc13-reset-done.png" alt="The Done dialog naming fresh session IDs for T-EC1 and T-WC1">
<div class="tc-step-caption">A real result — a fresh session locked in for each team.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> Check <code>T-EC1</code>'s Regional Pacing row and test history.<br>
<em>Expect:</em> next chapter back to 1, next test date is today, old test rows gone, exactly one fresh row for today.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc13-step3-pacing-and-history.png" alt="T-EC1's Regional Pacing row showing next chapter 1, and its Exams history showing exactly one fresh row">
<div class="tc-step-caption">T-EC1 back to chapter 1 (top), with exactly one fresh Exams row (bottom).</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>4. [Coordinator]</strong> Check a team in a region <code>O02</code> doesn't cover — for example <code>T-UK1</code>.<br>
<em>Why it matters:</em> this is the whole safety property this feature exists for — a coordinator resetting their own teams must never touch anyone else's.<br>
<em>Expect:</em> completely untouched, identical to before the click.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc13-step4-uk1-unchanged.png" alt="T-UK1's Regional Pacing row, unchanged by the reset">
<div class="tc-step-caption">T-UK1 — a team O02 doesn't coordinate — completely untouched.</div>
</div>
</div>

---

### TC-14 — Exception: signed in as the wrong account

<div class="note" markdown="1">
**Objective:** simulates the single most common real mix-up: a parent's own email instead of the student's registered one, or a typo'd address. The form shouldn't misattribute a submission to the wrong team, or error in a confusing way — it should just not recognize the person, and (consistent with every other exception case above) tell them nothing either way.
</div>

**Setup:** standard reset.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Anyone]</strong> Signed in as an account not on <code>T-EC1</code> — <code>nghia71@gmail.com</code> works fine for this — open the Test Paper Open/Submit Form, choose "I'm ready to open my test paper," submit.<br>
<em>Expect:</em> the form's ordinary confirmation — again, no visible error of any kind.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc14-step1-form-confirmation.png" alt="The form's ordinary confirmation message, shown after submitting signed in as an unregistered email">
<div class="tc-step-caption">A real submission — the same friendly confirmation, whether or not the email was actually recognized.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the <code>Exams</code> sheet.<br>
<em>Expect:</em> nothing changed anywhere — no row was touched. If a real family ever reports "nothing happened when I clicked start," this is the first thing to check, ahead of TC-7's missing-paper case: most often it's simply the wrong email signed in.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc14-step2-exams-unchanged.png" alt="The Exams sheet, showing T-EC1's row with StartedUTC and Deadline still both blank after the submission">
<div class="tc-step-caption">Confirmed — T-EC1's row is exactly as it was; the unrecognized email touched nothing.</div>
</div>
</div>

---

### Cleanup afterward

**[Coordinator]** Click **MCC Tools → Reset my test team(s)** one more time to leave a clean baseline for next time.

### What this suite does and doesn't prove

Every case above exercises the same underlying code the automated developer test suite already checks on every change. Running through it by hand like this isn't a hunt for new bugs in the logic — it's confirming what a real coordinator, a real family, and a real grader each actually experience, using only the access each of them would really have. TC-7 and TC-14 in particular are worth re-reading even after they pass cleanly: they're not bugs waiting to be fixed, they're **real, permanent gaps** — no student-facing error message exists yet for either situation — that every coordinator should know about, because the system itself will never mention them.

<div class="note" markdown="1">
**Coming next.** Once this fake-data suite is fully illustrated with screenshots for every step (and a short walkthrough video at the end for anyone who'd rather watch than read), the same 14 cases become the template for real user-acceptance testing — real coordinators, real families, and real graders, volunteering to run a smaller slice of this suite themselves against their own accounts. See [Organization](./organization.md) if you'd like to help.
</div>

