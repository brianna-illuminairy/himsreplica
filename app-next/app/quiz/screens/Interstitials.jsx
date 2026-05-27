'use client';
import { useState, useEffect } from 'react';
import { QFScreen, QFButton, QFConstellation } from '../components/QFShell';

// ─── I1 · Proof bridge ───────────────────────────────────────────────────────
const STAKES_OUTCOME = {
  'top-choice': "they can get into their top-choice school",
  'merit':      "they can qualify for merit scholarships",
  'selective':  "they're competitive at selective colleges",
  'app-rounds': "they don't miss their early application rounds",
  'early':      "they're ready for their early application rounds",
};

export function QFI1Proof({ onContinue, onBack, q2 = 'top-choice', vars = {} }) {
  const v = {
    test_date_phrase: 'October 3',
    stakes_outcome: STAKES_OUTCOME[q2] || STAKES_OUTCOME['top-choice'],
    ...vars,
  };
  const hasDate = v.test_date_phrase && v.test_date_phrase !== 'unsure';
  return (
    <QFScreen stepIdx={6} ornament="glow" onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <div className="gap-22" style={{ marginTop: 4 }}>
        <p className="qf-lead">
          {hasDate ? (
            <>We're building a plan to help your kid get their SAT score up by the <em>{v.test_date_phrase}</em> SAT, so that <em>{v.stakes_outcome}</em>.</>
          ) : (
            <>We're building a plan to help your kid get their SAT score up, so that <em>{v.stakes_outcome}</em>.</>
          )}
        </p>
        <p className="qf-lead">
          But first, we need to better understand why they struggled on the SAT.
        </p>
      </div>
    </QFScreen>
  );
}

// ─── I2 · Compute ────────────────────────────────────────────────────────────
const CQ4_BANDS = {
  'u1000': 'Under 1000', '1100-1200': '1100–1200', '1200-1300': '1200–1300',
  '1300-1400': '1300–1400', '1400plus': '1400+',
};
const CQ5_LONG = {
  'aug22': 'August 22, 2026', 'oct3': 'October 3, 2026', 'nov7': 'November 7, 2026',
  'dec5': 'December 5, 2026', '2027': 'Spring 2027', 'tbd': 'TBD',
};
const CQ5_SHORT = {
  'aug22': 'Aug 22', 'oct3': 'Oct 3', 'nov7': 'Nov 7', 'dec5': 'Dec 5',
  '2027': 'Spring 2027', 'tbd': 'TBD',
};
const CSCORE_RETURN = {
  'aug22': 'September 5, 2026', 'oct3': 'October 18, 2026',
  'nov7': 'November 21, 2026', 'dec5': 'December 19, 2026',
};
const CANCHOR_SCORES = {
  'u1000': 950, '1100-1200': 1150, '1200-1300': 1250,
  '1300-1400': 1350, '1400plus': 1450,
};
const CQ6_PHRASE = {
  'math': 'math section', 'reading': 'reading & writing',
  'self-study': 'self-study not sticking', 'wont': 'getting them to study consistently',
  'no-plan': 'no clear study plan', 'too-busy': 'packed schedule',
};

const STARS = [
  [22,40,0.55,1.1],[68,18,0.45,0.7],[120,52,0.65,0.7],[180,28,0.4,1.0],
  [245,62,0.55,0.7],[310,22,0.5,0.7],[44,140,0.4,0.7],[150,112,0.55,1.2],
  [230,148,0.5,0.7],[300,135,0.4,0.7],[18,220,0.5,0.7],[88,250,0.4,0.7],
  [195,205,0.6,1.0],[270,238,0.5,0.7],[335,222,0.4,0.7],[55,330,0.5,1.1],
  [140,360,0.4,0.7],[220,320,0.55,0.7],[298,355,0.4,0.7],[30,440,0.5,0.7],
  [110,455,0.55,1.0],[180,418,0.4,0.7],[252,438,0.5,0.7],[320,460,0.6,1.1],
  [45,540,0.4,0.7],[125,565,0.5,0.7],[200,525,0.55,0.7],[280,548,0.4,1.0],
  [340,530,0.5,0.7],[70,635,0.5,0.7],[160,650,0.4,0.7],[240,615,0.55,1.1],
  [310,640,0.4,0.7],
];

