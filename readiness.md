---
title: Readiness check
---

<style>
  .rc-levels { display: inline-flex; border: 1px solid var(--rule); border-radius: var(--radius); overflow: hidden; margin: .4em 0 1em; }
  .rc-levels button { border: 0; background: var(--white); color: var(--ink); padding: 7px 16px; font: inherit; font-size: 15px; cursor: pointer; }
  .rc-levels button.active { background: var(--brand); color: var(--white); }
  .rc-problem { background: var(--white); border: 1px solid var(--rule); border-radius: var(--radius); padding: 14px 18px; margin: 1.1em 0; }
  .rc-problem h3 { margin: 0 0 .5em; font-size: 1.05rem; border-bottom: none; padding-bottom: 0; }
  .rc-problem h3 .pts { font-weight: 400; color: var(--ink-soft); font-size: .9em; }
  .rc-text { font-family: Georgia, "Times New Roman", "Noto Serif", serif; font-size: 1.02em; line-height: 1.6; }
  .rc-part { margin: .7em 0 0; }
  .rc-ans { margin: .35em 0 0 1.4em; display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; font-size: 15px; }
  .rc-ans input { font: inherit; width: 7.5em; padding: 4px 8px; border: 1px solid var(--rule); border-radius: 4px; }
  .rc-ans input.small { width: 3.6em; }
  .rc-ans .mark { font-weight: 700; min-width: 1.2em; }
  .rc-ans .ok { color: #2e7d32; }
  .rc-ans .no { color: #c62828; }
  .rc-ans .shown { color: var(--ink-soft); }
  .rc-nocheck { margin: .35em 0 0 1.4em; font-size: 14px; color: var(--ink-soft); font-style: italic; }
  .rc-bar { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin: 1em 0; }
  .rc-bar button { font: inherit; font-size: 15px; padding: 7px 16px; border-radius: var(--radius); border: 1px solid var(--brand); background: var(--white); color: var(--brand); cursor: pointer; }
  .rc-bar button.primary { background: var(--brand); color: var(--white); }
  .rc-timer { font-variant-numeric: tabular-nums; font-weight: 700; font-size: 1.1em; }
  .rc-result { display: none; }
</style>

# Readiness check

A free self-check for students thinking of joining MCC. Pick a level, set aside **60 minutes**, and solve **4 problems** with pencil and paper. Then type your answers below: the page checks them at once and suggests where to start.

* **Nothing is sent anywhere.** No sign-in, no names; your answers stay in your browser.
* **No calculators, no internet, no AI.** It is a check for you, so it only helps if the work is your own.
* **Which level?** [T1](./t1.md) is the entry point to contest training, for students who have already worked through Beast Academy or the AoPS Introductory series. [T2](./t2.md): problems that need more than one idea. [T3](./t3.md): national olympiad problems. [T4](./t4.md): olympiad mastery. Not sure? Try T1 first, then the next level up.
* The problems come from a past MCC entrance test. On the real test, students also write full solutions, and the parts that ask you to *show* or *explain* something are marked on that writing. Here only the answers are checked.

This check does not place a student. Placement is by the club's [two-day entrance test](./programs.md#entrance-and-reassessment), sat as a team, after [registration](./register.md).

<details class="vn" markdown="1">
<summary>🇻🇳 Tiếng Việt — Bài tự kiểm tra (click to expand)</summary>

Bài tự kiểm tra miễn phí cho các em muốn tham gia MCC. Chọn một level, dành ra **60 phút**, giải **4 bài** bằng giấy bút. Sau đó gõ đáp số vào các ô bên dưới: trang sẽ kiểm tra ngay và gợi ý nên bắt đầu ở level nào.

* **Không gửi đi đâu cả.** Không đăng nhập, không ghi tên; đáp số chỉ nằm trong trình duyệt của gia đình.
* **Không dùng máy tính bỏ túi, internet hay AI.** Bài này để các em tự biết mình, nên chỉ có ích khi các em tự làm.
* **Chọn level nào?** [T1](./t1.md) là bước đầu vào luyện toán thi đấu, cho các em đã học qua Beast Academy hoặc bộ AoPS Introductory. [T2](./t2.md): các bài cần kết hợp nhiều ý. [T3](./t3.md): bài thi olympic cấp quốc gia. [T4](./t4.md): thành thạo toán olympic. Chưa chắc? Thử T1 trước, rồi đến level cao hơn.
* Các bài lấy từ một đề thi đầu vào cũ của MCC. Trong bài thi thật, học sinh còn phải viết lời giải đầy đủ, và các câu yêu cầu *chứng minh* hay *giải thích* được chấm trên bài viết đó. Ở đây chỉ kiểm tra đáp số.

Bài này không dùng để xếp lớp. Việc xếp level dựa trên [bài thi đầu vào hai ngày](./programs.md#entrance-and-reassessment), làm theo đội, sau khi [đăng ký](./register.md).

</details>

<div id="rc-app" markdown="0">
  <div class="rc-levels" role="group" aria-label="Level">
    <button type="button" data-level="1">T1</button><button type="button" data-level="2">T2</button><button type="button" data-level="3">T3</button><button type="button" data-level="4">T4</button>
  </div>
  <div class="rc-bar">
    <button type="button" id="rc-start" class="primary">Start the 60-minute timer</button>
    <span class="rc-timer" id="rc-timer" aria-live="polite"></span>
  </div>
  <div id="rc-problems"></div>
  <div class="rc-bar">
    <button type="button" id="rc-check" class="primary">Check my answers</button>
    <button type="button" id="rc-show">Show the answers</button>
    <button type="button" id="rc-clear">Clear</button>
  </div>
  <div class="note rc-result" id="rc-result" aria-live="polite"></div>
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/contrib/auto-render.min.js"></script>
<script src="{{ '/assets/js/readiness-check.js' | relative_url }}?v=1"></script>
