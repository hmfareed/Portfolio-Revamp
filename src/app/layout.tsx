import type { Metadata, Viewport } from 'next';
import { Caveat, Kalam } from 'next/font/google';
import { ThemeProvider } from '@/themes/ThemeContext';
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

export const viewport: Viewport = {
  themeColor: '#ECE5D3',
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
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
      className={`scroll-smooth ${caveat.variable} ${kalam.variable}`}
    >
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <ThemeProvider defaultTheme="pencil">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