export function QFI2Compute({ onContinue, onBack, q4 = '1200-1300', q5 = 'oct3', q6 = ['math', 'no-plan'] }) {
  const [phase, setPhase] = useState(0);
  const [barPct, setBarPct] = useState(0);
  const [barLabel, setBarLabel] = useState('ANALYZING INPUTS');
  const [showMissing, setShowMissing] = useState(false);

  const hasQ4 = q4 && q4 !== 'na' && CQ4_BANDS[q4];
  const hasDate = q5 && q5 !== 'tbd' && q5 !== '2027';
  const isEarlyApp = q5 === 'aug22' || q5 === 'oct3';
  const problemSummary = q6.slice(0, 2).map(id => CQ6_PHRASE[id] || id).join(' + ');
  const TEST_DATES = {
    'aug22': new Date('2026-08-22'), 'oct3': new Date('2026-10-03'),
    'nov7': new Date('2026-11-07'), 'dec5': new Date('2026-12-05'),
  };
  const today = new Date('2026-05-26');
  const daysToTest = TEST_DATES[q5]
    ? Math.round((TEST_DATES[q5] - today) / (1000 * 60 * 60 * 24))
    : null;

  // Sequential animation
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => {
      setPhase(3);
      // Animate progress bar 0 → 40
      let pct = 0;
      const inc1 = setInterval(() => {
        pct += 2;
        setBarPct(pct);
        if (pct >= 40) { clearInterval(inc1); setBarLabel('DETECTING GAPS'); }
      }, 30);
      // 40 → 70
      setTimeout(() => {
        let pct2 = 40;
        const inc2 = setInterval(() => {
          pct2 += 2;
          setBarPct(pct2);
          if (pct2 >= 70) { clearInterval(inc2); setBarLabel('MISSING DATA DETECTED'); }
        }, 30);
        // 70 → 100
        setTimeout(() => {
          let pct3 = 70;
          const inc3 = setInterval(() => {
            pct3 += 2;
            setBarPct(pct3);
            if (pct3 >= 100) { clearInterval(inc3); setShowMissing(true); }
          }, 30);
        }, 800);
      }, 700);
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <QFScreen stepIdx={9} tone="ink" onBack={onBack}
      footer={showMissing ? <QFButton kind="forest" onClick={onContinue}>Continue</QFButton> : undefined}
    >
      <svg className="qf-starfield" viewBox="0 0 360 700" preserveAspectRatio="xMidYMid slice">
        {STARS.map(([x, y, o, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={o} />
        ))}
      </svg>
      <div className="qf-aurora-band" />

      <div className="qf-compute">
        <div className="compute-eyebrow">Building your plan</div>

        <div className="compute-section" style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.4s' }}>
          <div className="compute-header"><span className="ck">✓</span> Reviewing your inputs</div>
          {hasQ4 ? (
            <div className="compute-line">Starting score range: <span className="v">{CQ4_BANDS[q4]}</span></div>
          ) : (
            <div className="compute-line">No official SAT yet: <span className="v">planning for first sit</span></div>
          )}
          {hasDate && (
            <div className="compute-line">Next test date: <span className="v">{CQ5_LONG[q5]}</span></div>
          )}
          {isEarlyApp && (
            <div className="compute-line">Early Action deadlines: <span className="v">Nov 1</span></div>
          )}
          <div className="compute-line">Regular Decision deadlines: <span className="v">Jan 1</span></div>
          {CSCORE_RETURN[q5] && (
            <div className="compute-line">Score return: <span className="v">{CSCORE_RETURN[q5]}</span></div>
          )}
        </div>

        <div className="compute-section" style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.4s' }}>
          <div className="compute-header"><span className="ck">✓</span> Building plan frame</div>
          {daysToTest ? (
            <div className="compute-line">Building <span className="v">{daysToTest}-day</span> prep window: <span className="v">May 26 → {CQ5_SHORT[q5]}</span></div>
          ) : (
            <div className="compute-line">Building <span className="v">flexible</span> prep window</div>
          )}
          {hasQ4 && (
            <div className="compute-line">Plan anchor score: <span className="v">{CANCHOR_SCORES[q4]}</span></div>
          )}
          {problemSummary && (
            <div className="compute-line">Optimizing for: <span className="v">{problemSummary}</span></div>
          )}
        </div>

        {phase >= 3 && (
          <div style={{ marginTop: 20 }}>
            <div style={{
              fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.2em',
              color: 'var(--qf-glow)', marginBottom: 8,
            }}>{barLabel}… {barPct < 100 ? `${barPct}%` : '100%'}</div>
            <div style={{
              height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 4, overflow: 'hidden',
            }}>
              <div style={{
                width: `${barPct}%`, height: '100%',
                background: 'var(--qf-glow)', borderRadius: 4,
                transition: 'width 0.1s linear',
              }} />
            </div>
          </div>
        )}

        {showMissing && (
          <div style={{ marginTop: 18, opacity: 1, animation: 'fadeIn 0.4s ease' }}>
            <div className="compute-arrow" style={{ marginBottom: 8 }}>
              → <span className="v" style={{ opacity: 0.5 }}>Target score: ___</span>
            </div>
            <div className="compute-arrow">
              → <span className="v" style={{ opacity: 0.5 }}>GPA: ___</span>
            </div>
          </div>
        )}
      </div>
    </QFScreen>
  );
}

// ─── I3 · Bridge ─────────────────────────────────────────────────────────────
const BR_TEST_DATES = {
  'aug22': new Date('2026-08-22'), 'oct3': new Date('2026-10-03'),
  'nov7': new Date('2026-11-07'), 'dec5': new Date('2026-12-05'),
};
const BR_DATE_NUMERIC = { 'aug22': '8/22', 'oct3': '10/3', 'nov7': '11/7', 'dec5': '12/5' };

export function QFI3Bridge({ onContinue, onBack, q5 = 'oct3' }) {
  const today = new Date('2026-05-26');
  const daysToTest = BR_TEST_DATES[q5]
    ? Math.round((BR_TEST_DATES[q5] - today) / (1000 * 60 * 60 * 24))
    : null;
  const dateNumeric = BR_DATE_NUMERIC[q5];
  const hasDate = daysToTest && dateNumeric;
  return (
    <QFScreen stepIdx={11} ornament="glow" onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>One more question</QFButton>}
    >
      <div className="gap-22" style={{ marginTop: 4 }}>
        <p className="qf-lead">
          {hasDate ? (
            <>Good news, we think we can help get their score up by the <em>{dateNumeric}</em> SAT, which is only <em>{daysToTest} days</em> away.</>
          ) : (
            <>Good news, we think we can help get their score up before the test.</>
          )}
        </p>
        <p className="qf-lead">
          One more question about their <em>GPA</em>. Then we'll show a realistic <em>score projection</em> and their plan.
        </p>
      </div>
    </QFScreen>
  );
}

