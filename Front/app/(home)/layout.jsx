import { Inter } from 'next/font/google'
import NavBar from '@comps/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inicio - You!',
}

export default function Layout({ children }) {
  return (
    <>
      <NavBar/>

      {children}
      
    </>
  )
}