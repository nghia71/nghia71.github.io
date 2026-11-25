---
title: Purple Comet training — mocks
permalink: /purple-comet-training/mocks
---

# Purple Comet training: the mocks

Six mocks, every two weeks on a Sunday, from 8:00 AM US Pacific time: 60 minutes for Middle School, 90 minutes for High School. Rules, times in other cities and how to sign up are on the [Purple Comet training](/purple-comet-training) page.

**On the day**, the links to open the paper and to submit your team's answers appear in the table, shortly before 8:00 AM Pacific. **After the mock**, the table shows which Purple Comet year was used, with the paper, the answer key and the solutions.

<div class="ls-wrap" markdown="0">
<table class="ls-table">
<thead><tr><th class="ls-num">Mock</th><th>Date</th><th>Middle School</th><th>High School</th><th>Solutions</th></tr></thead>
<tbody>
{% for m in site.data.pc_training.mocks %}<tr>
<td class="ls-num">{{ m.n }}</td>
<td>{{ m.when_en }}{% if m.year %}<br><small>Purple Comet {{ m.year }}</small>{% endif %}{% if m.note_en != "" %}<br><small>{{ m.note_en }}</small>{% endif %}</td>
<td>{% if m.start_ms %}<a href="{{ m.start_ms }}">Open the paper</a> · <a href="{{ m.submit_ms }}">Submit answers</a>{% elsif m.paper_ms %}<a href="{{ m.paper_ms }}">Paper</a>{% if m.key_ms %} · <a href="{{ m.key_ms }}">Answer key</a>{% endif %}{% else %}—{% endif %}</td>
<td>{% if m.start_hs %}<a href="{{ m.start_hs }}">Open the paper</a> · <a href="{{ m.submit_hs }}">Submit answers</a>{% elsif m.paper_hs %}<a href="{{ m.paper_hs }}">Paper</a>{% if m.key_hs %} · <a href="{{ m.key_hs }}">Answer key</a>{% endif %}{% else %}—{% endif %}</td>
<td>{% if m.solutions %}<a href="{{ m.solutions }}">Solutions</a>{% else %}—{% endif %}</td>
</tr>
{% endfor %}</tbody>
</table>
</div>

<details class="vn" markdown="1">
<summary>🇻🇳 Tiếng Việt (click to expand)</summary>

Sáu buổi thi thử, hai tuần một lần vào Chủ nhật, bắt đầu 8:00 sáng giờ Pacific: MS 60 phút, HS 90 phút. Quy định, giờ ở các nơi và cách đăng ký nằm ở trang [Luyện thi Purple Comet](/purple-comet-training). **Trong ngày thi**, đường dẫn mở đề và nộp đáp số của đội hiện trong bảng trên, ngay trước 8:00 sáng giờ Pacific. **Sau buổi thi**, bảng ghi năm đề Purple Comet đã dùng, kèm đề, đáp án và lời giải.

</details>
