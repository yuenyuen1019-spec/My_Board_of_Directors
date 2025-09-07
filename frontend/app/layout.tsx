import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '/public/tailwind.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '我的董事會 - My Board of Directors',
  description: '選擇你的智囊團成員，獲得專業的AI建議',
  keywords: ['AI', '智囊團', '董事會', '顧問', '決策'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
