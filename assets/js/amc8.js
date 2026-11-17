/* amc8.js -- MCC AMC 8 Mock page (amc8.html).
 * Talks to the Apps Script endpoint (mcc-automation, src/amc8Api.js). This file holds no
 * problems or answers: the endpoint sends a paper only to a signed-in student on the booked
 * day, and keys/solutions/feedback only after that student has finished.
 */
(function () {
  'use strict';
  var ENDPOINT = window.AMC8_ENDPOINT;          // set in amc8.html
  var L = ['A', 'B', 'C', 'D', 'E'];
  var $ = function (id) { return document.getElementById(id); };
  var S = { id: null, pin: null, name: null, paper: null, P: null, cur: 0, state: null, offset: 0, timer: null };

  // ------------------------------------------------------------ network
  function post(body) {
    body.id = S.id; body.pin = S.pin;
    return fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (j.state && j.state.now) S.offset = j.state.now - Date.now(); return j; });
  }
  // Answer/reflection saves: a queue sent in order, retried until the server answers.
  var queue = [], busy = false;
  function save(body) { queue.push(body); flush(); }
  // Everything queued while a request is in flight goes out together as one batch (one round trip).
  function flush() {
    if (busy || !queue.length) return;
    busy = true; saving('Saving\u2026');
    var ops = queue.splice(0, queue.length);
    post({ action: 'batch', paper: S.paper, ops: ops }).then(function (j) {
      busy = false;
      if (j.error === 'locked' && j.state) { S.state = j.state; queue = []; route(); return; }
      saving(queue.length ? 'Saving\u2026' : 'All answers saved');
      flush();
    }, function () { queue = ops.concat(queue); busy = false; saving('Connection problem \u2014 retrying\u2026'); setTimeout(flush, 3000); });
  }
  function saving(t) { var e = $('amc8-saving'); if (e) e.textContent = t; }
  function serverNow() { return Date.now() + S.offset; }

  // ------------------------------------------------------------ helpers
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'cls') e.className = attrs[k]; else if (k.slice(0, 2) === 'on') e[k] = attrs[k]; else e.setAttribute(k, attrs[k]); });
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function show(id) {
    S.view = id;
    ['amc8-signin', 'amc8-list', 'amc8-run', 'amc8-result'].forEach(function (x) { $(x).hidden = x !== id; });
    $('amc8-info').hidden = !(id === 'amc8-signin' || id === 'amc8-list');   // programme information: not during a test or on results
  }
  function msg(t) { $('amc8-msg').innerHTML = t || ''; }
  function typeset(node) { return window.MathJax && MathJax.typesetPromise ? MathJax.typesetPromise([node]) : Promise.resolve(); }
  function mmss(ms) { ms = Math.max(0, ms); var s = Math.floor(ms / 1000); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  var ERR = { signin: 'Student ID or PIN not recognised.', notToday: 'This test opens only on its booked day.', notBooked: 'This test is not booked for you.',
              paper: 'This paper is not ready yet.', server: 'Server error — please try again in a minute.' };

  // ------------------------------------------------------------ sign-in and test list
  function signIn(e) {
    if (e) e.preventDefault();
    S.id = $('amc8-id').value.trim().toUpperCase(); S.pin = $('amc8-pin').value.trim();
    msg('Signing in…');
    post({ action: 'status' }).then(function (j) {
      if (!j.ok) { msg(ERR[j.error] || j.error); return; }
      try { sessionStorage.setItem('amc8', JSON.stringify({ id: S.id, pin: S.pin })); } catch (x) {}
      S.name = j.name; msg(''); renderList(j.tests);
    }, function () { msg('Cannot reach the server. Check your connection and try again.'); });
  }
  function signOut() { try { sessionStorage.removeItem('amc8'); } catch (x) {} location.reload(); }
  function refreshList() { post({ action: 'status' }).then(function (j) { if (j.ok) renderList(j.tests); }); }

  function renderList(tests) {
    // a late status reply must not pull the student out of a test or results they have just opened
    if (S.view === 'amc8-run' || S.view === 'amc8-result') return;
    show('amc8-list');
    var box = $('amc8-tests'); box.innerHTML = '';
    $('amc8-who').textContent = S.name + ' (' + S.id + ')';
    if (!tests.length) { box.innerHTML = '<p>No tests are booked for you.</p>'; return; }
    var t = el('table', { cls: 'amc8-table' }, '<thead><tr><th>Test</th><th>Booked day</th><th>Status</th><th></th></tr></thead>');
    var tb = el('tbody'); t.appendChild(tb);
    tests.forEach(function (x) {
      var tr = el('tr'), status, btn = null;
      if (x.phase === 'done') { status = 'Finished — ' + x.score + '/25'; btn = ['View results', function () { openResult(x.paper); }]; }
      else if (x.phase !== 'ready') { status = 'In progress'; btn = ['Resume', function () { openPaper(x.paper); }]; }
      else if (!x.ready) status = 'Paper not ready yet';
      else if (x.today) { status = 'Open today'; btn = ['Start', function () { confirmStart(x.paper); }]; }
      else if (x.past) status = 'Missed (ask your coordinator to rebook)';
      else status = 'Opens on its day';
      tr.innerHTML = '<td>' + x.paper + '</td><td>' + x.date + '</td><td>' + status + '</td>';
      var td = el('td'); if (btn) td.appendChild(el('button', { cls: 'amc8-btn', onclick: btn[1] }, btn[0])); tr.appendChild(td);
      tb.appendChild(tr);
    });
    box.appendChild(t);
  }

  function confirmStart(paper) {
    var d = $('amc8-confirm'); d.hidden = false;
    $('amc8-confirm-paper').textContent = paper;
    $('amc8-confirm-yes').onclick = function () { d.hidden = true; openPaper(paper); };
    $('amc8-confirm-no').onclick = function () { d.hidden = true; };
  }

  // ------------------------------------------------------------ open / load / orientation
  function openPaper(paper) {
    S.paper = paper; show('amc8-run'); $('amc8-stage').innerHTML = '<p class="amc8-big">Loading the paper…</p>';
    post({ action: 'open', paper: paper }).then(function (j) {
      if (!j.ok) { show('amc8-list'); msg(ERR[j.error] || j.error); return; }
      if (j.phase === 'done') { openResult(paper); return; }
      S.P = j; S.state = j.state; S.cur = 0;
      buildPaper();
      // wait until every formula is typeset and every image loaded, then report "loaded"
      var imgs = Array.prototype.slice.call($('amc8-hidden').querySelectorAll('img')).map(function (im) {
        return im.complete ? Promise.resolve() : new Promise(function (ok) { im.onload = im.onerror = ok; });
      });
      Promise.all([typeset($('amc8-hidden'))].concat(imgs)).then(function () {
        if (j.loaded) { route(); return; }
        post({ action: 'loaded', paper: paper }).then(function (r) { if (r.state) S.state = r.state; route(); });
      });
    }, function () { $('amc8-stage').innerHTML = '<p>Cannot reach the server. <button class="amc8-btn" id="amc8-retry">Try again</button></p>'; $('amc8-retry').onclick = function () { openPaper(paper); }; });
  }

  // All questions are rendered once (hidden), then moved into view one at a time.
  function buildPaper() {
    var h = $('amc8-hidden'); h.innerHTML = '';
    S.P.questions.forEach(function (q, i) {
      var card = el('div', { cls: 'amc8-q', id: 'amc8-q' + i });
      card.appendChild(el('div', { cls: 'amc8-stem' }, '<b>' + q.n + '.</b> ' + q.stem));
      var row = el('div', { cls: 'amc8-choices' });
      q.ch.forEach(function (c, p) {
        row.appendChild(el('button', { cls: 'amc8-choice' + (q.pos === p ? ' on' : ''), 'data-p': p, onclick: function () { choose(i, p); } },
          '<span class="amc8-let">(' + L[p] + ')</span> ' + c));
      });
      card.appendChild(row);
      card.appendChild(el('div', { cls: 'amc8-refl', id: 'amc8-r' + i }));
      h.appendChild(card);
    });
  }

  function route() {
    clearInterval(S.timer);
    var ph = S.state.phase;
    if (ph === 'orientation') return orientation();
    if (ph === 'test') return testView();
    if (ph === 'reflection') return reflView();
    if (ph === 'done') return openResult(S.paper);
  }

  function orientation() {
    var st = $('amc8-stage'); st.innerHTML = $('amc8-orient-tpl').innerHTML;
    var pledge = $('amc8-pledge'), begin = $('amc8-begin');
    pledge.onchange = function () { begin.disabled = !pledge.checked; };
    begin.onclick = function () {
      begin.disabled = true;
      post({ action: 'begin', paper: S.paper }).then(function (r) { if (r.state) S.state = r.state; route(); });
    };
    tick(function () {
      var left = S.state.start - serverNow();
      $('amc8-orient-left').textContent = mmss(left);
      if (left <= 0) { S.state.phase = 'test'; route(); }
    });
  }

  function tick(fn) { fn(); S.timer = setInterval(fn, 500); }

  // ------------------------------------------------------------ test
  function testView() {
    var st = $('amc8-stage'); st.innerHTML = '';
    st.appendChild(el('div', { cls: 'amc8-bar' },
      '<span>' + S.paper + '</span><span id="amc8-clock" class="amc8-clock"></span><span id="amc8-saving">All answers saved</span>' +
      '<button class="amc8-btn" id="amc8-submit">Submit answers</button>'));
    st.appendChild(el('div', { cls: 'amc8-nav', id: 'amc8-nav' }));
    st.appendChild(el('div', { id: 'amc8-slot' }));
    st.appendChild(el('div', { cls: 'amc8-pn' }, '<button class="amc8-btn" id="amc8-prev">← Previous</button> <button class="amc8-btn" id="amc8-next">Next →</button>'));
    $('amc8-prev').onclick = function () { go(S.cur - 1); };
    $('amc8-next').onclick = function () { go(S.cur + 1); };
    $('amc8-submit').onclick = confirmSubmit;
    buildNav(); go(S.cur, true);
    tick(function () {
      var left = S.state.deadline - serverNow();
      $('amc8-clock').textContent = mmss(left);
      $('amc8-clock').classList.toggle('low', left < 5 * 60e3);
      if (left <= 0) { // the server submits automatically at the deadline
        clearInterval(S.timer); setTimeout(function () { reloadState(); }, 2000);
      }
    });
  }
  function buildNav() {
    var nav = $('amc8-nav'); nav.innerHTML = '';
    S.P.questions.forEach(function (q, i) {
      nav.appendChild(el('button', { cls: 'amc8-nb' + (q.pos !== null ? ' done' : '') + (i === S.cur ? ' cur' : ''), onclick: function () { go(i); } }, String(i + 1)));
    });
  }
  function go(i, silent) {
    if (i < 0 || i >= S.P.questions.length) return;
    var slot = $('amc8-slot'), old = slot.firstChild;
    if (old) $('amc8-hidden').appendChild(old);
    slot.appendChild($('amc8-q' + i)); S.cur = i; buildNav();
    if (S.state.phase === 'test' && !silent) save({ action: 'view', paper: S.paper, q: i });
    if (S.state.phase === 'reflection') renderRefl(i);
  }
  function choose(i, p) {
    if (S.state.phase !== 'test') return;
    var q = S.P.questions[i]; q.pos = q.pos === p ? null : p;   // click again to clear
    var btns = $('amc8-q' + i).querySelectorAll('.amc8-choice');
    Array.prototype.forEach.call(btns, function (b) { b.classList.toggle('on', +b.getAttribute('data-p') === q.pos); });
    buildNav();
    save({ action: 'answer', paper: S.paper, q: i, pos: q.pos });
  }
  function confirmSubmit() {
    var blank = S.P.questions.filter(function (q) { return q.pos === null; }).length;
    var d = $('amc8-confirm-submit'); d.hidden = false;
    $('amc8-blank').textContent = blank ? blank + ' question(s) are unanswered. A wrong answer costs nothing, so consider answering them. ' : '';
    $('amc8-sub-yes').onclick = function () {
      d.hidden = true;
      var wait = function () { if (queue.length || busy) return setTimeout(wait, 300);
        post({ action: 'submit', paper: S.paper }).then(function (r) { S.state = r.state; route(); }); };
      wait();
    };
    $('amc8-sub-no').onclick = function () { d.hidden = true; };
  }
  function reloadState() {
    post({ action: 'open', paper: S.paper }).then(function (j) {
      if (j.phase === 'done') return openResult(S.paper);
      if (j.state) { S.state = j.state; route(); }
    });
  }

  // ------------------------------------------------------------ reflection
  function reflView() {
    var st = $('amc8-stage'); st.innerHTML = '';
    st.appendChild(el('div', { cls: 'amc8-bar' },
      '<span>' + S.paper + ' — self-evaluation (optional)</span><span id="amc8-clock" class="amc8-clock"></span><span id="amc8-saving"></span>' +
      '<button class="amc8-btn" id="amc8-finish">Finish and see results</button>'));
    st.appendChild(el('p', { cls: 'amc8-hint' }, 'Your answers are submitted and locked. For each question, click what describes your work — about one minute per question. This does not change your score; it lets the results page explain your mistakes. You can also finish now.'));
    st.appendChild(el('div', { cls: 'amc8-nav', id: 'amc8-nav' }));
    st.appendChild(el('div', { id: 'amc8-slot' }));
    st.appendChild(el('div', { cls: 'amc8-pn' }, '<button class="amc8-btn" id="amc8-prev">← Previous</button> <button class="amc8-btn" id="amc8-next">Next →</button>'));
    $('amc8-prev').onclick = function () { go(S.cur - 1); };
    $('amc8-next').onclick = function () { go(S.cur + 1); };
    $('amc8-finish').onclick = function () {
      var wait = function () { if (queue.length || busy) return setTimeout(wait, 300);
        post({ action: 'finish', paper: S.paper }).then(function () { openResult(S.paper); }); };
      wait();
    };
    S.cur = 0; go(0, true);
    tick(function () {
      var left = S.state.reflEnd - serverNow();
      $('amc8-clock').textContent = mmss(left);
      if (left <= 0) { clearInterval(S.timer); setTimeout(function () { openResult(S.paper); }, 2000); }
    });
  }
  function radio(name, opts, cur, onpick) {
    var d = el('div', { cls: 'amc8-opts' });
    opts.forEach(function (o) {
      d.appendChild(el('button', { cls: 'amc8-opt' + (cur === o[0] ? ' on' : ''), onclick: function () { onpick(cur === o[0] ? null : o[0]); } }, o[1]));
    });
    return d;
  }
  function renderRefl(i) {
    var q = S.P.questions[i], r = q.refl, box = $('amc8-r' + i); box.innerHTML = '';
    var set = function (field, value) { r[field] = value; save({ action: 'reflect', paper: S.paper, q: i, field: field, value: value }); renderRefl(i); };
    box.appendChild(el('p', {}, '<b>Your submitted answer:</b> ' + (q.pos === null ? 'blank' : '(' + L[q.pos] + ')')));
    box.appendChild(el('p', {}, '<b>Second choice</b> (if you hesitated between two):'));
    box.appendChild(radio('second', [0, 1, 2, 3, 4].filter(function (p) { return p !== q.pos; }).map(function (p) { return [p, '(' + L[p] + ')']; }), r.second, function (v) { set('second', v); }));
    box.appendChild(el('p', {}, '<b>How sure were you?</b>'));
    box.appendChild(radio('conf', S.P.conf.map(function (c) { return [c, c]; }), r.conf, function (v) { set('conf', v); }));
    box.appendChild(el('p', {}, '<b>What did you do?</b>'));
    box.appendChild(radio('how', S.P.how.map(function (c) { return [c, c]; }), r.how, function (v) { set('how', v); }));
    if (q.ideas.length) {
      box.appendChild(el('p', {}, '<b>Which idea did you use?</b>'));
      box.appendChild(radio('idea', q.ideas.map(function (c, k) { return [k, c]; }).concat([['none', 'None of these']]), r.idea, function (v) { set('idea', v); }));
    }
    box.appendChild(el('p', {}, '<b>What was hard?</b> (click all that apply)'));
    var d = el('div', { cls: 'amc8-opts' });
    Object.keys(S.P.ticks).forEach(function (k) {
      var on = r.ticks.indexOf(k) >= 0;
      d.appendChild(el('button', { cls: 'amc8-opt' + (on ? ' on' : ''), onclick: function () {
        var t = r.ticks.filter(function (x) { return x !== k; }); if (!on) t.push(k); set('ticks', t); } }, S.P.ticks[k]));
    });
    box.appendChild(d);
    typeset(box);
  }

  // ------------------------------------------------------------ results
  function openResult(paper) {
    clearInterval(S.timer); S.paper = paper; show('amc8-result');
    var out = $('amc8-result-body'); out.innerHTML = '<p>Preparing your results…</p>';
    post({ action: 'result', paper: paper }).then(function (j) {
      if (!j.ok) { if (j.state) { S.state = j.state; show('amc8-run'); openPaper(paper); } else out.innerHTML = '<p>' + (ERR[j.error] || j.error) + '</p>'; return; }
      renderResult(j); typeset(out);
    });
  }
  var CAT = { secure: 'Correct', fragile: 'Correct, not secure', misconception: 'Wrong while sure', wrong: 'Wrong', blank: 'Blank', notReached: 'Not reached' };
  var DOM = { A: 'Algebra', C: 'Combinatorics', G: 'Geometry', N: 'Number Theory' };
  function renderResult(j) {
    var out = $('amc8-result-body'), s = j.summary, h = [];
    h.push('<h2>' + j.paper + ' — ' + S.name + ' (' + S.id + ')</h2>');
    h.push('<p class="amc8-score">Score: <b>' + j.score + ' / ' + j.total + '</b></p>');
    h.push('<h3>By area</h3><table class="amc8-table"><tr><th>Area</th><th>Correct</th></tr>' +
      Object.keys(s.domains).map(function (d) { return '<tr><td>' + DOM[d] + '</td><td>' + s.domains[d].right + ' / ' + s.domains[d].total + '</td></tr>'; }).join('') + '</table>');
    if (s.priority.length) h.push('<p><b>Fix first</b> (wrong although you were sure): question ' + s.priority.join(', ') + '.</p>');
    h.push('<h3>Confidence and results</h3><table class="amc8-table"><tr><th>You said</th><th>Right</th><th>Wrong</th><th>Blank</th></tr>' +
      Object.keys(s.confidence).map(function (c) { var x = s.confidence[c]; return '<tr><td>' + c + '</td><td>' + x.right + '</td><td>' + x.wrong + '</td><td>' + x.blank + '</td></tr>'; }).join('') + '</table>');
    if (s.chapters.length) h.push('<h3>LPS VI chapters to review</h3><p>' + s.chapters.map(function (c) { return 'Chapter ' + c.ch + (c.count > 1 ? ' (' + c.count + ' questions)' : ''); }).join(', ') + '.</p>');
    if (s.topics.length) h.push('<h3>Topics and tools to work on</h3><ul>' + s.topics.map(function (t) { return '<li>Q' + t.n + ' (' + CAT[t.cat] + '): ' + t.topic + ' — ' + t.tool + '</li>'; }).join('') + '</ul>');
    if (s.slow.length) h.push('<p><b>Questions that took more than 3 minutes:</b> ' + s.slow.map(function (x) { return 'Q' + x.n + ' (' + Math.round(x.sec / 60) + ' min)'; }).join(', ') + '.</p>');
    h.push('<h3>Question by question</h3>');
    j.questions.forEach(function (q) {
      var ch = q.ch.map(function (c, p) {
        var l = L[p], cls = l === q.correct ? ' ok' : l === q.yours ? ' bad' : '';
        var tag = (l === q.yours ? ' ← your answer' : '') + (l === q.second ? ' ← your 2nd choice' : '');
        return '<span class="amc8-rc' + cls + '">(' + l + ') ' + c + tag + '</span>';
      }).join(' ');
      h.push('<div class="amc8-rq amc8-' + q.cat + '"><div class="amc8-stem"><b>' + q.n + '.</b> ' + q.stem + '</div><div class="amc8-rchoices">' + ch + '</div>' +
        '<p class="amc8-meta">' + CAT[q.cat] + ' · correct answer (' + q.correct + ') · time ' + Math.round(q.sec / 60 * 10) / 10 + ' min · ' + DOM[q.dom] + ': ' + q.topic + ' · LPS VI Ch. ' + q.lps.join(', ') + '</p>' +
        '<div class="amc8-fb">' + q.feedback.map(function (f) { return '<p>' + f.html + '</p>'; }).join('') + '</div>' +
        '<p><b>Solution.</b> ' + q.sol + '</p><p><b>Analysis.</b> ' + q.ana + '</p></div>');
    });
    out.innerHTML = h.join('');
  }

  // ------------------------------------------------------------ boot
  document.addEventListener('DOMContentLoaded', function () {
    $('amc8-form').onsubmit = signIn;
    $('amc8-out').onclick = signOut;
    $('amc8-back').onclick = function () { show('amc8-list'); refreshList(); };
    $('amc8-print').onclick = function () { window.print(); };
    var saved = null; try { saved = JSON.parse(sessionStorage.getItem('amc8') || 'null'); } catch (x) {}
    if (saved) { $('amc8-id').value = saved.id; $('amc8-pin').value = saved.pin; signIn(); }
    else {
      try { var club = JSON.parse(localStorage.getItem('mcc_student') || 'null'); if (club && club.id) $('amc8-id').value = club.id; } catch (x) {}
      show('amc8-signin');
    }
  });
})();
