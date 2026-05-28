// funnel.jsx — Single-screen animated diagnostic graphic for the in-funnel context
// One screen, one morphing card. 4 stages: Diagnose → Rank → Plan → Project.
// Loops automatically.

// ─── plan data ──────────────────────────────────────────────────────────

const PLAN = [
  { key: 'RT',    name: 'Right triangles & trig', short: 'Right triangles', sec: 'Math', weeks: 3, gain: 75, lost: -75 },
  { key: 'LF',    name: 'Linear functions',       short: 'Linear functions', sec: 'Math', weeks: 2, gain: 60, lost: -60 },
  { key: 'BND',   name: 'Boundaries',             short: 'Boundaries',     sec: 'R&W',  weeks: 2, gain: 45, lost: -45 },
  { key: 'TRANS', name: 'Transitions',            short: 'Transitions',    sec: 'R&W',  weeks: 2, gain: 35, lost: -35 },
  { key: 'SYS',   name: 'Systems of equations',   short: 'Systems',        sec: 'Math', weeks: 1, gain: 15, lost: -15 },
];

const START_SCORE  = 1180;
const TARGET_LOW   = 1380;
const TARGET_HIGH  = 1410;
const TOTAL_WEEKS  = 12;

// computed: cumulative scores at end of each skill
function cumulativeScores() {
  const out = [START_SCORE];
  let cur = START_SCORE;
  PLAN.forEach(p => { cur += p.gain; out.push(cur); });
  return out;
}
// week assignment: Wk 1 = diagnostic, then skill spans, last = retest
function weekAssignments() {
  const cells = new Array(TOTAL_WEEKS).fill(null);
  cells[0] = { kind: 'diag', label: 'Dx' };
  let w = 1;
  PLAN.forEach((p, i) => {
    for (let j = 0; j < p.weeks; j++) {
      cells[w + j] = { kind: 'skill', skill: p, idx: i, sessionInSkill: j, startsBlock: j === 0, endsBlock: j === p.weeks - 1 };
    }
    w += p.weeks;
  });
  cells[TOTAL_WEEKS - 1] = { kind: 'retest', label: 'Rx' };
  return cells;
}

// ─── 4-stage loop ───────────────────────────────────────────────────────

const STAGES = [
  { key: 'diagnose', label: 'Step 1 · Diagnose', duration: 5000 },
  { key: 'rank',     label: 'Step 2 · Rank',     duration: 4000 },
  { key: 'plan',     label: 'Step 3 · Plan',     duration: 6000 },
  { key: 'project',  label: 'Step 4 · Project',  duration: 4500 },
];
const PAUSE_AT_END = 1500;
const LOOP_TOTAL = STAGES.reduce((s, x) => s + x.duration, 0) + PAUSE_AT_END;

