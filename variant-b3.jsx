// Variant B3 family — Lean Hims-density (8 sections) with 3 hero hooks.
// All three variants share an identical body (sections 2-8). Only the hero changes.
//   B3a — Problem hook ("High GPA. Low SAT. Fixable.")
//   B3b — Results hook ("+182 points. 12 weeks.")
//   B3c — Authority hook ("Built on College Board data.")

// ─────────────────────────────────────────────────────────
// HERO A — Problem / empathy hook
// ─────────────────────────────────────────────────────────
function B3HeroProblem({ onStart }) {
  return (
    <>
      <section className="section" style={{ paddingTop: 14, paddingBottom: 22 }}>
        <h1 style={{ fontSize: 40, lineHeight: 1.02 }}>
          High GPA.<br/>Low SAT.<br/><span className="accent">Fixable.</span>
        </h1>

        <ul className="checklist" style={{ marginTop: 22 }}>
          <li><span className="check">✓</span>Diagnose the 5 gaps costing points</li>
          <li><span className="check">✓</span>Personalized 12-week plan</li>
          <li><span className="check">✓</span>1:1 vetted SAT tutor</li>
        </ul>
      </section>

      <div style={{ padding: '0 22px 14px' }}>
        <VBHeroCTA
          copy="Tell us about your son for a personalized SAT plan."
          cta="Get started"
          onClick={onStart}
        />
      </div>

      <div style={{ padding: '8px 22px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <div className="img-ph" style={{ aspectRatio: '3/4' }}>STUDENT PHOTO 1</div>
          <div className="img-ph dark" style={{ aspectRatio: '3/4' }}>STUDENT PHOTO 2</div>
        </div>
        <p className="disclaimer" style={{ marginTop: 10 }}>
          *Based on average gains across the last 95 completed plans. Individual results vary.
        </p>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// HERO B — Results / outcomes hook
// ─────────────────────────────────────────────────────────
function B3HeroResults({ onStart }) {
  return (
    <>
      <section className="section" style={{ paddingTop: 14, paddingBottom: 22 }}>
        <h1 style={{ fontSize: 38, lineHeight: 1.02 }}>
          <span className="accent">+182 points.</span>
          <br/>12 weeks.<br/>One plan.
        </h1>

        <ul className="checklist" style={{ marginTop: 22 }}>
          <li><span className="check">✓</span>4.5× the College Board avg gain*</li>
          <li><span className="check">✓</span>78% of students hit their target</li>
          <li><span className="check">✓</span>1:1 vetted SAT tutor</li>
        </ul>
      </section>

      <div style={{ padding: '0 22px 14px' }}>
        <VBHeroCTA
          copy="Tell us about your son. We'll build a plan to hit his target."
          cta="Get started"
          onClick={onStart}
        />
      </div>

      <div style={{ padding: '8px 22px 18px' }}>
        <VBStatRow items={[
          { num: "95+", lbl: "PLANS BUILT" },
          { num: "182", lbl: "AVG PTS", accent: true },
          { num: "78%", lbl: "HIT TARGET" },
        ]} />
        <p className="disclaimer" style={{ marginTop: 10 }}>
          *Across last 95 completed plans. Individual results vary.
        </p>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// HERO C — Authority / credibility hook
// ─────────────────────────────────────────────────────────
function B3HeroAuthority({ onStart }) {
  return (
    <>
      <section className="section" style={{ paddingTop: 14, paddingBottom: 22 }}>
        <div className="num-badge" style={{ marginBottom: 12, letterSpacing: '0.15em' }}>
          BACKED BY COLLEGE BOARD DATA
        </div>
        <h1 style={{ fontSize: 36, lineHeight: 1.04 }}>
          The SAT plan built on<br/><span className="accent">250,000+</span> student scores.
        </h1>

        <ul className="checklist" style={{ marginTop: 22 }}>
          <li><span className="check">✓</span>Diagnostic across all 28 SAT skills</li>
          <li><span className="check">✓</span>Personalized 12-week plan</li>
          <li><span className="check">✓</span>1:1 vetted SAT tutor</li>
        </ul>
      </section>

      <div style={{ padding: '0 22px 14px' }}>
        <VBHeroCTA
          copy="Tell us about your son for a personalized, data-driven SAT plan."
          cta="Get started"
          onClick={onStart}
        />
      </div>

      <div style={{ padding: '8px 22px 32px' }}>
        <div className="img-ph wide" style={{ aspectRatio: '16/10' }}>
          DIAGNOSTIC<br/>VISUAL
        </div>
        <p className="disclaimer" style={{ marginTop: 10 }}>
          *Aggregate score-improvement data from public College Board reports.
        </p>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// SHARED BODY — sections 2-8 (identical across all 3 variants)
// ─────────────────────────────────────────────────────────
function B3Body({ onStart }) {
  const start = onStart || (() => {});
  return (
    <>
      {/* 2 · Science */}
      <section className="section bg-paper" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Diagnostic-driven plan</h2>

        <div className="img-ph" style={{ aspectRatio: '4/3', marginBottom: 18 }}>DIAGNOSTIC VISUAL</div>

        <p style={{ fontSize: 15, lineHeight: 1.5, marginBottom: 14 }}>
          The SAT tests 28 skills. Most students lose points on the same 5.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.5, marginBottom: 22 }}>
          We diagnose them. Then we drill them.
        </p>

        <VBCTA label="Get started" onClick={start} />
      </section>

      {/* 3 · Great news */}
      <section className="section">
        <h2 style={{ marginBottom: 6 }}>
          <span className="muted">Good news:</span> a stronger score is in his future.
        </h2>
        <p className="lead" style={{ marginBottom: 18 }}>
          Find the right plan for your son — built by a vetted SAT tutor.
        </p>

        <div style={{ position: 'relative' }}>
          <div className="img-ph" style={{ aspectRatio: '4/5' }}>
            STUDENT PHOTO<br/>(SAT IMPROVEMENT)
          </div>
          <div style={{
            position: 'absolute', left: 18, top: 18,
            background: 'rgba(20,20,20,0.85)', color: 'white',
            padding: '10px 14px', fontWeight: 700, fontSize: 15, maxWidth: 200,
          }}>
            Explore SAT plans through illuminairy
          </div>
          <button
            onClick={start}
            style={{
              position: 'absolute', left: 18, bottom: 18,
              background: 'var(--paper)', color: 'var(--ink)',
              border: 'none', padding: '12px 20px',
              fontFamily: 'var(--display)', fontWeight: 700, fontSize: 14,
              borderRadius: 999, cursor: 'pointer',
            }}>
            Start illuminairy →
          </button>
        </div>

        <p className="disclaimer" style={{ marginTop: 12 }}>
          *Requires diagnostic assessment. SAT plans built by vetted tutors. Restrictions apply.
        </p>
      </section>

      {/* 4 · What's included */}
      <section className="section bg-cream">
        <h2 style={{ marginBottom: 22 }}>What's included</h2>

        <div className="img-ph" style={{ aspectRatio: '1/1', marginBottom: 22, maxWidth: 220, marginLeft: 'auto', marginRight: 'auto' }}>
          PROGRAM<br/>MOCKUP
        </div>

        <div className="col" style={{ background: 'transparent', gap: 8 }}>
          {[
            "Diagnostic across 28 skills",
            "Personalized 12-week plan",
            "1:1 vetted SAT tutor",
            "Weekly progress dashboard",
            "Unlimited tutor messaging",
            "100% online",
          ].map((t, i) => (
            <div key={i} style={{
              background: 'var(--paper)', padding: '14px 16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderRadius: 4,
            }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{t}</span>
              <svg width="18" height="18" viewBox="0 0 22 22"><path d="M5 11.5l4 4L17 7" stroke="#141414" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22 }}>
          <VBCTA label="Get started" onClick={start} />
        </div>
      </section>

      {/* 5 · Reviews */}
      <section className="section flush">
        <div className="section-inner">
          <h2 style={{ marginBottom: 22 }}>
            Parents are seeing the score jump.
          </h2>
        </div>
        <div className="carousel">
          <B3LeanReview before="1180" after="1410" name="David D."
            quote="12 weeks, +230 points. The diagnostic was the difference." />
          <B3LeanReview before="1080" after="1290" name="Priya S."
            quote="Khan and a group class missed the speed problem. illuminairy didn't." />
          <B3LeanReview before="1240" after="1430" name="Tom B."
            quote="A plan that ends. That mattered. +190 points." />
        </div>
        <div className="section-inner" style={{ marginTop: 18 }}>
          <VBCTA label="Get started" onClick={start} />
          <p className="disclaimer" style={{ marginTop: 12 }}>
            Before/after scores shared by parents. Individual results vary.
          </p>
        </div>
      </section>

      {/* 6 · How it works */}
      <section className="section bg-paper">
        <h2 style={{ marginBottom: 22 }}>How it works</h2>
        <div className="col">
          <B3LeanStep title="Take the assessment" desc="GPA, target score, prior prep." time="2 min" phLabel="QUIZ" />
          <B3LeanStep title="Skill diagnostic" desc="Map the 5 gaps costing points." time="Instant" phLabel="DIAGNOSE" />
          <B3LeanStep title="Get the 12-week plan" desc="Built around the gaps that matter." time="Same day" phLabel="PLAN" />
          <B3LeanStep title="1:1 tutor + support" desc="Weekly sessions. Text in between." time="12 weeks" phLabel="TUTOR" />
        </div>
      </section>

      {/* 7 · All about you / final CTA */}
      <section className="section bg-ink">
        <h2 style={{ color: 'white', marginBottom: 22 }}>
          Your son's score, his plan, his pace.
        </h2>
        <ul className="checklist on-dark" style={{ marginBottom: 22 }}>
          <li><span className="check">✓</span>Fix the gaps. Not all 28 skills.</li>
          <li><span className="check">✓</span>Personalized by a vetted tutor</li>
          <li><span className="check">✓</span>100% online — no office required</li>
        </ul>
        <button className="btn btn-cream" onClick={start}>
          Get started <span className="arrow">→</span>
        </button>
      </section>

      {/* 8 · Footer */}
      <VBFooter />
    </>
  );
}

function B3LeanReview({ before, after, name, quote }) {
  return (
    <div className="review" style={{ paddingTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '0 18px 4px' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mid)' }}>{before}</span>
        <span style={{ color: 'var(--ink-mute)' }}>→</span>
        <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, color: 'var(--green)', fontSize: 18, letterSpacing: '-0.01em' }}>{after}</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', letterSpacing: '0.1em' }}>✓ VERIFIED</span>
      </div>
      <div className="quote" style={{ paddingTop: 12, fontSize: 15 }}>"{quote}"</div>
      <div className="who">
        <div className="ava">{name[0]}</div>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{name}</div>
      </div>
    </div>
  );
}

function B3LeanStep({ title, desc, time, phLabel }) {
  return (
    <div className="step">
      <div>
        <div className="step-title">{title}</div>
        <div className="step-desc">{desc}</div>
        <div className="step-time">{time}</div>
      </div>
      <div className="img-ph step-img" style={{ aspectRatio: 'auto', height: 70 }}>{phLabel}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Variant compositions — each accepts `brand` (apply Aurora brand theme),
// `mode` ('light' | 'dark', only meaningful when brand is true), and
// `displayFont` (cormorant | fraunces | dm-serif | bricolage).
// ─────────────────────────────────────────────────────────
function brandClass(brand, mode) {
  if (!brand) return 'il-page';
  return 'il-page il-brand' + (mode === 'light' ? ' light' : '');
}

function VariantB3a({ onStart, brand = false, mode = 'dark', displayFont }) {
  return (
    <div className={brandClass(brand, mode)} data-display={brand ? displayFont : undefined}>
      <VBHeader />
      <B3HeroProblem onStart={onStart} />
      <B3Body onStart={onStart} />
    </div>
  );
}
function VariantB3b({ onStart, brand = false, mode = 'dark', displayFont }) {
  return (
    <div className={brandClass(brand, mode)} data-display={brand ? displayFont : undefined}>
      <VBHeader />
      <B3HeroResults onStart={onStart} />
      <B3Body onStart={onStart} />
    </div>
  );
}
function VariantB3c({ onStart, brand = false, mode = 'dark', displayFont }) {
  return (
    <div className={brandClass(brand, mode)} data-display={brand ? displayFont : undefined}>
      <VBHeader />
      <B3HeroAuthority onStart={onStart} />
      <B3Body onStart={onStart} />
    </div>
  );
}

// Backwards-compat: keep existing VariantB3 import working
function VariantB3(props) { return <VariantB3b {...props} />; }

window.VariantB3 = VariantB3;
window.VariantB3a = VariantB3a;
window.VariantB3b = VariantB3b;
window.VariantB3c = VariantB3c;
