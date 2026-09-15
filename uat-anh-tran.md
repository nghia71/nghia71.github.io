---
title: UAT — Anh Tran & Chi Khanh Pham
---

# Your test suite: Anh Tran, with Chi Khanh Pham

This page is yours alone. It uses one dedicated practice team — `T-UAT-2` — that exists only for this test round and is completely separate from every other family's data, including every other tester's page linked from [Current Standings](./current-standings.md). Nothing you do here can affect a real student's record, and nothing another tester does can affect what you see here.

<div class="note" markdown="1">
**Why you're testing two roles.** You're both a parent watching your own child's progress, and — since you're also MCC's real West Coast regional coordinator — the person who'd actually run this for other families in your region once it's live. This page walks through both, using `T-UAT-2` (a stand-in for a real team) instead of a real one.
</div>

## Who does what here

| Tag | Who | Account to use |
|---|---|---|
| **[Coordinator]** | You, wearing your regional-coordinator hat | `tranngocanh0910@gmail.com` |
| **[Student]** | Chi Khanh Pham | `chipham6712@gmail.com` |

Your practice team, `T-UAT-2`, has one member (Chi Khanh Pham), Level 3, and is already assigned to you as coordinator on the Coordinators tab.

<div class="note" markdown="1">
**A note on roles, in real life and in this test.** Coordinators are the only ones who ever open or edit the Master Registration and Regional Pacing spreadsheets -- club organizers get view-only access to both, and students/parents never touch either spreadsheet at all. That's why every `[Student]` step below only ever uses the Test Paper Open/Submit Form (and, to see the paper itself, your own Google Drive) -- never the spreadsheets directly. If a `[Student]` step ever seemed to need spreadsheet access to work, that would be a bug worth flagging.
</div>

## Before you start

<div class="note" markdown="1">
**Resetting `T-UAT-2` if you need to start over.** As the coordinator, signed in as `tranngocanh0910@gmail.com`, click **MCC Tools → Reset my test suite** and it finds `T-UAT-2` for you automatically (it matches you by your CoordinatorID, `O-UAT-2`), then puts it back to the start of whichever chapter its last attempt was for — whether that attempt was stuck, failed, or even a genuine Pass. It's off by default for real-launch safety, so if you click it and see “Not available right now,” it just hasn't been turned on yet for this round — message Nghia. Otherwise, feel free to use it to reset `T-UAT-2` as many times as you like while you work through the steps below.
</div>

## Part 1 — Coordinator: scheduling and watching a test happen

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing">Master Registration Spreadsheet</a>, <code>Teams</code> tab, and find <code>T-UAT-2</code>.<br>
<em>What you should see:</em> <code>Active=TRUE</code>, <code>CoordinatorID=O-UAT-2</code>, one member — Chi Khanh Pham.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Click <strong>MCC Tools → Check my data</strong>.<br>
<em>What you should see:</em> a "Done" dialog, then a <code>Data Check</code> tab report — should read clean for anything involving <code>T-UAT-2</code>.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/1BsRd05S7tK1lnr83vxidwDA87qAd1NWEMTFKvDfRkDg/edit?usp=sharing">Regional Pacing Spreadsheet</a>, <code>WC</code> tab, and find <code>T-UAT-2</code>'s row.<br>
<em>What you should see:</em> a <code>NextExamDate</code> already set. This is the row you'll normally edit to change pace or schedule the next test — nothing to change for this round.
</div>
</div>

## Part 2 — Student: taking the test

<div class="tc-step">
<div class="tc-step-text">
<strong>4. [Student]</strong> Sign in as <code>chipham6712@gmail.com</code>, open the <a href="https://docs.google.com/forms/d/e/1FAIpQLSdrDdmflJ9K6IR7BCAlTU_7ziffSilCjkywuVJT_MoEoDFPGg/viewform">Test Paper Open/Submit Form</a> (the same permanent link every real family uses), and choose <strong>"I'm ready to open my test paper."</strong><br>
<em>What you should see:</em> a generic confirmation message from the form.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>5. [Student]</strong> Check your Google Drive.<br>
<em>What you should see:</em> the Level 3 practice paper shared with you as a viewer, within a minute or two.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>6. [Coordinator]</strong> Check <code>T-UAT-2</code>'s row on the <a href="https://docs.google.com/spreadsheets/d/1m_CzWRfQxUt7puw1mVBqAZCpm1zvYDrxievSJXKGGFI/edit?usp=sharing">Public Roster</a>'s <code>Exams</code> tab -- a different spreadsheet from Master Registration, where Exams actually lives.<br>
<em>What you should see:</em> <code>StartedUTC</code> and <code>Deadline</code> now filled in, status "In progress."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>7. [Student]</strong> Open the same form again, and this time choose <strong>"Submit my solution,"</strong> uploading any PDF as a stand-in for a real answer.<br>
<em>What you should see:</em> the same generic confirmation message — the form never reveals whether it recognized you or not, on purpose.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>8. [Coordinator]</strong> Check the <code>Exams</code> row again.<br>
<em>What you should see:</em> <code>SubmissionFileLink</code> and <code>SubmittedUTC</code> now filled in, status "Submitted on time."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>9. [Student]</strong> Submit a second, different PDF through the same form.<br>
<em>Why it matters:</em> a family sometimes needs to fix a mistake after submitting — this shouldn't be blocked or silently ignored.<br>
<em>What you should see:</em> the same generic confirmation; on the <code>Exams</code> row, <code>SubmissionFileLink</code> now points at the newer file, and both files still exist in Drive if you check.
</div>
</div>

