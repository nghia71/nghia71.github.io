---
title: Video Lectures
robots: noindex
---

# Video Lectures

Every chapter of the two textbooks gets its own lecture, recorded by Teacher Nghia: **54 lectures for LPS VI** (Levels 1 & 2) and **55 for LPS VII** (Levels 3 & 4). Lectures are added here as they are released.

A lecture is a companion to the book, not a replacement for it. Watch it, then go back to the chapter: start with the easier problems and the ones you can follow, and don't give up when something doesn't make sense straight away. A little every day works; opening the book the night before a test does not.

<div class="note" markdown="1">
**For MCC members only.** These lectures are a privilege of club membership. Please don't share the links outside the club.
</div>

<div class="vn" markdown="1">

**Bài giảng video.** Mỗi chương của hai cuốn sách có một bài giảng riêng do Thầy Nghĩa soạn và ghi hình: **54 bài cho LPS VI** (Level 1 & 2) và **55 bài cho LPS VII** (Level 3 & 4). Bài giảng mới sẽ được cập nhật tại đây ngay khi phát hành.

Bài giảng đi kèm với sách chứ không thay thế sách. Xem bài giảng xong, các em quay lại đọc chương đó: bắt đầu từ các bài dễ và các bài mình hiểu được, đừng bỏ cuộc nếu chưa hiểu ngay. Học đều đặn mỗi ngày mới hiệu quả; chỉ mở sách vào hôm trước ngày thi thì không.

**Chỉ dành cho thành viên MCC.** Xin đừng chia sẻ đường dẫn ra ngoài câu lạc bộ.

</div>

<div class="video-lectures" markdown="0">
{% assign books = "lps6|lps7" | split: "|" %}
{% for key in books %}
{% if key == "lps6" %}
  {% assign heading = "LPS VI — From Foundations to Insight" %}
  {% assign sub = "Levels 1 & 2 · 54 lectures" %}
  {% assign anchor = "lps-vi" %}
{% else %}
  {% assign heading = "LPS VII — From Insight to Mastery" %}
  {% assign sub = "Levels 3 & 4 · 55 lectures" %}
  {% assign anchor = "lps-vii" %}
{% endif %}
{% assign lectures = site.data.video_lectures[key] %}
{% assign released = lectures | where_exp: "l", "l.url != ''" | size %}

<h2 id="{{ anchor }}">{{ heading }}</h2>
<p><strong>{{ sub }}</strong> — {{ released }} released so far.</p>

{% assign current_part = "" %}
{% for l in lectures %}
{% if l.part != current_part %}
{% unless forloop.first %}</tbody></table>{% endunless %}
<h3>{{ l.part }}</h3>
<table class="lectures">
<thead><tr><th>Chapter</th><th>Title</th><th>Lecture</th></tr></thead>
<tbody>
{% assign current_part = l.part %}
{% endif %}
<tr>
  <td>{{ l.chapter }}</td>
  <td>{{ l.title }}</td>
  <td>{% if l.url != "" %}<a href="{{ l.url }}" target="_blank" rel="noopener">▶ Watch</a>{% else %}<span class="soon">Coming soon</span>{% endif %}</td>
</tr>
{% if forloop.last %}</tbody></table>{% endif %}
{% endfor %}
{% endfor %}
</div>

<style>
  table.lectures { width: 100%; }
  table.lectures td:first-child, table.lectures th:first-child { width: 5.5em; text-align: center; }
  table.lectures td:last-child, table.lectures th:last-child { width: 8em; white-space: nowrap; }
  table.lectures a { font-weight: 600; }
  table.lectures .soon { color: var(--ink-soft); font-size: .92em; }
</style>