// Hook: returns {stageIdx, t (0-1 within stage), elapsedMs, loopFrac}
function useLoop() {
  const [now, setNow] = React.useState(0);
  React.useEffect(() => {
    let raf, start = performance.now();
    const tick = (t) => {
      setNow((t - start) % LOOP_TOTAL);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  let acc = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (now < acc + STAGES[i].duration) {
      return { stageIdx: i, t: (now - acc) / STAGES[i].duration, elapsed: now };
    }
    acc += STAGES[i].duration;
  }
  return { stageIdx: STAGES.length - 1, t: 1, elapsed: now };
}

// ─── Diagnose view ──────────────────────────────────────────────────────
// Scrolling list of 28 skills. Most "SCANNED" gray, top 5 flagged HIGH IMPACT red.

const SCAN_SKILLS = [
  // 28 skill names in scan order; mark which are HIGH IMPACT
  { name: 'Linear equations',          hi: false },
  { name: 'Right triangles & trig',    hi: true },
  { name: 'Vocabulary in context',     hi: false },
  { name: 'Linear functions',          hi: true },
  { name: 'Main idea',                 hi: false },
  { name: 'Quadratic functions',       hi: false },
  { name: 'Boundaries',                hi: true },
  { name: 'Inferences',                hi: false },
  { name: 'Ratios & proportions',      hi: false },
  { name: 'Transitions',               hi: true },
  { name: 'Probability',               hi: false },
  { name: 'Command of evidence',       hi: false },
  { name: 'Systems of equations',      hi: true },
  { name: 'Rhetorical synthesis',      hi: false },
  { name: 'Circles & arcs',            hi: false },
  { name: 'Cross-text connections',    hi: false },
  { name: 'Percentages',               hi: false },
  { name: 'Text structure',            hi: false },
  { name: 'Equivalent expressions',    hi: false },
  { name: 'Words in context',          hi: false },
  { name: 'Two-variable data',         hi: false },
  { name: 'Form, structure, sense',    hi: false },
  { name: 'Area & volume',             hi: false },
  { name: 'Central ideas & details',   hi: false },
  { name: 'Linear inequalities',       hi: false },
  { name: 'Quantitative evidence',     hi: false },
  { name: 'Nonlinear functions',       hi: false },
  { name: 'Pacing & flagging',         hi: false },
];

function DiagnoseView({ t }) {
  // scroll position: skill list moves up over time
  const visibleRows = 6;
  const rowH = 36;
  const totalRows = SCAN_SKILLS.length;
  // Progress through list; we want to see all 28 by t≈0.85, then hold
  const scrollT = Math.min(1, t / 0.88);
  const maxScroll = (totalRows - visibleRows) * rowH;
  const scrollY = scrollT * maxScroll;
  // How many have been "scanned" so far
  const scannedCount = Math.min(28, Math.floor(scrollT * 28) + visibleRows);

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* live count */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 12,
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.22em',
          color: ILL.ink4, textTransform: 'uppercase',
        }}>Scanning skill performance</span>
        <span style={{
          fontFamily: "'Fraunces', Georgia, serif", fontSize: 18,
          color: ILL.ink, fontVariantNumeric: 'tabular-nums',
        }}>
          {scannedCount}<span style={{ color: ILL.ink4 }}> / 28</span>
        </span>
      </div>

      {/* scrolling list viewport */}
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: ILL.bg, border: `1px solid ${ILL.cardLine}`, borderRadius: 8,
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 0,
          transform: `translateY(${-scrollY}px)`,
          transition: 'none',
        }}>
          {SCAN_SKILLS.map((s, i) => {
            // Has this row been scanned yet?
            const scanned = i < scannedCount;
            return (
              <div key={i} style={{
                height: rowH,
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '0 14px',
                borderBottom: `1px solid ${ILL.cardLineSoft}`,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: scanned ? (s.hi ? ILL.red : ILL.greenSoft) : ILL.ink4,
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }} />
                <span style={{
                  flex: 1, fontSize: 13,
                  color: scanned ? ILL.ink : ILL.ink4,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  transition: 'color 0.2s',
                }}>{s.name}</span>
                {scanned && s.hi && (
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 9,
                    letterSpacing: '0.16em', color: ILL.red,
                    fontWeight: 500, textTransform: 'uppercase',
                    flexShrink: 0,
                  }}>High impact</span>
                )}
                {scanned && !s.hi && (
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 9,
                    letterSpacing: '0.16em', color: ILL.ink4,
                    textTransform: 'uppercase', flexShrink: 0,
                  }}>scanned</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Rank view ──────────────────────────────────────────────────────────
// Top 5 high-impact skills slide in one by one, ranked by -pts.

function RankView({ t }) {
  // Each row appears at staggered intervals
  const ROW_REVEAL = 0.16; // each row needs ~16% of stage time to "land"
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 12,
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.22em',
          color: ILL.ink4, textTransform: 'uppercase',
        }}>Ranked by score impact</span>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.16em',
          color: ILL.red, textTransform: 'uppercase',
        }}>−230 pts</span>
      </div>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {PLAN.map((p, i) => {
          const localT = (t - i * ROW_REVEAL) / 0.25;
          const revealed = Math.max(0, Math.min(1, localT));
          return (
            <div key={p.key} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px',
              background: revealed > 0 ? ILL.card : 'transparent',
              border: revealed > 0 ? `1px solid ${ILL.cardLine}` : `1px solid transparent`,
              borderRadius: 8,
              opacity: revealed,
              transform: `translateY(${(1 - revealed) * 12}px)`,
              transition: 'none',
              flex: 1, minHeight: 0,
            }}>
              <span style={{
                fontFamily: "'Fraunces', Georgia, serif", fontSize: 18,
                color: ILL.ink3, width: 18, flexShrink: 0, fontWeight: 500,
                fontVariantNumeric: 'tabular-nums',
              }}>{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13.5, color: ILL.ink, fontWeight: 500,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{p.short}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 9.5,
                  letterSpacing: '0.16em', color: ILL.ink4,
                  textTransform: 'uppercase', marginTop: 1,
                }}>{p.sec}</div>
              </div>
              <span style={{
                fontFamily: "'Fraunces', Georgia, serif", fontSize: 18,
                color: ILL.red, fontVariantNumeric: 'tabular-nums', fontWeight: 500,
              }}>
                {p.lost}<span style={{ fontSize: 11, marginLeft: 2, opacity: 0.7 }}>pts</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Plan view ──────────────────────────────────────────────────────────
// Skills with their week durations & +pts, with progress reflecting timeline build.

function PlanView({ t }) {
  // We reveal each skill block one at a time, then keep them all on screen.
  // Skill[i] appears at t = i * 0.14, fully landed by + 0.16
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 12,
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.22em',
          color: ILL.ink4, textTransform: 'uppercase',
        }}>Building 12-week plan</span>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.16em',
          color: ILL.green, textTransform: 'uppercase',
        }}>+230 pts</span>
      </div>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {PLAN.map((p, i) => {
          const localT = (t - i * 0.13) / 0.22;
          const revealed = Math.max(0, Math.min(1, localT));
          return (
            <div key={p.key} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px',
              background: revealed > 0 ? ILL.greenBg : 'transparent',
              border: revealed > 0 ? `1px solid ${ILL.green}33` : `1px solid transparent`,
              borderRadius: 8,
              opacity: revealed,
              transform: `translateY(${(1 - revealed) * 12}px)`,
              flex: 1, minHeight: 0,
            }}>
              <span style={{
                fontFamily: "'Fraunces', Georgia, serif", fontSize: 18,
                color: ILL.green, width: 18, flexShrink: 0, fontWeight: 500,
                fontVariantNumeric: 'tabular-nums',
              }}>{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13.5, color: ILL.ink, fontWeight: 500,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{p.short}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 9.5,
                  letterSpacing: '0.16em', color: ILL.green,
                  textTransform: 'uppercase', marginTop: 1,
                }}>{p.weeks} {p.weeks === 1 ? 'wk' : 'wks'} · {p.sec}</div>
              </div>
              <span style={{
                fontFamily: "'Fraunces', Georgia, serif", fontSize: 18,
                color: ILL.green, fontVariantNumeric: 'tabular-nums', fontWeight: 500,
              }}>
                +{p.gain}<span style={{ fontSize: 11, marginLeft: 2, opacity: 0.7 }}>pts</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Project view ───────────────────────────────────────────────────────
// 1410 hero moment with target band.

function ProjectView({ t }) {
  // Animate score from 1180 to 1410 over first half of stage, then hold.
  const animT = Math.min(1, t / 0.5);
  const score = Math.round(START_SCORE + animT * (TARGET_HIGH - START_SCORE));
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      gap: 8, textAlign: 'center',
    }}>
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.22em',
        color: ILL.ink4, textTransform: 'uppercase',
      }}>Projected on test day</span>
      <div style={{
        fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500,
        fontSize: 84, lineHeight: 1, color: ILL.green,
        fontVariantNumeric: 'tabular-nums',
        fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 0',
      }}>{score}</div>
      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: 10.5, letterSpacing: '0.22em',
        color: ILL.green, textTransform: 'uppercase',
        marginTop: 4,
      }}>+ {score - START_SCORE} pts · 12 weeks</div>
      <div style={{
        marginTop: 14, padding: '8px 14px',
        background: ILL.greenBg, borderRadius: 100,
        fontFamily: "'DM Mono', monospace", fontSize: 10,
        letterSpacing: '0.16em', color: ILL.green,
        textTransform: 'uppercase',
      }}>
        Band {TARGET_LOW}–{TARGET_HIGH}
      </div>
    </div>
  );
}

