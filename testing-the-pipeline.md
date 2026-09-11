---
title: Testing the Pipeline
---

# Testing the Pipeline

Here is what actually happens when a real team takes a test, start to finish: a coordinator (or the family itself) schedules the team's next test date; when that date arrives, the system creates the student's test session on its own; the student visits the sign-up form, confirms they're ready, and the test paper appears shared on their Google Drive within moments; the student solves it and uploads their answer as a PDF through that same form; a grader marks it and records the score; and the team's standing updates to reflect the result. No one emails a PDF around, and no coordinator has to update a spreadsheet by hand.

This page is the test suite that proves every link in that chain actually works — before any real family's test depends on it. It's organized as 14 numbered **test cases, labeled TC-1 through TC-14** ("TC" simply stands for *test case*). Each one checks a specific, real situation: the ordinary path where everything goes right (TC-1), a family missing a deadline (TC-4/TC-5), a team failing three attempts in a row (TC-3), someone signed into the wrong email (TC-14), and so on. Nghia runs through all 14 himself, using the club's standing **practice team** (`T-EC1` and `T-WC1`) and two dedicated **practice accounts** instead of real students — see "Roles, accounts, and how to read a test case" just below for exactly which account plays which role. No real student data is touched by any of this.

<div class="note" markdown="1">
**Why coordinators and organizers should read this, not just Nghia.** Before a real test day, you'll likely want to run a quick check of your own — smaller than this, maybe just "Check my data" and a glance at the roster. Your own check is really a *subset* of this full suite. Reading through all 14 cases first shows you exactly what a complete check looks like and why each piece matters, so you can see how your own shorter routine relates to it — and borrow any pieces of it you want. The **Objective** at the top of each case explains what real-world situation it's standing in for, and every **Expect** line tells you exactly what you should see on screen if everything is working.
</div>

## Roles, accounts, and how to read a test case

### The accounts used in this suite

Every step below is tagged with who does it — really, which Google account needs to be signed in when it happens:

| Tag | Who | Account used |
|---|---|---|
| **[Coordinator]** | The person scheduling and pacing the practice team | Nghia's own account, `nghia71@gmail.com` — coordinator code `O02` |
| **[Student 1]** | The first practice "family" | `mcc.tst1@gmail.com` — shows in Google's account switcher as **Student 1 MCC** |
| **[Student 2]** | The second practice "family" | `mcc.tsttwo@gmail.com` — shows in Google's account switcher as **Student 2 MCC** |
| **[Grader]** | Whoever marks the submitted test | Nghia's own account — in real life, this would be a volunteer grader's own account instead |
| **[Admin]** | A step only Nghia can do, from the Apps Script editor — not something any coordinator has a button for | Nghia's own account |
| **[Anyone]** | Deliberately *not* one of the two practice accounts, to check what happens with an email the system doesn't recognize | Nghia's own account, used here only because it isn't registered to `T-EC1` |

Coordinator, Grader, and Admin are really all the same person — Nghia — signed into the same account, since he's the one running the whole suite by himself. The two Student tags are genuinely two separate accounts, so the system can tell "who's on the team" apart the same way it would for two real family members.

### Switching between accounts in Chrome

Most steps below need you signed into a specific one of the accounts above before you do anything. In Chrome:

1. Click your profile picture in the top-right corner of any Google page — Drive, Sheets, the sign-up form all show it in the same spot.
2. If the account you need is already listed in that menu, click its name — Chrome switches to it instantly, no password needed.
3. If it isn't listed yet, click **Add another account**, sign in with that account's email and password once, and from then on it stays in the list — you'll never need to type that password again, just click the name.
4. Before doing anything that matters (opening the test form, clicking "Check my data"), glance at the profile picture in the corner first, to make sure you're actually signed in as the account the step calls for. It's easy to click straight through a step as the wrong account, since Google won't warn you either way.

### How to read a test case box

Each test case below is a box labeled **TC-#** (test case number) with a short plain-English title, then:

