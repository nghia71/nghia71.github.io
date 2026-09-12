---
title: UAT — Toan To (Grader)
---

# Your test suite: Toan To (Grader)

Unlike the other testers, grading isn't scoped to one family's team — a real grader sees submissions from whichever teams have them, and this round is no different. You'll be grading practice submissions from up to three teams: `T-UAT-1` (Henry Ho & Michael Le), `T-UAT-3` (Nam Phong Nguyen), and `T-UAT-5` (your own son Jason To's practice team) — all placeholder data, nothing real.

<div class="note" markdown="1">
**This page depends on the others.** There's nothing to grade until at least one of those teams' students has actually clicked "Submit my solution" on their own page. If you check the Grading sheet and it's empty, that's not a bug — it just means nobody's submitted yet. Check back later, or ask Nghia where things stand.
</div>

## Where grading happens

Each week's submissions land in a spreadsheet named **"MCC Grading — &lt;that week's ISO week number&gt;"** (for example, "MCC Grading — 2026-W37") — the same one you already use for real grading. You should already have it open or bookmarked; if not, it'll show up in your Google Drive once the first practice submission comes in.

## Steps

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Grader]</strong> Open this week's "MCC Grading" spreadsheet.<br>
<em>What you should see:</em> a row for each submitted practice session — <code>SessionID</code>, <code>TeamID</code> (one of <code>T-UAT-1</code>/<code>T-UAT-3</code>/<code>T-UAT-5</code>), and empty <code>Score</code>/<code>Comments</code>/<code>Done</code> columns waiting for you.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Grader]</strong> For each row, open the submission (the link on the matching team's <code>Exams</code> row -- on the <a href="https://docs.google.com/spreadsheets/d/1m_CzWRfQxUt7puw1mVBqAZCpm1zvYDrxievSJXKGGFI/edit?usp=sharing">Public Roster</a>, not Master Registration -- in the <code>SubmissionFileLink</code> column) and grade it as you normally would.<br>
<em>What you should see:</em> the PDF opens directly — it's a real Drive file, just with placeholder content instead of a real answer.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Grader]</strong> Enter a <code>Score</code> (51 or higher counts as a Pass, to test that path — feel free to also try one below 51 on a second submission if there is one, to see the Fail path), fill in <code>GradedBy</code>, and check <code>Done</code>.<br>
<em>Why it matters:</em> a row you leave unchecked should never show up as graded anywhere else — this is what lets you grade a few, save your place, and come back later without half-finished work leaking through.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>4. [Grader]</strong> If you have access to run <code>pullWeeklyGrading()</code> yourself (the same way you do for real grading today), run it now. If you're not sure or don't have that access, let Nghia know you've finished marking rows <code>Done</code> and he'll pull them in.<br>
<em>What you should see:</em> each matching team's <code>Exams</code> row on the Public Roster fills in <code>Score</code>, <code>Result</code> (Pass/Fail), <code>GradedUTC</code>, and <code>GradedBy</code>.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>5. [Grader]</strong> On the graded <code>Exams</code> row, check the <code>Comment</code> column.<br>
<em>What you should see:</em> your <code>Comments</code> from the Grading sheet show up as text (or a clickable link, if you pasted one) right in that <code>Comment</code> cell — this is how a family sees your feedback.
</div>
</div>

<div class="note" markdown="1">
**One thing worth telling Nghia either way.** Step 4 is the one part of this whole round we're not 100% sure you have direct access to — if you don't, that's useful for us to know, since it means a real grader in your position would hit the same thing.
</div>

