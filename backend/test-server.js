const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8001;

// 中間件
app.use(cors());
app.use(express.json());

// 模擬智囊團成員資料
const mockBoardMembers = [
  {
    id: '1',
    name: '史蒂夫·賈伯斯',
    nameEn: 'Steve Jobs',
    nameZh: '史蒂夫·賈伯斯',
    birthYear: 1955,
    deathYear: 2011,
    nationality: '美國',
    field: '科技創新',
    bio: '蘋果公司聯合創始人，革命性的產品設計師',
    philosophy: '設計不僅是外觀，更是功能',
    famousQuotes: 'Stay hungry, stay foolish',
    isActive: true
  },
  {
    id: '2',
    name: '華倫·巴菲特',
    nameEn: 'Warren Buffett',
    nameZh: '華倫·巴菲特',
    birthYear: 1930,
    deathYear: null,
    nationality: '美國',
    field: '投資理財',
    bio: '股神，價值投資大師',
    philosophy: '長期投資，價值為本',
    famousQuotes: 'Be fearful when others are greedy',
    isActive: true
  }
];

// API 路由
app.get('/api/board-members', (req, res) => {
  res.json({
    success: true,
    data: {
      data: mockBoardMembers,
      pagination: {
        page: 1,
        limit: 10,
        total: mockBoardMembers.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    },
  });
});

// 更智能的 Mock AI 回應生成
function generateMockResponse(question, memberName, field, language = 'zh-TW') {
  const lowerQuestion = question.toLowerCase();
  
  // 根據問題類型生成更個性化的回應
  if (lowerQuestion.includes('如何') || lowerQuestion.includes('怎麼') || lowerQuestion.includes('how')) {
    return generateHowToResponse(memberName, field, language);
  } else if (lowerQuestion.includes('什麼') || lowerQuestion.includes('什麼是') || lowerQuestion.includes('what')) {
    return generateWhatResponse(memberName, field, language);
  } else if (lowerQuestion.includes('為什麼') || lowerQuestion.includes('why')) {
    return generateWhyResponse(memberName, field, language);
  } else if (lowerQuestion.includes('建議') || lowerQuestion.includes('advice')) {
    return generateAdviceResponse(memberName, field, language);
  } else {
    return generateGeneralResponse(memberName, field, language);
  }
}

function generateHowToResponse(memberName, field, language) {
  const responses = {
    'zh-TW': [
      `作為${memberName}，我認為在${field}領域，成功需要專注於核心原則。首先，要明確你的目標和價值觀。其次，建立一個清晰的執行計劃。最後，保持持續的學習和改進。記住，偉大的成就往往來自於對細節的關注和對長期目標的堅持。`,
      `從我的經驗來看，在${field}中取得成功需要三個關鍵要素：創新思維、執行力和團隊合作。創新思維幫助你找到新的解決方案，執行力確保想法能夠實現，而團隊合作則讓你能夠發揮集體智慧的力量。`,
      `我建議採用系統性的方法來解決這個問題。首先分析現狀，識別關鍵挑戰，然後制定分階段的解決方案。在${field}領域，我發現最有效的方法是將複雜問題分解為可管理的小步驟。`
    ]
  };
  return responses['zh-TW'][Math.floor(Math.random() * responses['zh-TW'].length)];
}

function generateWhatResponse(memberName, field, language) {
  const responses = {
    'zh-TW': [
      `在${field}領域，我認為最重要的是理解本質。這不僅僅是表面的知識，而是深層的理解和洞察。作為${memberName}，我發現真正的智慧來自於對基本原理的掌握和對變化的適應能力。`,
      `從我的角度來看，${field}的核心在於平衡創新與實用性。我們需要保持對新技術和新方法的開放態度，同時確保我們的解決方案能夠真正解決實際問題。`,
      `我認為${field}的關鍵在於持續學習和適應。世界在不斷變化，我們必須保持好奇心，不斷探索新的可能性，同時保持對核心價值的堅持。`
    ]
  };
  return responses['zh-TW'][Math.floor(Math.random() * responses['zh-TW'].length)];
}

function generateWhyResponse(memberName, field, language) {
  const responses = {
    'zh-TW': [
      `這個問題觸及了${field}的根本。作為${memberName}，我認為原因在於我們對本質的理解不夠深入。真正的成功來自於對基本原理的掌握，而不是表面的技巧。`,
      `從我的經驗來看，這背後的原因是多方面的。首先，我們需要理解市場的需求和變化。其次，我們必須保持對質量的堅持。最後，我們需要建立可持續的發展模式。`,
      `我認為這反映了我們在${field}中面臨的挑戰。成功需要的不僅僅是技術能力，還需要對人性的理解、對市場的洞察，以及對未來的遠見。`
    ]
  };
  return responses['zh-TW'][Math.floor(Math.random() * responses['zh-TW'].length)];
}

function generateAdviceResponse(memberName, field, language) {
  const responses = {
    'zh-TW': [
      `作為${memberName}，我的建議是：保持專注，堅持你的核心價值觀。在${field}領域，我發現最成功的人都是那些能夠在變化中保持不變的人。他們知道什麼是重要的，什麼是暫時的。`,
      `我建議你採用漸進式的方法。不要試圖一次性解決所有問題，而是專注於最重要的幾個方面。在${field}中，我發現持續的小改進往往比大的變革更有效。`,
      `我的建議是建立一個支持系統。無論是在${field}還是生活中，我們都需要他人的幫助和指導。找到那些能夠挑戰你、支持你的人，他們將成為你成功路上的重要夥伴。`
    ]
  };
  return responses['zh-TW'][Math.floor(Math.random() * responses['zh-TW'].length)];
}

function generateGeneralResponse(memberName, field, language) {
  const responses = {
    'zh-TW': [
      `作為${memberName}，我認為這是一個很好的問題。在${field}領域，我們經常面臨類似的挑戰。關鍵是要保持開放的心態，同時堅持我們的核心原則。`,
      `從我的經驗來看，這個問題反映了${field}中的一個重要趨勢。我們需要適應變化，但也要保持對本質的理解。成功往往來自於在變與不變之間找到平衡。`,
      `我認為這是一個值得深入思考的問題。在${field}中，我們需要不斷學習和成長，同時保持對質量的堅持。記住，真正的成功不是一蹴而就的，而是需要持續的努力和改進。`
    ]
  };
  return responses['zh-TW'][Math.floor(Math.random() * responses['zh-TW'].length)];
}

// 聊天消息端點
app.post('/api/chat/message', (req, res) => {
  try {
    const { message, memberIds, sessionId } = req.body;
    
    if (!message || !memberIds || memberIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: '消息和智囊團成員ID是必需的'
      });
    }

    // 模擬處理時間
    setTimeout(() => {
      // 選擇第一個成員作為回應者
      const selectedMember = mockBoardMembers.find(member => memberIds.includes(member.id));
      
      if (!selectedMember) {
        return res.status(400).json({
          success: false,
          message: '找不到指定的智囊團成員'
        });
      }

      // 生成 Mock AI 回應
      const aiResponse = generateMockResponse(
        message, 
        selectedMember.name, 
        selectedMember.field, 
        'zh-TW'
      );

      // 返回回應
      res.json({
        success: true,
        data: {
          userMessage: {
            id: Date.now().toString(),
            role: 'USER',
            content: message,
            createdAt: new Date().toISOString()
          },
          assistantMessage: {
            id: (Date.now() + 1).toString(),
            role: 'ASSISTANT',
            content: aiResponse,
            memberId: selectedMember.id,
            memberName: selectedMember.name,
            createdAt: new Date().toISOString()
          },
          sessionId: sessionId || 'default-session'
        }
      });
    }, 1000 + Math.random() * 2000); // 模擬 1-3 秒的處理時間

  } catch (error) {
    console.error('Chat message error:', error);
    res.status(500).json({
      success: false,
      message: '處理消息時發生錯誤'
    });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: 'development',
  });
});

// 啟動服務器
app.listen(PORT, () => {
  console.log(`🚀 測試服務器運行在端口 ${PORT}`);
  console.log(`📡 API端點: http://localhost:${PORT}/api/board-members`);
});