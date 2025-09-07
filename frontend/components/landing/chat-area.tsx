'use client'

import { Button } from '@/components/ui/button'
import { MessageSquare, Send } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from 'react'

interface BoardMember {
  id: string
  name: string
  nameEn: string
  nameZh: string
  birthYear: number
  deathYear: number | null
  nationality: string
  field: string
  bio: string
  philosophy: string
  famousQuotes: string
  isActive: boolean
}

export function ChatArea() {
  const { t } = useTranslation()
  const [message, setMessage] = useState('')
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 獲取智囊團成員資料
  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8001/api/board-members')
        const data = await response.json()
        
        console.log('API Response:', data) // 添加調試日誌
        if (data.success) {
          setBoardMembers(data.data.data || [])
        } else {
          setError('獲取智囊團成員失敗')
        }
      } catch (err) {
        console.error('Failed to fetch board members:', err)
        setError('無法連接到後端服務')
        console.log('Error details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBoardMembers()
  }, [])

  const handleSendMessage = () => {
    if (message.trim()) {
      // 這裡可以添加發送消息的邏輯
      console.log('發送消息:', message)
      setMessage('')
    }
  }

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

        {/* 對話框區域 */}
        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">智囊團助手</h3>
              <p className="text-sm text-gray-500">準備為你提供專業建議</p>
            </div>
          </div>
          
          {/* 消息輸入框 */}
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="輸入你的問題..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 智囊團成員展示 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loading ? (
            // 載入中狀態
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))
          ) : error ? (
            // 錯誤狀態
            <div className="col-span-full text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                size="sm"
              >
                重新載入
              </Button>
            </div>
          ) : boardMembers.length > 0 ? (
            // 顯示智囊團成員
            boardMembers.map((member) => (
              <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-sm">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 text-sm">{member.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{member.field}</p>
              </div>
            ))
          ) : (
            // 沒有成員
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">暫無智囊團成員</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
