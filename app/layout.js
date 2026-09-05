import './globals.css'

export const metadata = {
  metadataBase: new URL('https://vs-code-port1.vercel.app'),
  title: 'Samuel Opoku — Instructional Designer',
  description: 'Instructional designer creating accessible, learner-centered e-learning with Articulate 360, Adobe Creative Suite, and AI-assisted workflows. Experience across medtech and cultural education.',
  keywords: ['Instructional Designer', 'Digital Learning Designer', 'E-Learning', 'Articulate 360', 'ADDIE', 'WCAG', 'Samuel Opoku', 'Lübeck', 'Germany'],
  authors: [{ name: 'Samuel Opoku' }],
  creator: 'Samuel Opoku',
  alternates: {
    canonical: 'https://vs-code-port1.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vs-code-port1.vercel.app',
    siteName: 'Samuel Opoku',
    title: 'Samuel Opoku — Instructional Designer',
    description: 'Instructional designer creating accessible, learner-centered e-learning for medtech and cultural organizations.',
    images: [
      {
        url: 'https://vs-code-port1.vercel.app/images/Instructional_Design_illustration.jpg',
        width: 1200,
        height: 630,
        alt: 'Samuel Opoku - Instructional Designer',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samuel Opoku — Instructional Designer',
    description: 'Instructional designer creating accessible, learner-centered e-learning.',
    images: ['https://vs-code-port1.vercel.app/images/Instructional_Design_illustration.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#0f2744" />
        <link rel="alternate" hrefLang="en" href="https://vs-code-port1.vercel.app?lang=en" />
        <link rel="alternate" hrefLang="de" href="https://vs-code-port1.vercel.app?lang=de" />
        <meta name="geo.region" content="DE-SH" />
      </head>
      <body>{children}</body>
    </html>
  )
}
