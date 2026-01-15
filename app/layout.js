import './globals.css'

export const metadata = {
  metadataBase: new URL('https://vs-code-port1.vercel.app'),
  title: 'Samuel Afriyie Opoku — Digital Learning Designer',
  description: 'Digital Learning Designer specializing in corporate e-learning, instructional design, and accessible learning systems. Expert in ADDIE framework, Articulate 360, SCORM, and WCAG 2.1 compliance. Creating learner-centered content that drives skill acquisition and knowledge transfer.',
  keywords: ['Digital Learning Designer', 'Instructional Designer', 'E-Learning Developer', 'Corporate Training', 'ADDIE Framework', 'Articulate 360', 'Articulate Storyline', 'SCORM', 'LMS', 'WCAG Accessibility', 'Learning Experience Design', 'Multimedia Learning', 'Adult Learning', 'Training Development', 'Samuel Afriyie Opoku', 'Marburg', 'Germany'],
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
    description: 'Digital Learning Designer specializing in corporate e-learning, instructional design, and accessible learning systems. Expert in ADDIE framework, Articulate 360, and WCAG 2.1 compliance.',
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
    description: 'Digital Learning Designer specializing in corporate e-learning, instructional design, and accessible learning systems.',
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
        <link rel="icon" href="/images/Instructional_Design_illustration.jpg" />
        <link rel="apple-touch-icon" href="/images/Instructional_Design_illustration.jpg" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body>{children}</body>
    </html>
  )
}
