---
title: Contests 2026
permalink: /contests-2026
description: Problems and solutions of the 2026 math contests
---
{% raw %}
<style>
  .ct-tags { display: flex; flex-wrap: wrap; gap: 5px; margin: 0 0 .55em; }
  .ct-tg { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: .03em; padding: 2px 8px; border-radius: 999px; line-height: 1.5; }
  .ct-lv { background: #eee7dc; color: #4a3d33; }
  .ct-df-Starter { background: #dcf1dc; color: #245c24; }
  .ct-df-Explorer { background: #d6efec; color: #155e57; }
  .ct-df-Challenger { background: #dce8f7; color: #1f4c80; }
  .ct-df-Olympiad { background: #e7defa; color: #4b2a8a; }
  .ct-df-Advanced { background: #fbe4cc; color: #8a4a0b; }
  .ct-df-Expert { background: #f8d6cf; color: #8c2600; }
  .ct-band { margin: 1.3em 0 .5em; font-size: 14px; color: var(--ink-soft); }
  .ct-band .ct-tg { font-size: 13px; margin-right: .4em; }
  .ct-legend { font-size: 14.5px; background: var(--white); border: 1px solid var(--rule); border-radius: var(--radius); padding: 10px 16px; margin: 1em 0 1.4em; }
  .ct-legend p { margin: .35em 0; }
  .ct-legend ul { margin: .2em 0 .4em; padding-left: 1.1em; }
  .ct-legend li { margin: .2em 0; }
  .ct-pd { display: inline-block; min-width: 1.6em; text-align: center; font-size: 12px; font-weight: 700; padding: 1px 6px; border-radius: 999px; margin-right: .45em; }
  .ct-pd-E { background: #dcf1dc; color: #245c24; }
  .ct-pd-M { background: #dce8f7; color: #1f4c80; }
  .ct-pd-H { background: #fbe4cc; color: #8a4a0b; }
  .ct-pd-S { background: #f8d6cf; color: #8c2600; }
</style><style>
  .ct-filter { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: .4em 0 1.2em; position: sticky; top: 0; z-index: 5; background: var(--cream, #fdf7ec); padding: 8px 0; }
  .ct-filter b { margin-right: .3em; font-size: 15px; }
  .ct-filter button { font: inherit; font-size: 14px; min-width: 2.6em; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--brand); background: var(--white); color: var(--brand); cursor: pointer; }
  .ct-filter button.on { background: var(--brand); color: var(--white); }
  .ct-filter .ct-fnote { font-size: 13.5px; color: var(--ink-soft); margin-left: .4em; }
  .ct-hide { display: none !important; }
</style><script>
(function () {
  function apply(g) {
    document.querySelectorAll('.ct-filter button').forEach(function (b) { b.classList.toggle('on', b.dataset.g === g); });
    var shown = 0;
    document.querySelectorAll('.ct-cards .card').forEach(function (c) {
      var lo = +c.dataset.lo, hi = +c.dataset.hi, ok = (g === 'all') || (lo <= +g && +g <= hi);
      c.classList.toggle('ct-hide', !ok); if (ok) shown++;
    });
    document.querySelectorAll('.ct-bandwrap').forEach(function (w) {
      var n = w.querySelectorAll('.card:not(.ct-hide)').length;
      w.classList.toggle('ct-hide', n === 0);
      var c = w.querySelector('.ct-count'); if (c) c.textContent = n + ' ' + (n === 1 ? c.dataset.one : c.dataset.many);
    });
    document.querySelectorAll('.ct-cat').forEach(function (s) {
      s.classList.toggle('ct-hide', s.querySelectorAll('.card:not(.ct-hide)').length === 0);
    });
    var note = document.querySelector('.ct-fnote');
    if (note) note.textContent = g === 'all' ? '' : shown + ' contests and collections for grade ' + g;
    if (history.replaceState) history.replaceState(null, '', g === 'all' ? location.pathname : '#grade-' + g);
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.ct-filter button').forEach(function (b) { b.addEventListener('click', function () { apply(b.dataset.g); }); });
    var m = location.hash.match(/^#grade-(\d+)$/);
    apply(m ? m[1] : 'all');
  });
})();
</script>
{% endraw %}

# Contests 2026

Problems from the 2026 contests, each with the answer and our own solutions. Answers and solutions are hidden until you click, so you can try each problem first. Most problems have two or three solutions that use different ideas: after solving a problem, read the other methods too.

The contests are grouped from primary school to the International Mathematical Olympiad. Inside each group they are put in difficulty bands, easiest first. Click your grade to see only the contests written for it.

<div class="ct-legend">
<p><b>Tags on the cards.</b> The school level: <b>PS</b> primary school, grades 3 to 5, <b>MS</b> middle school, grades 6 to 8, <b>HS</b> high school, grades 9 to 12. The difficulty of the contest, from easiest to hardest:</p>
<ul><li><span class="ct-tg ct-df-Starter">Starter</span> one idea per problem; Kangaroo, Gauss and similar papers</li><li><span class="ct-tg ct-df-Explorer">Explorer</span> two ideas and a few traps; AMC 8, MATHCOUNTS, the harder UK JMC questions</li><li><span class="ct-tg ct-df-Challenger">Challenger</span> short-answer contests for strong high-school students; AMC 10/12, UK SMC, HMMT November, most tournaments</li><li><span class="ct-tg ct-df-Olympiad">Olympiad</span> first proof contests and the AIME; UK JMO and IMOK, CJMO, early national rounds, HMMT February</li><li><span class="ct-tg ct-df-Advanced">Advanced</span> full national and regional olympiads; USAJMO, JBMO, Balkan MO, APMO, EGMO, most national finals</li><li><span class="ct-tg ct-df-Expert">Expert</span> the top level; IMO, RMM, USAMO, China, Iran 3rd round, the strongest team selection tests</li></ul>
<p><b>Tags on the problems.</b> Each problem shows its topic, the chapter and section of <i>Learning Problem Solving</i> VI or VII it belongs to, and its difficulty on that book's scale: <span class="ct-pd ct-pd-E">E</span>Easy <span class="ct-pd ct-pd-M">M</span>Medium <span class="ct-pd ct-pd-H">H</span>Hard <span class="ct-pd ct-pd-S">S</span>Superhard. An H problem from an LPS VI chapter is easier than an E problem from an LPS VII chapter.</p>
</div>
<div class="ct-filter"><b>Your grade:</b><button type="button" data-g="all">All</button><button type="button" data-g="3">3</button><button type="button" data-g="4">4</button><button type="button" data-g="5">5</button><button type="button" data-g="6">6</button><button type="button" data-g="7">7</button><button type="button" data-g="8">8</button><button type="button" data-g="9">9</button><button type="button" data-g="10">10</button><button type="button" data-g="11">11</button><button type="button" data-g="12">12</button><span class="ct-fnote"></span></div>
<section class="ct-cat" markdown="0">
<h2 id="grade-collections">Grade collections</h2>
<p>The best problems of many 2026 contests for younger students (Kangaroo, MIMC, SMOPS, Gauss, UKMT challenges, AMC 8, MATHCOUNTS and others), gathered into one collection per grade and presented like a single paper. Each problem names its source.</p>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Starter">Starter</span><span class="ct-count" data-one="collection" data-many="collections">3 collections</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="3" data-hi="4">
    <h3><a href="{{ '/contests/grade-3-4-2026' | relative_url }}">Grades 3-4 Selection 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">PS</span><span class="ct-tg ct-df-Starter">Starter</span></div>
    <p>23 problems. Selected problems for grades 3 and 4 from 2026 contests (Kangaroo, UKMT, CEMC Gauss, AMC 8).</p>
  </div>
  <div class="card" data-lo="5" data-hi="5">
    <h3><a href="{{ '/contests/grade-5-2026' | relative_url }}">Grade 5 Selection 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">PS</span><span class="ct-tg ct-df-Starter">Starter</span></div>
    <p>17 problems. Selected problems for grade 5 from 2026 contests (UKMT JMC, MIMC, SMOPS, Gauss, Kangaroo).</p>
  </div>
  <div class="card" data-lo="5" data-hi="5">
    <h3><a href="{{ '/contests/grade-5-2-2026' | relative_url }}">Grade 5 Selection 2026, Part 2</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">PS</span><span class="ct-tg ct-df-Starter">Starter</span></div>
    <p>20 problems. Selected problems for grade 5, Part 2 (UKMT, MATHCOUNTS).</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Explorer">Explorer</span><span class="ct-count" data-one="collection" data-many="collections">6 collections</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="6" data-hi="6">
    <h3><a href="{{ '/contests/grade-6-2026' | relative_url }}">Grade 6 Selection 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-df-Explorer">Explorer</span></div>
    <p>22 problems. Selected problems for grade 6 from 2026 contests (MIMC, SMOPS, UKMT JMC, AMC 8).</p>
  </div>
  <div class="card" data-lo="6" data-hi="6">
    <h3><a href="{{ '/contests/grade-6-2-2026' | relative_url }}">Grade 6 Selection 2026, Part 2</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-df-Explorer">Explorer</span></div>
    <p>21 problems. Selected problems for grade 6, Part 2 (UKMT, MATHCOUNTS).</p>
  </div>
  <div class="card" data-lo="7" data-hi="7">
    <h3><a href="{{ '/contests/grade-7-2026' | relative_url }}">Grade 7 Selection 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-df-Explorer">Explorer</span></div>
    <p>24 problems. Selected problems for grade 7 from 2026 contests (MIMC, SMOPS, Gauss, AMC 8).</p>
  </div>
  <div class="card" data-lo="7" data-hi="7">
    <h3><a href="{{ '/contests/grade-7-2-2026' | relative_url }}">Grade 7 Selection 2026, Part 2</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-df-Explorer">Explorer</span></div>
    <p>20 problems. Selected problems for grade 7, Part 2 (UKMT, MATHCOUNTS).</p>
  </div>
  <div class="card" data-lo="8" data-hi="8">
    <h3><a href="{{ '/contests/grade-8-2026' | relative_url }}">Grade 8 Selection 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-df-Explorer">Explorer</span></div>
    <p>17 problems. Selected problems for grade 8 from 2026 contests (MIMC, CLMC, Gauss, AMC 8).</p>
  </div>
  <div class="card" data-lo="8" data-hi="8">
    <h3><a href="{{ '/contests/grade-8-2-2026' | relative_url }}">Grade 8 Selection 2026, Part 2</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-df-Explorer">Explorer</span></div>
    <p>20 problems. Selected problems for grade 8, Part 2 (UKMT, MATHCOUNTS).</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Challenger">Challenger</span><span class="ct-count" data-one="collection" data-many="collections">2 collections</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="9" data-hi="9">
    <h3><a href="{{ '/contests/grade-9-2026' | relative_url }}">Grade 9 Selection 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>20 problems. Selected problems for grade 9 (UKMT, MATHCOUNTS, Vietnamese entrance exams).</p>
  </div>
  <div class="card" data-lo="9" data-hi="9">
    <h3><a href="{{ '/contests/grade-9-2-2026' | relative_url }}">Grade 9 Selection 2026, Part 2</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>24 problems. Selected problems for grade 9, Part 2 (Vietnamese entrance exams for specialised high schools).</p>
  </div>
</div></div>
</section>
<section class="ct-cat" markdown="0">
<h2 id="junior-olympiads">Junior olympiads</h2>
<p>Olympiads with an age or grade limit: the first proof contests for middle-school and early high-school students.</p>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Olympiad">Olympiad</span><span class="ct-count" data-one="contest" data-many="contests">11 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="8" data-hi="9">
    <h3><a href="{{ '/contests/azerbaijan-junior-nmo-2026' | relative_url }}">Azerbaijan Junior NMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. Azerbaijan National Mathematical Olympiad 2026, Juniors (grades 8-9): 6 problems.</p>
  </div>
  <div class="card" data-lo="7" data-hi="9">
    <h3><a href="{{ '/contests/bosnia-jbmo-tst-2026' | relative_url }}">Bosnia JBMO TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>4 problems. Bosnia and Herzegovina JBMO TST 2026: 4 problems.</p>
  </div>
  <div class="card" data-lo="8" data-hi="10">
    <h3><a href="{{ '/contests/cjmo-2026' | relative_url }}">CJMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>2 problems. Canadian Junior Mathematical Olympiad 2026: 5 problems.</p>
  </div>
  <div class="card" data-lo="6" data-hi="9">
    <h3><a href="{{ '/contests/colombia-junior-mo-2026' | relative_url }}">Colombia Junior MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. Colombian Junior Mathematical Olympiad 2026: 6 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="10">
    <h3><a href="{{ '/contests/cono-sur-2026' | relative_url }}">Cono Sur MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. The Cono Sur Olympiad of the South American countries: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="8" data-hi="10">
    <h3><a href="{{ '/contests/jom-2026' | relative_url }}">JOM 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>10 problems. JOM 2026 (Junior Olympiad of Malaysia): 10 problems.</p>
  </div>
  <div class="card" data-lo="6" data-hi="9">
    <h3><a href="{{ '/contests/junior-macedonian-mo-2026' | relative_url }}">Junior Macedonian MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>5 problems. 30th Junior Macedonian Mathematical Olympiad (2026): 5 problems.</p>
  </div>
  <div class="card" data-lo="7" data-hi="9">
    <h3><a href="{{ '/contests/korea-junior-mo-2026' | relative_url }}">Korea Junior MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>8 problems. Korea Junior Mathematical Olympiad 2026: 8 problems.</p>
  </div>
  <div class="card" data-lo="7" data-hi="8">
    <h3><a href="{{ '/contests/singapore-junior-mo-2026' | relative_url }}">Singapore Junior MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>5 problems. Singapore Mathematical Olympiad 2026, Junior Section: 5 problems.</p>
  </div>
  <div class="card" data-lo="8" data-hi="10">
    <h3><a href="{{ '/contests/uk-imok-2026' | relative_url }}">UK Intermediate MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>18 problems. UKMT Intermediate Mathematical Olympiad 2026: Cayley, Hamilton and Maclaurin papers, 18 problems.</p>
  </div>
  <div class="card" data-lo="7" data-hi="8">
    <h3><a href="{{ '/contests/uk-jmo-2026' | relative_url }}">UK Junior MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. UKMT Junior Mathematical Olympiad 2026: 6 problems, Year 8 and below.</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Advanced">Advanced</span><span class="ct-count" data-one="contest" data-many="contests">5 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="8" data-hi="10">
    <h3><a href="{{ '/contests/azerbaijan-junior-tsts-2026' | relative_url }}">Azerbaijan Junior TSTs 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>12 problems. Azerbaijan Junior Team Selection Tests 2026 (JBMO TST and Junior TSTST): 12 problems.</p>
  </div>
  <div class="card" data-lo="8" data-hi="10">
    <h3><a href="{{ '/contests/jbmo-2026' | relative_url }}">JBMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>4 problems. The Junior Balkan Mathematical Olympiad, a one-day contest.</p>
  </div>
  <div class="card" data-lo="7" data-hi="9">
    <h3><a href="{{ '/contests/romania-jbmo-tst-2026' | relative_url }}">Romania TST 2026 (JBMO)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>5 problems. Romanian selection test for the Junior Balkan team (Day 1).</p>
  </div>
  <div class="card" data-lo="8" data-hi="10">
    <h3><a href="{{ '/contests/turkey-jbmo-tst-2026' | relative_url }}">Turkey TST 2026 (JBMO)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>8 problems. Turkish selection test for the Junior Balkan team: two days, four problems each.</p>
  </div>
  <div class="card" data-lo="8" data-hi="10">
    <h3><a href="{{ '/contests/usajmo-2026' | relative_url }}">USAJMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>5 problems. USA Junior Mathematical Olympiad 2026: 6 problems.</p>
  </div>
</div></div>
</section>
<section class="ct-cat" markdown="0">
<h2 id="national-competitions">National competitions</h2>
<p>National short-answer competitions: the AMC 10 and 12, the AIME that follows them, the COMC, the UK Senior Mathematical Challenge and India STEMS. Every problem has a final answer (STEMS also has a proof part).</p>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Challenger">Challenger</span><span class="ct-count" data-one="contest" data-many="contests">5 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="8" data-hi="10">
    <h3><a href="{{ '/contests/amc-10a-2026' | relative_url }}">AMC 10A 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>25 problems, 75 minutes. Grade 10 and below.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/amc-12a-2026' | relative_url }}">AMC 12A 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>25 problems, 75 minutes. Grade 12 and below. Eleven problems are shared with the AMC 10A.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/comc-2026' | relative_url }}">COMC 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>Canadian Open Mathematics Challenge: 12 problems, sections A, B and C, 2&frac12; hours.</p>
  </div>
  <div class="card" data-lo="8" data-hi="12">
    <h3><a href="{{ '/contests/ioqm-2026' | relative_url }}">IOQM 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>30 problems. Indian Olympiad Qualifier in Mathematics 2026: 30 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/uk-smc-2026' | relative_url }}">UK SMC 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>25 problems. UKMT Senior Mathematical Challenge: 25 questions (22 multiple choice, 3 with a three-digit answer).</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Olympiad">Olympiad</span><span class="ct-count" data-one="contest" data-many="contests">2 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/aime-2026' | relative_url }}">AIME 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>30 problems. AIME I and AIME II, 15 each; every answer is an integer from 0 to 999.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/india-stems-a-2026' | relative_url }}">India STEMS 2026 (Category A)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>12 problems. India STEMS, Category A: objective and subjective problems.</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Advanced">Advanced</span><span class="ct-count" data-one="contest" data-many="contests">1 contest</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/india-stems-b-2026' | relative_url }}">India STEMS 2026 (Category B)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>11 problems. India STEMS, Category B: objective and subjective problems.</p>
  </div>
</div></div>
</section>
<section class="ct-cat" markdown="0">
<h2 id="university-tournaments">University tournaments</h2>
<p>High-school tournaments run by university students. HMMT and HMIC are given in full; for the others we keep a selection of the best problems.</p>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Challenger">Challenger</span><span class="ct-count" data-one="contest" data-many="contests">10 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/big-red-2026' | relative_url }}">Big Red Math 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>19 problems. Cornell Big Red Math Competition 2026: a selection of 19 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/caltech-mm-2026' | relative_url }}">Caltech Math Meet 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>9 problems. Caltech Math Meet 2026: a selection of 9 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/gim-yale-2026' | relative_url }}">Girls in Math at Yale 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>15 problems. Girls in Math at Yale 2026: a selection of 15 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/hmmt-nov-gt-2026' | relative_url }}">HMMT November 2026 (General and Theme)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>20 problems. HMMT November 2026: General and Theme rounds, 20 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/hmmt-nov-tg-2026' | relative_url }}">HMMT November 2026 (Team and Guts)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>43 problems. HMMT November 2026: Team and Guts rounds, 43 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/umd-hs-2026' | relative_url }}">Maryland HS Competition 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>15 problems. University of Maryland HS Competition 2026: a selection of 15 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/michigan-mm-2026' | relative_url }}">Michigan Math Meet 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>17 problems. Michigan Math Meet 2026: a selection of 17 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/nysml-2026' | relative_url }}">NYSML 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>15 problems. NYSML 2026: a selection of 15 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/penn-mc-2026' | relative_url }}">Penn Math Contest 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>15 problems. Penn Math Contest 2026: a selection of 15 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/scmc-2026' | relative_url }}">SCMC 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Challenger">Challenger</span></div>
    <p>21 problems. SCMC 2026: a selection of 21 problems.</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Olympiad">Olympiad</span><span class="ct-count" data-one="contest" data-many="contests">5 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/arml-2026' | relative_url }}">ARML 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>16 problems. ARML 2026: a selection of 16 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/cmimc-2026' | relative_url }}">CMIMC 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>20 problems. CMIMC 2026: a selection of 20 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/hmmt-feb-ind-2026' | relative_url }}">HMMT February 2026 (individual rounds)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>30 problems. HMMT February 2026: the three individual rounds, 30 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/hmmt-feb-tg-2026' | relative_url }}">HMMT February 2026 (Team and Guts)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>42 problems. HMMT February 2026: Team and Guts rounds, 42 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/math-prize-girls-2026' | relative_url }}">Math Prize for Girls 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>17 problems. Math Prize for Girls 2026: 17 of the 20 problems.</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Advanced">Advanced</span><span class="ct-count" data-one="contest" data-many="contests">1 contest</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/hmic-2026' | relative_url }}">HMIC 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>5 problems. HMMT Invitational Competition 2026: 5 proof problems.</p>
  </div>