- **Objective** — one or two sentences on the real, everyday situation this case stands in for, and what's supposed to happen if the system handles it correctly.
- **Setup** — the one thing that has to be true before the numbered steps start. Almost always this is just "click the reset button" (explained in "Resetting between cases," just below); a few cases need one extra manual step first, and that's spelled out there in full.
- A numbered list of **steps**. Each one opens with a bracketed tag — see the accounts table above — naming who does it, then what to actually click or check.
- *Why it matters* — appears under some steps, in plain words, to explain why that particular check is worth doing at all — not "what the code does," but what would actually go wrong for a real family if this step were broken.
- *Expect* — what you should literally see on screen or in the spreadsheet if everything worked. Compare it to what you actually see; a mismatch is a real problem worth reporting.

## Resetting between cases

Most cases below start from the same clean slate. **As coordinator**, signed into `nghia71@gmail.com`, open the <a href="https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing">Master Registration Spreadsheet</a> and click **MCC Tools → Reset my test team(s)**. One click resets `T-EC1` and `T-WC1` back to chapter 1 with a fresh test date of today, clears their test history, and immediately schedules a new session for each — this is genuinely the same button a real coordinator would use to retest anything, any time, not a special test-only shortcut.

Each case below says, in its own **Setup** line, whether it needs anything beyond this one click.

<details class="admin-details">
<summary>For Nghia (system admin) only — the manual recovery sequence, if the reset button itself seems broken</summary>

<p>This manual sequence is the fallback only if the reset button above stops working, or if every region needs resetting at once, not just the practice team's own regions. From the Master Registration Spreadsheet's Apps Script editor, run in order: <code>resetRegionalPacing()</code>, <code>seedRegionalPacing()</code>, <code>seedTestPapers()</code>, <code>resetExamsForTest_()</code> (via the temporary <code>zClaudeResetExams()</code> wrapper, since Apps Script hides functions ending in <code>_</code> from the run menu), then <code>nightlyLockIn()</code>. Don't skip <code>resetRegionalPacing()</code> — skipping it is exactly what caused the "StartedUTC/Deadline never fill in" bug TC-7 documents.</p>

</details>

### TC-1 — Positive: the full lifecycle, a Pass on the first attempt

<div class="note" markdown="1">
**Objective:** this is what a completely ordinary test looks like, start to finish — a test paper becomes available, a student opens and submits it, a grader marks it, and the team's standing updates. Every other case in this suite is really a variation on this one: something arriving late, someone signed into the wrong account, a team failing instead of passing. If this baseline doesn't work end to end, none of those other cases mean anything yet.
</div>

