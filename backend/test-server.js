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