---
title: UAT — Thoa Mai, Nam Phong Nguyen & Jason To
---

# Your test suite: Thoa Mai, with Nam Phong Nguyen & Jason To

This page is yours alone. It uses two dedicated practice teams — `T-UAT-3` and `T-UAT-5` — that exist only for this test round and are completely separate from every other family's data, including every other tester's page linked from [Current Standings](./current-standings.md). Nothing you do here can affect a real student's record, and nothing another tester does can affect what you see here.

<div class="note" markdown="1">
**Why two teams.** You cover two different students at two different levels — Nam Phong Nguyen (Level 1) and Jason To (Level 3) — so this page is a chance to test the pipeline at two levels through the same coordinator, not just one.
</div>

## Who does what here

| Tag | Who | Account to use |
|---|---|---|
| **[Coordinator]** | You, wearing your regional-coordinator hat | `thoamai.nguyen84@gmail.com` |
| **[Student A]** | Nam Phong Nguyen (Level 1, team `T-UAT-3`) | `nphongleo@gmail.com` |
| **[Student B]** | Jason To (Level 3, team `T-UAT-5`) | `jasondbto@gmail.com` |

## Before you start

<div class="note" markdown="1">
**One real limitation, please read first.** The "Reset my test team(s)" button in the Master Registration Spreadsheet's **MCC Tools** menu only ever touches the club's own internal practice teams, never `T-UAT-3`/`T-UAT-5` — that's deliberate, so nobody's self-service reset button can ever reach a real team's data by mistake. If you need either team reset partway through, message Nghia directly and he'll reset it for you; otherwise just work through the steps below once, in order, from a fresh team.
</div>

## Part 1 — Coordinator: scheduling and watching a test happen

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Coordinator]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing">Master Registration Spreadsheet</a>, <code>Teams</code> tab, and find <code>T-UAT-3</code> and <code>T-UAT-5</code>.<br>
<em>What you should see:</em> both <code>Active=TRUE</code>, both <code>CoordinatorID=O-UAT-3</code> — <code>T-UAT-3</code> Level 1 with Nam Phong Nguyen, <code>T-UAT-5</code> Level 3 with Jason To.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Coordinator]</strong> Click <strong>MCC Tools → Check my data</strong>.<br>
<em>What you should see:</em> a "Done" dialog, then a <code>Data Check</code> tab report — should read clean for anything involving <code>T-UAT-3</code>/<code>T-UAT-5</code>.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Coordinator]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/1BsRd05S7tK1lnr83vxidwDA87qAd1NWEMTFKvDfRkDg/edit?usp=sharing">Regional Pacing Spreadsheet</a>, <code>FR</code> tab, and find both teams' rows.<br>
<em>What you should see:</em> a <code>NextExamDate</code> already set for each. This is the row you'll normally edit to change pace or schedule the next test — nothing to change for this round.
</div>
</div>

## Part 2 — Students: taking the test

<div class="tc-step">
<div class="tc-step-text">
<strong>4. [Student A]</strong> Sign in as <code>nphongleo@gmail.com</code>, open the <a href="https://docs.google.com/forms/d/e/1FAIpQLSdrDdmflJ9K6IR7BCAlTU_7ziffSilCjkywuVJT_MoEoDFPGg/viewform">Test Paper Open/Submit Form</a> (the same permanent link every real family uses), and choose <strong>"I'm ready to open my test paper,"</strong> then later <strong>"Submit my solution"</strong> with any PDF.<br>
<em>What you should see:</em> a generic confirmation each time; on <code>T-UAT-3</code>'s <code>Exams</code> row, <code>StartedUTC</code>/<code>Deadline</code> then <code>SubmissionFileLink</code>/<code>SubmittedUTC</code> fill in, in order.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>5. [Student B]</strong> Sign in as <code>jasondbto@gmail.com</code>, do the same on the same form.<br>
<em>What you should see:</em> the same generic confirmations; this time it's <code>T-UAT-5</code>'s <code>Exams</code> row that fills in — a Level 3 paper this time, not Level 1, so this checks the system hands out the right paper for the right team.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>6. [Coordinator]</strong> Check both <code>Exams</code> rows.<br>
<em>What you should see:</em> both show "Submitted on time," each pointing at its own submission file — not mixed up with each other.
</div>
</div>

Once Toan To has graded both submissions (see his own page), come back and check both <code>Exams</code> rows one more time — score, Pass/Fail, and who graded it should all be filled in, and each Regional Pacing row's <code>NextChapter</code> should advance if the result was a Pass.

<label class="tc-done-toggle"><input type="checkbox" class="tc-done-checkbox" data-test="1"> Part 1 — Coordinator steps done</label><br>
<label class="tc-done-toggle"><input type="checkbox" class="tc-done-checkbox" data-test="2"> Part 2 — Student steps done</label>

<div class="tc-progress" id="tc-progress">
  <div class="tc-progress-row">
    <span class="tc-progress-label">Your progress: <strong id="tc-progress-count">0 of 2</strong> checked off.</span>
    <button type="button" class="tc-progress-reset" id="tc-progress-reset">Start over</button>
  </div>
  <div class="tc-progress-bar"><div class="tc-progress-fill" id="tc-progress-fill"></div></div>
</div>

<script>
(function () {
  var TOTAL = 2;
  var KEY = 'mcc-uat-thoa-mai-progress-v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(state) { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function updateSummary(state) {
    var count = 0;
    for (var i = 1; i <= TOTAL; i++) { if (state[i]) count++; }
    var countEl = document.getElementById('tc-progress-count');
    var fillEl = document.getElementById('tc-progress-fill');
    if (countEl) countEl.textContent = count + ' of ' + TOTAL;
    if (fillEl) fillEl.style.width = Math.round((count / TOTAL) * 100) + '%';
  }
  document.addEventListener('DOMContentLoaded', function () {
    var state = load();
    var boxes = Array.prototype.slice.call(document.querySelectorAll('.tc-done-checkbox'));
    boxes.forEach(function (box) {
      var n = box.getAttribute('data-test');
      box.checked = !!state[n];
      box.addEventListener('change', function () { state[n] = box.checked; save(state); updateSummary(state); });
    });
    updateSummary(state);
    var resetBtn = document.getElementById('tc-progress-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        state = {}; save(state); boxes.forEach(function (box) { box.checked = false; }); updateSummary(state);
      });
    }
  });
})();
</script>
