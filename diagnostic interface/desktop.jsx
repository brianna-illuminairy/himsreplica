// desktop.jsx — Illuminairy diagnostic, 4 desktop screens (1440×900)
// Designed to live inside a laptop mockup in marketing/animation.
// Same color + type system as mobile; wider layout, hero visual featured.

// ─── Desktop shell ──────────────────────────────────────────────

function DesktopFrame({ children }) {
  return (
    <div style={{
      width: 1440, height: 900,
      background: ILL.bg,
      fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
      color: ILL.ink,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>{children}</div>
  );
}

// Dark navy top bar across full width
function DesktopHeader({ step = 1, student = 'Sophia M.' }) {
  return (
    <div style={{
      height: 64, background: ILL.navy,
      paddingLeft: 36, paddingRight: 36,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0,
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* left: wordmark */}
      <Wordmark size={13} />

      {/* center: step indicator */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        fontFamily: "'DM Mono', ui-monospace, monospace",
        fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'rgba(245,248,250,0.55)',
      }}>
        {[1,2,3,4].map(n => (
          <React.Fragment key={n}>
            <span style={{
              color: n === step ? '#F5F8FA' : 'rgba(245,248,250,0.30)',
              fontWeight: n === step ? 500 : 400,
            }}>
              {n === step && (
                <span style={{
                  display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
                  background: ILL.glow, boxShadow: `0 0 6px ${ILL.glow}`,
                  marginRight: 8, verticalAlign: 'middle',
                }} />
              )}
              0{n} {n === 1 ? 'Diagnostic' : n === 2 ? 'Results' : n === 3 ? 'Plan' : 'Projection'}
            </span>
            {n < 4 && <span style={{ color: 'rgba(245,248,250,0.20)' }}>·</span>}
          </React.Fragment>
        ))}
      </div>

      {/* right: student avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: "'DM Mono', ui-monospace, monospace",
            fontSize: 9.5, letterSpacing: '0.22em',
            color: 'rgba(245,248,250,0.45)', textTransform: 'uppercase',
          }}>Student</div>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif", fontSize: 14,
            color: '#F5F8FA', marginTop: 1, fontStyle: 'italic',
          }}>{student}</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: `linear-gradient(135deg, ${ILL.glow}, ${ILL.blue})`,
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Fraunces', Georgia, serif", fontSize: 14, color: '#fff',
          fontStyle: 'italic',
        }}>S</div>
      </div>
    </div>
  );
}

// Inline footer with disclaimer + CTA
function DesktopFooter({ disclaimer, cta = 'Continue' }) {
  return (
    <div style={{
      flexShrink: 0,
      padding: '20px 48px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderTop: `1px solid ${ILL.cardLineSoft}`,
      background: ILL.bg,
    }}>
      <span style={{
        fontFamily: "'DM Mono', ui-monospace, monospace",
        fontSize: 10, letterSpacing: '0.18em', color: ILL.ink3,
        textTransform: 'uppercase',
      }}>{disclaimer}</span>
      <button style={{
        height: 48, padding: '0 28px', borderRadius: 100,
        background: ILL.green, color: '#fff', border: 'none',
        fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
        fontSize: 14.5, fontWeight: 500, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        {cta}<span style={{ fontSize: 16 }}>→</span>
      </button>
    </div>
  );
}

Object.assign(window, { DesktopFrame, DesktopHeader, DesktopFooter });

// ════════════════════════════════════════════════════════════════
// STEP 1 desktop · 28-skill diagnostic running
// ════════════════════════════════════════════════════════════════

// 28 skill names in a believable order (Math first, then R&W)
const D_ALL_SKILLS = [
  // Math · 14
  { name: 'Linear functions',           sec: 'M', state: 'done' },
  { name: 'Right triangles & trig',     sec: 'M', state: 'done' },
  { name: 'Systems of equations',       sec: 'M', state: 'analyzing' },
  { name: 'Quadratic functions',        sec: 'M', state: 'pending' },
  { name: 'Linear inequalities',        sec: 'M', state: 'pending' },
  { name: 'Nonlinear functions',        sec: 'M', state: 'pending' },
  { name: 'Equivalent expressions',     sec: 'M', state: 'pending' },
  { name: 'Ratios & proportions',       sec: 'M', state: 'pending' },
  { name: 'Percentages',                sec: 'M', state: 'pending' },
  { name: 'Probability',                sec: 'M', state: 'pending' },
  { name: 'Two-variable data',          sec: 'M', state: 'pending' },
  { name: 'Circles & arcs',             sec: 'M', state: 'pending' },
  { name: 'Area & volume',              sec: 'M', state: 'pending' },
  { name: 'Desmos timing',              sec: 'M', state: 'pending' },
  // R&W · 14
  { name: 'Main idea',                  sec: 'R', state: 'done' },
  { name: 'Vocabulary in context',      sec: 'R', state: 'done' },
  { name: 'Boundaries',                 sec: 'R', state: 'done' },
  { name: 'Transitions',                sec: 'R', state: 'pending' },
  { name: 'Rhetorical synthesis',       sec: 'R', state: 'pending' },
  { name: 'Inferences',                 sec: 'R', state: 'pending' },
  { name: 'Command of evidence',        sec: 'R', state: 'pending' },
  { name: 'Cross-text connections',     sec: 'R', state: 'pending' },
  { name: 'Text structure',             sec: 'R', state: 'pending' },
  { name: 'Form, structure, sense',     sec: 'R', state: 'pending' },
  { name: 'Words in context',           sec: 'R', state: 'pending' },
  { name: 'Central ideas & details',    sec: 'R', state: 'pending' },
  { name: 'Quantitative evidence',      sec: 'R', state: 'pending' },
  { name: 'Pacing & flagging',          sec: 'R', state: 'pending' },
];

function DSkillTile({ s }) {
  const isAnalyzing = s.state === 'analyzing';
  const isDone = s.state === 'done';
  return (
    <div style={{
      padding: '12px 13px',
      background: isAnalyzing ? ILL.greenBg2 : ILL.card,
      border: isAnalyzing
        ? `1px solid ${ILL.greenSoft}`
        : isDone
        ? `1px solid ${ILL.cardLine}`
        : `1px solid ${ILL.cardLine}`,
      borderRadius: 10,
      display: 'flex', alignItems: 'center', gap: 10,
      position: 'relative',
      boxShadow: isAnalyzing ? `0 4px 12px ${ILL.greenSoft}22` : 'none',
    }}>
      <StatusGlyph state={s.state} size={16} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 12.5,
          color: isDone || isAnalyzing ? ILL.ink : ILL.ink2,
          fontWeight: isAnalyzing ? 500 : 400,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{s.name}</div>
      </div>
      <span style={{
        fontFamily: "'DM Mono', ui-monospace, monospace",
        fontSize: 9, letterSpacing: '0.12em',
        color: s.sec === 'M' ? ILL.ink3 : ILL.ink3,
        flexShrink: 0,
      }}>{s.sec}</span>
    </div>
  );
}

function DStep1Diagnostic() {
  const done = D_ALL_SKILLS.filter(s => s.state === 'done').length;
  return (
    <DesktopFrame>
      <DesktopHeader step={1} />
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: '440px 1fr',
        gap: 56,
        padding: '56px 48px 36px',
      }}>
        {/* LEFT · headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <MonoLabel>Step 1 · Diagnostic</MonoLabel>
          <Display style={{ marginTop: 18 }} size={56}>
            All 28 skills,<br/><GreenEm>measured</GreenEm>.
          </Display>
          <Sub size={17} style={{ marginTop: 22, maxWidth: 400 }}>
            One session, Math and Reading & Writing combined. No skill skipped —
            that's how we find which ones are costing the most points.
          </Sub>

          {/* progress card */}
          <div style={{
            marginTop: 36, padding: '20px 22px',
            background: ILL.card, border: `1px solid ${ILL.cardLine}`,
            borderRadius: 14, maxWidth: 400,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              marginBottom: 12,
            }}>
              <MonoLabel color={ILL.ink3} size={10.5}>Diagnostic in progress</MonoLabel>
              <span style={{
                fontFamily: "'Fraunces', Georgia, serif", fontSize: 24,
                color: ILL.ink, fontVariantNumeric: 'tabular-nums',
              }}>
                {done}<span style={{ color: ILL.ink3 }}> / 28</span>
              </span>
            </div>
            <div style={{
              height: 4, borderRadius: 4, background: '#EEEAE0', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${(done/28)*100}%`, background: ILL.green,
              }} />
            </div>
            <div style={{
              marginTop: 12, fontSize: 12.5, color: ILL.ink2, lineHeight: 1.5,
            }}>
              Currently analyzing <span style={{ color: ILL.ink, fontWeight: 500 }}>Systems of equations</span>.
              Estimated completion: <span style={{ color: ILL.ink }}>52 min</span>.
            </div>
          </div>

          {/* footnote */}
          <div style={{
            marginTop: 'auto', paddingTop: 24,
            fontFamily: "'DM Mono', ui-monospace, monospace",
            fontSize: 10, letterSpacing: '0.2em',
            color: ILL.ink3, textTransform: 'uppercase',
          }}>
            <span style={{ color: ILL.green }}>● </span>
            14 math · 14 reading & writing · 1 session
          </div>
        </div>

        {/* RIGHT · 28-skill grid */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            marginBottom: 14,
          }}>
            <MonoLabel color={ILL.ink3}>The 28 skills</MonoLabel>
            <div style={{
              display: 'flex', gap: 18,
              fontFamily: "'DM Mono', ui-monospace, monospace",
              fontSize: 10, letterSpacing: '0.14em', color: ILL.ink3,
              textTransform: 'uppercase',
            }}>
              <span><span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                background: ILL.green, marginRight: 6, verticalAlign: 'middle',
              }}/>Complete</span>
              <span><span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                background: ILL.greenSoft, marginRight: 6, verticalAlign: 'middle',
              }}/>Analyzing</span>
              <span><span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                border: '1.5px solid #D5D0C2', marginRight: 6, verticalAlign: 'middle',
              }}/>Pending</span>
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'auto 1fr',
            gap: 18,
          }}>
            {/* Math column */}
            <div>
              <MonoLabel color={ILL.blue} size={9.5} style={{ marginBottom: 10 }}>
                Math · 14 skills
              </MonoLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {D_ALL_SKILLS.filter(s => s.sec === 'M').map((s, i) => (
                  <DSkillTile key={i} s={s} />
                ))}
              </div>
            </div>
            {/* R&W column */}
            <div>
              <MonoLabel color={ILL.green} size={9.5} style={{ marginBottom: 10 }}>
                Reading & Writing · 14 skills
              </MonoLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {D_ALL_SKILLS.filter(s => s.sec === 'R').map((s, i) => (
                  <DSkillTile key={i} s={s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DesktopFooter
        disclaimer="Typical completion · one session, 45–60 min"
        cta="Continue when complete"
      />
    </DesktopFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// STEP 2 desktop · Ranked weaknesses
// ════════════════════════════════════════════════════════════════

const D_GAPS = [
  { rank: 1, skill: 'Right triangles & trig', sec: 'Math', pts: -90, accuracy: 32, hi: true },
  { rank: 2, skill: 'Linear functions',       sec: 'Math', pts: -70, accuracy: 41 },
  { rank: 3, skill: 'Boundaries',             sec: 'R&W',  pts: -60, accuracy: 44 },
  { rank: 4, skill: 'Transitions',            sec: 'R&W',  pts: -50, accuracy: 51 },
  { rank: 5, skill: 'Systems of equations',   sec: 'Math', pts: -40, accuracy: 58 },
  { rank: 6, skill: 'Vocabulary in context',  sec: 'R&W',  pts: -35, accuracy: 62 },
];

function DGapRow({ r, maxAbs }) {
  const barW = Math.abs(r.pts) / maxAbs;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '40px 1fr 90px 1fr 110px',
      alignItems: 'center', gap: 24,
      padding: '20px 24px',
      borderLeft: r.hi ? `3px solid ${ILL.green}` : '3px solid transparent',
      background: r.hi ? ILL.greenBg2 : 'transparent',
      borderRadius: r.hi ? '0 10px 10px 0' : 0,
      borderBottom: `1px solid ${ILL.cardLineSoft}`,
    }}>
      <span style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: 28, color: r.hi ? ILL.ink : ILL.ink3, fontWeight: 400,
        fontVariantNumeric: 'tabular-nums',
      }}>{r.rank}</span>

      <div>
        <div style={{ fontSize: 16, color: ILL.ink, fontWeight: r.hi ? 500 : 400 }}>
          {r.skill}
        </div>
        <div style={{
          marginTop: 4, fontFamily: "'DM Mono', ui-monospace, monospace",
          fontSize: 10.5, letterSpacing: '0.14em', color: ILL.ink3,
          textTransform: 'uppercase',
        }}>{r.sec}</div>
      </div>

      <span style={{
        fontFamily: "'DM Mono', ui-monospace, monospace",
        fontSize: 12, letterSpacing: '0.06em', color: ILL.ink2,
        fontVariantNumeric: 'tabular-nums',
      }}>{r.accuracy}% correct</span>

      {/* impact bar */}
      <div style={{ position: 'relative', height: 8, background: '#EEEAE0', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${barW * 100}%`,
          background: r.hi
            ? `linear-gradient(90deg, ${ILL.red} 0%, ${ILL.red}cc 100%)`
            : `linear-gradient(90deg, ${ILL.red}aa 0%, ${ILL.red}66 100%)`,
        }} />
      </div>

      <span style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: 26, color: ILL.red, fontWeight: 400, textAlign: 'right',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {r.pts}<span style={{ fontSize: 14, marginLeft: 3, opacity: 0.7 }}>pts</span>
      </span>
    </div>
  );
}

function DStep2Weaknesses() {
  const maxAbs = Math.max(...D_GAPS.map(g => Math.abs(g.pts)));
  const total = D_GAPS.reduce((s, g) => s + g.pts, 0);
  return (
    <DesktopFrame>
      <DesktopHeader step={2} />
      <div style={{ flex: 1, padding: '48px 48px 24px', display: 'flex', flexDirection: 'column' }}>
        {/* headline row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 56, alignItems: 'flex-end',
          marginBottom: 32,
        }}>
          <div>
            <MonoLabel>Step 2 · Results</MonoLabel>
            <Display style={{ marginTop: 14 }} size={56}>
              Ranked by <GreenEm>points lost</GreenEm>.
            </Display>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 8 }}>
            <Sub size={17}>
              Of all 28 skills, six are doing most of the damage. Fix these
              and the rest tends to follow.
            </Sub>
            <div style={{
              display: 'flex', gap: 32, alignItems: 'baseline',
            }}>
              <div>
                <MonoLabel color={ILL.ink3} size={10}>Total impact</MonoLabel>
                <div style={{
                  fontFamily: "'Fraunces', Georgia, serif", fontSize: 38,
                  color: ILL.red, lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}>{total}<span style={{ fontSize: 18, marginLeft: 3, opacity: 0.7 }}>pts</span></div>
              </div>
              <div>
                <MonoLabel color={ILL.ink3} size={10}>From current</MonoLabel>
                <div style={{
                  fontFamily: "'Fraunces', Georgia, serif", fontSize: 38,
                  color: ILL.ink, lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}>1180</div>
              </div>
              <div>
                <MonoLabel color={ILL.green} size={10}>Recoverable</MonoLabel>
                <div style={{
                  fontFamily: "'Fraunces', Georgia, serif", fontSize: 38,
                  color: ILL.green, lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}>+{Math.abs(total)}<span style={{ fontSize: 18, marginLeft: 3, opacity: 0.7 }}>pts</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr 90px 1fr 110px',
          alignItems: 'center', gap: 24,
          padding: '12px 24px',
          borderTop: `1px solid ${ILL.cardLine}`,
          borderBottom: `1px solid ${ILL.cardLine}`,
        }}>
          <MonoLabel color={ILL.ink3} size={10}>Rank</MonoLabel>
          <MonoLabel color={ILL.ink3} size={10}>Skill</MonoLabel>
          <MonoLabel color={ILL.ink3} size={10}>Accuracy</MonoLabel>
          <MonoLabel color={ILL.ink3} size={10}>Relative impact</MonoLabel>
          <MonoLabel color={ILL.ink3} size={10} style={{ textAlign: 'right' }}>Est. impact</MonoLabel>
        </div>

        {/* rows */}
        <div style={{ flex: 1 }}>
          {D_GAPS.map(r => <DGapRow key={r.rank} r={r} maxAbs={maxAbs} />)}
        </div>
      </div>

      <DesktopFooter
        disclaimer="28 skills assessed · 22 within target band, top 6 shown"
        cta="See the plan"
      />
    </DesktopFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// STEP 3 desktop · The plan + 12-week timeline
// ════════════════════════════════════════════════════════════════

const D_PLAN_SKILLS = [
  { rank: 1, name: 'Right triangles & trig',   sec: 'Math', gain: 90, weeks: [2,3] },
  { rank: 2, name: 'Linear functions',         sec: 'Math', gain: 70, weeks: [4,5] },
  { rank: 3, name: 'Boundaries',               sec: 'R&W',  gain: 60, weeks: [6,7] },
  { rank: 4, name: 'Transitions',              sec: 'R&W',  gain: 50, weeks: [8,9] },
  { rank: 5, name: 'Systems of equations',     sec: 'Math', gain: 40, weeks: [10,11] },
];

function DStep3Plan() {
  const totalGain = D_PLAN_SKILLS.reduce((s, p) => s + p.gain, 0);
  // Each skill takes 2 weeks; week 1 = diagnostic; week 12 = retest.
  return (
    <DesktopFrame>
      <DesktopHeader step={3} />
      <div style={{ flex: 1, padding: '48px 48px 32px', display: 'flex', flexDirection: 'column' }}>
        {/* headline */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 56, alignItems: 'flex-end',
        }}>
          <div>
            <MonoLabel>Step 3 · The Plan</MonoLabel>
            <Display style={{ marginTop: 14 }} size={56}>
              A plan built around<br/><GreenEm>their gaps</GreenEm>.
            </Display>
          </div>
          <div style={{ paddingBottom: 6 }}>
            <Sub size={17}>
              Top five skills scheduled by score impact. Two weeks each,
              wrapped with a diagnostic at the start and a retest before
              the Oct 5 test.
            </Sub>
          </div>
        </div>

        {/* main grid: prioritized skills left | timeline right */}
        <div style={{
          marginTop: 44, flex: 1,
          display: 'grid', gridTemplateColumns: '420px 1fr',
          gap: 56,
        }}>
          {/* LEFT · prioritized skills */}
          <div>
            <MonoLabel color={ILL.ink3}>Prioritized skills</MonoLabel>
            <div style={{ marginTop: 18 }}>
              {D_PLAN_SKILLS.map((p, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 18,
                  padding: '16px 0',
                  borderBottom: i < D_PLAN_SKILLS.length - 1 ? `1px solid ${ILL.cardLineSoft}` : 'none',
                }}>
                  <span style={{
                    fontFamily: "'Fraunces', Georgia, serif", fontSize: 18,
                    color: ILL.ink3, width: 18, flexShrink: 0,
                  }}>{p.rank}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15.5, color: ILL.ink, fontWeight: 500 }}>{p.name}</div>
                    <div style={{
                      marginTop: 2, fontFamily: "'DM Mono', ui-monospace, monospace",
                      fontSize: 10, letterSpacing: '0.14em', color: ILL.ink3,
                      textTransform: 'uppercase',
                    }}>{p.sec} · Weeks {p.weeks[0]}–{p.weeks[1]}</div>
                  </div>
                  <span style={{
                    fontFamily: "'Fraunces', Georgia, serif", fontSize: 22,
                    color: ILL.green, fontVariantNumeric: 'tabular-nums',
                  }}>+{p.gain}<span style={{ fontSize: 12, marginLeft: 2 }}>pts</span></span>
                </div>
              ))}
              <div style={{
                marginTop: 16, padding: '12px 14px',
                background: ILL.greenBg, borderRadius: 10,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <MonoLabel color={ILL.green} size={10.5}>Estimated total gain</MonoLabel>
                <span style={{
                  fontFamily: "'Fraunces', Georgia, serif", fontSize: 24,
                  color: ILL.green, fontVariantNumeric: 'tabular-nums',
                }}>+{totalGain}<span style={{ fontSize: 13, marginLeft: 3, opacity: 0.8 }}>pts</span></span>
              </div>
            </div>
          </div>

          {/* RIGHT · 12-week timeline */}
          <div>
            <MonoLabel color={ILL.ink3}>12-week schedule · before Oct 5 SAT</MonoLabel>

            {/* week scale */}
            <div style={{ marginTop: 18, position: 'relative' }}>
              {/* week numbers */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4,
                marginBottom: 8,
              }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} style={{
                    fontFamily: "'DM Mono', ui-monospace, monospace",
                    fontSize: 10, color: ILL.ink3, textAlign: 'center',
                    letterSpacing: '0.1em',
                  }}>WK {i + 1}</div>
                ))}
              </div>

              {/* base track */}
              <div style={{
                height: 6, background: '#EEEAE0', borderRadius: 6, position: 'relative',
                marginBottom: 22,
              }}>
                {/* "now" marker at week 2 */}
                <div style={{
                  position: 'absolute',
                  left: `${(1/12)*100}%`,
                  top: -4, bottom: -4,
                  width: 2, background: ILL.green,
                  borderRadius: 2,
                }} />
              </div>

              {/* skill blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* Diagnostic block */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4,
                  alignItems: 'center', height: 38,
                }}>
                  <div style={{
                    gridColumn: '1 / span 1',
                    background: ILL.green, color: '#fff', height: 38,
                    borderRadius: 8, padding: '0 10px',
                    display: 'flex', alignItems: 'center',
                    fontSize: 11, fontWeight: 500,
                  }}>Diagnostic</div>
                </div>

                {D_PLAN_SKILLS.map((p, i) => {
                  const isNow = p.rank === 1;
                  const start = p.weeks[0];
                  return (
                    <div key={i} style={{
                      display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4,
                      alignItems: 'center', height: 38,
                    }}>
                      <div style={{
                        gridColumn: `${start} / span 2`,
                        background: isNow ? ILL.card : ILL.card,
                        border: isNow ? `1.5px solid ${ILL.green}` : `1px solid ${ILL.cardLine}`,
                        height: 38, borderRadius: 8, padding: '0 12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        boxShadow: isNow ? `0 4px 14px ${ILL.green}22` : 'none',
                      }}>
                        <span style={{
                          fontSize: 12, color: ILL.ink, fontWeight: isNow ? 500 : 400,
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>{p.name}</span>
                        <span style={{
                          fontFamily: "'DM Mono', ui-monospace, monospace",
                          fontSize: 9.5, color: ILL.green, letterSpacing: '0.12em',
                          flexShrink: 0, marginLeft: 8,
                        }}>+{p.gain}</span>
                      </div>
                    </div>
                  );
                })}

                {/* Retest */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4,
                  alignItems: 'center', height: 38,
                }}>
                  <div style={{
                    gridColumn: '12 / span 1',
                    background: ILL.navy, color: '#fff', height: 38,
                    borderRadius: 8, padding: '0 10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 500, letterSpacing: '0.06em',
                  }}>Retest</div>
                </div>
              </div>

              {/* date strip */}
              <div style={{
                marginTop: 24, paddingTop: 14, borderTop: `1px solid ${ILL.cardLineSoft}`,
                display: 'flex', justifyContent: 'space-between',
                fontFamily: "'DM Mono', ui-monospace, monospace",
                fontSize: 10, letterSpacing: '0.16em', color: ILL.ink3,
                textTransform: 'uppercase',
              }}>
                <span><span style={{ color: ILL.green }}>● </span>Today · Jul 14</span>
                <span>Sep 1</span>
                <span style={{ color: ILL.amber }}>Oct 5 · SAT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DesktopFooter
        disclaimer="12-week personalized plan · adjusts after each retest"
        cta="See the projection"
      />
    </DesktopFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// STEP 4 desktop · Projection
// ════════════════════════════════════════════════════════════════

function DProjectionChart({ width = 720, height = 360 }) {
  const pts = [
    { x: 0.0,  y: 1180, label: 'Now',  date: 'Jul 14' },
    { x: 0.18, y: 1210 },
    { x: 0.34, y: 1250, label: 'Wk 4', date: 'Aug 11' },
    { x: 0.5,  y: 1300 },
    { x: 0.68, y: 1350, label: 'Wk 8', date: 'Sep 8' },
    { x: 0.84, y: 1390 },
    { x: 1.0,  y: 1410, label: 'Oct 5', date: 'Test day' },
  ];
  const minY = 1100, maxY = 1450;
  const padL = 44, padR = 44, padT = 36, padB = 56;
  const ch = height - padT - padB, cw = width - padL - padR;
  const X = x => padL + x * cw;
  const Y = v => padT + ((maxY - v) / (maxY - minY)) * ch;

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

  // y-axis gridlines at 1200, 1300, 1400
  const gridYs = [1200, 1300, 1400];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="d-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ILL.green} stopOpacity="0.22"/>
          <stop offset="100%" stopColor={ILL.green} stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* y grid */}
      {gridYs.map(g => (
        <g key={g}>
          <line x1={padL} x2={width - padR} y1={Y(g)} y2={Y(g)}
                stroke={ILL.cardLine} strokeWidth="1"/>
          <text x={padL - 8} y={Y(g) + 4} textAnchor="end"
                fontFamily="'DM Mono', monospace" fontSize="10" fill={ILL.ink3}
                letterSpacing="0.1em">{g}</text>
        </g>
      ))}

      {/* target band 1380–1410 */}
      <rect x={padL} y={Y(1410)} width={cw} height={Y(1380) - Y(1410)}
            fill={ILL.green} opacity="0.07"/>
      <line x1={padL} x2={width - padR} y1={Y(1400)} y2={Y(1400)}
            stroke={ILL.green} strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
      <text x={width - padR + 4} y={Y(1400) + 4}
            fontFamily="'DM Mono', monospace" fontSize="9" fill={ILL.green}
            letterSpacing="0.14em">TARGET</text>

      <path d={areaD} fill="url(#d-area)" />
      <path d={d} fill="none" stroke={ILL.green} strokeWidth="2.4"
            strokeLinecap="round" strokeLinejoin="round"/>

      {/* milestone dots */}
      {pts.filter(p => p.label).map((p, i) => {
        const isFirst = p.x === 0;
        const isLast = p.x === 1;
        return (
          <g key={i}>
            {isLast && <circle cx={X(p.x)} cy={Y(p.y)} r="14" fill={ILL.green} opacity="0.15" />}
            <circle cx={X(p.x)} cy={Y(p.y)} r={isLast ? 7 : isFirst ? 5 : 4}
                    fill={isFirst ? ILL.ink : ILL.green} />
            {isLast && <circle cx={X(p.x)} cy={Y(p.y)} r="3" fill="#fff" />}
            <text x={X(p.x)} y={height - 28} textAnchor={isFirst ? 'start' : isLast ? 'end' : 'middle'}
                  fontFamily="'DM Mono', monospace" fontSize="10"
                  letterSpacing="0.16em" fontWeight="500"
                  fill={isLast ? ILL.green : ILL.ink2}>{p.label.toUpperCase()}</text>
            <text x={X(p.x)} y={height - 14} textAnchor={isFirst ? 'start' : isLast ? 'end' : 'middle'}
                  fontFamily="'DM Mono', monospace" fontSize="9"
                  letterSpacing="0.08em" fill={ILL.ink3}>{p.date}</text>
          </g>
        );
      })}

      {/* score labels at first and last */}
      <text x={X(0) + 10} y={Y(1180) + 4} fontFamily="'Fraunces', Georgia, serif"
            fontSize="16" fill={ILL.ink}>1180</text>
      <text x={X(1) - 14} y={Y(1410) - 14} textAnchor="end"
            fontFamily="'Fraunces', Georgia, serif" fontSize="22" fill={ILL.green}>1380–1410</text>
    </svg>
  );
}