// ─── I · GPA Gap (redesigned: side-by-side cards, user-specified copy) ───────
const GAP_Q4_LABEL = {
  'u1000': 'under 1000', '1100-1200': '1100–1200',
  '1200-1300': '1200–1300', '1300-1400': '1300–1400',
};
const GAP_Q9_LABEL = {
  '3.0-3.5': '3.0–3.5', '3.5-3.8': '3.5–3.8', '3.8-4.0': '3.8–4.0', '4.0+': '4.0+',
};

export function QFIGPAGap({ onContinue, onBack, q4 = '1200-1300', q9 = '3.8-4.0' }) {
  return (
    <QFScreen stepIdx={13} onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <div className="gap-22" style={{ marginTop: 4 }}>
        <h1 className="qf-h1">
          Why smart kids score <em>low</em> on the SAT.
        </h1>

        <p className="qf-lead">
          It's common for smart students with high GPAs to score lower than expected on the SAT.
          The same habits that earn his A's in class quietly cost points on a test scored on pace.
        </p>

        {/* Side-by-side contrast table */}
        <div style={{ display: 'flex', gap: 10 }}>
          {/* Left: School rewards */}
          <div style={{
            flex: 1,
            background: 'var(--qf-bg-2)',
            border: '1px solid var(--qf-line)',
            borderRadius: 12,
            padding: 16,
          }}>
            <div style={{
              fontFamily: 'var(--qf-display)', fontSize: 15, fontWeight: 500,
              letterSpacing: '-0.01em', color: 'var(--qf-ink)', marginBottom: 14, lineHeight: 1.3,
            }}>
              School rewards taking your time
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Reading 1st & Rereading', 'Showing Work', 'Calculator', 'Sticking with hard problems'].map(item => (
                <li key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: 'var(--qf-ink-2)', lineHeight: 1.4 }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    background: 'rgba(20,32,46,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, color: 'var(--qf-ink-mute)',
                  }}>·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: SAT rewards */}
          <div style={{
            flex: 1,
            background: 'var(--qf-ink)',
            borderRadius: 12,
            padding: 16,
            color: '#F5F8FA',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(119, 200, 154, 0.18)',
          }}>
            <div style={{
              position: 'absolute', top: -40, right: -30,
              width: 160, height: 160,
              background: 'radial-gradient(circle, rgba(119,200,154,0.22) 0%, rgba(0,87,168,0.10) 35%, transparent 65%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative' }}>
              <div style={{
                fontFamily: 'var(--qf-display)', fontSize: 15, fontWeight: 500,
                letterSpacing: '-0.01em', color: 'var(--qf-glow)', marginBottom: 14, lineHeight: 1.3,
              }}>
                SAT rewards speed
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Question 1st & Skimming', 'Moving on', 'Double-checking', 'Skipping & coming back'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: 'rgba(245,248,250,0.85)', lineHeight: 1.4 }}>
                    <span style={{
                      width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                      background: 'rgba(119,200,154,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, color: 'var(--qf-glow)',
                    }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </QFScreen>
  );
}

