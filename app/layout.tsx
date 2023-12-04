import type { Metadata } from 'next'
import { Rubik, Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import { Viewport } from 'next';
import './globals.css'

const rubik = Rubik({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const outfit = Outfit({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

/*
<link rel="manifest" href="/manifest.json" />
<link rel="apple-touch-icon" href="/icon.png"></link>
<meta name="theme-color" content="#fff" />
*/

export const viewport: Viewport = {
  themeColor: 'black',
}

export const metadata: Metadata = {
  title: 'The Time',
  description: 'Literally just the time.',
  keywords: 'time, thetime, current time',
  manifest: '/manifest.webmanifest',
  apple: "/icon.png"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mono.className}>{children}</body>
    </html>
  )
}
