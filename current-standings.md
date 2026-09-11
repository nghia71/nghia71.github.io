---
title: Current Standings
---

# Current Standings

This page is the club's live index: where the roster and every team's exam status can be seen by anyone, where the coordinator and organizer spreadsheets live for the people who run the club, and — at the bottom — the example test suite Nghia runs against practice data to prove the whole automated pipeline works, end to end, before any real team relies on it.

## Where the club's data lives

The club runs on three Google Sheets, kept deliberately separate so that what's safe for everyone to see, what's editable by the people who run pacing, and what's family-private never share a file:

| Spreadsheet | What it holds | Who can open it |
|---|---|---|
| **MCC Public Roster** | Every active team — name, team, level, region, status — plus a live row per test: placed, submitted, graded. | Anyone with the link |
| **MCC Master Registration** | Full student and parent details, team assignments, and the club's coordinator and grader lists. | Coordinators only |
| **MCC Regional Pacing** | One tab per region (UK, FR, EC, WC, VN) — each team's next chapter, testing frequency, and next test date — hand-edited by that region's coordinator. | Coordinators (edit) & club organizers (view only) |

**Coordinators** are the volunteers who directly schedule and pace each region's teams — they get edit access to Regional Pacing. **Club organizers** is a separate, broader, read-only role for volunteers who run club activities day to day; they can see rosters and standings (Regional Pacing, view-only) but never edit anything and never touch the Master Registration Spreadsheet at all — that's where family contact details live, and organizers don't need it. See [Organization](./organization.md) for who's who.

## The public roster

The **MCC Public Roster** is the one spreadsheet anyone — student, parent, or visitor — can open directly. The `Roster` tab lists every active team; the `Exams` tab shows, for each test session, whether the paper has been placed, submitted, or graded, updated automatically as the pipeline runs.

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

## Coordinator & organizer resources

<div class="note" markdown="1">
**Restricted access.** The two spreadsheets below hold family contact details and hand-edited pacing data, so they're shared individually, not with the public. The Master Registration Spreadsheet goes to coordinators only (edit access); the Regional Pacing Spreadsheet goes to coordinators (edit) and organizers (view only). Opening a link below without access will prompt Google to request it; if you should have access and don't, get in touch through the [Organization](./organization.md) page.
</div>

**MCC Master Registration** — `Students`, `Teams`, `Coordinators`, `Graders`, and `Organizers` tabs, plus a `Data Check` tab that flags anything inconsistent before it causes a problem downstream. (The `Organizers` tab is just the contact list for that role — it's Nghia's record of who's an organizer, not something organizers themselves ever open; their own access is view-only on Regional Pacing, below, never on this spreadsheet.)

<div class="note" markdown="1">
**[Open the Master Registration Spreadsheet →](https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing)**
</div>

<figure class="screenshot">
<img src="./img/current-standings/master-students.png" alt="The Students tab of the Master Registration spreadsheet">
<figcaption>The <code>Students</code> tab on the Master Registration Spreadsheet.</figcaption>
</figure>

**MCC Regional Pacing** — one tab per region, plus a `Standings` tab recomputed automatically from graded results.

<div class="note" markdown="1">
**[Open the Regional Pacing Spreadsheet →](https://docs.google.com/spreadsheets/d/1BsRd05S7tK1lnr83vxidwDA87qAd1NWEMTFKvDfRkDg/edit?usp=sharing)**
</div>

<figure class="screenshot">
<img src="./img/current-standings/pacing-standings.png" alt="A regional tab of the Regional Pacing spreadsheet, with the Standings tab visible alongside it">
<figcaption>One region's tab on the Regional Pacing Spreadsheet — the <code>Standings</code> tab sits alongside it, recomputed from graded results.</figcaption>
</figure>

## Testing the pipeline

Before any real team's test depends on it, every piece of the pipeline above — releasing a test paper, a family opening and submitting it, a grader marking it, the standings updating — gets proven end to end using two practice accounts instead of real students, across 14 numbered test cases.

<div class="note" markdown="1">
**[Testing the Pipeline: the 14-case walkthrough →](./testing-the-pipeline.md)**
</div>