// ─── V1 · Score Projection ────────────────────────────────────────────────────
const Q4_TO_SCORE = {
  'u1000': 950, '1100-1200': 1150, '1200-1300': 1250,
  '1300-1400': 1350, '1400plus': 1430,
};
const Q8_TO_TARGET = {
  '1300': 1300, '1400': 1400, '1450': 1450, '1500': 1500, '1550': 1550,
};
const Q5_TO_DATE = {
  'aug22': 'Aug 22', 'oct3': 'Oct 3', 'nov7': 'Nov 7', 'dec5': 'Dec 5',
  '2027': 'spring 2027', 'tbd': 'test day',
};
const CQ6_SHORT = {
  'math': 'math accuracy', 'reading': 'reading pace',
  'no-plan': 'lack of structure', 'wont': 'consistency',
  'self-study': 'self-study gaps', 'too-busy': 'time management',
};

const REVEAL_LINES = (name, blocker, projected, testDate) => [
  `Based on your answers${name ? `, ${name}` : ''}…`,
  `we've built a custom prep plan`,
  `focused on <em>${blocker}</em>`,
  `designed to get them to <em>${projected}</em> by <em>${testDate}</em>`,
  `with a path to <em>1500+</em> on a re-test.`,
  `Let's walk through it.`,
];

