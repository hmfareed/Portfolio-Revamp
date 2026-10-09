import type { Metadata, Viewport } from 'next';
import { Caveat, Kalam, Lilita_One, Nunito, Press_Start_2P, VT323, Gaegu, Quicksand, Fredoka, Rubik } from 'next/font/google';
import { ThemeProvider, ThemeToggle } from '@/themes/ThemeContext';
import { CURRENT_THEME_KEY } from '@/themes/theme.config';
import './globals.css';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-kalam',
  display: 'swap',
});

const lilitaOne = Lilita_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lilita',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
});

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pixel',
  display: 'swap',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vt323',
  display: 'swap',
});

const gaegu = Gaegu({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-chalk-heading',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-chalk-body',
  display: 'swap',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap',
});


export const viewport: Viewport = {
  themeColor: '#7FD6FF',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mohammedfareed.dev'),
  title: 'Mohammed Fareed — Full-Stack Developer | Portfolio',
  description:
    'Full-stack engineer architecting scalable web applications, robust APIs, and production-ready digital products. Next.js, React, TypeScript, Node.js, MongoDB, PostgreSQL, Paystack, and AI.',
  keywords: [
    'Mohammed Fareed',
    'Mohammed Fareed Mandeeya Haruna',
    'Full-Stack Developer Ghana',
    'Next.js Developer Tamale',
    'Paystack integration',
    'Tamale developer',
    'Ghanaian web developer',
    'Klyro founder',
  ],
  authors: [{ name: 'Mohammed Fareed Mandeeya Haruna', url: 'https://github.com/hmfareed' }],
  creator: 'Mohammed Fareed',
  icons: {
    icon: '/chalk-favicon.svg',
    shortcut: '/chalk-favicon.svg',
    apple: '/chalk-favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohammedfareed.dev',
    title: 'Mohammed Fareed — Full-Stack Developer Portfolio',
    description:
      'Full-stack engineer architecting scalable web applications, robust APIs, and production-ready digital products. Next.js, React, TypeScript, Node.js, Paystack, and AI.',
    siteName: 'Mohammed Fareed Portfolio',
    images: [
      {
        url: '/images/profile/fareed.png',
        width: 800,
        height: 1000,
        alt: 'Mohammed Fareed Mandeeya Haruna',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Fareed — Full-Stack Developer',
    description:
      'Full-stack engineer architecting scalable web applications, robust APIs, and production-ready digital products.',
    images: ['/images/profile/fareed.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth ${caveat.variable} ${kalam.variable} ${lilitaOne.variable} ${nunito.variable} ${pressStart2P.variable} ${vt323.variable} ${gaegu.variable} ${quicksand.variable} ${fredoka.variable} ${rubik.variable}`}
    >
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <ThemeProvider defaultTheme={CURRENT_THEME_KEY}>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
