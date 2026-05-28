// tutor-ranking.jsx — Desktop hero #2: tutor actively building the plan from rankings
// 1440×900. Top half = single tutor photo. Bottom = ranked-weaknesses workspace where
// the tutor schedules skills into specific weeks. Parallel to DiagnosticHeroScreen.

// ─── Data (mirror of the zoom-plan numbers) ────────────────────────────

const TR_WEAKNESSES = [
  { rank: 1, skill: 'Right triangles & trig', sec: 'Math', pts: -90, weeks: 4, state: 'scheduled', wkSpan: [2, 5]  },
  { rank: 2, skill: 'Linear functions',       sec: 'Math', pts: -70, weeks: 3, state: 'scheduled', wkSpan: [4, 6]  },
  { rank: 3, skill: 'Systems of equations',   sec: 'Math', pts: -40, weeks: 2, state: 'active'                      },
  { rank: 4, skill: 'Main idea',              sec: 'R&W',  pts: -30, weeks: 2, state: 'pending'                     },
  { rank: 5, skill: 'Algebraic manipulation', sec: 'Math', pts: -20, weeks: 1, state: 'pending'                     },
];

// ─── Top photo strip ───────────────────────────────────────────────────

function TutorPhotoStrip() {
  return (
    <div style={{
      height: 348, position: 'relative',
      background: '#1A1F2A',
      overflow: 'hidden', flexShrink: 0,
    }}>
      <image-slot
        id="tr-tutor"
        shape="rect"
        style={{ display: 'block', width: '100%', height: '100%' }}
        placeholder="Drop a photo · tutor at desk reviewing the ranked weaknesses"
      ></image-slot>
    </div>
  );
}

// ─── Header bar ────────────────────────────────────────────────────────

function RankingHeaderBar() {
  return (
    <div style={{
      height: 64, background: ILL.navy,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
      flexShrink: 0,
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* left: brand + workspace label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <Wordmark size={12} color="#F5F8FA" />
        <div style={{
          height: 18, width: 1, background: 'rgba(255,255,255,0.15)',
        }} />
        <div style={{
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 13, color: 'rgba(245,248,250,0.65)',
        }}>
          Tutor workspace · <span style={{ color: '#F5F8FA' }}>Sophia M.</span>
        </div>
      </div>

      {/* center: step indicator */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        fontFamily: "'DM Mono', monospace",
        fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase',
      }}>
        <span style={{ color: 'rgba(245,248,250,0.30)' }}>01 Diagnostic</span>
        <span style={{ color: 'rgba(245,248,250,0.15)' }}>·</span>
        <span style={{ color: '#F5F8FA', fontWeight: 500 }}>
          <span style={{
            display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
            background: ILL.glow, boxShadow: `0 0 6px ${ILL.glow}`,
            marginRight: 8, verticalAlign: 'middle',
          }} />
          02 Ranking weaknesses
        </span>
        <span style={{ color: 'rgba(245,248,250,0.15)' }}>·</span>
        <span style={{ color: 'rgba(245,248,250,0.30)' }}>03 Plan review</span>
      </div>

      {/* right: save state */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(245,248,250,0.55)',
        }}>
          <span style={{
            display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
            background: ILL.glow, marginRight: 8, verticalAlign: 'middle',
          }} />
          Auto-saved 2s ago
        </span>
      </div>
    </div>
  );
}

// ─── Body: 2-col split (ranking table + plan builder side panel) ───────

function RankingBody() {
  return (
    <div style={{
      flex: 1, background: ILL.bg,
      padding: '32px 56px 20px',
      display: 'grid', gridTemplateColumns: '1fr 480px', gap: 40,
      overflow: 'hidden',
      minHeight: 0,
    }}>
      <RankingTable />
      <PlanBuilderPanel />
    </div>
  );
}

// ─── Ranking table (left column) ───────────────────────────────────────

function RankingTable() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* section heading */}
      <div style={{ marginBottom: 16 }}>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10,
          letterSpacing: '0.22em', color: ILL.green,
          textTransform: 'uppercase', fontWeight: 500,
        }}>Ranked weaknesses</div>
        <h2 style={{
          margin: '8px 0 0',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 500, fontSize: 30, lineHeight: 1.1,
          letterSpacing: '-0.012em', color: ILL.ink,
          fontVariationSettings: '"opsz" 72, "SOFT" 0, "WONK" 0',
        }}>
          Sophia's <GreenEm>score gaps</GreenEm>, ranked.
        </h2>
      </div>

      {/* table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '40px 1fr 90px 90px 200px',
        gap: 16, alignItems: 'center',
        padding: '10px 16px',
        borderTop: `1px solid ${ILL.cardLine}`,
        borderBottom: `1px solid ${ILL.cardLine}`,
      }}>
        <MonoLabel color={ILL.ink4} size={10}>Rank</MonoLabel>
        <MonoLabel color={ILL.ink4} size={10}>Skill</MonoLabel>
        <MonoLabel color={ILL.ink4} size={10}>Section</MonoLabel>
        <MonoLabel color={ILL.ink4} size={10} style={{ textAlign: 'right' }}>Impact</MonoLabel>
        <MonoLabel color={ILL.ink4} size={10}>Status</MonoLabel>
      </div>

      {/* rows */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {TR_WEAKNESSES.map(w => <RankingRow key={w.rank} w={w} />)}
      </div>
    </div>
  );
}

