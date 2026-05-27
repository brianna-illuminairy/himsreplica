// Variant B1 — Problem-led long-form landing
// Opens with the pain ("smart kid, low SAT") → diagnostic science → outcomes → proof
// Tone: data-driven, results-oriented, confident.

function VariantB1({ onStart }) {
  const start = onStart || (() => {});
  return (
    <div className="il-page">
      <VBHeader />

      {/* ───────── HERO ───────── */}
      <section className="section" style={{ paddingTop: 18, paddingBottom: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <VBEyebrow>SAT prep that actually moves scores</VBEyebrow>
          <h1>Smart kid.<br/>Low SAT score.<br/><span className="accent">Fixable.</span></h1>
          <p className="lead">
            A diagnostic-driven 12-week plan for high-GPA students whose SAT
            score doesn't match their classroom performance.
          </p>

          <ul className="checklist" style={{ marginTop: 6 }}>
            <li><span className="check">✓</span>Diagnose the 5 skill gaps costing your son points</li>
            <li><span className="check">✓</span>Personalized 12-week plan, not endless tutoring</li>
            <li><span className="check">✓</span>Built on College Board data from 250,000+ students</li>
          </ul>
        </div>
      </section>

      {/* Hero CTA card */}
      <div style={{ padding: '0 22px 28px' }}>
        <VBHeroCTA
          copy="Tell us about your son for a personalized SAT score-improvement plan."
          cta="Build my son's plan"
          onClick={start}
        />
        <p className="disclaimer" style={{ marginTop: 12, textAlign: 'center' }}>
          Free · 2 minutes · No account needed
        </p>
      </div>

      {/* Hero image strip */}
      <div style={{ padding: '0 22px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <div className="img-ph" style={{ aspectRatio: '3/4' }}>STUDENT
            <br/>PHOTO 1</div>
          <div className="img-ph dark" style={{ aspectRatio: '3/4' }}>STUDENT
            <br/>PHOTO 2</div>
        </div>
      </div>

      {/* ───────── PROBLEM ───────── */}
      <section className="section bg-paper">
        <VBSectionHead
          eyebrow="The problem"
          title="Why high-GPA students underperform on the SAT"
          lead="A 3.9 GPA doesn't translate to a 1400 SAT. School rewards taking your time. The SAT rewards speed."
        />

        <div className="grid-2" style={{ marginTop: 8 }}>
          <div className="card cream tight">
            <div className="num-badge" style={{ marginBottom: 8 }}>IN SCHOOL</div>
            <div style={{ fontWeight: 800, fontSize: 18, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Rewards taking your time.
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li style={{ fontSize: 13, color: 'var(--ink-mute)' }}>Re-reading passages</li>
              <li style={{ fontSize: 13, color: 'var(--ink-mute)' }}>Showing work by hand</li>
              <li style={{ fontSize: 13, color: 'var(--ink-mute)' }}>Double checking</li>
              <li style={{ fontSize: 13, color: 'var(--ink-mute)' }}>Sticking with hard problems</li>
            </ul>
          </div>
          <div className="card dark tight">
            <div className="num-badge" style={{ marginBottom: 8, color: 'var(--accent)' }}>ON THE SAT</div>
            <div style={{ fontWeight: 800, fontSize: 18, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'white' }}>
              Rewards speed.
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Skimming passages</li>
              <li style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Calculator shortcuts</li>
              <li style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Moving on quickly</li>
              <li style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Recognizing patterns</li>
            </ul>
          </div>
        </div>

        <div className="card highlight" style={{ marginTop: 14, padding: 18 }}>
          <p style={{ fontSize: 14, lineHeight: 1.5 }}>
            The SAT is timed over <span style={{ color: 'var(--accent)', fontWeight: 700 }}>2hr 14 mins</span>, and tests
            <strong> focus, stamina, and speed.</strong> The same habits that earn A's in class quietly cost points on the SAT.
          </p>
        </div>
      </section>

      {/* ───────── SOLUTION / SCIENCE ───────── */}
      <section className="section">
        <VBSectionHead
          eyebrow="How we fix it"
          title="Diagnose first. Drill the gaps. Move the score."
          lead="The SAT tests 28 skills. Most students lose points on the same 5. We find them — then build a plan around them."
        />

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(20,20,20,0.08)' }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Sample diagnostic output</div>
            <div className="num-badge" style={{ marginTop: 4 }}>28 SKILL AREAS · 5 IMPACT AREAS FOUND</div>
          </div>
          <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { name: 'Right triangles & trig', tag: '+90 pts', tagColor: 'var(--accent)' },
              { name: 'Linear functions', tag: '+70 pts', tagColor: 'var(--accent)' },
              { name: 'Boundaries', tag: '+60 pts', tagColor: 'var(--accent)' },
              { name: 'Systems of equations', tag: '+40 pts', tagColor: 'var(--accent)' },
              { name: 'Transitions', tag: '+50 pts', tagColor: 'var(--accent)' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--accent-soft)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ink)' }} />
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
                </div>
                <span style={{ color: r.tagColor, fontWeight: 800, fontFamily: 'var(--mono)', fontSize: 13 }}>{r.tag}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(20,20,20,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="num-badge">PROJECTED · 12 WK</div>
            <div style={{ fontFamily: 'var(--mono)', fontWeight: 800, color: 'var(--green)' }}>1180 → 1380</div>
          </div>
        </div>

        <p className="lead" style={{ marginTop: 18 }}>
          A finite plan with a clear endpoint. Not endless drills. Not group classes
          teaching all 28 skills at the same pace.
        </p>

        <div style={{ marginTop: 18 }}>
          <VBCTA label="Build my son's plan" onClick={start} />
        </div>
      </section>

      {/* ───────── WHAT'S INCLUDED ───────── */}
      <section className="section bg-paper">
        <VBSectionHead
          eyebrow="What's included"
          title="A plan that actually ends."
          lead="12 weeks. One focused skill at a time. Built around your son's gaps."
        />

        <div className="img-ph wide" style={{ marginBottom: 14 }}>PRODUCT / PLAN MOCKUP</div>

        <div className="col" style={{ background: 'var(--paper)' }}>
          <VBIncludedRow label="Diagnostic across 28 SAT skills" />
          <VBIncludedRow label="Personalized 12-week plan" />
          <VBIncludedRow label="1:1 sessions with a vetted tutor" />
          <VBIncludedRow label="Weekly progress dashboard" />
          <VBIncludedRow label="Practice sets targeted to gaps" />
          <VBIncludedRow label="Unlimited text access to tutor" />
        </div>

        <div style={{ marginTop: 22 }}>
          <VBCTA label="Build my son's plan" onClick={start} />
        </div>
      </section>

      {/* ───────── SOCIAL PROOF ───────── */}
      <section className="section flush">
        <div className="section-inner">
          <VBSectionHead
            eyebrow="Parent reviews"
            title="+182 average points between retakes."
            lead="Hundreds of parents have used illuminairy to turn a low SAT into a competitive one."
          />
        </div>
        <div className="carousel">
          <VBReviewCard before="1180" after="1410" weeks="3" name="David D., parent of Max"
            initials="D"
            quote="The diagnostic alone was worth it. Within 2 weeks Max knew exactly what was costing him points. By the October test he was up 230." />
          <VBReviewCard before="1080" after="1290" weeks="3" name="Priya S., parent of Aanya"
            initials="P"
            quote="We tried Khan and a group class. Neither identified the speed problem. illuminairy did — and built a plan around it." />
          <VBReviewCard before="1240" after="1430" weeks="3" name="Tom B., parent of Jacob"
            initials="T"
            quote="A 3.8 GPA and a 1240 SAT. The mismatch was the problem. 12 weeks later he's competitive at every school on his list." />
        </div>
        <div className="section-inner" style={{ marginTop: 18 }}>
          <VBCTA label="Build my son's plan" onClick={start} />
          <p className="disclaimer" style={{ marginTop: 12 }}>
            Before/after scores shared by parents who completed the 12-week plan. Individual results vary. Average gain across the last 95 completed plans is 182 points.
          </p>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="section bg-cream">
        <VBSectionHead
          eyebrow="How it works"
          title="From assessment to score gain in 4 steps."
        />

        <div className="col">
          <VBStep n="01" title="Take the assessment"
            desc="Tell us about your son's GPA, recent score, target score, and prior prep."
            time="About 2 minutes"
            phLabel="PHONE/QUIZ" />
          <VBStep n="02" title="Skill diagnostic"
            desc="We map his answers to the 5 highest-impact skill gaps costing him points."
            time="Instant"
            phLabel="DIAGNOSTIC" />
          <VBStep n="03" title="Personalized 12-week plan"
            desc="A weekly schedule built around the gaps that matter — not all 28 skills."
            time="Delivered same day"
            phLabel="PLAN OUTPUT" />
          <VBStep n="04" title="1:1 tutor + ongoing support"
            desc="Matched with a vetted SAT tutor. Weekly sessions, unlimited text access in between."
            time="12 weeks"
            phLabel="TUTOR PHOTO" />
        </div>

        <div style={{ marginTop: 22 }}>
          <VBCTA label="Build my son's plan" onClick={start} />
        </div>
      </section>

      {/* ───────── FINAL CTA / VALUES ───────── */}
      <section className="section bg-ink">
        <VBSectionHead
          eyebrow="What you walk away with"
          title="Your son's score. His plan. His pace."
          lead="A finite, diagnostic-driven plan. Not endless tutoring. Not generic test prep."
          dark
        />

        <ul className="checklist on-dark" style={{ marginTop: 8 }}>
          <li><span className="check">✓</span>Diagnose &amp; fix the few skill gaps costing points</li>
          <li><span className="check">✓</span>Personalized plan from a vetted SAT tutor</li>
          <li><span className="check">✓</span>100% online — fits around school &amp; sports</li>
          <li><span className="check">✓</span>One focused skill at a time, not all 28</li>
        </ul>

        <div style={{ marginTop: 26 }}>
          <button className="btn btn-cream" onClick={start}>
            Build my son's plan <span className="arrow">→</span>
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

window.VariantB1 = VariantB1;