**Setup:** the standard reset (see "Resetting between cases" above).

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing">Master Registration Spreadsheet</a>'s <code>Teams</code> tab, and find <code>T-EC1</code>'s row.<br>
<em>Why it matters:</em> the nightly scheduling run only creates a test for a team marked Active and assigned to a real coordinator — get either one wrong, and this team would simply never be scheduled, with nothing anywhere to say so.<br>
<em>Expect:</em> <code>Active</code> reads <code>TRUE</code>, and <code>CoordinatorID</code> reads <code>O02</code> (Nghia's own coordinator code).
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Still on the Master Registration Spreadsheet, click <strong>MCC Tools → Check my data</strong>.<br>
<em>Why it matters:</em> this is what a real coordinator should do before trusting anything else that day — it catches a broken reference or a missing team before it turns into a confusing problem later.<br>
<em>Expect:</em> a <code>Data Check</code> tab appears, with every row green.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/master-tools-menu.png" alt="The confirmation dialog that appears after choosing MCC Tools → Check my data">
<div class="tc-step-caption">The prompt that appears the moment you click — the green Data Check tab opens once you click OK.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/1m_CzWRfQxUt7puw1mVBqAZCpm1zvYDrxievSJXKGGFI/edit?usp=sharing">Public Roster</a>'s <code>Exams</code> tab, and find the row the reset just created for <code>T-EC1</code>.<br>
<em>Why it matters:</em> confirms the reset genuinely created a brand-new test session, rather than just clearing the old one and stopping there.<br>
<em>Expect:</em> a session ID is filled in, the exam date reads today, and the status column reads something like "Not started."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>4. [Student 1]</strong> Signed into <code>mcc.tst1@gmail.com</code>, open the Test Paper Open/Submit Form, choose <strong>"I'm ready to open my test paper,"</strong> and submit.<br>
<em>Why it matters:</em> this is the actual moment a real family starts their test. The form checks whichever email is signed in against the student's registered email — sign in as the wrong account, and it won't work (see TC-14).<br>
<em>Expect:</em> the form's own plain confirmation message.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/form-landing.png" alt="The Test Paper Open/Submit Form landing page, signed into a test account, before either option is chosen">
<div class="tc-step-caption">What step 4 looks like.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>5. [Student 1]</strong> Still signed into <code>mcc.tst1@gmail.com</code>, check the <code>Exams</code> row again.<br>
<em>Why it matters:</em> the form's confirmation message alone doesn't actually tell you whether starting the test worked — see TC-7, where it looks identical even when it silently fails. The spreadsheet is always the real source of truth.<br>
<em>Expect:</em> a start time and a deadline are now filled in, and the status reads "In progress."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>6. [Student 1]</strong> Still signed into <code>mcc.tst1@gmail.com</code>, open that account's Google Drive.<br>
<em>Why it matters:</em> actually being able to open the test paper is the whole point of starting it — access should appear on its own, without anyone needing to manually share a file.<br>
<em>Expect:</em> the test paper PDF appears, and opens. (This access is temporary — it's removed automatically again once the deadline plus a short grace period has passed.)
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>7. [Student 2]</strong> Switch to <code>mcc.tsttwo@gmail.com</code>, open the same form, choose <strong>"Submit my solution,"</strong> upload any small PDF, and submit.<br>
<em>Why it matters:</em> confirms either team member can submit for the team — it isn't locked to whoever happened to click "start."<br>
<em>Expect:</em> the form's plain confirmation message, same as any submission.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/form-upload.png" alt="The Test Paper form's submit-my-solution view with the PDF upload field">
<div class="tc-step-caption">What step 7 looks like.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>8. [Student 2]</strong> Still signed into <code>mcc.tsttwo@gmail.com</code>, check the <code>Exams</code> row once more.<br>
<em>Expect:</em> a link to the submitted file and a submission time are now filled in, and the status reads "Submitted on time."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>9. [Grader]</strong> Signed into <code>nghia71@gmail.com</code>, in the Apps Script editor, run <code>setupWeeklyGrading_()</code> (no need to enter anything — it defaults to the current week). Its name ends in <code>_</code>, so — like <code>resetExamsForTest_()</code> in the admin box above — Apps Script hides it from the Run dropdown; run it through a small named wrapper, the same trick used there.<br>
<em>Why it matters:</em> grading is currently the one step in this whole chain that still needs Apps Script directly — there's no click-a-menu option for it yet, unlike everything a coordinator does.<br>
<em>Expect:</em> this week's grading spreadsheet is created (or found, if it already exists) and shared automatically with everyone on the graders list.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>10. [Grader]</strong> On the <code>Exams</code> row, click the link to the submitted file.<br>
<em>Why it matters:</em> confirms a grader — not just a coordinator — genuinely has access to open the real file a student submitted.<br>
<em>Expect:</em> the submitted PDF opens normally.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>11. [Grader]</strong> On the weekly grading spreadsheet's <code>Grading</code> tab, add a row by hand: this session's ID, team <code>T-EC1</code>, a score of 51 or higher (a Pass), any comments, your own name as grader, and mark it done.<br>
<em>Expect:</em> the row saves normally, the same as typing into any spreadsheet.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/grading-sheet.png" alt="This week's grading spreadsheet with a completed row for T-EC1">
<div class="tc-step-caption">What step 11 looks like.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>12. [Grader]</strong> In the Apps Script editor, run <code>pullWeeklyGrading()</code>.<br>
<em>Expect:</em> the execution log confirms the row was read and written back to the <code>Exams</code> tab.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>13. [Grader]</strong> Check the <code>Exams</code> row.<br>
<em>Expect:</em> the score, the result ("Pass"), the grading time, and the grader's name are all filled in, and the status now reads "Graded."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>14. [Coordinator]</strong> Hover your mouse over the score cell.<br>
<em>Why it matters:</em> a grader's written comments are deliberately kept as a private note on the cell, not turned into a new shared file — worth actually confirming that boundary holds.<br>
<em>Expect:</em> the grader's comment text appears as a small note, without opening or sharing any new file.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>15. [Coordinator]</strong> Check <code>T-EC1</code>'s row on the <a href="https://docs.google.com/spreadsheets/d/1BsRd05S7tK1lnr83vxidwDA87qAd1NWEMTFKvDfRkDg/edit?usp=sharing">Regional Pacing Spreadsheet</a>'s <code>EC</code> tab, then its <code>Standings</code> tab.<br>
<em>Expect:</em> the team's next chapter has moved forward by one, the last-test date is updated, and <code>Standings</code> now reflects the new result.
</div>
</div>

---

### TC-2 — Edge case: a Fail with retakes remaining

<div class="note" markdown="1">
**Objective:** simulates a team that doesn't pass on a given attempt. A Fail shouldn't just sit there waiting for someone to notice — the system should schedule a retake at the same chapter on its own, without a coordinator having to catch it and act by hand.
</div>

**Setup:** the standard reset, then repeat TC-1's steps, but with step 11's score under 51 (a Fail) instead of a Pass.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> After the Fail is recorded, check <code>T-EC1</code>'s <code>Exams</code> history on the Public Roster — there are now two rows for this team.<br>
<em>Why it matters:</em> confirms a retake was actually created automatically, not just that the Fail itself got written down.<br>
<em>Expect:</em> the original row shows Result: Fail; a second row exists on its own, marked Attempt 2, same chapter, with a fresh date.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the Regional Pacing row for <code>T-EC1</code>.<br>
<em>Expect:</em> the next-chapter number is unchanged — a retake doesn't move the team forward; only a Pass does.
</div>
</div>

---

### TC-3 — Edge case: retakes exhausted (a Fail on the third attempt)

<div class="note" markdown="1">
**Objective:** simulates a team that keeps failing. The system shouldn't keep retrying forever — it needs to stop at a defined limit (three attempts) and hand the decision back to a person, rather than looping endlessly or quietly giving up.
</div>

**Setup:** the standard reset, then repeat TC-2's Fail sequence twice more, so <code>T-EC1</code> reaches Attempt 3. (Faster alternative: after the first Fail, hand-edit the new retake row's Attempt number to 3 directly on the spreadsheet, before grading it.)

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Grader]</strong> Grade the Attempt 3 session as a Fail (a score under 51), the same grading steps as TC-1.<br>
<em>Expect:</em> grading itself completes exactly as normal — nothing about it looks different from grading a Pass. The retry limit only shows up in step 2, below.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check <code>T-EC1</code>'s <code>Exams</code> history.<br>
<em>Why it matters:</em> this is the exact point where "the system just handles it automatically" stops being true — worth knowing precisely where that line is.<br>
<em>Expect:</em> Result: Fail on the Attempt 3 row; no Attempt 4 row gets created automatically.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> Check the Regional Pacing row.<br>
<em>Expect:</em> the next-chapter number is still unchanged. This team genuinely needs a coordinator's own judgment now — a conversation with the family, a manually scheduled makeup, or moving on — the system won't take any further action on its own.
</div>
</div>

