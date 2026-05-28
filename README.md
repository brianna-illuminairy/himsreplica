# illuminairy · parent-facing SAT quiz funnel

A Hims-style, mobile-first quiz funnel for parent-facing SAT prep. Quiz-to-call model:
the funnel ends by booking a free strategy call (no checkout in-funnel).

**GitHub:** [brianna-illuminairy/himsreplica](https://github.com/brianna-illuminairy/himsreplica) · active branch `claude/tender-euler-grYPq`

**Design north star:** [`FUNNEL-PRINCIPLES.md`](FUNNEL-PRINCIPLES.md) — Hims density, parent voice, no marketer-speak.

---

## The real app is `app-next/` (Next.js)

The root `*.jsx` / `*.html` files are the **legacy React+Babel prototype** (kept for reference / design canvas).
All active work happens in **`app-next/`** — a Next.js App Router app, plain JSX, no TypeScript.

### Run locally

```bash
cd app-next
npm install
npm run dev        # http://localhost:3001
```

Jump to any screen with `?step=`, e.g. `http://localhost:3001/quiz?step=i-diag`.

---

## Funnel flow (current)

Step graph lives in `app-next/app/quiz/QuizRunner.jsx` (`BASE_STEPS`). State + localStorage in `app-next/app/quiz/state.js`.

```text
q1–q5            Trigger, stakes, sittings, recent score, test date
i1               Proof bridge (dynamic test date)
q6, q7           Blocker(s) + prep tried
i-diag           Diagnosis — "28 skills, 5–6 matter" aurora constellation
i-method         Slide 1: 3-image collage (tutor + student + 1410 score report)
i-steps          Slide 2: plan card + Diagnose/Rank/Plan labels
i2               Compute animation (row-by-row reveal)
q8               Target score
i3               Bridge
q9               GPA
[i-gap]          Conditional: GPA ≥ 3.0 AND score < 1400
v1               Score projection (cinematic reveal → SK-marker chart)
s1               Inputs summary (Hims sectioned card)
s2               Method — "We teach through examples" mastery loop
s3               Stats — vertical bar chart (+182 vs +40 CB avg)
s4               Tutors — editorial team feature
s5               Approved + 4-field contact form (dynamic gap/date)
s7               Plan details (12-week timeline + 1 testimonial)
s8               Acknowledgment — clinical stats + non-guarantee
s9               Booking — pick a strategy-call time
```

(S6 plan-preference was removed — enrollment happens on the call, not in-funnel.)

## Key files (`app-next/app/quiz/`)

| File | Role |
|------|------|
| `QuizRunner.jsx` | Step graph + URL `?step=` sync + back button |
| `state.js` | `useReducer` + context + localStorage; `showGapScreen()` routing |
| `components/QFShell.jsx` | Shared chrome (top bar, progress, CTAs, options) |
| `screens/Questions.jsx` | Q1–Q9 |
| `screens/Interstitials.jsx` | i1, i-diag, i-method, i-steps, i2, i3, i-gap, v1 |
| `screens/Results.jsx` | s1, s2, s3, s4 |
| `screens/Finale.jsx` | s5, s7, s8, s9 |
| `app/quiz-funnel.css` | Aurora design system (CSS vars on `.qf-page`) |
| `app/globals.css` | Body bg + desktop centering (mobile column on ≥768px) |

## Photos (`app-next/public/photos/`)

Components reference these; if missing, an aurora-gradient fallback renders (`onError`).

| File | Used |
|------|------|
| `tutor-single.png` | i-method collage (tutor) |
| `male-student.png` | i-method collage (student) |
| `score-report.png` | i-method collage (real College Board 1410) |
| `team-hero.png` | S4 tutors editorial hero |

Source/raw image options live in `uploads/` (renamed to readable names).

## Decisions + session notes

See [`DECISIONS.md`](DECISIONS.md) for the running decision log and next-steps punch list.
