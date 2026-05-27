// tokens.jsx — Shared design tokens + atoms for Illuminairy diagnostic interface
// Used by both mobile (390×844) and desktop (1440×900) screens.

const ILL = {
  // surfaces — Aurora Tokens
  bg:           '#F5F8FA',   // polar white (cool, NOT cream)
  bg2:          '#ECF1ED',   // sage-tinted alt
  card:         '#FFFFFF',
  cardLine:     '#E4E8EC',   // cool hairline
  cardLineSoft: '#EEF1F4',

  // ink ladder
  ink:    '#121A2B',   // primary
  ink2:   '#2A3142',   // body
  ink3:   '#4D5566',   // metadata
  ink4:   '#8A8E97',   // placeholder / mute

  // dark
  navy:   '#121A2B',
  navy2:  '#1A2438',
  navy3:  '#2A3550',

  // brand accents
  green:     '#2F6E47',   // forest — CTA + primary accent
  greenSoft: '#3E8B5A',   // forest-mid
  greenBg:   '#E5EFE8',   // forest-soft / selected wash
  greenBg2:  '#E5EFE8',   // (unified)
  glow:      '#77C89A',   // highlights on DARK only (• dot, hero accents)
  blue:      '#0057A8',   // celestial — secondary, sparingly
  red:       '#B85A4A',   // impact loss (used sparingly)
  amber:     '#B8662E',   // dates / warnings
};

// ─── small atoms used everywhere ────────────────────────────────

function MonoLabel({ children, color = ILL.green, size = 10.5, ls = '0.22em', style = {} }) {
  return (
    <div style={{
      fontFamily: "'DM Mono', ui-monospace, monospace",
      fontSize: size, letterSpacing: ls, textTransform: 'uppercase',
      color, fontWeight: 500, ...style,
    }}>{children}</div>
  );
}

function Display({ children, size = 30, style = {} }) {
  return (
    <h1 style={{
      fontFamily: "'Fraunces', Georgia, serif",
      fontWeight: 500, fontSize: size, lineHeight: 1.08,
      letterSpacing: '-0.012em', color: ILL.ink,
      fontVariationSettings: '"opsz" 72, "SOFT" 0, "WONK" 0',
      margin: 0, ...style,
    }}>{children}</h1>
  );
}

// Forest-colored emphasis — same family as headline, NOT italic.
// Per Aurora Tokens: "Emphasis uses the same family, just colored forest — never italic."
function GreenEm({ children }) {
  return (
    <span style={{
      color: ILL.green,
      fontStyle: 'normal',
      fontFamily: "'Fraunces', Georgia, serif",
      fontWeight: 500,
      fontVariationSettings: '"opsz" 72, "SOFT" 0, "WONK" 0',
    }}>
      {children}
    </span>
  );
}

function Sub({ children, size = 14.5, style = {} }) {
  return (
    <p style={{
      fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
      fontSize: size, lineHeight: 1.5, color: ILL.ink2,
      margin: 0, fontWeight: 400, ...style,
    }}>{children}</p>
  );
}

// reusable status glyphs (used in skill rows, table rows, etc.)
function StatusGlyph({ state, size = 18 }) {
  if (state === 'done') {
    return (
      <span style={{
        width: size, height: size, borderRadius: '50%',
        background: ILL.green, display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 10 10" fill="none">
          <path d="M2 5.2L4.2 7.4L8.4 3" stroke="#fff" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    );
  }
  if (state === 'analyzing') {
    return (
      <span style={{
        width: size, height: size, borderRadius: '50%',
        border: `1.5px solid ${ILL.greenSoft}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, position: 'relative',
      }}>
        <span style={{
          width: size * 0.35, height: size * 0.35, borderRadius: '50%',
          background: ILL.greenSoft,
          animation: 'ill-pulse 1.4s ease-in-out infinite',
        }} />
      </span>
    );
  }
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%',
      border: '1.5px solid #D5D0C2', flexShrink: 0,
    }} />
  );
}

function SectionTag({ section }) {
  return (
    <span style={{
      fontFamily: "'DM Mono', ui-monospace, monospace",
      fontSize: 10, letterSpacing: '0.14em',
      color: ILL.ink2,
      textAlign: 'right', flexShrink: 0,
      textTransform: 'uppercase',
    }}>{section === 'Math' ? 'MATH' : 'R & W'}</span>
  );
}

// • ILLUMINAIRY wordmark — used in mobile dark header and desktop top bar
function Wordmark({ color = '#F5F8FA', dotColor = ILL.glow, size = 12 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: dotColor,
        boxShadow: `0 0 8px ${dotColor}`,
      }} />
      <span style={{
        fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
        fontSize: size, letterSpacing: '0.32em', color,
        fontWeight: 500,
      }}>ILLUMINAIRY</span>
    </div>
  );
}

// global keyframes injected once
if (typeof document !== 'undefined' && !document.getElementById('ill-keyframes')) {
  const s = document.createElement('style');
  s.id = 'ill-keyframes';
  s.textContent = `
    @keyframes ill-pulse {
      0%, 100% { opacity: 0.4; transform: scale(0.85); }
      50% { opacity: 1; transform: scale(1.1); }
    }
    @font-face { font-display: swap; }
  `;
  document.head.appendChild(s);
}

Object.assign(window, {
  ILL, MonoLabel, Display, GreenEm, Sub, StatusGlyph, SectionTag, Wordmark,
});
