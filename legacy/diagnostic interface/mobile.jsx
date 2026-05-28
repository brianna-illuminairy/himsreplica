// mobile.jsx — Illuminairy diagnostic, 4 mobile phone screens (390×844)
// Each screen lands one value-prop in the funnel's existing voice.

// ─── Phone shell ───────────────────────────────────────────────

function PhoneFrame({ children }) {
  return (
    <div style={{
      width: 390, height: 844, borderRadius: 54, overflow: 'hidden',
      position: 'relative',
      background: '#000',
      boxShadow: '0 30px 60px -20px rgba(20,26,40,0.28), 0 0 0 1px rgba(0,0,0,0.18)',
      outline: '8px solid #0a0c11',
      outlineOffset: -8,
    }}>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 122, height: 35, borderRadius: 22, background: '#000', zIndex: 50,
      }} />
      {/* status bar (white on dark navy) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 40 }}>
        <IOSStatusBar dark={true} />
      </div>
      {/* screen */}
      <div style={{
        position: 'absolute', inset: 0,
        background: ILL.bg,
        display: 'flex', flexDirection: 'column',
        fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
      }}>
        {children}
      </div>
      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
        height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 8, pointerEvents: 'none',
      }}>
        <div style={{ width: 134, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.85)' }} />
      </div>
    </div>
  );
}

// Navy header with • ILLUMINAIRY + progress
function AppHeader({ progress = 0.35 }) {
  return (
    <div style={{
      background: ILL.navy,
      paddingTop: 56, paddingBottom: 18, paddingLeft: 22, paddingRight: 22,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 4L6 10l6.5 6" stroke="#F5F8FA" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/>
        </svg>
        <Wordmark />
        <div style={{ width: 20 }} />
      </div>
      <div style={{
        height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.10)', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${progress * 100}%`,
          background: ILL.glow, borderRadius: 4,
          boxShadow: `0 0 8px ${ILL.glow}55`,
        }} />
      </div>
    </div>
  );
}

function StickyCTA({ children = 'Continue', onClick, disabled = false }) {
  return (
    <div style={{
      padding: '12px 18px 30px',
      background: `linear-gradient(to top, ${ILL.bg} 70%, ${ILL.bg}00)`,
      flexShrink: 0,
    }}>
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          width: '100%', height: 56, borderRadius: 100,
          background: disabled ? '#C7CDC3' : ILL.green,
          color: '#fff', border: 'none',
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 16, fontWeight: 500, letterSpacing: '0.005em',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, cursor: disabled ? 'default' : 'pointer',
        }}
      >
        <span>{children}</span>
        <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
      </button>
    </div>
  );
}

function Body({ children, style = {} }) {
  return (
    <div style={{
      flex: 1, overflow: 'hidden', padding: '22px 22px 0',
      display: 'flex', flexDirection: 'column',
      ...style,
    }}>{children}</div>
  );
}

Object.assign(window, { PhoneFrame, AppHeader, StickyCTA, Body });

// ════════════════════════════════════════════════════════════════
// STEP 1 · The Diagnostic
// "A diagnostic of all 28 SAT skills."
// ════════════════════════════════════════════════════════════════

const M_STEP1_SKILLS = [
  { name: 'Linear functions',           sec: 'Math', state: 'done' },
  { name: 'Right triangles & trig',     sec: 'Math', state: 'done' },
  { name: 'Boundaries',                 sec: 'R&W',  state: 'done' },
  { name: 'Vocabulary in context',      sec: 'R&W',  state: 'analyzing' },
  { name: 'Systems of equations',       sec: 'Math', state: 'pending' },
  { name: 'Transitions',                sec: 'R&W',  state: 'pending' },
  { name: 'Quadratic functions',        sec: 'Math', state: 'pending' },
  { name: 'Main idea',                  sec: 'R&W',  state: 'pending' },
  { name: 'Circles & arcs',             sec: 'Math', state: 'pending' },
  { name: 'Rhetorical synthesis',       sec: 'R&W',  state: 'pending' },
];

