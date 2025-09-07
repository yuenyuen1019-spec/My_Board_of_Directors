'use client'

import Link from "next/link"
import { useTranslation } from '@/hooks/useTranslation'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">董</span>
              </div>
              <span className="font-bold text-xl">{t('app.title')}</span>
            </div>
            <p className="text-gray-400 text-sm">
              {t('app.description')}
            </p>
          </div>
          
          {/* 產品 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">{t('footer.product')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/chat" className="text-gray-400 hover:text-white transition-colors">{t('navigation.chat')}</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-white transition-colors">{t('navigation.projects')}</Link></li>
              <li><Link href="/settings" className="text-gray-400 hover:text-white transition-colors">{t('navigation.settings')}</Link></li>
            </ul>
          </div>
          
          {/* 支援 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">{t('footer.support')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">{t('footer.helpCenter')}</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">{t('footer.contactUs')}</Link></li>
              <li><Link href="/status" className="text-gray-400 hover:text-white transition-colors">{t('footer.serviceStatus')}</Link></li>
            </ul>
          </div>
          
          {/* 法律 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">{t('footer.termsOfService')}</Link></li>
              <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">{t('footer.cookiePolicy')}</Link></li>
            </ul>
          </div>
        </div>
        
        {/* 版權信息 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 {t('app.title')}. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}