---

### TC-4 — Edge case: a submission arrives late, but still inside the grace period

<div class="note" markdown="1">
**Objective:** simulates a family with slow internet, or a last-minute scramble. A slightly-late submission shouldn't be rejected outright — it should just be flagged as late, and still count.
</div>

**Setup:** the standard reset, start the test (TC-1 steps 1-6), then submit a little after the deadline, but still within 30 minutes of it.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Student 2]</strong> Signed into <code>mcc.tsttwo@gmail.com</code>, submit as in TC-1, but a few minutes after the deadline.<br>
<em>Expect:</em> the form's ordinary confirmation message — identical to an on-time submission. (Worth noticing: the system itself does track late vs. on-time; the confirmation screen the student sees doesn't show the difference either way.)
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the <code>Exams</code> row.<br>
<em>Expect:</em> the submission is accepted — the file link and submission time are filled in, and the status reads "Submitted — N minutes late," not rejected.
</div>
</div>

---

### TC-5 — Exception: a submission arrives past the grace period

<div class="note" markdown="1">
**Objective:** confirms there's a real cutoff. Grace is generous but not infinite — a genuinely too-late submission needs to be rejected outright, rather than accepted with a scary-looking "very late" status that still secretly counts.
</div>

**Setup:** the standard reset, start the test (TC-1 steps 1-6), then submit well past the deadline plus 30 minutes.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Student 2]</strong> Signed into <code>mcc.tsttwo@gmail.com</code>, submit past the grace period.<br>
<em>Expect:</em> the form's ordinary confirmation message — the student still sees nothing indicating rejection. This is the sharpest version of a pattern worth remembering: the confirmation screen never tells a student whether something actually went wrong.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the <code>Exams</code> row.<br>
<em>Expect:</em> no submission was recorded at all — no file link, nothing. A real family in this situation needs to be told directly — a message, a phone call — that their submission didn't go through; the system will not tell them on its own.
</div>
</div>

