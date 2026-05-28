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
const I1_DATE_PHRASE = {
  'aug22': 'August 22', 'oct3': 'October 3', 'nov7': 'November 7',
  'dec5': 'December 5', '2027': null, 'tbd': null,
};

export function QFI1Proof({ onContinue, onBack, q2 = 'top-choice', q5 = 'oct3', vars = {} }) {
  const v = {
    test_date_phrase: I1_DATE_PHRASE[q5] ?? null,
    stakes_outcome: STAKES_OUTCOME[q2] || STAKES_OUTCOME['top-choice'],
    ...vars,
  };
  const hasDate = !!v.test_date_phrase;
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
  'u1000': 'Under 1100', '1100-1200': '1100–1200', '1200-1300': '1200–1300',
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
  'u1000': 1050, '1100-1200': 1150, '1200-1300': 1250,
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
  'u1000': 'under 1100', '1100-1200': '1100–1200',
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
  'u1000': 1050, '1100-1200': 1150, '1200-1300': 1250,
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

  // Setup-phase gains (T/D/P/S1) absorb a portion before skills add up
  const setupGain = Math.round(gap * 0.08); // ~20 pts of the gap
  const skillCumGain = [0.32, 0.51, 0.66, 0.77, 0.85].map(p => Math.round(gap * p)); // cumulative SK1..SK5
  // Individual SK contributions (pretty for display)
  const skillContrib = V1_SKILLS.map(s => s.pts); // [60, 48, 38, 26, 18]

  // Milestones with relative x position (0–1) and absolute score
  const milestones = [
    { id: 'T',   xRel: 0.00, score: current,                          label: 'Today',       date: startDate,        showScoreAbove: true },
    { id: 'D',   xRel: 0.10, score: current + Math.round(setupGain * 0.25), label: 'Diagnostic', date: diagDate },
    { id: 'P',   xRel: 0.18, score: current + Math.round(setupGain * 0.5),  label: 'Plan',       date: planDate },
    { id: 'S1',  xRel: 0.26, score: current + setupGain,              label: 'Session 1',   date: firstSessionDate },
    { id: 'SK1', xRel: 0.38, score: current + skillCumGain[0],        label: 'Skill 1',     pts: skillContrib[0] },
    { id: 'SK2', xRel: 0.50, score: current + skillCumGain[1],        label: 'Skill 2',     pts: skillContrib[1] },
    { id: 'SK3', xRel: 0.62, score: current + skillCumGain[2],        label: 'Skill 3',     pts: skillContrib[2] },
    { id: 'SK4', xRel: 0.74, score: current + skillCumGain[3],        label: 'Skill 4',     pts: skillContrib[3] },
    { id: 'SK5', xRel: 0.86, score: current + skillCumGain[4],        label: 'Skill 5',     pts: skillContrib[4] },
    retakeDate ? { id: 'R', xRel: 1.00, score: target, label: 'Retake', date: retakeDate, showScoreAbove: true, isEnd: true } : null,
  ].filter(Boolean);

  // Chart geometry
  const CW = 340, CH = 130;
  const PAD_X = 14;
  const PAD_TOP = 22;
  const PAD_BOTTOM = 26;
  const usableH = CH - PAD_TOP - PAD_BOTTOM;
  const px = (m) => PAD_X + m.xRel * (CW - 2 * PAD_X);
  const py = (m) => PAD_TOP + usableH - ((m.score - current) / gap) * usableH;
  const tlPath = milestones.map((m, i) => `${i === 0 ? 'M' : 'L'} ${px(m)} ${py(m)}`).join(' ');
  const baselineY = CH - PAD_BOTTOM;
  const lastM = milestones[milestones.length - 1];
  const firstM = milestones[0];
  const fillPath = `${tlPath} L ${px(lastM)} ${baselineY} L ${px(firstM)} ${baselineY} Z`;

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

  // Legend rows: paired so left column is phase milestones, right column is skill contributions
  const phaseRows = milestones.filter(m => !m.id.startsWith('SK'));
  const skillRows = milestones.filter(m => m.id.startsWith('SK'));

  return (
    <QFScreen stepIdx={13} ornament="glow" onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>See my kid's plan</QFButton>}
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

        {/* Unified chart: skills are markers ON the curve */}
        <svg viewBox={`0 0 ${CW} ${CH}`}
          style={{ width: '100%', display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="qf-fill-v1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#205040" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#205040" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fillPath} fill="url(#qf-fill-v1)" />
          <path d={tlPath} fill="none" stroke="#205040" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round" />
          {milestones.map((m) => {
            const isSk = m.id.startsWith('SK');
            const isEnd = m.isEnd;
            const isStart = m.id === 'T';
            const r = isEnd ? 5.5 : isStart ? 4.5 : isSk ? 3.8 : 2.8;
            const fill = isEnd ? '#2F6E47' : isSk ? '#4AAFA0' : isStart ? '#2A3142' : '#FFFFFF';
            const stroke = isSk ? '#4AAFA0' : '#205040';
            return (
              <g key={m.id}>
                {isEnd && (
                  <circle cx={px(m)} cy={py(m)} r={11}
                    fill="none" stroke="#2F6E47" strokeOpacity="0.3" strokeWidth="1.5" />
                )}
                <circle cx={px(m)} cy={py(m)} r={r}
                  fill={fill} stroke={stroke} strokeWidth={isEnd || isStart ? 2 : 1.2} />
                {m.showScoreAbove && (
                  <text x={px(m)} y={py(m) - (isEnd ? 11 : 9)}
                    fontFamily="Fraunces, Georgia, serif"
                    fontSize={isEnd ? 14 : 11} fontWeight="500"
                    fill="#2F6E47" textAnchor="middle">
                    {m.score}
                  </text>
                )}
                {m.pts && (
                  <text x={px(m)} y={py(m) - 8}
                    fontFamily="DM Mono" fontSize="8.5" fontWeight="600"
                    fill="#3E8B5A" textAnchor="middle" letterSpacing="0.04em">
                    +{m.pts}
                  </text>
                )}
                <text x={px(m)} y={baselineY + 14}
                  fontFamily="DM Mono" fontSize="9" fontWeight="600"
                  fill={isEnd ? '#2F6E47' : isSk ? '#4AAFA0' : '#8A8E97'}
                  textAnchor="middle" letterSpacing="0.06em">
                  {m.id}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend — phases left, skills right */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 14px',
          fontFamily: 'var(--qf-body)', fontSize: 11.5, color: 'var(--qf-ink-mid)',
        }}>
          {phaseRows.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{
                fontFamily: 'var(--qf-mono)', fontSize: 10, fontWeight: 600,
                color: m.isEnd ? 'var(--qf-forest)' : m.id === 'T' ? 'var(--qf-ink-2)' : 'var(--qf-ink-mute)',
                letterSpacing: '0.06em', minWidth: 22,
              }}>{m.id}</span>
              <span>
                {m.label}
                {m.date && <span style={{ color: 'var(--qf-ink-mute)' }}> · {v1FmtDate(m.date)}</span>}
                {m.isEnd && <span style={{ color: 'var(--qf-forest)', fontWeight: 600 }}> · {target}</span>}
              </span>
            </div>
          ))}
          {skillRows.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{
                fontFamily: 'var(--qf-mono)', fontSize: 10, fontWeight: 600,
                color: 'var(--qf-glow)', letterSpacing: '0.06em', minWidth: 28,
              }}>{m.id}</span>
              <span style={{ color: 'var(--qf-forest)', fontWeight: 500 }}>+{m.pts} pts</span>
            </div>
          ))}
        </div>

        {/* Comparison stat — inline, no card */}
        <p style={{ fontSize: 13.5, color: 'var(--qf-ink-2)', lineHeight: 1.5, margin: 0 }}>
          Across 95+ matching plans, kids who started near <em>{current}</em> averaged
          <em style={{ color: 'var(--qf-forest)' }}> +{avgGain} points</em> in {weeksOfTutoring} weeks of diagnostic-driven tutoring.
          The diagnostic reveals which skills <em>SK1–5</em> actually are.
        </p>
      </div>
    </QFScreen>
  );
}