</div></div>
</section>
<section class="ct-cat" markdown="0">
<h2 id="invitational-and-open-olympiads">Invitational and open olympiads</h2>
<p>Olympiads that are neither national olympiads nor contests between national teams.</p>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Olympiad">Olympiad</span><span class="ct-count" data-one="contest" data-many="contests">2 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="6" data-hi="12">
    <h3><a href="{{ '/contests/bamo-2026' | relative_url }}">BAMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>7 problems. Bay Area Mathematical Olympiad 2026: BAMO-8 and BAMO-12, 7 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="10">
    <h3><a href="{{ '/contests/vietnam-30-4-2026' | relative_url }}">Vietnam 30/4 Olympiad 2026 (Grade 10)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>5 problems. Vietnam April 30 Traditional Olympiad, grade 10: five problems (translated from Vietnamese).</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Advanced">Advanced</span><span class="ct-count" data-one="contest" data-many="contests">3 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/open-239-2026' | relative_url }}">239 Open MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>5 problems. The 239 Open Mathematical Olympiad (St Petersburg): five posted problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/china-girls-mo-2026' | relative_url }}">CGMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>8 problems. China Girls Mathematical Olympiad 2026: 8 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/india-singapore-friendly-2026' | relative_url }}">India-Singapore Friendly 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. India-Singapore Friendly Contest 2026: 6 problems.</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Expert">Expert</span><span class="ct-count" data-one="contest" data-many="contests">2 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/elmo-2026' | relative_url }}">ELMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>6 problems. ELMO 2026: 6 problems over two days.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/elmo-shortlist-2026' | relative_url }}">ELMO Shortlist 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>29 problems. ELMO Shortlist 2026: 35 problems.</p>
  </div>
