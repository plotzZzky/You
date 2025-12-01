import { Inter } from 'next/font/google'
import './page.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Timeline - You!',
}

export default function Layout({ children }) {
  return (
    <>
      {children}
    </>
  )
}