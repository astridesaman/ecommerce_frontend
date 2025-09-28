import Navbar from './components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import ModalProvider from '../../providers/modal-provider'
import ToastProvider from '../../providers/toast-provider'
import { Footer } from './components'
import { AuthProvider } from './context/AuthContext' 

const urban = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ePacific',
  description: 'Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={urban.className}>
        <ModalProvider />
        <ToastProvider />
        <AuthProvider>   {/* ✅ encapsule ici */}
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
