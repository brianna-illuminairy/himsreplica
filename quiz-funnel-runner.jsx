// Interactive SAT quiz funnel — wired end-to-end (Flow A: trust-first).
// Used by SAT Quiz Funnel Live.html

const QF_DEFAULT_ANSWERS = {
  q1: 'score-low',
  q2: 'top-choice',
  q3: 'sat-1',
  q4: '1200-1300',
  q5: 'oct3',
  q6: ['no-plan'],
  q7: ['khan'],
  q8: '1400-1500',
  q9: '3.8-4.0',
  planPref: 'full',
};

const QF_Q5_DATE_PHRASE = {
  aug22: 'August 22',
  oct3: 'October 3rd',
  nov7: 'November 7',
  dec5: 'December 5',
  '2027': 'Spring 2027',
  tbd: 'your test date',
};

const QF_Q3_LABEL = {
  'sat-1': 'Once before',
  'sat-2': 'Twice',
  'sat-3+': 'Three or more times',
  'psat-only': 'PSAT only',
  none: 'Not yet',
};

const QF_Q4_LABEL = {
  u1000: 'Under 1000',
  '1100-1200': '1100–1200',
  '1200-1300': '1200–1300',
  '1300-1400': '1300–1400',
  '1400plus': '1400+',
};

const QF_Q7_LABEL = {
  khan: 'Khan / Bluebook / YouTube',
  group: 'In-person group class',
  online: 'Online course',
  app: 'SAT app',
  book: 'SAT prep book',
  nothing: "Didn't prepare much",
};

const QF_Q6_LABEL = {
  math: 'Math',
  reading: 'Reading & writing',
  'self-study': 'Self-study not working',
  'no-plan': 'No clear plan',
  wont: "Won't study alone",
  'too-busy': 'Too busy',
};

const QF_Q2_LABEL = {
  'top-choice': 'Top-choice school',
  merit: 'Merit scholarships',
  selective: 'Selective colleges',
  'app-rounds': 'Early application timing',
};

const QF_Q8_LABEL = {
  '1200-1300': '1200-1300',
  '1300-1400': '1300-1400',
  '1400-1500': '1400-1500',
  '1500plus': '1500+',
};

const QF_Q9_LABEL = {
  '4.0+': '4.0+',
  '3.8-4.0': '3.8–4.0',
  '3.5-3.8': '3.5–3.8',
  '3.0-3.5': '3.0–3.5',
  'u3.0': 'Below 3.0',
  na: 'Not sure',
};

const QF_Q4_BAND_LOW = {
  u1000: 900,
  '1100-1200': 1100,
  '1200-1300': 1200,
  '1300-1400': 1300,
  '1400plus': 1400,
};

const QF_Q8_GOAL_LOW = {
  '1200-1300': 1200,
  '1300-1400': 1300,
  '1400-1500': 1400,
  '1500plus': 1500,
};

function qfScoreGapLabel(q4, q8) {
  if (!q4 || !q8) return '—';
  const from = QF_Q4_BAND_LOW[q4];
  const to = QF_Q8_GOAL_LOW[q8];
  if (from == null || to == null) return '—';
  const pts = to - from;
  if (pts <= 0) return 'In range for goal';
  return `~${pts}+ points`;
}

function qfShouldShowGpaGap(answers) {
  const gpa = answers.q9;
  const gpaOk = ['3.0-3.5', '3.5-3.8', '3.8-4.0', '4.0+'].indexOf(gpa) >= 0;
  const scoreLow = answers.q4 && answers.q4 !== '1400plus';
  return gpaOk && scoreLow;
}

function qfBuildSummaryInputs(answers) {
  const a = answers || QF_DEFAULT_ANSWERS;
  const tried = (a.q7 || [])
    .map(id => QF_Q7_LABEL[id])
    .filter(Boolean)
    .join(' · ') || '—';
  const blockers = (a.q6 || [])
    .map(id => QF_Q6_LABEL[id])
    .filter(Boolean)
    .join(' · ') || '—';

  return {
    testDate: QF_Q5_DATE_PHRASE[a.q5] || '—',
    timesTaken: QF_Q3_LABEL[a.q3] || '—',
    currentRange: QF_Q4_LABEL[a.q4] || '—',
    goalRange: QF_Q8_LABEL[a.q8] || '—',
    gap: qfScoreGapLabel(a.q4, a.q8),
    gpaRange: QF_Q9_LABEL[a.q9] || '—',
    tried,
    blockers,
  };
}

