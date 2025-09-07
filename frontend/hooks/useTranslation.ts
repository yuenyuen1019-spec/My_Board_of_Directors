'use client'

import { useState, useEffect } from 'react'

type Language = 'zh-TW' | 'zh-CN' | 'en'

interface Translations {
  [key: string]: string | Translations
}

const translations: Record<Language, Translations> = {
  'zh-TW': {
    app: {
      title: '我的董事會',
      subtitle: '選擇你的智囊團成員，獲得專業的AI建議',
      description: '與史蒂夫·賈伯斯、華倫·巴菲特等偉大人物對話，獲得他們專業領域的深度見解和建議。'
    },
    navigation: {
      home: '首頁',
      chat: '智囊團對話',
      features: '功能特色',
      pricing: '定價',
      settings: '設定'
    },
    chat: {
      selectMembers: '選擇智囊團成員',
      selectedMembers: '已選擇的成員',
      startConversation: '開始對話',
      send: '發送',
      inputPlaceholder: '輸入你的問題...',
      thinking: '智囊團成員正在思考...',
      noConversation: '請先創建新會話',
      startChat: '開始與智囊團對話吧！',
      selectMembersFirst: '選擇智囊團成員，然後開始你的對話'
    },
    sidebar: {
      search: '搜索項目或對話...',
      projects: '項目',
      recentChats: '最近對話',
      createProject: '創建',
      cancel: '取消',
      projectName: '項目名稱',
      projectDescription: '項目描述'
    },
    projects: {
      fashionDesign: {
        name: '時裝設計',
        description: '關於時裝設計的專業建議'
      },
      investment: {
        name: '投資理財',
        description: '投資和理財相關的討論'
      }
    },
    settings: {
      title: '設定',
      comingSoon: '設定頁面正在開發中，敬請期待！',
      backToHome: '返回首頁'
    },
    boardMembers: {
      steveJobs: {
        name: '史蒂夫·賈伯斯',
        field: '科技創新'
      },
      warrenBuffett: {
        name: '華倫·巴菲特',
        field: '投資理財'
      }
    }
  },
  'zh-CN': {
    app: {
      title: '我的董事会',
      subtitle: '选择你的智囊团成员，获得专业的AI建议',
      description: '与史蒂夫·乔布斯、沃伦·巴菲特等伟大人物对话，获得他们专业领域的深度见解和建议。'
    },
    navigation: {
      home: '首页',
      chat: '智囊团对话',
      features: '功能特色',
      pricing: '定价',
      settings: '设置'
    },
    chat: {
      selectMembers: '选择智囊团成员',
      selectedMembers: '已选择的成员',
      startConversation: '开始对话',
      send: '发送',
      inputPlaceholder: '输入你的问题...',
      thinking: '智囊团成员正在思考...',
      noConversation: '请先创建新会话',
      startChat: '开始与智囊团对话吧！',
      selectMembersFirst: '选择智囊团成员，然后开始你的对话'
    },
    sidebar: {
      search: '搜索项目或对话...',
      projects: '项目',
      recentChats: '最近对话',
      createProject: '创建',
      cancel: '取消',
      projectName: '项目名称',
      projectDescription: '项目描述'
    },
    projects: {
      fashionDesign: {
        name: '时装设计',
        description: '关于时装设计的专业建议'
      },
      investment: {
        name: '投资理财',
        description: '投资和理财相关的讨论'
      }
    },
    settings: {
      title: '设置',
      comingSoon: '设置页面正在开发中，敬请期待！',
      backToHome: '返回首页'
    },
    boardMembers: {
      steveJobs: {
        name: '史蒂夫·乔布斯',
        field: '科技创新'
      },
      warrenBuffett: {
        name: '沃伦·巴菲特',
        field: '投资理财'
      }
    }
  },
  'en': {
    app: {
      title: 'My Board of Directors',
      subtitle: 'Choose your advisory board members and get professional AI advice',
      description: 'Have conversations with great figures like Steve Jobs, Warren Buffett, and get deep insights and advice from their professional fields.'
    },
    navigation: {
      home: 'Home',
      chat: 'Board Chat',
      features: 'Features',
      pricing: 'Pricing',
      settings: 'Settings'
    },
    chat: {
      selectMembers: 'Select Board Members',
      selectedMembers: 'Selected Members',
      startConversation: 'Start Conversation',
      send: 'Send',
      inputPlaceholder: 'Enter your question...',
      thinking: 'Board members are thinking...',
      noConversation: 'Please create a new conversation first',
      startChat: 'Start chatting with your board!',
      selectMembersFirst: 'Select board members and start your conversation'
    },
    sidebar: {
      search: 'Search projects or conversations...',
      projects: 'Projects',
      recentChats: 'Recent Conversations',
      createProject: 'Create',
      cancel: 'Cancel',
      projectName: 'Project Name',
      projectDescription: 'Project Description'
    },
    projects: {
      fashionDesign: {
        name: 'Fashion Design',
        description: 'Professional advice on fashion design'
      },
      investment: {
        name: 'Investment & Finance',
        description: 'Discussions about investment and finance'
      }
    },
    settings: {
      title: 'Settings',
      comingSoon: 'Settings page is under development, stay tuned!',
      backToHome: 'Back to Home'
    },
    boardMembers: {
      steveJobs: {
        name: 'Steve Jobs',
        field: 'Technology Innovation'
      },
      warrenBuffett: {
        name: 'Warren Buffett',
        field: 'Investment & Finance'
      }
    }
  }
}

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('zh-TW')

  useEffect(() => {
    // 從 localStorage 讀取語言設置
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    } else {
      // 根據瀏覽器語言自動選擇
      const browserLanguage = navigator.language
      if (browserLanguage.startsWith('zh-CN')) {
        setLanguage('zh-CN')
      } else if (browserLanguage.startsWith('zh')) {
        setLanguage('zh-TW')
      } else {
        setLanguage('en')
      }
    }
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // 如果找不到翻譯，回退到繁體中文
        value = translations['zh-TW']
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // 如果還是找不到，返回原始 key
          }
        }
        break
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return {
    t,
    language,
    changeLanguage,
    languages: [
      { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
      { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
    ] as const
  }
}
