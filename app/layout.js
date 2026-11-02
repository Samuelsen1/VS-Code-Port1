import './globals.css'
import Providers from './components/Providers'

export const metadata = {
  metadataBase: new URL('https://vs-code-port1.vercel.app'),
  title: 'Samuel Opoku | Digital Learning Designer',
  description: 'Digital Learning Designer creating instructional design, learning media, knowledge systems, and clear communication for medtech, museums, and modern workplaces.',
  keywords: ['Digital Learning Designer', 'Instructional Designer', 'E-Learning', 'Microlearning', 'Articulate', 'Samuel Opoku', 'Lübeck', 'Germany'],
  authors: [{ name: 'Samuel Opoku' }],
  creator: 'Samuel Opoku',
  alternates: {
    canonical: 'https://vs-code-port1.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vs-code-port1.vercel.app',
    siteName: 'Samuel Opoku Portfolio',
    title: 'Samuel Opoku | Digital Learning Designer',
    description: 'Instructional design, learning media, and clear communication for medtech, museums, and modern workplaces.',
    images: [
      {
        url: 'https://vs-code-port1.vercel.app/images/proj-ai-literacy.jpg',
        width: 1200,
        height: 900,
        alt: 'Samuel Opoku - Digital Learning Designer',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samuel Opoku | Digital Learning Designer',
    description: 'Instructional design, learning media, and clear communication for medtech, museums, and modern workplaces.',
    images: ['https://vs-code-port1.vercel.app/images/proj-ai-literacy.jpg'],
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
        <meta name="theme-color" content="#0f4c81" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="alternate" hrefLang="en" href="https://vs-code-port1.vercel.app" />
        <link rel="alternate" hrefLang="de" href="https://vs-code-port1.vercel.app" />
        <meta name="geo.region" content="DE-SH" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