function DStep4Projection() {
  return (
    <DesktopFrame>
      <DesktopHeader step={4} />
      <div style={{ flex: 1, padding: '48px 48px 32px', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 56, alignItems: 'flex-end',
        }}>
          <div>
            <MonoLabel>Step 4 · Projection</MonoLabel>
            <Display style={{ marginTop: 14 }} size={56}>
              By <GreenEm>Oct 5</GreenEm>, they could<br/>
              be at <GreenEm>1410</GreenEm>.
            </Display>
          </div>
          <div style={{ paddingBottom: 6 }}>
            <Sub size={17}>
              Modeled from their diagnostic and the 12-week schedule.
              Confirmed only after a 1:1 session with their luminary.
            </Sub>
          </div>
        </div>

        <div style={{
          marginTop: 36, flex: 1,
          display: 'grid', gridTemplateColumns: '320px 1fr',
          gap: 48,
        }}>
          {/* LEFT · stats stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{
              padding: '20px 22px', background: ILL.card,
              border: `1px solid ${ILL.cardLine}`, borderRadius: 14,
            }}>
              <MonoLabel color={ILL.ink3} size={10}>Current</MonoLabel>
              <div style={{
                fontFamily: "'Fraunces', Georgia, serif", fontSize: 52,
                color: ILL.ink, lineHeight: 1, marginTop: 6,
                fontVariantNumeric: 'tabular-nums',
              }}>1180</div>
              <div style={{ marginTop: 10, fontSize: 12.5, color: ILL.ink2 }}>
                From last practice test · 3 weeks ago
              </div>
            </div>

            <div style={{
              padding: '20px 22px',
              background: ILL.greenBg2,
              border: `1.5px solid ${ILL.green}`, borderRadius: 14,
              position: 'relative',
            }}>
              <MonoLabel color={ILL.green} size={10}>Projected · Oct 5</MonoLabel>
              <div style={{
                fontFamily: "'Fraunces', Georgia, serif", fontSize: 52,
                color: ILL.green, lineHeight: 1, marginTop: 6,
                fontVariantNumeric: 'tabular-nums',
              }}>1410</div>
              <div style={{
                marginTop: 10, display: 'flex', justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
                <span style={{ fontSize: 12.5, color: ILL.ink2 }}>Band 1380–1410</span>
                <span style={{
                  fontFamily: "'Fraunces', Georgia, serif", fontSize: 18,
                  color: ILL.green, fontVariantNumeric: 'tabular-nums',
                }}>+230 pts</span>
              </div>
            </div>

            <div style={{
              padding: '14px 16px', background: 'transparent',
              border: `1px dashed ${ILL.cardLine}`, borderRadius: 12,
            }}>
              <MonoLabel color={ILL.ink3} size={10}>What's behind this</MonoLabel>
              <p style={{
                margin: '8px 0 0', fontSize: 13, color: ILL.ink2, lineHeight: 1.55,
              }}>
                Modeled from <span style={{ color: ILL.ink, fontWeight: 500 }}>95 plans</span>
                {' '}matching Sophia's profile (3.8–4.0 GPA, 1180 starting score,
                {' '}12-week timeline).
              </p>
            </div>
          </div>

          {/* RIGHT · chart */}
          <div style={{
            background: ILL.card, border: `1px solid ${ILL.cardLine}`,
            borderRadius: 14, padding: '24px 20px 16px',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              padding: '0 8px 16px',
            }}>
              <MonoLabel color={ILL.ink3}>Score path · 12 weeks</MonoLabel>
              <MonoLabel color={ILL.green}>● modeled</MonoLabel>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DProjectionChart width={680} height={340} />
            </div>
          </div>
        </div>
      </div>

      <DesktopFooter
        disclaimer="Projection · confirmed after 1:1 diagnostic with their luminary"
        cta="Meet their luminary"
      />
    </DesktopFrame>
  );
}

Object.assign(window, {
  DStep1Diagnostic, DStep2Weaknesses, DStep3Plan, DStep4Projection,
});
