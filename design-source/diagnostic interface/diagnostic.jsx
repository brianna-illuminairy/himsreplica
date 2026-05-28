// diagnostic.jsx — Desktop hero: student taking the Illuminairy diagnostic
// 1440×900. Top half = single student photo. Bottom = branded diagnostic UI
// (Illuminairy-styled SAT test screen — Question 1 with scatter plot).
// Parallel to ZoomPlanScreen — same chrome/proportions, different beat.

// ─── Top photo strip ───────────────────────────────────────────────────

function StudentPhotoStrip() {
  return (
    <div style={{
      height: 348, position: 'relative',
      background: '#1A1F2A',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <image-slot
        id="diag-student"
        shape="rect"
        style={{ display: 'block', width: '100%', height: '100%' }}
        placeholder="Drop a photo · student at their desk taking the diagnostic"
      ></image-slot>
    </div>
  );
}

// ─── Branded Illuminairy diagnostic UI ─────────────────────────────────

function DiagnosticTopBar() {
  // Mirrors a standard digital-SAT test header, in Illuminairy chrome.
  return (
    <div style={{
      height: 68, background: ILL.navy,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
      flexShrink: 0,
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* left: brand mark + module info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: `linear-gradient(135deg, ${ILL.glow}, ${ILL.blue})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L7 13M1 7L13 7M2.5 2.5L11.5 11.5M11.5 2.5L2.5 11.5"
              stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.95"/>
          </svg>
        </div>
        <div style={{
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 14, fontWeight: 500, color: '#F5F8FA',
        }}>
          Section 2, Module 1: <span style={{ opacity: 0.65 }}>Math</span>
        </div>
      </div>

      {/* center: timer */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 16, fontWeight: 500, color: '#F5F8FA',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.04em',
        }}>34 : 51</div>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 9.5,
          letterSpacing: '0.22em', color: 'rgba(245,248,250,0.55)',
          textTransform: 'uppercase', marginTop: 1,
        }}>Hide</div>
      </div>

      {/* right: action pills */}
      <div style={{ display: 'flex', gap: 8 }}>
        <DiagPill label="Calculator" icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
            <rect x="2" y="1.5" width="10" height="11" rx="1.5"/>
            <rect x="3.5" y="3" width="7" height="2" rx="0.4" fill="currentColor" opacity="0.15"/>
            <circle cx="4.5" cy="7" r="0.6" fill="currentColor"/>
            <circle cx="7"   cy="7" r="0.6" fill="currentColor"/>
            <circle cx="9.5" cy="7" r="0.6" fill="currentColor"/>
            <circle cx="4.5" cy="9.5" r="0.6" fill="currentColor"/>
            <circle cx="7"   cy="9.5" r="0.6" fill="currentColor"/>
            <circle cx="9.5" cy="9.5" r="0.6" fill="currentColor"/>
          </svg>
        } />
        <DiagPill label="References" icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <text x="0" y="11" fontFamily="'DM Mono', monospace" fontSize="11" fontWeight="500" fill="currentColor">x²</text>
          </svg>
        } />
        <DiagPill label="More" icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="3" cy="7" r="1.2" fill="currentColor"/>
            <circle cx="7" cy="7" r="1.2" fill="currentColor"/>
            <circle cx="11" cy="7" r="1.2" fill="currentColor"/>
          </svg>
        } />
      </div>
    </div>
  );
}

function DiagPill({ label, icon }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      height: 36, padding: '0 14px',
      background: '#F5F8FA', color: ILL.ink,
      borderRadius: 100,
      fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
      fontSize: 13, fontWeight: 500,
      border: `1px solid ${ILL.cardLine}`,
    }}>
      <span style={{ display: 'flex', color: ILL.ink2 }}>{icon}</span>
      {label}
    </div>
  );
}

// ─── Scatter plot ──────────────────────────────────────────────────────

function ScatterPlot({ width = 380, height = 320 }) {
  // 15 points roughly along y = 0.65x + 0.3
  const points = [
    [1, 1.4], [2, 1.6], [3, 2.6], [4, 2.4], [4, 3.0],
    [5, 3.4], [5, 4.1], [6, 4.6], [6, 5.0], [7, 5.0],
    [7, 5.6], [8, 5.4], [9, 6.4], [10, 7.0], [11, 7.4],
    [11, 8.2], [12, 8.0], [13, 8.6], [13, 7.4], [14, 9.5],
  ];

  const xMin = -1, xMax = 16, yMin = -2, yMax = 14;
  const padL = 36, padR = 14, padT = 12, padB = 30;
  const cw = width - padL - padR, ch = height - padT - padB;
  const X = x => padL + ((x - xMin) / (xMax - xMin)) * cw;
  const Y = y => padT + ((yMax - y) / (yMax - yMin)) * ch;

  // line of best fit y = 0.65x + 0.3
  const lineX1 = -1, lineY1 = 0.65 * lineX1 + 0.3;
  const lineX2 = 15, lineY2 = 0.65 * lineX2 + 0.3;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* fine grid */}
      <defs>
        <pattern id="grid" width={cw / (xMax - xMin)} height={ch / (yMax - yMin)} patternUnits="userSpaceOnUse">
          <path d={`M ${cw / (xMax - xMin)} 0 L 0 0 0 ${ch / (yMax - yMin)}`}
                fill="none" stroke={ILL.cardLine} strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect x={padL} y={padT} width={cw} height={ch} fill="url(#grid)" />

      {/* axes */}
      <line x1={X(0)} x2={X(0)} y1={padT} y2={padT + ch}
            stroke={ILL.ink} strokeWidth="1.1"/>
      <line x1={padL} x2={padL + cw} y1={Y(0)} y2={Y(0)}
            stroke={ILL.ink} strokeWidth="1.1"/>
      {/* arrows */}
      <polygon points={`${X(0)},${padT - 2} ${X(0) - 4},${padT + 6} ${X(0) + 4},${padT + 6}`} fill={ILL.ink}/>
      <polygon points={`${padL + cw + 2},${Y(0)} ${padL + cw - 6},${Y(0) - 4} ${padL + cw - 6},${Y(0) + 4}`} fill={ILL.ink}/>

      {/* axis labels (even numbers) */}
      {[2, 4, 6, 8, 10, 12, 14, 16].map(x => (
        <text key={`x${x}`} x={X(x)} y={Y(0) + 16} textAnchor="middle"
              fontFamily="'DM Mono', monospace" fontSize="10" fill={ILL.ink2}>{x}</text>
      ))}
      {[2, 4, 6, 8, 10, 12, 14].map(y => (
        <text key={`y${y}`} x={X(0) - 6} y={Y(y) + 3} textAnchor="end"
              fontFamily="'DM Mono', monospace" fontSize="10" fill={ILL.ink2}>{y}</text>
      ))}
      <text x={X(0) - 6} y={Y(-2) + 3} textAnchor="end"
            fontFamily="'DM Mono', monospace" fontSize="10" fill={ILL.ink2}>-2</text>
      <text x={X(0) - 4} y={padT + 8} textAnchor="end"
            fontFamily="'Fraunces', Georgia, serif" fontSize="14"
            fontStyle="italic" fill={ILL.ink}>Y</text>
      <text x={padL + cw - 2} y={Y(0) + 18} textAnchor="end"
            fontFamily="'Fraunces', Georgia, serif" fontSize="14"
            fontStyle="italic" fill={ILL.ink}>X</text>

      {/* line of best fit */}
      <line x1={X(lineX1)} y1={Y(lineY1)} x2={X(lineX2)} y2={Y(lineY2)}
            stroke={ILL.ink} strokeWidth="1.2"/>

      {/* data points */}
      {points.map(([x, y], i) => (
        <circle key={i} cx={X(x)} cy={Y(y)} r="3" fill={ILL.ink}/>
      ))}
    </svg>
  );
}

// ─── Question content ─────────────────────────────────────────────────

function DiagnosticBody() {
  return (
    <div style={{
      flex: 1, background: ILL.bg,
      padding: '32px 56px 24px',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* question header strip */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingBottom: 18, borderBottom: `1px solid ${ILL.cardLineSoft}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{
            fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
            fontSize: 15, fontWeight: 600, color: ILL.ink,
          }}>Question 1</span>
          {/* flag */}
          <button style={iconBtn}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={ILL.ink2} strokeWidth="1.3">
              <path d="M3 1.5V13M3 2h7l-1.5 2.5L10 7H3"/>
            </svg>
          </button>
          {/* audio */}
          <button style={iconBtn}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={ILL.ink2} strokeWidth="1.3">
              <text x="0.5" y="10" fontFamily="'DM Mono', monospace" fontSize="9" fontWeight="500" fill={ILL.ink2} stroke="none">ABC</text>
            </svg>
          </button>
        </div>
        <button style={{ ...iconBtn, background: '#fff' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke={ILL.ink2} strokeWidth="1.3"/>
            <path d="M7 4v3.5M7 9.5v0.5" stroke={ILL.ink2} strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* main content row: chart left, question + answers right */}
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: '440px 1fr',
        gap: 56, paddingTop: 22, minHeight: 0,
      }}>
        {/* LEFT · chart */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <ScatterPlot width={440} height={340} />
        </div>

        {/* RIGHT · question + answers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <p style={{
            margin: 0,
            fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
            fontSize: 18, lineHeight: 1.55, color: ILL.ink,
            maxWidth: 640,
          }}>
            The given scatterplot shows the relationship between two variables,
            {' '}<em style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic' }}>x</em> and
            {' '}<em style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic' }}>y</em>.
            A line of best fit is also shown. Based on the line of best fit, which
            of the following best approximates the value of
            {' '}<em style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic' }}>y</em> when
            {' '}<em style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic' }}>x</em> = 14?
          </p>

          {/* answer choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <AnswerChoice letter="A" body="8" />
            <AnswerChoice letter="B" body="9" selected />
            <AnswerChoice letter="C" body="10" />
            <AnswerChoice letter="D" body="11" />
          </div>
        </div>
      </div>
    </div>
  );
}

const iconBtn = {
  width: 32, height: 32, borderRadius: '50%',
  border: `1px solid ${ILL.cardLine}`, background: 'transparent',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', padding: 0,
};

function AnswerChoice({ letter, body, selected }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 18px',
      background: selected ? ILL.greenBg : '#fff',
      border: `1.5px solid ${selected ? ILL.green : ILL.cardLine}`,
      borderRadius: 10,
      maxWidth: 560,
    }}>
      <span style={{
        width: 26, height: 26, borderRadius: '50%',
        border: `1.5px solid ${selected ? ILL.green : ILL.ink3}`,
        background: selected ? ILL.green : 'transparent',
        color: selected ? '#fff' : ILL.ink2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
        fontSize: 12, fontWeight: 600,
        flexShrink: 0,
      }}>{letter}</span>
      <span style={{
        fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
        fontSize: 16, color: ILL.ink, fontWeight: selected ? 500 : 400,
      }}>{body}</span>
    </div>
  );
}

// ─── Bottom controls bar ──────────────────────────────────────────────

function DiagnosticBottomBar() {
  return (
    <div style={{
      height: 72, background: '#fff',
      borderTop: `1px solid ${ILL.cardLine}`,
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
      padding: '0 36px', flexShrink: 0,
    }}>
      {/* left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <button style={ghostPill}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.5 3L4 6l3.5 3"/>
          </svg>
          Previous
        </button>
        <button style={{
          background: 'transparent', border: 'none',
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 14, color: ILL.ink2, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 4px',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M11 4.5a4 4 0 11-1.2-2.8M11 1v3h-3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Clear response
        </button>
      </div>

      {/* center: question N of M */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
        fontSize: 14, color: ILL.ink, fontWeight: 500,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={ILL.ink2} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l4-4 4 4"/>
        </svg>
        1 of 28
      </div>

      {/* right */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{
          height: 44, padding: '0 28px', borderRadius: 100,
          background: ILL.green, color: '#fff', border: 'none',
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 14, fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          Next
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 3L8 6l-3.5 3"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

const ghostPill = {
  height: 36, padding: '0 18px', borderRadius: 100,
  background: '#F5F8FA', color: ILL.ink, cursor: 'pointer',
  border: `1px solid ${ILL.cardLine}`,
  fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
  fontSize: 13, fontWeight: 500,
  display: 'flex', alignItems: 'center', gap: 8,
};

// ─── Top-level ────────────────────────────────────────────────────────

function DiagnosticHeroScreen() {
  return (
    <div style={{
      width: 1440, height: 900,
      background: ILL.bg,
      fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
      color: ILL.ink,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <StudentPhotoStrip />
      <DiagnosticTopBar />
      <DiagnosticBody />
      <DiagnosticBottomBar />
    </div>
  );
}

Object.assign(window, { DiagnosticHeroScreen });
