import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { twMerge } from 'tailwind-merge'
import Header from '@/components/Header'
import { SupabaseProvider } from '@/providers/SupabaseProvider'
import { UserProvider } from '@/providers/UserProvider'
import { ToasterProvider } from '@/providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Magic Post',
  description: 'MGP Magic Post',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={twMerge('bg-[#242424]', inter.className)}>
        <ToasterProvider />

        <SupabaseProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