</div></div>
</section>
<section class="ct-cat" markdown="0">
<h2 id="national-olympiads">National olympiads</h2>
<p>National olympiads and their rounds. Most problems ask for a proof; where a problem has a final answer, it is shown separately.</p>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Olympiad">Olympiad</span><span class="ct-count" data-one="contest" data-many="contests">32 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/iran-alborz-mo-2026' | relative_url }}">Alborz MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. Alborz Mathematical Olympiad 2026 (Iran): 6 problems.</p>
  </div>
  <div class="card" data-lo="8" data-hi="12">
    <h3><a href="{{ '/contests/argentina-regional-2026' | relative_url }}">Argentina Regional MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>9 problems. Argentina Regional Mathematical Olympiad 2026 (Third Round): 9 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/austria-regional-2026' | relative_url }}">Austria MO 2026 (Regional Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>4 problems. Austrian regional competition: four problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="11">
    <h3><a href="{{ '/contests/azerbaijan-mo-2026' | relative_url }}">Azerbaijan MO 2026 (Seniors)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. Azerbaijan national olympiad, seniors (grades 10&ndash;11): two days, three problems each.</p>
  </div>
  <div class="card" data-lo="8" data-hi="12">
    <h3><a href="{{ '/contests/bangladesh-mo-2026' | relative_url }}">Bangladesh MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>10 problems. Bangladesh Mathematical Olympiad 2026, National Round: 10 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/canada-cmoqr-2026' | relative_url }}">Canada MO 2026 (Repêchage)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>7 problems. Canadian Mathematical Olympiad Qualifying Repêchage: seven problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/colombia-mo-2026' | relative_url }}">Colombia MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. Colombian national olympiad: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/euler-olympiad-2026' | relative_url }}">Euler Olympiad 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>16 problems. Euler Olympiad 2026 (Georgia, Free University of Tbilisi), Rounds 1 and 2: 16 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/finland-hs-2026' | relative_url }}">Finland HS Competition 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>5 problems. Finnish National High School Competition 2026: 5 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/bundeswettbewerb-2026' | relative_url }}">Germany Bundeswettbewerb 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>8 problems. German Bundeswettbewerb Mathematik: two rounds, four problems each.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/indonesia-regional-2026' | relative_url }}">Indonesia Regional MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>12 problems. Indonesia Provincial (Regional) Mathematical Olympiad 2026 (OSN Matematika SMA/MA, provincial round): 12 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/iran-2nd-round-2026' | relative_url }}">Iran MO 2026 (Second Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. Iranian olympiad, second round: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/japan-girls-mo-2026' | relative_url }}">Japan Girls&#x27; MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>5 problems. Japan Mathematical Olympiad for Girls 2026: 5 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="11">
    <h3><a href="{{ '/contests/kazakhstan-regional-2026' | relative_url }}">Kazakhstan MO 2026 (Regional Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>18 problems. Regional round for grades 9, 10 and 11: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="7" data-hi="12">
    <h3><a href="{{ '/contests/kosovo-mo-2026' | relative_url }}">Kosovo MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>24 problems. Grades 7 to 12, four per grade; a good mix for younger students.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/mexican-girls-mo-2026' | relative_url }}">Mexican Girls MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>8 problems. Mexican Girls' Mathematical Olympiad 2026 (5th Concurso Nacional Femenil, Olimpiada Mexicana de Matemáticas): 8 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/nepal-mo-2026' | relative_url }}">Nepal MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>8 problems. Nepal National Olympiad 2026 (IMO Pre-TST): 8 problems.</p>
  </div>
  <div class="card" data-lo="7" data-hi="12">
    <h3><a href="{{ '/contests/nmtc-2026' | relative_url }}">NMTC 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>16 problems. National Mathematics Talent Contest (India) 2026: 16 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/macedonia-mo-2026' | relative_url }}">North Macedonia MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>5 problems. The 33rd Macedonian Mathematical Olympiad.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/abel-2026' | relative_url }}">Norway MO 2026 (Abel Final)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>8 problems. Norwegian Abel competition, final round.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/peru-onem-2026' | relative_url }}">Peru MO (ONEM) 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>4 problems. Peruvian Mathematical Olympiad (ONEM) 2026: 4 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/philippines-mo-2026' | relative_url }}">Philippines MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>8 problems. National stage of the Philippine olympiad: two days, four problems each.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/poland-r1-2026' | relative_url }}">Poland MO 2026 (First Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>12 problems. Polish Mathematical Olympiad, first round: twelve problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/poland-2nd-round-2026' | relative_url }}">Poland MO 2026 (Second Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. Polish olympiad, second round: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/portugal-mo-2026' | relative_url }}">Portugal MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. Portuguese national olympiad: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="9" data-hi="10">
    <h3><a href="{{ '/contests/romania-district-olympiad-2026' | relative_url }}">Romania District Olympiad 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>8 problems. Romanian Mathematical Olympiad 2026, District Round (Etapa judeteana), Grades 9-12: 8 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="10">
    <h3><a href="{{ '/contests/singapore-senior-mo-2026' | relative_url }}">Singapore Senior MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>5 problems. Singapore Mathematical Olympiad 2026, Senior Section: 5 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/south-africa-mo-2026' | relative_url }}">South Africa MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. South African Mathematics Olympiad 2026 (National Olympiad): 6 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/spanish-girls-mo-2026' | relative_url }}">Spanish Girls MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>4 problems. III Olimpiada Femenina Española de Matemáticas 2026 (Spanish Girls' Mathematical Olympiad): 4 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/thailand-online-mo-2026' | relative_url }}">Thailand MO 2026 (Online)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>10 problems. Thailand Online Mathematical Olympiad: two days, five problems each.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/uk-mog-2026' | relative_url }}">UK MOG 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>5 problems. UKMT Mathematical Olympiad for Girls 2026: 5 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/uzbekistan-mo-2026' | relative_url }}">Uzbekistan MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>5 problems. Uzbek national olympiad, final round: five problems.</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Advanced">Advanced</span><span class="ct-count" data-one="contest" data-many="contests">24 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/austria-mo-2026' | relative_url }}">Austria MO 2026 (National Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>10 problems. Austrian national olympiad: preliminary round (4 problems) and final round (6 problems).</p>
  </div>
  <div class="card" data-lo="8" data-hi="11">
    <h3><a href="{{ '/contests/belarus-mo-2026' | relative_url }}">Belarus MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>32 problems. Belarusian national olympiad, final stage: grades 8 to 11, eight problems each.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/brazil-mo-2026' | relative_url }}">Brazil MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>11 problems. Brazilian Mathematical Olympiad (OBM) 2026: 11 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/bulgaria-mo-2026' | relative_url }}">Bulgaria MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Bulgarian national olympiad: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/canada-mo-2026' | relative_url }}">Canada MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>5 problems. Canadian Mathematical Olympiad: five problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/china-second-round-2026' | relative_url }}">China Second Round A 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>4 problems. China Second Round 2026 (National High School Mathematics League, Paper A, additional test): 4 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/china-western-mo-2026' | relative_url }}">China Western MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>8 problems. China Western Mathematical Olympiad 2026: 8 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/czech-slovak-mo-2026' | relative_url }}">Czech-Slovak MO 2026 (Final Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Czech and Slovak national final, category A: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/germany-mo-2026' | relative_url }}">Germany MO 2026 (Final Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. German national olympiad (final round): two days, three problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/india-mo-2026' | relative_url }}">India MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Indian National Mathematical Olympiad (INMO): six problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/indonesia-mo-2026' | relative_url }}">Indonesia MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>13 problems. Indonesia National Mathematical Olympiad 2026 (OSN Matematika SMA/MA), Semifinal and Final Round: 13 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/itamo-2026' | relative_url }}">ITAMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Italian Mathematical Olympiad 2026 (XLII edition, national final): 6 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/japan-mo-2026' | relative_url }}">Japan MO 2026 (Final Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>5 problems. Japan Mathematical Olympiad, final round: five problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/kazakhstan-mo-2026' | relative_url }}">Kazakhstan MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>12 problems. Kazakh national olympiad.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/mongolia-mo-2026' | relative_url }}">Mongolia MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. The Mongolian national olympiad.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/poland-mo-2026' | relative_url }}">Poland MO 2026 (Final Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Polish olympiad, final round: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/romania-mo-2026' | relative_url }}">Romania MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>8 problems. Romanian National Olympiad: grades 9 and 10, four problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/serbia-mo-2026' | relative_url }}">Serbia MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Serbian national olympiad: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/singapore-mo-open-2026' | relative_url }}">Singapore MO Open 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>5 problems. Singapore Mathematical Olympiad 2026, Open Section: 5 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/spain-mo-2026' | relative_url }}">Spain MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Spanish national olympiad: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/taiwan-mo-2026' | relative_url }}">Taiwan MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>5 problems. Taiwan Mathematics Olympiad: five problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/thailand-mo-2026' | relative_url }}">Thailand MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>10 problems. Thai national olympiad: two days, five problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/uk-bmo2-2026' | relative_url }}">UK BMO Round 2 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>4 problems. British Mathematical Olympiad Round 2 2026: 4 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/ukraine-mo-2026' | relative_url }}">Ukraine MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>30 problems. Ukrainian national olympiad, grades 8 to 11: two days per grade.</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Expert">Expert</span><span class="ct-count" data-one="contest" data-many="contests">6 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/china-mo-2026' | relative_url }}">China MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>6 problems. Chinese Mathematical Olympiad (CMO): two days, three problems each.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/iran-3rd-round-2026' | relative_url }}">Iran MO 2025 (Third Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>18 problems. Iranian olympiad, third round: algebra, combinatorics, geometry and number theory exams.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/korea-mo-2026' | relative_url }}">Korea MO 2026 (Final Round)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>6 problems. Korean Mathematical Olympiad, final round: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/all-russian-mo-2026' | relative_url }}">Russia MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>21 problems. All-Russian Olympiad, final round: grades 9, 10 and 11, eight problems each.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/usamo-2026' | relative_url }}">USAMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>6 problems. USA Mathematical Olympiad: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/vietnam-mo-2026' | relative_url }}">Vietnam MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>7 problems. Vietnamese national olympiad (VMO): two days.</p>
  </div>
