'use client'

import { Button } from '@/components/ui/button'
import { Menu, MessageSquare } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import Link from 'next/link'

interface NavigationProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Navigation({ sidebarOpen, setSidebarOpen }: NavigationProps) {
  const { t } = useTranslation()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-start">
          {/* 選單內容左對齊 */}
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              variant="ghost"
              size="sm"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">董</span>
              </div>
              <span className="font-bold text-xl text-gray-900">{t('app.title')}</span>
            </Link>
            
            <div className="flex items-center space-x-4 ml-8">
              <LanguageSwitcher />
              <Link href="/chat">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {t('navigation.chat')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}