// ─── Timeline strip (always visible, fills during stage 2+) ─────────────

function TimelineStrip({ stageIdx, t }) {
  const cells = weekAssignments();

  // Determine how many weeks have been "scheduled" so far
  let scheduled = 0;
  if (stageIdx === 2) {
    // Stage 2 = plan: fill weeks proportional to t
    scheduled = Math.floor(t * (TOTAL_WEEKS + 0.5));
  } else if (stageIdx >= 3) {
    scheduled = TOTAL_WEEKS;
  }

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 6,
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.22em',
          color: ILL.ink4, textTransform: 'uppercase',
        }}>Schedule</span>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.16em',
          color: ILL.ink4, textTransform: 'uppercase',
        }}>varies by test date</span>
      </div>
      {/* week cells */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 3,
        height: 32,
      }}>
        {cells.map((c, i) => {
          const filled = i < scheduled;
          let bg = ILL.bg, border = `1px solid ${ILL.cardLine}`, color = ILL.ink4, label = '';
          if (filled) {
            if (c.kind === 'diag') {
              bg = ILL.navy; color = '#fff'; border = 'none'; label = c.label;
            } else if (c.kind === 'retest') {
              bg = ILL.navy; color = '#fff'; border = 'none'; label = c.label;
            } else if (c.kind === 'skill') {
              bg = ILL.green; color = '#fff'; border = 'none';
              // Show abbreviated key only on the FIRST cell of the skill block
              label = c.startsBlock ? c.skill.key : '';
            }
          } else {
            label = `${i + 1}`;
          }
          return (
            <div key={i} style={{
              background: bg, border,
              borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'DM Mono', monospace",
              fontSize: 8.5, letterSpacing: filled ? '0.06em' : '0',
              color, fontWeight: filled ? 500 : 400,
              transition: 'background 0.15s, color 0.15s',
              overflow: 'hidden',
            }}>{label}</div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Score strip (always visible, fills during stage 2+) ────────────────

function ScoreStrip({ stageIdx, t }) {
  const cumScores = cumulativeScores();
  // current = animates from 1180 up to 1410 across stage 2 and stage 3
  let current = START_SCORE;
  if (stageIdx === 2) {
    // map t (0-1) to progressing through skills
    const skillFloat = t * PLAN.length;
    const skillIdx = Math.min(PLAN.length, Math.floor(skillFloat));
    current = cumScores[skillIdx];
    // Smooth interpolate within current skill
    if (skillIdx < PLAN.length) {
      const frac = skillFloat - skillIdx;
      current = Math.round(cumScores[skillIdx] + frac * (cumScores[skillIdx + 1] - cumScores[skillIdx]));
    }
  } else if (stageIdx >= 3) {
    current = TARGET_HIGH;
  }

  const fillFrac = (current - START_SCORE) / (TARGET_HIGH - START_SCORE);

  return (
    <div style={{ marginTop: 14 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 6,
      }}>
        <div>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.22em',
            color: ILL.ink4, textTransform: 'uppercase',
          }}>Current</div>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif", fontSize: 22,
            color: stageIdx >= 3 ? ILL.green : ILL.ink, fontWeight: 500,
            fontVariantNumeric: 'tabular-nums', lineHeight: 1, marginTop: 2,
            fontVariationSettings: '"opsz" 48, "SOFT" 0, "WONK" 0',
          }}>{current}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.22em',
            color: ILL.green, textTransform: 'uppercase',
          }}>Target</div>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif", fontSize: 16,
            color: ILL.green, fontWeight: 500,
            fontVariantNumeric: 'tabular-nums', lineHeight: 1, marginTop: 2,
          }}>{TARGET_LOW}–{TARGET_HIGH}</div>
        </div>
      </div>
      <div style={{
        height: 4, background: ILL.cardLineSoft, borderRadius: 4, overflow: 'hidden',
        marginTop: 4,
      }}>
        <div style={{
          height: '100%', width: `${fillFrac * 100}%`,
          background: ILL.green, borderRadius: 4,
        }} />
      </div>
    </div>
  );
}

