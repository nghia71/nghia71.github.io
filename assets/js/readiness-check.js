// Readiness check (readiness.md): four problems per level from the retired
// summer entrance sets (lps67/yearbook/s1e1_t*.tex, s1e2_t*.tex), a 60-minute
// timer, answer boxes checked in the browser, and a suggested starting point.
// Nothing is sent anywhere and nothing is stored.
//
// Sources (Nghia, 11 Nov 2026: "Use the summer set"):
//   T1: s1e1 P1, s1e1 P4, s1e2 P3, s1e2 P5      T2: s1e1 P2, s1e2 P3, s1e2 P4, s1e2 P6
//   T3: s1e1 P1, s1e1 P4, s1e2 P4, s1e1 P5      T4: s1e1 P1, s1e1 P2, s1e1 P3, s1e1 P5
// Every answer was checked by code (34 checks); see
// claude/readiness-check-page-2026-11-11.md in the project.
//
// Answers are stored base64-encoded only so they are not readable at a glance
// in the page source; this is a self-check, not a test.
(function () {
  "use strict";

  // kind: "int" exact integer; "num" number or fraction a/b, within 1e-3;
  //       "pair" two integers in either order.
  // pts: points for that box (the paper's part points, split where a part
  //       has several boxes). Parts that ask to show or explain have no box.
  var LEVELS = {
    1: [
      { title: "Problem 1", pts: 10, text:
        "A traveler crosses three toll bridges, one after another. Crossing any bridge doubles the number of coins in the traveler's pouch; immediately afterward, the traveler pays a toll of \\(24\\) coins. After paying the toll at the third bridge, the traveler's pouch is completely empty. How many coins did the traveler have before crossing the first bridge?",
        parts: [{ boxes: [{ label: "coins", kind: "int", pts: 10, a: "MjE=" }] }] },
      { title: "Problem 2", pts: 15, text:
        "On a coordinate grid, a rectangle has corners at \\((0,0)\\), \\((6,0)\\), \\((6,5)\\), and \\((0,5)\\). A triangle is drawn inside it with vertices \\(A=(1,3)\\), \\(B=(5,1)\\), \\(C=(4,4)\\).",
        parts: [
          { text: "(a) Find the area of the smallest rectangle, with sides parallel to the grid lines, that completely contains triangle \\(ABC\\). [4 pts]",
            boxes: [{ label: "area", kind: "int", pts: 4, a: "MTI=" }] },
          { text: "(b) Find the area of triangle \\(ABC\\), and hence find what fraction of the large rectangle's area is covered by the triangle. [11 pts]",
            boxes: [{ label: "area of ABC", kind: "num", pts: 5, a: "NQ==" },
                    { label: "fraction (e.g. 2/7)", kind: "num", pts: 6, a: "MS82" }] }
        ] },
      { title: "Problem 3", pts: 15, text:
        "Tyler is tiling the floor of a 12-foot by 16-foot rectangular room. He plans to place 1-foot by 1-foot square tiles to form a border, one tile wide, running along all four edges of the room. He will then fill in the rest of the floor using 2-foot by 2-foot square tiles.",
        parts: [
          { text: "(a) What are the dimensions of the inner rectangle that will be covered with the 2-by-2 tiles? [7 pts]",
            boxes: [{ label: "feet by feet", kind: "pair", pts: 7, a: "MTAsMTQ=" }] },
          { text: "(b) How many tiles in total (both the 1-by-1 border tiles and the 2-by-2 interior tiles together) will Tyler use to cover the whole floor? [8 pts]",
            boxes: [{ label: "tiles", kind: "int", pts: 8, a: "ODc=" }] }
        ] },
      { title: "Problem 4", pts: 25, text:
        "A survey asks each of \\(425\\) people which of three activities, A, B and C, they have tried. In total, \\(351\\) people tried activity A, \\(71\\) tried activity B, and \\(203\\) tried activity C. Of these people, \\(199\\) tried more than one activity, and \\(8\\) tried none of the three activities at all.",
        parts: [
          { text: "(a) How many of the \\(425\\) people tried at least one of the three activities? [5 pts]",
            boxes: [{ label: "people", kind: "int", pts: 5, a: "NDE3" }] },
          { text: "(b) If \\(a\\) people tried exactly two activities and \\(t\\) people tried all three activities, write the equation relating \\(a\\), \\(t\\), and the \\(199\\) figure above. [3 pts]",
            note: "Write this one on paper; it is not checked here." },
          { text: "(c) Find \\(t\\), the number of people who tried all three activities. [17 pts]",
            boxes: [{ label: "t", kind: "int", pts: 17, a: "OQ==" }] }
        ] }
    ],
    2: [
      { title: "Problem 1", pts: 10, text:
        "A code is a sequence of four digits, each chosen from \\(1\\) through \\(9\\) (the digit \\(0\\) is not allowed). The first two digits, read together, must form a two-digit multiple of eleven; so must the last two digits. Finally, the sum of all four digits must itself be a multiple of eleven. How many codes satisfy all three conditions?",
        parts: [{ boxes: [{ label: "codes", kind: "int", pts: 10, a: "OA==" }] }] },
      { title: "Problem 2", pts: 15, text:
        "In right triangle \\(ABC\\), the right angle is at \\(B\\). Point \\(D\\) lies on segment \\(AB\\) with \\(DB=10\\). Given that \\(\\angle CDB=60^\\circ\\) and \\(\\angle ACD=30^\\circ\\),",
        parts: [
          { text: "(a) Find the length of \\(CD\\). [6 pts]", boxes: [{ label: "CD", kind: "num", pts: 6, a: "MjA=" }] },
          { text: "(b) Find the length of \\(AD\\). [9 pts]", boxes: [{ label: "AD", kind: "num", pts: 9, a: "MjA=" }] }
        ] },
      { title: "Problem 3", pts: 15, text:
        "A trench has two rows of pits, one row along each side, with \\(10\\) pits in each row. A total of \\(7\\) diggers are to be placed into pits so that, within each row, no two diggers are in adjacent pits (a digger in one row may be next to a digger in the other row; only pits in the <em>same</em> row count as adjacent).",
        parts: [
          { text: "(a) In one row of \\(10\\) pits, find the number of ways to place \\(k\\) diggers with no two adjacent, for each \\(k=0,1,2,3,4,5\\). [9 pts]",
            boxes: [{ label: "k=0", kind: "int", pts: 1.5, a: "MQ==", small: true },
                    { label: "k=1", kind: "int", pts: 1.5, a: "MTA=", small: true },
                    { label: "k=2", kind: "int", pts: 1.5, a: "MzY=", small: true },
                    { label: "k=3", kind: "int", pts: 1.5, a: "NTY=", small: true },
                    { label: "k=4", kind: "int", pts: 1.5, a: "MzU=", small: true },
                    { label: "k=5", kind: "int", pts: 1.5, a: "Ng==", small: true }] },
          { text: "(b) Using part (a), find the number of ways to place all \\(7\\) diggers across the two rows, following the rule above. [6 pts]",
            boxes: [{ label: "ways", kind: "int", pts: 6, a: "NDM1Mg==" }] }
        ] },
      { title: "Problem 4", pts: 25, text:
        "A two-digit number is called <em>lucky</em> if it is evenly divisible by the sum of its own digits. (For example, \\(12\\) is lucky since \\(1+2=3\\) divides \\(12\\); but \\(13\\) is not, since \\(1+3=4\\) does not divide \\(13\\).) How many lucky two-digit numbers are there?",
        parts: [
          { text: "(a) Write the number as \\(\\overline{tu}=10t+u\\), with tens digit \\(t\\in\\{1,\\dots,9\\}\\) and units digit \\(u\\in\\{0,\\dots,9\\}\\). Show that \\((t+u)\\mid(10t+u)\\) if and only if \\((t+u)\\mid 9t\\). [7 pts]",
            note: "Write this one on paper; it is not checked here." },
          { text: "(b) Explain why, for a fixed tens digit \\(t\\), this restricts \\(t+u\\) to being one of the (finitely many) divisors of \\(9t\\) that also lie in the range \\([t, t+9]\\). [3 pts]",
            note: "Write this one on paper; it is not checked here." },
          { text: "(c) Using parts (a) and (b), check each tens digit \\(t=1,\\dots,9\\) and count the total number of lucky two-digit numbers. [15 pts]",
            boxes: [{ label: "lucky numbers", kind: "int", pts: 15, a: "MjM=" }] }
        ] }
    ],
    3: [
      { title: "Problem 1", pts: 10, text:
        "Two positive integers \\(x\\) and \\(y\\) satisfy \\( xy+x+y=71\\) and \\(x^2y+xy^2=880\\). Find \\(x^2+y^2\\).",
        parts: [{ boxes: [{ label: "x² + y²", kind: "int", pts: 10, a: "MTQ2" }] }] },
      { title: "Problem 2", pts: 15, text:
        "Let \\(a\\) and \\(b\\) be real numbers with \\(a>b\\), satisfying \\[ 2^a + 2^b = 75 \\qquad \\text{and} \\qquad 2^{-a} + 2^{-b} = \\tfrac{1}{12}. \\]",
        parts: [
          { text: "(a) Let \\(x=2^a\\) and \\(y=2^b\\). Find \\(xy\\). [6 pts]", boxes: [{ label: "xy", kind: "num", pts: 6, a: "OTAw" }] },
          { text: "(b) Solve for \\(x\\) and \\(y\\), then compute \\(2^{a-b}\\). [9 pts]", boxes: [{ label: "2^(a−b)", kind: "num", pts: 9, a: "NA==" }] }
        ] },
      { title: "Problem 3", pts: 15, text:
        "Let \\(ABC\\) be a triangle with \\(\\angle A=60^\\circ\\). Points \\(K\\), \\(M\\), \\(N\\) lie on sides \\(AB\\), \\(BC\\), \\(CA\\) respectively, so that \\(BK=KM=MN=NC\\). Given that \\(AN=2\\,AK\\),",
        parts: [
          { text: "(a) Find \\(\\angle KMN\\). [4 pts]", boxes: [{ label: "degrees", kind: "num", pts: 4, a: "NjA=" }] },
          { text: "(b) Find \\(\\angle B\\) and \\(\\angle C\\). [11 pts]",
            boxes: [{ label: "∠B (degrees)", kind: "num", pts: 5.5, a: "NzU=" },
                    { label: "∠C (degrees)", kind: "num", pts: 5.5, a: "NDU=" }] }
        ] },
      { title: "Problem 4", pts: 25, text:
        "Nine tokens are arranged in a row: three Copper tokens, three Iron tokens, and three Silver tokens (tokens of the same type are indistinguishable from one another). Call an arrangement <em>bad</em> if some three <em>consecutive</em> tokens are all the same type.",
        parts: [
          { text: "(a) How many distinct arrangements of the nine tokens are there, with no restriction? [4 pts]",
            boxes: [{ label: "arrangements", kind: "int", pts: 4, a: "MTY4MA==" }] },
          { text: "(b) How many of those arrangements have all three Copper tokens consecutive (forming a single block), regardless of how the rest are arranged? [5 pts]",
            boxes: [{ label: "arrangements", kind: "int", pts: 5, a: "MTQw" }] },
          { text: "(c) Find the number of arrangements that are <em>not</em> bad. [16 pts]",
            boxes: [{ label: "arrangements", kind: "int", pts: 16, a: "MTMxNA==" }] }
        ] }
    ],
    4: [
      { title: "Problem 1", pts: 10, text:
        "Positive integers \\(a\\) and \\(b\\) satisfy \\(a^5=b^4\\), and positive integers \\(c\\) and \\(d\\) satisfy \\(c^3=d^2\\). Given that \\(c-a=19\\), find \\(d-b\\).",
        parts: [{ boxes: [{ label: "d − b", kind: "int", pts: 10, a: "NzU3" }] }] },
      { title: "Problem 2", pts: 10, text:
        "Find the remainder when \\(2^{1990}\\) is divided by \\(1990\\).",
        parts: [{ boxes: [{ label: "remainder", kind: "int", pts: 10, a: "MTAyNA==" }] }] },
      { title: "Problem 3", pts: 15, text:
        "For each integer \\(0\\le n\\le11\\), there are exactly three identical weights weighing \\(2^n\\) grams. Two piles of weights are considered different if they contain different numbers of weights of some size.",
        parts: [
          { text: "(a) Suppose only the weights weighing \\(1\\), \\(2\\), and \\(4\\) grams (three of each) are available. In how many ways can a pile weighing \\(6\\) grams be formed? [4 pts]",
            boxes: [{ label: "ways", kind: "int", pts: 4, a: "NA==" }] },
          { text: "(b) Using all twelve weights \\(2^0,2^1,\\dots,2^{11}\\) (three of each), in how many ways can a pile weighing \\(2021\\) grams be formed? [11 pts]",
            boxes: [{ label: "ways", kind: "int", pts: 11, a: "MTAxMQ==" }] }
        ] },
      { title: "Problem 4", pts: 25, text:
        "Let \\(ABCD\\) be a convex quadrilateral with \\(\\angle DAC=36^\\circ\\), \\(\\angle BDC=36^\\circ\\), \\(\\angle CBD=18^\\circ\\), and \\(\\angle BAC=72^\\circ\\). The diagonals \\(AC\\) and \\(BD\\) intersect at point \\(P\\).",
        parts: [
          { text: "(a) Prove that \\(AB=AC=AD\\). [12 pts]", note: "Write this one on paper; it is not checked here." },
          { text: "(b) Find \\(\\angle ACB\\) and \\(\\angle ADC\\). [3 pts]",
            boxes: [{ label: "∠ACB (degrees)", kind: "num", pts: 1.5, a: "NTQ=" },
                    { label: "∠ADC (degrees)", kind: "num", pts: 1.5, a: "NzI=" }] },
          { text: "(c) Find \\(\\angle APD\\). [10 pts]", boxes: [{ label: "∠APD (degrees)", kind: "num", pts: 10, a: "MTA4" }] }
        ] }
    ]
  };

  // Advice by share of the checkable points. Placement itself is by the
  // two-day entrance test (51/100), so this only suggests where to start.
  function advice(level, pct) {
    var reg = ' <a href="./register">Register</a>; the two-day entrance test then confirms the level.';
    if (pct >= 60) return "<strong>A good fit for T" + level + ".</strong> You solved most of the checked parts." + reg;
    if (pct >= 35) return "<strong>Close.</strong> T" + level + " is within reach" +
      (level > 1 ? ", but try the T" + (level - 1) + " check too and start where you feel more at home." : ". Keep practising, and try again in a few weeks.") + reg;
    if (level > 1) return "<strong>Start lower.</strong> Try the T" + (level - 1) + " check: that is probably the better place to begin.";
    return "<strong>Not yet.</strong> T1 assumes a student has worked through Beast Academy or the AoPS Introductory series. " +
      'Start there, or with <a href="./books"><em>100 Math Problems for Absolute Beginners</em></a>, then come back to this check.';
  }

  function dec(s) { try { return decodeURIComponent(escape(atob(s))); } catch (e) { return ""; } }

  function parseNum(s) {
    s = String(s || "").replace(/[°\s]|deg(rees)?/gi, "").replace(/,/g, ".");
    var m = /^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/.exec(s);
    if (m) return Number(m[2]) ? Number(m[1]) / Number(m[2]) : NaN;
    return s === "" ? NaN : Number(s);
  }

  function correct(box, value) {
    var want = dec(box.a);
    if (box.kind === "pair") {
      var got = String(value || "").match(/\d+/g) || [];
      var exp = want.split(",");
      return got.length === 2 && ((got[0] === exp[0] && got[1] === exp[1]) || (got[0] === exp[1] && got[1] === exp[0]));
    }
    var v = parseNum(value), w = parseNum(want);
    if (isNaN(v)) return false;
    if (box.kind === "int") return v === w;
    return Math.abs(v - w) < 1e-3;
  }

  function shownAnswer(box) {
    var w = dec(box.a);
    return box.kind === "pair" ? w.replace(",", " by ") : w;
  }

  var app, level = 1, timerId = null;

  function draw() {
    var probs = LEVELS[level];
    var html = probs.map(function (p, i) {
      var parts = p.parts.map(function (part, j) {
        var h = part.text ? '<div class="rc-part rc-text">' + part.text + "</div>" : "";
        if (part.note) h += '<div class="rc-nocheck">' + part.note + "</div>";
        if (part.boxes) {
          h += '<div class="rc-ans">' + part.boxes.map(function (b, k) {
            var id = "rc-" + i + "-" + j + "-" + k;
            return '<label for="' + id + '">' + b.label + '</label><input type="text" inputmode="decimal" autocomplete="off" id="' + id + '"' +
              (b.small ? ' class="small"' : "") + '><span class="mark" id="' + id + '-m"></span>';
          }).join("") + "</div>";
        }
        return h;
      }).join("");
      return '<div class="rc-problem"><h3>' + p.title + ' <span class="pts">(' + p.pts + " pts)</span></h3>" +
        '<div class="rc-text">' + p.text + "</div>" + parts + "</div>";
    }).join("");
    app.querySelector("#rc-problems").innerHTML = html;
    var res = app.querySelector("#rc-result"); res.style.display = "none"; res.innerHTML = "";
    Array.prototype.forEach.call(app.querySelectorAll(".rc-levels button"), function (b) {
      b.classList.toggle("active", Number(b.getAttribute("data-level")) === level);
    });
    if (typeof renderMathInElement === "function") {
      renderMathInElement(app.querySelector("#rc-problems"), {
        delimiters: [{ left: "\\[", right: "\\]", display: true }, { left: "\\(", right: "\\)", display: false }]
      });
    }
  }

  function eachBox(fn) {
    LEVELS[level].forEach(function (p, i) {
      p.parts.forEach(function (part, j) {
        (part.boxes || []).forEach(function (b, k) { fn(b, "rc-" + i + "-" + j + "-" + k); });
      });
    });
  }

  function check() {
    var got = 0, max = 0, answered = 0;
    eachBox(function (b, id) {
      var input = document.getElementById(id), mark = document.getElementById(id + "-m");
      max += b.pts;
      if (input.value.trim() === "") { mark.textContent = ""; mark.className = "mark"; return; }
      answered++;
      var ok = correct(b, input.value);
      if (ok) got += b.pts;
      mark.textContent = ok ? "✓" : "✗";
      mark.className = "mark " + (ok ? "ok" : "no");
    });
    var pct = max ? Math.round(100 * got / max) : 0;
    var res = app.querySelector("#rc-result");
    res.innerHTML = "<p><strong>Level T" + level + ": " + (Math.round(got * 10) / 10) + " of " + max +
      " checked points (" + pct + "%).</strong>" + (answered ? "" : " You have not typed any answers yet.") + "</p><p>" +
      advice(level, pct) + "</p>";
    res.style.display = "block";
  }

  function showAnswers() {
    eachBox(function (b, id) {
      var mark = document.getElementById(id + "-m");
      if (!mark.textContent || mark.textContent === "✗") {
        mark.textContent = "→ " + shownAnswer(b);
        mark.className = "mark shown";
      }
    });
  }

  function startTimer() {
    var btn = app.querySelector("#rc-start"), out = app.querySelector("#rc-timer");
    if (timerId) { clearInterval(timerId); timerId = null; btn.textContent = "Start the 60-minute timer"; out.textContent = ""; return; }
    var end = Date.now() + 60 * 60 * 1000;
    btn.textContent = "Stop the timer";
    var tick = function () {
      var left = Math.max(0, end - Date.now()), m = Math.floor(left / 60000), s = Math.floor(left / 1000) % 60;
      out.textContent = left ? m + ":" + (s < 10 ? "0" : "") + s + " left" : "Time is up. You can still check your answers.";
      if (!left) { clearInterval(timerId); timerId = null; btn.textContent = "Start the 60-minute timer"; }
    };
    tick(); timerId = setInterval(tick, 1000);
  }

  function start() {
    app = document.getElementById("rc-app");
    if (!app) return;
    Array.prototype.forEach.call(app.querySelectorAll(".rc-levels button"), function (b) {
      b.addEventListener("click", function () { level = Number(b.getAttribute("data-level")); draw(); });
    });
    app.querySelector("#rc-check").addEventListener("click", check);
    app.querySelector("#rc-show").addEventListener("click", showAnswers);
    app.querySelector("#rc-clear").addEventListener("click", draw);
    app.querySelector("#rc-start").addEventListener("click", startTimer);
    draw();
  }

  window.MCCReadiness = { LEVELS: LEVELS, correct: correct, dec: dec, advice: advice };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
