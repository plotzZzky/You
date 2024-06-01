import { Inter } from 'next/font/google'
import '../app.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Timeline - You!',
}

export default function RootLayout({ children }) {
  return (
    <section>

      <main>
        {children}
      </main>

    </section>
  )
}
