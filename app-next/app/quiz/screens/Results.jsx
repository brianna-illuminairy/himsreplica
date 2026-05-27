'use client';
import { QFScreen, QFButton, QFQuestionHead, QFConstellation } from '../components/QFShell';

// ─── S1 · Summary of Inputs (Hims-style: no headline, sectioned card) ────────
export function QFS1Summary({ answers = {}, onContinue, onBack }) {
  const {
    q3 = 'sat-1', q4 = '1200-1300', q5 = 'oct3',
    q6 = ['math'], q7 = ['khan'], q8 = '1450', q9 = '3.8-4.0',
  } = answers;

  const Q4_LABEL = { 'u1000': 'Under 1100', '1100-1200': '1100–1200', '1200-1300': '1200–1300', '1300-1400': '1300–1400', '1400plus': '1400+' };
  const Q5_LABEL = { 'aug22': 'Aug 22, 2026', 'oct3': 'Oct 3, 2026', 'nov7': 'Nov 7, 2026', 'dec5': 'Dec 5, 2026', '2027': 'Spring 2027', 'tbd': 'TBD' };
  const Q3_LABEL = { 'sat-1': 'Once', 'sat-2': 'Twice', 'sat-3+': 'Three+ times', 'psat-only': 'PSAT only', 'none': 'First time' };
  const Q8_LABEL = { '1250': '1250', '1300': '1300', '1350': '1350', '1400': '1400', '1450': '1450+', 'tbd': 'Not sure' };
  const Q9_LABEL = { 'u3.0': 'Under 3.0', '3.0-3.3': '3.0 – 3.3', '3.3-3.5': '3.3 – 3.5', '3.5-3.7': '3.5 – 3.7', '3.7-3.9': '3.7 – 3.9', '4.0+': '4.0+' };
  const Q7_LABELS = { 'khan': 'Khan / Bluebook', 'group': 'Group class', 'online': 'Online course', 'app': 'SAT App', 'book': 'Prep book', 'nothing': 'No prep' };
  const Q6_LABELS = { 'math': 'Math', 'reading': 'Reading & writing', 'self-study': "Self-study", 'no-plan': 'No clear plan', 'wont': "Won't study alone", 'too-busy': 'Too busy' };

  const tried = (q7 || []).map(id => Q7_LABELS[id] || id).join(' + ');
  const gaps = (q6 || []).map(id => Q6_LABELS[id] || id).join(', ');

  const sectionLabel = { fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--qf-ink-mute)', fontWeight: 600, padding: '12px 18px 6px', borderTop: '1px solid var(--qf-line)' };
  const row = (lbl, val) => (
    <div style={{ display: 'flex', padding: '9px 18px 9px 26px', gap: 12, alignItems: 'flex-start' }}>
      <span style={{ width: 4, flexShrink: 0, height: 16, background: 'rgba(20,32,46,0.12)', borderRadius: 2, marginTop: 3 }} />
      <span style={{ fontFamily: 'var(--qf-body)', fontSize: 13, color: 'var(--qf-ink-mute)', minWidth: 90 }}>{lbl}</span>
      <span style={{ fontFamily: 'var(--qf-body)', fontSize: 13, color: 'var(--qf-ink)', textAlign: 'right', flex: 1 }}>{val}</span>
    </div>
  );

  return (
    <QFScreen stepIdx={14} onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>Next</QFButton>}
    >
      <div style={{ padding: '8px 0' }}>
        <div style={{
          background: 'var(--qf-paper)',
          border: '1px solid var(--qf-line)',
          borderRadius: 14,
          overflow: 'hidden',
        }}>
          {/* Card header */}
          <div style={{
            background: 'var(--qf-bg-2)', padding: '14px 18px',
            fontFamily: 'var(--qf-display)', fontSize: 17, fontWeight: 500,
            letterSpacing: '-0.01em', color: 'var(--qf-ink-2)',
          }}>
            Your Plan Inputs
          </div>

          {/* THE STUDENT */}
          <div style={sectionLabel}>The Student</div>
          {row('Current SAT', Q4_LABEL[q4] || q4)}
          {row('Target score', Q8_LABEL[q8] || q8)}
          {row('GPA', Q9_LABEL[q9] || q9)}
          {row('Sittings', Q3_LABEL[q3] || q3)}

          {/* TIMELINE */}
          <div style={sectionLabel}>Timeline</div>
          {row('Next test', Q5_LABEL[q5] || q5)}

          {/* CONTEXT */}
          <div style={sectionLabel}>Context</div>
          {tried && row('Tried', tried)}
          {gaps && row('Biggest gaps', gaps)}
        </div>
      </div>
    </QFScreen>
  );
}

