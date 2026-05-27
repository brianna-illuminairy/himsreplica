// Variant A — current short landing (faithful recreation of the existing page)
// "High GPA, low SAT?" — the low-context control.

function VariantA() {
  return (
    <div className="il-page" style={{ minHeight: '100%' }}>
      <div className="top-bar">
        <div className="wordmark">illuminairy</div>
      </div>

      <div style={{ padding: '24px 22px 0' }}>
        <h1 style={{ fontSize: 40, lineHeight: 1.02 }}>
          <span style={{ color: 'white' }}>High GPA,</span>
          <br />
          low SAT?
        </h1>
      </div>

      <div style={{ padding: '22px 22px 28px' }}>
        <p style={{ textAlign: 'center', fontSize: 16, lineHeight: 1.5, color: 'var(--ink-2)' }}>
          Find out why they're struggling.<br />
          What score improvement is realistic.<br />
          And how to fix it before their next test.<br />
          <strong>Backed by College Board data from 250,000+ students.</strong>
        </p>
      </div>

      <div style={{ padding: '0 22px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <ApplicationCard gpa="3.9" sat="1180" satColor="var(--accent)" status="OUT OF RANGE" statusColor="var(--accent)" />
        <ApplicationCard gpa="3.9" sat="1400" satColor="var(--green)" status="COMPETITIVE" statusColor="var(--green)" />
      </div>

      <div style={{ padding: '6px 22px 18px', textAlign: 'center' }}>
        <div className="num-badge" style={{ letterSpacing: '0.15em' }}>+220 PTS &nbsp;·&nbsp; 12 WEEKS</div>
      </div>

      <div style={{ padding: '0 22px 24px' }}>
        <button className="btn">Get my answers <span className="arrow">→</span></button>
      </div>

      <div style={{ padding: '0 22px 40px', textAlign: 'center' }}>
        <p className="disclaimer">Free &nbsp;·&nbsp; 2 minutes &nbsp;·&nbsp; No account needed</p>
      </div>
    </div>
  );
}

function ApplicationCard({ gpa, sat, satColor, status, statusColor }) {
  return (
    <div style={{ background: 'var(--paper)', padding: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div className="num-badge" style={{ marginBottom: 6 }}>APPLICATION</div>
      <div style={{ height: 1, background: 'rgba(20,20,20,0.1)', marginBottom: 8 }} />
      <div className="num-badge">GPA</div>
      <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', marginBottom: 8 }}>{gpa}</div>
      <div className="num-badge">SAT</div>
      <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 36, letterSpacing: '-0.02em', color: satColor, lineHeight: 1 }}>{sat}</div>
      <div style={{ height: 1, background: 'rgba(20,20,20,0.1)', margin: '10px 0 8px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ display: 'inline-block', width: 9, height: 9, background: statusColor }} />
        <span className="num-badge" style={{ color: statusColor }}>{status}</span>
      </div>
    </div>
  );
}

window.VariantA = VariantA;
