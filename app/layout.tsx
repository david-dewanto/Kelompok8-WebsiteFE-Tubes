import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Antibiotic Resistance Predictor | AI-Powered Analysis',
  description: 'Predict antibiotic resistance from epitope sequences using advanced machine learning. Get instant insights for 11 different antibiotics.',
  keywords: 'antibiotic resistance, epitope sequence, machine learning, bioinformatics, drug resistance prediction',
  authors: [{ name: 'Antibiotic Resistance Predictor Team' }],
  openGraph: {
    title: 'Antibiotic Resistance Predictor',
    description: 'AI-powered tool for predicting antibiotic resistance from epitope sequences',
    type: 'website',
    locale: 'en_US',
    url: 'https://predictresistantibiotics.site',
    siteName: 'Antibiotic Resistance Predictor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antibiotic Resistance Predictor',
    description: 'AI-powered tool for predicting antibiotic resistance from epitope sequences',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}