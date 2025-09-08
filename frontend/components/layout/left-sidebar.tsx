'use client'

import { Button } from '@/components/ui/button'
import { X, Users, MessageSquare, Zap, Globe, Menu } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import Link from 'next/link'
import { useState } from 'react'

interface LeftSidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function LeftSidebar({ isOpen, setIsOpen }: LeftSidebarProps) {
  const { t } = useTranslation()

  return (
    <>
      {/* 左側導航欄 - 持續顯示，有滑動動畫 */}
      <div className={`fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-80 translate-x-0' : 'w-16 -translate-x-0'
      }`}>
        {/* 側邊欄背景 */}
        <div className={`h-full bg-gray-100 border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'bg-white' : 'bg-gray-100'
        }`}>
          
          {/* Logo 和漢堡選單按鈕區域 - 水平對齊 */}
          <div className={`p-4 transition-all duration-300 ease-in-out ${
            isOpen ? 'flex items-center justify-between' : 'flex justify-center'
          }`}>
            {/* Logo - 只在展開時顯示 */}
            {isOpen && (
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">董</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-gray-900 leading-tight">{t('app.title')}</span>
                  <span className="text-xs text-gray-500 leading-tight">My Board of Directors</span>
                </div>
              </Link>
            )}
            
            {/* 漢堡選單按鈕 - 在右邊 */}
            <Button 
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="sm"
              className={`transition-all duration-300 ease-in-out ${
                isOpen 
                  ? 'bg-white shadow-md hover:bg-gray-50' 
                  : 'bg-gray-200 hover:bg-gray-300 w-8 h-8 p-0'
              }`}
            >
              <Menu className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'h-5 w-5' : 'h-4 w-4'
              }`} />
            </Button>
          </div>
          {/* 側邊欄內容 */}
          <div className={`transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <div className="p-6 h-full overflow-y-auto">
              {/* 關閉按鈕 */}
              <div className="flex justify-end mb-6">
                <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* 語言選單 */}
              <div className="mb-8">
                <LanguageSwitcher />
              </div>
              
              {/* 項目列表 */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">項目</h3>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium text-gray-900">時裝設計</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">設計靈感與創意</p>
                  </div>
                  <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-gray-900">投資理財</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">財務規劃與投資</p>
                  </div>
                </div>
              </div>
              
              {/* 主要操作按鈕 */}
              <div className="mb-6">
                <div className="space-y-3">
                  <Link href="/chat" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      開始對話
                    </Button>
                  </Link>
                  <Link href="/projects" className="block">
                    <Button variant="outline" className="w-full">
                      <Zap className="h-4 w-4 mr-2" />
                      管理項目
                    </Button>
                  </Link>
                </div>
              </div>

              {/* 導航連結 */}
              <nav className="space-y-2">
                <Link href="/" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">首頁</span>
                </Link>
                <Link href="/chat" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">智囊團對話</span>
                </Link>
                <Link href="/projects" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">項目管理</span>
                </Link>
                <Link href="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Globe className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">設定</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* 縮小時的垂直導航圖標 */}
          <div className={`transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link href="/" className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Users className="h-5 w-5 text-gray-600" />
              </Link>
              <Link href="/chat" className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <MessageSquare className="h-5 w-5 text-gray-600" />
              </Link>
              <Link href="/projects" className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Zap className="h-5 w-5 text-gray-600" />
              </Link>
              <Link href="/settings" className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Globe className="h-5 w-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