---

### TC-6 — Positive: resubmission

<div class="note" markdown="1">
**Objective:** simulates a family correcting a mistake — the wrong file, or second thoughts. Their first attempt shouldn't be lost, and the system should always reflect whichever file they submitted most recently.
</div>

**Setup:** the standard reset, run TC-1 through its first submission (step 7).

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Student 2]</strong> Signed into <code>mcc.tsttwo@gmail.com</code>, open the form again, choose "Submit my solution" again, and upload a different file.<br>
<em>Expect:</em> the form's ordinary confirmation message, same as any submission.
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
**Objective:** this genuinely happened once, for real, the very first time this suite was ever run — kept permanently as its own case so it's never a surprise again. It's a real, still-open gap: right now, nothing tells a student when this specific thing goes wrong.
</div>

**Setup:** get a team into a state where its next chapter is ahead of what's actually been prepared on the Papers list (paper prep always starts at chapter 1). The fastest way: on the Regional Pacing <code>EC</code> tab, hand-edit <code>T-EC1</code>'s <code>NextChapter</code> cell up by one and set <code>NextExamDate</code> to today, then let the nightly scheduling run (<code>nightlyLockIn()</code>) create the session. Running TC-1 all the way through to a Pass, so the team advances normally, works too — it just takes longer.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Student 1]</strong> Signed into <code>mcc.tst1@gmail.com</code>, open the form, choose "I'm ready to open my test paper," and submit.<br>
<em>Expect:</em> the form's ordinary confirmation message — indistinguishable from a real success. This is the entire problem: right now, there's no student-facing error message for this specific situation.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc7-step1-form-confirmation.png" alt="The test-paper form's confirmation screen, ordinary and unremarkable">
<div class="tc-step-caption">The confirmation looks exactly like a normal success — nothing here hints at the missing-paper problem.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the <code>Exams</code> row.<br>
<em>Expect:</em> the start time and deadline are still blank. Nothing actually happened on the backend, and nothing on the student's screen showed that anything had gone wrong.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc7-step2-exams-no-start.png" alt="The Exams sheet row for the team, with StartedUTC and Deadline both still blank">
<div class="tc-step-caption">T-EC1's row after the "open" attempt — StartedUTC and Deadline are still empty.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> What to actually do about it: before each test window opens — the day you expect students to start testing — click <strong>MCC Tools → Check my data</strong> as a standing habit, not just when something already seems wrong.<br>
<em>Why it matters:</em> this check exists specifically to catch this situation in advance, by comparing every active team's next-due chapter against what's actually prepared on the Papers list. Catching it here, ahead of time, is the entire point — don't wait for a family to report "nothing happened when I clicked start," because nothing on their screen will ever tell them that.<br>
<em>Expect:</em> a red row naming the exact team and the exact chapter that's missing a paper.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc7-step3-data-check-flag.png" alt="The Data Check tab, with one row flagged: T-EC1 due for Level 3, Chapter 2, Attempt 1 next, but no matching Papers row exists yet">
<div class="tc-step-caption">The real Data Check output from this run — it names T-EC1 and the exact missing chapter, and warns their next Start click would fail with &quot;no-paper.&quot;</div>
</div>
</div>

