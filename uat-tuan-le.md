---
title: UAT — Tuan Le & Linh Khanh Le
---

# Your test suite: Tuan Le, with Linh Khanh Le

This page is yours alone. It uses one dedicated practice team — `T-UAT-4` — that exists only for this test round and is completely separate from every other family's data, including every other tester's page linked from [Current Standings](./current-standings.md).

<div class="note" markdown="1">
**This one's shorter — you're testing the Parent view.** Unlike the other testers, you're not a regional coordinator, and Linh isn't taking a practice test herself this round. Your part is simply: does everything a parent would want to see about their child's team actually show up, clearly, on the page anyone can already open?
</div>

## Who does what here

| Tag | Who | Account to use |
|---|---|---|
| **[Parent]** | You | `t.le.kcl@gmail.com` (or no account at all — see step 1) |

Your practice team, `T-UAT-4` ("The Mathematics Manipulators (UAT)"), has one member (Linh Khanh Le), Level 3.

## Steps

<div class="tc-step">
<div class="tc-step-text">
<strong>1. [Parent]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/1m_CzWRfQxUt7puw1mVBqAZCpm1zvYDrxievSJXKGGFI/edit?usp=sharing">MCC Public Roster</a> — this one needs no sign-in at all, it's the page any parent, student, or visitor can already open. Find <code>T-UAT-4</code> on the <code>Roster</code> tab.<br>
<em>What you should see:</em> the team's name, level, and region, and a status that's easy to understand without any explanation.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2. [Parent]</strong> On the same spreadsheet's <code>Exams</code> tab, find <code>T-UAT-4</code>'s row (or rows, if there's more than one test on record).<br>
<em>Why it matters:</em> this is the one thing a parent actually checks day to day — has the test been taken, submitted, graded — without needing to ask anyone.<br>
<em>What you should see:</em> a status you could understand without anyone explaining it to you — placed, submitted, or graded, with no jargon or internal codes.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3. [Parent]</strong> Open the <a href="https://docs.google.com/spreadsheets/d/1BsRd05S7tK1lnr83vxidwDA87qAd1NWEMTFKvDfRkDg/edit?usp=sharing">Regional Pacing Spreadsheet</a>'s <code>UK</code> tab (this one does need coordinator or organizer access — if it prompts you for access and you don't have it, that's expected; this step is optional).<br>
<em>What you should see, if you can open it:</em> <code>T-UAT-4</code>'s next chapter and next test date.
</div>
</div>

<div class="note" markdown="1">
**That's it for this round.** If anything above was confusing, hard to find, or didn't make sense without extra explanation — that's exactly the kind of feedback this round is for. Tell Nghia directly, in whatever way you'd normally reach him.
</div>

<label class="tc-done-toggle"><input type="checkbox" class="tc-done-checkbox" data-test="1"> Steps done</label>

<div class="tc-progress" id="tc-progress">
  <div class="tc-progress-row">
    <span class="tc-progress-label">Your progress: <strong id="tc-progress-count">0 of 1</strong> checked off.</span>
    <button type="button" class="tc-progress-reset" id="tc-progress-reset">Start over</button>
  </div>
  <div class="tc-progress-bar"><div class="tc-progress-fill" id="tc-progress-fill"></div></div>
</div>

<script>
(function () {
  var TOTAL = 1;
  var KEY = 'mcc-uat-tuan-le-progress-v1';
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