// ─── S2 · Method — "mistake-driven learning" mastery progression ──────────────
// Based on user's reference: Mistake Found → Guided Correction → Supported Solve → Independent → Automatic
// User's simplified language: tutor teaches → tutor does example → student & tutor solve → student solves w/ hint → student solves alone → student practices → tutor helps when stuck
export function QFS2Science({ onContinue, onBack }) {
  const steps = [
    { label: 'Tutor teaches',        note: 'Explains the concept behind the miss' },
    { label: 'Tutor does example',   note: 'Works through a problem out loud' },
    { label: 'Solve together',       note: 'Student and tutor work through it jointly' },
    { label: 'Student solves w/ hint', note: 'Tutor gives a nudge when needed' },
    { label: 'Student solves alone', note: 'No help — just like test day' },
    { label: 'Targeted reps',        note: 'Practices the same question type until automatic' },
  ];

  return (
    <QFScreen stepIdx={15} ornament="glow" onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>Show me the data</QFButton>}
    >
      <div className="gap-22">
        <div>
          <div className="qf-eyebrow" style={{ color: 'var(--qf-forest)', marginBottom: 8 }}>One session · One skill</div>
          <h1 className="qf-h1">
            Improve faster through <em>mistake-driven learning.</em>
          </h1>
        </div>

        <p className="qf-lead">
          Lectures and practice problems don't fix what your kid is getting wrong.
          Every illuminairy session follows the same 6-step mastery loop — for every skill that costs points.
        </p>

        {/* Mastery progression card */}
        <div style={{
          background: 'var(--qf-paper)', border: '1px solid var(--qf-line)',
          borderRadius: 14, overflow: 'hidden',
        }}>
          {/* Session header */}
          <div style={{
            background: 'var(--qf-ink)', padding: '10px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.2em',
              color: 'rgba(245,248,250,0.6)',
            }}>ONE SESSION · ONE SKILL</span>
            <span style={{
              fontFamily: 'var(--qf-body)', fontSize: 13, fontWeight: 600,
              color: 'var(--qf-glow)',
            }}>Geometry: Right Triangles</span>
          </div>

          {steps.map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '32px 1fr auto',
              alignItems: 'center', gap: 12,
              padding: '12px 16px',
              borderTop: i > 0 ? '1px solid var(--qf-line)' : 'none',
              background: i === steps.length - 1 ? 'var(--qf-forest-soft)' : undefined,
            }}>
              <span style={{
                fontFamily: 'var(--qf-mono)', fontSize: 11, fontWeight: 600,
                color: i === steps.length - 1 ? 'var(--qf-forest)' : 'var(--qf-ink-mute)',
                letterSpacing: '0.05em',
              }}>0{i + 1}</span>
              <div>
                <div style={{
                  fontFamily: 'var(--qf-body)', fontSize: 14, fontWeight: 600,
                  color: 'var(--qf-ink)',
                }}>{s.label}</div>
                <div style={{
                  fontFamily: 'var(--qf-body)', fontSize: 12, color: 'var(--qf-ink-mute)',
                  marginTop: 2, lineHeight: 1.4,
                }}>{s.note}</div>
              </div>
              <div style={{
                width: 24, height: 4, borderRadius: 2, flexShrink: 0,
                background: i === steps.length - 1 ? 'var(--qf-forest)'
                  : i >= 4 ? '#3E8B5A'
                  : i >= 2 ? 'rgba(47,110,71,0.45)'
                  : 'rgba(20,32,46,0.18)',
              }} />
            </div>
          ))}

          {/* Mastery footer */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 16px',
            borderTop: '1px solid rgba(47,110,71,0.25)',
            background: 'var(--qf-forest-soft)',
          }}>
            <span style={{
              fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.2em',
              color: 'var(--qf-forest)',
            }}>GEOMETRY · MASTERY</span>
            <span style={{
              fontFamily: 'var(--qf-display)', fontSize: 15, color: 'var(--qf-forest)',
              fontWeight: 500,
            }}>Automatic</span>
          </div>
        </div>

        <p className="qf-lead">
          The tutor stays in the loop between sessions — when they get stuck, there's someone to ask.
        </p>

        <QFConstellation />
      </div>
    </QFScreen>
  );
}

