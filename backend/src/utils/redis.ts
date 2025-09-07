import { createClient, RedisClientType } from 'redis';
import { logger } from './logger';

let redisClient: RedisClientType | null = null;

// 創建 Redis 客戶端
export function createRedisClient(): RedisClientType {
  const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > 10) {
          logger.error('Redis connection failed after 10 retries');
          return new Error('Redis connection failed');
        }
        return Math.min(retries * 100, 3000);
      },
    },
  });

  client.on('error', (err) => {
    logger.error('Redis client error:', err);
  });

  client.on('connect', () => {
    logger.info('Redis client connected');
  });

  client.on('ready', () => {
    logger.info('Redis client ready');
  });

  client.on('end', () => {
    logger.info('Redis client disconnected');
  });

  return client;
}

// 連接 Redis
export async function connectRedis(): Promise<void> {
  try {
    if (!redisClient) {
      redisClient = createRedisClient();
    }
    
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    
    logger.info('Redis connected successfully');
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    throw error;
  }
}

// 斷開 Redis 連接
export async function disconnectRedis(): Promise<void> {
  try {
    if (redisClient && redisClient.isOpen) {
      await redisClient.disconnect();
    }
    logger.info('Redis disconnected successfully');
  } catch (error) {
    logger.error('Failed to disconnect from Redis:', error);
    throw error;
  }
}

// 獲取 Redis 客戶端
export function getRedisClient(): RedisClientType {
  if (!redisClient) {
    redisClient = createRedisClient();
  }
  return redisClient;
}

// 快取操作輔助函數
export class CacheService {
  private client: RedisClientType;
  private defaultTTL: number;

  constructor(defaultTTL: number = 3600) {
    this.client = getRedisClient();
    this.defaultTTL = defaultTTL;
  }

  // 設置快取
  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      const expirationTime = ttl || this.defaultTTL;
      
      await this.client.setEx(key, expirationTime, serializedValue);
    } catch (error) {
      logger.error('Failed to set cache:', error);
      throw error;
    }
  }

  // 獲取快取
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      if (!value) return null;
      
      return JSON.parse(value) as T;
    } catch (error) {
      logger.error('Failed to get cache:', error);
      return null;
    }
  }

  // 刪除快取
  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      logger.error('Failed to delete cache:', error);
      throw error;
    }
  }

  // 檢查快取是否存在
  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      logger.error('Failed to check cache existence:', error);
      return false;
    }
  }

  // 設置過期時間
  async expire(key: string, ttl: number): Promise<void> {
    try {
      await this.client.expire(key, ttl);
    } catch (error) {
      logger.error('Failed to set cache expiration:', error);
      throw error;
    }
  }

  // 獲取剩餘過期時間
  async ttl(key: string): Promise<number> {
    try {
      return await this.client.ttl(key);
    } catch (error) {
      logger.error('Failed to get cache TTL:', error);
      return -1;
    }
  }

  // 批量刪除（使用模式匹配）
  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      logger.error('Failed to delete cache pattern:', error);
      throw error;
    }
  }

  // 原子性操作：設置快取如果不存在
  async setIfNotExists(key: string, value: any, ttl?: number): Promise<boolean> {
    try {
      const serializedValue = JSON.stringify(value);
      const expirationTime = ttl || this.defaultTTL;
      
      const result = await this.client.setNX(key, serializedValue);
      if (result) {
        await this.client.expire(key, expirationTime);
      }
      
      return result;
    } catch (error) {
      logger.error('Failed to set cache if not exists:', error);
      return false;
    }
  }
}

// 創建不同用途的快取服務實例
export const userCache = new CacheService(1800); // 30 分鐘
export const boardMemberCache = new CacheService(3600); // 1 小時
export const chatCache = new CacheService(300); // 5 分鐘
export const subscriptionCache = new CacheService(600); // 10 分鐘

// 快取鍵生成器
export const CacheKeys = {
  user: (id: string) => `user:${id}`,
  userProfile: (id: string) => `user:profile:${id}`,
  userBoard: (userId: string) => `user:board:${userId}`,
  boardMember: (id: string) => `board_member:${id}`,
  boardMembers: (filters?: string) => `board_members${filters ? `:${filters}` : ''}`,
  chatSession: (id: string) => `chat:session:${id}`,
  chatMessages: (sessionId: string) => `chat:messages:${sessionId}`,
  subscription: (userId: string) => `subscription:${userId}`,
  userQuota: (userId: string) => `quota:${userId}`,
  aiResponse: (hash: string) => `ai:response:${hash}`,
};

// 健康檢查
export async function checkRedisHealth(): Promise<boolean> {
  try {
    const client = getRedisClient();
    await client.ping();
    return true;
  } catch (error) {
    logger.error('Redis health check failed:', error);
    return false;
  }
}
