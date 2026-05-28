// Shared sub-components for the two long-form B variants.
// Defined once, reused across Problem-led + Results-led layouts.

// ─────────────────────────────────────────────────────────
// Header (logo only — no progress bar on landing pages)
// ─────────────────────────────────────────────────────────
function VBHeader() {
  return (
    <div className="top-bar">
      <div className="wordmark">illuminairy</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Eyebrow with red square + label
// ─────────────────────────────────────────────────────────
function VBEyebrow({ children }) {
  return (
    <div className="eyebrow"><span className="dot" />{children}</div>
  );
}

// ─────────────────────────────────────────────────────────
// Hero CTA card — dark block, copy + button
// ─────────────────────────────────────────────────────────
function VBHeroCTA({ copy, cta = "Get started", onClick }) {
  return (
    <div className="hero-cta">
      <div className="copy">{copy}</div>
      <button className="btn" onClick={onClick}>{cta} <span className="arrow">→</span></button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Stat row — 3 numbers (e.g. 95 plans · 182 pts · 12 wks)
// ─────────────────────────────────────────────────────────
function VBStatRow({ items }) {
  return (
    <div className="stat-grid">
      {items.map((s, i) => (
        <div className="stat" key={i}>
          <div className={"num " + (s.accent ? "accent" : "")}>{s.num}</div>
          <div className="lbl">{s.lbl}</div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Score before/after card (used in social proof carousel)
// ─────────────────────────────────────────────────────────
function VBReviewCard({ before, after, weeks, quote, name, initials }) {
  return (
    <div className="review">
      <div className="score-ba">
        <div className="col-block">
          <div className="when">Month 0</div>
          <div className="val">{before}</div>
        </div>
        <div className="arrow-block">→</div>
        <div className="col-block after">
          <div className="when">Month {weeks}</div>
          <div className="val">{after}</div>
        </div>
      </div>
      <div className="quote">"{quote}"</div>
      <div className="who">
        <div className="ava">{initials}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div className="name">{name}</div>
          <div className="verified">✓ Verified Parent Review</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// "What's included" checklist row
// ─────────────────────────────────────────────────────────
function VBIncludedRow({ label }) {
  return (
    <div className="row-item">
      <div className="label">{label}</div>
      <svg className="icon" viewBox="0 0 22 22">
        <circle cx="11" cy="11" r="11" fill="#141414" />
        <path d="M6 11.5l3.5 3.5L16 8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// "How it works" step card (number, title, desc, time, ph)
// ─────────────────────────────────────────────────────────
function VBStep({ n, title, desc, time, phLabel }) {
  return (
    <div className="step">
      <div>
        <div className="num-badge" style={{ marginBottom: 4 }}>STEP {n}</div>
        <div className="step-title">{title}</div>
        <div className="step-desc">{desc}</div>
        {time && <div className="step-time">{time}</div>}
      </div>
      <div className="img-ph step-img" style={{ aspectRatio: 'auto', height: 70 }}>{phLabel}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Section header (eyebrow + h2 + lead)
// ─────────────────────────────────────────────────────────
function VBSectionHead({ eyebrow, title, lead, dark = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 22 }}>
      {eyebrow && <VBEyebrow>{eyebrow}</VBEyebrow>}
      <h2 style={{ color: dark ? 'white' : undefined }}>{title}</h2>
      {lead && <p className="lead" style={{ color: dark ? 'rgba(255,255,255,0.85)' : undefined }}>{lead}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────
function VBFooter() {
  return (
    <div className="footer">
      <div className="foot-head">Get the latest from illuminairy</div>
      <div className="socials">
        <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><circle cx="18" cy="6" r="1.2" fill="currentColor"/></svg></a>
        <a href="#" aria-label="TikTok"><span style={{ fontWeight: 700, fontSize: 13 }}>TT</span></a>
        <a href="#" aria-label="X"><span style={{ fontWeight: 700, fontSize: 13 }}>𝕏</span></a>
        <a href="#" aria-label="Facebook"><span style={{ fontWeight: 700, fontSize: 14 }}>f</span></a>
      </div>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />
      <div className="links">
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Contact</a>
      </div>
      <div style={{ fontSize: 11, lineHeight: 1.5, color: 'rgba(255,255,255,0.5)' }}>
        © 2026 illuminairy. SAT and PSAT are trademarks of the College Board, which is not affiliated with this site. Individual results vary.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Inline CTA button (used between sections)
// ─────────────────────────────────────────────────────────
function VBCTA({ label = "Get started", style = {}, onClick }) {
  return (
    <button className="btn" onClick={onClick} style={style}>
      {label} <span className="arrow">→</span>
    </button>
  );
}

window.VBHeader = VBHeader;
window.VBEyebrow = VBEyebrow;
window.VBHeroCTA = VBHeroCTA;
window.VBStatRow = VBStatRow;
window.VBReviewCard = VBReviewCard;
window.VBIncludedRow = VBIncludedRow;
window.VBStep = VBStep;
window.VBSectionHead = VBSectionHead;
window.VBFooter = VBFooter;
window.VBCTA = VBCTA;