</div></div>
</section>
<section class="ct-cat" markdown="0">
<h2 id="regional-olympiads">Regional olympiads</h2>
<p>Olympiads shared by the countries of one region.</p>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Olympiad">Olympiad</span><span class="ct-count" data-one="contest" data-many="contests">6 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="8" data-hi="11">
    <h3><a href="{{ '/contests/caucasus-mo-2026' | relative_url }}">Caucasus MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>16 problems. XI Caucasus Mathematical Olympiad: Juniors and Seniors, two days each.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/centroamerican-2026' | relative_url }}">Centroamerican MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. Centroamerican and Caribbean Olympiad 2026: 6 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/eamo-2026' | relative_url }}">EAMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. 4th East African Mathematics Olympiad 2026: 6 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/nordic-2026' | relative_url }}">Nordic MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>4 problems. The Nordic Mathematical Contest, a one-day contest.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/pagmo-2026' | relative_url }}">PAGMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. Pan-American Girls Mathematical Olympiad 2026: 6 problems.</p>
  </div>
  <div class="card" data-lo="9" data-hi="12">
    <h3><a href="{{ '/contests/pamo-2026' | relative_url }}">Pan-African MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>6 problems. Pan African Mathematical Olympiad: two days, three problems each.</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Advanced">Advanced</span><span class="ct-count" data-one="contest" data-many="contests">7 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/apmo-2026' | relative_url }}">APMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>5 problems. Asian Pacific Mathematics Olympiad 2026: 5 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/balkan-mo-2026' | relative_url }}">Balkan MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>4 problems. Balkan Mathematical Olympiad: four problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/benelux-mo-2026' | relative_url }}">Benelux MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>4 problems. Benelux Mathematical Olympiad (Belgium, the Netherlands, Luxembourg), a one-day contest.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/caps-match-2026' | relative_url }}">CAPS Match 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. The Czech-Austrian-Polish-Slovak Match: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/iberoamerican-2026' | relative_url }}">Iberoamerican MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. The Iberoamerican Olympiad of the Spanish- and Portuguese-speaking countries: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/memo-2026' | relative_url }}">MEMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>12 problems. Middle European Mathematical Olympiad: individual (4) and team (8) competitions.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/silk-road-2026' | relative_url }}">Silk Road MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>4 problems. Silk Road Mathematical Competition: four problems.</p>
  </div>
