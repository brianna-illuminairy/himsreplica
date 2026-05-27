import { Fraunces, Schibsted_Grotesk, DM_Mono } from 'next/font/google';
import './globals.css';
import './quiz-funnel.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
  weight: 'variable',
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
});

export const metadata = {
  title: 'illuminairy · SAT Quiz',
  description: "Find out what's really holding your kid's SAT score back.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${schibstedGrotesk.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
