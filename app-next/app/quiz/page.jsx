import { Suspense } from 'react';
import QuizRunner from './QuizRunner';

export default function QuizPage() {
  return (
    <Suspense>
      <QuizRunner />
    </Suspense>
  );
}
