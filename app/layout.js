import './globals.css'

export const metadata = {
  metadataBase: new URL('https://vs-code-port1.vercel.app'),
  title: 'Samuel Afriyie Opoku — Digital Learning Designer',
  description: 'Digital Learning Designer creating engaging, accessible e-learning experiences and technical documentation. Specialized in instructional design, WCAG compliance, and multimedia content development.',
  keywords: ['Digital Learning Designer', 'Instructional Designer', 'E-Learning Developer', 'Technical Writing', 'WCAG', 'Accessibility', 'ADDIE', 'Articulate Storyline', 'Samuel Afriyie Opoku', 'Lübeck', 'Germany'],
  authors: [{ name: 'Samuel Afriyie Opoku' }],
  creator: 'Samuel Afriyie Opoku',
  alternates: {
    canonical: 'https://vs-code-port1.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vs-code-port1.vercel.app',
    siteName: 'Samuel Afriyie Opoku Portfolio',
    title: 'Samuel Afriyie Opoku — Digital Learning Designer',
    description: 'Digital Learning Designer creating engaging, accessible e-learning experiences and technical documentation. Specialized in instructional design, WCAG compliance, and multimedia content development.',
    images: [
      {
        url: 'https://vs-code-port1.vercel.app/images/Instructional_Design_illustration.jpg',
        width: 1200,
        height: 630,
        alt: 'Samuel Afriyie Opoku - Digital Learning Designer',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samuel Afriyie Opoku — Digital Learning Designer',
    description: 'Digital Learning Designer creating engaging, accessible e-learning experiences and technical documentation.',
    images: ['https://vs-code-port1.vercel.app/images/Instructional_Design_illustration.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Set verification.google to your real code when you have it, or remove this block.
  // verification: { google: 'your-google-verification-code' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#1e3a8a" />
        {/* Additional meta tags for LinkedIn and social sharing */}
        <meta property="og:image:secure_url" content="https://vs-code-port1.vercel.app/images/Instructional_Design_illustration.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="alternate" hrefLang="en" href="https://vs-code-port1.vercel.app?lang=en" />
        <link rel="alternate" hrefLang="de" href="https://vs-code-port1.vercel.app?lang=de" />
        <meta name="geo.region" content="DE-SH" />
      </head>
      <body>{children}</body>
    </html>
  )
}
