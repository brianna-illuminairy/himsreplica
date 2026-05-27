'use client';
import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'qf_answers';

const initialState = {
  q1: null, q2: null, q3: null, q4: null, q5: null,
  q6: [],   q7: [],   q8: null, q9: null,
  // derived
  parentName: '', parentEmail: '', parentPhone: '', kidName: '',
  planChoice: 'full',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_Q':    return { ...state, [action.key]: action.value };
    case 'TOGGLE_Q': {
      const prev = state[action.key] || [];
      const next = prev.includes(action.id)
        ? prev.filter(x => x !== action.id)
        : [...prev, action.id];
      return { ...state, [action.key]: next };
    }
    case 'SET_FIELD': return { ...state, [action.key]: action.value };
    case 'LOAD':      return { ...initialState, ...action.data };
    default:          return state;
  }
}

const QuizCtx = createContext(null);

export function QuizProvider({ children }) {
  const [answers, dispatch] = useReducer(reducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: 'LOAD', data: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(answers)); } catch {}
  }, [answers]);

  return <QuizCtx.Provider value={{ answers, dispatch }}>{children}</QuizCtx.Provider>;
}

export function useQuiz() {
  return useContext(QuizCtx);
}

// Derived: is i-gap screen shown?
export function showGapScreen(answers) {
  const highGpa = ['3.0-3.5', '3.5-3.8', '3.8-4.0', '4.0+'].includes(answers.q9);
  const lowScore = ['u1000', '1100-1200', '1200-1300', '1300-1400'].includes(answers.q4);
  return highGpa && lowScore;
}
