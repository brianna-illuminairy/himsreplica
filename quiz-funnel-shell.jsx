// Quiz funnel — shared shell + primitives (V3b Aurora system).
// QFScreen now uses a dark navy chrome band at the top + light content body.

const TOTAL_STEPS = 22;

const QFNavCtx = React.createContext({ onBack: null, showBack: true });

// ─────────────────────────────────────────────────────────────
// QFScreen
//   stepIdx        — 1-based current step (for progress)
//   showProgress   — top progress bar visibility
//   showBack       — show ← in top band
//   wordmark       — show wordmark + glow star in top band
//   tone           — content-body bg: 'paper' (default) | 'bg-2' | 'ink'
//   ornament       — 'glow' to render aurora glow under the body
//   footer         — node rendered in the bottom CTA region
// ─────────────────────────────────────────────────────────────
function QFScreen({
  stepIdx,
  showProgress = true,
  showBack = true,
  onBack,
  wordmark = true,
  tone = 'paper',
  ornament,
  footer,
  flushBody = false,
  children,
}) {
  const bodyBg = tone === 'ink' ? 'var(--qf-ink)'
    : tone === 'bg-2' ? 'var(--qf-bg-2)'
    : 'var(--qf-bg)';
  const inkColor = tone === 'ink' ? 'var(--qf-paper)' : 'var(--qf-ink)';

  const fillPct = Math.max(0, Math.min(1, (stepIdx || 0) / TOTAL_STEPS)) * 100;
  const nav = React.useContext(QFNavCtx);
  const backHandler = onBack || nav.onBack;
  const backVisible = showBack && nav.showBack !== false;

  return (
    <div className="qf-page" style={{ color: inkColor }}>
      {/* Dark chrome band — always dark navy with glowing aurora */}
      <div className="qf-top">
        <div className="qf-top-row">
          <button
            type="button"
            className={"qf-back" + (backVisible ? '' : ' hidden')}
            aria-label="Back"
            onClick={backHandler}
          >
            ←
          </button>
          {wordmark
            ? <div className="qf-wordmark">illuminairy</div>
            : <div />
          }
          <div style={{ width: 30 }} />
        </div>
        {showProgress && (
          <div className="qf-progress">
            <div className="fill" style={{ width: `${fillPct}%` }} />
          </div>
        )}
      </div>

      {/* Light content body (or dark when tone='ink') */}
      <div
        className={"qf-body" + (flushBody ? ' flush' : '')}
        style={{ background: bodyBg, position: 'relative' }}
      >
        {ornament === 'glow' && <div className="qf-glow" />}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>

      {footer && (
        <div
          className="qf-footer"
          style={{ background: bodyBg, borderTopColor: tone === 'ink' ? 'rgba(255,255,255,0.1)' : undefined }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// QFOption — full-width tap card.
//   multi=false (default) → single-select, selection auto-advances.
//   multi=true            → multi-select, renders a checkbox on the right.
// ─────────────────────────────────────────────────────────────
function QFOption({ children, sub, selected, multi, onClick }) {
  const cls = "qf-opt" + (selected ? ' selected' : '') + (multi ? ' multi' : '');
  return (
    <button className={cls} onClick={onClick}>
      <span className="qf-opt-content">
        <span className="lbl">{children}</span>
        {sub && <span className="sub">{sub}</span>}
      </span>
      {multi && (
        <span className="qf-opt-check" aria-hidden="true">
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <path d="M1 5.5L5 9.5L13 1.5"
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
}

// QFChip — square option used in chip-grids.
function QFChip({ title, sub, selected, onClick }) {
  return (
    <button className={"qf-chip" + (selected ? ' selected' : '')} onClick={onClick}>
      <span>{title}</span>
      {sub && <span className="sub">{sub}</span>}
    </button>
  );
}

// QFPill — small inline pill for multi-select chip rows.
function QFPill({ children, selected, onClick }) {
  return (
    <button className={"qf-pill" + (selected ? ' selected' : '')} onClick={onClick}>
      {children}
    </button>
  );
}

// QFButton — primary CTA. Pill-shaped, ink by default.
function QFButton({ children, kind = 'ink', onClick, disabled, style }) {
  const cls = "qf-btn" + (kind === 'forest' ? ' forest' : kind === 'ghost' ? ' ghost' : '');
  return (
    <button className={cls} onClick={onClick} disabled={disabled} style={style}>
      {children} <span className="arrow">→</span>
    </button>
  );
}

// QFQuestionHead — minimal head: just the question by default.
// Eyebrow + lead optional (used on content screens, not Q1–Q10).
function QFQuestionHead({ eyebrow, title, lead }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
      {eyebrow && <div className="qf-eyebrow">{eyebrow}</div>}
      <h1 className="qf-h1" style={{ marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: title }} />
      {lead && <p className="qf-lead">{lead}</p>}
    </div>
  );
}

// QFOptOut — the footer "None of these — help me figure it out" link.
function QFOptOut({ children = "None of these — help me figure it out", onClick }) {
  return (
    <button className="qf-opt-out" onClick={onClick}>{children}</button>
  );
}

// QFWhyWeAsk — small "why this question matters" card.
// Borrowed from Hims-style funnels: re-anchors purpose on data-only screens
// so they feel intentional, not administrative.
function QFWhyWeAsk({ children, source }) {
  return (
    <div className="qf-why">
      <div className="qf-why-head">
        <div className="qf-why-label">Why we ask</div>
      </div>
      <div className="qf-why-body">{children}</div>
      {source && (
        <a className="qf-why-source" href={typeof source === 'string' ? source : '#'}>
          Source
        </a>
      )}
    </div>
  );
}

// Constellation separator
function QFConstellation() {
  return (
    <div className="qf-constellation">
      <span className="dot" />
      <span className="line" />
      <span className="dot big" />
      <span className="line" />
      <span className="dot" />
    </div>
  );
}

window.QFScreen = QFScreen;
window.QFOption = QFOption;
window.QFChip = QFChip;
window.QFPill = QFPill;
window.QFButton = QFButton;
window.QFQuestionHead = QFQuestionHead;
window.QFOptOut = QFOptOut;
window.QFWhyWeAsk = QFWhyWeAsk;
window.QFConstellation = QFConstellation;
window.QFNavCtx = QFNavCtx;
window.TOTAL_STEPS = TOTAL_STEPS;