</div></div>
</section>
<section class="ct-cat" markdown="0">
<h2 id="international-olympiads">International olympiads</h2>
<p>International competitions open to many countries.</p>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Advanced">Advanced</span><span class="ct-count" data-one="contest" data-many="contests">9 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/egmo-2026' | relative_url }}">EGMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. European Girls’ Mathematical Olympiad: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/emo-2026' | relative_url }}">European MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>8 problems. European Mathematical Olympiad (EMO): eight problems.</p>
  </div>
  <div class="card" data-lo="8" data-hi="12">
    <h3><a href="{{ '/contests/francophone-mo-2026' | relative_url }}">Francophone MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>8 problems. Francophone Mathematical Olympiad: Junior and Senior papers, four problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/ifym-sozopol-2026' | relative_url }}">IFYM Sozopol 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>40 problems. XV International Festival of Young Mathematicians Sozopol 2026 (Theme for grades 10--12): 40 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/imsc-2026' | relative_url }}">IMSC 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. International Mathematical Summer Camp 2026: 6 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/izho-2026' | relative_url }}">IZhO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. International Zhautykov Olympiad 2026 (mathematics): 6 problems.</p>
  </div>
  <div class="card" data-lo="8" data-hi="11">
    <h3><a href="{{ '/contests/sharygin-2026' | relative_url }}">Sharygin Geometry MO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">MS</span><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>48 problems. Sharygin Geometry Olympiad: correspondence round (24 problems) and final round (grades 8 to 10).</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/tasimo-2026' | relative_url }}">TASIMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Tashkent International Mathematical Olympiad 2026: 6 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/usemo-2026' | relative_url }}">USEMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>12 problems. US Ersatz Math Olympiad: Eastern and Western zones, six problems each.</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Expert">Expert</span><span class="ct-count" data-one="contest" data-many="contests">1 contest</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/rmm-2026' | relative_url }}">RMM 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>6 problems. Romanian Master of Mathematics: two days, three problems each.</p>
  </div>
