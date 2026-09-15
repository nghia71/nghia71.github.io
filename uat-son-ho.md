---
title: UAT — Son Ho, Toan To, Henry Ho & Michael Le
---

# Your test suite: Son Ho & Toan To, with Henry Ho & Michael Le

This page is yours alone. It uses one dedicated practice team — `T-UAT-1` — that exists only for this test round and is completely separate from every other family's data, including every other tester's page linked from [Current Standings](./current-standings.md). Nothing you do here can affect a real student's record, and nothing another tester does can affect what you see here.

<div class="note" markdown="1">
**Why this team has two students in two different regions.** `T-UAT-1` stands in for a real, genuine case: a team with one member on the East Coast (Henry) and one on the West Coast (Michael), assigned to a single coordinator by hand rather than split across two. That's exactly how it works today for a few real teams, and this practice team is deliberately built the same way, so this case gets tested too, not just the simple one-region case.
</div>

## Who does what here

| Tag | Who | Account to use |
|---|---|---|
| **[Coordinator]** | You, wearing your regional-coordinator hat | `sonhho@gmail.com` |
| **[Student 1]** | Henry Ho | `henryfho@gmail.com` |
| **[Student 2]** | Michael Le | `michael.learn.to.code.2015@gmail.com` |
| **[Grader]** | Toan To | `tobatoan@gmail.com` |

Your practice team, `T-UAT-1`, has two members (Henry Ho, Michael Le), Level 3, and is already assigned to you as coordinator on the Coordinators tab.

<div class="note" markdown="1">
**A note on roles, in real life and in this test.** Coordinators are the only ones who ever open or edit the Master Registration and Regional Pacing spreadsheets — club organizers get view-only access to both, and students/parents never touch either spreadsheet at all. That's why every `[Student]` step below only ever uses the Test Paper Open/Submit Form (and, to see the paper itself, your own Google Drive) — never the spreadsheets directly. If a `[Student]` step ever seemed to need spreadsheet access to work, that would be a bug worth flagging.
</div>

## Before you start

<div class="note" markdown="1">
**Resetting `T-UAT-1` if you need to start over.** As the coordinator, signed in as `sonhho@gmail.com`, click **MCC Tools → Reset my test suite** and it finds `T-UAT-1` for you automatically (it matches you by your CoordinatorID, `O-UAT-1`), then puts it back to the start of whichever chapter its last attempt was for — whether that attempt was stuck, failed, or even a genuine Pass. It's off by default for real-launch safety, so if you click it and see “Not available right now,” it just hasn't been turned on yet for this round — message Nghia. Otherwise, feel free to use it to reset `T-UAT-1` as many times as you like while you work through the steps below.
</div>

## Part 1 — Coordinator: scheduling and watching a test happen

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing">Master Registration Spreadsheet</a>, <code>Teams</code> tab, and find <code>T-UAT-1</code>.<br>
<em>What you should see:</em> <code>Active=TRUE</code>, <code>CoordinatorID=O-UAT-1</code>, two members — Henry Ho and Michael Le.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Click <strong>MCC Tools → Check my data</strong>.<br>
<em>What you should see:</em> a "Done" dialog, then a <code>Data Check</code> tab report — should read clean for anything involving <code>T-UAT-1</code>.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/1BsRd05S7tK1lnr83vxidwDA87qAd1NWEMTFKvDfRkDg/edit?usp=sharing">Regional Pacing Spreadsheet</a>, <code>EC</code> tab, and find <code>T-UAT-1</code>'s row.<br>
<em>What you should see:</em> a <code>NextExamDate</code> already set. This is the row you'll normally edit to change pace or schedule the next test — nothing to change for this round.
</div>
</div>

## Part 2 — Students: taking the test

<div class="tc-step">
<div class="tc-step-text">
<strong>4. [Student 1]</strong> Sign in as <code>henryfho@gmail.com</code>, open the <a href="https://docs.google.com/forms/d/e/1FAIpQLSdrDdmflJ9K6IR7BCAlTU_7ziffSilCjkywuVJT_MoEoDFPGg/viewform">Test Paper Open/Submit Form</a> (the same permanent link every real family uses), and choose <strong>"I'm ready to open my test paper."</strong><br>
<em>What you should see:</em> a generic confirmation message from the form, and (check Drive) the Level 3 practice paper shared with you within a minute or two.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>5. [Coordinator]</strong> Check <code>T-UAT-1</code>'s row on the <a href="https://docs.google.com/spreadsheets/d/1m_CzWRfQxUt7puw1mVBqAZCpm1zvYDrxievSJXKGGFI/edit?usp=sharing">Public Roster</a>'s <code>Exams</code> tab -- a third spreadsheet, separate from the two you opened above.<br>
<em>What you should see:</em> <code>StartedUTC</code>/<code>Deadline</code> now filled in, status "In progress."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>6. [Student 1]</strong> Click "I'm ready to open my test paper" a second time, by accident, the way a family sometimes double-clicks.<br>
<em>Why it matters:</em> a second click must never restart the clock or create a second session.<br>
<em>What you should see:</em> the same generic confirmation; on the <code>Exams</code> row, <code>StartedUTC</code>/<code>Deadline</code> are completely unchanged from step 5.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>7. [Student 2]</strong> Sign in as <code>michael.learn.to.code.2015@gmail.com</code>, open the same form, choose <strong>"Submit my solution,"</strong> uploading any PDF as a stand-in for a real answer.<br>
<em>What you should see:</em> the same generic confirmation message.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>8. [Coordinator]</strong> Check the <code>Exams</code> row again.<br>
<em>What you should see:</em> <code>SubmissionFileLink</code>/<code>SubmittedUTC</code> now filled in, status "Submitted on time."
</div>
</div>