// ─── S3 · Stats (vertical bar chart — asymmetry is the point) ────────────────
export function QFS3Stats({ onContinue, onBack }) {
  const bars = [
    { lbl: 'Self-study', val: 12,  color: 'rgba(20,32,46,0.18)' },
    { lbl: 'Khan',       val: 25,  color: 'rgba(20,32,46,0.28)' },
    { lbl: 'CB avg',     val: 40,  color: 'rgba(20,32,46,0.45)' },
    { lbl: 'Tutor',      val: 70,  color: 'rgba(20,32,46,0.65)' },
    { lbl: 'illuminairy',val: 182, color: 'var(--qf-forest)', hot: true },
  ];
  const MAX = 182;
  const CHART_H = 160;

  return (
    <QFScreen stepIdx={16} tone="bg-2" onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">
          <em>4.5×</em> the gain of average SAT prep.
        </h1>
        <p className="qf-lead">
          The College Board's published avg gain on retest is +40 points. Our students average +182 across the last 95 completed plans.
        </p>

        {/* Vertical bar chart */}
        <div className="qf-card" style={{ padding: 20 }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end', gap: 6,
            height: CHART_H + 48, paddingBottom: 0,
          }}>
            {bars.map((b, i) => {
              const heightPct = (b.val / MAX) * CHART_H;
              return (
                <div key={i} style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 0,
                }}>
                  {/* Value label above bar */}
                  <div style={{
                    fontFamily: 'var(--qf-display)',
                    fontSize: b.hot ? 18 : 13,
                    fontWeight: b.hot ? 600 : 500,
                    color: b.hot ? 'var(--qf-forest)' : 'var(--qf-ink-mid)',
                    letterSpacing: '-0.01em',
                    marginBottom: 4,
                    lineHeight: 1,
                  }}>+{b.val}</div>
                  {/* Bar */}
                  <div style={{
                    width: '100%', height: heightPct,
                    background: b.color, borderRadius: '4px 4px 0 0',
                  }} />
                  {/* Baseline */}
                  <div style={{
                    width: '100%', height: 2,
                    background: 'rgba(20,32,46,0.1)',
                  }} />
                  {/* Label below */}
                  <div style={{
                    fontFamily: 'var(--qf-mono)', fontSize: b.hot ? 9 : 8,
                    letterSpacing: '0.08em', textTransform: 'none',
                    color: b.hot ? 'var(--qf-forest)' : 'var(--qf-ink-mute)',
                    fontWeight: b.hot ? 600 : 400,
                    marginTop: 6, textAlign: 'center', lineHeight: 1.3,
                  }}>{b.lbl}</div>
                </div>
              );
            })}
          </div>
          <div className="qf-meta" style={{ marginTop: 8, textAlign: 'right' }}>Avg point gain · retake</div>
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

// ─── S4 · Editorial team feature ─────────────────────────────────────────────
export function QFS4Authority({ onContinue, onBack }) {
  const benefits = [
    '1:1 messaging access · M–F 10 AM–8 PM',
    'Weekly 1:1 sessions',
    'Weekly progress reports',
  ];

  return (
    <QFScreen stepIdx={17} onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>I'm ready</QFButton>}
    >
      <div className="gap-22">
        {/* Editorial team hero — uses /photos/team-hero.jpg if present, aurora fallback */}
        <div style={{
          width: '100%',
          aspectRatio: '4 / 3',
          borderRadius: 16,
          overflow: 'hidden',
          position: 'relative',
          background:
            'linear-gradient(135deg, #1A4D2F 0%, #2F6E47 35%, #0057A8 75%, #121A2B 100%)',
        }}>
          <img
            src="/photos/team-hero.jpg"
            alt="The illuminairy tutors"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* Headline + supporting fact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h1 className="qf-h1" style={{ marginBottom: 0 }}>
            Coached by people who <em>just took the test.</em>
          </h1>
          <p className="qf-lead" style={{ margin: 0 }}>
            11 tutors. All scored <em>1450+</em> on the Digital SAT in the past 3 years.
          </p>
        </div>

        {/* 3 inline benefits — thin rules, no card chrome */}
        <div style={{ borderTop: '1px solid var(--qf-line)', marginTop: 4 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{
              padding: '14px 0',
              borderBottom: '1px solid var(--qf-line)',
              fontFamily: 'var(--qf-display)', fontSize: 15.5,
              color: 'var(--qf-ink-2)', fontWeight: 500,
              letterSpacing: '-0.005em', lineHeight: 1.35,
            }}>
              {b}
            </div>
          ))}
        </div>

        {/* Closing line */}
        <p style={{
          fontFamily: 'var(--qf-body)', fontSize: 13.5,
          color: 'var(--qf-ink-mid)', lineHeight: 1.5, margin: 0,
        }}>
          You'll meet your matched tutor on the strategy call.
        </p>
      </div>
    </QFScreen>
  );
}
