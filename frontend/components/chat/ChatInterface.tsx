'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { MessageSquare, Send, Users, Settings } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

// 類型定義
export interface BoardMember {
  id: string
  name: string
  title: string
  description: string
  avatar: string
  expertise: string[]
  personality: string
  communicationStyle: string
}

export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  memberId?: string
  memberName?: string
}

export interface ChatSession {
  id: string
  name: string
  members: string[]
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

// 組件屬性
interface ChatInterfaceProps {
  variant?: 'landing' | 'full' | 'mobile'
  onMessageSend?: (message: string, selectedMembers: string[]) => void
  onSessionCreate?: (session: ChatSession) => void
  onSessionSelect?: (session: ChatSession) => void
  className?: string
}

export default function ChatInterface({
  variant = 'full',
  onMessageSend,
  onSessionCreate,
  onSessionSelect,
  className = ''
}: ChatInterfaceProps) {
  const { t } = useTranslation()
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([])
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [membersLoading, setMembersLoading] = useState(true)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 獲取智囊團成員
  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        setMembersLoading(true)
        const response = await fetch('http://localhost:8001/api/board-members')
        const data = await response.json()
        
        if (data.success) {
          setBoardMembers(data.data.data || [])
        } else {
          console.error('API returned error:', data)
        }
      } catch (error) {
        console.error('Failed to fetch board members:', error)
      } finally {
        setMembersLoading(false)
      }
    }

    fetchBoardMembers()
  }, [])

  // 自動滾動到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 發送消息
  const handleSendMessage = async () => {
    if (!newMessage.trim() || selectedMembers.length === 0) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setLoading(true)

    try {
      // 調用外部處理函數
      if (onMessageSend) {
        const response = await onMessageSend(newMessage, selectedMembers)
        
        // 如果 API 返回了回應，使用真實的回應
        if (response && response.assistantMessage) {
          const aiMessage: ChatMessage = {
            id: response.assistantMessage.id,
            content: response.assistantMessage.content,
            sender: 'ai',
            timestamp: new Date(response.assistantMessage.createdAt),
            memberId: response.assistantMessage.memberId,
            memberName: response.assistantMessage.memberName
          }
          setMessages(prev => [...prev, aiMessage])
        } else {
          // 如果沒有回應，使用模擬回應
          const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: `這是來自智囊團的回應...`,
            sender: 'ai',
            timestamp: new Date(),
            memberId: selectedMembers[0],
            memberName: boardMembers.find(m => m.id === selectedMembers[0])?.name
          }
          setMessages(prev => [...prev, aiMessage])
        }
      } else {
        // 如果沒有外部處理函數，使用模擬回應
        setTimeout(() => {
          const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: `這是來自智囊團的回應...`,
            sender: 'ai',
            timestamp: new Date(),
            memberId: selectedMembers[0],
            memberName: boardMembers.find(m => m.id === selectedMembers[0])?.name
          }
          setMessages(prev => [...prev, aiMessage])
        }, 1000)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Failed to send message:', error)
      setLoading(false)
    }
  }

  // 選擇成員
  const toggleMember = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }

  // 創建新會話
  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: `會話 ${sessions.length + 1}`,
      members: selectedMembers,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setSessions(prev => [...prev, newSession])
    setCurrentSession(newSession)
    setMessages([])
    
    if (onSessionCreate) {
      onSessionCreate(newSession)
    }
  }

  // 選擇會話
  const selectSession = (session: ChatSession) => {
    setCurrentSession(session)
    setMessages(session.messages)
    setSelectedMembers(session.members)
    
    if (onSessionSelect) {
      onSessionSelect(session)
    }
  }

  // 根據變體渲染不同的UI
  const renderVariant = () => {
    switch (variant) {
      case 'landing':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                與智囊團對話
              </h3>
              <p className="text-gray-600">
                選擇你的智囊團成員，開始深度對話
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {boardMembers.slice(0, 4).map(member => (
                  <button
                    key={member.id}
                    onClick={() => toggleMember(member.id)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedMembers.includes(member.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {member.name}
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="輸入你的問題..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || selectedMembers.length === 0}
                  className="px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )

      case 'full':
        return (
          <div className="flex h-full">
            {/* 側邊欄 */}
            <div className="w-80 bg-gray-50 border-r border-gray-200 p-4">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  選擇智囊團成員
                </h2>
                
                {membersLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-2">載入中...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {boardMembers.map(member => (
                      <div key={member.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="checkbox"
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => toggleMember(member.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 會話管理 */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">會話</h3>
                  <Button size="sm" onClick={createNewSession}>
                    新建
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {sessions.map(session => (
                    <button
                      key={session.id}
                      onClick={() => selectSession(session)}
                      className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                        currentSession?.id === session.id
                          ? 'bg-blue-100 text-blue-900'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {session.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 主聊天區域 */}
            <div className="flex-1 flex flex-col">
              {/* 消息列表 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.sender === 'ai' && message.memberName && (
                        <div className="text-xs font-medium mb-1 opacity-75">
                          {message.memberName}
                        </div>
                      )}
                      <p>{message.content}</p>
                      <div className="text-xs opacity-75 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                        <span>智囊團思考中...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* 輸入區域 */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="輸入你的問題..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || selectedMembers.length === 0}
                    className="px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'mobile':
        return (
          <div className="h-full flex flex-col">
            {/* 移動端簡化版本 */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                智囊團對話
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="輸入你的問題..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || selectedMembers.length === 0}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`chat-interface ${className}`}>
      {renderVariant()}
    </div>
  )
}