// ─── The morphing card ──────────────────────────────────────────────────

function MorphCard() {
  const { stageIdx, t } = useLoop();
  const stage = STAGES[stageIdx];

  // Pick view by stage
  const View = stageIdx === 0 ? DiagnoseView
             : stageIdx === 1 ? RankView
             : stageIdx === 2 ? PlanView
             : ProjectView;

  return (
    <div style={{
      background: ILL.card, border: `1px solid ${ILL.cardLine}`,
      borderRadius: 16,
      padding: '18px 16px 16px',
      display: 'flex', flexDirection: 'column',
      flex: 1, minHeight: 0,
      boxShadow: '0 1px 2px rgba(18,26,43,0.04)',
    }}>
      {/* tiny stage indicator: 4 segments */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.22em',
          color: ILL.green, textTransform: 'uppercase', fontWeight: 500,
          padding: '3px 8px', background: ILL.greenBg, borderRadius: 100,
          flexShrink: 0,
        }}>Example · 12 wk</span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
        {STAGES.map((s, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 3,
            background: i < stageIdx ? ILL.green
                       : i === stageIdx ? `linear-gradient(to right, ${ILL.green} ${t * 100}%, ${ILL.cardLineSoft} ${t * 100}%)`
                       : ILL.cardLineSoft,
          }} />
        ))}
        </div>
      </div>

      {/* stage label */}
      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: 10.5, letterSpacing: '0.24em',
        color: ILL.green, textTransform: 'uppercase', fontWeight: 500,
        marginBottom: 12,
      }}>{stage.label}</div>

      {/* main morphing view (uses key= to remount cleanly each stage) */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <View t={t} />
      </div>

      {/* persistent strips */}
      <TimelineStrip stageIdx={stageIdx} t={t} />
      <ScoreStrip stageIdx={stageIdx} t={t} />
    </div>
  );
}