## Part 3 — Grading: Toan joins in

<div class="note" markdown="1">
**Why this part exists.** A test isn't really finished until it's graded and the family can see the result -- so this round follows Chi's submission all the way through Toan To grading it, not just up to the point where it's sitting in a queue.
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>10. [Grader]</strong> Toan, signed into <code>tobatoan@gmail.com</code>, on the Master Registration Spreadsheet clicks <strong>MCC Tools → Grader tools → Open this week's grading spreadsheet</strong>.<br>
<em>What you should see (Toan):</em> a dialog with this week's "MCC Grading" spreadsheet and its link. Opening it shows a row for Chi's submission -- <code>SessionID</code>, <code>TeamID</code> <code>T-UAT-2</code> -- with <code>Score</code>/<code>Comments</code>/<code>Done</code> still blank.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>11. [Grader]</strong> Toan opens the submitted file from that row, then on the grading sheet fills in a <code>Score</code> of 51 or higher (a Pass), writes something in <code>Comments</code>, fills <code>GradedBy</code>, and checks <code>Done</code>.<br>
<em>What you should see (Toan):</em> the row saves normally, the same as typing into any spreadsheet.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>12. [Grader]</strong> Toan clicks <strong>MCC Tools → Grader tools → Pull weekly grading</strong>.<br>
<em>What you should see (Toan):</em> a confirmation naming 1 row graded and written back.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>13. [Coordinator]</strong> Check <code>T-UAT-2</code>'s <code>Exams</code> row one more time, then its Regional Pacing row.<br>
<em>What you should see:</em> <code>Score</code>, <code>Result</code> ("Pass"), <code>GradedUTC</code>, <code>GradedBy</code>, and Toan's comment in the <code>Comment</code> column are all filled in, status "Graded" -- and on Regional Pacing, <code>NextChapter</code> has moved forward by one.
</div>
</div>

## Part 4 — A team that doesn't pass, but still has retakes left

<div class="note" markdown="1">
**The situation.** A Fail shouldn't just sit there waiting for someone to notice -- the system should schedule a retake at the same chapter on its own, without you having to catch it and act by hand.
</div>

**Before you start:** reset `T-UAT-2` (see above), then repeat Part 2's steps, but this time Toan grades it with a score **under 51** (a Fail) instead of a Pass.

<div class="tc-step">
<div class="tc-step-text">
<strong>14. [Coordinator]</strong> After the Fail is recorded, check <code>T-UAT-2</code>'s <code>Exams</code> history on the Public Roster.<br>
<em>What you should see:</em> the original row shows Result: Fail; a second row exists on its own, marked Attempt 2, same chapter, with a fresh date -- and the family's status message reads something like "Not passed — Attempt 1 of 3. Contact your coordinator to schedule a retake."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>15. [Coordinator]</strong> Check the Regional Pacing row for <code>T-UAT-2</code>.<br>
<em>What you should see:</em> the next-chapter number is unchanged -- a retake doesn't move the team forward; only a Pass does.
</div>
</div>

## Part 5 — Someone signed into the wrong email

<div class="note" markdown="1">
**The situation.** This simulates the single most common real mix-up -- a parent using their own email instead of the student's registered one, or a typo'd address. The form shouldn't misattribute the submission to the wrong team, or show a confusing error -- it should simply not recognize the person, and tell them nothing either way, same as every other exception above.
</div>

**Before you start:** reset `T-UAT-2`.

<div class="tc-step">
<div class="tc-step-text">
<strong>16. [Coordinator]</strong> Signed in as your own account, <code>tranngocanh0910@gmail.com</code> -- which isn't registered to <code>T-UAT-2</code>, Chi's is -- open the Test Paper Open/Submit Form and choose "I'm ready to open my test paper."<br>
<em>What you should see:</em> the form's ordinary confirmation message -- no visible error of any kind.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>17. [Coordinator]</strong> Check the <code>Exams</code> sheet.<br>
<em>What you should see:</em> nothing changed anywhere -- no row was touched. If a real family ever reports "nothing happened when I clicked start," this is the first thing to check -- most often, it's simply the wrong email signed in.
</div>
</div>

<div class="note" markdown="1">
**Conventions used above.** What **[Coordinator]**/**[Student]**/**[Grader]** mean, and how "Reset my test suite" works, are explained once in ["For a new coordinator"](./current-standings.md#for-a-new-coordinator) and ["For a new grader"](./current-standings.md#for-a-new-grader) on Current Standings; nothing on this page repeats it.
</div>

