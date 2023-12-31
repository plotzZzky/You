import { Inter } from 'next/font/google'
import '../globals.css'
import './app.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'App - You!',
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
