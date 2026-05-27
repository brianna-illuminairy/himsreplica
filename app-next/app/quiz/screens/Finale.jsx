'use client';
import { useState } from 'react';
import { QFScreen, QFButton, QFConstellation } from '../components/QFShell';

// ─── S5 · Approved + account ──────────────────────────────────────────────────
export function QFS5Approved({ onContinue, onBack }) {
  return (
    <QFScreen stepIdx={18} ornament="glow" onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>See their plan</QFButton>}
    >
      <div className="gap-22">
        <div className="qf-eyebrow center" style={{ textAlign: 'center', color: 'var(--qf-forest)' }}>
          Eligible for a diagnostic + personalized plan
        </div>
        <h1 className="qf-h1 center" style={{ textAlign: 'center' }}>
          Your kid <em>qualifies</em> for a diagnostic and personalized plan.
        </h1>
        <p className="qf-lead center" style={{ textAlign: 'center' }}>
          Based on their profile and your timeline, we can run their diagnostic and build a plan that finishes before their test date.
          Save your spot to see the recommendation.
        </p>
        <div className="qf-card gap-14" style={{ padding: 18 }}>
          <div className="qf-field">
            <span className="qf-label">Your name</span>
            <input className="qf-input" placeholder="First and last" />
          </div>
          <div className="qf-field">
            <span className="qf-label">Your email</span>
            <input className="qf-input" type="email" placeholder="you@email.com" />
          </div>
          <div className="qf-field">
            <span className="qf-label">Mobile (for the call)</span>
            <input className="qf-input" type="tel" placeholder="(555) 123-4567" />
          </div>
          <div className="qf-field">
            <span className="qf-label">Your kid's first name</span>
            <input className="qf-input" placeholder="So we can address their plan" />
          </div>
        </div>
        <p className="qf-disclaimer center" style={{ textAlign: 'center' }}>
          We never share your details. SAT is a trademark of the College Board.
        </p>
      </div>
    </QFScreen>
  );
}

