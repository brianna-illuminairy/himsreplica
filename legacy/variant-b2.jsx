// Variant B2 — Results-led long-form landing
// Opens with hard stats + social proof, THEN explains the science.
// Same content surface as B1, different lead hook.

function VariantB2({ onStart }) {
  const start = onStart || (() => {});

  return (
    <div className="il-page">
      <VBHeader />

      {/* ───────── HERO ───────── */}
      <section className="section" style={{ paddingTop: 18, paddingBottom: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <VBEyebrow>Proven SAT score improvement</VBEyebrow>

          <h1 style={{ fontSize: 36 }}>
            <span className="accent">+182 points.</span>
            <br/>12 weeks.<br/>One plan.
          </h1>

          <p className="lead">
            The average illuminairy student gains 182 SAT points between retakes —
            <strong> 4.5× the College Board average.</strong>
          </p>
        </div>

        {/* Top stat grid */}
        <div style={{ marginTop: 22 }}>
          <VBStatRow items={[
            { num: "95+", lbl: "PLANS BUILT" },
            { num: "182", lbl: "AVG PTS GAINED", accent: true },
            { num: "78%", lbl: "HIT TARGET" },
          ]} />
        </div>
      </section>

      {/* Hero CTA */}
      <div style={{ padding: '0 22px 28px' }}>
        <VBHeroCTA
          copy="Tell us about your son. We'll build a personalized plan to close the gap to his target score."
          cta="See his score potential"
          onClick={start}
        />
        <p className="disclaimer" style={{ marginTop: 12, textAlign: 'center' }}>
          Free · 2 minutes · No account needed
        </p>
      </div>

      {/* ───────── SOCIAL PROOF — UP TOP ───────── */}
      <section className="section flush bg-paper">
        <div className="section-inner">
          <VBSectionHead
            eyebrow="Real results"
            title="Parents are seeing the score jump."
            lead="Before-and-after scores from the last cohort of illuminairy students."
          />
        </div>
        <div className="carousel">
          <VBReviewCard before="1180" after="1410" weeks="3" name="David D., parent of Max"
            initials="D"
            quote="Max came in at 1180 with a 3.9 GPA — the mismatch killed me. 12 weeks, +230 points, and he's competitive at every school on his list now." />
          <VBReviewCard before="1080" after="1290" weeks="3" name="Priya S., parent of Aanya"
            initials="P"
            quote="We tried Khan Academy and a $2k group class. Neither found the speed problem. illuminairy did within the first 30 minutes." />
          <VBReviewCard before="1240" after="1430" weeks="3" name="Tom B., parent of Jacob"
            initials="T"
            quote="The plan ends. That mattered. We weren't signing up for endless tutoring — we needed a finite plan with a target." />
        </div>
        <div className="section-inner" style={{ marginTop: 18 }}>
          <p className="disclaimer">
            Before/after scores shared by parents who completed the 12-week plan. Average gain across the last 95 completed plans is 182 points. Individual results vary.
          </p>
        </div>
      </section>

      {/* ───────── THE SCIENCE / BLOOM'S 2-SIGMA ───────── */}
      <section className="section">
        <VBSectionHead
          eyebrow="The science"
          title={<span><span className="accent">+142 more points</span> with 1:1 tutoring vs. group class.</span>}
          lead="Bloom's research compared one-to-one tutoring with classroom teaching. Tutored students learned at the level of the top 2% of a conventional class."
        />

        {/* Bar chart */}
        <div className="card" style={{ padding: '24px 18px 18px' }}>
          <div className="num-badge" style={{ textAlign: 'center', marginBottom: 18 }}>BLOOM'S TWO-SIGMA STUDY</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'end', gap: 18, height: 180 }}>
            <BloomBar label="SELF-STUDY" value="~40" pct={20} color="var(--accent)" />
            <BloomBar label="GROUP CLASS" value="~70" pct={36} color="var(--accent)" />
            <BloomBar label="1:1 TUTORING" value="~182" pct={94} color="var(--green)" highlight />
          </div>
        </div>

        <p className="lead" style={{ marginTop: 18 }}>
          The College Board reports the average student gains <strong>40 points</strong> between retakes.
          illuminairy students gain <strong className="accent">182</strong>.
        </p>

        <div style={{ marginTop: 18 }}>
          <VBCTA label="See his score potential" onClick={start} />
        </div>
      </section>

      {/* ───────── HOW THE PLAN WORKS (DIAGNOSTIC) ───────── */}
      <section className="section bg-paper">
        <VBSectionHead
          eyebrow="How the plan works"
          title="Diagnose the 5 skills costing your son points. Drill those."
          lead="The SAT tests 28 skills. Most students lose points on the same 5. Group classes can't go deep on the ones that matter — we can."
        />

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(20,20,20,0.08)' }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>12-week personalized plan</div>
            <div className="num-badge" style={{ marginTop: 4 }}>SAMPLE OUTPUT · 1180 → 1380</div>
          </div>
          <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { name: 'Right triangles & trig', tag: '+90 pts' },
              { name: 'Linear functions', tag: '+70 pts' },
              { name: 'Boundaries', tag: '+60 pts' },
              { name: 'Systems of equations', tag: '+40 pts' },
              { name: 'Transitions', tag: '+50 pts' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--accent-soft)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ink)' }} />
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
                </div>
                <span style={{ color: 'var(--accent)', fontWeight: 800, fontFamily: 'var(--mono)', fontSize: 13 }}>{r.tag}</span>
              </div>
            ))}
          </div>
          <WeekProgress />
        </div>

        <div style={{ marginTop: 18 }}>
          <VBCTA label="See his score potential" onClick={start} />
        </div>
      </section>

      {/* ───────── WHAT'S INCLUDED ───────── */}
      <section className="section">
        <VBSectionHead
          eyebrow="What's included"
          title="One plan. Six things included."
        />
        <div className="img-ph wide" style={{ marginBottom: 14 }}>PROGRAM / DELIVERABLE</div>
        <div className="col">
          <VBIncludedRow label="Diagnostic across 28 SAT skills" />
          <VBIncludedRow label="Personalized 12-week plan" />
          <VBIncludedRow label="1:1 sessions with a vetted tutor" />
          <VBIncludedRow label="Weekly progress dashboard" />
          <VBIncludedRow label="Practice sets targeted to gaps" />
          <VBIncludedRow label="Unlimited text access to tutor" />
        </div>
        <div style={{ marginTop: 22 }}>
          <VBCTA label="See his score potential" onClick={start} />
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="section bg-cream">
        <VBSectionHead
          eyebrow="How to get started"
          title="From assessment to plan in under 5 minutes."
        />
        <div className="col">
          <VBStep n="01" title="Take the assessment"
            desc="GPA, recent score, target score, prior prep. We'll know enough to start the diagnostic."
            time="About 2 minutes"
            phLabel="ASSESSMENT" />
          <VBStep n="02" title="Skill diagnostic"
            desc="We map his answers to the 5 highest-impact skill gaps costing him points."
            time="Instant"
            phLabel="DIAGNOSTIC" />
          <VBStep n="03" title="Personalized 12-week plan"
            desc="A week-by-week schedule built around the gaps that matter."
            time="Delivered same day"
            phLabel="12WK PLAN" />
          <VBStep n="04" title="1:1 tutor + ongoing support"
            desc="Matched with a vetted SAT tutor. Weekly sessions, unlimited text in between."
            time="12 weeks"
            phLabel="TUTOR" />
        </div>
        <div style={{ marginTop: 22 }}>
          <VBCTA label="See his score potential" onClick={start} />
        </div>
      </section>

      {/* ───────── PROBLEM / WHY OTHER STUFF FAILS ───────── */}
      <section className="section bg-paper">
        <VBSectionHead
          eyebrow="Why other prep falls short"
          title="Group classes teach 28 skills. Your son loses points on 5."
        />

        <div className="grid-2" style={{ marginTop: 8 }}>
          <div className="card cream tight">
            <div className="num-badge" style={{ marginBottom: 8 }}>GROUP CLASS</div>
            <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.1 }}>Same pace, all 28 skills.</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li style={{ fontSize: 13, color: 'var(--ink-mute)' }}>~70 pts avg gain</li>
              <li style={{ fontSize: 13, color: 'var(--ink-mute)' }}>No diagnostic</li>
              <li style={{ fontSize: 13, color: 'var(--ink-mute)' }}>Lecture-driven</li>
            </ul>
          </div>
          <div className="card dark tight">
            <div className="num-badge" style={{ marginBottom: 8, color: 'var(--accent)' }}>ILLUMINAIRY</div>
            <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.1, color: 'white' }}>Targeted, 1:1, finite.</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>182 pts avg gain</li>
              <li style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>28-skill diagnostic</li>
              <li style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>Built around your son's 5 gaps</li>
            </ul>
          </div>
        </div>

        <div className="card highlight" style={{ marginTop: 14, padding: 18 }}>
          <p style={{ fontSize: 14, lineHeight: 1.5 }}>
            A 3.9 GPA student averaging 1180 doesn't have an intelligence problem.
            He's losing points on the <strong>same 5 recurring skills</strong> — and a
            class teaching 28 skills can't afford to go deep on the ones that matter.
          </p>
        </div>
      </section>

      {/* ───────── FINAL CTA / VALUES ───────── */}
      <section className="section bg-ink">
        <VBSectionHead
          eyebrow="What you walk away with"
          title={<span>A plan with a target. <span className="accent">And a deadline.</span></span>}
          lead="No endless tutoring. No generic test prep. 12 weeks, 5 targeted skills, one focused plan."
          dark
        />

        <ul className="checklist on-dark" style={{ marginTop: 8 }}>
          <li><span className="check">✓</span>Diagnose &amp; fix the few skill gaps costing points</li>
          <li><span className="check">✓</span>Personalized plan from a vetted SAT tutor</li>
          <li><span className="check">✓</span>100% online — fits around school &amp; sports</li>
          <li><span className="check">✓</span>Finite 12-week program with a clear endpoint</li>
        </ul>

        <div style={{ marginTop: 26 }}>
          <button className="btn btn-cream" onClick={start}>
            See his score potential <span className="arrow">→</span>
          </button>
          <p style={{ fontSize: 11, lineHeight: 1.5, color: 'rgba(255,255,255,0.55)', marginTop: 12, textAlign: 'center' }}>
            Free assessment · No account needed · 2 minutes
          </p>
        </div>
      </section>

      <VBFooter />
    </div>
  );
}

