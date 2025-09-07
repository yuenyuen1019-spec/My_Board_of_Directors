'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Settings, User, Bell, Shield, Globe, Palette } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import Link from 'next/link'

export default function SettingsPage() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6 max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button onClick={() => setSidebarOpen(!sidebarOpen)} variant="ghost" size="sm">
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">董</span>
              </div>
              <span className="font-semibold text-lg text-gray-900">設定</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/">
              <Button variant="outline" size="sm">返回首頁</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-80 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-6">
              <nav className="space-y-2">
                <Link href="/" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <User className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">首頁</span>
                </Link>
                <Link href="/chat" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">智囊團對話</span>
                </Link>
                <Link href="/projects" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">項目管理</span>
                </Link>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-700 font-medium">設定</span>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 flex justify-center">
          <div className="max-w-4xl w-full">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">設定</h1>
              <p className="text-gray-600">管理你的帳戶設定和偏好</p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
              {/* Profile Settings */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">個人資料</h2>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">用戶名稱</label>
                    <input
                      type="text"
                      defaultValue="用戶"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">電子郵件</label>
                    <input
                      type="email"
                      defaultValue="user@example.com"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">保存更改</Button>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-green-600" />
                    <h2 className="text-lg font-semibold text-gray-900">通知設定</h2>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">推送通知</h3>
                      <p className="text-sm text-gray-500">接收新消息和更新通知</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">郵件通知</h3>
                      <p className="text-sm text-gray-500">接收重要更新到你的郵箱</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Appearance Settings */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Palette className="h-5 w-5 text-purple-600" />
                    <h2 className="text-lg font-semibold text-gray-900">外觀設定</h2>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">深色模式</h3>
                      <p className="text-sm text-gray-500">切換到深色主題</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">語言</label>
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-red-600" />
                    <h2 className="text-lg font-semibold text-gray-900">隱私設定</h2>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">數據收集</h3>
                      <p className="text-sm text-gray-500">允許收集匿名使用數據以改善服務</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      刪除帳戶
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
