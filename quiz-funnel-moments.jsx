// Fun moments — fog wipe, binary compute, tap pops, staggered reveals.
// Dopamine per screen; still no paragraphs.

function QFBinaryRain() {
  const cols = [
    '01101001', '10010110', '00101101', '11010010', '01011001',
    '10100110', '01110010', '10001101', '00110100', '11001011',
  ];
  return (
    <div className="qf-binary-rain" aria-hidden="true">
      {cols.map((bits, i) => (
        <div
          key={i}
          className="qf-binary-col"
          style={{ left: `${4 + i * 9.5}%`, animationDelay: `${i * 0.35}s`, animationDuration: `${6 + (i % 4)}s` }}
        >
          {(bits + bits + bits).split('').map((c, j) => (
            <span key={j}>{c}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function QFConvoToast({ lines, intervalMs = 1100 }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    if (!lines || lines.length < 2) return undefined;
    const id = setInterval(() => {
      setIdx(i => (i + 1) % lines.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [lines, intervalMs]);
  if (!lines || !lines.length) return null;
  return (
    <div className="qf-convo-toast" key={idx}>
      {lines[idx]}
    </div>
  );
}

// Gamified compute — binary + staggered lines + auto-continue
function QFI2ComputeGamified({
  onContinue = () => {},
  q4 = '1200-1300',
  q5 = 'oct3',
  q6 = ['math', 'no-plan'],
}) {
  const hasQ4 = q4 && q4 !== 'na' && typeof CQ4_BANDS !== 'undefined' && CQ4_BANDS[q4];
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

  const [step, setStep] = React.useState(0);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const s1 = setTimeout(() => setStep(1), 500);
    const s2 = setTimeout(() => setStep(2), 1100);
    const s3 = setTimeout(() => setStep(3), 1800);
    const s4 = setTimeout(() => setReady(true), 2600);
    return () => { clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(s4); };
  }, []);

  const convo = [
    'Okay — reading what you shared…',
    'Matching against 95+ real plans…',
    'Almost. One more input next.',
  ];

  return (
    <QFScreen
      stepIdx={9}
      tone="ink"
      showBack={false}
      footer={(
        <QFButton
          kind="forest"
          onClick={onContinue}
          disabled={!ready}
          style={{ opacity: ready ? 1 : 0.45 }}
        >
          {ready ? 'Continue' : 'Analyzing…'}
        </QFButton>
      )}
    >
      <svg className="qf-starfield" viewBox="0 0 360 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[
          [22, 40], [120, 52], [245, 62], [150, 112], [270, 238], [55, 330], [200, 525],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.2} fill="#fff" opacity="0.45" />
        ))}
      </svg>
      <QFBinaryRain />
      <div className="qf-aurora-band" />

      <div className="qf-compute qf-compute-gamified">
        <QFConvoToast lines={convo} intervalMs={900} />
        <div className="compute-eyebrow">Running analysis</div>

        <div className={'compute-section qf-reveal' + (step >= 1 ? ' qf-reveal--in' : '')}>
          <div className="compute-header"><span className="ck">✓</span> Inputs locked</div>
          {hasQ4 && (
            <div className="compute-line">Score band <span className="v">{CQ4_BANDS[q4]}</span></div>
          )}
          {hasDate && (
            <div className="compute-line">Test <span className="v">{CQ5_SHORT[q5]}</span></div>
          )}
        </div>

        <div className={'compute-section qf-reveal' + (step >= 2 ? ' qf-reveal--in' : '')}>
          <div className="compute-header"><span className="ck">✓</span> Plan frame</div>
          {daysToTest && (
            <div className="compute-line"><span className="v">{daysToTest}</span> days on clock</div>
          )}
          {problemSummary && (
            <div className="compute-line">Focus <span className="v">{problemSummary}</span></div>
          )}
        </div>

        <div className={'compute-pulse qf-reveal' + (step >= 3 ? ' qf-reveal--in' : '')}>
          <span className="dot" />
          Need target score →
        </div>
      </div>
    </QFScreen>
  );
}

function QFFogReveal({ children, wipeMs = 1400 }) {
  const [wiped, setWiped] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setWiped(true), 280);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="qf-fog-wrap">
      <div className={'qf-fog-layer' + (wiped ? ' qf-fog-wiped' : '')} aria-hidden="true">
        <div className="qf-fog-label">Your path is in here</div>
        <div className="qf-fog-hint">Wiping the noise…</div>
      </div>
      <div className={'qf-fog-content' + (wiped ? ' qf-fog-content--in' : '')}>
        {children}
      </div>
    </div>
  );
}

function QFV1ProjectionFog(props) {
  return (
    <QFFogReveal>
      <QFV1Projection {...props} />
    </QFFogReveal>
  );
}

function QFMistakeReveal({ children }) {
  return <div className="qf-stagger-reveal">{children}</div>;
}

function qfBandMid(q4) {
  const mids = {
    u1000: 950, '1100-1200': 1150, '1200-1300': 1250,
    '1300-1400': 1350, '1400plus': 1450,
  };
  return mids[q4] || null;
}

// Screen 09 — "Here's what we're seeing" · line-by-line math, then chart.
function QFIDiagnosisComputing({
  onContinue = () => {},
  q4 = '1200-1300',
  q6 = ['math', 'no-plan'],
  q7 = ['khan'],
  q5 = 'oct3',
}) {
  const aKey = (typeof D_Q7_PRIORITY !== 'undefined'
    ? D_Q7_PRIORITY.find(p => q7.includes(p))
    : null) || 'nothing';
  const headline = (typeof D_DIAG_HEADLINE !== 'undefined' && D_DIAG_HEADLINE[aKey])
    ? D_DIAG_HEADLINE[aKey]
    : 'Why their prep path stalled.';

  const q7Label = {
    khan: 'khan + bluebook',
    group: 'group_class',
    online: 'online_course',
    app: 'sat_app',
    book: 'prep_book',
    nothing: 'minimal_prep',
  }[aKey] || 'unknown';

  const blockers = (typeof D_Q6_PRIORITY !== 'undefined'
    ? D_Q6_PRIORITY.filter(p => q6.includes(p)).slice(0, 2)
    : q6.slice(0, 2))
    .map(id => (id || '').replace('self-study', 'self_study'))
    .join(' + ') || '—';

  const scoreBand = (typeof CQ4_BANDS !== 'undefined' && CQ4_BANDS[q4])
    ? CQ4_BANDS[q4]
    : '—';

  const mid = qfBandMid(q4);
  const matchPct = 84 + Math.min(10, (q7.length + q6.length) * 2);
  const simA = (0.78 + (q6.length * 0.02)).toFixed(2);
  const simB = (0.04 + q7.length * 0.02).toFixed(2);
  const simSum = (parseFloat(simA) + parseFloat(simB)).toFixed(2);

  const analysisLines = React.useMemo(() => {
    const rows = [
      { label: 'cohort', pending: 'loading n=95…', value: 'n = 95 plans' },
      { label: 'prep_path', pending: 'encode(q7)…', value: q7Label },
      { label: 'score_band', pending: 'parse(q4)…', value: scoreBand },
    ];
    if (mid) {
      const parts = {
        u1000: [900, 1000], '1100-1200': [1100, 1200], '1200-1300': [1200, 1300],
        '1300-1400': [1300, 1400], '1400plus': [1400, 1500],
      }[q4];
      const baselineExpr = parts
        ? `(${parts[0]}+${parts[1]})/2 = ${mid}`
        : `mid → ${mid}`;
      rows.push({
        label: 'baseline',
        pending: 'mid(band)…',
        value: baselineExpr,
        math: true,
      });
    }
    rows.push(
      { label: 'blockers', pending: 'weight(q6)…', value: blockers },
      {
        label: 'cohort_match',
        pending: 'sim(prep, blockers)…',
        value: `${simA} + ${simB} = ${simSum} → ${matchPct}%`,
        math: true,
      },
      {
        label: 'retake_Δ',
        pending: 'median(gain | cohort)…',
        value: 'self +40 · group +70 · 1:1 +182',
        math: true,
      },
      {
        label: 'skill_rank',
        pending: 'sort(skills, impact)…',
        value: 'rank(28) → top 5–6',
        math: true,
      },
      { label: 'finding', pending: 'render…', value: headline, finding: true },
    );
    return rows;
  }, [aKey, q4, q6.join(','), q7.join(','), scoreBand, mid, matchPct, simA, simB, simSum, headline, q7Label, blockers]);

  const [lineStates, setLineStates] = React.useState([]);
  const [done, setDone] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const terminalRef = React.useRef(null);

  React.useEffect(() => {
    const el = terminalRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lineStates]);

  React.useEffect(() => {
    const n = analysisLines.length;
    setLineStates(analysisLines.map(() => 'hidden'));
    setDone(false);
    setShowResult(false);

    const timers = [];
    const workMs = 420;
    const gapMs = 110;
    let at = 140;

    for (let i = 0; i < n; i += 1) {
      const li = i;
      timers.push(setTimeout(() => {
        setLineStates(prev => {
          const base = prev.length === n ? [...prev] : analysisLines.map(() => 'hidden');
          base[li] = 'working';
          return base;
        });
      }, at));
      at += workMs;
      timers.push(setTimeout(() => {
        setLineStates(prev => {
          const next = [...prev];
          next[li] = 'done';
          return next;
        });
      }, at));
      at += gapMs;
    }
    timers.push(setTimeout(() => setDone(true), at + 60));
    timers.push(setTimeout(() => setShowResult(true), at + 480));

    return () => timers.forEach(clearTimeout);
  }, [analysisLines]);

  const chartData = typeof D_CHART_LEVEL1 !== 'undefined' ? D_CHART_LEVEL1 : [
    { method: 'Self-study', points: 40, color: 'rgba(20,32,46,0.30)' },
    { method: 'Group class', points: 70, color: 'rgba(20,32,46,0.55)' },
    { method: '1:1 + diagnostic', points: 182, color: 'var(--qf-forest)', hot: true },
  ];

  return (
    <QFScreen
      stepIdx={9}
      flushBody
      footer={(
        <QFButton
          kind="forest"
          onClick={onContinue}
          disabled={!showResult}
          style={{ opacity: showResult ? 1 : 0.45 }}
        >
          {showResult ? 'Continue' : 'Analyzing…'}
        </QFButton>
      )}
    >
      <div className="qf-diag-analyze">
        <h1 className="qf-h1" style={{ marginBottom: 6, fontSize: 26 }}>
          Here&apos;s what we&apos;re <em>seeing</em>.
        </h1>
        <p className="qf-meta" style={{ color: 'var(--qf-forest)', marginBottom: 14 }}>
          {done ? 'Analysis complete' : 'Running analysis…'}
          {!done && <span className="qf-analyze-cursor"> ▍</span>}
        </p>

        <div className="qf-analyze-terminal">
          <QFBinaryRain />
          <div className="qf-analyze-terminal-inner" ref={terminalRef}>
            {analysisLines.map((line, i) => {
              const st = lineStates[i] || 'hidden';
              if (st === 'hidden') return null;
              const working = st === 'working';
              return (
                <div
                  key={line.label}
                  className={
                    'qf-analyze-line'
                    + (line.finding ? ' qf-analyze-line--finding' : '')
                    + (working ? ' qf-analyze-line--working' : '')
                    + (line.math ? ' qf-analyze-line--math' : '')
                  }
                >
                  <span className="qf-analyze-k">{line.label}</span>
                  <span className="qf-analyze-v">
                    {working ? (
                      <>
                        <span className="qf-analyze-pending">{line.pending}</span>
                        <span className="qf-analyze-cursor">▍</span>
                      </>
                    ) : (
                      line.value
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={'qf-analyze-result' + (showResult ? ' qf-analyze-result--in' : '')}>
          <div className="qf-card qf-diag-chart qf-chart-pop" style={{ padding: 16 }}>
            <div className="qf-meta" style={{ color: 'var(--qf-ink-mute)', marginBottom: 10 }}>
              Avg gain · retake
            </div>
            {chartData.map((b, i) => {
              const max = 182;
              const widthPct = (b.points / max) * 100;
              return (
                <div key={i} className="qf-chart-row" style={{ marginBottom: i === chartData.length - 1 ? 0 : 10 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4,
                  }}>
                    <span style={{
                      fontSize: 11, fontWeight: b.hot ? 600 : 500,
                      color: b.hot ? 'var(--qf-forest)' : 'var(--qf-ink-2)',
                    }}>{b.method}</span>
                    <span style={{
                      fontFamily: 'var(--qf-display)', fontSize: b.hot ? 20 : 14, fontWeight: 500,
                      color: b.hot ? 'var(--qf-forest)' : 'var(--qf-ink-mid)',
                    }}>+{b.points}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(20,32,46,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${widthPct}%`, height: '100%', background: b.color, borderRadius: 4 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </QFScreen>
  );
}

function QFS16MethodMistakeFun(props) {
  return (
    <QFScreen
      stepIdx={16}
      footer={<QFButton kind="forest" onClick={props.onContinue}>Next</QFButton>}
    >
      <div className="qf-diag-compact">
        <h1 className="qf-h1" style={{ marginBottom: 18 }}>
          Improve faster through <em>mistake-driven</em> learning.
        </h1>
        <QFMistakeReveal>
          <QFMistakeGraphic />
        </QFMistakeReveal>
      </div>
    </QFScreen>
  );
}

window.QFBinaryRain = QFBinaryRain;
window.QFConvoToast = QFConvoToast;
window.QFI2ComputeGamified = QFI2ComputeGamified;
window.QFFogReveal = QFFogReveal;
window.QFV1ProjectionFog = QFV1ProjectionFog;
window.QFMistakeReveal = QFMistakeReveal;
window.QFS16MethodMistakeFun = QFS16MethodMistakeFun;
window.QFIDiagnosisComputing = QFIDiagnosisComputing;