---

### TC-8 — Exception: a team never submits (a no-show)

<div class="note" markdown="1">
**Objective:** confirms that access to a test paper doesn't stay open forever. Once there's no realistic chance a legitimate submission is still coming, the system should revoke access on its own, without a coordinator needing to remember to do it.
</div>

**Setup:** the standard reset, then start the test (TC-1 steps 1-6), then hand-edit the <code>Exams</code> row's <code>Deadline</code> cell to a time well in the past — this stands in for actually waiting out the real grace period.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Admin]</strong> The nightly access-cleanup run happens on its own, on schedule (Nghia can also trigger it directly, in Apps Script, as <code>sweepExpiredAccess()</code>).<br>
<em>Why it matters:</em> this is what actually makes "access is temporary" true in practice, not just something written down.<br>
<em>Expect:</em> the team's <code>Exams</code> row is marked expired, and its shared access to the test paper is revoked.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc8-step1-sweep.png" alt="The Apps Script execution log confirming sweepExpiredAccess revoked access for T-EC1's session, naming both students removed">
<div class="tc-step-caption">A real sweep — names the exact session and the exact accounts it removed.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Student 1]</strong> Still signed into <code>mcc.tst1@gmail.com</code>, check Drive access to the test paper again.<br>
<em>Expect:</em> viewer access is now gone — the file no longer opens.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc8-step2-drive-404.png" alt="Google Drive's 404 error page, shown when opening the test paper file signed in as the student account whose access was just revoked">
<div class="tc-step-caption">The file is really gone for them — Drive returns a plain 404, not even a "request access" screen.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> Check the <code>Exams</code> row's status column.<br>
<em>Expect:</em> it reads "Overdue — the grace period has ended, contact your coordinator." This is the cue for a coordinator to actually reach out to the family directly — unlike a graded Fail, nothing retries a no-show automatically.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc8-step3-status-overdue.png" alt="The Exams sheet showing T-EC1's Status column reading Overdue -- the grace period has ended, contact your coordinator">
<div class="tc-step-caption">The exact wording a coordinator sees, word for word.</div>
</div>
</div>

---

### TC-9 — Edge case: clicking "I'm ready" twice

<div class="note" markdown="1">
**Objective:** simulates an accidental double-click, or a student who genuinely isn't sure their first click registered. Either way, it shouldn't restart the clock or create any confusing duplicate state.
</div>

**Setup:** the standard reset, then start the test once (TC-1 steps 1-4).

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Student 1]</strong> Still signed into <code>mcc.tst1@gmail.com</code>, open the form again, choose "I'm ready to open my test paper" a second time, and submit.<br>
<em>Expect:</em> the form's ordinary confirmation message, identical to the first time — nothing visibly different.
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
**Objective:** confirms that deactivating a team — a family taking a break, or a team disbanding — actually stops new tests from being scheduled for them, without anyone needing to also delete their data.
</div>

**Setup:** the standard reset, then on the <code>Teams</code> tab set <code>T-EC1</code>'s <code>Active</code> column to <code>FALSE</code> before the next scheduling run.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> With <code>T-EC1</code> inactive, trigger scheduling again — clicking <strong>Reset my test team(s)</strong> still runs scheduling as its last step.<br>
<em>Expect:</em> the result dialog still names <code>T-EC1</code> in its opening line, but the "fresh session(s) locked in" list names only <code>T-WC1</code> — <code>T-EC1</code> gets no new session, and its Regional Pacing row is left completely untouched.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc10-step1-done-dialog.png" alt="The Done dialog naming T-EC1 and T-WC1 as reset, but listing a fresh session for T-WC1 only">
<div class="tc-step-caption">A real result — T-EC1 is named, but gets no fresh session because it's inactive.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Set <code>Active</code> back to <code>TRUE</code> and trigger scheduling again.<br>
<em>Expect:</em> now it schedules normally, exactly as in TC-1.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc10-step2-reactivated-dialog.png" alt="The Done dialog now listing fresh sessions for both T-EC1 and T-WC1">
<div class="tc-step-caption">Reactivated — T-EC1 gets a fresh session again, same as any other team.</div>
</div>
</div>

