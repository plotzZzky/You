import { Inter } from 'next/font/google'
import { AuthProvider } from '@comps/authContext'
import Footer from '@comps/footer'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Início - You! ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
        <body className={inter.className}>
          <AuthProvider>

            {children}

            <Footer />
            
          </AuthProvider>  
        </body>
    </html>
  )
}