// ─── I · Diagnosis (content skills, no tricks) ───────────────────────────────
const D_TEST_DATE_SHORT = {
  'aug22': 'August 22', 'oct3': 'October 3', 'nov7': 'November 7', 'dec5': 'December 5',
};
const D_TEST_DATES = {
  'aug22': new Date('2026-08-22'), 'oct3': new Date('2026-10-03'),
  'nov7': new Date('2026-11-07'), 'dec5': new Date('2026-12-05'),
};

const PREP_WHY_FAILED = {
  'khan':    "Khan covers all 28 skills shallowly. Your kid needs deep work on these 5 — not surface review.",
  'group':   "Group classes pace to the middle of the room. Nobody built a plan for the few skills actually costing your kid points.",
  'online':  "One syllabus for everyone. It doesn't diagnose your kid's biggest point leaks and rank them.",
  'app':     "SAT apps keep serving questions. They don't tell you which content skills to master first.",
  'book':    "Paper prep trains the wrong test. The digital SAT rewards Desmos and on-screen pacing — not flipping pages.",
  'nothing': "Without a diagnostic, students guess where to start and lose months on low-impact review.",
};
const D_Q7_PRIORITY = ['khan', 'group', 'online', 'app', 'book', 'nothing'];

// Real SAT content skills (not tricks) tied to Q6 selections.
const MATH_SKILLS = [
  { name: 'Linear Functions',           lines: ['Linear', 'Functions'],         pts: 50 },
  { name: 'Geometry: Right Triangles',  lines: ['Right', 'Triangles'],          pts: 45 },
  { name: 'Quadratics',                 lines: ['Quadratics'],                  pts: 40 },
  { name: 'Word Problems',              lines: ['Word', 'Problems'],            pts: 35 },
  { name: 'Functions & Graphs',         lines: ['Functions', '& Graphs'],       pts: 30 },
];
const READING_SKILLS = [
  { name: 'Inference & Main Idea',      lines: ['Inference', '& Main Idea'],    pts: 50 },
  { name: 'Vocab in Context',           lines: ['Vocab in', 'Context'],         pts: 45 },
  { name: 'Reading Pacing',             lines: ['Reading', 'Pacing'],           pts: 40 },
  { name: 'Evidence-Based Reading',     lines: ['Evidence-', 'Based'],          pts: 35 },
  { name: 'Question-First Strategy',    lines: ['Question-', 'First'],          pts: 30 },
];

