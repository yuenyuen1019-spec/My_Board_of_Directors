'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Plus, Folder, MessageSquare, Calendar, Trash2 } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import Link from 'next/link'

interface Project {
  id: string
  name: string
  description: string
  color: string
  createdAt: string
  sessions: ChatSession[]
}

interface ChatSession {
  id: string
  title: string
  createdAt: string
  projectId?: string
}

export default function ProjectsPage() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [showNewProjectForm, setShowNewProjectForm] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDescription, setNewProjectDescription] = useState('')
  const [selectedColor, setSelectedColor] = useState('#3B82F6')

  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ]

  // 初始化項目
  useEffect(() => {
    const initialProjects: Project[] = [
      {
        id: '1',
        name: t('projects.fashionDesign.name'),
        description: t('projects.fashionDesign.description'),
        color: '#3B82F6',
        createdAt: new Date().toISOString(),
        sessions: [
          {
            id: '1',
            title: '時裝設計趨勢討論',
            createdAt: new Date().toISOString(),
            projectId: '1'
          }
        ]
      },
      {
        id: '2',
        name: t('projects.investment.name'),
        description: t('projects.investment.description'),
        color: '#10B981',
        createdAt: new Date().toISOString(),
        sessions: [
          {
            id: '2',
            title: '投資策略分析',
            createdAt: new Date().toISOString(),
            projectId: '2'
          }
        ]
      }
    ]
    setProjects(initialProjects)
  }, [t])

  const createProject = () => {
    if (!newProjectName.trim()) return

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      description: newProjectDescription,
      color: selectedColor,
      createdAt: new Date().toISOString(),
      sessions: []
    }

    setProjects(prev => [...prev, newProject])
    setNewProjectName('')
    setNewProjectDescription('')
    setShowNewProjectForm(false)
  }

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId))
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
              <span className="font-semibold text-lg text-gray-900">項目管理</span>
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
                  <Folder className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">首頁</span>
                </Link>
                <Link href="/chat" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">智囊團對話</span>
                </Link>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <Folder className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-700 font-medium">項目管理</span>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 flex justify-center">
          <div className="max-w-6xl w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">項目管理</h1>
                <p className="text-gray-600">組織和管理你的智囊團對話項目</p>
              </div>
              <Button 
                onClick={() => setShowNewProjectForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                新建項目
              </Button>
            </div>

            {/* New Project Form */}
            {showNewProjectForm && (
              <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">創建新項目</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">項目名稱</label>
                    <input
                      type="text"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="輸入項目名稱..."
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">項目描述</label>
                    <textarea
                      value={newProjectDescription}
                      onChange={(e) => setNewProjectDescription(e.target.value)}
                      placeholder="輸入項目描述..."
                      rows={3}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">項目顏色</label>
                    <div className="flex space-x-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedColor === color ? 'border-gray-400' : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={createProject} className="bg-blue-600 hover:bg-blue-700">
                      創建項目
                    </Button>
                    <Button onClick={() => setShowNewProjectForm(false)} variant="outline">
                      取消
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: project.color }}
                        ></div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      </div>
                      <Button 
                        onClick={() => deleteProject(project.id)}
                        variant="ghost" 
                        size="sm"
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{project.sessions.length} 個對話</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {project.sessions.slice(0, 3).map((session) => (
                        <div key={session.id} className="p-2 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{session.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(session.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                      {project.sessions.length > 3 && (
                        <p className="text-xs text-gray-500 text-center">
                          還有 {project.sessions.length - 3} 個對話...
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link href={`/chat?project=${project.id}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          開始對話
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-12">
                <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">還沒有項目</h3>
                <p className="text-gray-500 mb-4">創建你的第一個項目來組織智囊團對話</p>
                <Button 
                  onClick={() => setShowNewProjectForm(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  創建項目
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
