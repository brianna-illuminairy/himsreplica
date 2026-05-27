// Quiz funnel — Summary → Science → Stats → Authority screens (S1–S4).
// Steps 15–18.

// ─────────────────────────────────────────────────────────────
// S1 · SUMMARY OF INPUTS (step 15) — "here's what we heard"
// ─────────────────────────────────────────────────────────────
function QFS1Summary({ inputs, onContinue = () => {} }) {
  const data = inputs || {
    grade: '11th grade',
    testDate: 'October 3, 2026',
    timesTaken: 'Once before',
    current: 1260,
    target: 1450,
    gpa: '3.8 – 4.0',
    colleges: 'Top 25 schools',
    deadline: 'Early Action · Nov 1',
    tried: 'Khan Academy + group class',
    worry: 'Math accuracy, pacing',
  };
  const rows = [
    { lbl: 'Grade',          val: data.grade },
    { lbl: 'Test date',      val: data.testDate, hot: true },
    { lbl: 'Sittings so far',val: data.timesTaken },
    { lbl: 'Current score',  val: data.current,  mono: true },
    { lbl: 'Target score',   val: data.target,   mono: true, accent: true },
    { lbl: 'GPA',            val: data.gpa,      mono: true },
    { lbl: 'Target schools', val: data.colleges },
    { lbl: 'Deadline',       val: data.deadline, hot: true },
    { lbl: 'Tried',          val: data.tried },
    { lbl: 'Biggest gaps',   val: data.worry },
  ];
  return (
    <QFScreen
      stepIdx={14}
      footer={<QFButton kind="forest" onClick={onContinue}>That's right</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">
          Here's what we <em>heard</em>.
        </h1>
        <p className="qf-lead">
          Quick check before we build the plan. Anything off? Tap a row to edit.
        </p>

        <div className="qf-card" style={{ padding: 0, overflow: 'hidden' }}>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 18px',
              borderTop: i === 0 ? 'none' : '1px solid var(--qf-line)',
            }}>
              <span style={{
                fontFamily: 'var(--qf-mono)', fontSize: 10, letterSpacing: '0.2em',
                color: 'var(--qf-ink-mute)', textTransform: 'uppercase',
              }}>{r.lbl}</span>
              <span style={{
                fontFamily: r.mono ? 'var(--qf-display)' : 'var(--qf-body)',
                fontWeight: r.mono ? 500 : 500,
                fontSize: r.mono ? 18 : 14,
                color: r.accent ? 'var(--qf-forest)' : r.hot ? 'var(--qf-amber)' : 'var(--qf-ink)',
                textAlign: 'right', maxWidth: '60%',
              }}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// S2 · SCIENCE / METHOD (step 16) — how the system works
// ─────────────────────────────────────────────────────────────
function QFS2Science({ onContinue = () => {} }) {
  return (
    <QFScreen
      stepIdx={15}
      ornament="glow"
      footer={<QFButton kind="forest" onClick={onContinue}>Show me the data</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">
          The SAT is <em>fixable</em> — if you stop drilling everything.
        </h1>

        <div className="gap-14">
          {[
            {
              n: '01',
              title: 'Diagnose',
              desc: 'A 60-min skill check across all 28 SAT skills. We map exactly where points are leaking.',
              meta: '~60 min · 1:1',
            },
            {
              n: '02',
              title: 'Prioritize + Plan',
              desc: 'We rank their gaps by point-impact and build a week-by-week plan. Most students gain 80% of their score from fixing just 5 skills.',
              meta: 'Same-day plan',
            },
            {
              n: '03',
              title: 'Tutor',
              desc: 'Twice-weekly 1:1 sessions on the prioritized skills with a vetted SAT tutor. Text-in between sessions.',
              meta: 'Until test date',
            },
            {
              n: '04',
              title: 'Progress reports',
              desc: 'Weekly progress reports and bi-weekly section retests confirm the gap is closing. We pivot if it isn\'t.',
              meta: 'Weekly · retests every 2 wks',
            },
          ].map(s => (
            <div key={s.n} className="qf-card" style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, alignItems: 'start',
            }}>
              <div style={{
                fontFamily: 'var(--qf-display)', fontSize: 28, color: 'var(--qf-forest)',
                fontWeight: 500, lineHeight: 1, minWidth: 38,
              }}>{s.n}</div>
              <div>
                <div style={{
                  fontFamily: 'var(--qf-display)', fontSize: 19, fontWeight: 500,
                  letterSpacing: '-0.01em', marginBottom: 4,
                }}>{s.title}</div>
                <div style={{ fontSize: 14, color: 'var(--qf-ink-2)', lineHeight: 1.5 }}>{s.desc}</div>
                <div className="qf-meta" style={{ marginTop: 8, color: 'var(--qf-forest)' }}>{s.meta}</div>
              </div>
            </div>
          ))}
        </div>

        <QFConstellation />
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// S3 · STATS / EFFICACY (step 17)
// ─────────────────────────────────────────────────────────────
function QFS3Stats({ onContinue = () => {} }) {
  return (
    <QFScreen
      stepIdx={16}
      tone="bg-2"
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">
          <em>4.5×</em> the gain of average SAT prep.
        </h1>
        <p className="qf-lead">
          The College Board's published avg gain on retest is +40 points. Our students average +182 across the last 95 completed plans.
        </p>

        {/* Comparison bars */}
        <div className="qf-card" style={{ padding: 20 }}>
          {[
            { lbl: 'Self-study',         val: 12,  color: 'rgba(20,32,46,0.18)' },
            { lbl: 'Khan Academy',       val: 25,  color: 'rgba(20,32,46,0.28)' },
            { lbl: 'College Board avg',  val: 40,  color: 'rgba(20,32,46,0.45)' },
            { lbl: 'Private tutor (avg)',val: 70,  color: 'rgba(20,32,46,0.65)' },
            { lbl: 'illuminairy',        val: 182, color: 'var(--qf-forest)', hot: true },
          ].map((b, i) => {
            const max = 182;
            const widthPct = (b.val / max) * 100;
            return (
              <div key={i} style={{ marginBottom: i === 4 ? 0 : 14 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  marginBottom: 6,
                }}>
                  <span style={{
                    fontSize: 12, fontWeight: b.hot ? 600 : 500,
                    color: b.hot ? 'var(--qf-forest)' : 'var(--qf-ink-2)',
                  }}>{b.lbl}</span>
                  <span style={{
                    fontFamily: 'var(--qf-display)',
                    fontWeight: 500,
                    fontSize: b.hot ? 22 : 16,
                    color: b.hot ? 'var(--qf-forest)' : 'var(--qf-ink-mid)',
                    letterSpacing: '-0.01em',
                  }}>+{b.val}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(20,32,46,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    width: `${widthPct}%`, height: '100%', background: b.color,
                    borderRadius: 4, transition: 'width 0.4s',
                  }} />
                </div>
              </div>
            );
          })}
          <div className="qf-meta" style={{ marginTop: 14, textAlign: 'right' }}>Avg point gain · retake</div>
        </div>

        <div className="qf-stats">
          <div className="stat"><div className="num">95</div><div className="lbl">Plans completed</div></div>
          <div className="stat"><div className="num accent">+182</div><div className="lbl">Avg points gained</div></div>
          <div className="stat"><div className="num">78%</div><div className="lbl">Hit target</div></div>
        </div>

        <p className="qf-disclaimer">
          Comparison data: College Board public retake reports + 95 completed illuminairy plans through Q1 2026. Self-study and tutor averages from published Princeton Review / ACT Inc. studies. Individual results vary.
        </p>
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// S4 · AUTHORITY / SUPPORT (step 18)
// ─────────────────────────────────────────────────────────────
function QFS4Authority({ onContinue = () => {} }) {
  const tutors = [
    { name: 'Maya R.', cred: 'Yale · 1580 SAT', subj: 'Math + science', yrs: '8 yrs' },
    { name: 'Daniel K.', cred: 'Princeton · 1570 SAT', subj: 'Reading + writing', yrs: '6 yrs' },
    { name: 'Priya V.', cred: 'MIT · 1590 SAT', subj: 'Math + pacing', yrs: '5 yrs' },
  ];
  return (
    <QFScreen
      stepIdx={17}
      footer={<QFButton kind="forest" onClick={onContinue}>I'm ready</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">
          Vetted tutors. <em>One kid</em> at a time.
        </h1>
        <p className="qf-lead">
          Every illuminairy tutor scored in the top 1% of the SAT and has 5+ years coaching it. We match by gap profile, not by who's free.
        </p>

        {/* Tutor cards */}
        <div className="gap-10">
          {tutors.map((t, i) => (
            <div key={i} className="qf-card" style={{
              display: 'grid', gridTemplateColumns: '52px 1fr',
              gap: 14, alignItems: 'center', padding: 14,
            }}>
              <div className="qf-img-ph" style={{ aspectRatio: '1/1', borderRadius: '50%' }}>{t.name.split(' ').map(p=>p[0]).join('')}</div>
              <div>
                <div style={{ fontFamily: 'var(--qf-display)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em' }}>
                  {t.name}
                </div>
                <div style={{ fontSize: 13, color: 'var(--qf-ink-mid)', marginTop: 2 }}>{t.cred}</div>
                <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
                  <span className="qf-meta">{t.subj}</span>
                  <span className="qf-meta" style={{ color: 'var(--qf-forest)' }}>{t.yrs}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="qf-card wash" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, padding: 0 }}>
          {[
            ['Top 1%', 'SAT-scored tutors'],
            ['Background', 'Checked annually'],
            ['Replaceable', 'Free re-match'],
          ].map(([a, b], i) => (
            <div key={i} style={{
              padding: '16px 8px', textAlign: 'center',
              borderRight: i < 2 ? '1px solid rgba(32,80,64,0.15)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--qf-display)', fontSize: 16, color: 'var(--qf-forest)',
                fontWeight: 500, letterSpacing: '-0.01em',
              }}>{a}</div>
              <div className="qf-meta" style={{ marginTop: 4, color: 'var(--qf-forest)' }}>{b}</div>
            </div>
          ))}
        </div>

        {/* Press placeholder */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'space-around', opacity: 0.55, paddingTop: 4 }}>
          {['FORBES', 'WSJ', 'EDSURGE'].map(l => (
            <div key={l} style={{
              fontFamily: 'var(--qf-mono)', fontSize: 10, letterSpacing: '0.25em',
              color: 'var(--qf-ink-mute)', fontWeight: 600,
            }}>{l}</div>
          ))}
        </div>
        <p className="qf-disclaimer center" style={{ textAlign: 'center' }}>
          Press placeholders · replace with real coverage.
        </p>
      </div>
    </QFScreen>
  );
}

window.QFS1Summary = QFS1Summary;
window.QFS2Science = QFS2Science;
window.QFS3Stats = QFS3Stats;
window.QFS4Authority = QFS4Authority;