function RankingRow({ w }) {
  const isActive = w.state === 'active';
  const isScheduled = w.state === 'scheduled';
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '40px 1fr 90px 90px 200px',
      gap: 16, alignItems: 'center',
      padding: '14px 16px',
      borderLeft: isActive ? `3px solid ${ILL.green}` : '3px solid transparent',
      background: isActive ? ILL.greenBg : 'transparent',
      borderBottom: `1px solid ${ILL.cardLineSoft}`,
      position: 'relative',
    }}>
      <span style={{
        fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, fontWeight: 500,
        color: isActive ? ILL.green : isScheduled ? ILL.ink3 : ILL.ink2,
        fontVariantNumeric: 'tabular-nums',
      }}>{w.rank}</span>

      <div>
        <div style={{
          fontSize: 15, color: ILL.ink,
          fontWeight: isActive ? 500 : 400,
        }}>{w.skill}</div>
        <div style={{
          marginTop: 2, fontFamily: "'DM Mono', monospace",
          fontSize: 10, letterSpacing: '0.14em',
          color: ILL.ink4, textTransform: 'uppercase',
        }}>{w.weeks} {w.weeks === 1 ? 'week' : 'weeks'} of work</div>
      </div>

      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 11, letterSpacing: '0.14em',
        color: ILL.ink3, textTransform: 'uppercase',
      }}>{w.sec}</span>

      <span style={{
        fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, fontWeight: 500,
        color: ILL.red, textAlign: 'right',
        fontVariantNumeric: 'tabular-nums',
      }}>{w.pts}<span style={{ fontSize: 11, marginLeft: 2, opacity: 0.7 }}>pts</span></span>

      {/* status / action cell */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {isScheduled && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px',
            background: ILL.greenBg, borderRadius: 100,
            fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
            fontSize: 12.5, color: ILL.green, fontWeight: 500,
          }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 6L4.5 8.5 9 3" stroke={ILL.green} strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Wk {w.wkSpan[0]}–{w.wkSpan[1]}
          </div>
        )}
        {isActive && (
          <div style={{ position: 'relative' }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 16px',
              background: ILL.green, color: '#fff', border: 'none',
              borderRadius: 100, cursor: 'pointer',
              fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
              fontSize: 12.5, fontWeight: 500,
              boxShadow: `0 4px 14px ${ILL.green}33`,
            }}>
              Add to plan
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5l3-3" stroke="#fff" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* week-picker popover */}
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              background: '#fff', borderRadius: 12,
              border: `1px solid ${ILL.cardLine}`,
              boxShadow: '0 12px 36px rgba(18,26,43,0.12)',
              padding: 10, minWidth: 196, zIndex: 5,
            }}>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: 9.5,
                letterSpacing: '0.22em', color: ILL.ink4,
                textTransform: 'uppercase', fontWeight: 500,
                padding: '4px 8px 8px',
              }}>Schedule for</div>
              {[
                { label: 'Week 6–7 · soonest open', primary: true },
                { label: 'Week 8–9' },
                { label: 'Week 10–11' },
              ].map((opt, i) => (
                <div key={i} style={{
                  padding: '8px 10px', borderRadius: 8,
                  background: opt.primary ? ILL.greenBg : 'transparent',
                  fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
                  fontSize: 12.5, color: opt.primary ? ILL.green : ILL.ink,
                  fontWeight: opt.primary ? 500 : 400,
                  cursor: 'pointer',
                }}>
                  {opt.label}
                </div>
              ))}
            </div>
          </div>
        )}
        {w.state === 'pending' && (
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            letterSpacing: '0.22em', color: ILL.ink4,
            textTransform: 'uppercase',
          }}>Awaiting</span>
        )}
      </div>
    </div>
  );
}

// ─── Plan builder side panel (right column) ────────────────────────────

