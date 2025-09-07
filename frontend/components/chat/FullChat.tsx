'use client'

import ChatInterface, { ChatSession } from './ChatInterface'

interface FullChatProps {
  className?: string
}

export default function FullChat({ className = '' }: FullChatProps) {
  const handleMessageSend = async (message: string, selectedMembers: string[]) => {
    // 完整版本的消息處理邏輯
    console.log('Full chat message:', message, selectedMembers)
    
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
          sessionId: 'current-session' // 實際應該使用當前會話ID
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // 處理AI回應
        console.log('AI response:', data.data)
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
    // 完整版本的會話創建邏輯
    console.log('Full chat session created:', session)
    
    // 這裡可以：
    // - 保存會話到後端
    // - 更新會話列表
    // - 設置當前會話等
  }

  const handleSessionSelect = (session: ChatSession) => {
    // 完整版本的會話選擇邏輯
    console.log('Full chat session selected:', session)
    
    // 這裡可以：
    // - 載入會話歷史
    // - 更新UI狀態
    // - 設置當前會話等
  }

  return (
    <ChatInterface
      variant="full"
      onMessageSend={handleMessageSend}
      onSessionCreate={handleSessionCreate}
      onSessionSelect={handleSessionSelect}
      className={className}
    />
  )
}
