import '@/app/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'

import Topbar from '@/components/shared/Topbar'
import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import {dark} from "@clerk/themes";

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Threads app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body>
          <Topbar/>
          <main className='flex'>
            <LeftSidebar/>
            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                {children}
              </div>
            </section>
            <RightSidebar/>
          </main>
          <Bottombar/>
        </body>
      </html>
    </ClerkProvider>
  )
}
