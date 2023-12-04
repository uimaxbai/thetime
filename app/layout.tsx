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

<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#2b5797">
<meta name="theme-color" content="#ffffff">
*/

export const viewport: Viewport = {
  themeColor: 'black',
}

export const metadata: Metadata = {
  title: 'The Time',
  description: 'Literally just the time.',
  keywords: 'time, thetime, current time',
  manifest: '/manifest.webmanifest',
  themeColor: "#000000",
  TileColor: "#2b5797"
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
