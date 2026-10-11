// MCC Q&A page, read live from the "Published" tab of the MCC Q&A sheet.
// Plain static JS (no YAML front matter, so Jekyll copies it untouched).
//
// Publishing = approving: coordinators draft questions on the sheet's Q&A
// tab; when Mr. Nghia or Ms. Minh Thu approves a row, the sheet copies it to
// the Published tab, and this page shows it the next time it is opened. Draft
// and changed-but-not-yet-approved rows are never read, so a careless edit on
// the sheet cannot change this page.
//
// The page element: <div id="mcc-qa" data-sheet="SPREADSHEET_ID"></div>
// Exposes window.MCCQA = { build, render, highlight, siteLink } for testing.

(function (global) {
  "use strict";

  var LANG_KEY = "mcc-qa-lang";

  function gviz(id, sheet, tq) {
    var url = "https://docs.google.com/spreadsheets/d/" + id +
      "/gviz/tq?tqx=out:json&headers=1&sheet=" + encodeURIComponent(sheet) +
      (tq ? "&tq=" + encodeURIComponent(tq) : "");
    return fetch(url, { credentials: "omit" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    }).then(function (text) {
      var json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
      if (json.status !== "ok") throw new Error("query failed");
      return json.table;
    });
  }

  // gviz table -> array of {label: value} objects
  function objects(table) {
    var labels = table.cols.map(function (c) { return (c.label || "").trim(); });
    return (table.rows || []).map(function (row) {
      var o = {};
      labels.forEach(function (l, i) {
        var c = row.c[i];
        o[l] = c ? (c.v === null || c.v === undefined ? "" : c.v) : "";
      });
      return o;
    });
  }

  function parseDate(v) {
    var m = /^Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+),(\d+))?\)$/.exec(String(v || ""));
    return m ? new Date(+m[1], +m[2], +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)) : null;
  }

  function txt(v) { return v === null || v === undefined ? "" : String(v).trim(); }
  function terms(s) { return txt(s).split(/[,;\n]/).map(function (t) { return t.trim(); }).filter(Boolean); }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // Website links are written as on the site sources ("./tests.md#x"); the
  // built site serves them without ".md".
  function siteLink(link) {
    var l = txt(link);
    if (!l) return "";
    if (/^https:\/\//.test(l)) return l;
    if (!/^(\.\/|\/)/.test(l)) return "";
    return l.replace(/\.md(?=#|$)/, "");
  }

  // Escape text and wrap the key terms (case-insensitive, longest first,
  // never overlapping) in <mark>.
  function highlight(text, list, colours) {
    var t = String(text || ""), lower = t.toLowerCase(), taken = [];
    list.slice().sort(function (a, b) { return b.length - a.length; }).forEach(function (term) {
      var needle = term.toLowerCase(), from = 0, i;
      if (!needle) return;
      while ((i = lower.indexOf(needle, from)) !== -1) {
        var end = i + needle.length;
        if (!taken.some(function (r) { return i < r[1] && end > r[0]; })) taken.push([i, end]);
        from = i + 1;
      }
    });
    taken.sort(function (a, b) { return a[0] - b[0]; });
    var out = "", pos = 0;
    var style = colours ? ' style="background:' + esc(colours[0]) + ";color:" + esc(colours[1]) + '"' : "";
    taken.forEach(function (r) {
      out += esc(t.slice(pos, r[0])) + '<mark class="qa-term"' + style + ">" + esc(t.slice(r[0], r[1])) + "</mark>";
      pos = r[1];
    });
    return out + esc(t.slice(pos));
  }

  // Published rows + topics -> [{topic, vi, bg, fg, items: [...]}] in topic order.
  function build(topicRows, pubRows) {
    var topics = {}, order = [];
    topicRows.forEach(function (t) {
      var name = txt(t["Topic (English)"]);
      if (!name) return;
      topics[name] = { topic: name, vi: txt(t["Topic (Tiếng Việt)"]) || name,
        bg: txt(t["Background"]) || "#fbe9c2", fg: txt(t["Text colour"]) || "#8c2600",
        order: Number(t["Order"]) || 999, items: [] };
      order.push(name);
    });
    var latest = null;
    pubRows.forEach(function (r) {
      var id = txt(r["ID"]), qEn = txt(r["Question (English)"]), aEn = txt(r["Answer (English)"]);
      if (!id || !qEn || !aEn) return;
      var name = txt(r["Topic"]);
      if (!topics[name]) {
        topics[name] = { topic: name || "Other", vi: name || "Khác", bg: "#fbe9c2", fg: "#8c2600", order: 1000, items: [] };
        order.push(name);
      }
      var when = parseDate(r["Approved at"]);
      if (when && (!latest || when > latest)) latest = when;
      topics[name].items.push({
        id: id, audience: txt(r["Audience"]) || "Everyone",
        en: { q: qEn, a: aEn, terms: terms(r["Key terms (English)"]) },
        vi: { q: txt(r["Question (Tiếng Việt)"]), a: txt(r["Answer (Tiếng Việt)"]), terms: terms(r["Key terms (Tiếng Việt)"]) },
        link: siteLink(r["Link"])
      });
    });
    var groups = order.map(function (n) { return topics[n]; })
      .filter(function (g) { return g.items.length; })
      .sort(function (a, b) { return a.order - b.order; });
    groups.forEach(function (g) {
      g.items.sort(function (a, b) { return a.id.localeCompare(b.id, undefined, { numeric: true }); });
    });
    return { groups: groups, latest: latest };
  }

  var WORDS = {
    en: { all: "All", parents: "Parents & students", coords: "Coordinators", search: "Search the questions…",
      more: "More information", none: "No question matches your search.", updated: "Last updated",
      count: function (n) { return n + (n === 1 ? " question" : " questions"); } },
    vi: { all: "Tất cả", parents: "Phụ huynh & học sinh", coords: "Coordinator", search: "Tìm trong các câu hỏi…",
      more: "Xem thêm", none: "Không có câu hỏi nào khớp.", updated: "Cập nhật lần cuối",
      count: function (n) { return n + " câu hỏi"; } }
  };

  function itemHtml(it, g, lang) {
    var L = lang === "vi" && it.vi.q && it.vi.a ? it.vi : it.en;
    var w = WORDS[lang];
    var col = [g.bg, g.fg];
    return '<details class="qa-item" id="' + esc(it.id) + '" data-audience="' + esc(it.audience) + '">' +
      '<summary>' + highlight(L.q, L.terms, col) +
      (it.audience !== "Everyone" ? ' <span class="qa-aud">' + esc(it.audience === "Coordinators" ? w.coords : w.parents) + "</span>" : "") +
      "</summary>" +
      '<div class="qa-answer"><p>' + highlight(L.a, L.terms, col).replace(/\n/g, "<br>") + "</p>" +
      (it.link ? '<p class="qa-more"><a href="' + esc(it.link) + '">' + esc(w.more) + " &rarr;</a></p>" : "") +
      "</div></details>";
  }

  function render(data, lang) {
    var w = WORDS[lang];
    var index = data.groups.map(function (g) {
      return '<a class="qa-chip" href="#qa-' + esc(slug(g.topic)) + '" style="background:' + esc(g.bg) + ";color:" + esc(g.fg) + '">' +
        esc(lang === "vi" ? g.vi : g.topic) + "</a>";
    }).join("");
    var body = data.groups.map(function (g) {
      return '<section class="qa-topic" data-topic="' + esc(g.topic) + '">' +
        '<h2 id="qa-' + esc(slug(g.topic)) + '" style="border-left-color:' + esc(g.fg) + '"><span class="qa-dot" style="background:' + esc(g.bg) + ";border-color:" + esc(g.fg) + '"></span>' +
        esc(lang === "vi" ? g.vi : g.topic) + "</h2>" +
        g.items.map(function (it) { return itemHtml(it, g, lang); }).join("") + "</section>";
    }).join("");
    return '<div class="qa-index">' + index + "</div>" + body +
      '<p class="qa-empty" hidden>' + esc(w.none) + "</p>";
  }

  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  function getLang() { try { return localStorage.getItem(LANG_KEY) === "vi" ? "vi" : "en"; } catch (e) { return "en"; } }
  function setLang(l) { try { localStorage.setItem(LANG_KEY, l); } catch (e) { /* private mode */ } }

  function mount(el) {
    var id = (el.getAttribute("data-sheet") || "").trim();
    var sheetUrl = "https://docs.google.com/spreadsheets/d/" + id + "/edit?usp=sharing";
    if (!id || /\s|HERE/.test(id)) { el.innerHTML = '<p class="ls-status">The Q&amp;A is not connected yet.</p>'; return; }
    el.innerHTML = '<p class="ls-status">Loading the questions&hellip;</p>';
    Promise.all([gviz(id, "Topics"), gviz(id, "Published")]).then(function (t) {
      var data = build(objects(t[0]), objects(t[1]));
      var lang = getLang(), audience = "all", query = "";
      el.innerHTML =
        '<div class="qa-controls">' +
        '<div class="qa-lang" role="group" aria-label="Language">' +
        '<button type="button" data-lang="en">English</button><button type="button" data-lang="vi">Tiếng Việt</button></div>' +
        '<select class="qa-audience" aria-label="Audience"></select>' +
        '<input class="qa-search" type="search">' +
        '<span class="qa-count"></span></div>' +
        '<div class="qa-body"></div>' +
        '<p class="ls-status qa-foot"></p>';
      var bodyEl = el.querySelector(".qa-body"), sel = el.querySelector(".qa-audience"),
        search = el.querySelector(".qa-search"), count = el.querySelector(".qa-count"), foot = el.querySelector(".qa-foot");

      function apply() {
        var q = query.toLowerCase(), shown = 0;
        bodyEl.querySelectorAll(".qa-topic").forEach(function (sec) {
          var any = 0;
          sec.querySelectorAll(".qa-item").forEach(function (it) {
            var aud = it.getAttribute("data-audience");
            var okAud = audience === "all" || aud === "Everyone" || aud === audience;
            var okText = !q || it.textContent.toLowerCase().indexOf(q) !== -1;
            it.hidden = !(okAud && okText);
            if (!it.hidden) { any++; if (q) it.open = true; }
          });
          sec.hidden = !any; shown += any;
        });
        bodyEl.querySelector(".qa-empty").hidden = shown !== 0;
        count.textContent = WORDS[lang].count(shown);
      }

      function draw() {
        var w = WORDS[lang];
        el.querySelectorAll(".qa-lang button").forEach(function (b) {
          b.className = b.getAttribute("data-lang") === lang ? "active" : "";
          b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
        });
        sel.innerHTML = [["all", w.all], ["Parents & students", w.parents], ["Coordinators", w.coords]].map(function (o) {
          return '<option value="' + esc(o[0]) + '"' + (o[0] === audience ? " selected" : "") + ">" + esc(o[1]) + "</option>";
        }).join("");
        search.placeholder = w.search;
        bodyEl.innerHTML = render(data, lang);
        foot.innerHTML = (data.latest ? esc(w.updated) + ": " + esc(data.latest.toLocaleDateString()) + ". " : "") +
          'Source: the <a href="' + esc(sheetUrl) + '">MCC Q&amp;A sheet</a>.';
        apply();
        openHash();
      }

      el.querySelectorAll(".qa-lang button").forEach(function (b) {
        b.addEventListener("click", function () { lang = b.getAttribute("data-lang"); setLang(lang); draw(); });
      });
      sel.addEventListener("change", function () { audience = sel.value; apply(); });
      search.addEventListener("input", function () { query = search.value.trim(); apply(); });
      draw();
    }).catch(function (err) {
      el.innerHTML = '<p class="ls-status">The questions could not be loaded right now (' + esc(err.message) +
        '). You can read them on the <a href="' + esc(sheetUrl) + '">MCC Q&amp;A sheet</a> (Published tab).</p>';
    });
  }

  // A link to page#Q-0012 opens that question.
  function openHash() {
    var h = decodeURIComponent((location.hash || "").slice(1));
    if (!/^Q-\d+$/.test(h)) return;
    var d = document.getElementById(h);
    if (d) { d.open = true; d.scrollIntoView(); }
  }

  global.MCCQA = { build: build, render: render, highlight: highlight, siteLink: siteLink, objects: objects };

  if (typeof document !== "undefined") {
    var start = function () { var el = document.getElementById("mcc-qa"); if (el) mount(el); };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
    window.addEventListener("hashchange", openHash);
  }
})(typeof window !== "undefined" ? window : this);
