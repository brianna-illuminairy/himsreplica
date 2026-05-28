// zoom-plan.jsx — Desktop hero: Zoom session reviewing the plan
// 1440×900. Top half = two video tiles (you + tutor). Bottom = the plan view.
// Built to drop into a laptop frame in the marketing animation.

// ─── Plan data (Math: forest greens, Reading: lavender) ────────────────

const ZP_SKILLS = [
  { n: 1, name: 'Right triangles & trig', sec: 'Math',    weeks: 4, span: [2, 5],  pts: 90, tone: 'forest-dark' },
  { n: 2, name: 'Linear functions',       sec: 'Math',    weeks: 3, span: [4, 6],  pts: 70, tone: 'forest-mid'  },
  { n: 3, name: 'Systems of equations',   sec: 'Math',    weeks: 2, span: [6, 7],  pts: 40, tone: 'forest-soft' },
  { n: 4, name: 'Main idea',              sec: 'Reading', weeks: 2, span: [8, 9],  pts: 30, tone: 'lavender'    },
  { n: 5, name: 'Algebraic manipulation', sec: 'Math',    weeks: 1, span: [10,10], pts: 20, tone: 'forest-soft' },
];

const TONE = {
  'forest-dark': { bg: '#2F6E47', text: '#FFFFFF', sub: 'rgba(255,255,255,0.85)' },
  'forest-mid':  { bg: '#B5D2BD', text: '#1F4D2F', sub: '#3F6E48' },
  'forest-soft': { bg: '#D5E6DA', text: '#1F4D2F', sub: '#3F6E48' },
  'lavender':    { bg: '#D9CDE7', text: '#3D2D58', sub: '#5A4380' },
};

// ─── The video tile strip ──────────────────────────────────────────────

function ZoomTile({ id, label, placeholder }) {
  return (
    <div style={{
      flex: 1, position: 'relative',
      background: '#1A1F2A',
      overflow: 'hidden',
    }}>
      <image-slot
        id={id}
        shape="rect"
        style={{ display: 'block', width: '100%', height: '100%' }}
        placeholder={placeholder}
      ></image-slot>
      {/* Zoom-style name pill bottom-left */}
      <div style={{
        position: 'absolute', left: 14, bottom: 14,
        padding: '4px 10px',
        background: 'rgba(0,0,0,0.62)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: 4,
        fontFamily: '-apple-system, "SF Pro", system-ui, sans-serif',
        fontSize: 13, fontWeight: 500, color: '#fff',
        pointerEvents: 'none',
      }}>
        {label}
      </div>
    </div>
  );
}

function ZoomTileStrip() {
  return (
    <div style={{
      height: 348,
      display: 'flex',
      background: '#0a0c11',
      flexShrink: 0,
    }}>
      <ZoomTile
        id="zp-you"
        label="Sophia"
        placeholder="Drop a photo · Sophia on the Zoom call"
      />
      <div style={{ width: 2, background: '#0a0c11', flexShrink: 0 }} />
      <ZoomTile
        id="zp-tutor"
        label="Tutor"
        placeholder="Drop a photo · their Illuminairy tutor"
      />
    </div>
  );
}

// ─── The schedule grid ─────────────────────────────────────────────────

