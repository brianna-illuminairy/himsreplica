import { QuizProvider } from './state';

export default function QuizLayout({ children }) {
  return <QuizProvider>{children}</QuizProvider>;
}
