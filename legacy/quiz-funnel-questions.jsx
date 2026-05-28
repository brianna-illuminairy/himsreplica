// Quiz funnel — Q1 through Q9 (V3b Aurora system).
// Each question screen: just the headline + options + opt-out (Q1 only).
// No eyebrow, no sub paragraph. Single-tap auto-advances;
// multi-select questions have an explicit Continue footer.

// ─────────────────────────────────────────────────────────────
// Q1 · TRIGGER (step 1) — what brings the parent here
// ─────────────────────────────────────────────────────────────
function QFQ1Trigger({ value = 'score-low', onSelect = () => {} }) {
  const opts = [
    { id: 'score-low', label: "SAT score too low" },
    { id: 'test-soon', label: "SAT test date coming up" },
    { id: 'app-soon',  label: "Upcoming app deadlines (EA, ED, RD)" },
    { id: 'gpa-sat',   label: "Good grades, low SAT — why?" },
    { id: 'get-ahead', label: "Starting prep early" },
  ];
  return (
    <QFScreen stepIdx={1}>
      <QFQuestionHead title="Which sounds <em>most like you</em>?" />
      <div className="qf-options">
        {opts.map(o => (
          <QFOption key={o.id}
            selected={value === o.id}
            onClick={() => onSelect(o.id)}
          >{o.label}</QFOption>
        ))}
      </div>
      <QFOptOut />
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// Q2 · STAKES (step 2) — what's on the line
// ─────────────────────────────────────────────────────────────
function QFQ2Stakes({ value = 'top-choice', onSelect = () => {} }) {
  const opts = [
    { id: 'top-choice', label: "Top-choice school" },
    { id: 'merit',      label: "Merit scholarships" },
    { id: 'selective',  label: "Selective colleges" },
    { id: 'app-rounds', label: "Missing early app rounds" },
  ];
  return (
    <QFScreen stepIdx={2}>
      <QFQuestionHead title="What would you <em>lose</em> if their SAT didn't improve?" />
      <div className="qf-options">
        {opts.map(o => (
          <QFOption key={o.id}
            selected={value === o.id}
            onClick={() => onSelect(o.id)}
          >{o.label}</QFOption>
        ))}
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// Q2-B · ASPIRATION (A/B variant of step 2) — goal framing
//   Alternative to QFQ2Stakes ("What would you lose?"). Preserves the
//   psychological lift of consequence-anchoring but flips the valence to
//   aspiration. Same single-tap pattern, 5 options.
// ─────────────────────────────────────────────────────────────
function QFQ2Aspiration({ value = 'top-choice', onSelect = () => {} }) {
  const opts = [
    { id: 'top-choice', label: "Get into a top-choice school" },
    { id: 'merit',      label: "Qualify for merit scholarships" },
    { id: 'selective',  label: "Become competitive for selective colleges" },
    { id: 'early',      label: "Strengthen early application chances" },
  ];
  return (
    <QFScreen stepIdx={2}>
      <QFQuestionHead title="What's the biggest <em>goal</em> tied to improving their SAT score?" />
      <div className="qf-options">
        {opts.map(o => (
          <QFOption key={o.id}
            selected={value === o.id}
            onClick={() => onSelect(o.id)}
          >{o.label}</QFOption>
        ))}
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// Q3 · TIMES TAKEN (step 3)
// ─────────────────────────────────────────────────────────────
function QFQ3TimesTaken({ value = 'sat-1', onSelect = () => {} }) {
  const opts = [
    { id: 'sat-1',     label: 'SAT once' },
    { id: 'sat-2',     label: 'SAT twice' },
    { id: 'sat-3+',    label: 'SAT three+ times' },
    { id: 'psat-only', label: 'PSAT only' },
    { id: 'none',      label: 'None' },
  ];
  return (
    <QFScreen stepIdx={3}>
      <QFQuestionHead title="Have they taken the SAT before?" />
      <div className="qf-options">
        {opts.map(o => (
          <QFOption key={o.id}
            selected={value === o.id}
            onClick={() => onSelect(o.id)}
          >{o.label}</QFOption>
        ))}
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// Q4 · RECENT SCORE (step 4) — single tap rows, no helper text
// ─────────────────────────────────────────────────────────────
function QFQ4RecentScore({ value = '1200-1300', onSelect = () => {} }) {
  const opts = [
    { id: 'u1000',     label: 'Under 1000' },
    { id: '1100-1200', label: '1100–1200' },
    { id: '1200-1300', label: '1200–1300' },
    { id: '1300-1400', label: '1300–1400' },
    { id: '1400plus',  label: '1400+' },
  ];
  return (
    <QFScreen stepIdx={4}>
      <QFQuestionHead title="What's the <em>most recent</em> SAT score?" />
      <div className="qf-options">
        {opts.map(o => (
          <QFOption key={o.id}
            selected={value === o.id}
            onClick={() => onSelect(o.id)}
          >{o.label}</QFOption>
        ))}
      </div>
      <QFWhyWeAsk>
        This helps us estimate the most realistic score improvement range for the upcoming test date.
      </QFWhyWeAsk>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// Q5 · CLOCK (step 5) — specific SAT dates
//   Replaces the old standalone "test date" question. The Aug/Oct
//   dates are the urgency anchors for Nov 1 / Nov 15 ED/EA deadlines.
// ─────────────────────────────────────────────────────────────
function QFQ5Clock({ value = 'oct3', onSelect = () => {} }) {
  const opts = [
    { id: 'aug22', label: 'August 22, 2026' },
    { id: 'oct3',  label: 'October 3, 2026' },
    { id: 'nov7',  label: 'November 7, 2026' },
    { id: 'dec5',  label: 'December 5, 2026' },
    { id: '2027',  label: 'Spring 2027 or later' },
    { id: 'tbd',   label: 'Not sure yet' },
  ];
  return (
    <QFScreen stepIdx={5}>
      <QFQuestionHead title="When's their <em>next</em> SAT?" />
      <div className="qf-options">
        {opts.map(o => (
          <QFOption key={o.id}
            selected={value === o.id}
            onClick={() => onSelect(o.id)}
          >{o.label}</QFOption>
        ))}
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// Q6 · BLOCKER (step 6) — what's getting in the way (multi)
//   Was Q10 Worry. Pragmatic data — multi-select pills.
// ─────────────────────────────────────────────────────────────
function QFQ6Blocker({ value = ['no-plan'], onToggle = () => {}, onContinue = () => {} }) {
  const opts = [
    { id: 'math',       label: 'Math' },
    { id: 'reading',    label: 'Reading & writing' },
    { id: 'self-study', label: "Self-study isn't working" },
    { id: 'no-plan',    label: 'No clear plan' },
    { id: 'wont',       label: "Won't study on their own" },
    { id: 'too-busy',   label: 'Too busy' },
  ];
  return (
    <QFScreen stepIdx={7}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <QFQuestionHead title="What seems to be the <em>problem</em>?" />
      <div className="qf-multi-hint">Select all that apply</div>
      <div className="qf-options">
        {opts.map(o => (
          <QFOption key={o.id}
            multi
            selected={value.includes(o.id)}
            onClick={() => onToggle(o.id)}
          >{o.label}</QFOption>
        ))}
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// Q7 · TRIED (step 8) — what's been tried (multi). Headline branches on Q3:
//   • sat-1 / sat-2 / sat-3+ → "How did they prepare for their last SAT?"
//   • psat-only / none      → "How have they prepared so far?"
// ─────────────────────────────────────────────────────────────
function QFQ7Tried({ value = ['khan'], onToggle = () => {}, onContinue = () => {}, q3 = 'sat-1' }) {
  const hasSat = ['sat-1', 'sat-2', 'sat-3+'].includes(q3);
  const title = hasSat
    ? "How did they prepare for their <em>last SAT</em>?"
    : "How have they <em>prepared</em> so far?";

  const opts = [
    { id: 'khan',    label: 'Khan Academy / Bluebook / YouTube' },
    { id: 'group',   label: 'In-person group class' },
    { id: 'online',  label: 'Online course or class' },
    { id: 'app',     label: 'SAT App' },
    { id: 'book',    label: 'SAT Prep Book' },
    { id: 'nothing', label: "Didn't prepare much" },
  ];
  return (
    <QFScreen stepIdx={8}
      footer={<QFButton kind="forest" onClick={onContinue}>Continue</QFButton>}
    >
      <QFQuestionHead title={title} />
      <div className="qf-multi-hint">Select all that apply</div>
      <div className="qf-options">
        {opts.map(o => (
          <QFOption key={o.id}
            multi
            selected={value.includes(o.id)}
            onClick={() => onToggle(o.id)}
          >{o.label}</QFOption>
        ))}
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// Q8 · GOAL (step 8) — target score, single tap rows
// ─────────────────────────────────────────────────────────────
function QFQ8Goal({ value = '1450', onSelect = () => {} }) {
  const opts = [
    { id: '1300', label: '1300+' },
    { id: '1400', label: '1400+' },
    { id: '1450', label: '1450+' },
    { id: '1500', label: '1500+' },
    { id: '1550', label: '1550+' },
    { id: 'tbd',  label: 'Not sure' },
  ];
  return (
    <QFScreen stepIdx={10}>
      <QFQuestionHead title="What score are you <em>aiming for</em>?" />
      <div className="qf-options">
        {opts.map(o => (
          <QFOption key={o.id}
            selected={value === o.id}
            onClick={() => onSelect(o.id)}
          >{o.label}</QFOption>
        ))}
      </div>
    </QFScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// Q9 · GPA (step 9) — single tap rows
// ─────────────────────────────────────────────────────────────
function QFQ9GPA({ value = '3.8-4.0', onSelect = () => {} }) {
  const opts = [
    { id: '4.0+',    label: '4.0+' },
    { id: '3.8-4.0', label: '3.8 – 4.0' },
    { id: '3.5-3.8', label: '3.5 – 3.8' },
    { id: '3.0-3.5', label: '3.0 – 3.5' },
    { id: 'u3.0',    label: 'Below 3.0' },
    { id: 'na',      label: 'Not sure' },
  ];
  return (
    <QFScreen stepIdx={12}>
      <QFQuestionHead title="What's their <em>GPA</em>?" />
      <div className="qf-options">
        {opts.map(o => (
          <QFOption key={o.id}
            selected={value === o.id}
            onClick={() => onSelect(o.id)}
          >{o.label}</QFOption>
        ))}
      </div>
      <QFWhyWeAsk>
        Their GPA helps us set a realistic score target and build a plan that fits their timeline.
      </QFWhyWeAsk>
    </QFScreen>
  );
}

window.QFQ1Trigger = QFQ1Trigger;
window.QFQ2Stakes = QFQ2Stakes;
window.QFQ2Aspiration = QFQ2Aspiration;
window.QFQ3TimesTaken = QFQ3TimesTaken;
window.QFQ4RecentScore = QFQ4RecentScore;
window.QFQ5Clock = QFQ5Clock;
window.QFQ6Blocker = QFQ6Blocker;
window.QFQ7Tried = QFQ7Tried;
window.QFQ8Goal = QFQ8Goal;
window.QFQ9GPA = QFQ9GPA;
