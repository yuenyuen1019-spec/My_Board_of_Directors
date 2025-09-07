const http = require('http');
const url = require('url');

const PORT = 8000;

// 智囊團成員數據
const boardMembers = [
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
    famousQuotes: ['Stay hungry, stay foolish', 'Think different'],
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
    famousQuotes: ['Be fearful when others are greedy', 'Rule No. 1: Never lose money'],
    isActive: true
  }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // 設置 CORS 標頭
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // 處理 OPTIONS 請求
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log(`${method} ${path}`);

  // 路由處理
  if (path === '/health' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'OK',
      timestamp: new Date().toISOString(),
      message: '後端服務器運行正常',
      uptime: process.uptime()
    }));
  }
  else if (path === '/api/board-members' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: boardMembers
    }));
  }
  else if (path === '/api/board-members/1' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: boardMembers[0]
    }));
  }
  else if (path === '/api/board-members/2' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: boardMembers[1]
    }));
  }
  else if (path === '/api/chat/sessions' && method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: {
        id: 'test-session-1',
        title: '測試會話',
        createdAt: new Date().toISOString()
      }
    }));
  }
  else if (path.startsWith('/api/chat/sessions/') && path.endsWith('/messages') && method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: {
        id: 'test-message-1',
        role: 'assistant',
        content: '作為智囊團成員，我理解你的問題。這是一個很好的問題，讓我從我的專業角度來分析...',
        createdAt: new Date().toISOString()
      }
    }));
  }
  else {
    res.writeHead(404);
    res.end(JSON.stringify({
      error: 'Route not found',
      path: path,
      method: method
    }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 簡化服務器運行在 http://localhost:${PORT}`);
  console.log(`📊 健康檢查: http://localhost:${PORT}/health`);
  console.log(`👥 智囊團成員: http://localhost:${PORT}/api/board-members`);
  console.log(`💬 聊天測試: POST http://localhost:${PORT}/api/chat/sessions`);
});

// 優雅關閉
process.on('SIGINT', () => {
  console.log('\n🛑 正在關閉服務器...');
  server.close(() => {
    console.log('✅ 服務器已關閉');
    process.exit(0);
  });
});