function qfResolveStepIds(answers) {
  const ids = [
    'q1', 'q2', 'q3', 'q4', 'q5',
    'i1', 'q6', 'q7', 'diag',
    'compute', 'q8', 'q9',
  ];
  if (qfShouldShowGpaGap(answers)) ids.push('gpa-gap');
  ids.push(
    'snapshot',
    'method-plan',
    'method-mistake',
    'method-tutor',
    'projection',
    'proof',
    'support',
    'approved',
    'preference',
    'plan-details',
    'ack',
    'booking',
  );
  return ids;
}

function QuizFunnelRunner() {
  const W = 402;
  const H = 874;

  const [answers, setAnswers] = React.useState(() => ({ ...QF_DEFAULT_ANSWERS }));
  const [cursor, setCursor] = React.useState(0);
  const [history, setHistory] = React.useState([0]);
  const answersRef = React.useRef(answers);
  answersRef.current = answers;

  const stepIds = React.useMemo(() => qfResolveStepIds(answers), [answers]);
  const totalSteps = stepIds.length;
  const stepId = stepIds[cursor] || 'q1';
  const progressIdx = cursor + 1;

  const patchAnswer = React.useCallback((key, value) => {
    setAnswers(prev => {
      const next = { ...prev, [key]: value };
      return next;
    });
  }, []);

  const goNext = React.useCallback(() => {
    setCursor(prev => {
      const ids = qfResolveStepIds(answersRef.current);
      const next = Math.min(prev + 1, ids.length - 1);
      setHistory(h => [...h, next]);
      return next;
    });
  }, []);

  const goBack = React.useCallback(() => {
    setHistory(h => {
      if (h.length <= 1) return h;
      const nextHist = h.slice(0, -1);
      const prevCursor = nextHist[nextHist.length - 1];
      setCursor(prevCursor);
      return nextHist;
    });
  }, []);

  const toggleMulti = React.useCallback((key, id) => {
    setAnswers(prev => {
      const list = prev[key] ? prev[key].slice() : [];
      const i = list.indexOf(id);
      if (i >= 0) list.splice(i, 1);
      else list.push(id);
      return { ...prev, [key]: list };
    });
  }, []);

  const pickSingle = (key, id) => {
    patchAnswer(key, id);
    setCursor(prev => {
      const draft = { ...answers, [key]: id };
      const ids = qfResolveStepIds(draft);
      const next = Math.min(prev + 1, ids.length - 1);
      setHistory(h => [...h, next]);
      return next;
    });
  };

  let screen = null;

  if (stepId === 'q1') {
    screen = (
      <QFQ1Trigger
        value={answers.q1}
        onSelect={id => pickSingle('q1', id)}
      />
    );
  } else if (stepId === 'q2') {
    screen = (
      <QFQ2Stakes
        value={answers.q2}
        onSelect={id => pickSingle('q2', id)}
      />
    );
  } else if (stepId === 'q3') {
    screen = (
      <QFQ3TimesTaken
        value={answers.q3}
        onSelect={id => pickSingle('q3', id)}
      />
    );
  } else if (stepId === 'q4') {
    screen = (
      <QFQ4RecentScore
        value={answers.q4}
        onSelect={id => pickSingle('q4', id)}
      />
    );
  } else if (stepId === 'q5') {
    screen = (
      <QFQ5Clock
        value={answers.q5}
        onSelect={id => pickSingle('q5', id)}
      />
    );
  } else if (stepId === 'i1') {
    screen = (
      <QFI1Proof
        q2={answers.q2}
        vars={{ test_date_phrase: QF_Q5_DATE_PHRASE[answers.q5] || 'October 3rd' }}
        onContinue={goNext}
      />
    );
  } else if (stepId === 'q6') {
    screen = (
      <QFQ6Blocker
        value={answers.q6}
        onToggle={id => toggleMulti('q6', id)}
        onContinue={goNext}
      />
    );
  } else if (stepId === 'q7') {
    screen = (
      <QFQ7Tried
        q3={answers.q3}
        value={answers.q7}
        onToggle={id => toggleMulti('q7', id)}
        onContinue={goNext}
      />
    );
  } else if (stepId === 'diag') {
    screen = (
      <QFIDiagnosisCompare
        q6={answers.q6}
        q7={answers.q7}
        onContinue={goNext}
      />
    );
  } else if (stepId === 'compute') {
    screen = (
      <QFI2BuildPlan
        q4={answers.q4}
        q5={answers.q5}
        q6={answers.q6}
        q7={answers.q7}
        onContinue={goNext}
      />
    );
  } else if (stepId === 'q8') {
    screen = (
      <QFQ8Goal
        value={answers.q8}
        onSelect={id => pickSingle('q8', id)}
      />
    );
  } else if (stepId === 'q9') {
    screen = (
      <QFQ9GPA
        value={answers.q9}
        onSelect={id => pickSingle('q9', id)}
      />
    );
  } else if (stepId === 'gpa-gap') {
    screen = (
      <QFIGPAGap
        q4={answers.q4}
        q9={answers.q9}
        onContinue={goNext}
      />
    );
  } else if (stepId === 'snapshot') {
    screen = (
      <QFS1Summary
        inputs={qfBuildSummaryInputs(answers)}
        onContinue={goNext}
      />
    );
  } else if (stepId === 'method-plan') {
    screen = <QFS15MethodPlan onContinue={goNext} />;
  } else if (stepId === 'method-mistake') {
    screen = <QFS16MethodMistake onContinue={goNext} />;
  } else if (stepId === 'method-tutor') {
    screen = <QFS17MethodTutor onContinue={goNext} />;
  } else if (stepId === 'projection') {
    screen = (
      <QFV1Projection
        q4={answers.q4}
        q5={answers.q5}
        q8={answers.q8}
        onContinue={goNext}
      />
    );
  } else if (stepId === 'proof') {
    screen = <QFS3Stats onContinue={goNext} />;
  } else if (stepId === 'support') {
    screen = <QFS4Authority onContinue={goNext} />;
  } else if (stepId === 'approved') {
    screen = <QFS5Approved onContinue={goNext} />;
  } else if (stepId === 'preference') {
    screen = (
      <QFS6Preference
        value={answers.planPref}
        onSelect={v => patchAnswer('planPref', v)}
        onContinue={goNext}
      />
    );
  } else if (stepId === 'plan-details') {
    screen = <QFS7PlanDetails onContinue={goNext} />;
  } else if (stepId === 'ack') {
    screen = <QFS8Acknowledgment onContinue={goNext} />;
  } else if (stepId === 'booking') {
    screen = <QFS9Booking onComplete={goNext} />;
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#E8E2D6',
      padding: '24px 16px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        marginBottom: 12,
        fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
        fontSize: 12,
        color: 'rgba(40,30,20,0.65)',
        textAlign: 'center',
      }}>
        Live funnel · step {progressIdx} of {totalSteps}
        <span style={{ opacity: 0.5 }}> · {stepId}</span>
      </div>
      <div style={{ width: W, height: H, background: '#000', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }}>
        <IOSDevice width={W} height={H}>
          <QFNavCtx.Provider value={{ onBack: goBack, showBack: cursor > 0 }}>
            {screen}
          </QFNavCtx.Provider>
        </IOSDevice>
      </div>
    </div>
  );
}

window.QuizFunnelRunner = QuizFunnelRunner;
window.qfResolveStepIds = qfResolveStepIds;
window.qfShouldShowGpaGap = qfShouldShowGpaGap;

function qfMountLiveFunnel() {
  const root = document.getElementById('root');
  if (!root || root.dataset.qfMounted === '1') return;
  if (!window.ReactDOM || !window.QuizFunnelRunner) return;
  root.dataset.qfMounted = '1';
  ReactDOM.createRoot(root).render(<QuizFunnelRunner />);
}
window.qfMountLiveFunnel = qfMountLiveFunnel;
qfMountLiveFunnel();
