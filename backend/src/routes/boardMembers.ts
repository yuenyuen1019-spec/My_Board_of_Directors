import express from 'express';
import { prisma } from '../utils/database';
import { logger } from '../utils/logger';

const router = express.Router();

// 獲取所有智囊團成員
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, field, search } = req.query;
    
    const where: any = {
      isActive: true,
    };
    
    if (field) {
      where.field = field;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { nameEn: { contains: search as string } },
        { nameZh: { contains: search as string } },
        { field: { contains: search as string } },
      ];
    }
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const [members, total] = await Promise.all([
      prisma.boardMember.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { name: 'asc' },
      }),
      prisma.boardMember.count({ where }),
    ]);
    
    res.json({
      success: true,
      data: {
        data: members,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
          hasNext: skip + Number(limit) < total,
          hasPrev: Number(page) > 1,
        },
      },
    });
  } catch (error) {
    logger.error('Failed to fetch board members:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch board members',
    });
  }
});

// 獲取特定智囊團成員詳情
router.get('/:id', async (req, res) => {
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
    logger.error('Failed to fetch board member:', error);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch board member',
    });
  }
});

// 創建新的智囊團成員（管理員功能）
router.post('/', async (req, res) => {
  try {
    const memberData = req.body;
    
    const member = await prisma.boardMember.create({
      data: memberData,
    });
    
    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    logger.error('Failed to create board member:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to create board member',
    });
  }
});

export default router;
