# Decision log + next steps

Running log for the `app-next/` funnel. Newest session on top.

---

## Open / next steps

1. **S8 redundancy** — S8 currently repeats S3's stats (+182 vs +40, 78%). Plan agreed but NOT executed: strip the stats card off S8, leave only the reservation confirm + the non-guarantee disclaimer ("We don't guarantee score improvements — scores go up based on various factors, including effort."). S3 owns the results reveal.
2. **S7 (plan details)** — partially trimmed (1 testimonial, urgency card). Wants one more sharper pass.
3. **S9 (booking)** — untouched in the editorial pass; sanity-check copy + layout.
4. **S1 (summary)** — clean Hims data card, not re-examined this session.
5. **V1 (projection)** — rebuilt (SK markers + cinematic reveal); could use a polish pass.
6. **Q1–Q7 copy** — functional, never editorially reviewed against the principles.
7. **Cleanup** — `method-hero.png` is now unused (i-method uses the 3-image collage). `tutor-a.jpg`/`student-a.jpg` references may be stale.

## Verify when picking up

```bash
cd app-next && npm run dev   # :3001
```
Walk `?step=` through the flow; confirm photos render and the GPA-gap branch fires (GPA ≥ 3.0 AND score < 1400).

---

## Session — copy + visual pass (this session)

**Scope:** editorial pass on screens 9, i-method, i-steps, S2, S4, S5, S8 + image wiring.

### Copy principles established (apply everywhere)
- **3 sentences max** per screen (visuals + row labels don't count).
- **Parent voice**: about "their kid" / "they" — not "you" on kid facts.
- **No marketer-speak / glittering generalities.** "Real tutors" is meaningless (vs. fake?). Same trap as saying "honestly" — the claim signals doubt about what should be self-evident.
- **"Does it help convert?"** is the editing lens — cut anything that doesn't.
- **No icons. Ever.**
- Lead with what we DO, not what we don't ("We don't lecture" → cut).
- Specific > vague: reuse the parent's actual answers (score, target, date, GPA) wherever possible.

### Screen decisions
- **Screen 9 (i-diag)** — Replaced flat 28-dot grid with an **aurora "constellation collapse"**: 28 scattered dim stars → 5 illuminated, sized/glowing by point value (bubble-graph), connected by lines whose weight scales with impact. Copy: "1150, even after Khan Academy and group classes." → diagnosis sentence → "With X weeks until the [date] SAT, you need to quickly figure out the skills costing them points and build a personalized plan." CTA "Build their plan". viewBox compacted 220→140 so it doesn't push content down. Skill point values bumped to sum ~200.
- **i-method (Slide 1)** — Pure **visual beat**: 3-image collage (tutor + student + real College Board 1410 score report). No body text, CTA only. Decided single-tutor/single-student photos (relational) here; team group photo stays on S4 ("support" beat).
- **i-steps (Slide 2)** — Single large plan-card "image" + 3 **Hims-style floating labels** (Diagnose / Rank / Plan), each with a one-line qualifier. Earlier dense 9-row version + legend was rejected as too busy on mobile.
- **S2 (method)** — H1 "We teach through examples." sub "We show how to solve it, practice together, then they solve it." 6-step mastery loop card with dynamic example skill from Q6; subtext removed; steps renamed Learn/Watch/Solve together/Solve with hints/Solve alone/Repeat to mastery. CTA "See the results".
- **S4 (tutors)** — Editorial team feature. H1 "Coached by people who just took the test." Lead "11 tutors. All scored 1450+ on the Digital SAT in the past 3 years." 3 benefit lines: 1:1 messaging M–F 10 AM–8 PM / Weekly 1:1 sessions / Weekly progress reports.
- **S5 (approved)** — H1 "You're approved for a personalized plan." Sub combines outcome + proof using dynamic gap + date: "To help get their score up by [gap] pts for the [M/D] SAT — students with similar profiles have averaged +[low]–[high] pts." 4-field form. Dropped "95 plans" meta and SAT trademark line (didn't help convert).
- **S8 (acknowledgment)** — Made clinical/academic to build trust: "+182 vs +40 College Board retest avg" comparison + non-guarantee disclaimer. **Known issue:** duplicates S3's stats — see open item #1.

### Structural
- **S6 dropped** — quiz-to-call; enrollment on the strategy call, not in-funnel.
- **Desktop** — funnel renders as a centered ~420px phone column on ≥768px (aurora gradient bg + rounded shadow card). `text-wrap: balance` → `pretty` so headlines fill width instead of breaking narrow.
- **Q8** options → 1250/1300/1350/1400/1450+ with "Not sure" as a small link. **Q9** reordered low→high. **Q4** "Under 1000" → "Under 1100" (closes the 1000–1099 gap).
- `uploads/` raw images renamed to readable names (e.g. `male-student.png`, `female-tutor-looking-at-laptop.png`, `1410-after-score-report.png`).

### Infra note
- GitHub write access was initially blocked (403); resolved by installing the Claude GitHub App on the repo. Pushes to `claude/tender-euler-grYPq` work now.
