import '@/app/globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Authorization',
  description: 'Authorization - Threads app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className='bg-dark-1'>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
