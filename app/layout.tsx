
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Epilogue } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import QueryProvider from '@/components/QueryProvider'

const epilogue = Epilogue({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Veterinary',
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
        <QueryProvider>
          <Sidebar />
          <div className='ml-[258px] flex flex-1'>
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