</div></div>
</section>
<section class="ct-cat" markdown="0">
<h2 id="team-selection-tests">Team selection tests</h2>
<p>Tests used to choose national teams for the IMO, EGMO and JBMO. These are among the hardest problems on the site.</p>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Olympiad">Olympiad</span><span class="ct-count" data-one="contest" data-many="contests">1 contest</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="9" data-hi="10">
    <h3><a href="{{ '/contests/brazil-cono-sur-tst-2026' | relative_url }}">Brazil Cono Sur TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Olympiad">Olympiad</span></div>
    <p>12 problems. Brazil Cono Sur Team Selection Test 2026: 12 problems.</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Advanced">Advanced</span><span class="ct-count" data-one="contest" data-many="contests">18 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/argentina-ibero-tst-2026' | relative_url }}">Argentina Ibero TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Argentina Iberoamerican Team Selection Test 2026: 6 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/argentina-tst-2026' | relative_url }}">Argentina TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Argentina team selection test: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/azerbaijan-tsts-2026' | relative_url }}">Azerbaijan TSTs 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>30 problems. Azerbaijan Team Selection Tests 2026 (IMO TST, BMO TST, EGMO TST, IZhO TST and TSTST): 30 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/belarus-tst-2026' | relative_url }}">Belarus TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>20 problems. Belarus Team Selection Test 2026: 20 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/egypt-tst-2026' | relative_url }}">Egypt TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>4 problems. Egypt Mathematical Olympiad Team Selection Exam 2026 (Exam 01): 4 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/finland-tst-2026' | relative_url }}">Finland TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>11 problems. Finland Team Selection Tests for the International Mathematical Olympiad 2026: 11 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/germany-tst-2026' | relative_url }}">Germany TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>27 problems. German team selection tests for the IMO (VAIMO and AIMO): 27 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/israel-tst-2026' | relative_url }}">Israel TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>18 problems. Israeli team selection tests for the IMO.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/kosovo-tsts-2026' | relative_url }}">Kosovo TSTs 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>14 problems. Kosovo Team Selection Tests 2026 (IMO, EGMO and EMO): 14 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/macedonia-bmo-tst-2026' | relative_url }}">Macedonia BMO TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>4 problems. Macedonian Balkan MO Team Selection Test 2026: 4 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/malaysia-tst-2026' | relative_url }}">Malaysia TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>17 problems. Malaysian IMO Team Selection Tests 2026 and Malaysian APMO Camp Selection Test 2026: 17 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/dutch-tstst-2026' | relative_url }}">Netherlands TST 2026 (TSTST)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>5 problems. Dutch team selection test (TSTST): five problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/philippine-tst-2026' | relative_url }}">Philippine TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>12 problems. Philippine Team Selection Test 2026 (for the 67th IMO): 12 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/romania-egmo-tst-2026' | relative_url }}">Romania TST 2026 (EGMO)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Romanian selection test for the EGMO team.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/serbia-tst-2026' | relative_url }}">Serbia TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Serbian team selection test for the IMO: two days, three problems each.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/taiwan-apmo-prelim-2026' | relative_url }}">Taiwan APMO Prelim 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>12 problems. Taiwan APMO Preliminary Selection 2026: 12 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/thailand-tst-2026' | relative_url }}">Thailand TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>30 problems. Thailand Team Selection Tests 2026 (TST and TSTST): 30 problems.</p>
  </div>
  <div class="card" data-lo="10" data-hi="12">
    <h3><a href="{{ '/contests/turkey-egmo-tst-2026' | relative_url }}">Turkey TST 2026 (EGMO)</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Advanced">Advanced</span></div>
    <p>6 problems. Turkish selection test for the EGMO team: two days, three problems each.</p>
  </div>
