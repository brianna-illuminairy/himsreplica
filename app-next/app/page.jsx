import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/quiz?step=q1');
}
