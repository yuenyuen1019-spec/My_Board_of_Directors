'use client'

import ChatInterface, { ChatSession } from './ChatInterface'

interface LandingChatProps {
  className?: string
}

export default function LandingChat({ className = '' }: LandingChatProps) {
  const handleMessageSend = async (message: string, selectedMembers: string[]) => {
    // 首頁版本的消息處理邏輯
    console.log('Landing chat message:', message, selectedMembers)
    
    try {
      // 調用後端API發送消息
      const response = await fetch('http://localhost:8001/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          memberIds: selectedMembers,
          sessionId: 'landing-session'
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // 返回 AI 回應數據
        return data.data
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }

  const handleSessionCreate = (session: ChatSession) => {
    // 首頁版本不需要會話管理
    console.log('Landing session created:', session)
  }

  const handleSessionSelect = (session: ChatSession) => {
    // 首頁版本不需要會話管理
    console.log('Landing session selected:', session)
  }

  return (
    <ChatInterface
      variant="landing"
      onMessageSend={handleMessageSend}
      onSessionCreate={handleSessionCreate}
      onSessionSelect={handleSessionSelect}
      className={className}
    />
  )
}
