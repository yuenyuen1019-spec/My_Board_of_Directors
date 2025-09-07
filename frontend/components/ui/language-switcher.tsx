'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const { language, changeLanguage, languages } = useTranslation()

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-400" />
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value as any)}
        className="bg-transparent border-none text-sm text-gray-600 focus:outline-none cursor-pointer hover:text-gray-900 transition-colors"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}
