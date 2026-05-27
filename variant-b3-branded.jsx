// Variant B3 — Branded (Aurora) — supports `mode="dark" | "light"`
function VariantB3Branded({ onStart, mode = 'dark' }) {
  const start = onStart || (() => {});

  return (
    <div className={"il-page il-brand" + (mode === 'light' ? ' light' : '')}>
      {/* Top bar */}
      <div className="top-bar">
        <div className="wordmark">Illuminairy</div>
      </div>

      {/* ───────── HERO ───────── */}
      <section className="section brand-aurora-bg" style={{ paddingTop: 14, paddingBottom: 28 }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>Premium SAT Mentorship</div>

        <h1 style={{ fontSize: 44, lineHeight: 1.02 }}>
          From confusion<br/>to <em>clarity</em>.
        </h1>

        <p className="lead" style={{ marginTop: 22 }}>
          A guided 12-week SAT score recovery, led by a luminary tutor — for students who want to <em>truly understand</em> the test.
        </p>

        <ul className="checklist" style={{ marginTop: 22 }}>
          <li><span className="check">✓</span>The few skills costing him points, mapped</li>
          <li><span className="check">✓</span>1:1 with a luminary tutor</li>
          <li><span className="check">✓</span>A finite plan with a clear endpoint</li>
        </ul>
      </section>

      <div style={{ padding: '0 22px 18px' }}>
        <div className="hero-cta">
          <div className="copy">
            Tell us about your son — we'll match him with a luminary.
          </div>
          <button className="btn" onClick={start}>find your luminary →</button>
        </div>
      </div>

      {/* Image strip */}
      <div style={{ padding: '8px 22px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div className="img-ph" style={{ aspectRatio: '3/4' }}>STUDENT · BEFORE</div>
          <div className="img-ph dark" style={{ aspectRatio: '3/4' }}>STUDENT · AFTER</div>
        </div>
        <p className="disclaimer" style={{ marginTop: 12 }}>
          Average gain of 182 points across last 95 completed journeys. Individual results vary.
        </p>
      </div>

      <Constellation />

      {/* ───────── 2 · SCIENCE ───────── */}
      <section className="section bg-paper" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>The Diagnostic</div>
        <h2 style={{ marginBottom: 16 }}>
          We <em>illuminate</em> what's costing him points.
        </h2>

        <div className="img-ph" style={{ aspectRatio: '4/3', marginBottom: 22 }}>DIAGNOSTIC · LIGHT</div>

        <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 14, color: 'rgba(245,248,250,0.78)' }}>
          The SAT tests 28 skills. He's losing points on the same five.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 24, color: 'rgba(245,248,250,0.78)' }}>
          We map them. Then we guide him through them.
        </p>

        <VBCTA label="begin the journey" onClick={start} />
      </section>

      {/* ───────── 3 · GREAT NEWS ───────── */}
      <section className="section">
        <div className="eyebrow" style={{ marginBottom: 12 }}>The Promise</div>
        <h2 style={{ marginBottom: 8 }}>
          <em>Brilliance is a guided path</em>, not a destination.
        </h2>
        <p className="lead" style={{ marginBottom: 22 }}>
          Find the luminary who'll lead him there.
        </p>

        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
          <div className="img-ph" style={{ aspectRatio: '4/5' }}>
            LUMINARY · PORTRAIT<br/>(NIGHT-SKY MOOD)
          </div>
          <div style={{
            position: 'absolute', left: 18, top: 18,
            background: 'rgba(18,26,43,0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: 'white',
            padding: '10px 16px',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 16, maxWidth: 220,
            border: '1px solid rgba(119,200,154,0.2)',
            borderRadius: 8,
          }}>
            Step into mentorship.
          </div>
          <button
            onClick={start}
            style={{
              position: 'absolute', left: 18, bottom: 18,
              background: 'var(--brand-celestial)',
              color: 'white', border: 'none', padding: '11px 24px',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 12,
              letterSpacing: '0.12em', textTransform: 'lowercase',
              borderRadius: 100, cursor: 'pointer',
            }}>
            start illuminairy →
          </button>
        </div>

        <p className="disclaimer" style={{ marginTop: 14 }}>
          Tutors are vetted experts in the digital SAT. Restrictions apply.
        </p>
      </section>

      <Constellation />

      {/* ───────── 4 · WHAT'S INCLUDED ───────── */}
      <section className="section bg-cream">
        <div className="eyebrow" style={{ marginBottom: 14 }}>The Programme</div>
        <h2 style={{ marginBottom: 22 }}>
          What the <em>journey</em> includes
        </h2>

        <div className="img-ph" style={{
          aspectRatio: '1/1', marginBottom: 24,
          maxWidth: 220, marginLeft: 'auto', marginRight: 'auto', borderRadius: 16,
        }}>
          PROGRAMME · ARTEFACT
        </div>

        <div className="col" style={{ background: 'transparent', gap: 6 }}>
          {[
            "Diagnostic of all 28 SAT skills",
            "Personalized 12-week journey",
            "1:1 luminary tutor",
            "Weekly progress dashboard",
            "Unlimited messaging access",
            "100% online — your home, your hours",
          ].map((t, i) => (
            <div key={i} className="row-item">
              <span className="label">{t}</span>
              <svg width="14" height="14" viewBox="0 0 22 22">
                <path d="M5 11.5l4 4L17 7" stroke="#77C89A" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 26 }}>
          <VBCTA label="find your luminary" onClick={start} />
        </div>
      </section>

      {/* ───────── 5 · REVIEWS ───────── */}
      <section className="section flush">
        <div className="section-inner">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Voices on the Path</div>
          <h2 style={{ marginBottom: 22 }}>
            <em>Stories</em> from the journey.
          </h2>
        </div>
        <div className="carousel">
          <BrandReview before="1180" after="1410" name="David D."
            quote="The diagnostic alone changed things. By October, Max was up 230 — and he understood why." />
          <BrandReview before="1080" after="1290" name="Priya S."
            quote="Khan and a group class missed what was really wrong. Her luminary saw it within the first session." />
          <BrandReview before="1240" after="1430" name="Tom B."
            quote="A path that ended where it promised. +190 points. No more anxious open-ended tutoring." />
        </div>
        <div className="section-inner" style={{ marginTop: 22 }}>
          <VBCTA label="find your luminary" onClick={start} />
          <p className="disclaimer" style={{ marginTop: 14 }}>
            Stories shared by parents. Individual results vary.
          </p>
        </div>
      </section>

      <Constellation />

      {/* ───────── 6 · HOW IT WORKS ───────── */}
      <section className="section bg-paper">
        <div className="eyebrow" style={{ marginBottom: 14 }}>The Path</div>
        <h2 style={{ marginBottom: 24 }}>
          How the journey unfolds
        </h2>
        <div className="col">
          <BrandStep title="Tell us about him" desc="A short, calm assessment." time="2 minutes" phLabel="ASSESSMENT" />
          <BrandStep title="His gaps, illuminated" desc="The five skills costing him points, mapped." time="Instant" phLabel="DIAGNOSTIC" />
          <BrandStep title="A guided 12-week plan" desc="Built around his gaps. With an endpoint." time="Delivered same day" phLabel="PROGRAMME" />
          <BrandStep title="Matched with a luminary" desc="Weekly 1:1 sessions. Unlimited messages." time="12 weeks" phLabel="LUMINARY" />
        </div>
      </section>

      {/* ───────── 7 · FINAL CTA ───────── */}
      <section className="section bg-ink">
        <div className="eyebrow" style={{ marginBottom: 14 }}>The Walk Away</div>
        <h2 style={{ marginBottom: 22 }}>
          His path. His pace.<br/><em>Illuminated</em>.
        </h2>

        <ul className="checklist on-dark" style={{ marginBottom: 28 }}>
          <li><span className="check">✓</span>Calm guidance through complexity</li>
          <li><span className="check">✓</span>One luminary, personally matched</li>
          <li><span className="check">✓</span>A finite path with a clear endpoint</li>
        </ul>

        <button className="btn" onClick={start}>
          find your luminary →
        </button>
        <p className="disclaimer" style={{ textAlign: 'center', marginTop: 14 }}>
          Free · 2 minutes · No account needed
        </p>
      </section>

      <VBFooter />
    </div>
  );
}

// Constellation separator — used between sections as ornament
function Constellation() {
  return (
    <div className="constellation" aria-hidden="true">
      <span className="line"></span>
      <span className="dot"></span>
      <span className="dot big"></span>
      <span className="dot"></span>
      <span className="line"></span>
    </div>
  );
}

function BrandReview({ before, after, name, quote }) {
  return (
    <div className="review" style={{ paddingTop: 14 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '0 18px 0' }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(188,195,204,0.6)', letterSpacing: '0.15em' }}>{before}</span>
        <span style={{ color: 'rgba(119,200,154,0.5)', fontSize: 12 }}>→</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--brand-aurora)', fontSize: 22, letterSpacing: 0 }}>{after}</span>
        <span style={{ marginLeft: 'auto', fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--brand-aurora)', letterSpacing: '0.2em', opacity: 0.7 }}>VERIFIED</span>
      </div>
      <div className="quote">"{quote}"</div>
      <div className="who">
        <div className="ava">{name[0]}</div>
        <div className="name">{name}</div>
      </div>
    </div>
  );
}

function BrandStep({ title, desc, time, phLabel }) {
  return (
    <div className="step" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 6 }}>
      <div className="step-title">{title}</div>
      <div className="step-desc">{desc}</div>
      <div className="step-time">{time}</div>
    </div>
  );
}

window.VariantB3Branded = VariantB3Branded;
