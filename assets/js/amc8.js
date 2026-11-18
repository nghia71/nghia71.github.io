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

  // All questions are rendered once (hidden), then shown together on one page.
  function buildPaper() {
    var h = $('amc8-hidden'); clearStage(); h.innerHTML = '';
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
  // Put the given question cards (all, or a subset) on the stage, in order.
  function placeCards(list) {
    var box = el('div', { id: 'amc8-cards' });
    list.forEach(function (i) { box.appendChild($('amc8-q' + i)); });
    $('amc8-stage').appendChild(box);
  }
  // Empty the stage, keeping the question cards (they go back to the hidden store).
  function clearStage() {
    var h = $('amc8-hidden');
    Array.prototype.forEach.call($('amc8-stage').querySelectorAll('.amc8-q'), function (c) { h.appendChild(c); });
    var st = $('amc8-stage'); st.innerHTML = ''; return st;
  }
  function jumpTo(i) { var c = $('amc8-q' + i); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

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

  // ------------------------------------------------------------ test (all 25 questions on one page)
  function testView() {
    var st = clearStage();
    var bar = el('div', { cls: 'amc8-bar' },
      '<span>' + S.paper + '</span><span id="amc8-clock" class="amc8-clock"></span><span id="amc8-saving">All answers saved</span>' +
      '<button class="amc8-btn" id="amc8-submit">Submit answers</button>');
    bar.appendChild(el('div', { cls: 'amc8-nav', id: 'amc8-nav' }));
    st.appendChild(bar);
    placeCards(S.P.questions.map(function (q, i) { return i; }));
    $('amc8-submit').onclick = confirmSubmit;
    buildNav();
    tick(function () {
      var left = S.state.deadline - serverNow();
      $('amc8-clock').textContent = mmss(left);
      $('amc8-clock').classList.toggle('low', left < 5 * 60e3);
      if (left <= 0) { // the server submits automatically at the deadline
        clearInterval(S.timer); setTimeout(function () { reloadState(); }, 2000);
      }
    });
  }
  // Number bar: answered questions are green; a click scrolls to the question.
  function buildNav() {
    var nav = $('amc8-nav'); if (!nav) return; nav.innerHTML = '';
    S.P.questions.forEach(function (q, i) {
      nav.appendChild(el('button', { cls: 'amc8-nb' + (q.pos !== null ? ' done' : ''), onclick: function () { jumpTo(i); } }, String(i + 1)));
    });
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

  // ------------------------------------------------------------ second chance (one page)
  function reflView() {
    if (!S.P.retry) {   // just submitted: fetch the list of wrong and blank questions
      clearStage().appendChild(el('p', { cls: 'amc8-big' }, 'Preparing your second chance\u2026'));
      return post({ action: 'open', paper: S.paper }).then(function (j) {
        if (j.ok && j.retry) { S.P.retry = j.retry; S.state = j.state; reflView(); }
        else if (j.phase === 'done') openResult(S.paper);
      });
    }
    var st = clearStage(), R = S.P.retry;
    st.appendChild(el('div', { cls: 'amc8-bar' },
      '<span>' + S.paper + ' — second chance</span><span id="amc8-clock" class="amc8-clock"></span><span id="amc8-saving"></span>' +
      '<button class="amc8-btn" id="amc8-finish">Finish and see results</button>'));
    st.appendChild(el('p', { cls: 'amc8-hint' }, R.length
      ? 'Your score is fixed: it counts your first answers only. The ' + (S.P.questions.length - R.length) + ' question(s) you got right are not shown. ' +
        'Below are the ' + R.length + ' question(s) that were wrong or blank. Wrong answers are crossed out. Choose again: \u2713 means right, \u2717 wrong. ' +
        'After a second wrong answer you get one hint and one last try. You can always click <em>I don\u2019t know \u2014 stop here</em>. Your score does not change.'
      : 'All your answers are correct. Click <em>Finish and see results</em>.'));
    placeCards(R.map(function (x) { return x.q; }));
    R.forEach(renderRetry);
    $('amc8-finish').onclick = finish;
    reflClock();
    typeset($('amc8-cards'));
  }
  function renderRetry(x) {
    var card = $('amc8-q' + x.q), box = $('amc8-r' + x.q);
    Array.prototype.forEach.call(card.querySelectorAll('.amc8-choice'), function (b) {
      var p = +b.getAttribute('data-p'), used = p === x.first || x.tried.indexOf(p) >= 0;
      var right = x.last === 'right' && p === x.tried[x.tried.length - 1];
      b.classList.remove('on'); b.classList.toggle('amc8-x', used && !right); b.classList.toggle('amc8-ok', right);
      b.querySelector('.amc8-mark') && b.removeChild(b.querySelector('.amc8-mark'));
      if (used) b.appendChild(el('span', { cls: 'amc8-mark' }, right ? ' \u2713' : ' \u2717'));
      b.disabled = x.stage === 'done' || used;
      b.onclick = function () { retry(x, p); };
    });
    box.innerHTML = '';
    if (x.hint) box.appendChild(el('p', { cls: 'amc8-hintbox' }, '<b>Hint.</b> ' + x.hint));
    if (x.stage === 'done' && x.last !== 'right') box.appendChild(el('p', { cls: 'amc8-meta' }, x.stopped ? 'Stopped.' : 'Done.'));
    if (x.stage !== 'done') box.appendChild(el('button', { cls: 'amc8-btn', onclick: function () { retry(x, null); } }, 'I don’t know — stop here'));
    typeset(box);
  }
  function retry(x, p) {
    if (x.busy) return; x.busy = true;
    $('amc8-saving').textContent = 'Checking…';
    post({ action: 'retry', paper: S.paper, q: x.q, pos: p, stop: p === null }).then(function (j) {
      x.busy = false; $('amc8-saving').textContent = '';
      if (j.item) { Object.assign(x, j.item); renderRetry(x); }
      if (!j.ok && j.error === 'locked') { if (j.state) S.state = j.state; openResult(S.paper); }
    }, function () { x.busy = false; $('amc8-saving').textContent = 'Not saved — click again'; });
  }
  function afterSaves(fn) { var w = function () { if (queue.length || busy) return setTimeout(w, 300); fn(); }; w(); }
  function finish() {
    afterSaves(function () { post({ action: 'finish', paper: S.paper }).then(function () { openResult(S.paper); }); });
  }
  function reflClock() {
    tick(function () {
      var left = S.state.reflEnd - serverNow();
      $('amc8-clock').textContent = mmss(left);
      if (left <= 0) { clearInterval(S.timer); setTimeout(function () { openResult(S.paper); }, 2000); }
    });
  }
  function radio(opts, cur, onpick, stack) {
    var d = el('div', { cls: 'amc8-opts' + (stack ? ' amc8-stack' : '') });
    opts.forEach(function (o) {
      d.appendChild(el('button', { cls: 'amc8-opt' + (cur === o[0] ? ' on' : ''), onclick: function () { onpick(cur === o[0] ? null : o[0]); } }, o[1]));
    });
    return d;
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
  var OUT = { first: 'Right at the first try', second: 'Right at the second try', hint: 'Right after the hint',
              fail: 'Not solved', noTry: 'Wrong (second chance not used)', blank: 'Blank' };
  var LAB = { strength: 'Strength', notSure: 'Not sure yet', weakness: 'Weakness' };
  var DOM = { A: 'Algebra', C: 'Combinatorics', G: 'Geometry', N: 'Number Theory' };
  function chapterTable(chs, withPaper) {
    if (!chs.length) return '<p>No questions counted yet.</p>';
    return '<table class="amc8-table"><tr><th>LPS VI chapter</th><th>Level</th><th>Questions</th><th>Practise in the book</th></tr>' +
      chs.map(function (c) {
        return '<tr class="amc8-lv-' + c.label + '"><td>Ch. ' + c.ch + ' ' + c.title + '</td><td><b>' + LAB[c.label] + '</b><br>' + c.first + ' / ' + c.second + ' / ' + c.hint + ' / ' + (c.fail + c.noTry) + '</td><td>' +
          c.qs.map(function (x) { return (withPaper ? x.paper + ' ' : '') + 'Q' + x.n + ': ' + OUT[x.outcome].toLowerCase(); }).join('<br>') +
          '</td><td>' + (c.label === 'strength' ? '' : c.practice.join('; ')) + '</td></tr>';
      }).join('') + '</table>';
  }
  function renderResult(j) {
    var out = $('amc8-result-body'), s = j.summary, c = s.count, h = [];
    h.push('<h2>' + j.paper + ' — ' + S.name + ' (' + S.id + ')</h2>');
    h.push('<div class="amc8-letter"><p class="amc8-key">Colours: <span class="amc8-qid amc8-q-first">right first time</span> ' +
      '<span class="amc8-qid amc8-q-second">right at the second try</span> <span class="amc8-qid amc8-q-hint">right after the hint</span> ' +
      '<span class="amc8-qid amc8-q-fail">not solved</span> <span class="amc8-qid amc8-q-blank">blank</span></p>' + j.letter + '</div>');
    h.push('<details class="amc8-sol"><summary>Details by LPS VI chapter</summary>' +
      '<p class="amc8-meta">Score by area: ' + Object.keys(s.domains).map(function (d) { return DOM[d] + ' ' + s.domains[d].first + '/' + s.domains[d].total; }).join(' \u00b7 ') +
      '. Counts: right at the first try / second try / after the hint / not solved. <b>Strength</b>: all right at the first try; <b>weakness</b>: at least half not solved even with the hint; <b>not sure yet</b>: the rest.</p>' +
      '<h3>This test</h3>' + chapterTable(s.chapters, false) +
      (j.profile && j.profile.tests.length > 1 ? '<h3>All your tests so far</h3>' + chapterTable(j.profile.chapters, true) : '') + '</details>');
    h.push('<h3>Question by question</h3>');
    j.questions.forEach(function (q) {
      var ch = q.ch.map(function (cc, p) {
        var l = L[p], cls = l === q.correct ? ' ok' : (l === q.yours || q.tries.indexOf(l) >= 0) ? ' bad' : '';
        var tag = (l === q.yours ? ' ← your answer' : '') + (q.tries.indexOf(l) >= 0 ? ' ← try ' + (q.tries.indexOf(l) + 2) : '');
        return '<span class="amc8-rc' + cls + '">(' + l + ') ' + cc + tag + '</span>';
      }).join(' ');
      h.push('<div class="amc8-rq amc8-o-' + q.outcome + '" id="amc8-rq' + q.n + '"><div class="amc8-stem"><b>' + q.n + '.</b> ' + q.stem + '</div><div class="amc8-rchoices">' + ch + '</div>' +
        '<p class="amc8-meta">' + OUT[q.outcome] + ' · correct answer (' + q.correct + ') · ' + DOM[q.dom] + ': ' + q.topic +
        (q.book ? ' · LPS VI Ch. ' + q.book.ch + ', ' + q.book.sec : '') + '</p>' +
        (q.feedback ? '<div class="amc8-fb"><p>' + q.feedback + '</p></div>' : '') +
        '<details class="amc8-sol"' + (q.outcome === 'first' ? '' : ' open') + '><summary>Analysis and solution</summary>' +
        '<p><b>Analysis.</b> ' + q.ana + '</p><p><b>Solution.</b> ' + q.sol + '</p></details></div>');
    });
    out.innerHTML = h.join('');
    // a question chip in the letter jumps to that question
    Array.prototype.forEach.call(out.querySelectorAll('.amc8-letter .amc8-qid'), function (c) {
      var m = /^Q(\d+)$/.exec(c.textContent); if (!m) return;
      c.onclick = function () { var d = $('amc8-rq' + m[1]); if (d) d.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    });
  }

  // ------------------------------------------------------------ boot
  document.addEventListener('DOMContentLoaded', function () {
    $('amc8-form').onsubmit = signIn;
    $('amc8-out').onclick = signOut;
    $('amc8-back').onclick = function () { show('amc8-list'); refreshList(); };
    $('amc8-print').onclick = function () {
      Array.prototype.forEach.call(document.querySelectorAll('details.amc8-sol'), function (d) { d.open = true; });
      window.print();
    };
    var saved = null; try { saved = JSON.parse(sessionStorage.getItem('amc8') || 'null'); } catch (x) {}
    if (saved) { $('amc8-id').value = saved.id; $('amc8-pin').value = saved.pin; signIn(); }
    else {
      try { var club = JSON.parse(localStorage.getItem('mcc_student') || 'null'); if (club && club.id) $('amc8-id').value = club.id; } catch (x) {}
      show('amc8-signin');
    }
  });
})();
