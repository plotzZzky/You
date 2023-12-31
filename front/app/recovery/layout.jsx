import { Inter } from 'next/font/google'
import '../globals.css'
import './page.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Recuperar senha - You!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
            {children}
        </body>
    </html>
  )
}