// ─── Top-level mobile funnel screen ─────────────────────────────────────

function FunnelScreen() {
  return (
    <PhoneFrame>
      <AppHeader progress={0.62} />
      <div style={{
        flex: 1, padding: '18px 20px 0',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <MonoLabel>How it works</MonoLabel>
        <h1 style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 500, fontSize: 28, lineHeight: 1.08,
          letterSpacing: '-0.012em', color: ILL.ink,
          fontVariationSettings: '"opsz" 72, "SOFT" 0, "WONK" 0',
          margin: '8px 0 10px',
        }}>
          How <GreenEm>every plan</GreenEm> works.
        </h1>
        <p style={{
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 13.5, lineHeight: 1.5, color: ILL.ink2,
          margin: '0 0 14px',
        }}>
          We diagnose 28 SAT skills, rank them by score impact, and schedule
          the biggest gaps first. Plan length flexes to fit the weeks before
          their test.
        </p>

        <MorphCard />

        <p style={{
          fontFamily: "'DM Mono', monospace", fontSize: 9.5,
          letterSpacing: '0.18em', color: ILL.ink4,
          textTransform: 'uppercase', textAlign: 'center',
          margin: '12px 0 0', lineHeight: 1.6,
        }}>
          Plan length flexes · 6 weeks → 6 months
        </p>
      </div>
      <StickyCTA>Start their diagnostic</StickyCTA>
    </PhoneFrame>
  );
}

Object.assign(window, { FunnelScreen });
