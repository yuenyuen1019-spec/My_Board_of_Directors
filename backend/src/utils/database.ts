import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

// 創建 Prisma 客戶端實例
export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

// 監聽 Prisma 事件
prisma.$on('query', (e) => {
  if (process.env.NODE_ENV === 'development') {
    logger.debug('Query executed', {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`,
    });
  }
});

prisma.$on('error', (e) => {
  logger.error('Prisma error', e);
});

prisma.$on('info', (e) => {
  logger.info('Prisma info', e);
});

prisma.$on('warn', (e) => {
  logger.warn('Prisma warning', e);
});

// 連接資料庫
export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    throw error;
  }
}

// 斷開資料庫連接
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    logger.info('Database disconnected successfully');
  } catch (error) {
    logger.error('Failed to disconnect from database:', error);
    throw error;
  }
}

// 健康檢查
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('Database health check failed:', error);
    return false;
  }
}

// 事務包裝器
export async function withTransaction<T>(
  callback: (tx: any) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(callback);
}

// 分頁查詢輔助函數
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function createPaginationResult<T>(
  data: T[],
  total: number,
  options: PaginationOptions
): PaginationResult<T> {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

// 軟刪除輔助函數
export async function softDelete<T>(
  model: any,
  where: any,
  deletedAt: Date = new Date()
): Promise<T> {
  return await model.update({
    where,
    data: {
      deletedAt,
      isActive: false,
    },
  });
}

// 批量操作輔助函數
export async function batchCreate<T>(
  model: any,
  data: any[]
): Promise<T[]> {
  const results = [];
  const batchSize = 100;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const result = await model.createMany({
      data: batch,
      skipDuplicates: true,
    });
    results.push(result);
  }

  return results;
}

// 導出常用的查詢方法
export const db = {
  // 用戶相關
  user: {
    findById: (id: string) => prisma.user.findUnique({ where: { id } }),
    findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
    findByUsername: (username: string) => prisma.user.findUnique({ where: { username } }),
    create: (data: any) => prisma.user.create({ data }),
    update: (id: string, data: any) => prisma.user.update({ where: { id }, data }),
    delete: (id: string) => prisma.user.delete({ where: { id } }),
  },

  // 智囊團成員相關
  boardMember: {
    findById: (id: string) => prisma.boardMember.findUnique({ where: { id } }),
    findMany: (options?: any) => prisma.boardMember.findMany(options),
    create: (data: any) => prisma.boardMember.create({ data }),
    update: (id: string, data: any) => prisma.boardMember.update({ where: { id }, data }),
    delete: (id: string) => prisma.boardMember.delete({ where: { id } }),
  },

  // 用戶智囊團相關
  userBoard: {
    findByUserId: (userId: string) => 
      prisma.userBoard.findMany({
        where: { userId },
        include: { member: true },
        orderBy: { position: 'asc' },
      }),
    addMember: (data: any) => prisma.userBoard.create({ data }),
    removeMember: (userId: string, memberId: string) =>
      prisma.userBoard.delete({
        where: { userId_memberId: { userId, memberId } },
      }),
    updatePosition: (userId: string, memberId: string, position: number) =>
      prisma.userBoard.update({
        where: { userId_memberId: { userId, memberId } },
        data: { position },
      }),
  },

  // 聊天相關
  chatSession: {
    findById: (id: string) => prisma.chatSession.findUnique({ where: { id } }),
    findByUserId: (userId: string) => 
      prisma.chatSession.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
      }),
    create: (data: any) => prisma.chatSession.create({ data }),
    update: (id: string, data: any) => prisma.chatSession.update({ where: { id }, data }),
    delete: (id: string) => prisma.chatSession.delete({ where: { id } }),
  },

  chatMessage: {
    findBySessionId: (sessionId: string) =>
      prisma.chatMessage.findMany({
        where: { sessionId },
        include: { member: true },
        orderBy: { createdAt: 'asc' },
      }),
    create: (data: any) => prisma.chatMessage.create({ data }),
    delete: (id: string) => prisma.chatMessage.delete({ where: { id } }),
  },
};
