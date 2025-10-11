import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Inter, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Mario Celzo - Software Developer',
    template: '%s | Mario Celzo'
  },
  description: 'Portfolio di Mario Celzo, sviluppatore software appassionato di tecnologia e innovazione. Specializzato in React, Next.js, Python e sviluppo mobile.',
  keywords: ['Mario Celzo', 'Software Developer', 'React', 'Next.js', 'Python', 'Web Development', 'Mobile Development', 'Frontend Developer', 'Università di Salerno'],
  authors: [{ name: 'Mario Celzo' }],
  creator: 'Mario Celzo',
  generator: 'Next.js',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    title: 'Mario Celzo - Software Developer',
    description: 'Portfolio di Mario Celzo, sviluppatore software appassionato di tecnologia e innovazione',
    siteName: 'Mario Celzo Portfolio',
    images: [{
      url: '/images/mario-celzo.jpeg',
      width: 1200,
      height: 630,
      alt: 'Mario Celzo - Software Developer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mario Celzo - Software Developer',
    description: 'Portfolio di Mario Celzo, sviluppatore software appassionato di tecnologia e innovazione',
    images: ['/images/mario-celzo.jpeg'],
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
  icons: {
    icon: '/images/mario-celzo.jpeg',
    shortcut: '/images/mario-celzo.jpeg',
    apple: '/images/mario-celzo.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
