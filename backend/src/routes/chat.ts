import express from 'express';
import { prisma } from '../utils/database';
import { logger } from '../utils/logger';
// import { getAIServiceManager } from '../services/ai/manager';

const router = express.Router();

// 獲取用戶的聊天會話列表
router.get('/sessions', async (req, res) => {
  try {
    // 暫時使用模擬用戶ID，實際應用中應該從認證中間件獲取
    const userId = 'test-user-id';
    
    const sessions = await prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
    
    res.json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    logger.error('Failed to fetch chat sessions:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch chat sessions',
    });
  }
});

// 創建新的聊天會話
router.post('/sessions', async (req, res) => {
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
    logger.error('Failed to create chat session:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to create chat session',
    });
  }
});

// 獲取會話的訊息
router.get('/sessions/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    
    const messages = await prisma.chatMessage.findMany({
      where: { sessionId: id },
      include: { member: true },
      orderBy: { createdAt: 'asc' },
    });
    
    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    logger.error('Failed to fetch messages:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch messages',
    });
  }
});

// 發送訊息並獲取AI回應
router.post('/sessions/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, memberIds } = req.body;
    
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
    
    // 獲取會話歷史
    const sessionHistory = await prisma.chatMessage.findMany({
      where: { sessionId: id },
      include: { member: true },
      orderBy: { createdAt: 'asc' },
    });
    
    // 獲取智囊團成員
    let boardMembers;
    if (memberIds && memberIds.length > 0) {
      boardMembers = await prisma.boardMember.findMany({
        where: { id: { in: memberIds } },
      });
    } else {
      // 獲取用戶的智囊團成員
      const userBoards = await prisma.userBoard.findMany({
        where: { userId: 'test-user-id' },
        include: { member: true },
      });
      boardMembers = userBoards.map(ub => ub.member);
    }
    
    if (boardMembers.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'NO_BOARD_MEMBERS',
        message: 'No board members available',
      });
    }
    
    // 暫時使用模擬AI回應
    const mockResponse = `作為智囊團成員，我理解你的問題：「${content}」。這是一個很好的問題，讓我從我的專業角度來分析...`;
    
    // 創建AI回應訊息
    const assistantMessage = await prisma.chatMessage.create({
      data: {
        sessionId: id,
        role: 'ASSISTANT',
        content: mockResponse,
        memberId: boardMembers[0]?.id || 'unknown',
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
    logger.error('Failed to send message:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to send message',
    });
  }
});

export default router;
