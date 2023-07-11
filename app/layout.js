import './globals.css'
import { Montserrat } from 'next/font/google'
import Navbar from './components/navbar/Navbar'


const font = Montserrat({ 
  subsets: ["latin"] ,
})

export const metadata = {
  title: 'SkyHigh',
  description: 'TechLabs Düsseldorf Project 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <main className='relative top-[7.5rem]'>
          {children}
        </main>
      </body>
    </html>
  )
}
