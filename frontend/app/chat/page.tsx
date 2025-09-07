'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, MessageSquare, Send, Plus, Folder } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import Link from 'next/link'

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
  famousQuotes: string[]
  isActive: boolean
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

interface ChatSession {
  id: string
  title: string
  createdAt: string
  projectId?: string
}

interface Project {
  id: string
  name: string
  description: string
  color: string
  createdAt: string
  sessions: ChatSession[]
}

export default function ChatPage() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([])
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [showNewProjectForm, setShowNewProjectForm] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDescription, setNewProjectDescription] = useState('')

  // 獲取智囊團成員
  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/board-members')
        const data = await response.json()
        if (data.success) {
          setBoardMembers(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch board members:', error)
      }
    }
    fetchBoardMembers()
  }, [])

  // 初始化項目
  useEffect(() => {
    const initialProjects: Project[] = [
      {
        id: '1',
        name: t('projects.fashionDesign.name'),
        description: t('projects.fashionDesign.description'),
        color: '#3B82F6',
        createdAt: new Date().toISOString(),
        sessions: []
      },
      {
        id: '2',
        name: t('projects.investment.name'),
        description: t('projects.investment.description'),
        color: '#10B981',
        createdAt: new Date().toISOString(),
        sessions: []
      }
    ]
    setProjects(initialProjects)
  }, [t])

  const createSession = async () => {
    if (!newMessage.trim() || selectedMembers.length === 0) return

    const session: ChatSession = {
      id: Date.now().toString(),
      title: newMessage.slice(0, 30) + (newMessage.length > 30 ? '...' : ''),
      createdAt: new Date().toISOString(),
      projectId: currentProject?.id
    }

    setCurrentSession(session)
    setMessages([{
      id: '1',
      role: 'user',
      content: newMessage,
      createdAt: new Date().toISOString()
    }])

    // 模擬AI回應
    setLoading(true)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: '2',
        role: 'assistant',
        content: `作為智囊團成員，我理解你的問題。這是一個很好的問題，讓我從我的專業角度來分析...`,
        createdAt: new Date().toISOString()
      }])
      setLoading(false)
    }, 2000)

    setNewMessage('')
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentSession) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      createdAt: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setLoading(true)

    // 模擬AI回應
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `作為智囊團成員，我理解你的問題。這是一個很好的問題，讓我從我的專業角度來分析...`,
        createdAt: new Date().toISOString()
      }])
      setLoading(false)
    }, 2000)

    setNewMessage('')
  }

  const createProject = () => {
    if (!newProjectName.trim()) return

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      description: newProjectDescription,
      color: '#8B5CF6',
      createdAt: new Date().toISOString(),
      sessions: []
    }

    setProjects(prev => [...prev, newProject])
    setNewProjectName('')
    setNewProjectDescription('')
    setShowNewProjectForm(false)
  }

  const selectProject = (project: Project) => {
    setCurrentProject(project)
    setCurrentSession(null)
    setMessages([])
  }

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
              <span className="font-semibold text-lg text-gray-900">{t('app.title')}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {currentProject && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentProject.color }}></div>
                <span className="text-sm text-gray-600 font-medium">{currentProject.name}</span>
              </div>
            )}
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
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">{t('sidebar.projects')}</h3>
                  <Button onClick={() => setShowNewProjectForm(!showNewProjectForm)} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {showNewProjectForm && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      placeholder={t('sidebar.projectName')}
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      className="w-full mb-2 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder={t('sidebar.projectDescription')}
                      value={newProjectDescription}
                      onChange={(e) => setNewProjectDescription(e.target.value)}
                      className="w-full mb-3 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex space-x-2">
                      <Button onClick={createProject} size="sm" className="flex-1">
                        {t('sidebar.createProject')}
                      </Button>
                      <Button onClick={() => setShowNewProjectForm(false)} variant="outline" size="sm">
                        {t('sidebar.cancel')}
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => selectProject(project)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        currentProject?.id === project.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }}></div>
                        <span className="text-sm font-medium text-gray-900">{project.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 flex justify-center">
          <div className="h-[calc(100vh-4rem)] flex max-w-7xl w-full">
            {/* Member Selection */}
            <div className="w-80 bg-white border-r border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('chat.selectMembers')}</h3>
              <div className="space-y-3">
                {boardMembers.map(member => (
                  <div key={member.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      id={member.id}
                      checked={selectedMembers.includes(member.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMembers(prev => [...prev, member.id])
                        } else {
                          setSelectedMembers(prev => prev.filter(id => id !== member.id))
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={member.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.field}</div>
                    </label>
                  </div>
                ))}
              </div>
              
              {selectedMembers.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">{t('chat.selectedMembers')}</h4>
                  <div className="text-sm text-blue-700">
                    {selectedMembers.length} 位成員已選擇
                  </div>
                </div>
              )}
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 bg-white flex flex-col">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentProject ? `${currentProject.name} - ${t('navigation.chat')}` : t('navigation.chat')}
                  </h3>
                  {currentSession && (
                    <p className="text-sm text-gray-500 mt-1">{currentSession.title}</p>
                  )}
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{t('chat.startChat')}</h3>
                      <p className="text-gray-500">{t('chat.selectMembersFirst')}</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                        <p className="text-sm">{t('chat.thinking')}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder={t('chat.inputPlaceholder')}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          if (!currentSession) {
                            createSession()
                          } else {
                            sendMessage()
                          }
                        }
                      }}
                      disabled={loading}
                      className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button 
                      onClick={!currentSession ? createSession : sendMessage}
                      disabled={loading || !newMessage.trim() || selectedMembers.length === 0}
                      className="px-6"
                    >
                      {!currentSession ? t('chat.startConversation') : t('chat.send')}
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