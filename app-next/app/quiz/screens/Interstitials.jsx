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

  // Build a flat reveal sequence: section headers + their rows
  const items = [];
  items.push({ type: 'header', label: 'Reviewing your inputs', section: 1 });
  if (hasQ4) items.push({ type: 'row', content: <>Starting score range: <span className="v">{CQ4_BANDS[q4]}</span></> });
  else       items.push({ type: 'row', content: <>No official SAT yet: <span className="v">planning for first sit</span></> });
  if (hasDate)    items.push({ type: 'row', content: <>Next test date: <span className="v">{CQ5_LONG[q5]}</span></> });
  if (isEarlyApp) items.push({ type: 'row', content: <>Early Action deadlines: <span className="v">Nov 1</span></> });
  items.push({ type: 'row', content: <>Regular Decision deadlines: <span className="v">Jan 1</span></> });
  if (CSCORE_RETURN[q5]) items.push({ type: 'row', content: <>Score return: <span className="v">{CSCORE_RETURN[q5]}</span></> });

  items.push({ type: 'header', label: 'Building plan frame', section: 2 });
  if (daysToTest) items.push({ type: 'row', content: <>Building <span className="v">{daysToTest}-day</span> prep window: <span className="v">May 26 → {CQ5_SHORT[q5]}</span></> });
  else            items.push({ type: 'row', content: <>Building <span className="v">flexible</span> prep window</> });
  if (hasQ4)          items.push({ type: 'row', content: <>Plan anchor score: <span className="v">{CANCHOR_SCORES[q4]}</span></> });
  if (problemSummary) items.push({ type: 'row', content: <>Optimizing for: <span className="v">{problemSummary}</span></> });

  const [revealed, setRevealed] = useState(0);
  const [barPct, setBarPct] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [showMissing, setShowMissing] = useState(false);

  // Stagger each item in sequence, then start the progress bar
  useEffect(() => {
    const timers = [];
    const FIRST_DELAY = 350;
    const STAGGER = 320;
    for (let i = 0; i < items.length; i++) {
      timers.push(setTimeout(() => setRevealed(i + 1), FIRST_DELAY + i * STAGGER));
    }
    const barDelay = FIRST_DELAY + items.length * STAGGER + 250;
    timers.push(setTimeout(() => {
      setShowBar(true);
      let pct = 0;
      const inc = setInterval(() => {
        pct += 2;
        setBarPct(pct);
        if (pct >= 100) {
          clearInterval(inc);
          setShowMissing(true);
        }
      }, 28);
      timers.push(inc);
    }, barDelay));
    return () => timers.forEach(t => {
      if (typeof t === 'number') clearTimeout(t);
      else clearInterval(t);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barLabel = barPct < 40 ? 'ANALYZING INPUTS'
                 : barPct < 70 ? 'DETECTING GAPS'
                 : 'MISSING DATA DETECTED';

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

        {items.map((item, i) => {
          const shown = i < revealed;
          const style = {
            opacity: shown ? 1 : 0,
            transform: shown ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          };
          if (item.type === 'header') {
            return (
              <div key={i} className="compute-header"
                style={{ ...style, marginTop: item.section > 1 ? 18 : 0 }}>
                <span className="ck">✓</span> {item.label}
              </div>
            );
          }
          return (
            <div key={i} className="compute-line" style={style}>
              {item.content}
            </div>
          );
        })}

        {showBar && (
          <div style={{ marginTop: 22, opacity: 1, animation: 'fadeIn 0.4s ease' }}>
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
  '3.0-3.3': '3.0–3.3', '3.3-3.5': '3.3–3.5', '3.5-3.7': '3.5–3.7', '3.7-3.9': '3.7–3.9', '4.0+': '4.0+',
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
  '1250': 1250, '1300': 1300, '1350': 1350, '1400': 1400, '1450': 1450,
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

const REVEAL_LINES = (name, blocker, current, target, gap, days, testDate) => {
  const lines = [
    `Based on your answers${name ? `, ${name}` : ''}…`,
    `we've built a custom prep plan`,
    `focused on <em>${blocker}</em>`,
    `to take them from <em>${current}</em> to <em>${target}</em>`,
  ];
  if (days) lines.push(`closing a <em>${gap}-point</em> gap in <em>${days} days</em>.`);
  else      lines.push(`closing a <em>${gap}-point</em> gap before test day.`);
  lines.push(`Let's walk through it.`);
  return lines;
};

const V1_TEST_DATES = {
  'aug22': new Date('2026-08-22'), 'oct3': new Date('2026-10-03'),
  'nov7': new Date('2026-11-07'), 'dec5': new Date('2026-12-05'),
};

const V1_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const v1FmtDate = (d) => d ? `${V1_MONTHS[d.getMonth()]} ${d.getDate()}` : '';
const v1AddDays = (d, n) => new Date(d.getTime() + n * 86400000);

const V1_STAKES_BENEFIT = {
  'top-choice': 'competitive for their top-choice school',
  'merit':      'in range for merit scholarships',
  'selective':  'competitive at selective colleges',
  'app-rounds': 'ready for early application deadlines',
};

const v1AvgGainForBand = (current) => {
  if (current >= 1400) return 95;
  if (current >= 1300) return 150;
  if (current >= 1200) return 180;
  if (current >= 1100) return 210;
  return 240;
};

const V1_SKILLS = [
  { rank: 1, pct: 92, pts: 60 },
  { rank: 2, pct: 78, pts: 48 },
  { rank: 3, pct: 64, pts: 38 },
  { rank: 4, pct: 48, pts: 26 },
  { rank: 5, pct: 36, pts: 18 },
];

export function QFV1Projection({
  onContinue, onBack,
  q4 = '1200-1300', q5 = 'oct3', q6 = ['math'], q8 = '1400',
  parentName = '',
  current: currentProp, target: targetProp, testDate: testDateProp,
}) {
  const [phase, setPhase] = useState('reveal'); // 'reveal' | 'chart'
  const [lineIdx, setLineIdx] = useState(0);

  const current = currentProp ?? Q4_TO_SCORE[q4] ?? 1250;
  let target = targetProp ?? Q8_TO_TARGET[q8] ?? Math.min(1600, Math.round((current + 200) / 50) * 50);
  // Ensure a meaningful improvement gap if user picked a target below current
  if (target <= current) target = Math.min(1600, current + 100);
  const gap = target - current;

  const testDate = testDateProp ?? Q5_TO_DATE[q5] ?? 'test day';
  const today = new Date('2026-05-26');
  const days = V1_TEST_DATES[q5]
    ? Math.round((V1_TEST_DATES[q5] - today) / (1000 * 60 * 60 * 24))
    : null;

  const topBlocker = CQ6_SHORT[q6[0]] || 'key gaps';
  const lines = REVEAL_LINES(parentName, topBlocker, current, target, gap, days, testDate);

  // Advance reveal lines
  useEffect(() => {
    if (phase !== 'reveal') return;
    if (lineIdx >= lines.length - 1) return;
    const t = setTimeout(() => setLineIdx(i => i + 1), 1200);
    return () => clearTimeout(t);
  }, [lineIdx, phase, lines.length]);

  // Milestone timeline data (computed from today + Q5 retake date)
  const startDate = today;
  const diagDate = v1AddDays(today, 7);
  const planDate = v1AddDays(today, 10);
  const firstSessionDate = v1AddDays(today, 14);
  const retakeDate = V1_TEST_DATES[q5];
  const weeksOfTutoring = retakeDate
    ? Math.max(2, Math.round((retakeDate - firstSessionDate) / (7 * 86400000)))
    : 12;
  const avgGain = v1AvgGainForBand(current);

  const milestones = [
    { date: startDate,        label: 'Today',      val: current },
    { date: diagDate,         label: 'Diagnostic', val: null },
    { date: planDate,         label: 'Plan',       val: null },
    { date: firstSessionDate, label: 'Session 1',  val: null },
    retakeDate ? { date: retakeDate, label: 'Retake', val: target, isEnd: true } : null,
  ].filter(Boolean);

  const tlW = 340, tlChartH = 96, tlPad = 18;
  const tlMs = milestones.length;
  const xAt = (i) => tlPad + (i / (tlMs - 1)) * (tlW - tlPad * 2);
  const yAt = (i) => i === tlMs - 1 ? 14 : tlChartH - 12;
  const tlPath = milestones.map((m, i) => {
    if (i === 0) return `M ${xAt(i)} ${yAt(i)}`;
    if (i === tlMs - 1) {
      const prevX = xAt(i - 1);
      const cx = prevX + (xAt(i) - prevX) * 0.4;
      const cy = yAt(i - 1);
      return `Q ${cx} ${cy}, ${xAt(i)} ${yAt(i)}`;
    }
    return `L ${xAt(i)} ${yAt(i)}`;
  }).join(' ');

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
      footer={<QFButton kind="forest" onClick={onContinue}>Schedule the diagnostic</QFButton>}
    >
      <div className="gap-22">
        {/* Headline */}
        <div style={{ textAlign: 'center' }}>
          <div className="qf-meta" style={{ color: 'var(--qf-forest)', marginBottom: 6, letterSpacing: '0.18em' }}>
            Built to hit
          </div>
          <div style={{
            fontFamily: 'var(--qf-display)', fontSize: 48, fontWeight: 500,
            letterSpacing: '-0.03em', color: 'var(--qf-forest)', lineHeight: 1,
          }}>
            <em>{target}</em>
          </div>
          <div style={{
            fontFamily: 'var(--qf-display)', fontSize: 16, color: 'var(--qf-ink-mid)',
            marginTop: 6,
          }}>
            by <em>{testDate}</em>
          </div>
          <div className="qf-meta" style={{ color: 'var(--qf-ink-mute)', marginTop: 6 }}>
            Closing a <em style={{ color: 'var(--qf-forest)' }}>{gap}-point</em> gap
            {days ? <> in <em style={{ color: 'var(--qf-forest)' }}>{days} days</em></> : null}.
          </div>
        </div>

        {/* Milestone timeline */}
        <div>
          <div className="qf-meta" style={{ color: 'var(--qf-ink-mute)', marginBottom: 10, letterSpacing: '0.12em' }}>
            Their path
          </div>
          <svg viewBox={`0 0 ${tlW} ${tlChartH + 38}`}
            style={{ width: '100%', height: 150, display: 'block', overflow: 'visible' }}>
            <defs>
              <linearGradient id="qf-fill-v1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#205040" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#205040" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${tlPath} L ${xAt(tlMs - 1)} ${tlChartH} L ${xAt(0)} ${tlChartH} Z`}
              fill="url(#qf-fill-v1)" />
            <path d={tlPath} fill="none" stroke="#205040" strokeWidth="2.2" strokeLinecap="round" />
            {milestones.map((m, i) => (
              <g key={`d${i}`}>
                <circle cx={xAt(i)} cy={yAt(i)} r={m.isEnd || i === 0 ? 6 : 4}
                  fill={m.isEnd ? '#2F6E47' : i === 0 ? '#2A3142' : '#FFFFFF'}
                  stroke="#FFFFFF" strokeWidth={i === 0 || m.isEnd ? 2 : 1.5} />
                {m.isEnd && (
                  <circle cx={xAt(i)} cy={yAt(i)} r="12"
                    fill="none" stroke="#2F6E47" strokeOpacity="0.3" strokeWidth="1.5" />
                )}
              </g>
            ))}
            {milestones.map((m, i) => m.val ? (
              <text key={`v${i}`} x={xAt(i)} y={yAt(i) - 12}
                fontFamily="Fraunces, Georgia, serif" fontSize="13" fontWeight="500"
                fill={m.isEnd ? '#2F6E47' : '#4D5566'} textAnchor="middle">
                {m.val}
              </text>
            ) : null)}
            {milestones.map((m, i) => (
              <g key={`l${i}`}>
                <text x={xAt(i)} y={tlChartH + 14} fontFamily="DM Mono" fontSize="8.5"
                  fill={m.isEnd ? '#2F6E47' : '#8A8E97'}
                  fontWeight={m.isEnd ? 600 : 400}
                  textAnchor="middle" letterSpacing="0.06em">
                  {v1FmtDate(m.date)}
                </text>
                <text x={xAt(i)} y={tlChartH + 28}
                  fontFamily="Schibsted Grotesk, system-ui, sans-serif" fontSize="10.5"
                  fill={m.isEnd ? '#2F6E47' : '#4D5566'}
                  fontWeight={m.isEnd ? 600 : 500}
                  textAnchor="middle">
                  {m.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Comparison stat */}
        <div className="qf-card wash" style={{ padding: 16 }}>
          <div className="qf-meta" style={{ color: 'var(--qf-forest)', marginBottom: 6, letterSpacing: '0.12em' }}>
            Across 95+ matching plans
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.45, color: 'var(--qf-ink-2)', margin: 0 }}>
            Kids who started near <em>{current}</em> averaged
            <em style={{ color: 'var(--qf-forest)' }}> +{avgGain} points</em> in {weeksOfTutoring} weeks of diagnostic-driven tutoring.
          </p>
        </div>

        {/* Locked skill bars */}
        <div>
          <div className="qf-meta" style={{ color: 'var(--qf-ink-mute)', marginBottom: 12, letterSpacing: '0.12em' }}>
            5 skills costing the most points
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {V1_SKILLS.map((s, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '70px 1fr 56px',
                alignItems: 'center',
                gap: 10,
              }}>
                <div style={{
                  fontFamily: 'var(--qf-mono)', fontSize: 11, color: 'var(--qf-ink-mute)',
                  letterSpacing: '0.08em',
                }}>Skill #{s.rank}</div>
                <div style={{
                  height: 18, background: 'rgba(20,32,46,0.05)',
                  borderRadius: 9, overflow: 'hidden', position: 'relative',
                }}>
                  <div style={{
                    width: `${s.pct}%`, height: '100%',
                    background: 'linear-gradient(to right, rgba(47,110,71,0.35), rgba(47,110,71,0.65))',
                    borderRadius: 9,
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'repeating-linear-gradient(45deg, transparent 0, transparent 4px, rgba(255,255,255,0.22) 4px, rgba(255,255,255,0.22) 8px)',
                    borderRadius: 9,
                  }} />
                </div>
                <div style={{
                  fontFamily: 'var(--qf-mono)', fontSize: 11, color: 'var(--qf-forest)',
                  fontWeight: 600, textAlign: 'right', letterSpacing: '0.05em',
                }}>+{s.pts} pts</div>
              </div>
            ))}
          </div>
          <p style={{
            marginTop: 14, fontSize: 14, color: 'var(--qf-ink-2)',
            lineHeight: 1.5, padding: '0 2px',
          }}>
            The diagnostic reveals which 5–6 skills these are — and ranks them by point impact.
          </p>
        </div>

        {/* Closing transition */}
        <p style={{
          fontSize: 14, color: 'var(--qf-ink-2)', lineHeight: 1.55,
          textAlign: 'center', padding: '0 8px',
        }}>
          Let's determine their top 5–6 skill gaps and schedule the diagnostic.
        </p>
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
