import express from 'express';
import { prisma } from '../utils/database';
import { logger } from '../utils/logger';

const router = express.Router();

// 獲取用戶的智囊團
router.get('/', async (req, res) => {
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
    logger.error('Failed to fetch user board:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch user board',
    });
  }
});

// 添加成員到智囊團
router.post('/', async (req, res) => {
  try {
    const { memberId, position } = req.body;
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
    
    // 檢查是否已經在智囊團中
    const existingBoard = await prisma.userBoard.findUnique({
      where: {
        userId_memberId: { userId, memberId },
      },
    });
    
    if (existingBoard) {
      return res.status(400).json({
        success: false,
        error: 'BOARD_MEMBER_ALREADY_ADDED',
        message: 'Board member already in your board',
      });
    }
    
    // 獲取下一個位置
    const maxPosition = await prisma.userBoard.findFirst({
      where: { userId },
      orderBy: { position: 'desc' },
    });
    
    const nextPosition = position || (maxPosition?.position || 0) + 1;
    
    // 創建用戶智囊團記錄
    const userBoard = await prisma.userBoard.create({
      data: {
        userId,
        memberId,
        position: nextPosition,
      },
      include: { member: true },
    });
    
    res.status(201).json({
      success: true,
      data: userBoard,
    });
  } catch (error) {
    logger.error('Failed to add member to board:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to add member to board',
    });
  }
});

// 從智囊團移除成員
router.delete('/:memberId', async (req, res) => {
  try {
    const { memberId } = req.params;
    const userId = 'test-user-id'; // 模擬用戶ID
    
    const userBoard = await prisma.userBoard.findUnique({
      where: {
        userId_memberId: { userId, memberId },
      },
    });
    
    if (!userBoard) {
      return res.status(404).json({
        success: false,
        error: 'BOARD_MEMBER_NOT_FOUND',
        message: 'Board member not found in your board',
      });
    }
    
    await prisma.userBoard.delete({
      where: {
        userId_memberId: { userId, memberId },
      },
    });
    
    res.json({
      success: true,
      message: 'Board member removed successfully',
    });
  } catch (error) {
    logger.error('Failed to remove member from board:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to remove member from board',
    });
  }
});

// 更新成員在智囊團中的位置
router.put('/:memberId/position', async (req, res) => {
  try {
    const { memberId } = req.params;
    const { position } = req.body;
    const userId = 'test-user-id'; // 模擬用戶ID
    
    if (position === undefined) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Position is required',
      });
    }
    
    const userBoard = await prisma.userBoard.update({
      where: {
        userId_memberId: { userId, memberId },
      },
      data: { position },
      include: { member: true },
    });
    
    res.json({
      success: true,
      data: userBoard,
    });
  } catch (error) {
    logger.error('Failed to update member position:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to update member position',
    });
  }
});

export default router;
