---
title: Current Standings
---

# Current Standings

This page is the club's live index: where the roster and every team's exam status can be seen by anyone, where the coordinator and organizer spreadsheets live for the people who run the club, and — at the bottom — the example test suite Nghia runs against practice data to prove the whole automated pipeline works, end to end, before any real team relies on it.

## Where the club's data lives

The club runs on three Google Sheets and one Form, kept deliberately separate so that what's safe for everyone to see, what's editable by the people who run pacing, what's family-private, and what a student uses to actually take a test never share a file:

| Spreadsheet / Form | What it holds | Who can open it |
|---|---|---|
| **MCC Public Roster** | Every active team — name, team, level, region, status — plus a live row per test: placed, submitted, graded. | Anyone with the link |
| **MCC Master Registration** | Full student and parent details, team assignments, and the club's coordinator and grader lists. | Coordinators (edit) & club organizers (view only) |
| **MCC Regional Pacing** | One tab per region (UK, FR, EC, WC, VN) — each team's next chapter, testing frequency, and next test date — hand-edited by that region's coordinator. | Coordinators (edit) & club organizers (view only) |
| **Test Paper Open/Submit Form** | Where a student opens their test paper and, later, submits their solution — one permanent link, used all year for every team and every test. | Students only, identified by their own verified Google account |

**Coordinators** are the volunteers who directly schedule and pace each region's teams — they get edit access to both Master Registration and Regional Pacing. **Club organizers** is a separate, broader, read-only role for volunteers who run club activities day to day; they can see rosters, standings, and family/team data (Master Registration and Regional Pacing, both view-only) but never edit anything. **Students** never open either spreadsheet at all — the Test Paper Form is the only thing they (or their parents) ever touch. See [Organization](./organization.md) for who's who.

(There's a separate registration Form — the one families use to register for a team in the first place — that isn't part of this page; a coordinator is the one who takes what it collects and enters it into Master Registration.)

## The public roster

The **MCC Public Roster** is the one spreadsheet anyone — student, parent, or visitor — can open directly. The `Roster` tab lists every active team; the `Exams` tab shows, for each test session, whether the paper has been placed, submitted, or graded, updated automatically as the pipeline runs.

**Roster columns:** `FullName`, `TeamID`, `Level`, `Region`, `Status` — a filtered, public-safe copy of `Students`.

**`Exams` columns** (one row per test session):

