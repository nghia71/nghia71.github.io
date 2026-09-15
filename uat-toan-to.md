---
title: UAT — Toan To (Grader)
---

# Your test suite: Toan To (Grader)

<div class="note" markdown="1">
**This page has been folded into each coordinator's own page.** Rather than grading from one separate checklist, your steps now live directly inside each team's own story, right where the submission you're grading actually is: [Son Ho's page](./uat-son-ho.md), [Anh Tran's page](./uat-anh-tran.md), and [Thoa Mai's page](./uat-thoa-mai.md) each have their own "Part — Grading: Toan joins in" section. This page is kept here for reference only -- the content below still describes the same grading mechanics, just not split out by team anymore.
</div>

Unlike the other testers, grading isn't scoped to one family's team — a real grader sees submissions from whichever teams have them, and this round is no different. You'll be grading practice submissions from up to four teams: `T-UAT-1` (Henry Ho & Michael Le), `T-UAT-2` (Chi Khanh Pham), `T-UAT-3` (Nam Phong Nguyen), and `T-UAT-5` (your own son Jason To's practice team) — all placeholder data, nothing real.

<div class="note" markdown="1">
**This page depends on the others.** There's nothing to grade until at least one of those teams' students has actually clicked "Submit my solution" on their own page. If you check the Grading sheet and it's empty, that's not a bug — it just means nobody's submitted yet. Check back later, or ask Nghia where things stand.
</div>

## Where grading happens

Each week's submissions land in a spreadsheet named **"MCC Grading — &lt;that week's ISO week number&gt;"** (for example, "MCC Grading — 2026-W37") — the same one you already use for real grading. You don't need to already have it bookmarked: step 1 below gets you the link directly from the Master Registration Spreadsheet's own menu, and it's shared with you automatically the moment you (or Nghia) first open or create it for the week — nobody else gets access to it.

## Steps

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Grader]</strong> On the <a href="https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing">Master Registration Spreadsheet</a>, click <strong>MCC Tools → Grader tools → Open this week's grading spreadsheet</strong>.<br>
<em>Why it matters:</em> this is the one step that used to only work because Nghia already knew where every week's sheet was, having created each one himself by hand -- now it finds (or creates) it and shows you the link directly, no need to already have it bookmarked.<br>
<em>What you should see:</em> a dialog naming this week's grading spreadsheet with its link. Open that link — a row for each submitted practice session — <code>SessionID</code>, <code>TeamID</code> (one of <code>T-UAT-1</code>/<code>T-UAT-2</code>/<code>T-UAT-3</code>/<code>T-UAT-5</code>), and empty <code>Score</code>/<code>Comments</code>/<code>Done</code> columns waiting for you.
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
<strong>4. [Grader]</strong> Back on the Master Registration Spreadsheet, click <strong>MCC Tools → Grader tools → Pull weekly grading</strong> yourself.<br>
<em>Why it matters:</em> this used to only work for Nghia's account -- it now works for any real grader, so this is genuinely your own step, not something to hand off.<br>
<em>What you should see:</em> a confirmation dialog naming how many rows were graded and written back, and each matching team's <code>Exams</code> row on the Public Roster fills in <code>Score</code>, <code>Result</code> (Pass/Fail), <code>GradedUTC</code>, and <code>GradedBy</code>.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>5. [Grader]</strong> On the graded <code>Exams</code> row, check the <code>Comment</code> column.<br>
<em>What you should see:</em> your <code>Comments</code> from the Grading sheet show up as text (or a clickable link, if you pasted one) right in that <code>Comment</code> cell — this is how a family sees your feedback.
</div>
</div>

<div class="note" markdown="1">
**Conventions used above.** What **[Grader]** means, how test data here differs from a real family's, and how to reset between rounds -- all explained once, in ["For a new grader"](./current-standings.md#for-a-new-grader) on Current Standings; nothing on this page repeats it.
</div>

