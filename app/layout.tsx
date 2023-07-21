import Sidebar from '@/components/Sidebar'
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Epilogue } from 'next/font/google'

const epilogue = Epilogue({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vet',
  description: 'veterinary system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <Sidebar />
        <div className='ml-[258px] flex flex-1'>
          {children}
        </div>
      </body>
    </html>
  )
}
