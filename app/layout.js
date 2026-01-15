import './globals.css'

export const metadata = {
  metadataBase: new URL('https://vs-code-port1.vercel.app'),
  title: 'Samuel Afriyie Opoku — Technical Writer & Digital Learning Designer',
  description: 'Technical Writer and Digital Learning Designer creating clear, user-centered documentation and engaging e-learning experiences. Expert in API documentation, user guides, knowledge bases, ADDIE framework, and WCAG accessibility.',
  keywords: ['Technical Writer', 'Digital Learning Designer', 'Instructional Designer', 'E-Learning Developer', 'API Documentation', 'User Guides', 'Knowledge Base', 'DITA XML', 'ADDIE', 'Articulate Storyline', 'WCAG', 'Plain Language', 'Samuel Afriyie Opoku', 'Marburg', 'Germany'],
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
    title: 'Samuel Afriyie Opoku — Technical Writer & Digital Learning Designer',
    description: 'Technical Writer and Digital Learning Designer creating clear documentation and engaging e-learning experiences. Expert in API documentation, user guides, ADDIE framework, and WCAG accessibility.',
    images: [
      {
        url: 'https://vs-code-port1.vercel.app/images/Instructional_Design_illustration.jpg',
        width: 1200,
        height: 630,
        alt: 'Samuel Afriyie Opoku - Technical Writer & Digital Learning Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samuel Afriyie Opoku — Technical Writer & Digital Learning Designer',
    description: 'Creating clear, user-centered documentation and engaging e-learning experiences. Expert in API documentation, user guides, and instructional design.',
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
