'use client'

import { useState, useEffect } from 'react'

export default function DebugPage() {
  const [apiStatus, setApiStatus] = useState<string>('檢查中...')
  const [boardMembers, setBoardMembers] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testAPI = async () => {
      try {
        // 測試健康檢查
        const healthResponse = await fetch('http://localhost:8001/health')
        const healthData = await healthResponse.json()
        console.log('Health check:', healthData)
        
        // 測試智囊團成員 API
        const membersResponse = await fetch('http://localhost:8001/api/board-members')
        const membersData = await membersResponse.json()
        console.log('Board members API:', membersData)
        
        if (membersData.success) {
          setApiStatus('✅ API 連接正常')
          setBoardMembers(membersData.data.data || [])
        } else {
          setApiStatus('❌ API 返回錯誤')
          setError(membersData.message || '未知錯誤')
        }
      } catch (err) {
        console.error('API 測試失敗:', err)
        setApiStatus('❌ API 連接失敗')
        setError(err instanceof Error ? err.message : '未知錯誤')
      }
    }

    testAPI()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API 調試頁面</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API 狀態</h2>
          <p className="text-lg">{apiStatus}</p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600">錯誤: {error}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">智囊團成員 ({boardMembers.length})</h2>
          {boardMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {boardMembers.map((member) => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.nameEn}</p>
                  <p className="text-sm text-gray-500">{member.field}</p>
                  <p className="text-sm mt-2">{member.bio}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">沒有智囊團成員數據</p>
          )}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">API 端點測試</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm">GET /health</span>
              <a 
                href="http://localhost:8001/health" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                測試
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm">GET /api/board-members</span>
              <a 
                href="http://localhost:8001/api/board-members" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                測試
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
