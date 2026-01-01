import './globals.css'

export const metadata = {
  metadataBase: new URL('https://vs-code-port1.vercel.app'),
  title: 'Samuel Afriyie Opoku — Digital Learning Designer',
  description: 'Transforming complex concepts into engaging, high-impact digital learning experiences. Expert in e-learning development, instructional design, and technical writing.',
  keywords: ['Digital Learning Designer', 'Instructional Designer', 'E-Learning Developer', 'Technical Writer', 'ADDIE', 'Articulate Storyline', 'Samuel Afriyie Opoku', 'Marburg', 'Germany'],
  authors: [{ name: 'Samuel Afriyie Opoku' }],
  creator: 'Samuel Afriyie Opoku',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vs-code-port1.vercel.app',
    siteName: 'Samuel Afriyie Opoku Portfolio',
    title: 'Samuel Afriyie Opoku — Digital Learning Designer',
    description: 'Transforming complex concepts into engaging, high-impact digital learning experiences.',
    images: [
      {
        url: '/images/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Samuel Afriyie Opoku - Digital Learning Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samuel Afriyie Opoku — Digital Learning Designer',
    description: 'Transforming complex concepts into engaging, high-impact digital learning experiences.',
    images: ['/images/profile.jpg'],
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/profile.jpg" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body>{children}</body>
    </html>
  )
}