---

### TC-11 — Edge case: the next test date is set in the past

<div class="note" markdown="1">
**Objective:** confirms that a stale or mistyped date doesn't get quietly auto-corrected, or silently skipped forever — it should be flagged as something a coordinator actually needs to look at and fix.
</div>

**Setup:** the standard reset, then clear <code>T-EC1</code>'s freshly-created row from the <code>Exams</code> sheet (the reset always locks in a fresh session as its last step, and that session has to be cleared first, or it would mask this case). Then, on the Regional Pacing <code>EC</code> tab, hand-set <code>T-EC1</code>'s next test date to well before today. (Don't use the reset button for this step — it always sets the date to today and immediately locks in a session; edit the date by hand instead.)

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Admin]</strong> Trigger scheduling.<br>
<em>Expect:</em> the run log names <code>T-EC1</code> as skipped because its next test date is in the past, and prints that date back so a coordinator can see exactly what's stale. It's flagged by name on every run until it's fixed — never scheduled, but never silently dropped either. (<code>T-WC1</code> shows up too, skipped for the unrelated reason that it still has its own unresolved session from the reset.)
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc11-step1-past-date-skip.png" alt="Apps Script execution log showing T-EC1 skipped because its NextExamDate is in the past, dated 2026-01-01">
<div class="tc-step-caption">A real run — T-EC1 flagged by name with the stale date it's still carrying.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Set the next test date to today, then trigger scheduling again.<br>
<em>Expect:</em> now it schedules normally — a fresh session is created for <code>T-EC1</code>. (<code>T-WC1</code> still shows as skipped, for that same unrelated leftover session.)
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc11-step2-normal-scheduling.png" alt="Apps Script execution log showing a fresh session created for T-EC1 once its date is set back to today">
<div class="tc-step-caption">Fixed — T-EC1 schedules normally again once its date is current.</div>
</div>
</div>

---

### TC-12 — Coordinator tool: "Check my data" catches a real problem

<div class="note" markdown="1">
**Objective:** confirms the self-check isn't just a formality that always comes back green — it needs to actually catch a real broken state, which is the entire reason it exists.
</div>

**Setup:** the standard reset, then deliberately break something small — for example, delete <code>T-EC1</code>'s Regional Pacing row entirely.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> Click <strong>MCC Tools → Check my data</strong>.<br>
<em>Expect:</em> two red rows, both naming <code>T-EC1</code> specifically — one explaining it's active but has no Regional Pacing row and so won't be scheduled, the other that it's due for a chapter with no Regional Pacing row, so the nightly scheduling run will never pick it up. Not a generic "something's wrong" — the exact team and the exact consequence, stated twice.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc12-step1-check-data.png" alt="The Data Check tab showing two red rows, both naming T-EC1 and its missing Regional Pacing row">
<div class="tc-step-caption">A real check — two rows, same root cause, both naming T-EC1 by name.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Click <strong>Reset my test team(s)</strong>.<br>
<em>Why it matters:</em> confirms the self-service reset can actually recover from this, not just reset an already-clean state.<br>
<em>Expect:</em> it should complete normally — or, if it doesn't, that itself is a real finding worth reporting. In practice, it's the latter: the result dialog names only <code>T-WC1</code> in its "fresh session(s) locked in" list, silently leaving out <code>T-EC1</code>, and checking the Regional Pacing tab afterward confirms why — <code>T-EC1</code>'s row is still entirely missing. The self-service button can't recover from a Regional Pacing row that's gone completely; a coordinator hitting this needs to ask for help rather than trust the "Ready to test from the start again" message.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc12-step2-reset-incomplete.png" alt="The Done dialog locking in a fresh session for T-WC1 only, silently omitting T-EC1">
<div class="tc-step-caption">A real finding — T-EC1 is quietly left behind; the button doesn't say so.</div>
</div>
</div>

