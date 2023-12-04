import type { Metadata } from 'next'
import { Rubik, Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const rubik = Rubik({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const outfit = Outfit({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Time',
  description: 'Literally just the time.',
  keywords: 'time, thetime, current time'
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