## Part 3 — Grading: Toan joins in

<div class="note" markdown="1">
**Why this part exists.** A test isn't really finished until it's graded and the family can see the result -- so this round follows Michael's submission all the way through Toan To grading it, not just up to the point where it's sitting in a queue.
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>9. [Grader]</strong> Toan, signed into <code>tobatoan@gmail.com</code>, on the Master Registration Spreadsheet clicks <strong>MCC Tools → Grader tools → Open this week's grading spreadsheet</strong>.<br>
<em>What you should see (Toan):</em> a dialog with this week's "MCC Grading" spreadsheet and its link. Opening it shows a row for Michael's submission -- <code>SessionID</code>, <code>TeamID</code> <code>T-UAT-1</code> -- with <code>Score</code>/<code>Comments</code>/<code>Done</code> still blank.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>10. [Grader]</strong> Toan opens the submitted file from that row (the link on <code>T-UAT-1</code>'s <code>Exams</code> row, on the Public Roster), then on the grading sheet fills in a <code>Score</code> of 51 or higher (a Pass), writes something in <code>Comments</code>, fills <code>GradedBy</code>, and checks <code>Done</code>.<br>
<em>What you should see (Toan):</em> the row saves normally, the same as typing into any spreadsheet.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>11. [Grader]</strong> Toan clicks <strong>MCC Tools → Grader tools → Pull weekly grading</strong>.<br>
<em>What you should see (Toan):</em> a confirmation naming 1 row graded and written back.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>12. [Coordinator]</strong> Check <code>T-UAT-1</code>'s <code>Exams</code> row one more time, then its Regional Pacing row.<br>
<em>What you should see:</em> <code>Score</code>, <code>Result</code> ("Pass"), <code>GradedUTC</code>, <code>GradedBy</code>, and Toan's comment in the <code>Comment</code> column are all filled in, status "Graded" -- and on Regional Pacing, <code>NextChapter</code> has moved forward by one.
</div>
</div>

## Part 4 — A submission that arrives a little late

<div class="note" markdown="1">
**The situation.** Real families sometimes finish right at the wire, or a few minutes past it. A slightly-late submission shouldn't be thrown out -- it should just be flagged as late, and still count.
</div>

**Before you start:** reset `T-UAT-1` (see above), then repeat steps 4-5 above to start the test again. One thing to expect: since Part 3's Pass just advanced your team to the next chapter, "Reset my test suite" starts you fresh at *that* chapter now, not back at Chapter 1 -- that's expected, not a bug, and it means this part exercises a different chapter's paper than Part 1 did. The same holds for Part 5 below.

<div class="tc-step">
<div class="tc-step-text">
<strong>13. [Student 2]</strong> Signed into <code>michael.learn.to.code.2015@gmail.com</code>, wait until just a few minutes past the deadline shown on the <code>Exams</code> row, then submit as before.<br>
<em>What you should see:</em> the same ordinary confirmation message -- nothing on screen tells you whether you were on time or not.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>14. [Coordinator]</strong> Check the <code>Exams</code> row.<br>
<em>What you should see:</em> the submission is accepted -- the file link and submission time are filled in, and the status reads "Submitted — N minutes late," not rejected.
</div>
</div>

## Part 5 — When a test date is stuck in the past

<div class="note" markdown="1">
**The situation.** A stale or mistyped test date shouldn't get quietly auto-corrected, or silently skipped forever -- it should be flagged as something you actually need to look at and fix. This part doesn't need Henry or Michael at all -- it's entirely a coordinator/spreadsheet check.
</div>

**Before you start:** reset `T-UAT-1`, then clear its freshly-created row from the <code>Exams</code> tab on the Public Roster (the reset always locks one in as its last step, and it has to be cleared first or it would mask this problem). Then, on Regional Pacing's <code>EC</code> tab, hand-set `T-UAT-1`'s <code>NextExamDate</code> to well before today.

<div class="tc-step">
<div class="tc-step-text">
<strong>15. [Coordinator]</strong> Click <strong>MCC Tools → Coordinator tools → Lock in changed exam dates</strong>.<br>
<em>What you should see:</em> the confirmation dialog itself names <code>T-UAT-1</code> under "Needs attention -- NextExamDate is in the past for," and shows that stale date -- right there in the dialog.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>16. [Coordinator]</strong> Set the next test date back to today, then click the same menu item again.<br>
<em>What you should see:</em> now the dialog reports a fresh session locked in for <code>T-UAT-1</code>, dated today.
</div>
</div>

<div class="note" markdown="1">
**Conventions used above.** What **[Coordinator]**/**[Student 1]**/**[Student 2]**/**[Grader]** mean, and how "Reset my test suite" works, are explained once in ["For a new coordinator"](./current-standings.md#for-a-new-coordinator) and ["For a new grader"](./current-standings.md#for-a-new-grader) on Current Standings; nothing on this page repeats it.
</div>