// ─── S6 · Plan preference ─────────────────────────────────────────────────────
export function QFS6Preference({ value = 'full', onSelect, onContinue, onBack }) {
  return (
    <QFScreen stepIdx={19} onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue with this plan</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">Two ways to <em>start</em>.</h1>
        <p className="qf-lead">
          Most parents start with the full plan — it's where we see the biggest gains. You can switch later.
        </p>
        <div className="gap-14" style={{ paddingTop: 6 }}>
          <button onClick={() => onSelect?.('full')}
            className="qf-plan featured"
            style={{
              textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
              borderColor: value === 'full' ? 'var(--qf-forest)' : 'var(--qf-line)',
              borderWidth: value === 'full' ? 2 : 1,
            }}>
            <div className="ribbon">Recommended · 78% pick this</div>
            <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontFamily: 'var(--qf-display)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>
                Diagnostic + <em style={{ color: 'var(--qf-forest)' }}>Tutoring</em>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--qf-display)', fontSize: 26, color: 'var(--qf-forest)', letterSpacing: '-0.02em' }}>
                  $98<span style={{ fontSize: 12, color: 'var(--qf-ink-mute)' }}>/mo</span>
                </div>
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
            <div style={{ borderTop: '1px solid var(--qf-line)', paddingTop: 10, marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="qf-meta">Avg gain</span>
              <span style={{ fontFamily: 'var(--qf-display)', fontSize: 20, color: 'var(--qf-forest)', fontWeight: 500 }}>+182 points</span>
            </div>
          </button>

          <button onClick={() => onSelect?.('diag')}
            className="qf-plan"
            style={{
              textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
              borderColor: value === 'diag' ? 'var(--qf-forest)' : 'var(--qf-line)',
              borderWidth: value === 'diag' ? 2 : 1,
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontFamily: 'var(--qf-display)', fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em' }}>Diagnostic only</div>
              <div style={{ fontFamily: 'var(--qf-display)', fontSize: 22, color: 'var(--qf-ink-2)', letterSpacing: '-0.02em' }}>
                $149<span style={{ fontSize: 11, color: 'var(--qf-ink-mute)' }}> one-time</span>
              </div>
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

// ─── S7 · Plan details ────────────────────────────────────────────────────────
const S7_TEST_DATES = {
  'aug22': new Date('2026-08-22'), 'oct3': new Date('2026-10-03'),
  'nov7': new Date('2026-11-07'), 'dec5': new Date('2026-12-05'),
};
const S7_DATE_SHORT = {
  'aug22': 'Aug 22', 'oct3': 'Oct 3', 'nov7': 'Nov 7', 'dec5': 'Dec 5',
};

export function QFS7PlanDetails({ onContinue, onBack, q5 = 'oct3' }) {
  const today = new Date('2026-05-26');
  const daysToTest = S7_TEST_DATES[q5]
    ? Math.round((S7_TEST_DATES[q5] - today) / (1000 * 60 * 60 * 24))
    : null;
  const dateShort = S7_DATE_SHORT[q5];

  const testimonials = [
    {
      photo: '/photos/student-a.jpg',
      ba: '1180 → 1410',
      quote: "I was skeptical of online tutoring. But the diagnostic showed me exactly what was wrong, and 12 weeks later he's at 1410.",
      attribution: 'David D. · Dad of a junior · CA',
    },
  ];

  return (
    <QFScreen stepIdx={20} onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>Book my free strategy call</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">12 weeks. <em>One plan.</em> Built around their gaps.</h1>

        {/* 5-row timeline */}
        <div className="gap-10">
          {[
            { wk: 'Week 1',     ttl: 'Diagnostic',          desc: 'Map their 5 high-impact gaps.' },
            { wk: 'Weeks 2–4',  ttl: 'Foundation drills',   desc: 'Fix the 2 biggest score-killers first.' },
            { wk: 'Weeks 5–8',  ttl: 'Skill building',      desc: 'Move to gaps 3–5 + bi-weekly retest.' },
            { wk: 'Weeks 9–11', ttl: 'Pacing + simulation', desc: 'Full-length timed practice tests.' },
            { wk: 'Week 12',    ttl: 'Test-day prep',       desc: 'Confidence drills. Logistics. Rest.' },
          ].map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '78px 1fr', gap: 14,
              padding: '14px 0', borderTop: i === 0 ? 'none' : '1px solid var(--qf-line)',
            }}>
              <div className="qf-meta" style={{ color: 'var(--qf-forest)', paddingTop: 4 }}>{s.wk}</div>
              <div>
                <div style={{ fontFamily: 'var(--qf-display)', fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>{s.ttl}</div>
                <div style={{ fontSize: 13, color: 'var(--qf-ink-mid)', marginTop: 2, lineHeight: 1.45 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Urgency + free-call reassurance, paired */}
        {daysToTest && dateShort && (
          <div style={{
            background: 'var(--qf-bg-2)',
            border: '1px solid var(--qf-line)',
            borderRadius: 12, padding: '14px 16px',
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <div style={{
              fontFamily: 'var(--qf-display)', fontSize: 17, fontWeight: 500,
              letterSpacing: '-0.01em', color: 'var(--qf-ink)',
            }}>
              <em style={{ color: 'var(--qf-forest)' }}>{daysToTest} days</em> until the {dateShort} SAT.
            </div>
            <div style={{ fontSize: 13, color: 'var(--qf-ink-mid)', lineHeight: 1.5 }}>
              Spots for the diagnostic and weekly sessions fill up fast. The strategy call is free — no commitment.
            </div>
          </div>
        )}

        {/* Testimonials with real student photos */}
        <div className="gap-14">
          {testimonials.map((r, i) => (
            <div key={i} className="qf-card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 12,
                  overflow: 'hidden', flexShrink: 0,
                  background:
                    'linear-gradient(135deg, #C8E6CF 0%, #77C89A 60%, #2F6E47 100%)',
                  position: 'relative',
                }}>
                  <img
                    src={r.photo}
                    alt=""
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', display: 'block',
                    }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--qf-display)', fontSize: 22, color: 'var(--qf-forest)',
                    fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.1,
                  }}>{r.ba}</div>
                  <div className="qf-meta" style={{ color: 'var(--qf-forest)', marginTop: 4 }}>✓ Verified</div>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--qf-display)', fontSize: 15.5, lineHeight: 1.5, fontWeight: 500, color: 'var(--qf-ink-2)', margin: 0 }}>"{r.quote}"</p>
              <div className="qf-meta" style={{ marginTop: 10 }}>— {r.attribution}</div>
            </div>
          ))}
        </div>
      </div>
    </QFScreen>
  );
}

// ─── S8 · Acknowledgment ─────────────────────────────────────────────────────
export function QFS8Acknowledgment({ name = "your kid", onContinue, onBack }) {
  return (
    <QFScreen stepIdx={21} ornament="glow" onBack={onBack}
      footer={<QFButton kind="forest" onClick={onContinue}>Book the call</QFButton>}
    >
      <div className="gap-22 center" style={{ textAlign: 'center', alignItems: 'center' }}>
        <div style={{
          width: 84, height: 84, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, var(--qf-glow), var(--qf-forest) 78%)',
          boxShadow: '0 0 60px rgba(184, 224, 197, 0.45)', marginTop: 8,
        }} />
        <div className="qf-eyebrow center" style={{ textAlign: 'center', color: 'var(--qf-forest)' }}>
          Plan reserved
        </div>
        <h1 className="qf-h1 center" style={{ textAlign: 'center' }}>We're <em>on it</em>.</h1>
        <p className="qf-lead" style={{ maxWidth: 320 }}>
          Your kid's plan is reserved. The last step is a 15-min strategy call to discuss your kid's goals and timeline. If we're a fit, we'll enroll and schedule the diagnostic from there.
        </p>
        <QFConstellation />
        <ul className="qf-checklist" style={{ width: '100%', textAlign: 'left' }}>
          <li><span className="check">✓</span>15 minutes · just you, no student required</li>
          <li><span className="check">✓</span>You'll meet their matched tutor by name</li>
          <li><span className="check">✓</span>Enrollment + diagnostic scheduling happens on the call</li>
        </ul>
        <p className="qf-disclaimer">Free call. No charge until you enroll on the call.</p>
      </div>
    </QFScreen>
  );
}

// ─── S9 · Booking ─────────────────────────────────────────────────────────────
export function QFS9Booking({ onComplete, onBack }) {
  const [selectedDay, setSelectedDay] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState(4);

  const days = [
    { dow: 'TUE', dom: '27' }, { dow: 'WED', dom: '28' },
    { dow: 'THU', dom: '29' }, { dow: 'FRI', dom: '30' },
  ];
  const slots = ['8:30 AM', '10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM', '7:00 PM'];

  return (
    <QFScreen stepIdx={22} onBack={onBack}
      footer={<QFButton kind="forest" onClick={onComplete}>Confirm {days[selectedDay].dow === 'THU' ? 'Thursday' : days[selectedDay].dow} · {slots[selectedSlot]}</QFButton>}
    >
      <div className="gap-22">
        <h1 className="qf-h1">Pick a time for your <em>free</em> strategy call.</h1>
        <p className="qf-lead">
          With a plan specialist. We'll walk through your kid's goals, timeline, and recommended plan. Free, no commitment.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {days.map((d, i) => (
            <div key={i} onClick={() => setSelectedDay(i)} style={{
              padding: '12px 4px', textAlign: 'center', borderRadius: 12, cursor: 'pointer',
              background: i === selectedDay ? 'var(--qf-forest)' : 'var(--qf-paper)',
              color: i === selectedDay ? 'var(--qf-paper)' : 'var(--qf-ink)',
              border: '1px solid ' + (i === selectedDay ? 'var(--qf-forest)' : 'var(--qf-line)'),
            }}>
              <div style={{ fontFamily: 'var(--qf-mono)', fontSize: 9, letterSpacing: '0.18em', opacity: i === selectedDay ? 0.85 : 0.6 }}>{d.dow}</div>
              <div style={{ fontFamily: 'var(--qf-display)', fontSize: 22, marginTop: 4, letterSpacing: '-0.01em', fontStyle: i === selectedDay ? 'italic' : 'normal' }}>{d.dom}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="qf-meta" style={{ marginBottom: 10 }}>
            {['Tuesday May 27', 'Wednesday May 28', 'Thursday May 29', 'Friday May 30'][selectedDay]} · Pacific
          </div>
          <div className="qf-slots">
            {slots.map((s, i) => (
              <button key={i} onClick={() => setSelectedSlot(i)}
                className={"qf-slot" + (i === selectedSlot ? ' selected' : '')}>{s}</button>
            ))}
          </div>
        </div>
        <div className="qf-card" style={{
          background: 'var(--qf-bg-2)', borderColor: 'rgba(20,32,46,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div className="qf-meta">Your call</div>
            <div style={{ fontFamily: 'var(--qf-display)', fontSize: 17, marginTop: 2, letterSpacing: '-0.01em' }}>
              {['Tue May 27','Wed May 28','Thu May 29','Fri May 30'][selectedDay]} · <em style={{ color: 'var(--qf-forest)' }}>{slots[selectedSlot]} PT</em>
            </div>
          </div>
          <div className="qf-meta" style={{ color: 'var(--qf-forest)' }}>15 min</div>
        </div>
        <ul className="qf-checklist" style={{ gap: 8 }}>
          <li style={{ fontSize: 13 }}><span className="check">✓</span>No charge until after the call</li>
          <li style={{ fontSize: 13 }}><span className="check">✓</span>Reschedule in one tap</li>
          <li style={{ fontSize: 13 }}><span className="check">✓</span>You'll get a calendar invite + confirmation text</li>
        </ul>
      </div>
    </QFScreen>
  );
}
