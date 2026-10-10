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
    'Full-stack engineer architecting scalable web applications, robust APIs, and production-ready digital products. Next.js, React, TypeScript, Node.js, MongoDB, PostgreSQL, Payment integrations, and AI.',
  keywords: [
    'Mohammed Fareed',
    'Mohammed Fareed Mandeeya Haruna',
    'Full-Stack Developer Ghana',
    'Next.js Developer Tamale',
    'Payment integrations',
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
      'Full-stack engineer architecting scalable web applications, robust APIs, and production-ready digital products. Next.js, React, TypeScript, Node.js, Payment integrations, and AI.',
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
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://mohammedfareed.dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://mohammedfareed.dev/#person',
      name: 'Mohammed Fareed Mandeeya Haruna',
      alternateName: 'Mohammed Fareed',
      url: 'https://mohammedfareed.dev',
      image: 'https://mohammedfareed.dev/images/profile/fareed.png',
      jobTitle: 'Full-Stack Software Developer',
      worksFor: [
        {
          '@type': 'Organization',
          name: 'ELAGENT',
        },
        {
          '@type': 'Organization',
          name: 'Hanara Schools',
        },
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'University of Technology and Applied Sciences (UTAS), Navrongo',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tamale',
        addressCountry: 'GH',
      },
      sameAs: [
        'https://github.com/hmfareed',
        'https://linkedin.com/in/mohammed-fareed-haruna',
      ],
      knowsAbout: [
        'Full-Stack Web Development',
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'Express',
        'PostgreSQL',
        'Supabase',
        'Docker',
        'MongoDB',
        'Payment integrations',
        'Machine Learning',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://mohammedfareed.dev/#website',
      url: 'https://mohammedfareed.dev',
      name: 'Mohammed Fareed — Full-Stack Developer Portfolio',
      publisher: {
        '@id': 'https://mohammedfareed.dev/#person',
      },
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <ThemeProvider defaultTheme="pencil">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
