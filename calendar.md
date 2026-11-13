---
title: Calendar
---

# Club calendar

Every club-wide date in one place. Your team's own chapter-test dates are on the [Exams sheet](./current-standings.md#the-public-roster): each team tests at its own pace, so they are not listed here.

<div class="note" markdown="1">
**Club times are US Pacific time** (PST in winter), so that students in Seattle can take part. British Columbia no longer changes its clocks: from November to mid-March, Victoria is **one hour ahead of PST**. From 14 March 2027 the two agree again.

**[Add these dates to your calendar](./assets/mcc-calendar.ics)** (an .ics file for Google Calendar, Apple Calendar or Outlook).
</div>

## Coming up

<div class="cal-wrap" markdown="0">
<table class="cal-upcoming">
<thead><tr><th>Date</th><th>What</th><th>Time</th></tr></thead>
<tbody>
{% for e in site.data.calendar %}<tr data-until="{{ e.until }}"><td><strong>{{ e.when_en }}</strong></td><td>{{ e.what_en | markdownify | remove: '<p>' | remove: '</p>' | strip }}</td><td>{{ e.time_en }}</td></tr>
{% endfor %}</tbody>
</table>
<p class="cal-none" hidden>Nothing is scheduled right now. New dates appear here as soon as they are set.</p>
</div>

### The same times around the world

| | Math Sunday | Coding contest |
|---|---|---|
| Seattle, Vancouver area (PST) | 7:00–8:30 AM | 8:00–8:45 AM |
| Victoria, B.C. (UTC−7) | 8:00–9:30 AM | 9:00–9:45 AM |
| Toronto, New York | 10:00–11:30 AM | 11:00–11:45 AM |
| London | 3:00–4:30 PM | 4:00–4:45 PM |
| Paris | 4:00–5:30 PM | 5:00–5:45 PM |
| Hanoi, Ho Chi Minh City | 10:00–11:30 PM | 11:00–11:45 PM |

These hold from November to mid-March 2027.

## Through the year

| When | What |
|---|---|
| September – December | First semester, ending with the semester exam |
| January – June | Second semester |
| Every two weeks, on Sundays | Math Sunday and the TOML coding contest, in turn ([Programs](./programs.md#the-weekly-sunday-session)) |
| Any time in the school year | New teams register and sit the two-day entrance test on dates they choose ([Programs](./programs.md#entrance-and-reassessment)); try the free [readiness check](./readiness.md) first |
| Spring 2027, before Easter | 🥚 The Mystical Egg, for ingenuity on puzzle-style problems |
| April 2027 | 🌍 [Purple Comet! Math Meet](./purple-comet-2026.md) |
| June 2027 | End of year: the MCC Championship, Top Perfect-Scorers and special recognition ([Awards](./programs.md#awards-through-the-year)) |
| July – August | No club activity |

<details class="vn" markdown="1">
<summary>🇻🇳 Tiếng Việt — Lịch câu lạc bộ (click to expand)</summary>

Mọi mốc chung của câu lạc bộ ở một chỗ. Ngày thi chương của từng đội nằm trên [bảng Exams](./current-standings.md#the-public-roster): mỗi đội thi theo nhịp riêng nên không ghi ở đây.

**Giờ của câu lạc bộ là giờ Pacific của Mỹ** (PST vào mùa đông), để học sinh ở Seattle tham gia được. Tỉnh B.C. không còn đổi giờ: từ tháng 11 đến giữa tháng 3, Victoria **sớm hơn PST một giờ**. Từ 14/3/2027 hai giờ trùng nhau trở lại.

**[Thêm các ngày này vào lịch của gia đình](./assets/mcc-calendar.ics)** (tệp .ics cho Google Calendar, Apple Calendar hoặc Outlook).

**Sắp tới**

<div class="cal-wrap" markdown="0">
<table class="cal-upcoming">
<thead><tr><th>Ngày</th><th>Nội dung</th><th>Giờ</th></tr></thead>
<tbody>
{% for e in site.data.calendar %}<tr data-until="{{ e.until }}"><td><strong>{{ e.when_vn }}</strong></td><td>{{ e.what_vn | markdownify | remove: '<p>' | remove: '</p>' | strip }}</td><td>{{ e.time_vn }}</td></tr>
{% endfor %}</tbody>
</table>
<p class="cal-none" hidden>Hiện chưa có lịch mới. Các ngày mới sẽ xuất hiện ở đây ngay khi được ấn định.</p>
</div>

**Giờ ở các nơi** (từ tháng 11 đến giữa tháng 3/2027): Chủ nhật Toán 7:00–8:30 sáng PST = 8:00–9:30 sáng Victoria = 10:00–11:30 sáng Toronto = 4:00–5:30 chiều Paris = 10:00–11:30 tối Việt Nam. Thi lập trình 8:00–8:45 sáng PST = 9:00–9:45 sáng Victoria = 11:00–11:45 sáng Toronto = 5:00–5:45 chiều Paris = 11:00–11:45 tối Việt Nam.

**Trong năm học:** học kỳ 1 từ tháng 9 đến tháng 12, kết thúc bằng thi học kỳ; học kỳ 2 từ tháng 1 đến tháng 6. Chủ nhật Toán và thi lập trình TOML luân phiên hai tuần một lần. Đội mới đăng ký và thi đầu vào hai ngày bất cứ lúc nào trong năm học. 🥚 The Mystical Egg vào mùa xuân, trước lễ Phục sinh. 🌍 Purple Comet! Math Meet vào tháng 4/2027. Cuối năm (tháng 6): MCC Championship, Top Perfect-Scorers và các giải đặc biệt. Tháng 7 và tháng 8 câu lạc bộ nghỉ.

</details>

<script>
  // Hide dates that have passed (US Pacific time), so the page never shows
  // stale rows. The dates themselves live in _data/calendar.yml.
  (function () {
    try {
      var today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date()); // YYYY-MM-DD
      Array.prototype.forEach.call(document.querySelectorAll('.cal-wrap'), function (w) {
        var shown = 0;
        Array.prototype.forEach.call(w.querySelectorAll('tr[data-until]'), function (tr) {
          if (tr.getAttribute('data-until') < today) tr.hidden = true; else shown++;
        });
        if (!shown) { w.querySelector('table').hidden = true; w.querySelector('.cal-none').hidden = false; }
      });
    } catch (e) {}
  })();
</script>