function ScheduleGrid() {
  const totalWeeks = 12;
  // Each row is one skill block; week 1 is the diagnostic
  return (
    <div>
      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: 10,
        letterSpacing: '0.22em', color: ILL.ink4,
        textTransform: 'uppercase', fontWeight: 500,
        marginBottom: 14,
      }}>12-week schedule</div>

      {/* Week headers */}
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`,
        marginBottom: 6,
      }}>
        {Array.from({ length: totalWeeks }, (_, i) => (
          <div key={i} style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            letterSpacing: '0.14em', color: ILL.ink4,
            textTransform: 'uppercase', padding: '4px 0',
          }}>WK {i + 1}</div>
        ))}
      </div>
      {/* Thin baseline */}
      <div style={{ height: 1, background: ILL.cardLine, marginBottom: 14 }} />

      {/* Diagnostic — anchored in week 1 */}
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`,
        marginBottom: 8,
      }}>
        <div style={{
          gridColumn: '1 / span 1',
          background: ILL.green, color: '#fff',
          padding: '7px 12px',
          borderRadius: 7,
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 13, fontWeight: 500,
          display: 'flex', alignItems: 'center',
        }}>Diagnostic</div>
      </div>

      {/* Skill rows */}
      {ZP_SKILLS.map(s => {
        const tone = TONE[s.tone];
        const [start, end] = s.span;
        return (
          <div key={s.n} style={{
            display: 'grid', gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`,
            marginBottom: 8,
          }}>
            <div style={{
              gridColumn: `${start} / span ${end - start + 1}`,
              background: tone.bg, color: tone.text,
              padding: '8px 14px',
              borderRadius: 7,
              fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
              fontSize: 13, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 12, minWidth: 0,
            }}>
              <span style={{
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{s.name}</span>
              <span style={{
                color: tone.sub, fontWeight: 500,
                fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
                fontSize: 13, flexShrink: 0,
                fontVariantNumeric: 'tabular-nums',
              }}>+{s.pts}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Milestones row ────────────────────────────────────────────────────

function MilestoneCol({ icon, label, sub }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{
        width: 38, height: 38,
        background: '#fff', border: `1px solid ${ILL.cardLine}`,
        borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 14, fontWeight: 500, color: ILL.ink,
        }}>{label}</div>
        <div style={{
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 12.5, color: ILL.ink3, marginTop: 2,
        }}>{sub}</div>
      </div>
    </div>
  );
}

function MilestonesRow() {
  // Simple, brand-consistent icons (target / chart / trophy) drawn inline.
  // Per system prompt: SVGs no more complicated than simple shapes.
  return (
    <div style={{
      marginTop: 28,
      paddingTop: 18,
      borderTop: `1px solid ${ILL.cardLine}`,
    }}>
      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: 10,
        letterSpacing: '0.22em', color: ILL.ink4,
        textTransform: 'uppercase', fontWeight: 500,
        marginBottom: 14,
      }}>Built-in milestones</div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32,
      }}>
        <MilestoneCol
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke={ILL.green} strokeWidth="1.4"/>
              <circle cx="10" cy="10" r="4" stroke={ILL.green} strokeWidth="1.4"/>
              <circle cx="10" cy="10" r="1.5" fill={ILL.green}/>
            </svg>
          }
          label="Practice tests" sub="Weeks 1, 6, 12"
        />
        <MilestoneCol
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3"  y="10" width="3" height="7" rx="0.5" fill={ILL.green}/>
              <rect x="8.5" y="6" width="3" height="11" rx="0.5" fill={ILL.green}/>
              <rect x="14" y="3" width="3" height="14" rx="0.5" fill={ILL.green}/>
            </svg>
          }
          label="Progress reviews" sub="Every 2 weeks"
        />
        <MilestoneCol
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 4h10v3a5 5 0 01-10 0V4z" stroke={ILL.green} strokeWidth="1.4" fill="none"/>
              <path d="M5 6H3a2 2 0 002 3M15 6h2a2 2 0 01-2 3" stroke={ILL.green} strokeWidth="1.4" fill="none"/>
              <path d="M10 12v3M7 17h6" stroke={ILL.green} strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          }
          label="Score goal" sub="1400+"
        />
      </div>
    </div>
  );
}

// ─── Zoom controls bar ─────────────────────────────────────────────────

function ZoomCtl({ icon, label, accent }) {
  const color = accent === 'red'   ? '#FB6E6A'
             : accent === 'green' ? '#84D7A1'
             : 'rgba(255,255,255,0.85)';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      padding: '6px 14px',
      cursor: 'default',
    }}>
      <div style={{ color, height: 22, display: 'flex', alignItems: 'center' }}>
        {icon}
      </div>
      <span style={{
        fontFamily: '-apple-system, "SF Pro", system-ui, sans-serif',
        fontSize: 11, color, fontWeight: 500,
      }}>{label}</span>
    </div>
  );
}

function ZoomControlsBar() {
  return (
    <div style={{
      height: 64, background: '#0a0c11',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 6, flexShrink: 0,
    }}>
      <ZoomCtl
        label="Mute"
        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>
        </svg>}
      />
      <ZoomCtl
        label="Stop Video"
        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4V8z"/>
        </svg>}
      />
      <ZoomCtl
        accent="green"
        label="Share Screen"
        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="13" rx="1.5"/><path d="M8 21h8M12 17v4M12 8v5M9 11l3-3 3 3"/>
        </svg>}
      />
      <ZoomCtl
        label="Participants"
        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="8" r="3"/><path d="M3 19a6 6 0 0112 0M16 11a3 3 0 100-6M22 19a5 5 0 00-6-4.6"/>
        </svg>}
      />
      <ZoomCtl
        label="Chat"
        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.5A8 8 0 1121 12z"/>
        </svg>}
      />
      <ZoomCtl
        accent="red"
        label="Leave"
        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 14c4-4 14-4 18 0l-2 3-3-1v-2a10 10 0 00-8 0v2l-3 1-2-3z"/>
        </svg>}
      />
    </div>
  );
}

// ─── The plan content area ────────────────────────────────────────────

function PlanContent() {
  const totalGain = ZP_SKILLS.reduce((s, x) => s + x.pts, 0);
  return (
    <div style={{
      flex: 1, padding: '36px 56px 30px',
      background: ILL.bg,
      display: 'grid', gridTemplateColumns: '440px 1fr', gap: 56,
      overflow: 'hidden',
    }}>
      {/* LEFT · headline + skills */}
      <div>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10,
          letterSpacing: '0.22em', color: ILL.green,
          textTransform: 'uppercase', fontWeight: 500,
        }}>
          Step 3 · The Plan
        </div>
        <h1 style={{
          margin: '14px 0 24px',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 500, fontSize: 48, lineHeight: 1.05,
          letterSpacing: '-0.018em', color: ILL.ink,
          fontVariationSettings: '"opsz" 72, "SOFT" 0, "WONK" 0',
        }}>
          Sophia's <GreenEm>12 week<br/>SAT plan</GreenEm>.
        </h1>

        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10,
          letterSpacing: '0.22em', color: ILL.ink4,
          textTransform: 'uppercase', fontWeight: 500,
          marginBottom: 8,
        }}>Prioritized skills</div>

        <div>
          {ZP_SKILLS.map(s => (
            <div key={s.n} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '11px 0',
              borderBottom: s.n < ZP_SKILLS.length ? `1px solid ${ILL.cardLineSoft}` : 'none',
            }}>
              <span style={{
                fontFamily: "'Fraunces', Georgia, serif", fontSize: 18,
                color: ILL.ink3, width: 16, flexShrink: 0,
                fontVariantNumeric: 'tabular-nums',
              }}>{s.n}</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 15, color: ILL.ink, fontWeight: 500,
                }}>{s.name}</div>
                <div style={{
                  marginTop: 2, fontFamily: "'DM Mono', monospace",
                  fontSize: 10, letterSpacing: '0.18em',
                  color: ILL.ink4, textTransform: 'uppercase',
                }}>
                  {s.sec} · {s.weeks} {s.weeks === 1 ? 'week' : 'weeks'}
                </div>
              </div>
              <span style={{
                fontFamily: "'Fraunces', Georgia, serif", fontSize: 22,
                color: ILL.green, fontVariantNumeric: 'tabular-nums', fontWeight: 500,
              }}>+{s.pts}<span style={{ fontSize: 12, marginLeft: 2 }}>pts</span></span>
            </div>
          ))}
        </div>

        {/* Total gain box */}
        <div style={{
          marginTop: 14, padding: '14px 18px',
          background: ILL.greenBg, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            letterSpacing: '0.22em', color: ILL.green,
            textTransform: 'uppercase', fontWeight: 500,
          }}>Estimated total gain</div>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif", fontSize: 30,
            color: ILL.green, lineHeight: 1, fontWeight: 500,
            fontVariantNumeric: 'tabular-nums',
          }}>+{totalGain}<span style={{ fontSize: 14, marginLeft: 3, opacity: 0.85 }}>pts</span></div>
        </div>
      </div>

      {/* RIGHT · schedule */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{
          margin: '0 0 28px',
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 16, lineHeight: 1.5, color: ILL.ink2,
          maxWidth: 600,
        }}>
          This 12-week plan focuses on the top 5 impact skills.
          We'll work the plan, track progress, and adjust as we go.
        </p>

        <ScheduleGrid />
        <MilestonesRow />
      </div>
    </div>
  );
}

// ─── Top-level ─────────────────────────────────────────────────────────

function ZoomPlanScreen() {
  return (
    <div style={{
      width: 1440, height: 900,
      background: ILL.bg,
      fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
      color: ILL.ink,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <ZoomTileStrip />
      <PlanContent />
      <ZoomControlsBar />
    </div>
  );
}

Object.assign(window, { ZoomPlanScreen });
