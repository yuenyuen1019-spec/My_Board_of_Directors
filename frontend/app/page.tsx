'use client'

import { useState } from 'react'
import { LeftSidebar } from '@/components/layout/left-sidebar'
import { HeroSection } from '@/components/landing/hero-section'
import { ChatArea } from '@/components/landing/chat-area'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* 左側導航欄 */}
      <LeftSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* 主要內容 - 根據側邊欄狀態調整寬度 */}
      <main className={`transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'ml-80' : 'ml-16'
      }`}>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Chat Area */}
        <ChatArea />
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}