'use client'

import LandingChat from '@/components/chat/LandingChat'

export default function ChatArea() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            與智囊團對話
          </h2>
          <p className="text-lg text-gray-600">
            選擇你的智囊團成員，開始深度對話
          </p>
        </div>

        {/* 使用共享的對話組件 */}
        <LandingChat className="w-full" />
      </div>
    </section>
  )
}