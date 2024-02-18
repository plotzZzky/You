import { Inter } from 'next/font/google'
import Footer from '@comps/footer'
import './app.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'App - You!',
}

export default function RootLayout({ children }) {
  return (
    <section>

      <main>
        {children}
      </main>
  
      <Footer></Footer>
    </section>
  )
}
