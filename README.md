# illuminairy · Hims-style SAT quiz funnel

Prototype funnel for parent-facing SAT prep (React + Babel in the browser, no build step).

**GitHub:** [brianna-illuminairy/himsreplica](https://github.com/brianna-illuminairy/himsreplica)

**Design north star:** [`FUNNEL-PRINCIPLES.md`](FUNNEL-PRINCIPLES.md) — no scroll, no paragraphs, dopamine per tap (parents just came from cat videos).

## Run locally

From this folder:

```bash
cd "/Users/briannazajicek/Desktop/himereplica/Low Context"
python3 -m http.server 8787
```

Then open:

| URL | Purpose |
|-----|---------|
| http://localhost:8787/SAT%20Quiz%20Funnel%20Live.html | **Wired end-to-end funnel** (tap through all steps) |
| http://localhost:8787/SAT%20Quiz%20Funnel.html | Design canvas — all screens as artboards |

## Live flow (Flow A · trust-first)

```text
01–05  Questions
06     Bridge (proof)
07–08  Blocker + tried
09     Diagnosis
10     Compute
11–12  Goal + GPA
[13a]  GPA gap (if GPA ≥ 3.0 and score < 1400)
14     Snapshot
15–17  Method: diagnostic plan → mistake-driven → 1-on-1
18     Projection (first full payoff)
19–20  Proof + tutor support
21–25  Convert (account → plan → book)
```

Routing lives in `quiz-funnel-runner.jsx` (`qfResolveStepIds`).

## Key files

| File | Role |
|------|------|
| `quiz-funnel-runner.jsx` | Step graph + navigation |
| `quiz-funnel-questions.jsx` | Q1–Q9 |
| `quiz-funnel-interstitials.jsx` | Bridge, compute, diagnosis, GPA gap, projection |
| `quiz-funnel-results.jsx` | Snapshot, method screens, proof, tutors |
| `quiz-funnel-finale.jsx` | Account, plan, booking |
| `quiz-funnel-shell.jsx` | Shared chrome (progress, back, CTAs) |
| `quiz-funnel.css` | Aurora / V3b styles |

## Push to GitHub

```bash
cd "/Users/briannazajicek/Desktop/himereplica/Low Context"
git init
git add .
git commit -m "Wire SAT quiz funnel (Flow A live runner + design canvas)"
git branch -M main
git remote add origin https://github.com/brianna-illuminairy/himsreplica.git
git push -u origin main
```

## Copy source (production /satplan)

Late-funnel copy is synced from the Illuminairy app (`/satplan` on localhost:3000):

| Live screen | Production step |
|-------------|-----------------|
| 15 · Method plan | `prep-failed-guided`, `ch3-preview` |
| 16 · Mistake-driven | `prep-failed-mistake-driven` |
| 17 · 1-on-1 / how we work | `ch3-method`, `ch3-path` |
| 18 · Projection | `ch3-path` (headline shape) |
| 19 · Proof | `prep-failed-proof` |
| 20 · Support | `ch3-social` |
| 13a · GPA gap | `reveal-diagnosis` (fixability line) |

Re-scrape after copy changes: open each `?step=` URL or edit `quiz-funnel-results.jsx` directly.

## Next (finish line)

- [ ] Replace image placeholders on method + projection screens
- [ ] Figma exports → drop assets into `uploads/` and hook `image-slot.js`
- [ ] Legal pass on projection + stats disclaimers
- [ ] Port to Next.js in Illuminairy app (route map from `qfResolveStepIds`)