---

### TC-13 — Coordinator tool: "Reset my test team(s)" as the everyday reset

<div class="note" markdown="1">
**Objective:** this is genuinely the button a coordinator would click to retest something right now — worth confirming end to end on its own, not just trusting it because every case above happened to use it along the way.
</div>

**Setup:** run TC-1 all the way through first, so there's real state — a graded, advanced team — to reset away.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> Click <strong>MCC Tools → Reset my test team(s)</strong>.<br>
<em>Expect:</em> a confirmation dialog names both <code>T-EC1</code> and <code>T-WC1</code> — every team coordinator <code>O02</code> covers — and explains what it's about to do.
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
<strong>3. [Coordinator]</strong> Check <code>T-EC1</code>'s Regional Pacing row and its test history.<br>
<em>Expect:</em> the next chapter is back to 1, the next test date is today, the old test rows are gone, and exactly one fresh row exists for today.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc13-step3-pacing-and-history.png" alt="T-EC1's Regional Pacing row showing next chapter 1, and its Exams history showing exactly one fresh row">
<div class="tc-step-caption">T-EC1 back to chapter 1 (top), with exactly one fresh Exams row (bottom).</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>4. [Coordinator]</strong> Check a team in a region <code>O02</code> doesn't cover — for example <code>T-UK1</code>.<br>
<em>Why it matters:</em> this is the whole safety property this button exists for — a coordinator resetting their own teams must never be able to touch anyone else's.<br>
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
**Objective:** simulates the single most common real mix-up — a parent using their own email instead of the student's registered one, or a typo'd address. The form shouldn't misattribute the submission to the wrong team, or show a confusing error — it should simply not recognize the person, and (consistent with every other exception case above) tell them nothing either way.
</div>

**Setup:** the standard reset.

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Anyone]</strong> Signed in as an account that isn't registered to <code>T-EC1</code> — <code>nghia71@gmail.com</code> works fine for this — open the form, choose "I'm ready to open my test paper," and submit.<br>
<em>Expect:</em> the form's ordinary confirmation message — again, no visible error of any kind.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc14-step1-form-confirmation.png" alt="The form's ordinary confirmation message, shown after submitting signed in as an unregistered email">
<div class="tc-step-caption">A real submission — the same friendly confirmation, whether or not the email was actually recognized.</div>
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Check the <code>Exams</code> sheet.<br>
<em>Expect:</em> nothing changed anywhere — no row was touched. If a real family ever reports "nothing happened when I clicked start," this is the first thing to check, ahead of TC-7's missing-paper case — most often, it's simply the wrong email signed in.
</div>
<div class="tc-step-shot">
<img src="./img/current-standings/tc14-step2-exams-unchanged.png" alt="The Exams sheet, showing T-EC1's row with StartedUTC and Deadline still both blank after the submission">
<div class="tc-step-caption">Confirmed — T-EC1's row is exactly as it was; the unrecognized email touched nothing.</div>
</div>
</div>

---

### Cleanup afterward

**[Coordinator]** Click **MCC Tools → Reset my test team(s)** one more time, to leave a clean baseline for next time.

### What this suite does and doesn't prove

Every case above exercises the same underlying code the automated developer test suite already checks on every change. Running through it by hand like this isn't a hunt for new bugs in the logic — it's confirming what a real coordinator, a real family, and a real grader each actually experience, using only the access each of them would really have. TC-7 and TC-14 in particular are worth re-reading even after they pass cleanly: they're not bugs waiting to be fixed, they're **real, permanent gaps** — no student-facing error message exists yet for either situation — that every coordinator should know about, because the system itself will never mention them.

<div class="note" markdown="1">
**Coming next.** Once this fake-data suite is fully illustrated with screenshots for every step (and a short walkthrough video at the end for anyone who'd rather watch than read), the same 14 cases become the template for real user-acceptance testing — real coordinators, real families, and real graders, volunteering to run a smaller slice of this suite themselves against their own accounts. See [Organization](./organization.md) if you'd like to help.
</div>