export function QFV1Projection({
  onContinue, onBack,
  q4 = '1200-1300', q5 = 'oct3', q6 = ['math'], q8 = '1450',
  parentName = '',
  current: currentProp, target: targetProp, projected: projectedProp, testDate: testDateProp,
}) {
  const [phase, setPhase] = useState('reveal'); // 'reveal' | 'chart'
  const [lineIdx, setLineIdx] = useState(0);

  const current = currentProp ?? Q4_TO_SCORE[q4] ?? 1250;
  const target = targetProp ?? Q8_TO_TARGET[q8] ?? Math.min(1600, Math.round((current + 200) / 50) * 50);
  const testDate = testDateProp ?? Q5_TO_DATE[q5] ?? 'test day';
  const hasFixedDate = ['aug22', 'oct3', 'nov7', 'dec5'].includes(q5);

  let gain = 180;
  if (q5 === 'aug22') gain = 130;
  const projected = projectedProp ?? Math.min(target, current + gain);

  const topBlocker = CQ6_SHORT[q6[0]] || 'key gaps';
  const lines = REVEAL_LINES(parentName, topBlocker, projected, testDate);

  // Advance reveal lines
  useEffect(() => {
    if (phase !== 'reveal') return;
    if (lineIdx >= lines.length - 1) return;
    const t = setTimeout(() => setLineIdx(i => i + 1), 1200);
    return () => clearTimeout(t);
  }, [lineIdx, phase, lines.length]);

  // Chart SVG
  const W = 320, H = 160;
  const midScore = current + Math.round((projected - current) * 0.45);
  const midX = 130, midY = H - 80;
  const points = [
    { x: 12,     y: H - 18, lbl: 'Now',    val: current,   isNow: true },
    { x: midX,   y: midY,   lbl: 'Wk 4',   val: midScore,  isMid: true },
    { x: W - 12, y: 22,     lbl: testDate,  val: projected, isEnd: true },
  ];
  const path = `M ${points[0].x} ${points[0].y} Q ${points[0].x + 55} ${points[0].y - 10}, ${points[1].x} ${points[1].y} T ${points[2].x} ${points[2].y}`;

  if (phase === 'reveal') {
    return (
      <QFScreen stepIdx={13} showProgress={false} showBack={false} onBack={onBack}
        footer={lineIdx >= lines.length - 1
          ? <QFButton kind="forest" onClick={() => setPhase('chart')}>See the projection</QFButton>
          : undefined}
      >
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', gap: 20, padding: '40px 24px', minHeight: '100%',
        }}>
          {lines.slice(0, lineIdx + 1).map((line, i) => (
            <div key={i} style={{
              fontFamily: 'var(--qf-display)', fontSize: 22, fontWeight: 500,
              letterSpacing: '-0.02em', lineHeight: 1.3, textAlign: 'center',
              color: 'var(--qf-ink)', opacity: i === lineIdx ? 1 : 0.45,
              transition: 'opacity 0.4s',
            }} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
        </div>
      </QFScreen>
    );
  }

  return (
    <QFScreen stepIdx={13} ornament="glow" onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>See my kid's plan</QFButton>}
    >
      <div className="gap-22">
        <div style={{ textAlign: 'center' }}>
          <div className="qf-meta" style={{ color: 'var(--qf-forest)', marginBottom: 6, letterSpacing: '0.18em' }}>
            WE PREDICT THEY'LL HIT
          </div>
          <div style={{
            fontFamily: 'var(--qf-display)', fontSize: 42, fontWeight: 500,
            letterSpacing: '-0.03em', color: 'var(--qf-forest)', lineHeight: 1,
          }}>
            <em>{projected}</em>
          </div>
          <div style={{
            fontFamily: 'var(--qf-display)', fontSize: 16, color: 'var(--qf-ink-mid)',
            marginTop: 6,
          }}>
            by <em>{testDate}</em>
          </div>
          <div className="qf-meta" style={{ color: 'var(--qf-ink-mute)', marginTop: 4 }}>
            And a path to <em style={{ color: 'var(--qf-forest)' }}>1500+</em> with a re-test.
          </div>
        </div>

        <div className="qf-graph" style={{ position: 'relative' }}>
          {/* Stretch label above chart */}
          <div style={{
            position: 'absolute', top: -2, right: 0,
            fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.15em',
            color: 'var(--qf-glow)', fontWeight: 600,
          }}>STRETCH (1500+) →</div>

          {/* Current / Projected header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, marginTop: 16 }}>
            <div>
              <div className="qf-meta">Current</div>
              <div style={{ fontFamily: 'var(--qf-display)', fontSize: 26, color: 'var(--qf-ink-mid)' }}>{current}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="qf-meta" style={{ color: 'var(--qf-forest)' }}>Projected</div>
              <div style={{ fontFamily: 'var(--qf-display)', fontSize: 32, color: 'var(--qf-forest)' }}>
                <em>{projected}</em>
              </div>
            </div>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 160, display: 'block', overflow: 'visible' }}>
            <defs>
              <linearGradient id="qf-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#205040" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#205040" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" x2={W} y1={32} y2={32}
              stroke="rgba(20,32,46,0.18)" strokeWidth="1" strokeDasharray="3 3" />
            <text x={W - 2} y={28} fontFamily="DM Mono" fontSize="8.5"
              fill="rgba(20,32,46,0.5)" letterSpacing="1.2" textAnchor="end">TARGET {target}</text>
            <path d={`${path} L ${W - 12} ${H} L 12 ${H} Z`} fill="url(#qf-fill)" />
            <path d={path} fill="none" stroke="#205040" strokeWidth="2.2" strokeLinecap="round" />

            {/* Mid-curve teal milestone dot */}
            <circle cx={points[1].x} cy={points[1].y} r={5}
              fill="#4AAFA0" stroke="#fff" strokeWidth="2" />
            {/* Callout label for mid-point */}
            <text x={points[1].x - 42} y={points[1].y - 10}
              fontFamily="DM Mono" fontSize="7.5" fill="#4AAFA0" letterSpacing="0.8">
              DIAG LOCK-IN
            </text>
            <text x={points[1].x - 42} y={points[1].y + 1}
              fontFamily="DM Mono" fontSize="7.5" fill="#4AAFA0" letterSpacing="0.8">
              ({midScore} · WK 4)
            </text>

            {/* Endpoint */}
            <circle cx={points[2].x} cy={points[2].y} r={7}
              fill="#205040" stroke="#fff" strokeWidth="3" />
            <circle cx={points[2].x} cy={points[2].y} r="14"
              fill="none" stroke="#205040" strokeOpacity="0.25" strokeWidth="1.5" />
          </svg>

          {/* X-axis labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px', marginTop: 6 }}>
            {[{lbl:'Now',isEnd:false},{lbl:'Wk 4',isEnd:false},{lbl:testDate,isEnd:true}].map((p, i) => (
              <div key={i} style={{
                fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.15em',
                color: p.isEnd ? 'var(--qf-forest)' : 'var(--qf-ink-mute)',
                fontWeight: p.isEnd ? 600 : 400, textTransform: 'uppercase',
              }}>{p.lbl}</div>
            ))}
          </div>
        </div>

        {/* Benefit line */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '0 4px' }}>
          <span>🎯</span>
          <span style={{ fontSize: 14, color: 'var(--qf-ink-2)', lineHeight: 1.5 }}>
            Close the <em>{topBlocker}</em> gap that's costing the most points.
          </span>
        </div>

        <div className="qf-card wash" style={{ padding: 16 }}>
          <div className="qf-meta" style={{ color: 'var(--qf-forest)', marginBottom: 6, letterSpacing: '0.12em' }}>
            ✦ CONFIRMED ONLY AFTER 1:1 DIAGNOSTIC
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--qf-ink-2)', margin: 0 }}>
            Modeled from the last 95 illuminairy plans matching their starting score, GPA, and target.
            Final projection locked in Week 1.
          </p>
        </div>
      </div>
    </QFScreen>
  );
}

