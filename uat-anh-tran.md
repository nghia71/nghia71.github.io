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
<strong>6. [Coordinator]</strong> Check <code>T-UAT-2</code>'s row on the <code>Exams</code> tab (Master Registration Spreadsheet).<br>
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

Once Toan To has graded this submission (see his own page), come back and check the <code>Exams</code> row one more time — score, Pass/Fail, and who graded it should all be filled in, and your Regional Pacing row's <code>NextChapter</code> should advance if the result was a Pass.

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
  var KEY = 'mcc-uat-anh-tran-progress-v1';
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
