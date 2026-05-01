import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NEXUS — Social Community Platform',
  description: 'Connect. Share. Build communities.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: '#09090f', color: 'white', margin: 0 }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
