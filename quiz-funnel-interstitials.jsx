// Quiz funnel — Interstitials (I1, I2, I3) + visual score-projection (V1).
// All use the same QFScreen chrome but have distinctive layouts.

// ─────────────────────────────────────────────────────────────
// I1 · BRIDGE TO ROOT CAUSE (step 6)
//   Two-line interstitial: plan promise (date + Q2 stakes outcome) → honest
//   pivot to root-cause why they've struggled. Dynamic per Q2 answer.
//
//   Props:
//   - q2:    one of 'top-choice' | 'merit' | 'selective' | 'app-rounds' | 'early'
//   - vars:  override the resolved test_date_phrase / stakes_outcome directly
//
//   STAKES_OUTCOME flows after "so that ___". All entries grammar-checked
//   to read naturally with the Line 1 template.
// ─────────────────────────────────────────────────────────────
const STAKES_OUTCOME = {
  'top-choice': "they can get into their top-choice school",
  'merit':      "they can qualify for merit scholarships",
  'selective':  "they're competitive at selective colleges",
  'app-rounds': "they don't miss their early application rounds",   // Q2-A
  'early':      "they're ready for their early application rounds", // Q2-B
};

function QFI1Proof({ onContinue = () => {}, q2 = 'top-choice', vars = {} }) {
  const v = {
    test_date_phrase: 'October 3rd',
    stakes_outcome:   STAKES_OUTCOME[q2] || STAKES_OUTCOME['top-choice'],
    ...vars,
  };
  const hasDate = v.test_date_phrase && v.test_date_phrase !== 'unsure';
  return (
    <QFScreen
      stepIdx={6}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <div style={{ marginTop: 8 }}>
        <h1 className="qf-h1" style={{ marginBottom: 0 }}>
          {hasDate ? (
            <>Let&apos;s build your plan for the {v.test_date_phrase} SAT so {v.stakes_outcome}.</>
          ) : (
            <>Let&apos;s build your plan before test day so {v.stakes_outcome}.</>
          )}
        </h1>
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// I2 · COMPUTE / "BUILDING YOUR PLAN" (step 9) — synthetic loading screen
//   System reviews inputs (Q3/Q4/Q5/Q6) and synthesizes a plan frame.
//   Dark mode + starfield + aurora glow. Mono status lines, mint dynamic
//   values, pulsing handoff line. Sets up Q8 Goal as the "missing input".
// ─────────────────────────────────────────────────────────────
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
  'math':       'math section',
  'reading':    'reading & writing',
  'self-study': 'self-study not sticking',
  'wont':       'getting them to study consistently',
  'no-plan':    'no clear study plan',
  'too-busy':   'packed schedule',
};

function QFI2Compute({
  onContinue = () => {},
  q4 = '1200-1300',
  q5 = 'oct3',
  q6 = ['math', 'no-plan'],
}) {
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

  // Pre-built star positions (fixed for stability, fits 360x700 viewport).
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

  return (
    <QFScreen stepIdx={9} tone="ink"
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <svg className="qf-starfield" viewBox="0 0 360 700" preserveAspectRatio="xMidYMid slice">
        {STARS.map(([x, y, o, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={o} />
        ))}
      </svg>
      <div className="qf-aurora-band" />

      <div className="qf-compute">
        <div className="compute-eyebrow">Building your plan</div>

        <div className="compute-section">
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

        <div className="compute-section">
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

        <div className="compute-pulse">
          <span className="dot" />
          Detecting missing inputs…
        </div>
        <div className="compute-arrow">→ <span className="v">Target score required</span></div>
      </div>
    </QFScreen>
  );
}

// Compute · light recap (readable — no starfield / binary / locked buttons)
function QFI2ComputeCalm({
  onContinue = () => {},
  q4 = '1200-1300',
  q5 = 'oct3',
  q6 = ['math', 'no-plan'],
}) {
  const hasQ4 = q4 && q4 !== 'na' && CQ4_BANDS[q4];
  const hasDate = q5 && q5 !== 'tbd' && q5 !== '2027';
  const problemSummary = q6.slice(0, 2).map(id => CQ6_PHRASE[id] || id).join(' + ');

  const TEST_DATES = {
    aug22: new Date('2026-08-22'), oct3: new Date('2026-10-03'),
    nov7: new Date('2026-11-07'), dec5: new Date('2026-12-05'),
  };
  const today = new Date('2026-05-26');
  const daysToTest = TEST_DATES[q5]
    ? Math.round((TEST_DATES[q5] - today) / (1000 * 60 * 60 * 24))
    : null;

  const chips = [];
  if (hasQ4) chips.push(CQ4_BANDS[q4]);
  if (hasDate) chips.push(CQ5_SHORT[q5] || CQ5_LONG[q5]);
  if (daysToTest) chips.push(`${daysToTest} days`);
  if (problemSummary) chips.push(problemSummary);

  return (
    <QFScreen
      stepIdx={10}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <h1 className="qf-h1">Got it — one more question.</h1>
      {chips.length > 0 && (
        <div className="qf-chip-row" aria-hidden="true">
          {chips.map(c => (
            <span key={c} className="qf-chip-pill">{c}</span>
          ))}
        </div>
      )}
    </QFScreen>
  );
}

const BUILD_Q7 = {
  khan: 'Khan / Bluebook',
  group: 'Group class',
  online: 'Online course',
  app: 'SAT app',
  book: 'Prep book',
  nothing: 'Not much prep',
};
const BUILD_Q6 = {
  math: 'Math',
  reading: 'Reading & writing',
  'self-study': 'Self-study not sticking',
  'no-plan': 'No clear plan',
  wont: "Won't study alone",
  'too-busy': 'Too busy',
};

// Build plan · parent labels, light stagger (before goal score question)
function QFI2BuildPlan({
  onContinue = () => {},
  q4 = '1200-1300',
  q5 = 'oct3',
  q6 = ['math', 'no-plan'],
  q7 = ['khan'],
}) {
  const hasQ4 = q4 && q4 !== 'na' && CQ4_BANDS[q4];
  const hasDate = q5 && q5 !== 'tbd' && q5 !== '2027';
  const TEST_DATES = {
    aug22: new Date('2026-08-22'), oct3: new Date('2026-10-03'),
    nov7: new Date('2026-11-07'), dec5: new Date('2026-12-05'),
  };
  const today = new Date('2026-05-26');
  const daysToTest = TEST_DATES[q5]
    ? Math.round((TEST_DATES[q5] - today) / (1000 * 60 * 60 * 24))
    : null;

  const tried = (q7 || []).map(id => BUILD_Q7[id]).filter(Boolean).join(' · ');
  const blockers = (q6 || []).map(id => BUILD_Q6[id]).filter(Boolean).join(' · ');
  const failedParts = [tried, blockers].filter(Boolean);
  const whatFailed = failedParts.length ? failedParts.join(' · ') : null;

  const stepDefs = [];
  if (hasQ4) stepDefs.push({ label: 'Last scored', value: CQ4_BANDS[q4] });
  if (hasDate) stepDefs.push({ label: 'Next test', value: CQ5_LONG[q5] || CQ5_SHORT[q5] });
  if (daysToTest) stepDefs.push({ label: 'Days to prepare', value: `${daysToTest} days` });
  if (whatFailed) stepDefs.push({ label: "What hasn't worked", value: whatFailed });
  stepDefs.push({ label: 'Building their plan', value: '…', pulse: true });
  stepDefs.push({ label: 'Still need', value: 'Their target score', pending: true });

  const [shown, setShown] = React.useState(0);

  React.useEffect(() => {
    setShown(0);
    const timers = [];
    for (let i = 1; i <= stepDefs.length; i += 1) {
      timers.push(setTimeout(() => setShown(i), 380 * i));
    }
    return () => timers.forEach(clearTimeout);
  }, [q4, q5, (q6 || []).join(','), (q7 || []).join(',')]);

  return (
    <QFScreen
      stepIdx={10}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <h1 className="qf-h1" style={{ marginBottom: 20 }}>
        Building their plan from what you shared.
      </h1>
      <div className="qf-build-list">
        {stepDefs.slice(0, shown).map((step, i) => (
          <div
            key={step.label}
            className={
              'qf-build-row'
              + (step.pending ? ' qf-build-row--pending' : '')
              + (step.pulse ? ' qf-build-row--pulse' : '')
            }
          >
            <span className="qf-build-ck">{step.pending ? '→' : '✓'}</span>
            <span className="qf-build-lbl">{step.label}</span>
            <span className="qf-build-val">{step.value}</span>
          </div>
        ))}
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// I3 · BRIDGE / GOOD NEWS (step 11)
//   After Q8 Goal. Optimistic framing of timeline + personalized-plan
//   tease + "one more question" handoff to Q9 GPA.
// ─────────────────────────────────────────────────────────────
const BR_TEST_DATES = {
  'aug22': new Date('2026-08-22'), 'oct3': new Date('2026-10-03'),
  'nov7': new Date('2026-11-07'), 'dec5': new Date('2026-12-05'),
};
const BR_DATE_NUMERIC = {
  'aug22': '8/22', 'oct3': '10/3', 'nov7': '11/7', 'dec5': '12/5',
};

function QFI3Bridge({
  onContinue = () => {},
  q5 = 'oct3',
}) {
  const today = new Date('2026-05-26');
  const daysToTest = BR_TEST_DATES[q5]
    ? Math.round((BR_TEST_DATES[q5] - today) / (1000 * 60 * 60 * 24))
    : null;
  const dateNumeric = BR_DATE_NUMERIC[q5];
  const hasDate = daysToTest && dateNumeric;

  return (
    <QFScreen
      stepIdx={11}
      ornament="glow"
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

// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// I · GPA GAP (step 13a) — between Q9 GPA and V1 Projection.
//   "Strong GPA. Lower SAT than you'd expect." Two cards: IN SCHOOL vs
//   ON THE SAT. Show only when gpa >= 3.0 AND q4 present AND q4 < 1400.
// ─────────────────────────────────────────────────────────────
const GAP_Q4_LABEL = {
  'u1000': 'under 1000', '1100-1200': '1100–1200',
  '1200-1300': '1200–1300', '1300-1400': '1300–1400',
};
const GAP_Q9_LABEL = {
  '3.0-3.5': '3.0–3.5', '3.5-3.8': '3.5–3.8', '3.8-4.0': '3.8–4.0', '4.0+': '4.0+',
};

const GPA_HABIT_ROWS = [
  { school: 'Reading', sat: 'Skimming' },
  { school: 'Showing work', sat: 'Calculator' },
  { school: 'Double-checking', sat: 'Moving on' },
  { school: 'Sticking with one hard problem', sat: 'Skipping and coming back' },
];

function QFIGPAGap({
  onContinue = () => {},
  q4 = '1200-1300',
  q9 = '3.8-4.0',
}) {
  return (
    <QFScreen
      stepIdx={13}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <div className="qf-gpa-gap-screen">
        <h1 className="qf-h1">Why smart kids struggle on the SAT</h1>
        <div className="qf-card qf-habit-table-wrap">
          <table className="qf-habit-table">
            <thead>
              <tr>
                <th scope="col">In school</th>
                <th scope="col">On the SAT</th>
              </tr>
            </thead>
            <tbody>
              {GPA_HABIT_ROWS.map(row => (
                <tr key={row.school}>
                  <td>{row.school}</td>
                  <td>{row.sat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// V1 · VISUAL SCORE PROJECTION (step 13) — Noom-style graph
//   The big "here's where we think they'll land" moment.
// ─────────────────────────────────────────────────────────────
function QFV1Projection({
  // Derive everything from the actual quiz answers.
  q4 = '1200-1300',     // recent SAT band
  q5 = 'oct3',          // test date
  q8 = '1400-1500',     // goal
  // Explicit overrides win (for storybook / canvas previews).
  current: currentProp,
  target: targetProp,
  projected: projectedProp,
  testDate: testDateProp,
  onContinue = () => {},
}) {
  // ── Map Q4 → midpoint of the band the parent selected ────────────────
  const Q4_TO_SCORE = {
    'u1000':     950,
    '1100-1200': 1150,
    '1200-1300': 1250,
    '1300-1400': 1350,
    '1400plus':  1430,
  };
  const current = currentProp ?? Q4_TO_SCORE[q4] ?? 1250;

  // ── Map Q8 band → numeric target anchor. ──
  const Q8_TO_TARGET = {
    '1200-1300': 1250,
    '1300-1400': 1350,
    '1400-1500': 1450,
    '1500plus': 1500,
  };
  const target = targetProp ?? Q8_TO_TARGET[q8] ?? Math.min(1600, Math.round((current + 200) / 50) * 50);

  // ── Map Q5 → human-readable test date phrase ──────────────────────────
  const Q5_TO_DATE = {
    'aug22': 'Aug 22',
    'oct3':  'Oct 3',
    'nov7':  'Nov 7',
    'dec5':  'Dec 5',
    '2027':  'spring 2027',
    'tbd':   'test day',
  };
  const testDate = testDateProp ?? Q5_TO_DATE[q5] ?? 'test day';
  const hasFixedDate = ['aug22', 'oct3', 'nov7', 'dec5'].includes(q5);

  // ── Projected score ──────────────────────────────────────────────────
  //   Realistic gain from a full 1:1 plan ≈ +180 (matches the +182 stat).
  //   Cap at goal; don't promise above goal even if gain exceeds it.
  //   If test date is sooner (Aug 22), scale gain down proportionally.
  const REALISTIC_GAIN = 180;
  let gain = REALISTIC_GAIN;
  if (q5 === 'aug22') gain = 130;   // ~6 wk runway
  if (q5 === '2027' || q5 === 'tbd') gain = REALISTIC_GAIN;
  const projected = projectedProp ?? Math.min(target, current + gain);

  // Inline SVG line chart — 4 plot points, current → projected curve.
  // Coordinate system: 0,0 top-left → 320 × 160 viewBox.
  const W = 320, H = 160;
  const points = [
    { x: 12,  y: H - 18,  lbl: 'Now',     val: current,   isNow: true },
    { x: 116, y: H - 60,  lbl: 'Week 4',  val: current + Math.round((projected - current) * 0.42) },
    { x: 218, y: H - 100, lbl: 'Week 8',  val: current + Math.round((projected - current) * 0.78) },
    { x: W - 12, y: 22,   lbl: testDate,  val: projected, isEnd: true },
  ];
  const path = `M ${points[0].x} ${points[0].y} 
    Q ${points[0].x + 40} ${points[0].y - 8}, ${points[1].x} ${points[1].y}
    T ${points[2].x} ${points[2].y}
    T ${points[3].x} ${points[3].y}`;

  return (
    <QFScreen
      stepIdx={13}
      footer={<QFButton kind="forest" onClick={onContinue}>Next</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1 center" style={{ textAlign: 'center' }}>
          {hasFixedDate
            ? <>By <em>{testDate}</em>, they could be at <em>{projected}</em>.</>
            : <>They could be at <em>{projected}</em> by <em>{testDate}</em>.</>}
        </h1>
        <div className="qf-graph">
          {/* Header: current vs target chips */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
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

          {/* Chart */}
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 170, display: 'block' }}>
            <defs>
              <linearGradient id="qf-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%"   stopColor="#205040" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#205040" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Target line (dashed) */}
            <line x1="0" x2={W} y1={32} y2={32}
              stroke="rgba(20,32,46,0.18)" strokeWidth="1" strokeDasharray="3 3" />
            <text x={W - 2} y={28} fontFamily="DM Mono" fontSize="8.5"
              fill="rgba(20,32,46,0.5)" letterSpacing="1.2" textAnchor="end">TARGET {target}</text>

            {/* Area fill below the line */}
            <path d={`${path} L ${W - 12} ${H} L 12 ${H} Z`} fill="url(#qf-fill)" />
            {/* Curve */}
            <path d={path} fill="none" stroke="#205040" strokeWidth="2.2" strokeLinecap="round" />

            {/* Points */}
            {points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={p.isEnd ? 7 : 4.5}
                  fill={p.isEnd ? '#205040' : (p.isNow ? '#14202E' : '#205040')}
                  stroke="#FFFFFF" strokeWidth={p.isEnd ? 3 : 2} />
                {p.isEnd && (
                  <circle cx={p.x} cy={p.y} r="14"
                    fill="none" stroke="#205040" strokeOpacity="0.25" strokeWidth="1.5" />
                )}
              </g>
            ))}
          </svg>

          {/* X-axis labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px', marginTop: 6 }}>
            {points.map((p, i) => (
              <div key={i} style={{
                fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.15em',
                color: p.isEnd ? 'var(--qf-forest)' : 'var(--qf-ink-mute)',
                fontWeight: p.isEnd ? 600 : 400,
                textTransform: 'uppercase',
              }}>{p.lbl}</div>
            ))}
          </div>
        </div>

      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// I · DIAGNOSIS (screen 09) — Hims-style: ONE root-cause sentence + chart.
//   Pattern from /satplan: "Why group SAT classes fail" — not "Here's what we see."
//   Verbose multi-block version → QFIDiagnosisVerbose (canvas archive only).
// ─────────────────────────────────────────────────────────────
const D_CHART_LEVEL1 = [
  { method: 'Self-study / SAT app',       points: 40,  color: 'rgba(20,32,46,0.30)' },
  { method: 'Group class or course',      points: 70,  color: 'rgba(20,32,46,0.55)' },
  { method: '1:1 tutoring + diagnostic',  points: 182, color: 'var(--qf-forest)', hot: true },
];

const D_BLOCK_A = {
  'khan':    "With Khan, YouTube, and Bluebook, we usually see one of these: your kid watches videos and never fully gets it without someone teaching them; they get the video but don't do enough reps to remember it on test day; they grind problems on content they don't know; or they only practice what they already know because they can't tell what they're missing.",
  'group':   "Your kid sat through a group class covering all 28 SAT skills on the class schedule, but the score still didn't move the way you need. In a room of many students, nobody built a plan for the few skills actually costing your kid points.",
  'online':  "Same idea as group: one syllabus for everyone. It doesn't diagnose your kid's biggest point leaks, build a plan for the top 5–6, and teach them one-on-one until mastered.",
  'app':     "Your kid put in time on a SAT app, but the score still didn't move. The SAT tests 28 skills. The app keeps serving practice questions — it doesn't tell them which skills to focus on or teach them until they can do it on test day.",
  'book':    "SAT prep books train the paper SAT: hand math, slow reading on a page. Your kid takes a digital test on a laptop with Desmos, an on-screen formula sheet, and a timer. Paper prep doesn't teach when to use the calculator or how to pace on screen.",
  'nothing': "The SAT spans 28 skills across years of school. Without a diagnostic that ranks what to fix first, most students guess where to start and lose months on low-impact review.",
};
const D_Q7_PRIORITY = ['khan', 'group', 'online', 'app', 'book', 'nothing'];
const D_Q6_PRIORITY = ['math', 'reading', 'no-plan', 'wont', 'self-study', 'too-busy'];

// Block B — SINGLE: lookup keyed by [Q7][Q6]. Covers Khan + the most
// likely fallback. Other Q7 paths fall back to the Block A copy.
const D_SINGLE_B = {
  'khan': {
    'math':       "Khan teaches classroom math, usually by hand on paper. About half of students feel rushed or run out of time on SAT Math. Problems that take over a minute by hand can take under 15 seconds with Desmos. Watching videos doesn't train when to use the built-in calculator on test day.",
    'reading':    "Khan and YouTube reading help often means read the passage, then answer, like English class. On the SAT that's usually too slow. Nobody is coaching them to read the question first and move on.",
    'no-plan':    "There's no real plan, just whatever video or Bluebook set they open that day. They're not identifying what they don't know, so they keep working on the wrong things.",
    'wont':       "It's easy to watch a video and call it a study session. Without someone checking whether they can actually do the problems, not much sticks.",
    'self-study': "They're putting in time, but a lot of it is videos they never fully learned, problems on content they still don't understand, or easy problems they already know. None of that fixes what they're actually missing.",
    'too-busy':   "When time is short, they grab a quick video instead of sitting down on the one type of problem they keep missing.",
  },
};

// Block B — DUAL: 15 combos (Q6 × Q6 in priority order). Independent
// of Q7 since Block A already explains the prep failure.
const D_DUAL_B = {
  'math+reading':       "On math, about half of students feel rushed; hand work on Desmos-friendly problems costs time. On reading, question-first pacing beats rereading like English class. Fixing one section without the other leaves points on the table.",
  'math+no-plan':       "In math, they may know the content but lose points when problems take a minute by hand that Desmos could solve in seconds. Without a plan for the top 5–6 skills, practice spreads everywhere instead of fixing those leaks.",
  'math+wont':          "The math issue is often Desmos and pacing, not ability. About half of students feel rushed on SAT Math. Without someone reviewing misses with them, calculator habits don't stick.",
  'math+self-study':    "They study, but often hand math on paper. The digital test rewards Desmos. Self-study without 1:1 coaching on misses rarely trains when to use the calculator.",
  'math+too-busy':      "When time is tight, the win is Desmos on the question types they miss, not more generic problems. Hand work eats the clock.",
  'reading+no-plan':    "Reading strategy and study structure are both off. They may be reading too slowly because they were never taught question-first pacing. Without a ranked plan, any reading practice is guesswork about what will actually move the score.",
  'reading+wont':       "The reading fix is a habit change, and habit changes need repetition with accountability. Passages alone on the kitchen table rarely stick without someone coaching the strategy and checking the work.",
  'reading+self-study': "They're studying, but likely the way they read in English class, not the way the SAT is scored. More self-study without coaching the read strategy often cements the slower habit.",
  'reading+too-busy':   "Busy students can't afford slow reading on the SAT. The win is a faster read method on the passage types that show up most, scheduled like any other commitment, not 'read more when you can.'",
  'no-plan+wont':       "A plan only works if it gets executed. Right now there's no ranked roadmap, and there's no consistent structure to make prep happen. Those two problems reinforce each other.",
  'no-plan+self-study': "Self-study fails when nobody ranks the skills. They're working, but probably on low-impact topics while the gaps that cost points stay open.",
  'no-plan+too-busy':   "A packed schedule demands a short, ranked list of what to do each week. Without that, SAT prep becomes whatever is left at the end of the day, which is usually nothing.",
  'wont+self-study':    "They may care about the score, but left alone they default to easier practice or skip reviewing misses. That's not laziness — it's missing structure, deadlines, and someone to make the work accountable.",
  'wont+too-busy':      "If it's not scheduled, it won't happen. School works because it's on the calendar. SAT prep needs the same kind of structure, especially when every hour is already spoken for.",
  'self-study+too-busy':"Limited time makes random self-study expensive. They need the few skills that move the score most, on the calendar, with someone checking whether the practice actually fixed the misses.",
};

const D_BLOCK_C = "Self-study and group class don't move scores much for most families. One-on-one does. We run a diagnostic on the 28 skills, build a plan for the top 5–6 skills costing your kid the most points, and teach each skill 1:1 until they can do it on test day. Practice on their own reinforces what the tutor taught.";

const D_TEST_DATE_SHORT = {
  'aug22': 'August 22', 'oct3': 'October 3', 'nov7': 'November 7', 'dec5': 'December 5',
};
const D_TEST_DATES = {
  'aug22': new Date('2026-08-22'), 'oct3': new Date('2026-10-03'),
  'nov7': new Date('2026-11-07'), 'dec5': new Date('2026-12-05'),
};

// One Hims-style headline per Q7 path (/satplan prep-failed-* pattern).
const D_DIAG_HEADLINE = {
  khan:    'Why Khan and Bluebook aren\u2019t moving their score.',
  group:   'Why group SAT classes fail.',
  online:  'Why online SAT courses fail.',
  app:     'Why SAT apps fail to raise scores.',
  book:    'Why paper prep fails the digital SAT.',
  nothing: 'Why guessing what to study fails.',
};

const D_COMPARE_LINE_1 = {
  khan: 'What they tried on Khan and Bluebook usually can\u2019t beat a tutor on the misses they keep making.',
  group: 'A group class can\u2019t pause for their weak spots \u2014 1:1 tutoring can.',
  online: 'A fixed online course isn\u2019t built around their gaps \u2014 1:1 is.',
  app: 'An app drills questions; it doesn\u2019t teach through their mistakes.',
  book: 'Paper prep doesn\u2019t train digital pacing and Desmos.',
  nothing: 'Without a plan, they\u2019re studying blind \u2014 1:1 starts with a diagnostic.',
};

const D_Q7_CHART_IDX = {
  khan: 0, app: 0, book: 0, nothing: 0,
  group: 1, online: 1,
};

function QFCompareBar({ bar, max, delayMs, theirs }) {
  const [heightPct, setHeightPct] = React.useState(0);
  React.useEffect(() => {
    setHeightPct(0);
    const t = setTimeout(() => {
      setHeightPct((bar.points / max) * 100);
    }, delayMs);
    return () => clearTimeout(t);
  }, [bar.points, delayMs]);
  const lbl = theirs ? `${bar.method} (them)` : bar.method;
  return (
    <div className="qf-v-col">
      <div className={'qf-chart-points qf-v-points' + (bar.hot ? ' qf-chart-points--hot' : '')}>
        +{bar.points}
      </div>
      <div className="qf-v-track">
        <div
          className="qf-v-fill"
          style={{
            height: `${heightPct}%`,
            background: bar.color,
          }}
        />
      </div>
      <div className={'qf-chart-lbl qf-v-lbl' + (theirs || bar.hot ? ' qf-chart-lbl--hot' : '')}>
        {lbl}
      </div>
    </div>
  );
}

function QFIDiagnosisCompare({
  onContinue = () => {},
  q6 = ['math', 'no-plan'],
  q7 = ['khan'],
}) {
  const aKey = D_Q7_PRIORITY.find(p => q7.includes(p)) || 'nothing';
  const chartIdx = D_Q7_CHART_IDX[aKey] != null ? D_Q7_CHART_IDX[aKey] : 0;
  const line1 = D_COMPARE_LINE_1[aKey] || D_COMPARE_LINE_1.nothing;
  const line2 = 'A diagnostic ranks the 5\u20136 skills costing them the most points.';

  return (
    <QFScreen
      stepIdx={9}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <div className="qf-diag-compact">
        <h1 className="qf-h1 qf-diag-title">
          Let&apos;s compare how they&apos;ve been prepping to what actually moves scores.
        </h1>

        <div className="qf-card qf-diag-chart">
          <div className="qf-v-chart">
            {D_CHART_LEVEL1.map((b, i) => (
              <QFCompareBar
                key={b.method}
                bar={b}
                max={182}
                delayMs={220 + i * 260}
                theirs={i === chartIdx}
              />
            ))}
          </div>
        </div>

        <p className="qf-lead qf-diag-lead qf-diag-lead--first">{line1}</p>
        <p className="qf-lead qf-diag-lead">{line2}</p>

        <p className="qf-cite">
          Source: College Board retake summaries; illuminairy completed plans (n=95). Individual results vary.
        </p>
      </div>
    </QFScreen>
  );
}

function QFIDiagnosis({
  onContinue = () => {},
  q6 = ['math', 'no-plan'],
  q7 = ['khan'],
  q5 = 'oct3',
}) {
  const aKey = D_Q7_PRIORITY.find(p => q7.includes(p)) || 'nothing';
  const headline = D_DIAG_HEADLINE[aKey] || D_DIAG_HEADLINE.nothing;

  return (
    <QFScreen
      stepIdx={9}
      flushBody
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <div className="qf-diag-compact">
        <h1 className="qf-h1" style={{ marginBottom: 20 }}>
          {headline}
        </h1>

        <div className="qf-card qf-diag-chart" style={{ padding: 18 }}>
          {D_CHART_LEVEL1.map((b, i) => {
            const max = 182;
            const widthPct = (b.points / max) * 100;
            return (
              <div key={i} className="qf-chart-row" style={{ marginBottom: i === D_CHART_LEVEL1.length - 1 ? 0 : 12 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5,
                }}>
                  <span style={{
                    fontSize: 12, fontWeight: b.hot ? 600 : 500,
                    color: b.hot ? 'var(--qf-forest)' : 'var(--qf-ink-2)',
                  }}>{b.method}</span>
                  <span style={{
                    fontFamily: 'var(--qf-body)', fontSize: b.hot ? 22 : 15, fontWeight: 600,
                    color: b.hot ? 'var(--qf-forest)' : 'var(--qf-ink-mid)',
                  }}>+{b.points}</span>
                </div>
                <div style={{ height: 5, background: 'rgba(20,32,46,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${widthPct}%`, height: '100%', background: b.color, borderRadius: 4 }} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </QFScreen>
  );
}

function QFIDiagnosisVerbose({
  onContinue = () => {},
  q6 = ['math', 'no-plan'],
  q7 = ['khan'],
  q5 = 'oct3',
}) {
  const aKey = D_Q7_PRIORITY.find(p => q7.includes(p)) || 'nothing';
  const blockA = D_BLOCK_A[aKey];
  const bKeys = D_Q6_PRIORITY.filter(p => q6.includes(p)).slice(0, 2);
  let blockB = '';
  if (bKeys.length >= 2) blockB = D_DUAL_B[`${bKeys[0]}+${bKeys[1]}`] || '';
  else if (bKeys.length === 1) blockB = D_SINGLE_B[aKey]?.[bKeys[0]] || '';
  const today = new Date('2026-05-26');
  const days = D_TEST_DATES[q5]
    ? Math.round((D_TEST_DATES[q5] - today) / (1000 * 60 * 60 * 24))
    : null;
  const dateShort = D_TEST_DATE_SHORT[q5];
  const blockD = (days && dateShort)
    ? `Good news: we can build that plan with one-on-one tutoring before the ${dateShort} SAT. You still have about ${days} days to get this right.`
    : 'Good news: we can build that plan with one-on-one tutoring before the test.';
  const labelStyle = { color: 'var(--qf-forest)', marginBottom: 8 };

  return (
    <QFScreen stepIdx={9} footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}>
      <div className="gap-22" style={{ marginTop: 4 }}>
        <h1 className="qf-h1">Here&apos;s what we&apos;re <em>seeing</em>.</h1>
        <div>
          <div className="qf-meta" style={labelStyle}>The 28-skill problem</div>
          <p className="qf-lead" style={{ marginBottom: 18 }}>
            The SAT covers <em>28 skills</em> across years of school. Most prep tries to cover all 28 — it never diagnoses which few are actually costing your kid the most points.
          </p>
          <div className="qf-card" style={{ padding: 18 }}>
            <div className="qf-meta" style={{ color: 'var(--qf-ink-mute)', marginBottom: 14 }}>Avg points between retakes</div>
            {D_CHART_LEVEL1.map((b, i) => {
              const max = 182;
              const width = (b.points / max) * 100;
              return (
                <div key={i} style={{ marginBottom: i === D_CHART_LEVEL1.length - 1 ? 0 : 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: b.hot ? 600 : 500, color: b.hot ? 'var(--qf-forest)' : 'var(--qf-ink-2)' }}>{b.method}</span>
                    <span style={{ fontFamily: 'var(--qf-display)', fontSize: b.hot ? 24 : 16, fontWeight: 500, color: b.hot ? 'var(--qf-forest)' : 'var(--qf-ink-mid)' }}>+{b.points}</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(20,32,46,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${width}%`, height: '100%', background: b.color, borderRadius: 4 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div><div className="qf-meta" style={labelStyle}>How they prepped</div><p className="qf-lead">{blockA}</p></div>
        {blockB && <div><div className="qf-meta" style={labelStyle}>What&apos;s actually wrong</div><p className="qf-lead">{blockB}</p></div>}
        <div><div className="qf-meta" style={labelStyle}>What they need</div><p className="qf-lead">{D_BLOCK_C}</p></div>
        <div><div className="qf-meta" style={labelStyle}>Good news</div><p className="qf-lead">{blockD}</p></div>
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// I · DIAGNOSIS REPORT (variant of step 9) — row-based diagnostic
//   Same Q6 + Q7 inputs, different format: "mini diagnostic report" with
//   profile match % + matched rows for what they tried + where they
//   struggle. Clinical, skimmable. Sibling of QFIDiagnosis (paragraphs).
// ─────────────────────────────────────────────────────────────
const REPORT_Q7 = {
  'khan':    { label: 'Khan / Bluebook / YouTube', why: 'Good for practice after you know what to fix. Without a ranked gap list, study spreads across the whole test.', works: 'Diagnose the 3–5 skills costing points, then practice those on digital Bluebook.', source: 'Digital SAT prep model' },
  'group':   { label: 'In-person group class', why: "Same pace for every student. Weak skills rarely get enough depth; strong topics get time they don't need.", works: "Rank skills by score impact; 1:1 on misses the class can't pause for.", source: 'illuminairy diagnostic' },
  'online':  { label: 'Online course or class', why: "Syllabus built for everyone, not ranked for your kid's next test date.", works: 'Short list of highest-impact skills + scheduled execution.', source: 'SAT score-impact model' },
  'app':     { label: 'SAT App', why: "Built for practice, not learning. More questions they can't solve won't raise the score.", works: 'Teach the skill behind the miss, then drill with purpose.', source: 'Mistake-driven prep' },
  'book':    { label: 'SAT Prep Book', why: 'Teaches the paper SAT. Test day is digital: laptop, Desmos, on-screen timer, different pace.', works: 'Train digital tools and pacing on the real interface.', source: 'College Board · Digital SAT' },
  'nothing': { label: "Didn't prepare much", why: '28 skills on the test. Without a ranked starting point, "study more" hits the wrong topics first.', works: 'Diagnostic first, then a week-by-week plan before test day.', source: 'illuminairy diagnostic' },
};
const REPORT_Q7_ORDER = ['khan', 'group', 'online', 'app', 'book', 'nothing'];

const REPORT_Q6 = {
  'math':       { label: 'Math', cause: 'Digital SAT math rewards Desmos and the on-screen formula sheet. Hand work often causes time loss even when they know the content.', todo: 'Train calculator strategy and pacing on missed question types.' },
  'reading':    { label: 'Reading & writing', cause: 'School-style read-and-reread is too slow for the clock.', todo: 'Question-first reading, one efficient pass, move on.' },
  'no-plan':    { label: 'No clear study plan', cause: 'Practice spreads across 28 skills instead of the few that move the score this month.', todo: 'Week-by-week plan ranked by score impact.' },
  'wont':       { label: "Won't study on their own", cause: 'No structure to choose what to study, review misses, or stay accountable.', todo: 'Scheduled sessions + someone working through wrong answers with them.' },
  'self-study': { label: "Self-study isn't working", cause: 'Time on the wrong skills or wrong format (paper habits for a digital test).', todo: 'Diagnose gaps first, then targeted learn + drill.' },
  'too-busy':   { label: 'Schedule too packed', cause: "If it's not on the calendar like school, it usually doesn't happen.", todo: 'Highest-impact skills only, locked to specific times.' },
};
const REPORT_Q6_PRIORITY = ['math', 'reading', 'no-plan', 'wont', 'self-study', 'too-busy'];

function QFIDiagnosisReport({
  onContinue = () => {},
  q6 = ['math', 'no-plan'],
  q7 = ['khan', 'app'],
  q5 = 'oct3',
}) {
  const triedRows = REPORT_Q7_ORDER.filter(id => q7.includes(id));
  const struggleRows = REPORT_Q6_PRIORITY.filter(id => q6.includes(id)).slice(0, 2);
  const profileMatch = Math.min(94, 84 + (triedRows.length + struggleRows.length) * 2);

  const today = new Date('2026-05-26');
  const days = D_TEST_DATES[q5]
    ? Math.round((D_TEST_DATES[q5] - today) / (1000 * 60 * 60 * 24))
    : null;
  const dateShort = D_TEST_DATE_SHORT[q5];
  const goodNews = (days && dateShort)
    ? `Good news: we can build that plan with one-on-one tutoring before the ${dateShort} SAT. You still have about ${days} days to get this right.`
    : `Good news: we can build that plan with one-on-one tutoring before the test.`;

  const rowCard = { background: 'var(--qf-paper)', border: '1px solid var(--qf-line)', borderRadius: 12, padding: 16, marginBottom: 10 };
  const fieldLabel = { fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--qf-ink-mute)', fontWeight: 500, marginTop: 6 };
  const fieldValue = { fontSize: 13.5, lineHeight: 1.5, color: 'var(--qf-ink-2)', fontWeight: 400, marginTop: 3 };
  const rowHead = { fontFamily: 'var(--qf-display)', fontSize: 17, fontWeight: 500, color: 'var(--qf-ink)', letterSpacing: '-0.01em', marginBottom: 10, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 };
  const matchBadge = { fontFamily: 'var(--qf-mono)', fontSize: 11, color: 'var(--qf-forest)', fontWeight: 500, flexShrink: 0 };

  return (
    <QFScreen stepIdx={9}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <div className="gap-22" style={{ marginTop: 4 }}>
        <div>
          <div className="qf-meta" style={{ color: 'var(--qf-forest)', marginBottom: 8 }}>SAT prep diagnostic</div>
          <div style={{ fontFamily: 'var(--qf-display)', fontSize: 24, fontWeight: 500, color: 'var(--qf-ink)', letterSpacing: '-0.02em', lineHeight: 1.18 }}>
            Based on your answers, <em>{profileMatch}% profile match</em>.
          </div>
        </div>

        <div>
          <div className="qf-meta" style={{ marginBottom: 12 }}>What they tried</div>
          {triedRows.map(id => {
            const r = REPORT_Q7[id];
            return (
              <div key={id} style={rowCard}>
                <div style={rowHead}><span>{r.label}</span></div>
                <div style={fieldLabel}>Why it didn't move the score</div>
                <div style={fieldValue}>{r.why}</div>
                <div style={fieldLabel}>What works instead</div>
                <div style={fieldValue}>{r.works}</div>
                <div style={fieldLabel}>Source</div>
                <div style={{ ...fieldValue, color: 'var(--qf-ink-mute)', fontSize: 12 }}>{r.source}</div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="qf-meta" style={{ marginBottom: 12 }}>Where they're struggling</div>
          {struggleRows.map((id, i) => {
            const r = REPORT_Q6[id];
            const rowMatch = Math.max(60, profileMatch - i * 2);
            return (
              <div key={id} style={rowCard}>
                <div style={rowHead}>
                  <span>{r.label}</span>
                  <span style={matchBadge}>{rowMatch}% match</span>
                </div>
                <div style={fieldLabel}>Likely root cause</div>
                <div style={fieldValue}>{r.cause}</div>
                <div style={fieldLabel}>What to do instead</div>
                <div style={fieldValue}>{r.todo}</div>
              </div>
            );
          })}
        </div>

        <div className="gap-14">
          <div>
            <div className="qf-meta" style={{ color: 'var(--qf-forest)', marginBottom: 6 }}>What they need</div>
            <p className="qf-lead">This isn't fixed by hiring a random tutor or assigning more practice. Your kid needs an SAT-specific diagnostic, a plan ranked by what actually moves points, and one-on-one work on the questions they keep missing.</p>
          </div>
          <div>
            <div className="qf-meta" style={{ color: 'var(--qf-forest)', marginBottom: 6 }}>Good news</div>
            <p className="qf-lead">{goodNews}</p>
          </div>
        </div>
      </div>
    </QFScreen>
  );
}

window.QFI1Proof = QFI1Proof;
window.QFI2Compute = QFI2Compute;
window.QFI2ComputeCalm = QFI2ComputeCalm;
window.QFI2BuildPlan = QFI2BuildPlan;
window.QFIDiagnosisCompare = QFIDiagnosisCompare;
window.QFIDiagnosis = QFIDiagnosis;
window.QFIDiagnosisReport = QFIDiagnosisReport;
window.QFI3Bridge = QFI3Bridge;
window.QFI3Method = QFI3Bridge;  // legacy alias
window.QFIGPAGap = QFIGPAGap;
window.QFV1Projection = QFV1Projection;