function PlanBuilderPanel() {
  // 12-week strip showing weeks already filled + ghost preview of "adding now"
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  // Schedule snapshot reflecting current rows
  const filled = {
    1: { kind: 'diag', label: 'Dx' },
    2: { kind: 'rt' }, 3: { kind: 'rt' }, 4: { kind: 'rt' }, 5: { kind: 'rt' },
    4: { kind: 'rt' }, // (overlap intentional: rt 2-5 + lf 4-6 overlap is a stacked viz; keep simple here)
    6: { kind: 'lf' }, // collapsed: show LF starting at 6
  };
  // Two-row stacked view: row A = RT (wk 2-5), row B = LF (wk 4-6), row C = ghost Systems (wk 6-7)
  const rowA = { name: 'Right triangles', span: [2, 5], tone: 'forest' };
  const rowB = { name: 'Linear functions', span: [4, 6], tone: 'forest-mid' };
  const rowGhost = { name: 'Systems of equations · preview', span: [6, 7], tone: 'ghost' };

  return (
    <div style={{
      background: ILL.card, border: `1px solid ${ILL.cardLine}`,
      borderRadius: 14, padding: '22px 22px 20px',
      display: 'flex', flexDirection: 'column', minHeight: 0,
    }}>
      {/* heading */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 16,
      }}>
        <div>
          <MonoLabel color={ILL.green} size={10}>Plan being built</MonoLabel>
          <div style={{
            marginTop: 6, fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 22, color: ILL.ink, fontWeight: 500, lineHeight: 1.1,
            fontVariationSettings: '"opsz" 48, "SOFT" 0, "WONK" 0',
          }}>2 of 5 skills scheduled</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <MonoLabel color={ILL.ink4} size={10}>+points queued</MonoLabel>
          <div style={{
            marginTop: 6, fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 22, color: ILL.green, fontWeight: 500, lineHeight: 1.1,
            fontVariantNumeric: 'tabular-nums',
          }}>+160</div>
        </div>
      </div>

      {/* mini week grid header */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2,
        marginBottom: 4,
      }}>
        {weeks.map(w => (
          <div key={w} style={{
            fontFamily: "'DM Mono', monospace", fontSize: 8.5,
            color: ILL.ink4, letterSpacing: '0.08em', textAlign: 'center',
          }}>W{w}</div>
        ))}
      </div>

      {/* baseline */}
      <div style={{ height: 1, background: ILL.cardLine, marginBottom: 8 }} />

      {/* Diagnostic */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, marginBottom: 6 }}>
        <div style={{
          gridColumn: '1 / span 1',
          height: 28, borderRadius: 5,
          background: ILL.navy, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 500,
          letterSpacing: '0.06em',
        }}>Dx</div>
      </div>

      {/* Skill block rows */}
      {[rowA, rowB, rowGhost].map((r, i) => {
        const isGhost = r.tone === 'ghost';
        const bg = r.tone === 'forest'     ? ILL.green
                 : r.tone === 'forest-mid' ? '#B5D2BD'
                 : 'transparent';
        const color = isGhost ? ILL.green
                    : r.tone === 'forest' ? '#fff' : '#1F4D2F';
        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, marginBottom: 6 }}>
            <div style={{
              gridColumn: `${r.span[0]} / span ${r.span[1] - r.span[0] + 1}`,
              height: 28, borderRadius: 5,
              background: bg, color,
              border: isGhost ? `1.5px dashed ${ILL.green}` : 'none',
              display: 'flex', alignItems: 'center', padding: '0 8px',
              fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
              fontSize: 11, fontWeight: 500,
              opacity: isGhost ? 0.85 : 1,
              animation: isGhost ? 'tr-pulse 1.6s ease-in-out infinite' : 'none',
            }}>{r.name}</div>
          </div>
        );
      })}

      {/* "Click Add to plan to schedule next" hint */}
      <div style={{
        marginTop: 'auto', paddingTop: 14,
        borderTop: `1px dashed ${ILL.cardLine}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          width: 18, height: 18, borderRadius: '50%',
          background: ILL.greenBg, color: ILL.green,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 500,
        }}>3</span>
        <span style={{
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 13, color: ILL.ink2,
        }}>
          Scheduling <span style={{ color: ILL.ink, fontWeight: 500 }}>Systems of equations</span> → Week 6–7
        </span>
      </div>

      <style>{`
        @keyframes tr-pulse {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Bottom action bar ─────────────────────────────────────────────────

function RankingBottomBar() {
  return (
    <div style={{
      height: 60, background: '#fff',
      borderTop: `1px solid ${ILL.cardLine}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 36px', flexShrink: 0,
    }}>
      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: 10.5,
        letterSpacing: '0.22em', color: ILL.ink4,
        textTransform: 'uppercase',
      }}>
        7 of 12 weeks booked · 3 skills remaining
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button style={{
          height: 40, padding: '0 18px', borderRadius: 100,
          background: 'transparent', color: ILL.ink, cursor: 'pointer',
          border: `1px solid ${ILL.cardLine}`,
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 13, fontWeight: 500,
        }}>Save draft</button>
        <button style={{
          height: 40, padding: '0 22px', borderRadius: 100,
          background: ILL.green, color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 13, fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          Send plan to Sophia
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M4 2.5L7 5.5l-3 3" stroke="#fff" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Top-level ─────────────────────────────────────────────────────────

function TutorRankingScreen() {
  return (
    <div style={{
      width: 1440, height: 900,
      background: ILL.bg,
      fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
      color: ILL.ink,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <TutorPhotoStrip />
      <RankingHeaderBar />
      <RankingBody />
      <RankingBottomBar />
    </div>
  );
}

Object.assign(window, { TutorRankingScreen });