</div></div>
<div class="ct-bandwrap">
<p class="ct-band"><span class="ct-tg ct-df-Expert">Expert</span><span class="ct-count" data-one="contest" data-many="contests">10 contests</span></p>
<div class="cards ct-cards">
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/china-tst-2026' | relative_url }}">China TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>24 problems. Chinese team selection tests for the IMO: two rounds, 24 problems.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/india-tst-2026' | relative_url }}">India TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>30 problems. Indian team selection tests for the IMO: 30 problems.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/iran-tst-2026' | relative_url }}">Iran TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>12 problems. Iranian team selection tests for the IMO: four tests, three problems each.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/japan-tst-2026' | relative_url }}">Japan TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>12 problems. Japan IMO Team Selection Test 2026: 12 problems.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/romania-tst-2026' | relative_url }}">Romania TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>13 problems. Romanian team selection tests for the IMO: four days.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/taiwan-tst-2026' | relative_url }}">Taiwan TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>42 problems. Taiwan Team Selection Test 2026: 42 problems.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/turkey-tst-2026' | relative_url }}">Turkey TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>9 problems. Turkish team selection test for the IMO: nine problems.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/usa-tst-2026' | relative_url }}">USA TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>6 problems. USA team selection test for the IMO: six problems.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/usa-tstst-2026' | relative_url }}">USA TSTST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>9 problems. USA TST Selection Test (TSTST) 2026: 9 problems.</p>
  </div>
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/vietnam-tst-2026' | relative_url }}">Vietnam TST 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>6 problems. Vietnamese team selection test for the IMO: two days, three problems each.</p>
  </div>
</div></div>
</section>
<section class="ct-cat" markdown="0">
<h2 id="international-mathematical-olympiad">International Mathematical Olympiad</h2>
<p>The 67th IMO, the summit of olympiad mathematics.</p>
<div class="ct-bandwrap">
<div class="cards ct-cards">
  <div class="card" data-lo="11" data-hi="12">
    <h3><a href="{{ '/contests/imo-2026' | relative_url }}">IMO 2026</a></h3>
    <div class="ct-tags"><span class="ct-tg ct-lv">HS</span><span class="ct-tg ct-df-Expert">Expert</span></div>
    <p>6 problems. International Mathematical Olympiad: two days, three problems each.</p>
  </div>
</div></div>
</section>

<p class="note">The problems belong to their publishers: AMC problems &copy; Mathematical Association of America, COMC problems &copy; Canadian Mathematical Society, UKMT problems &copy; United Kingdom Mathematics Trust, Gauss problems &copy; CEMC, MATHCOUNTS problems &copy; MATHCOUNTS Foundation; the olympiad problems are taken from the AoPS contest collections or the official papers, and the grade collections name the source of each problem. They are reproduced here for non-commercial teaching. The solutions are written by MCC.</p>