// ─── I · Diagnosis (redesigned: "28 vs 5-6" argument) ────────────────────────
const D_TEST_DATE_SHORT = {
  'aug22': 'August 22', 'oct3': 'October 3', 'nov7': 'November 7', 'dec5': 'December 5',
};
const D_TEST_DATES = {
  'aug22': new Date('2026-08-22'), 'oct3': new Date('2026-10-03'),
  'nov7': new Date('2026-11-07'), 'dec5': new Date('2026-12-05'),
};

const PREP_WHY_FAILED = {
  'khan':    "Khan covers every skill shallowly. Your kid needs deep work on these 5, not surface work on all 28.",
  'group':   "Group class paces to the middle of the room. Nobody built a plan for the few skills actually costing your kid points.",
  'online':  "One syllabus for everyone — it doesn't diagnose your kid's biggest point leaks and rank them.",
  'app':     "SAT apps keep serving questions. They don't tell you which skills to master first.",
  'book':    "Paper prep trains the wrong test. The digital SAT rewards Desmos, on-screen tools, and screen-based pacing.",
  'nothing': "Without a diagnostic, students guess where to start and lose months on low-impact review.",
};
const D_Q7_PRIORITY = ['khan', 'group', 'online', 'app', 'book', 'nothing'];

const GAP_SKILLS_BY_Q6 = {
  'math':       [{ name: 'Desmos & calculator strategy', pts: '~35 pts' }, { name: 'Math pacing', pts: '~25 pts' }],
  'reading':    [{ name: 'Question-first reading', pts: '~30 pts' }, { name: 'Passage pacing', pts: '~20 pts' }],
  'no-plan':    [{ name: 'Gap prioritization', pts: '~40 pts' }, { name: 'Strategic sequencing', pts: '~20 pts' }],
  'wont':       [{ name: 'Practice consistency', pts: '~30 pts' }, { name: 'Reviewing missed questions', pts: '~20 pts' }],
  'self-study': [{ name: 'Targeted skill drilling', pts: '~35 pts' }, { name: 'Identifying blind spots', pts: '~25 pts' }],
  'too-busy':   [{ name: 'High-ROI skill focus', pts: '~40 pts' }, { name: 'Efficient session structure', pts: '~20 pts' }],
};

