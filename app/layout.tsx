
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Epilogue } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import { Suspense } from 'react'
import Loading from '@/components/Loading'

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

        <Sidebar />
        <Suspense fallback={<Loading />}>
          <div className='ml-[258px] flex flex-1'>
            {children}
          </div>
        </Suspense>


      </body>
    </html>
  )
}
