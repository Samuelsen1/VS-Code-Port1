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
    description: 'Digital Learning Designer creating engaging, accessible e-learning experiences and technical documentation.',
    images: [
      {
        url: 'https://vs-code-port1.vercel.app/images/Instructional_Design_illustration.jpg',
        width: 1200,
        height: 630,
        alt: 'Samuel Afriyie Opoku - Digital Learning Designer',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0" />
        <link rel="icon" href="/images/Instructional_Design_illustration.jpg" />
        <link rel="apple-touch-icon" href="/images/Instructional_Design_illustration.jpg" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body>{children}</body>
    </html>
  )
}
