'use client'

import FullChat from '@/components/chat/FullChat'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頂部導航欄 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回首頁</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              智囊團對話
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* 主聊天界面 */}
      <main className="h-[calc(100vh-64px)]">
        <FullChat className="h-full" />
      </main>
    </div>
  )
}