const Q7_PHRASE = {
  khan:   'Khan Academy',
  group:  'group classes',
  online: 'online courses',
  app:    'SAT apps',
  book:   'prep books',
};

function priorPrepNames(q7 = []) {
  const items = q7.map(id => Q7_PHRASE[id]).filter(Boolean);
  if (items.length === 0) return null;
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function pickContentSkills(q6 = []) {
  const hasMath = q6.includes('math');
  const hasReading = q6.includes('reading');
  if (hasMath && !hasReading) return MATH_SKILLS;
  if (hasReading && !hasMath) return READING_SKILLS;
  // Mixed (default, or both selected): top 5 by points across both domains
  return [
    MATH_SKILLS[0],     // Linear Functions +35
    READING_SKILLS[0],  // Inference & Main Idea +30
    MATH_SKILLS[1],     // Geometry: Right Triangles +25
    READING_SKILLS[1],  // Vocab in Context +25
    MATH_SKILLS[2],     // Quadratics +22
  ];
}

export function QFIDiagnosis({ onContinue, onBack, q4 = '1200-1300', q6 = ['math', 'no-plan'], q7 = ['khan'], q5 = 'oct3' }) {
  const skills = pickContentSkills(q6);
  const totalPts = skills.reduce((s, x) => s + x.pts, 0);
  const priorPrep = priorPrepNames(q7);
  const lastScore = CANCHOR_SCORES[q4];

  const today = new Date('2026-05-26');
  const days = D_TEST_DATES[q5]
    ? Math.round((D_TEST_DATES[q5] - today) / (1000 * 60 * 60 * 24))
    : null;
  const weeks = days ? Math.round(days / 7) : null;
  const dateShort = D_TEST_DATE_SHORT[q5];

  // Constellation reveal: chaotic 28 → 5 illuminated + connected
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 650);
    return () => clearTimeout(t);
  }, []);

  // Star positions in 360×140 viewBox: 5 lit stars + 23 scattered dim dots (compact)
  const LIT = [
    { x: 40,  y: 80 },
    { x: 115, y: 55 },
    { x: 190, y: 90 },
    { x: 260, y: 60 },
    { x: 320, y: 85 },
  ];
  const LINKS = [[0,1],[1,2],[2,3],[3,4]];
  const maxPts = Math.max(...skills.map(s => s.pts));
  const DIM = [
    [20,12],[50,22],[80,15],[140,25],[170,12],[200,18],[235,10],[290,15],[335,18],
    [22,118],[60,128],[95,135],[175,128],[215,120],[255,134],[295,124],[330,115],[355,128],
    [73,42],[245,32],[300,40],[353,72],[20,72],
  ];

  return (
    <QFScreen stepIdx={9} onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>Build their plan</QFButton>}
    >
      <div className="gap-22" style={{ marginTop: 4 }}>
        {/* Above image: H1 (1 sentence) + sub (1 sentence) */}
        <div>
          <h1 className="qf-h1" style={{ marginBottom: 10 }}>
            {priorPrep ? (
              <><em>{lastScore}</em>, even after <em>{priorPrep}</em>.</>
            ) : (
              <><em>{lastScore}</em>.</>
            )}
          </h1>
          <p className="qf-lead">
            That's because their work spread across all <em>28 SAT skills</em> instead of focusing on the <em>5–6 causing the biggest score drops.</em>
          </p>
        </div>

        {/* Labeled aurora constellation — replaces the skill table */}
        <div style={{ position: 'relative', padding: 0 }}>
          <svg viewBox="0 0 360 140"
            style={{ width: '100%', display: 'block', overflow: 'visible' }}>
            {/* Dim scattered (the 23 that don't matter) */}
            {DIM.map(([x, y], i) => (
              <circle key={`d${i}`} cx={x} cy={y} r={2.2}
                fill="rgba(20,32,46,0.22)"
                style={{
                  transition: 'opacity 0.9s ease',
                  opacity: revealed ? 0.38 : 1,
                }}
              />
            ))}
            {/* Constellation links — width + opacity scale with avg pts of endpoints */}
            {LINKS.map(([a, b], i) => {
              const avgScale = (skills[a].pts + skills[b].pts) / (2 * maxPts);
              return (
                <line key={`ln${i}`}
                  x1={LIT[a].x} y1={LIT[a].y}
                  x2={LIT[b].x} y2={LIT[b].y}
                  stroke="#77C89A"
                  strokeWidth={0.5 + 1.8 * avgScale}
                  strokeLinecap="round"
                  style={{
                    transition: 'opacity 0.6s ease 0.9s',
                    opacity: revealed ? 0.25 + 0.6 * avgScale : 0,
                  }}
                />
              );
            })}
            {/* 5 lit stars — size + glow scale with pts (bubble graph) */}
            {LIT.map(({ x, y }, i) => {
              const skill = skills[i];
              const scale = skill.pts / maxPts;           // 0.6 (smallest) → 1 (biggest)
              const haloR = 8 + 9 * scale;                // 13.4 → 17
              const midR  = 4.5 + 5.5 * scale;            // 7.8 → 10
              const coreR = 2.2 + 3 * scale;              // 4 → 5.2
              const glowPx = 4 + 4 * scale;               // 6.4 → 8
              return (
                <g key={`l${i}`} style={{
                  transition: 'opacity 0.6s ease 0.25s',
                  opacity: revealed ? 1 : 0,
                }}>
                  {/* +pts label above (positioned outside halo) */}
                  <text x={x} y={y - haloR - 5}
                    textAnchor="middle"
                    fontFamily="DM Mono, ui-monospace, monospace"
                    fontSize="10.5" fontWeight="600"
                    fill="#2F6E47" letterSpacing="0.04em">
                    +{skill.pts} pts
                  </text>
                  {/* Aurora-glow bubble star — radii proportional to pts */}
                  <circle cx={x} cy={y} r={haloR} fill="rgba(119,200,154,0.10)" />
                  <circle cx={x} cy={y} r={midR}  fill="rgba(119,200,154,0.28)" />
                  <circle cx={x} cy={y} r={coreR} fill="#2F6E47"
                    style={{ filter: `drop-shadow(0 0 ${glowPx}px rgba(119,200,154,0.85))` }} />
                  {/* Skill name below halo */}
                  <text x={x} y={y + haloR + 11}
                    textAnchor="middle"
                    fontFamily="Fraunces, Georgia, serif"
                    fontSize="10.5" fontWeight="500"
                    fill="#121A2B" letterSpacing="-0.005em">
                    {skill.lines.map((ln, li) => (
                      <tspan key={li} x={x} dy={li === 0 ? 0 : 11}>{ln}</tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Score callout — sum of all 5 */}
          <div style={{
            textAlign: 'center', marginTop: 6,
            opacity: revealed ? 1 : 0,
            transition: 'opacity 0.6s ease 0.7s',
          }}>
            <div style={{
              fontFamily: 'var(--qf-mono)', fontSize: 10,
              letterSpacing: '0.22em', color: 'var(--qf-ink-mute)',
              textTransform: 'uppercase',
            }}>
              Your fastest path
            </div>
            <div style={{
              fontFamily: 'var(--qf-display)', fontSize: 28,
              letterSpacing: '-0.02em', color: 'var(--qf-forest)',
              fontWeight: 500, marginTop: 2, lineHeight: 1,
            }}>
              <em>+{totalPts} points</em>
            </div>
          </div>

        </div>

        {/* Inline framing — no eyebrows */}
        {/* Below image: 2 sentences, no space between */}
        <div>
          <p className="qf-lead" style={{ margin: 0 }}>
            {weeks && dateShort ? (
              <>With <em>{weeks} weeks</em> until the {dateShort} SAT, you need to quickly figure out the skills costing them points and build a personalized plan.</>
            ) : (
              <>You need to quickly figure out the skills costing them points and build a personalized plan.</>
            )}
          </p>
        </div>
      </div>
    </QFScreen>
  );
}

// ─── I · Method (Slide 1: visual beat — 3-image collage, no text) ───────────
export function QFIMethod({ onContinue, onBack }) {
  return (
    <QFScreen stepIdx={10} onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>How it works</QFButton>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Tutor — large hero, 16:10 */}
        <div style={{
          width: '100%', aspectRatio: '16 / 10', borderRadius: 14, overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(135deg, #1A4D2F 0%, #2F6E47 50%, #0057A8 100%)',
        }}>
          <img
            src="/photos/tutor-single.jpg"
            alt="An illuminairy tutor"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
            }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* Below: 2-column grid — student + score report */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {/* Student photo */}
          <div style={{
            aspectRatio: '1 / 1', borderRadius: 14, overflow: 'hidden',
            position: 'relative',
            background: 'linear-gradient(135deg, #C8E6CF 0%, #77C89A 70%, #2F6E47 100%)',
          }}>
            <img
              src="/photos/student-hero.jpg"
              alt="An illuminairy student"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
              }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          {/* Score report — designed in code, no asset needed */}
          <div style={{
            aspectRatio: '1 / 1', borderRadius: 14, overflow: 'hidden',
            background: 'var(--qf-paper)',
            border: '1px solid var(--qf-line)',
            padding: '14px 12px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            boxShadow: '0 2px 12px rgba(20,32,46,0.06)',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--qf-mono)', fontSize: 8.5, letterSpacing: '0.2em',
                color: 'var(--qf-ink-mute)', textTransform: 'uppercase', fontWeight: 600,
              }}>Score Report</div>
              <div style={{
                fontFamily: 'var(--qf-mono)', fontSize: 8, color: 'var(--qf-ink-mute)',
                marginTop: 3, letterSpacing: '0.04em',
              }}>Sept 12, 2026</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--qf-mono)', fontSize: 11, color: 'var(--qf-ink-mute)',
                letterSpacing: '0.06em',
              }}>1180 →</div>
              <div style={{
                fontFamily: 'var(--qf-display)', fontSize: 42, color: 'var(--qf-forest)',
                fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1, marginTop: 2,
              }}>1410</div>
              <div style={{
                fontFamily: 'var(--qf-mono)', fontSize: 10, color: 'var(--qf-forest)',
                marginTop: 6, fontWeight: 600, letterSpacing: '0.08em',
              }}>+230 pts</div>
            </div>
            <div style={{
              fontFamily: 'var(--qf-mono)', fontSize: 7.5, color: 'var(--qf-forest)',
              letterSpacing: '0.06em', fontWeight: 600, textAlign: 'center',
            }}>
              ✓ ALGEBRA  ✓ READING  ✓ GEOMETRY
            </div>
          </div>
        </div>
      </div>
    </QFScreen>
  );
}

