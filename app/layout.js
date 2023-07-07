import './globals.css'
import { Montserrat } from 'next/font/google'

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
      <body className={font.className}>{children}</body>
    </html>
  )
}
