// Quiz funnel — Summary → Science → Stats → Authority screens (S1–S4).
// Method + proof copy synced from production /satplan (localhost:3000).

// ─────────────────────────────────────────────────────────────
// S1 · SUMMARY — ranges only (what the quiz actually captured)
// ─────────────────────────────────────────────────────────────
function QFS1Summary({ inputs, onContinue = () => {} }) {
  const data = inputs || {
    testDate: 'October 3',
    timesTaken: 'Once before',
    currentRange: '1200–1300',
    goalRange: '1450+',
    gap: '~150+ points',
    gpaRange: '3.8–4.0',
    tried: 'Khan / Bluebook',
    blockers: 'Math · No clear plan',
  };

  const rows = [
    { lbl: 'Test date', val: data.testDate },
    { lbl: 'Sittings', val: data.timesTaken },
    { lbl: 'Last scored', val: data.currentRange, strong: true },
    { lbl: 'Goal', val: data.goalRange, strong: true },
    { lbl: 'Gap', val: data.gap, gap: true },
    { lbl: 'GPA range', val: data.gpaRange },
    { lbl: 'Tried so far', val: data.tried },
    { lbl: 'Focus areas', val: data.blockers },
  ].filter(r => r.val && r.val !== '—');

  return (
    <QFScreen
      stepIdx={14}
      footer={<QFButton kind="forest" onClick={onContinue}>Next</QFButton>}
    >
      <div className="qf-summary-screen">
        <div className="qf-card qf-summary-card">
          {rows.map((r, i) => (
            <div
              key={r.lbl}
              className={'qf-summary-row' + (r.gap ? ' qf-summary-row--gap' : '')}
              style={{ borderTop: i === 0 ? 'none' : undefined }}
            >
              <span className="qf-summary-lbl">{r.lbl}</span>
              <span className={'qf-summary-val' + (r.strong ? ' qf-summary-val--strong' : '')}>
                {r.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// S2 · SCIENCE / METHOD (legacy — all 4 steps on one screen)
// Live funnel uses S15 / S16 / S17 instead (Flow A).
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
      footer={<QFButton kind="forest" onClick={onContinue}>Next</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">
          <em>+182</em> avg gain vs <em>+40</em> self-study.
        </h1>

        <div className="qf-card" style={{ padding: 20 }}>
          {[
            { lbl: 'Self-study', val: 40, color: 'rgba(20,32,46,0.30)' },
            { lbl: 'Group / course', val: 70, color: 'rgba(20,32,46,0.55)' },
            { lbl: 'illuminairy', val: 182, color: 'var(--qf-forest)', hot: true },
          ].map((b, i) => {
            const max = 182;
            const widthPct = (b.val / max) * 100;
            return (
              <div key={i} style={{ marginBottom: i === 2 ? 0 : 14 }}>
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
        </div>
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
      footer={<QFButton kind="forest" onClick={onContinue}>Next</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">Top 1% SAT <em>tutors</em>.</h1>

        <div className="qf-tutor-strip">
          {tutors.map((t, i) => (
            <div key={i} className="qf-tutor-face">
              <div className="qf-img-ph" style={{ aspectRatio: '1/1', borderRadius: '50%' }}>
                {t.name.split(' ').map(p => p[0]).join('')}
              </div>
              <span className="qf-tutor-name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// S15 · Diagnostic-driven plan (Flow A · method 1 of 3)
// ─────────────────────────────────────────────────────────────
function QFS15MethodPlan({ onContinue = () => {} }) {
  return (
    <QFScreen
      stepIdx={15}
      footer={<QFButton kind="forest" onClick={onContinue}>Next</QFButton>}
    >
      <div className="qf-method-screen">
        <h1 className="qf-h1">
          Test <em>28 skills</em>. Fix the top <em>5–6</em>.
        </h1>
        <div className="qf-method-flow" aria-hidden="true">
          <span className="qf-method-step">Diagnose</span>
          <span className="qf-method-arrow">→</span>
          <span className="qf-method-step">Rank</span>
          <span className="qf-method-arrow">→</span>
          <span className="qf-method-step">Plan</span>
        </div>
      </div>
    </QFScreen>
  );
}

// Session ladder — mirrors /satplan?step=prep-failed-mistake-driven
function QFMistakeGraphic({ skillLabel = 'Geometry: Right Triangles' }) {
  const rows = [
    { title: 'Tutor solves', badge: '1', kind: 'tutor' },
    { title: 'Tutor & student solve', badge: '2', kind: 'tutor' },
    { title: 'Student solves w/ hint', badge: '3', kind: 'ok' },
    { title: 'Student solves', badge: '4', kind: 'ok' },
    { title: 'Student practices', badge: '5', kind: 'ok', auto: true },
  ];
  return (
    <div className="qf-mistake-card" role="img" aria-label="One skill: tutor leads through practice">
      <div className="qf-mistake-banner" aria-hidden="true">
        <strong className="qf-mistake-banner-skill">{skillLabel}</strong>
      </div>
      <ol className="qf-mistake-ladder" aria-hidden="true">
        {rows.map(r => (
          <li
            key={r.title}
            className={'qf-mistake-row' + (r.auto ? ' qf-mistake-row--auto' : '')}
          >
            <div className="qf-mistake-row-copy"><strong>{r.title}</strong></div>
            <span className={'qf-mistake-badge qf-mistake-badge--' + r.kind}>{r.badge}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S16 · Mistake-driven learning (Flow A · method 2 of 3)
// ─────────────────────────────────────────────────────────────
function QFS16MethodMistake({ onContinue = () => {} }) {
  return (
    <QFScreen
      stepIdx={16}
      footer={<QFButton kind="forest" onClick={onContinue}>Next</QFButton>}
    >
      <div className="qf-diag-compact">
        <h1 className="qf-h1" style={{ marginBottom: 18 }}>
          Fix the <em>misses</em>, not the whole test.
        </h1>
        <QFMistakeGraphic />
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// S17 · 1-on-1 tutoring (Flow A · method 3 of 3)
// ─────────────────────────────────────────────────────────────
function QFS17MethodTutor({ onContinue = () => {} }) {
  return (
    <QFScreen
      stepIdx={17}
      footer={<QFButton kind="forest" onClick={onContinue}>Next</QFButton>}
    >
      <div className="qf-diag-compact">
        <h1 className="qf-h1">Live <em>1:1</em> until test day.</h1>
        <div className="qf-img-ph" style={{ aspectRatio: '4/3', marginTop: 22 }}>
          Tutor + student
        </div>
      </div>
    </QFScreen>
  );
}

window.QFS1Summary = QFS1Summary;
window.QFS2Science = QFS2Science;
window.QFMistakeGraphic = QFMistakeGraphic;
window.QFS15MethodPlan = QFS15MethodPlan;
window.QFS16MethodMistake = QFS16MethodMistake;
window.QFS17MethodTutor = QFS17MethodTutor;
window.QFS3Stats = QFS3Stats;
window.QFS4Authority = QFS4Authority;