// ─── I · Steps (Slide 2: Hims-style — plan mockup + floating callouts) ───────
export function QFISteps({ onContinue, onBack }) {
  const planRows = [
    { wk: 'Wk 1',     label: 'Diagnostic',          pts: null },
    { wk: 'Wk 2',     label: 'Linear Functions',    pts: '+50' },
    { wk: 'Wk 3',     label: 'Right Triangles',     pts: '+45' },
    { wk: 'Wk 4',     label: 'Quadratics',          pts: '+40' },
    { wk: 'Wk 5',     label: 'Word Problems',       pts: '+35' },
    { wk: 'Wk 6',     label: 'Functions & Graphs',  pts: '+30' },
    { wk: 'Wk 7–10',  label: 'Drills + retests',    pts: null },
    { wk: 'Wk 11',    label: 'Pacing simulations',  pts: null },
    { wk: 'Wk 12',    label: 'Test day',            pts: null },
  ];
  return (
    <QFScreen stepIdx={11} onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>See their projection</QFButton>}
    >
      <div style={{ paddingTop: 8 }}>
        {/* Plan mockup with 3 floating Hims-style callouts */}
        <div style={{ position: 'relative' }}>
          {/* Plan card */}
          <div style={{
            background: 'var(--qf-paper)',
            border: '1px solid var(--qf-line)',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 4px 18px rgba(20,32,46,0.08)',
          }}>
            {/* Header */}
            <div style={{
              background: 'var(--qf-ink)', padding: '10px 14px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.2em',
                color: 'rgba(245,248,250,0.6)', textTransform: 'uppercase',
              }}>12-Week Plan</span>
              <span style={{
                fontFamily: 'var(--qf-body)', fontSize: 12, fontWeight: 600,
                color: 'var(--qf-glow)',
              }}>Goal: 1400</span>
            </div>

            {/* Rows */}
            {planRows.map((r, i) => {
              const isSkill = !!r.pts;
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '64px 1fr auto',
                  alignItems: 'center', gap: 10,
                  padding: '10px 14px',
                  borderTop: i > 0 ? '1px solid var(--qf-line)' : 'none',
                  background: isSkill ? 'var(--qf-forest-soft)' : undefined,
                }}>
                  <span style={{
                    fontFamily: 'var(--qf-mono)', fontSize: 10,
                    color: 'var(--qf-ink-mute)', letterSpacing: '0.06em', fontWeight: 600,
                  }}>{r.wk}</span>
                  <span style={{
                    fontFamily: 'var(--qf-body)', fontSize: 13.5,
                    color: 'var(--qf-ink)',
                    fontWeight: isSkill ? 600 : 400,
                  }}>{r.label}</span>
                  {r.pts && (
                    <span style={{
                      fontFamily: 'var(--qf-mono)', fontSize: 11,
                      color: 'var(--qf-forest)', fontWeight: 600, letterSpacing: '0.04em',
                    }}>{r.pts}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Callout 1: DIAGNOSE — points to the skill rows */}
          <div style={{
            position: 'absolute',
            top: 70, left: -14,
            transform: 'rotate(-2deg)',
            background: 'var(--qf-paper)',
            border: '1px solid var(--qf-forest)',
            borderRadius: 10,
            padding: '8px 12px',
            boxShadow: '0 6px 14px rgba(47,110,71,0.20)',
            maxWidth: 140,
          }}>
            <div style={{
              fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.18em',
              color: 'var(--qf-forest)', fontWeight: 600, textTransform: 'uppercase',
            }}>Diagnose</div>
            <div style={{
              fontFamily: 'var(--qf-body)', fontSize: 11,
              color: 'var(--qf-ink-2)', marginTop: 2, lineHeight: 1.3,
            }}>Top 5–6 skills.</div>
          </div>

          {/* Callout 2: RANK — points to the +pts column */}
          <div style={{
            position: 'absolute',
            top: 200, right: -14,
            transform: 'rotate(2deg)',
            background: 'var(--qf-paper)',
            border: '1px solid var(--qf-forest)',
            borderRadius: 10,
            padding: '8px 12px',
            boxShadow: '0 6px 14px rgba(47,110,71,0.20)',
            maxWidth: 140,
          }}>
            <div style={{
              fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.18em',
              color: 'var(--qf-forest)', fontWeight: 600, textTransform: 'uppercase',
            }}>Rank</div>
            <div style={{
              fontFamily: 'var(--qf-body)', fontSize: 11,
              color: 'var(--qf-ink-2)', marginTop: 2, lineHeight: 1.3,
            }}>By point impact.</div>
          </div>

          {/* Callout 3: PLAN — points to the test-day row */}
          <div style={{
            position: 'absolute',
            bottom: 14, left: -14,
            transform: 'rotate(-1.5deg)',
            background: 'var(--qf-paper)',
            border: '1px solid var(--qf-forest)',
            borderRadius: 10,
            padding: '8px 12px',
            boxShadow: '0 6px 14px rgba(47,110,71,0.20)',
            maxWidth: 150,
          }}>
            <div style={{
              fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.18em',
              color: 'var(--qf-forest)', fontWeight: 600, textTransform: 'uppercase',
            }}>Plan</div>
            <div style={{
              fontFamily: 'var(--qf-body)', fontSize: 11,
              color: 'var(--qf-ink-2)', marginTop: 2, lineHeight: 1.3,
            }}>Scheduled to test day.</div>
          </div>
        </div>
      </div>
    </QFScreen>
  );
}