function MSkillRow({ skill }) {
  const isAnalyzing = skill.state === 'analyzing';
  const isDone = skill.state === 'done';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '11px 14px',
      background: isAnalyzing ? ILL.greenBg2 : 'transparent',
      borderRadius: 10,
      marginLeft: -14, marginRight: -14,
    }}>
      <StatusGlyph state={skill.state} size={18} />
      <span style={{
        flex: 1, fontSize: 14.5,
        color: isDone || isAnalyzing ? ILL.ink : ILL.ink2,
        fontWeight: isAnalyzing ? 500 : 400,
      }}>
        {skill.name}
        {isAnalyzing && (
          <span style={{
            fontFamily: "'DM Mono', ui-monospace, monospace",
            fontSize: 9.5, letterSpacing: '0.14em', color: ILL.green,
            marginLeft: 8, textTransform: 'uppercase',
          }}>analyzing…</span>
        )}
      </span>
      <SectionTag section={skill.sec} />
    </div>
  );
}

function MStep1Diagnostic({ onContinue } = {}) {
  return (
    <PhoneFrame>
      <AppHeader progress={0.22} />
      <Body>
        <MonoLabel>Step 1 · Diagnostic</MonoLabel>
        <Display style={{ marginTop: 10 }} size={30}>
          All 28 skills,<br/><GreenEm>measured</GreenEm>.
        </Display>
        <Sub style={{ marginTop: 12 }}>
          Math and Reading & Writing. No skill skipped — that's how we find
          the ones costing them the most points.
        </Sub>

        {/* progress card */}
        <div style={{
          marginTop: 18, padding: '14px 16px',
          background: ILL.card, border: `1px solid ${ILL.cardLine}`,
          borderRadius: 12,
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: 10,
          }}>
            <MonoLabel color={ILL.ink3} size={10}>Diagnostic in progress</MonoLabel>
            <span style={{
              fontFamily: "'Fraunces', Georgia, serif", fontSize: 18,
              color: ILL.ink, fontWeight: 400, fontVariantNumeric: 'tabular-nums',
            }}>
              3<span style={{ color: ILL.ink3 }}> / 28</span>
            </span>
          </div>
          <div style={{
            height: 3, borderRadius: 3, background: '#EEEAE0', overflow: 'hidden',
          }}>
            <div style={{ height: '100%', width: '11%', background: ILL.green }} />
          </div>
        </div>

        {/* skill list */}
        <div style={{ marginTop: 14, flex: 1, overflow: 'hidden' }}>
          {M_STEP1_SKILLS.map((s, i) => <MSkillRow key={i} skill={s} />)}
        </div>

        <div style={{
          textAlign: 'center', padding: '10px 0 6px',
          fontFamily: "'DM Mono', ui-monospace, monospace",
          fontSize: 9.5, letterSpacing: '0.2em', color: ILL.ink3,
          textTransform: 'uppercase',
        }}>
          + 18 more · one session
        </div>
      </Body>
      <StickyCTA onClick={onContinue}>Continue</StickyCTA>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// STEP 2 · Weaknesses ranked
// "Ranked by points lost."
// ════════════════════════════════════════════════════════════════

const M_GAPS = [
  { rank: 1, skill: 'Right triangles & trig', sec: 'Math', pts: -90, hi: true },
  { rank: 2, skill: 'Linear functions',       sec: 'Math', pts: -70 },
  { rank: 3, skill: 'Boundaries',             sec: 'R&W',  pts: -60 },
  { rank: 4, skill: 'Transitions',            sec: 'R&W',  pts: -50 },
  { rank: 5, skill: 'Systems of equations',   sec: 'Math', pts: -40 },
  { rank: 6, skill: 'Vocabulary in context',  sec: 'R&W',  pts: -35 },
];

function MGapRow({ row }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 14px',
      borderLeft: row.hi ? `2px solid ${ILL.green}` : '2px solid transparent',
      background: row.hi ? ILL.greenBg2 : 'transparent',
      borderRadius: row.hi ? '0 10px 10px 0' : 10,
      marginLeft: -14, marginRight: -14,
    }}>
      <span style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: 18, fontWeight: 400,
        color: row.hi ? ILL.ink : ILL.ink3,
        width: 18, flexShrink: 0,
        fontVariantNumeric: 'tabular-nums',
      }}>{row.rank}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14.5, color: ILL.ink, fontWeight: row.hi ? 500 : 400,
          marginBottom: 2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{row.skill}</div>
        <SectionTag section={row.sec} />
      </div>
      <span style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: 19, fontWeight: 400,
        color: ILL.red, fontVariantNumeric: 'tabular-nums',
      }}>
        {row.pts}<span style={{ fontSize: 12, color: ILL.red, marginLeft: 2, opacity: 0.7 }}>pts</span>
      </span>
    </div>
  );
}

