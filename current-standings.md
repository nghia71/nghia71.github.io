---
title: Current Standings
---

# Current Standings

This page is the club's live index, for every role: where the roster and every team's exam status can be seen by anyone, exactly what happens on an actual test day and what each column and status message means, where the coordinator and organizer spreadsheets live for the people who run the club, and — at the bottom — the volunteer-tester pages and the example test suite Nghia runs against practice data to prove the whole automated pipeline works, end to end, before any real team relies on it.

**Jump to:** [Start here](#start-here) · [Where the data lives](#where-the-clubs-data-lives) · [Glossary](#glossary) · [The public roster](#the-public-roster) · [For Parents & Students](#for-parents-students) · [Coordinator & organizer resources](#coordinator-organizer-resources) · [For Graders](#for-graders) · [UAT](#uat-testing-with-real-volunteers) · [Testing the pipeline](#testing-the-pipeline)

## Start here

A first-time checklist, in order, for whichever role brings you here. Everything below is explained in full further down this page.

<div class="tc-step">
<div class="tc-step-text">
<strong>1.</strong> Bookmark your one link: the <strong>Test Paper Open/Submit Form</strong> (see [Current Standings](#for-parents-students) for it). It never changes — the same link, all year, for every test your team takes.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2.</strong> Find your team on the public <strong>MCC Roster</strong> ([Current Standings](#the-public-roster)) and check your name, team, level, and region are right. If anything's wrong, tell your regional coordinator — it isn't something you can fix yourself.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3.</strong> When a test is coming up, your team's row on the public <strong>Exams & Standing</strong> sheet will read <em>"Scheduled for &lt;date&gt;."</em> You don't need to do anything until then — no action is needed to "accept" a scheduled test.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>4.</strong> On test day, once you're actually ready to sit down and start: sign in with <strong>your team's registered email</strong> (not a parent's personal one) and choose <strong>"I'm ready to open my test paper."</strong> That's what starts your clock and grants access to the paper — a minute or two later, check your Google Drive for it.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>5.</strong> Work the paper together at home, then come back to the same Form and choose <strong>"Submit my solution"</strong> — one PDF, nothing else. You can resubmit if you catch a mistake and you're still within time; the newer file simply replaces the older one as your official submission.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>6.</strong> The Form's confirmation message never tells you whether your click actually worked — that's deliberate, not a bug. To actually check, look at your row on the <strong>Exams & Standing</strong> sheet: <em>"In progress,"</em> <em>"Submitted on time,"</em> or one of the other plain-language statuses [Current Standings](#for-parents-students) lists in full.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>7.</strong> Once graded, that same row fills in <code>Score</code>, <code>Result</code>, and a <code>Comment</code> from your grader — text, or a clickable link if they attached a PDF. A Fail isn't the end of it: your team gets up to three attempts (two retakes) per chapter, and a new session for a retake is created automatically — your coordinator will reach out to arrange it.
</div>
</div>

<label class="tc-done-toggle"><input type="checkbox" class="tc-done-checkbox" data-test="f1"> Bookmarked the Form and checked my Roster entry</label><br>
<label class="tc-done-toggle"><input type="checkbox" class="tc-done-checkbox" data-test="f2"> Know where to check my status and what the messages mean</label>

---

## For a new coordinator

This assumes you're already familiar with [Organization](./organization.md)'s regional-coordinator role.

<div class="tc-step">
<div class="tc-step-text">
<strong>1.</strong> Get access to the two spreadsheets you'll use all year: <strong>Master Registration</strong> and <strong>Regional Pacing</strong> (links and full schema on [Current Standings](#coordinator-organizer-resources)). If a link prompts Google to request access, that's normal the first time.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2.</strong> On Master Registration's <code>Teams</code> tab, find the teams assigned to you (your <code>CoordinatorID</code> matches their <code>Region</code>, or they're assigned to you directly). On Regional Pacing, find those same teams' rows — that's where you'll watch and edit <code>NextExamDate</code> and <code>ExamFrequencyWeeks</code> going forward.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3.</strong> Click <strong>MCC Tools → Check my data</strong> (top of Master Registration, next to File/Edit/View). The first time, Google may show a permission screen — click <strong>Allow</strong>. A <strong>Data Check</strong> tab appears; green rows are fine, red rows tell you exactly what to fix. Safe to run any time — it only reports, never changes anything.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>4.</strong> You don't need to do anything to actually schedule a test: once a team's <code>NextExamDate</code> enters the next 7 days, the system locks a session in automatically, overnight. If you've just changed a date and don't want to wait, <strong>MCC Tools → Lock in changed exam dates</strong> runs that same check immediately.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>5.</strong> Once a result comes in, <code>NextExamDate</code>, <code>LastExamDate</code>, and (on a Pass) <code>NextChapter</code> all update themselves. On a Fail with attempts left, a retake is created automatically and the family's row tells them to expect you to reach out. On a third failed attempt, the system stops and waits for your decision — repeat the chapter, move the team on, or whatever fits.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>6.</strong> If a family ever genuinely needs their current test reset, <strong>MCC Tools → Reset my test suite</strong> can do it yourself (when Nghia has this turned on) — see [Current Standings](#coordinator-organizer-resources) for exactly what it does and doesn't cover.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>7.</strong> Day to day: a family that says the Form "isn't working" almost always signed in with the wrong Google account. A late submission (within 30 minutes) is accepted automatically; past that, it's rejected and the family is told on the sheet itself. Both are covered in full on [Current Standings](#coordinator-organizer-resources).
</div>
</div>

<label class="tc-done-toggle"><input type="checkbox" class="tc-done-checkbox" data-test="c1"> Have access to both spreadsheets and found my teams</label><br>
<label class="tc-done-toggle"><input type="checkbox" class="tc-done-checkbox" data-test="c2"> Ran Check my data once, clean</label><br>
<label class="tc-done-toggle"><input type="checkbox" class="tc-done-checkbox" data-test="c3"> Understand NextExamDate vs. ExamFrequencyWeeks and what locks in automatically</label>

---

## For a new grader

This is for Toan and Nghia, the two people who actually grade submissions each week.

<div class="tc-step">
<div class="tc-step-text">
<strong>1.</strong> Each week has its own shared spreadsheet, <code>MCC Grading — &lt;ISO week&gt;</code>, created automatically the first time it's needed — check "Shared with me" in Drive, or search for "MCC Grading."
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>2.</strong> For each submission: fill in <code>Score</code> (0–100), <code>Comments</code> (whatever you want the family to see), and <code>GradedBy</code>. Check <code>Done</code> only once a row is genuinely finished — a half-graded row should stay unchecked, since only <code>Done</code> rows ever get pulled in.
</div>
</div>

<div class="tc-step">
<div class="tc-step-text">
<strong>3.</strong> Pulling results in is Nghia's step, not yours — <strong>MCC Tools → Pull weekly grading</strong> only works for his account. Once your rows are marked <code>Done</code>, let him know (or he runs it on his own schedule); they'll then flow onto the public sheet automatically, with your comment landing in that row's <code>Comment</code> column — plain text, or a clickable link if you pasted one.
</div>
</div>

<label class="tc-done-toggle"><input type="checkbox" class="tc-done-checkbox" data-test="g1"> Found this week's grading sheet</label><br>
<label class="tc-done-toggle"><input type="checkbox" class="tc-done-checkbox" data-test="g2"> Know the Done checkbox rule and who pulls results in</label>

<div class="tc-progress" id="tc-progress">
  <div class="tc-progress-row">
    <span class="tc-progress-label">Your progress: <strong id="tc-progress-count">0 of 7</strong> checked off.</span>
    <button type="button" class="tc-progress-reset" id="tc-progress-reset">Start over</button>
  </div>
  <div class="tc-progress-bar"><div class="tc-progress-fill" id="tc-progress-fill"></div></div>
</div>

<script>
(function () {
  var IDS = ['f1', 'f2', 'c1', 'c2', 'c3', 'g1', 'g2'];
  var TOTAL = IDS.length;
  var KEY = 'mcc-getting-started-progress-v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(state) { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function updateSummary(state) {
    var count = 0;
    IDS.forEach(function (id) { if (state[id]) count++; });
    var countEl = document.getElementById('tc-progress-count');
    var fillEl = document.getElementById('tc-progress-fill');
    if (countEl) countEl.textContent = count + ' of ' + TOTAL;
    if (fillEl) fillEl.style.width = Math.round((count / TOTAL) * 100) + '%';
  }
  document.addEventListener('DOMContentLoaded', function () {
    var state = load();
    var boxes = Array.prototype.slice.call(document.querySelectorAll('.tc-done-checkbox'));
    boxes.forEach(function (box) {
      var id = box.getAttribute('data-test');
      box.checked = !!state[id];
      box.addEventListener('change', function () { state[id] = box.checked; save(state); updateSummary(state); });
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

---

## Where the club's data lives

The club runs on three Google Sheets and one Form, kept deliberately separate so that what's safe for everyone to see, what's editable by the people who run pacing, what's family-private, and what a student uses to actually take a test never share a file:

| Spreadsheet / Form | What it holds | Who can open it |
|---|---|---|
| **MCC Public Roster** | Every active team — name, team, level, region, status — plus a live row per test: placed, submitted, graded. | Anyone with the link |
| **MCC Master Registration** | Full student and parent details, team assignments, and the club's coordinator and grader lists. | Coordinators (edit) & club organizers (view only) |
| **MCC Regional Pacing** | One tab per region (UK, FR, EC, WC, VN) — each team's next chapter, testing frequency, and next test date — hand-edited by that region's coordinator. | Coordinators (edit) & club organizers (view only) |
| **Test Paper Open/Submit Form** | Where a student opens their test paper and, later, submits their solution — one permanent link, used all year for every team and every test. | Students only, identified by their own verified Google account |

**Coordinators** are the volunteers who directly schedule and pace each region's teams — they get edit access to both Master Registration and Regional Pacing. **Club organizers** is a separate, broader, read-only role for volunteers who run club activities day to day; they can see rosters, standings, and family/team data (Master Registration and Regional Pacing, both view-only) but never edit anything. **Students** never open either spreadsheet at all — the Test Paper Form is the only thing they (or their parents) ever touch. See [Organization](./organization.md) for who's who.

(There's a separate registration Form — the one families use to register for a team in the first place — that isn't part of this page; a coordinator is the one who takes what it collects and enters it into Master Registration.)

## Glossary

Quick reference for terms and column names used throughout this page and the sheets it links to. Most readers won't need this — the sections below already explain things in plain language as they come up — but it's here if you ever see one of these words on a sheet, in a URL, or in a message from your coordinator and want to know exactly what it means.

**Where things live**

| Term | Meaning |
|---|---|
| **MCC Roster** (Public Roster) | The public spreadsheet listing every registered student and team — name, team, level, region, status. See [The public roster](#the-public-roster) below for the link. |
| **Exams & Standing** | A tab on that same spreadsheet (internally called `Exams`) — one row per test occurrence; this is where `Status` and everything else below lives. The **Standings** tab next to it is a separate, coordinator-only summary (one row per *team*, not per test) — see "A new Standings tab" below. |
| **Session** | One row on the Exams & Standing sheet — one team's one test occurrence, for one chapter and attempt. Internally each has its own ID (`SessionID`, e.g. `SESS-0001`), created automatically the week of the test; you'll never need to type one yourself. |

**Columns on the Exams & Standing sheet, per test**

| Column | Meaning |
|---|---|
| `Status` | The plain-language summary everyone actually reads — see the table under "Checking your status" below for every message it can show. Computed automatically from all the columns below; you shouldn't need the raw columns to understand your own row. |
| `StartedUTC` | The moment "I'm ready to open my test paper" was clicked. Blank until then. |
| `Deadline` | Computed automatically: start time + that level's time limit + a 10-minute buffer. Never a fixed clock time set in advance. |
| `SubmissionFileLink` | A link to the latest accepted submission PDF. Visible to anyone who can see the row, but the file itself is only actually open-able by a grader — see "Submitting your solution" below. |
| `SubmittedUTC` | When the latest *accepted* submission arrived. A rejected attempt (see below) never changes this. |
| `ElapsedMinutes` | How long the team actually took: `SubmittedUTC` − `StartedUTC`. |
| `LateByMinutes` | Minutes past `Deadline` the accepted submission arrived — `0` if on time. |
| `LastRejectedUTC` / `LastRejectedReason` | The most recent Submit attempt that was refused (no Start recorded, or too late), and why. Never overwrites a valid, already-accepted submission. |
| `FileRemovedUTC` | When the team's own access to the exam paper file was switched off — right after a successful submit, or automatically if 30 minutes pass with nothing submitted. |

**Once a test is graded**

| Column | Meaning |
|---|---|
| `GradingStatus` | Set only by a grader. Once set, that session is closed — no further Start or Submit changes anything about it. |
| `Score` | 0–100, filled in once a grader's weekly batch is pulled in. |
| `Result` | `Pass` (51 or above) or `Fail`, computed from `Score`. |
| `GradedBy` / `GradedUTC` | Who graded it, and when. |
| `Comment` | A grader's note, in its own column — plain text, or a clickable link when the grader attached a PDF. |

*(Coordinators: `NextExamDate`, `ExamFrequencyWeeks`, `NextChapter`, `LastExamDate`, and `Active` are covered where they're used, under "Changing a team's pace or date" and "Pausing vs. skipping" below — they live on the separate Regional Pacing sheet, not Exams & Standing.)*

<details class="vn" markdown="1">
<summary>🇻🇳 Tiếng Việt — Bảng thuật ngữ (click to expand)</summary>

Tài liệu tham khảo nhanh cho các thuật ngữ và tên cột dùng trong trang này và các bảng tính liên quan. Phần lớn người đọc sẽ không cần đến phần này — các mục bên dưới đã giải thích bằng ngôn ngữ đơn giản ngay khi thuật ngữ xuất hiện — nhưng nếu có lúc bạn thấy một trong các từ này trên bảng tính, trong đường link, hay trong tin nhắn từ quản lý vùng và muốn biết chính xác nghĩa là gì, đây là nơi tra cứu.

**Mọi thứ nằm ở đâu**

| Thuật ngữ | Ý nghĩa |
|---|---|
| **MCC Roster** (Public Roster) | Bảng tính công khai liệt kê mọi học sinh và đội đã đăng ký — tên, đội, level, khu vực, trạng thái. Xem mục [The public roster](#the-public-roster) ở dưới để lấy link. |
| **Exams & Standing** | Một tab trên cùng bảng tính đó (tên nội bộ là `Exams`) — mỗi dòng là một bài thi, đây là nơi chứa cột `Status` và mọi thuật ngữ khác bên dưới. Tab **Standings** bên cạnh là một bảng tổng hợp riêng, chỉ dành cho quản lý vùng (mỗi dòng một đội, không phải mỗi bài thi) — xem "Tab Standings mới" bên dưới. |
| **Session** (bài thi/phiên thi) | Một dòng trên bảng Exams & Standing — một bài thi cụ thể của một đội, cho một chương và một lần thi. Nội bộ mỗi dòng có mã riêng (`SessionID`, ví dụ `SESS-0001`), được tạo tự động vào tuần có bài thi; không bao giờ cần tự gõ mã này. |

**Các cột trên bảng Exams & Standing, theo từng bài thi**

| Cột | Ý nghĩa |
|---|---|
| `Status` | Dòng tóm tắt bằng câu chữ rõ nghĩa mà mọi người thực sự đọc — xem bảng ở mục "Theo dõi tình trạng bài thi" bên dưới để biết từng thông báo có thể hiện ra. Được tính tự động từ tất cả các cột bên dưới; không cần hiểu các cột thô để biết tình trạng dòng của mình. |
| `StartedUTC` | Thời điểm bấm "I'm ready to open my test paper" (mở đề thi). Để trống cho đến lúc đó. |
| `Deadline` (hạn nộp) | Tính tự động: thời điểm bắt đầu + thời lượng bài thi của level đó + 10 phút bù. Không bao giờ là một mốc giờ cố định định sẵn. |
| `SubmissionFileLink` | Đường link tới file PDF bài nộp được chấp nhận gần nhất. Ai xem được dòng đó cũng thấy link, nhưng chỉ người chấm bài mới thực sự mở được file — xem "Nộp bài giải" bên dưới. |
| `SubmittedUTC` | Thời điểm bài nộp *được chấp nhận* gần nhất đến. Một lần nộp bị từ chối (xem bên dưới) không bao giờ làm thay đổi giá trị này. |
| `ElapsedMinutes` | Thời gian đội thực sự đã làm bài: `SubmittedUTC` − `StartedUTC`. |
| `LateByMinutes` | Số phút trễ so với `Deadline` của bài nộp được chấp nhận — `0` nếu đúng giờ. |
| `LastRejectedUTC` / `LastRejectedReason` | Lần nộp bài gần nhất bị từ chối (chưa từng mở đề, hoặc quá trễ), và lý do. Không bao giờ ghi đè lên một bài nộp hợp lệ đã được chấp nhận trước đó. |
| `FileRemovedUTC` | Thời điểm quyền truy cập của đội vào file đề thi bị tắt — ngay sau khi nộp bài thành công, hoặc tự động nếu quá 30 phút mà chưa nộp gì. |

**Sau khi bài thi được chấm**

| Cột | Ý nghĩa |
|---|---|
| `GradingStatus` | Chỉ do người chấm bài thiết lập. Khi đã thiết lập, bài thi đó coi như đóng — không có thao tác Start hay Submit nào làm thay đổi được nữa. |
| `Score` | 0–100, được điền vào khi kết quả chấm bài hàng tuần được đưa vào hệ thống. |
| `Result` | `Pass` (từ 51 điểm trở lên) hoặc `Fail`, tính từ `Score`. |
| `GradedBy` / `GradedUTC` | Ai chấm, và chấm lúc nào. |
| `Comment` (nhận xét) | Ghi chú của người chấm bài, nằm trong cột riêng của chính nó — chữ thường, hoặc một đường link có thể bấm vào nếu người chấm gắn kèm file PDF. |

*(Dành cho quản lý vùng: `NextExamDate`, `ExamFrequencyWeeks`, `NextChapter`, `LastExamDate`, và `Active` đã được giải thích ở phần "Thay đổi nhịp độ hoặc ngày thi của một đội" và "Tạm ngưng so với bỏ qua một lần" bên dưới — các cột này nằm trên bảng Regional Pacing riêng, không phải Exams & Standing.)*

</details>

---

## The public roster

The **MCC Public Roster** is the one spreadsheet anyone — student, parent, or visitor — can open directly. The `Roster` tab lists every active team; the `Exams` tab shows, for each test session, whether the paper has been placed, submitted, or graded, updated automatically as the pipeline runs.

**Roster columns:** `FullName`, `TeamID`, `Level`, `Region`, `Status` — a filtered, public-safe copy of `Students`.

**`Exams` columns** (one row per test session) — see the [Glossary](#glossary) above for what each one means, including `Comment` and every message `Status` can show.

If anything on your row looks wrong — a misspelled name, the wrong team, level, or region — tell your regional coordinator; it isn't something you can edit yourself.

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

## For Parents & Students

### The one Form you need

Every family bookmarks the same Form link at the start of the year — it doesn't change, and it's the only thing you need to remember. It asks one question with two choices:

* **"I'm ready to open my test paper"** — use this to start a test.
* **"Submit my solution"** — use this once you have a finished PDF.

You'll sign in with your registered Google account first. That's how the system knows which team you're on — **the click only works if you're signed in with the email your family registered**, not a parent's personal address or any other account. If you're not sure which one that is, ask your regional coordinator (see below).

<div class="note" markdown="1">
**[Open the Test Paper Open/Submit Form →](https://docs.google.com/forms/d/e/1FAIpQLSdrDdmflJ9K6IR7BCAlTU_7ziffSilCjkywuVJT_MoEoDFPGg/viewform)**
</div>

If you ever lose this link, it's always here on this page — no need to wait on a coordinator to resend it.

<div class="note" markdown="1">
**The Form's confirmation message is always the same, whether your click worked or not.** That's deliberate, not a bug — it never reveals to a stranger whether an email is registered. It means a "nothing happened" report from a family is never actually nothing; check their row on the Exams & Standing sheet (see "Checking your status" below) rather than trusting the confirmation screen either way.
</div>

### Opening your paper starts the clock

Click **"I'm ready to open my test paper"** only when you're actually about to sit down and take the test — that click is what grants your team access to the paper file, and it's also what starts the timer. There's no separate "unlock" step before this; before you click it, nobody on your team can open the paper at all.

Either team member can click it — you don't both need to. A second click from your teammate (or an accidental repeat click) does nothing extra; it won't reset or restart the clock.

**How much time you actually get:** your level's test duration, plus 10 extra minutes to cover the real gap between clicking and actually starting to read (loading the file, printing it, settling in — not extra working time). So a Level 3 test (150 minutes, see [Tests & Yearbook](./tests.md)) gives you until 160 minutes after you click.

### Submitting your solution

Once you're done, come back to the same Form and choose **"Submit my solution."** As always: **one PDF file, nothing else** — no photos, no multiple files, no email submissions (see [Tests & Yearbook](./tests.md#submitting-work) for why).

* You can submit more than once. If you realize something's wrong 10 minutes after submitting and you're still within time, submit again — the newer file replaces the older one as your official submission. Nothing is lost either way; if it ever matters, earlier files aren't deleted, only the link to "the" submission moves.
* Once a submission is accepted, your team's access to the paper file is automatically removed. That's expected, not an error.

### If you're late

Submitting after your deadline is still accepted, automatically, up to **30 minutes** past it — you'll just be marked as late by however many minutes. **Past 30 minutes, a submission is not accepted automatically.** This isn't a judgment call the system makes about your work; it's a hard line so that the record of who submitted what, and when, stays honest. If this happens to you, contact your regional coordinator — don't just keep trying to resubmit through the Form.

### If you submit without ever clicking "open my test paper"

This is rejected too, for the same honesty-of-the-record reason — the system has no starting point to measure your time from. Nothing is lost (Google keeps your uploaded file regardless), but you'll need to actually click **"I'm ready to open my test paper"** first, then submit again.

### If you never come back at all

Life happens — a team sometimes opens a paper and, for whatever reason, never submits anything. You don't need to do anything special in that case, and there's no penalty beyond what your coordinator decides for a missed test. What does happen automatically: once your 30-minute grace window fully closes with nothing submitted, the system removes your team's access to that paper on its own — you don't need to remember to "close it out," and nobody needs to chase down a forgotten open file. Your row on the Exams & Standing sheet keeps showing the plain "grace period has ended" message either way, so you'll always know where things stand.

<div class="note" markdown="1">
**Neither rejection costs you a valid submission you already have.** If you already have an accepted, on-time submission on record and a later resubmission attempt gets rejected (too late, or some mix-up), your earlier good submission still stands — it's never overwritten by a rejected attempt.
</div>

### Checking your status

The team's current state — for every test, every team — lives on the public **Exams & Standing** sheet (see [The public roster](#the-public-roster) above for the link). You don't need a password to view it; anyone can check it any time. Look for your team's row and its `Status` column, which is always in plain language and color-coded:

| You'll see | Meaning |
|---|---|
| *Scheduled for \<date\>* | Your next test is locked in but hasn't opened yet. |
| *Not started — click 'I'm ready to open my test paper' when ready* | Today's your day; whenever you're ready. |
| *In progress — N min remaining* | Clock's running. |
| *Almost out of time — N min left* | Inside the last stretch (amber). |
| *Overdue by N min — submit now, you have M min left before it's too late* | Past your deadline but still inside the 30-minute grace window. |
| *Overdue — the grace period has ended, contact your coordinator* | Past the 30-minute window with nothing submitted. |
| *Submitted on time* / *Submitted — N min late* | Your accepted submission is on record (green). |
| *Your submission wasn't accepted — no start was recorded...* / *...too late to be accepted automatically...* | One of the two rejection cases above — the message itself tells you what to do. |
| *Graded* | The result is in. |

The sheet updates itself within a few minutes of your click, and refreshes on its own every 5 minutes even if nobody's acted — so if you click Submit and the row doesn't change instantly, give it a moment before assuming something's wrong.

### If something looks wrong

Almost always, it's one of two things:

1. **You're signed into the wrong Google account.** Double-check you used your team's registered email, not a parent's or a sibling's.
2. **You haven't clicked "open my test paper" yet this session**, and are trying to submit — see above.

If you've checked both and it's still not working, contact your regional coordinator rather than repeatedly retrying the Form.

<details class="vn" markdown="1">
<summary>🇻🇳 Tiếng Việt — Dành cho Phụ huynh & Học sinh (click to expand)</summary>

### Mẫu (Form) duy nhất cần dùng

Mỗi gia đình chỉ cần lưu (bookmark) một đường link Form duy nhất từ đầu năm học — link này không đổi, và là điều duy nhất cần nhớ. Form chỉ có một câu hỏi với hai lựa chọn:

* **"I'm ready to open my test paper"** *(Con đã sẵn sàng mở đề thi)* — dùng khi bắt đầu làm bài.
* **"Submit my solution"** *(Nộp bài giải)* — dùng khi đã có file PDF bài giải hoàn chỉnh.

Trước tiên các em sẽ đăng nhập bằng tài khoản Google đã đăng ký. Đây là cách hệ thống biết mình thuộc đội nào — **việc bấm nút chỉ có tác dụng nếu đăng nhập bằng đúng email gia đình đã đăng ký**, không phải email cá nhân của phụ huynh hay bất kỳ tài khoản khác. Nếu không chắc là email nào, hãy hỏi quản lý vùng (xem phần dưới).

<div class="note" markdown="1">
**[Mở Test Paper Open/Submit Form →](https://docs.google.com/forms/d/e/1FAIpQLSdrDdmflJ9K6IR7BCAlTU_7ziffSilCjkywuVJT_MoEoDFPGg/viewform)**
</div>

Nếu có lúc nào lỡ mất link này, nó luôn có ở đây trên trang này — không cần chờ quản lý vùng gửi lại.

### Mở đề thi là bắt đầu tính giờ

Chỉ bấm **"I'm ready to open my test paper"** khi đã thực sự sẵn sàng ngồi vào làm bài — cú bấm này vừa cấp quyền cho đội mở file đề thi, vừa bắt đầu tính giờ. Không có bước "mở khóa" riêng trước đó; trước khi bấm, không ai trong đội có thể mở đề thi.

Bất kỳ thành viên nào trong đội cũng bấm được — không cần cả hai người cùng bấm. Nếu bạn cùng đội bấm thêm lần nữa (hoặc bấm nhầm lần hai), sẽ không có gì thay đổi thêm; đồng hồ không bị đặt lại từ đầu.

**Các em thực sự có bao nhiêu thời gian:** bằng thời lượng bài thi của level, cộng thêm 10 phút để bù cho khoảng thời gian thực từ lúc bấm đến lúc thực sự bắt đầu đọc đề (tải file, in ra, ổn định chỗ ngồi — không phải thời gian làm bài thêm). Vậy bài thi Level 3 (150 phút, xem [Tests & Yearbook](./tests.md)) cho các em đến 160 phút sau khi bấm.

### Nộp bài giải

Khi làm xong, quay lại đúng Form đó và chọn **"Submit my solution"** *(Nộp bài giải)*. Như mọi khi: **chỉ một file PDF, không gì khác** — không ảnh chụp, không nhiều file, không nộp qua email (xem [Tests & Yearbook](./tests.md#submitting-work) để biết lý do).

* Có thể nộp lại nhiều lần. Nếu 10 phút sau khi nộp phát hiện sai sót và vẫn còn thời gian, cứ nộp lại — file mới sẽ thay cho file cũ làm bài nộp chính thức. Không mất gì cả trong mọi trường hợp; nếu cần, file nộp trước đó vẫn còn, chỉ có đường link "bài nộp chính thức" chuyển sang file mới.
* Sau khi một bài nộp được chấp nhận, quyền truy cập của đội vào file đề thi sẽ tự động bị thu hồi. Đây là điều bình thường, không phải lỗi.

### Nếu nộp trễ

Nộp sau hạn vẫn được tự động chấp nhận, trong vòng **30 phút** sau hạn — chỉ bị ghi nhận trễ bao nhiêu phút. **Quá 30 phút, bài nộp sẽ không còn được tự động chấp nhận.** Đây không phải là hệ thống đang đánh giá bài làm của các em; đây chỉ là một mốc cố định để đảm bảo hồ sơ nộp bài — ai nộp, nộp gì, lúc nào — luôn chính xác. Nếu rơi vào trường hợp này, hãy liên hệ quản lý vùng — không nên cứ thử nộp lại qua Form.

### Nếu nộp bài mà chưa từng bấm "mở đề thi"

Trường hợp này cũng bị từ chối, cùng lý do giữ hồ sơ trung thực — hệ thống không có điểm mốc nào để tính thời gian làm bài. Không mất gì cả (Google vẫn giữ file đã tải lên), nhưng cần thực sự bấm **"I'm ready to open my test paper"** *(mở đề thi)* trước, rồi nộp lại.

### Nếu không bao giờ trở lại nộp bài

Đôi khi có chuyện xảy ra — một đội mở đề thi rồi vì lý do nào đó không nộp bài. Không cần làm gì đặc biệt trong trường hợp này, và không có hình phạt nào ngoài quyết định của quản lý vùng về một bài thi bị bỏ lỡ. Điều tự động xảy ra: khi hết 30 phút gia hạn mà chưa nộp gì, hệ thống sẽ tự thu hồi quyền truy cập file đề thi của đội — không cần nhớ "đóng" lại, và không ai phải đi tìm một file đang mở bị bỏ quên. Dòng của đội trên bảng Exams & Standing vẫn hiển thị đúng thông báo "hết thời gian gia hạn" để lúc nào cũng biết tình trạng của mình.

<div class="note" markdown="1">
**Một lần bị từ chối không làm mất bài nộp hợp lệ đã có.** Nếu đã có một bài nộp được chấp nhận, đúng hạn, và sau đó một lần nộp lại bị từ chối (quá trễ, hoặc nhầm lẫn), bài nộp tốt trước đó vẫn được giữ nguyên — không bao giờ bị ghi đè bởi một lần nộp bị từ chối.
</div>

### Theo dõi tình trạng bài thi

Tình trạng hiện tại của đội — cho mọi bài thi, mọi đội — nằm trên bảng công khai **Exams & Standing** (xem mục [The public roster](#the-public-roster) ở trên để lấy link). Không cần mật khẩu để xem; ai cũng xem được bất cứ lúc nào. Tìm dòng của đội mình và cột `Status`, luôn hiển thị bằng câu chữ rõ nghĩa và có màu:

| Nội dung hiển thị | Ý nghĩa |
|---|---|
| *Scheduled for \<date\>* | Bài thi kế tiếp đã được lên lịch nhưng chưa mở. |
| *Not started — click 'I'm ready to open my test paper' when ready* | Hôm nay là ngày thi; sẵn sàng lúc nào thì bấm. |
| *In progress — N min remaining* | Đồng hồ đang chạy. |
| *Almost out of time — N min left* | Sắp hết giờ (màu vàng cam). |
| *Overdue by N min — submit now, you have M min left before it's too late* | Đã quá hạn nhưng vẫn còn trong 30 phút gia hạn. |
| *Overdue — the grace period has ended, contact your coordinator* | Đã hết 30 phút gia hạn mà chưa nộp gì. |
| *Submitted on time* / *Submitted — N min late* | Bài nộp đã được chấp nhận (màu xanh). |
| *Your submission wasn't accepted — no start was recorded...* / *...too late to be accepted automatically...* | Một trong hai trường hợp bị từ chối ở trên — thông báo tự nói rõ cần làm gì. |
| *Graded* | Đã có kết quả chấm. |

Bảng tự cập nhật trong vòng vài phút sau khi bấm, và tự làm mới mỗi 5 phút dù không ai vừa thao tác — nên nếu bấm nộp bài mà dòng chưa đổi ngay, hãy chờ một chút trước khi nghĩ có gì sai.

### Nếu thấy có gì không đúng

Hầu như luôn là một trong hai điều này:

1. **Đang đăng nhập sai tài khoản Google.** Kiểm tra lại đã dùng đúng email đội đã đăng ký, không phải email của phụ huynh hay anh/chị/em.
2. **Chưa bấm "mở đề thi" trong lần này** mà đã cố nộp bài — xem phần trên.

Nếu đã kiểm tra cả hai mà vẫn không được, hãy liên hệ quản lý vùng, đừng cứ thử lại nhiều lần qua Form.

</details>

---

## Coordinator & organizer resources

<div class="note" markdown="1">
**Restricted access.** The two spreadsheets below hold family contact details and hand-edited pacing data, so they're shared individually, not with the public. Both go to coordinators (edit access) and organizers (view-only access). Opening a link below without access will prompt Google to request it; if you should have access and don't, get in touch through the [Organization](./organization.md) page.
</div>

**MCC Master Registration** — `Students`, `Teams`, `Coordinators`, `Graders`, and `Organizers` tabs, plus a `Data Check` tab that flags anything inconsistent before it causes a problem downstream. (The `Organizers` tab is just the contact list for that role — it's Nghia's record of who's an organizer, not something organizers themselves ever open; their own access to this spreadsheet, like Regional Pacing below, is view-only, never edit.)

**`Students`** — one row per student.

| Column | Meaning |
|---|---|
| `StudentID` | `S` + a zero-padded number (`S0142`). Assigned once, never derived from name or email — both can change; this never does. |
| `FullName` | As given. |
| `VerifiedEmail` | The email the registration Form itself captured from the signed-in respondent — never something typed into a text field. This is the one identity value every script trusts, including matching a Test Paper Form submission back to the right student. |
| `AlternateEmail` | A typed backup contact only — never used to identify anyone. |
| `ParentName` / `ParentEmail` | As given. |
| `Country` / `Region` / `Timezone` | Region is one of `UK`/`FR`/`EC`/`WC`/`VN`, defaulted from Country but overridable; Timezone likewise. |
| `Grade` | 1–12. |
| `Level` | 1–4. |
| `TeamID` | Blank if not yet on a team, otherwise must match a real row on `Teams` — never a note like "N/A" or "pending". |
| `Status` | `pending-team` / `active` / `withdrawn`. |
| `Note` | Free text — where any operational comment belongs, rather than jammed into `TeamID` or `Level`. |

**`Teams`** — one row per team; this is where a `TeamID` is created.

| Column | Meaning |
|---|---|
| `TeamID` | e.g. `T1a`. |
| `TeamName` | Optional. |
| `Level` | 1–4. |
| `Member1ID`…`Member3ID` | Up to 3 `StudentID`s. |
| `Region` | The team's "home" region, used to look up its default coordinator. |
| `CoordinatorID` | Defaults to whoever covers `Region`, but always overridable by hand — this is how a team with members in two different regions (say, one East Coast, one West Coast) still gets one clear coordinator. |
| `FolderID` | Not used — leave blank. An early design idea (a per-team folder of files) that was replaced before it ever shipped; teams get temporary access to the one shared paper file directly instead. |
| `Active` | TRUE/FALSE. |

**`Coordinators`** — `CoordinatorID` (e.g. `O01`), `Name`, `Email`, `RegionsCovered` (e.g. `EC, WC` — the *default* assignment only, never a hard restriction), `Note`. Every coordinator has edit access to every region's pacing, not just their own, so coordinators can always stand in for each other.

**`Organizers`** — `OrganizerID` (e.g. `CO01`), `Name`, `Email`, `Note`. This tab is simply the contact list for that read-only role; it doesn't grant anything by itself.

**`Graders`** — `GraderID`, `Name`, `Email`, `Note`.

**`Papers`** — one row per test paper that exists.

| Column | Meaning |
|---|---|
| `Level` | 1–4 |
| `Chapter` | integer |
| `Attempt` | 1, 2, 3… — a retake is a genuinely *different* uploaded file from a reserve pool, never the same paper reused |
| `DriveFileID` | The Drive file ID of the one canonical copy of this paper |
| `Note` | Free text |

`(Level, Chapter, Attempt)` is the lookup key everything else joins against to find the right file. There's exactly one Drive file per combination, shared with nobody by default — when a team starts that test, they get temporary Viewer access to that one file for their access window, then it's revoked. No per-team copies are ever made.

<details class="admin-details" markdown="1">
<summary>How to get a <code>DriveFileID</code> and add a new paper — nothing in the automation generates this for you</summary>

1. Prepare the PDF and upload it to Drive yourself, into the papers folder.
2. Name the file exactly `MCC-L<level>-Ch<chapter>-A<attempt>.pdf` — e.g. `MCC-L3-Ch7-A1.pdf` (the original), `MCC-L3-Ch7-A2.pdf` (first retake), `MCC-L3-Ch7-A3.pdf` (second retake). The `MCC-` prefix makes every paper easy to find with one Drive search regardless of which folder it's in; the rest matches the `Papers` columns exactly, so matching a physical file to its row is never a guessing game.
3. Get that file's Drive ID. Right-click the file in Drive → **Share** → **Copy link** (or just open the file and look at your browser's address bar). Either way you get a URL that looks like `https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing` — the file ID is the long string of letters/numbers between `/d/` and the next `/` (here, `1AbCdEfGhIjKlMnOpQrStUvWxYz`). Paste just that string into the row's `DriveFileID` cell on the `Papers` tab — not the whole URL.
4. In that same row's `Note` cell, spell out which attempt this is, e.g. `Level 3, Chapter 7, Attempt 2 (retake 1 of 2)` — so nobody miscounts the "at most 2 retakes" limit by reading `Attempt` alone.

That's the entire process — no script call is needed to "register" a paper beyond adding that one row.

</details>

<div class="note" markdown="1">
**[Open the Master Registration Spreadsheet →](https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing)**
</div>

<figure class="screenshot">
<img src="./img/current-standings/master-students.png" alt="The Students tab of the Master Registration spreadsheet">
<figcaption>The <code>Students</code> tab on the Master Registration Spreadsheet.</figcaption>
</figure>

**MCC Regional Pacing** — one tab per region, plus a `Standings` tab recomputed automatically from graded results.

Same columns on every region tab:

| Column | Meaning |
|---|---|
| `TeamID` / `TeamName` | Join key back to Master Registration; `TeamName` is copied at seed time, for readability only. |
| `Level` | Copied from Master Registration when the team's row was first added here — **not kept in sync afterward.** If a team is promoted a level mid-year, this column needs a manual edit too. |
| `NextChapter` | Which chapter the team tests next. Advances automatically once a test is graded (regardless of pass/fail — a coordinator who wants a team to redo a chapter still edits this by hand). |
| `ExamFrequencyWeeks` | 1, 2, or 3 — the column families most often ask to change. Editable any time. |
| `LastExamDate` | Set automatically once a test is graded. |
| `NextExamDate` | `LastExamDate` + `ExamFrequencyWeeks` × 7 days, recomputed automatically after every graded test. This is the date a coordinator actually watches. |
| `LastChangedDate` | Informational only — when this row was last hand-edited. |
| `Note` | Free text. |

*(What this means day to day — when a date actually locks, what a graded result changes automatically, retakes, pausing a team, and the Standings tab — is covered in full below, under [Coordinator & organizer resources](#coordinator--organizer-resources).)*

<div class="note" markdown="1">
**[Open the Regional Pacing Spreadsheet →](https://docs.google.com/spreadsheets/d/1BsRd05S7tK1lnr83vxidwDA87qAd1NWEMTFKvDfRkDg/edit?usp=sharing)**
</div>

<figure class="screenshot">
<img src="./img/current-standings/pacing-standings.png" alt="A regional tab of the Regional Pacing spreadsheet, with the Standings tab visible alongside it">
<figcaption>One region's tab on the Regional Pacing Spreadsheet — the <code>Standings</code> tab sits alongside it, recomputed from graded results.</figcaption>
</figure>

### Day to day, as a coordinator

The rest of this section assumes you're already familiar with [Organization](./organization.md)'s regional-coordinator role and the Regional Pacing sheet above, where you set each team's cadence.

### Tests now lock in — and clean up — on their own

Once a family's `NextExamDate` is within a week, the system creates that test occurrence automatically overnight — no action needed from you. It skips (and logs why) any team that's inactive, already has an unresolved test pending, or has a stale/past date that needs a fresh one from you first.

A team that opens its paper and never submits is also handled automatically: once their 30-minute grace window fully closes, their access to that paper is revoked on its own — you don't need to go clean anything up. Their row still needs your attention in one way, though: an abandoned test doesn't grade itself, so it'll keep showing as unresolved (blocking a fresh session for that team) until you record a result for it, most likely a no-show or a zero, the same way you'd handle any missed test.

Before trusting this for a family whose team is about to test a new chapter for the first time, it's worth a quick sanity check that a paper actually exists for it — ask Nghia to run the club-wide readiness check if you're ever unsure a chapter is covered.

### Locking in a changed date right away

You don't have to wait for the overnight run. If you've just changed a team's `NextExamDate` and want that session created immediately -- to double-check it landed correctly, or because the family wants to see it reflected right away -- open the Master Registration Spreadsheet, click **MCC Tools**, then **Lock in changed exam dates**. It runs the exact same check the nightly process does, just on demand: any team whose `NextExamDate` has entered the next 7 days and doesn't already have a session gets one locked in right there. It's safe to click any time -- a team with nothing due yet is simply skipped, and it won't create a duplicate for a team that's already locked in. Same access as everything else here: you (any regional coordinator listed on the `Coordinators` tab) or Nghia can use it; if your email isn't confirmed there, the menu tells you rather than running.

### Grades now update a team's pacing automatically -- and a failed team gets an automatic retake

Once a result is recorded for a test — Toan/Nghia grade a week's
submissions in the shared weekly grading spreadsheet, mark the
finished rows Done, and pull them in — the system updates that team's
Regional Pacing row on its own, usually within seconds: `LastExamDate`
is set to the date the test actually happened, and `NextExamDate` is
recalculated from there using whatever `ExamFrequencyWeeks` is already
on the row. What happens to `NextChapter` depends on the result:

* **Pass** (at any attempt) — `NextChapter` moves forward, exactly as
  before. You don't need to touch it yourself.
* **Fail, with attempts remaining** — `NextChapter` stays put, and a
  new test occurrence is created automatically for the *same* chapter
  (their next attempt). Their row on the Exams & Standing sheet reads
  something like *"Not passed — Attempt 1 of 3. Contact your
  coordinator to schedule a retake"* — that's your cue to reach out to
  the family; the system itself never emails anyone. A team gets up to
  three attempts total (two retakes) per chapter.
* **Fail, on the 3rd and final attempt** — `NextChapter` stays put and
  no further retake is created. Their row reads *"...This chapter
  needs your coordinator's decision"* — from here it's genuinely up to
  you: repeat the chapter by hand, move them on anyway, or whatever
  fits that family's situation. The system deliberately doesn't guess.

Family-visible comments from grading show up in their own row's
`Comment` column — plain text, or a clickable link straight to the
grader's PDF feedback if that's what they attached — without opening
the (coordinator-only) grading spreadsheet.

### A new Standings tab shows progress at a glance

The Regional Pacing workbook now also has a **Standings** tab —
one row per team, across all five regions, showing level, next
chapter, chapters completed so far, sessions completed, and their
last test date. It's generated automatically (refreshes itself
whenever a grade is recorded) — nobody needs to fill it in or keep it
current by hand. This is for coordinators only, for now — not shared
with families.

### Checking your own data for problems

You don't need to wait for Nghia to tell you something looks off. Open the Master Registration Spreadsheet (the one you already use to add students and teams), and look for a menu called **MCC Tools** at the top, next to File/Edit/View. Click it, then **Check my data**.

The first time you do this, Google may show you a permission approval screen — this is expected, not a sign anything is wrong; click **Allow** to continue, and the check will run.

A new **Data Check** tab appears (or updates, if it's already there), with one row per thing checked. Green rows mean that part is fine. Any red row explains exactly what to look at and what to do about it — for example, a student listing a team that doesn't exist yet, or a team whose coordinator isn't set up. You can run this any time, as often as you want; it never changes any of your data, it only reports on it.

### If a family needs their current test reset

**MCC Tools → Reset my test suite** lets you reset one of your own teams' *current* test attempt yourself — back to a fresh, unstarted attempt (undoing a Pass if one already advanced them), with a new session locked in immediately. It only ever touches your own team, never anyone else's, and if you cover more than one team it asks which `TeamID` you mean before doing anything.

This is turned off by default — click it and you may see *"Self-service reset isn't turned on for this round"* rather than a reset happening. That's not a bug; message Nghia directly in that case and he'll reset the team's current test for you. If the team's Regional Pacing row has been deleted outright rather than just needing a reset, this can't rebuild it — that's also a case for Nghia, not this menu item.

### Changing a team's pace or date

Two fields, two separate effects:

* **`ExamFrequencyWeeks`** only affects tests *after* the next one — it's the cadence going forward.
* **`NextExamDate`** is the literal next test date, and you can move it freely — **right up until it locks** (inside the one-week window and a test occurrence has been created for it). After that, editing `NextExamDate` no longer moves that specific, already-locked test.

**If a family genuinely needs an already-locked test date changed** — a real emergency, not routine pacing — that's a direct edit on the `Exams` sheet's `ExamDate` cell for that row, not the Regional Pacing sheet. This is deliberate: it keeps a last-minute pacing edit from ever colliding with a test that's effectively already started.

### Pausing vs. skipping

* **One skipped week, otherwise continuing normally:** just move `NextExamDate` out — the cadence resumes from wherever the real next test lands, nothing to fix afterward.
* **Indefinite pause** (family doesn't know when they'll resume): set the team `Active = FALSE` on the Regional Pacing sheet, not just a date edit. When they're ready to resume, flip it back to `TRUE` and set a fresh `NextExamDate` yourself — the system won't guess one.

### Where test papers come from

You don't need to upload or manage test paper files — Nghia prepares and uploads every paper ahead of time. Your role is entirely about team pacing and being the first point of contact when a family hits a snag.

<div class="note" markdown="1">
**Known gap:** if a team's next chapter genuinely has no paper prepared yet, clicking "I'm ready to open my test paper" currently fails silently — no error to the family, nothing to the coordinator either. This is exactly why the readiness check mentioned above matters more than it might seem.
</div>

### If a family says the Form "isn't working"

Almost always: they're signed into an unregistered Google account. Confirm which email their team registered with, and have them try again signed in as that account. If that's not it and their team's `Exams` sheet row genuinely isn't updating after a real click, that's worth flagging to Nghia directly rather than guessing further.

### A late or rejected submission

The system automatically accepts a late submission up to 30 minutes past deadline (flagged, not penalized further by the system itself — see [Tests & Yearbook](./tests.md) for how grading works). Past that window, or a submission with no recorded start, is rejected outright and the family is told, on the sheet itself, exactly what to do. If a family reaches out to you about one of these, the fix is almost always what the `Status` message on their row already says — check that first.

<details class="vn" markdown="1">
<summary>🇻🇳 Tiếng Việt — Hằng ngày, với vai trò quản lý vùng (click to expand)</summary>

Phần còn lại của mục này giả định đã quen với vai trò quản lý vùng ở trang [Organization](./organization.md) và bảng Regional Pacing ở trên, nơi thiết lập nhịp độ của từng đội.

### Bài thi tự động được khóa lịch — và tự dọn dẹp

Khi `NextExamDate` của một gia đình còn trong vòng một tuần, hệ thống tự tạo buổi thi đó vào ban đêm — không cần quản lý vùng làm gì. Hệ thống sẽ bỏ qua (và ghi rõ lý do) bất kỳ đội nào đang ngưng hoạt động, đã có một buổi thi chưa xử lý xong, hoặc có ngày thi đã cũ/quá hạn cần quản lý vùng cập nhật lại trước.

Một đội mở đề thi rồi không nộp bài cũng được xử lý tự động: khi hết 30 phút gia hạn, quyền truy cập đề thi của đội đó tự động bị thu hồi — không cần quản lý vùng dọn dẹp gì thêm. Tuy vậy dòng đó vẫn cần quản lý vùng chú ý một việc: một bài thi bị bỏ dở không tự chấm được, nên sẽ tiếp tục hiển thị là "chưa xử lý xong" (và chặn một buổi thi mới cho đội đó) cho đến khi quản lý vùng ghi nhận kết quả — nhiều khả năng là vắng thi hoặc điểm 0, giống cách xử lý mọi buổi thi bị bỏ lỡ khác.

Trước khi yên tâm rằng điều này sẽ tự động đúng cho một gia đình sắp thi chương mới lần đầu, nên kiểm tra nhanh xem đề thi cho chương đó đã có chưa — nếu không chắc một chương đã có đề hay không, nhờ thầy Nghĩa chạy kiểm tra sẵn sàng cho toàn câu lạc bộ.

### Khóa lịch ngay, không cần chờ qua đêm

Không cần chờ đến lượt chạy tự động ban đêm. Nếu vừa đổi `NextExamDate` của một đội và muốn buổi thi đó được tạo ngay -- để kiểm tra lại cho chắc, hoặc vì gia đình muốn thấy cập nhật ngay lập tức -- mở Master Registration Spreadsheet, bấm **MCC Tools**, rồi chọn **Lock in changed exam dates**. Menu này chạy đúng việc kiểm tra mà quy trình ban đêm vẫn làm, chỉ khác là chạy ngay theo yêu cầu: đội nào có `NextExamDate` rơi vào 7 ngày tới và chưa có buổi thi nào được tạo sẽ được khóa lịch ngay lúc đó. Có thể bấm bất cứ lúc nào cũng an toàn -- đội nào chưa đến hạn sẽ tự động được bỏ qua, và sẽ không tạo trùng cho đội đã được khóa lịch rồi. Quyền sử dụng giống mọi phần khác ở đây: quản lý vùng đã có tên trên tab `Coordinators`, hoặc thầy Nghĩa, đều dùng được; nếu email chưa có trên tab đó, menu sẽ báo cho biết thay vì chạy.

### Kết quả chấm bài giờ tự động cập nhật nhịp độ — và một đội không đạt sẽ tự động có buổi thi lại

Khi một kết quả bài thi được ghi nhận — thầy Toàn/thầy Nghĩa chấm bài của cả tuần trên bảng chấm điểm dùng chung, đánh dấu Done cho các dòng đã xong, rồi kéo kết quả vào hệ thống — hệ thống tự cập nhật dòng Regional Pacing của đội đó, thường chỉ trong vài giây: `LastExamDate` được đặt thành ngày thi thực tế, và `NextExamDate` được tính lại dựa trên `ExamFrequencyWeeks` đang có sẵn trên dòng đó. Còn `NextChapter` thay đổi hay không thì tùy vào kết quả:

* **Đạt** (ở bất kỳ lần thi nào) — `NextChapter` chuyển sang chương kế tiếp, như trước đây. Quản lý vùng không cần tự tay sửa.
* **Không đạt, còn lượt thi lại** — `NextChapter` giữ nguyên, và một buổi thi mới cho CÙNG chương đó (lần thi kế tiếp) được tạo tự động. Dòng của đội trên bảng Exams & Standing sẽ hiện thông báo dạng *"Not passed — Attempt 1 of 3. Contact your coordinator to schedule a retake"* — đây là dấu hiệu để quản lý vùng chủ động liên hệ gia đình; hệ thống không tự gửi email cho ai cả. Mỗi chương, một đội được tối đa ba lần thi (hai lần thi lại).
* **Không đạt, ở lần thi thứ 3 (cuối cùng)** — `NextChapter` giữ nguyên và không có buổi thi lại nào được tạo thêm. Dòng của đội sẽ hiện *"...This chapter needs your coordinator's decision"* — từ đây là quyết định của quản lý vùng: cho thi lại chương đó bằng tay, vẫn cho đội tiến lên, hay tùy theo hoàn cảnh gia đình. Hệ thống cố tình không tự đoán.

Nhận xét của người chấm mà gia đình được phép xem sẽ hiện trong cột `Comment` riêng của đúng dòng đội đó — chữ thường, hoặc một đường link bấm được thẳng tới file PDF nhận xét nếu người chấm gắn kèm — mà không cần mở bảng chấm điểm (chỉ dành cho ban tổ chức).

### Tab Standings mới — nhìn nhanh tiến độ tất cả các đội

Bảng tính Regional Pacing giờ có thêm một tab **Standings** — mỗi đội một dòng, gộp cả năm khu vực, hiển thị level, chương kế tiếp, số chương đã hoàn thành, số buổi thi đã hoàn thành, và ngày thi gần nhất. Bảng này tự động tạo ra (tự làm mới mỗi khi có kết quả được ghi nhận) — không ai cần tự điền hay cập nhật bằng tay. Hiện tại chỉ dành cho các quản lý vùng/thầy Nghĩa — chưa chia sẻ cho gia đình.

### Kiểm tra dữ liệu của mình xem có vấn đề gì không

Quản lý vùng không cần chờ thầy Nghĩa báo có gì đó không ổn. Mở bảng tính Master Registration Spreadsheet (bảng vẫn dùng để thêm học sinh và đội), tìm menu tên **MCC Tools** ở trên cùng, cạnh File/Edit/View. Bấm vào đó, rồi chọn **Check my data**.

Lần đầu làm việc này, Google có thể hiện một màn hình xin quyền truy cập — đây là điều bình thường, không phải dấu hiệu có gì sai; bấm **Allow** để tiếp tục, việc kiểm tra sẽ chạy.

Một tab mới tên **Data Check** sẽ xuất hiện (hoặc cập nhật, nếu đã có sẵn), mỗi dòng là một mục được kiểm tra. Dòng màu xanh nghĩa là phần đó ổn. Dòng màu đỏ sẽ giải thích chính xác cần xem gì và cần làm gì — ví dụ một học sinh ghi tên đội chưa tồn tại, hoặc một đội chưa có quản lý phụ trách. Có thể chạy kiểm tra này bất cứ lúc nào, bao nhiêu lần cũng được; nó không bao giờ thay đổi dữ liệu, chỉ báo cáo về dữ liệu thôi.

### Thay đổi nhịp độ hoặc ngày thi của một đội

Hai cột, hai tác dụng riêng biệt:

* **`ExamFrequencyWeeks`** chỉ ảnh hưởng đến các bài thi *sau* bài kế tiếp — đây là nhịp độ về sau.
* **`NextExamDate`** là ngày thi kế tiếp thật, có thể thay đổi tự do — **cho đến khi bị khóa** (vào trong tuần cuối và buổi thi đã được tạo). Sau đó, sửa `NextExamDate` không còn ảnh hưởng đến buổi thi cụ thể đã bị khóa đó nữa.

**Nếu một gia đình thực sự cần đổi ngày một buổi thi đã bị khóa** — trường hợp khẩn cấp thật sự, không phải điều chỉnh nhịp độ thông thường — cần sửa trực tiếp ô `ExamDate` của dòng đó trên bảng `Exams`, không sửa trên bảng Regional Pacing. Đây là chủ ý: để một lần sửa nhịp độ vào giờ chót không bao giờ va vào một buổi thi đã coi như đang diễn ra.

### Tạm ngưng so với bỏ qua một lần

* **Bỏ một tuần, sau đó tiếp tục bình thường:** chỉ cần dời `NextExamDate` ra — nhịp độ sẽ tiếp tục tính từ ngày thi thật kế tiếp, không cần sửa gì thêm sau đó.
* **Tạm ngưng không rõ ngày trở lại:** đặt `Active = FALSE` cho đội đó trên bảng Regional Pacing, không chỉ sửa ngày. Khi gia đình sẵn sàng trở lại, đổi lại thành `TRUE` và tự đặt một `NextExamDate` mới — hệ thống sẽ không tự đoán ngày.

### Đề thi lấy từ đâu

Quản lý vùng không cần tải lên hay quản lý file đề thi — thầy Nghĩa chuẩn bị và tải lên mọi đề thi từ trước. Vai trò của quản lý vùng hoàn toàn là về nhịp độ của từng đội và là đầu mối liên hệ đầu tiên khi gia đình gặp trục trặc.

### Nếu một gia đình báo Form "không hoạt động"

Hầu như luôn là do đăng nhập bằng tài khoản Google chưa đăng ký. Xác nhận lại email đội đã đăng ký, và để gia đình thử lại bằng đúng tài khoản đó. Nếu không phải vậy và dòng của đội trên bảng `Exams` thực sự không cập nhật sau một lần bấm thật, nên báo trực tiếp cho thầy Nghĩa thay vì đoán thêm.

### Bài nộp trễ hoặc bị từ chối

Hệ thống tự động chấp nhận bài nộp trễ trong vòng 30 phút sau hạn (được ghi nhận là trễ, không bị hệ thống tự trừ điểm thêm — xem [Tests & Yearbook](./tests.md) về cách chấm điểm). Quá thời hạn đó, hoặc một bài nộp mà không có ghi nhận đã bắt đầu làm bài, sẽ bị từ chối ngay và gia đình được thông báo ngay trên bảng cần làm gì tiếp theo. Nếu một gia đình liên hệ về việc này, cách xử lý hầu như luôn đúng như thông báo `Status` trên dòng của họ đã nêu — kiểm tra đó trước.

</details>

---

## For Graders

English only -- this section is for Toan and Nghia, the two people who actually grade submissions each week. It's a distinct role from coordinating a region: grading is a judgment call on the math itself, not team pacing or being a family's first point of contact.

### Where the weekly grading spreadsheet comes from

There's one shared spreadsheet per week, `MCC Grading — <ISO week>` (e.g. `MCC Grading — 2026-W37`) -- Editor access for graders only, never shared with families. It's created automatically the first time it's needed for a given week; you don't create or name it yourself. Once it exists, it stays available in your Google Drive ("Shared with me," or just search for "MCC Grading") for as long as that week's grading is in progress.

### What to fill in, and when to mark a row Done

Each row is one graded submission: fill in `Score` (0-100, the club's usual point system), `Comments` (whatever feedback you want the family to see -- per-problem or overall, your call), and `GradedBy` (your name). Check the `Done` box only once a row is genuinely finished. **A half-graded row should stay unchecked** -- the automation only ever reads rows marked `Done`, specifically so a score you're still second-guessing never gets pulled into a family's row by accident. There's no rush; grade at your own pace across the week. **Pulling results in is Nghia's step, not yours** — the "MCC Tools → Pull weekly grading" menu item only works for him; once you've marked your rows `Done`, let him know (or he runs it on his own schedule) and they'll be pulled in.

### What happens automatically once you mark a row Done and pull results in

Once a row is `Done` and the results are pulled in, the matching family's row on the public Exams & Standing sheet updates itself: `Score`, `Result` (`Pass` if the score is 51 or above, `Fail` otherwise -- the club's existing documented pass mark, nothing new), and a timestamp all get written automatically. Your `Comments` land in their own `Comment` column on that row -- plain text, or, if you pasted a link to a PDF, a clickable link straight to it -- so yes, your comments really do reach the family, without you needing to tell them separately or share anything new. A row you never marked `Done` is simply left alone; running the pull again later, once you do mark it, picks it up then.

### What a Fail means from here

A failing result doesn't mean you need to do anything else yourself. The family's row automatically shows a message like *"Not passed — Attempt 1 of 3. Contact your coordinator to schedule a retake"* -- a new test occurrence for the same chapter is created for them automatically. It's the family's regional coordinator, not you, who reaches out and arranges the actual retake timing; the system itself never emails anyone. A team gets up to three attempts total (two retakes) per chapter.

### What happens at the third failed attempt

If a team fails their third attempt at a chapter, nothing further happens automatically -- no new retake is created. Their row instead reads *"...This chapter needs your coordinator's decision."* That's deliberate: at that point it's a real judgment call for the family's coordinator (repeat the chapter, move on anyway, or whatever fits), not something this system should guess at on its own.

---

## UAT — testing with real volunteers

A small group of real families and one real grader are helping test the same pipeline above, each with their own dedicated practice team so no one's data mixes with anyone else's. If you volunteered to help test, find your name below — that's your page, with your own login, your own team, and your own steps to follow, no email or message needed to get started.

<div class="note" markdown="1">
- **[Anh Tran, with Chi Khanh Pham →](./uat-anh-tran.md)**
- **[Son Ho, with Henry Ho & Michael Le →](./uat-son-ho.md)**
- **[Thoa Mai, with Nam Phong Nguyen & Jason To →](./uat-thoa-mai.md)**
- **[Tuan Le, with Linh Khanh Le →](./uat-tuan-le.md)**
- **[Toan To (Grader) →](./uat-toan-to.md)**
</div>

## Testing the pipeline

Before any real team's test depends on it, every piece of the pipeline above — releasing a test paper, a family opening and submitting it, a grader marking it, the standings updating — gets proven end to end using two practice accounts instead of real students, across 14 numbered test cases.

<div class="note" markdown="1">
**[Making Sure Testing Works: a 14-test walkthrough →](./testing-the-pipeline.md)**
</div>