export function QFIDiagnosis({ onContinue, onBack, q6 = ['math', 'no-plan'], q7 = ['khan'], q5 = 'oct3' }) {
  const aKey = D_Q7_PRIORITY.find(p => q7.includes(p)) || 'nothing';
  const whyFailed = PREP_WHY_FAILED[aKey];

  const today = new Date('2026-05-26');
  const days = D_TEST_DATES[q5]
    ? Math.round((D_TEST_DATES[q5] - today) / (1000 * 60 * 60 * 24))
    : null;
  const dateShort = D_TEST_DATE_SHORT[q5];

  const gapSkills = q6.flatMap(id => GAP_SKILLS_BY_Q6[id] || []).slice(0, 5);

  // 28 dots grid: 28 grey, first 5-6 green
  const highlightCount = Math.min(6, gapSkills.length || 5);
  const dots = Array.from({ length: 28 }, (_, i) => i < highlightCount);

  return (
    <QFScreen stepIdx={9} onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <div className="gap-22" style={{ marginTop: 4 }}>
        {/* Hero thesis */}
        <div>
          <h1 className="qf-h1">
            The SAT has <em>28</em> skill areas. Only <em>5–6</em> are costing the most points.
          </h1>
        </div>

        {/* 28-dot visual */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8, padding: '4px 0',
        }}>
          {dots.map((hot, i) => (
            <div key={i} style={{
              width: 14, height: 14, borderRadius: '50%',
              background: hot ? 'var(--qf-forest)' : 'rgba(20,32,46,0.12)',
              transition: 'background 0.2s',
            }} />
          ))}
          <div style={{
            marginLeft: 4, fontFamily: 'var(--qf-mono)', fontSize: 10,
            color: 'var(--qf-forest)', letterSpacing: '0.12em', alignSelf: 'center',
          }}>
            = high impact
          </div>
        </div>

        {/* Gap list from Q6 */}
        {gapSkills.length > 0 && (
          <div>
            <div className="qf-meta" style={{ color: 'var(--qf-forest)', marginBottom: 10 }}>Gaps costing the most points</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {gapSkills.map((skill, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--qf-paper)', border: '1px solid var(--qf-line)',
                  borderRadius: 10, padding: '12px 14px',
                }}>
                  <span style={{ fontSize: 14, color: 'var(--qf-ink-2)' }}>{skill.name}</span>
                  <span style={{
                    fontFamily: 'var(--qf-mono)', fontSize: 11, color: 'var(--qf-forest)',
                    fontWeight: 600, letterSpacing: '0.08em',
                  }}>{skill.pts}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why their prep didn't fix it */}
        <div>
          <div className="qf-meta" style={{ color: 'var(--qf-ink-mute)', marginBottom: 8 }}>Why their prep didn't fix it</div>
          <p className="qf-lead">{whyFailed}</p>
        </div>

        {days && dateShort && (
          <div>
            <div className="qf-meta" style={{ color: 'var(--qf-forest)', marginBottom: 6 }}>Good news</div>
            <p className="qf-lead">
              We can build a diagnostic + ranked plan with one-on-one tutoring before the {dateShort} SAT.
              You still have about <em>{days} days</em> to get this right.
            </p>
          </div>
        )}

        <p className="qf-disclaimer">
          Sources: College Board retake data (250,000+ test takers) · Bloom (1984) — 2-sigma effect of 1:1 tutoring.
        </p>
      </div>
    </QFScreen>
  );
}
