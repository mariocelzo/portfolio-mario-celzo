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
  // La favicon viene gestita automaticamente dal file app/icon.png
  // Next.js genera automaticamente tutte le varianti necessarie (favicon.ico, apple-touch-icon, etc.)
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Structured Data (JSON-LD) per migliorare la SEO
  // Descrive il profilo professionale di Mario Celzo per i motori di ricerca
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mario Celzo",
    "jobTitle": "Software Developer",
    "description": "Software Developer specializzato in React, Next.js, Python e sviluppo mobile. Laureando in Informatica presso l'Università di Salerno.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "image": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/images/mario-celzo.jpeg`,
    "email": "mariocelzo003@gmail.com",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Università degli Studi di Salerno",
      "url": "https://www.unisa.it"
    },
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Java",
      "Mobile Development",
      "Web Development",
      "Software Engineering"
    ],
    "sameAs": [
      "https://github.com/mariocelzo",
      "https://www.linkedin.com/in/mario-celzo-40917a2b9/"
    ]
  }

  return (
    <html lang="it" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <head>
        {/* Structured Data JSON-LD per SEO - Aiuta Google a comprendere meglio il contenuto */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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
