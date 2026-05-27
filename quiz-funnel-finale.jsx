// Quiz funnel — Approved/Account, Preference, Plan Details, Acknowledgment, Booking (S5–S9).
// Steps 19–23.

// ─────────────────────────────────────────────────────────────
// S5 · APPROVED + CREATE ACCOUNT (step 19)
//   Hims-style "good news, you qualify" moment — first typed input.
// ─────────────────────────────────────────────────────────────
function QFS5Approved({ onContinue = () => {} }) {
  return (
    <QFScreen
      stepIdx={18}
      footer={<QFButton kind="forest" onClick={onContinue}>See their plan</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1 center qf-h1--stack" style={{ textAlign: 'center' }}>
          Good news — your kid <em>qualifies</em>.
          <span className="qf-h1-second">We can build a plan before test day.</span>
          <span className="qf-h1-second">Save your spot to see it.</span>
        </h1>

        <div className="qf-card gap-14" style={{ padding: 18 }}>
          <div className="qf-field">
            <span className="qf-label">Your name</span>
            <input className="qf-input" placeholder="First and last" defaultValue="" />
          </div>
          <div className="qf-field">
            <span className="qf-label">Your email</span>
            <input className="qf-input" type="email" placeholder="you@email.com" defaultValue="" />
          </div>
          <div className="qf-field">
            <span className="qf-label">Mobile (for the call)</span>
            <input className="qf-input" type="tel" placeholder="(555) 123-4567" defaultValue="" />
          </div>
          <div className="qf-field">
            <span className="qf-label">Your kid's first name</span>
            <input className="qf-input" placeholder="So we can address their plan" defaultValue="" />
          </div>
        </div>

      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// S6 · PREFERENCE (step 20) — diagnostic only vs +tutoring (featured)
// ─────────────────────────────────────────────────────────────
function QFS6Preference({ value = 'full', onSelect = () => {}, onContinue = () => {} }) {
  return (
    <QFScreen
      stepIdx={19}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue with this plan</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">Pick how to <em>start</em>.</h1>

        <div className="gap-14" style={{ paddingTop: 6 }}>
          {/* Featured: Diagnostic + Tutoring */}
          <button onClick={() => onSelect('full')}
            className={"qf-plan featured"}
            style={{
              textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
              borderColor: value === 'full' ? 'var(--qf-forest)' : 'var(--qf-line)',
              borderWidth: value === 'full' ? 2 : 1,
            }}>
            <div className="ribbon">Recommended · 78% pick this</div>

            <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{
                fontFamily: 'var(--qf-display)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em',
              }}>Diagnostic + <em style={{ color: 'var(--qf-forest)' }}>Tutoring</em></div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'var(--qf-display)', fontSize: 26, color: 'var(--qf-forest)',
                  letterSpacing: '-0.02em',
                }}>$98<span style={{ fontSize: 12, color: 'var(--qf-ink-mute)' }}>/mo</span></div>
                <div className="qf-meta" style={{ textAlign: 'right' }}>Avg tutor: $400/mo</div>
              </div>
            </div>

            <ul className="qf-checklist" style={{ marginTop: 6 }}>
              <li><span className="check">✓</span>Full 60-min diagnostic</li>
              <li><span className="check">✓</span>Personalized 12-week plan</li>
              <li><span className="check">✓</span>2× weekly 1:1 sessions</li>
              <li><span className="check">✓</span>Unlimited text-in tutor access</li>
              <li><span className="check">✓</span>Bi-weekly progress retests</li>
            </ul>

            <div style={{
              borderTop: '1px solid var(--qf-line)', paddingTop: 10, marginTop: 6,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span className="qf-meta">Avg gain</span>
              <span style={{
                fontFamily: 'var(--qf-display)', fontSize: 20, color: 'var(--qf-forest)',
                fontWeight: 500,
              }}>+182 points</span>
            </div>
          </button>

          {/* Alt: Diagnostic only */}
          <button onClick={() => onSelect('diag')}
            className="qf-plan"
            style={{
              textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
              borderColor: value === 'diag' ? 'var(--qf-forest)' : 'var(--qf-line)',
              borderWidth: value === 'diag' ? 2 : 1,
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{
                fontFamily: 'var(--qf-display)', fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em',
              }}>Diagnostic only</div>
              <div style={{
                fontFamily: 'var(--qf-display)', fontSize: 22, color: 'var(--qf-ink-2)',
                letterSpacing: '-0.02em',
              }}>$149<span style={{ fontSize: 11, color: 'var(--qf-ink-mute)' }}> one-time</span></div>
            </div>

            <ul className="qf-checklist" style={{ marginTop: 4 }}>
              <li><span className="check" style={{ background: 'var(--qf-ink-mute)' }}>✓</span>60-min diagnostic</li>
              <li><span className="check" style={{ background: 'var(--qf-ink-mute)' }}>✓</span>5-skill priority plan they can self-study</li>
              <li><span className="check" style={{ background: 'var(--qf-ink-mute)' }}>—</span><span style={{ color: 'var(--qf-ink-mute)' }}>No 1:1 tutoring</span></li>
            </ul>

            <div className="qf-meta" style={{ paddingTop: 4, color: 'var(--qf-ink-mute)' }}>
              For families with a tutor already lined up.
            </div>
          </button>
        </div>
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// S7 · PLAN DETAILS (step 21) — long-form what-to-expect
// ─────────────────────────────────────────────────────────────
function QFS7PlanDetails({ onContinue = () => {} }) {
  return (
    <QFScreen
      stepIdx={20}
      footer={<QFButton kind="forest" onClick={onContinue}>This is what we want</QFButton>}
    >
      <h1 className="qf-h1">12 weeks. <em>One plan.</em></h1>
      <div className="qf-img-ph" style={{ aspectRatio: '4/3', marginTop: 24 }}>
        Plan mockup
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// S8 · ACKNOWLEDGMENT (step 22) — "we're on it" mini-celebration
// ─────────────────────────────────────────────────────────────
function QFS8Acknowledgment({ name = "your kid", onContinue = () => {} }) {
  return (
    <QFScreen
      stepIdx={21}
      footer={<QFButton kind="forest" onClick={onContinue}>Book the call</QFButton>}
    >
      <div className="qf-ack-screen">
        <h1 className="qf-h1 center qf-h1--stack" style={{ textAlign: 'center' }}>
          Plan <em>reserved</em>.
          <span className="qf-h1-second">Book a 15-min call to lock in their diagnostic.</span>
        </h1>
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// S9 · BOOKING (step 23) — calendar + finalize
// ─────────────────────────────────────────────────────────────
function QFS9Booking({ onComplete = () => {} }) {
  const days = [
    { dow: 'TUE', dom: '27', label: 'May 27' },
    { dow: 'WED', dom: '28', label: 'May 28' },
    { dow: 'THU', dom: '29', label: 'May 29', recommended: true },
    { dow: 'FRI', dom: '30', label: 'May 30' },
  ];
  const slots = ['8:30 AM', '10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM', '7:00 PM'];

  return (
    <QFScreen
      stepIdx={22}
      footer={<QFButton kind="forest" onClick={onComplete}>Confirm Thursday · 5:30 PM</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">Pick a time for your <em>15-minute</em> call.</h1>

        {/* Day strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {days.map((d, i) => {
            const selected = i === 2;
            return (
              <div key={i} style={{
                padding: '12px 4px', textAlign: 'center',
                borderRadius: 12,
                background: selected ? 'var(--qf-forest)' : 'var(--qf-paper)',
                color: selected ? 'var(--qf-paper)' : 'var(--qf-ink)',
                border: '1px solid ' + (selected ? 'var(--qf-forest)' : 'var(--qf-line)'),
                cursor: 'pointer',
                position: 'relative',
              }}>
                <div style={{
                  fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.18em',
                  opacity: selected ? 0.85 : 0.6,
                }}>{d.dow}</div>
                <div style={{
                  fontFamily: 'var(--qf-display)', fontSize: 22, marginTop: 4,
                  letterSpacing: '-0.01em',
                  fontStyle: selected ? 'italic' : 'normal',
                }}>{d.dom}</div>
                {d.recommended && !selected && (
                  <div style={{
                    position: 'absolute', top: -7, right: -4,
                    background: 'var(--qf-amber)', color: 'var(--qf-paper)',
                    fontFamily: 'var(--qf-mono)', fontSize: 8, letterSpacing: '0.12em',
                    padding: '2px 6px', borderRadius: 999,
                  }}>SOON</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Slot grid */}
        <div>
          <div className="qf-meta" style={{ marginBottom: 10 }}>Thursday, May 29 · Pacific</div>
          <div className="qf-slots">
            {slots.map((s, i) => (
              <button key={i} className={"qf-slot" + (i === 4 ? ' selected' : '')}>{s}</button>
            ))}
          </div>
        </div>

        {/* Summary line */}
        <div className="qf-card" style={{
          background: 'var(--qf-bg-2)', borderColor: 'rgba(20,32,46,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div className="qf-meta">Your call</div>
            <div style={{
              fontFamily: 'var(--qf-display)', fontSize: 17, marginTop: 2, letterSpacing: '-0.01em',
            }}>Thu May 29 · <em style={{ color: 'var(--qf-forest)' }}>5:30 PM PT</em></div>
          </div>
          <div className="qf-meta" style={{ color: 'var(--qf-forest)' }}>15 min</div>
        </div>

        {/* Trust micro-copy */}
        <ul className="qf-checklist" style={{ gap: 8 }}>
          <li style={{ fontSize: 13 }}><span className="check">✓</span>No charge until after the call</li>
          <li style={{ fontSize: 13 }}><span className="check">✓</span>Reschedule in one tap</li>
          <li style={{ fontSize: 13 }}><span className="check">✓</span>You'll get a calendar invite + confirmation text</li>
        </ul>
      </div>
    </QFScreen>
  );
}

window.QFS5Approved = QFS5Approved;
window.QFS6Preference = QFS6Preference;
window.QFS7PlanDetails = QFS7PlanDetails;
window.QFS8Acknowledgment = QFS8Acknowledgment;
window.QFS9Booking = QFS9Booking;
