import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { prisma } from './utils/database';

// 載入環境變量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 中間件設置
app.use(helmet());
app.use(cors({
  origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 健康檢查
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// 獲取所有智囊團成員
app.get('/api/board-members', async (req, res) => {
  try {
    const members = await prisma.boardMember.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
    
    res.json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.error('Failed to fetch board members:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch board members',
    });
  }
});

// 獲取特定智囊團成員
app.get('/api/board-members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const member = await prisma.boardMember.findUnique({
      where: { id },
    });
    
    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'BOARD_MEMBER_NOT_FOUND',
        message: 'Board member not found',
      });
    }
    
    return res.json({
      success: true,
      data: member,
    });
  } catch (error) {
    console.error('Failed to fetch board member:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch board member',
    });
  }
});

// 獲取用戶的智囊團
app.get('/api/user-board', async (req, res) => {
  try {
    const userId = 'test-user-id'; // 模擬用戶ID
    
    const userBoards = await prisma.userBoard.findMany({
      where: { userId },
      include: { member: true },
      orderBy: { position: 'asc' },
    });
    
    res.json({
      success: true,
      data: userBoards,
    });
  } catch (error) {
    console.error('Failed to fetch user board:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch user board',
    });
  }
});

// 添加成員到智囊團
app.post('/api/user-board', async (req, res) => {
  try {
    const { memberId } = req.body;
    const userId = 'test-user-id'; // 模擬用戶ID
    
    if (!memberId) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Member ID is required',
      });
    }
    
    // 檢查成員是否存在
    const member = await prisma.boardMember.findUnique({
      where: { id: memberId },
    });
    
    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'BOARD_MEMBER_NOT_FOUND',
        message: 'Board member not found',
      });
    }
    
    // 獲取下一個位置
    const maxPosition = await prisma.userBoard.findFirst({
      where: { userId },
      orderBy: { position: 'desc' },
    });
    
    const nextPosition = (maxPosition?.position || 0) + 1;
    
    // 創建用戶智囊團記錄
    const userBoard = await prisma.userBoard.create({
      data: {
        userId,
        memberId,
        position: nextPosition,
      },
      include: { member: true },
    });
    
    return res.status(201).json({
      success: true,
      data: userBoard,
    });
  } catch (error) {
    console.error('Failed to add member to board:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to add member to board',
    });
  }
});

// 獲取聊天會話
app.get('/api/chat/sessions', async (req, res) => {
  try {
    const userId = 'test-user-id'; // 模擬用戶ID
    
    const sessions = await prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
    
    res.json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    console.error('Failed to fetch chat sessions:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch chat sessions',
    });
  }
});

// 創建聊天會話
app.post('/api/chat/sessions', async (req, res) => {
  try {
    const { title } = req.body;
    const userId = 'test-user-id'; // 模擬用戶ID
    
    const session = await prisma.chatSession.create({
      data: {
        userId,
        title: title || '新會話',
      },
    });
    
    res.status(201).json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error('Failed to create chat session:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to create chat session',
    });
  }
});

// 發送訊息
app.post('/api/chat/sessions/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Message content is required',
      });
    }
    
    // 創建用戶訊息
    const userMessage = await prisma.chatMessage.create({
      data: {
        sessionId: id,
        role: 'USER',
        content,
      },
    });
    
    // 獲取智囊團成員
    const userBoards = await prisma.userBoard.findMany({
      where: { userId: 'test-user-id' },
      include: { member: true },
    });
    
    if (userBoards.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'NO_BOARD_MEMBERS',
        message: 'No board members available',
      });
    }
    
    // 模擬AI回應
    const mockResponse = `作為智囊團成員，我理解你的問題：「${content}」。這是一個很好的問題，讓我從我的專業角度來分析...`;
    
    // 創建AI回應訊息
    const assistantMessage = await prisma.chatMessage.create({
      data: {
        sessionId: id,
        role: 'ASSISTANT',
        content: mockResponse,
        memberId: userBoards[0].memberId,
      },
    });
    
    // 更新會話時間
    await prisma.chatSession.update({
      where: { id },
      data: { updatedAt: new Date() },
    });
    
    return res.json({
      success: true,
      data: {
        userMessage,
        assistantMessage,
      },
    });
  } catch (error) {
    console.error('Failed to send message:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to send message',
    });
  }
});

// 404 處理
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
  });
});

// 啟動服務器
async function startServer() {
  try {
    // 連接資料庫
    await prisma.$connect();
    console.log('Database connected successfully');

    // 啟動服務器
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
