import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import { logger } from './utils/logger';
import { connectDatabase } from './utils/database';
// import { connectRedis } from './utils/redis';

// 路由導入
import boardMemberRoutes from './routes/boardMembers';
import chatRoutes from './routes/chat';
import userBoardRoutes from './routes/userBoard';

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
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 速率限制
app.use(rateLimiter);

// 健康檢查
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API 路由
app.use('/api/board-members', boardMemberRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user-board', userBoardRoutes);

// 404 處理
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
  });
});

// 錯誤處理中間件
app.use(errorHandler);

// 啟動服務器
async function startServer() {
  try {
    // 連接資料庫
    await connectDatabase();
    logger.info('Database connected successfully');

    // 連接 Redis (暫時跳過)
    // await connectRedis();
    // logger.info('Redis connected successfully');

    // 啟動服務器
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// 優雅關閉
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer();
