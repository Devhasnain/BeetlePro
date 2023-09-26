import './globals.css'
import type { Metadata } from 'next'
import { Poppins,Inter } from 'next/font/google'
  const Poppin = Poppins({ variable: '--font-poppin',subsets: ['latin'],weight:['500','600','700','400'] })
  const Inters = Inter({ variable: '--font-inter',subsets: ['latin'],weight:['500','600','700','400'] })
import {ContextProvider} from '../ThemeContext'
export const metadata: Metadata = {
  title: 'Line Check',
  description: 'This is Linecheck',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={Poppin.className}>
        <ContextProvider>
        {children}
        </ContextProvider>
        </body>
    </html>
  )
}
