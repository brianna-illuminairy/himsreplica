# Design source — variants + Claude Design originals

Reference only. The live funnel is [`../app-next/`](../app-next/). These are kept for
A/B testing ideas and answer-based design logic to pull from.

## A/B landing page variants
| File | Hook |
|------|------|
| `variant-a.jsx` | Short control ("High GPA, low SAT?") |
| `variant-b1.jsx` | Long-form, problem-led |
| `variant-b2.jsx` | Long-form, results-led |
| `variant-b3.jsx` | Lean Hims-density, 3 hero hooks |
| `variant-b3-branded.jsx` | B3 with Aurora branding (dark/light) |
| `variant-b-shared.jsx` | Shared sub-components for B variants |
| `SAT Landing AB.html` | Landing A/B mockup (HTML) |

## Claude Design funnel prototype (answer-based variants)
Original export — the conditional/answer-based screen logic ported into `app-next`.
| File | Screens |
|------|---------|
| `quiz-funnel-questions.jsx` | Q1–Q9 |
| `quiz-funnel-interstitials.jsx` | bridge, compute, diagnosis, GPA gap, projection |
| `quiz-funnel-results.jsx` | summary, method, proof, tutors |
| `quiz-funnel-finale.jsx` | account, plan, booking |
| `quiz-funnel-shell.jsx` | shared chrome |
| `quiz-funnel-moments.jsx` | misc moment components |
| `quiz-funnel.css` | prototype styles |
| `SAT Quiz Funnel.html` | design canvas (all artboards) |
| `diagnostic interface/` | diagnostic/rank/plan UI mockups + assets |