function BloomBar({ label, value, pct, color, highlight }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
      <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, color, fontSize: 13 }}>{value}</div>
      <div style={{
        width: '100%', height: `${pct}%`, background: color,
        boxShadow: highlight ? `0 0 0 3px var(--green-soft)` : undefined,
      }} />
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em',
        color: 'var(--ink-mid)', textAlign: 'center', lineHeight: 1.3, marginTop: 4,
      }}>{label}</div>
    </div>
  );
}

function WeekProgress() {
  const weeks = ['Wk 2-3', 'Wk 4-5', 'Wk 6-7', 'Wk 8-9', 'Wk 10-11'];
  return (
    <div style={{ padding: '14px 16px', borderTop: '1px dashed rgba(20,20,20,0.15)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginBottom: 8 }}>
        {weeks.map((w, i) => (
          <div key={i} style={{
            border: '1px solid rgba(20,20,20,0.15)', padding: '4px 6px',
            fontFamily: 'var(--mono)', fontSize: 10, textAlign: 'center',
            color: 'var(--ink-mid)',
          }}>{w}</div>
        ))}
      </div>
      <div style={{ height: 3, background: 'rgba(20,20,20,0.1)', position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', background: 'var(--accent)' }} />
      </div>
      <div className="num-badge" style={{ textAlign: 'center', marginTop: 8 }}>12-WEEK PERSONALIZED PLAN</div>
    </div>
  );
}

window.VariantB2 = VariantB2;