function MStep2Weaknesses({ onContinue } = {}) {
  const total = M_GAPS.reduce((s, g) => s + g.pts, 0);
  return (
    <PhoneFrame>
      <AppHeader progress={0.44} />
      <Body>
        <MonoLabel>Step 2 · Results</MonoLabel>
        <Display style={{ marginTop: 10 }} size={30}>
          Ranked by <GreenEm>points<br/>lost</GreenEm>.
        </Display>
        <Sub style={{ marginTop: 12 }}>
          Of all 28 skills, six are doing most of the damage. Worth roughly
          {' '}<span style={{ color: ILL.ink, fontWeight: 500 }}>{Math.abs(total)} points</span> on test day.
        </Sub>

        {/* header row */}
        <div style={{
          marginTop: 18, display: 'flex', alignItems: 'center', gap: 12,
          padding: '0 0 8px',
          borderBottom: `1px solid ${ILL.cardLine}`,
        }}>
          <MonoLabel color={ILL.ink3} size={9.5} ls="0.16em" style={{ width: 18 }}>#</MonoLabel>
          <MonoLabel color={ILL.ink3} size={9.5} ls="0.16em" style={{ flex: 1 }}>Skill</MonoLabel>
          <MonoLabel color={ILL.ink3} size={9.5} ls="0.16em">Impact</MonoLabel>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', marginTop: 4 }}>
          {M_GAPS.map(r => <MGapRow key={r.rank} row={r} />)}
        </div>

        <div style={{
          textAlign: 'center', padding: '8px 0 4px',
          fontFamily: "'DM Mono', ui-monospace, monospace",
          fontSize: 9.5, letterSpacing: '0.2em', color: ILL.ink3,
          textTransform: 'uppercase',
        }}>
          28 skills assessed · top 6 shown
        </div>
      </Body>
      <StickyCTA onClick={onContinue}>See the plan</StickyCTA>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// STEP 3 · The Plan
// "A plan, built around their gaps."
// ════════════════════════════════════════════════════════════════

const M_PLAN_SKILLS = [
  { name: 'Right triangles & trig',   gain: 90 },
  { name: 'Linear functions',         gain: 70 },
  { name: 'Boundaries',               gain: 60 },
  { name: 'Transitions',              gain: 50 },
  { name: 'Systems of equations',     gain: 40 },
];

const M_PLAN_WEEKS = [
  { label: 'Wk 1',     state: 'past', title: 'Diagnostic' },
  { label: 'Wk 2–3',   state: 'now',  title: 'Right triangles' },
  { label: 'Wk 4–5',   state: 'next', title: 'Linear functions' },
  { label: 'Wk 6–7',   state: 'next', title: 'Boundaries' },
  { label: 'Wk 8–9',   state: 'next', title: 'Transitions' },
  { label: 'Wk 10–11', state: 'next', title: 'Systems' },
];

function MStep3Plan({ onContinue } = {}) {
  return (
    <PhoneFrame>
      <AppHeader progress={0.66} />
      <Body>
        <MonoLabel>Step 3 · The Plan</MonoLabel>
        <Display style={{ marginTop: 10 }} size={30}>
          A plan built around<br/><GreenEm>their gaps</GreenEm>.
        </Display>
        <Sub style={{ marginTop: 12 }}>
          Top skills first — ordered by score impact. Twelve weeks, scheduled
          before the Oct 5 test.
        </Sub>

        {/* prioritized skills */}
        <div style={{ marginTop: 18 }}>
          <MonoLabel color={ILL.ink3} size={10}>Prioritized skills</MonoLabel>
          <div style={{ marginTop: 8 }}>
            {M_PLAN_SKILLS.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 0',
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%', background: ILL.ink,
                  flexShrink: 0,
                }} />
                <span style={{ flex: 1, fontSize: 14.5, color: ILL.ink }}>{s.name}</span>
                <span style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 16, color: ILL.green, fontVariantNumeric: 'tabular-nums',
                }}>+{s.gain}<span style={{ fontSize: 11, marginLeft: 2 }}>pts</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div style={{
          margin: '16px 0 14px',
          borderTop: `1px dashed ${ILL.cardLine}`,
        }} />

        {/* timeline */}
        <MonoLabel color={ILL.ink3} size={10}>12-week schedule</MonoLabel>
        <div style={{
          marginTop: 10, display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', gap: 6,
        }}>
          {M_PLAN_WEEKS.map((w, i) => {
            const isPast = w.state === 'past';
            const isNow = w.state === 'now';
            return (
              <div key={i} style={{
                padding: '10px 8px 12px',
                background: isPast ? ILL.greenBg : isNow ? '#fff' : '#fff',
                border: isNow ? `1.5px solid ${ILL.green}` : `1px solid ${ILL.cardLine}`,
                borderRadius: 10,
                minHeight: 64,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <MonoLabel
                  color={isPast || isNow ? ILL.green : ILL.ink3}
                  size={9} ls="0.14em">{w.label}</MonoLabel>
                <span style={{
                  fontSize: 11, fontWeight: 500,
                  color: isNow ? ILL.ink : isPast ? ILL.ink : ILL.ink2,
                  lineHeight: 1.2, marginTop: 6,
                }}>{w.title}</span>
              </div>
            );
          })}
        </div>
      </Body>
      <StickyCTA onClick={onContinue}>See the projection</StickyCTA>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// STEP 4 · Projection
// "By Oct 5, they could be at 1410."
// ════════════════════════════════════════════════════════════════

function MProjectionChart({ width = 332, height = 156 }) {
  // months Aug → Oct, score 1180 → 1410
  const pts = [
    { x: 0.0,  y: 1180 },
    { x: 0.18, y: 1200 },
    { x: 0.36, y: 1240 },
    { x: 0.55, y: 1300 },
    { x: 0.78, y: 1360 },
    { x: 1.0,  y: 1410 },
  ];
  const minY = 1140, maxY = 1440;
  const padL = 8, padR = 8, padT = 18, padB = 28;
  const ch = height - padT - padB, cw = width - padL - padR;
  const X = x => padL + x * cw;
  const Y = v => padT + ((maxY - v) / (maxY - minY)) * ch;

  // smooth path
  const d = pts.map((p, i) => {
    const x = X(p.x), y = Y(p.y);
    if (i === 0) return `M ${x} ${y}`;
    const prev = pts[i - 1];
    const cx1 = X(prev.x + (p.x - prev.x) * 0.5);
    const cy1 = Y(prev.y);
    const cx2 = X(prev.x + (p.x - prev.x) * 0.5);
    const cy2 = Y(p.y);
    return `C ${cx1} ${cy1} ${cx2} ${cy2} ${x} ${y}`;
  }).join(' ');

  const areaD = d + ` L ${X(1)} ${padT + ch} L ${X(0)} ${padT + ch} Z`;
  const last = pts[pts.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="m-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ILL.green} stopOpacity="0.18"/>
          <stop offset="100%" stopColor={ILL.green} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* target line */}
      <line x1={padL} x2={width - padR} y1={Y(1400)} y2={Y(1400)}
            stroke={ILL.ink3} strokeWidth="0.6" strokeDasharray="2 3" opacity="0.5"/>
      <text x={width - padR} y={Y(1400) - 4} textAnchor="end"
            fontFamily="'DM Mono', monospace" fontSize="8" fill={ILL.ink3}
            letterSpacing="0.14em">TARGET 1400</text>

      <path d={areaD} fill="url(#m-area)" />
      <path d={d} fill="none" stroke={ILL.green} strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"/>

      {/* start dot */}
      <circle cx={X(0)} cy={Y(1180)} r="3.5" fill={ILL.ink} />
      {/* end dot with halo */}
      <circle cx={X(last.x)} cy={Y(last.y)} r="9" fill={ILL.green} opacity="0.15" />
      <circle cx={X(last.x)} cy={Y(last.y)} r="5" fill={ILL.green} />
      <circle cx={X(last.x)} cy={Y(last.y)} r="2" fill="#fff" />

      {/* x-axis labels */}
      {[
        { x: 0.0,  l: 'NOW' },
        { x: 0.36, l: 'WK 4' },
        { x: 0.72, l: 'WK 8' },
        { x: 1.0,  l: 'OCT 5' },
      ].map((t, i) => (
        <text key={i} x={X(t.x)} y={height - 8}
              textAnchor={i === 0 ? 'start' : i === 3 ? 'end' : 'middle'}
              fontFamily="'DM Mono', monospace" fontSize="8.5"
              letterSpacing="0.14em"
              fill={t.l === 'OCT 5' ? ILL.green : ILL.ink3}>{t.l}</text>
      ))}
    </svg>
  );
}

function MStep4Projection({ onContinue } = {}) {
  return (
    <PhoneFrame>
      <AppHeader progress={0.88} />
      <Body>
        <MonoLabel>Step 4 · Projection</MonoLabel>
        <Display style={{ marginTop: 10 }} size={30}>
          By <GreenEm>Oct 5</GreenEm>, they<br/>could be at <GreenEm>1410</GreenEm>.
        </Display>
        <Sub style={{ marginTop: 12 }}>
          Modeled from their diagnostic and schedule. Confirmed after a 1:1
          session with their luminary.
        </Sub>

        {/* score card */}
        <div style={{
          marginTop: 18, padding: '18px 18px 16px',
          background: ILL.card, border: `1px solid ${ILL.cardLine}`, borderRadius: 14,
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            marginBottom: 4,
          }}>
            <div>
              <MonoLabel color={ILL.ink3} size={9.5}>Current</MonoLabel>
              <div style={{
                fontFamily: "'Fraunces', Georgia, serif", fontSize: 32,
                color: ILL.ink, fontWeight: 400, lineHeight: 1.1, marginTop: 2,
                fontVariantNumeric: 'tabular-nums',
              }}>1180</div>
            </div>
            <svg width="22" height="14" viewBox="0 0 22 14" style={{ marginTop: 14 }}>
              <path d="M3 7H19M19 7L14 2M19 7L14 12" stroke={ILL.ink3} strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ textAlign: 'right' }}>
              <MonoLabel color={ILL.green} size={9.5}>Projected</MonoLabel>
              <div style={{
                fontFamily: "'Fraunces', Georgia, serif", fontSize: 32,
                color: ILL.green, fontWeight: 400, lineHeight: 1.1, marginTop: 2,
                fontVariantNumeric: 'tabular-nums',
              }}>1380–1410</div>
            </div>
          </div>
          {/* chart */}
          <div style={{ marginTop: 14, marginLeft: -2, marginRight: -2 }}>
            <MProjectionChart width={314} height={140} />
          </div>
        </div>

        {/* "what's behind this" note */}
        <div style={{
          marginTop: 14, padding: '12px 14px',
          background: ILL.greenBg, borderRadius: 12,
        }}>
          <MonoLabel color={ILL.green} size={9.5}>What's behind this number</MonoLabel>
          <p style={{
            margin: '6px 0 0', fontSize: 13, color: ILL.ink2, lineHeight: 1.5,
          }}>
            Modeled from <span style={{ color: ILL.ink, fontWeight: 500 }}>95 plans</span>
            {' '}matching their profile. +230 points across 12 weeks.
          </p>
        </div>
      </Body>
      <StickyCTA onClick={onContinue}>See their luminary</StickyCTA>
    </PhoneFrame>
  );
}

Object.assign(window, {
  MStep1Diagnostic, MStep2Weaknesses, MStep3Plan, MStep4Projection,
});