| Column | Meaning |
|---|---|
| `TeamID`, `Region`, `Level`, `Chapter`, `Attempt`, `ExamDate` | Set when the session is scheduled. |
| `StartedUTC` / `Deadline` | Set on the student's first "open my test paper" click; a second click doesn't reset anything. `Deadline` is the level's time limit plus a small buffer. |
| `SubmissionFileLink` / `SubmittedUTC` | Always the *latest accepted* submission — resubmitting overwrites these, but never deletes an earlier file. |
| `ElapsedMinutes` / `LateByMinutes` | How long the student took, and how far past the deadline (0 if on time; there's a short grace period beyond which a submission is rejected instead of recorded). |
| `GradingStatus` / `Score` / `Result` / `GradedUTC` / `GradedBy` | Filled in once a grader marks the test; `Result` is Pass/Fail from the score. |
| `Status` | A plain-language summary computed from everything else — "In progress — N min remaining," "Submitted on time," and so on — refreshed automatically. |

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

## Taking the test — the Test Paper Open/Submit Form

This is the one link every student uses to open their test paper and, later, to submit their solution. It's a single permanent link — the same one, all year, for every team and every test — so it never changes and never needs to be looked up again once you have it. Bookmark it.

<div class="note" markdown="1">
**[Open the Test Paper Open/Submit Form →](https://docs.google.com/forms/d/e/1FAIpQLSdrDdmflJ9K6IR7BCAlTU_7ziffSilCjkywuVJT_MoEoDFPGg/viewform)**
</div>

Sign in with the email your team registered with, then choose **"I'm ready to open my test paper"** when it's time to start, or **"Submit my solution"** when you're done. If you ever lose this link, it's always here on this page — no need to wait on a coordinator to resend it.

## Coordinator & organizer resources

<div class="note" markdown="1">
**Restricted access.** The two spreadsheets below hold family contact details and hand-edited pacing data, so they're shared individually, not with the public. Both go to coordinators (edit access) and organizers (view-only access). Opening a link below without access will prompt Google to request it; if you should have access and don't, get in touch through the [Organization](./organization.md) page.
</div>

**MCC Master Registration** — `Students`, `Teams`, `Coordinators`, `Graders`, and `Organizers` tabs, plus a `Data Check` tab that flags anything inconsistent before it causes a problem downstream. (The `Organizers` tab is just the contact list for that role — it's Nghia's record of who's an organizer, not something organizers themselves ever open; their own access to this spreadsheet, like Regional Pacing below, is view-only, never edit.)

**`Students`** — one row per student.

| Column | Meaning |
|---|---|
| `StudentID` | `S` + a zero-padded number (`S0142`). Assigned once, never derived from name or email — both can change; this never does. |
| `FullName` | As given. |
| `VerifiedEmail` | The email the registration Form itself captured from the signed-in respondent — never something typed into a text field. This is the one identity value every script trusts, including matching a Test Paper Form submission back to the right student. |
| `AlternateEmail` | A typed backup contact only — never used to identify anyone. |
| `ParentName` / `ParentEmail` | As given. |
| `Country` / `Region` / `Timezone` | Region is one of `UK`/`FR`/`EC`/`WC`/`VN`, defaulted from Country but overridable; Timezone likewise. |
| `Grade` | 1–12. |
| `Level` | 1–4. |
| `TeamID` | Blank if not yet on a team, otherwise must match a real row on `Teams` — never a note like "N/A" or "pending". |
| `Status` | `pending-team` / `active` / `withdrawn`. |
| `Note` | Free text — where any operational comment belongs, rather than jammed into `TeamID` or `Level`. |

**`Teams`** — one row per team; this is where a `TeamID` is created.

| Column | Meaning |
|---|---|
| `TeamID` | e.g. `T1a`. |
| `TeamName` | Optional. |
| `Level` | 1–4. |
| `Member1ID`…`Member3ID` | Up to 3 `StudentID`s. |
| `Region` | The team's "home" region, used to look up its default coordinator. |
| `CoordinatorID` | Defaults to whoever covers `Region`, but always overridable by hand — this is how a team with members in two different regions (say, one East Coast, one West Coast) still gets one clear coordinator. |
| `FolderID` | Not used — leave blank. An early design idea (a per-team folder of files) that was replaced before it ever shipped; teams get temporary access to the one shared paper file directly instead. |
| `Active` | TRUE/FALSE. |

**`Coordinators`** — `CoordinatorID` (e.g. `O01`), `Name`, `Email`, `RegionsCovered` (e.g. `EC, WC` — the *default* assignment only, never a hard restriction), `Note`. Every coordinator has edit access to every region's pacing, not just their own, so coordinators can always stand in for each other.

**`Organizers`** — `OrganizerID` (e.g. `CO01`), `Name`, `Email`, `Note`. This tab is simply the contact list for that read-only role; it doesn't grant anything by itself.

**`Graders`** — `GraderID`, `Name`, `Email`, `Note`.

**`Papers`** — one row per test paper that exists.

| Column | Meaning |
|---|---|
| `Level` | 1–4 |
| `Chapter` | integer |
| `Attempt` | 1, 2, 3… — a retake is a genuinely *different* uploaded file from a reserve pool, never the same paper reused |
| `DriveFileID` | The Drive file ID of the one canonical copy of this paper |
| `Note` | Free text |

`(Level, Chapter, Attempt)` is the lookup key everything else joins against to find the right file. There's exactly one Drive file per combination, shared with nobody by default — when a team starts that test, they get temporary Viewer access to that one file for their access window, then it's revoked. No per-team copies are ever made.

**How to get a `DriveFileID` and add a new paper — nothing in the automation generates this for you:**

1. Prepare the PDF and upload it to Drive yourself, into the papers folder.
2. Name the file exactly `MCC-L<level>-Ch<chapter>-A<attempt>.pdf` — e.g. `MCC-L3-Ch7-A1.pdf` (the original), `MCC-L3-Ch7-A2.pdf` (first retake), `MCC-L3-Ch7-A3.pdf` (second retake). The `MCC-` prefix makes every paper easy to find with one Drive search regardless of which folder it's in; the rest matches the `Papers` columns exactly, so matching a physical file to its row is never a guessing game.
3. Get that file's Drive ID. Right-click the file in Drive → **Share** → **Copy link** (or just open the file and look at your browser's address bar). Either way you get a URL that looks like `https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing` — the file ID is the long string of letters/numbers between `/d/` and the next `/` (here, `1AbCdEfGhIjKlMnOpQrStUvWxYz`). Paste just that string into the row's `DriveFileID` cell on the `Papers` tab — not the whole URL.
4. In that same row's `Note` cell, spell out which attempt this is, e.g. `Level 3, Chapter 7, Attempt 2 (retake 1 of 2)` — so nobody miscounts the "at most 2 retakes" limit by reading `Attempt` alone.

That's the entire process — no script call is needed to "register" a paper beyond adding that one row.

<div class="note" markdown="1">
**[Open the Master Registration Spreadsheet →](https://docs.google.com/spreadsheets/d/13byGPiBQW00egpC2GIZenAsKhMCS7qbCykZSUtbE7jk/edit?usp=sharing)**
</div>

<figure class="screenshot">
<img src="./img/current-standings/master-students.png" alt="The Students tab of the Master Registration spreadsheet">
<figcaption>The <code>Students</code> tab on the Master Registration Spreadsheet.</figcaption>
</figure>

**MCC Regional Pacing** — one tab per region, plus a `Standings` tab recomputed automatically from graded results.

Same columns on every region tab:

| Column | Meaning |
|---|---|
| `TeamID` / `TeamName` | Join key back to Master Registration; `TeamName` is copied at seed time, for readability only. |
| `Level` | Copied from Master Registration when the team's row was first added here — **not kept in sync afterward.** If a team is promoted a level mid-year, this column needs a manual edit too. |
| `NextChapter` | Which chapter the team tests next. Advances automatically once a test is graded (regardless of pass/fail — a coordinator who wants a team to redo a chapter still edits this by hand). |
| `ExamFrequencyWeeks` | 1, 2, or 3 — the column families most often ask to change. Editable any time. |
| `LastExamDate` | Set automatically once a test is graded. |
| `NextExamDate` | `LastExamDate` + `ExamFrequencyWeeks` × 7 days, recomputed automatically after every graded test. This is the date a coordinator actually watches. |
| `LastChangedDate` | Informational only — when this row was last hand-edited. |
| `Note` | Free text. |

Once `NextExamDate` falls inside the next 7 days, that date has already become a real scheduled session — editing the row after that point only changes the *next* test, never the one already under way.

The `Standings` tab (alongside the five region tabs) is a read-only summary, fully rewritten every time it refreshes — a hand-edit there doesn't stick.

<div class="note" markdown="1">
**[Open the Regional Pacing Spreadsheet →](https://docs.google.com/spreadsheets/d/1BsRd05S7tK1lnr83vxidwDA87qAd1NWEMTFKvDfRkDg/edit?usp=sharing)**
</div>

<figure class="screenshot">
<img src="./img/current-standings/pacing-standings.png" alt="A regional tab of the Regional Pacing spreadsheet, with the Standings tab visible alongside it">
<figcaption>One region's tab on the Regional Pacing Spreadsheet — the <code>Standings</code> tab sits alongside it, recomputed from graded results.</figcaption>
</figure>

## UAT — testing with real volunteers

A small group of real families and one real grader are helping test the same pipeline above, each with their own dedicated practice team so no one's data mixes with anyone else's. If you volunteered to help test, find your name below — that's your page, with your own login, your own team, and your own steps to follow, no email or message needed to get started.

<div class="note" markdown="1">
- **[Anh Tran, with Chi Khanh Pham →](./uat-anh-tran.md)**
- **[Son Ho, with Henry Ho & Michael Le →](./uat-son-ho.md)**
- **[Thoa Mai, with Nam Phong Nguyen & Jason To →](./uat-thoa-mai.md)**
- **[Tuan Le, with Linh Khanh Le →](./uat-tuan-le.md)**
- **[Toan To (Grader) →](./uat-toan-to.md)**
</div>

## Testing the pipeline

Before any real team's test depends on it, every piece of the pipeline above — releasing a test paper, a family opening and submitting it, a grader marking it, the standings updating — gets proven end to end using two practice accounts instead of real students, across 14 numbered test cases.

<div class="note" markdown="1">
**[Making Sure Testing Works: a 14-test walkthrough →](./testing-the-pipeline.md)**
</div>
