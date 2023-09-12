import '@/app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Threads',
  description: 'A Next.js 13 Threads app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-dark-1'>
      <body>
        {children}
      </body>
    </html>
  )
}
