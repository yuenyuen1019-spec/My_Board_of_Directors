'use client'

import { MessageSquare, Users, Zap } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 主標題 */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('app.title')}
          </h1>
          
          {/* 副標題 */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            {t('app.subtitle')}
          </p>
          
          {/* 主要按鈕區域已移除，按鈕已移至側邊欄 */}

          {/* 功能特色 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">智能對話</h3>
              <p className="text-gray-600">與歷史偉人進行深度對話，獲得專業見解</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">項目管理</h3>
              <p className="text-gray-600">按項目組織對話，保持思路清晰</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">個性化</h3>
              <p className="text-gray-600">選擇你的智囊團成員，定制專屬體驗</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}