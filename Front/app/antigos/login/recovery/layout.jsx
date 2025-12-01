import { Inter } from 'next/font/google'
import '../login.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Recuperar senha - You!',
}

export default function RootLayout({ children }) {
  return (
    <section>
      {children}
    </section>
  )
}
