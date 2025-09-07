// 共享類型定義

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
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

// 用戶相關類型
export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  language: string;
  timezone: string;
  planType: PlanType;
  planExpiresAt?: Date;
  dailyQueriesUsed: number;
  monthlyQueriesUsed: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  language?: string;
  timezone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// 智囊團成員相關類型
export interface BoardMember {
  id: string;
  name: string;
  nameEn?: string;
  nameZh?: string;
  birthYear?: number;
  deathYear?: number;
  nationality?: string;
  field: string;
  fieldEn?: string;
  fieldZh?: string;
  bio: string;
  bioEn?: string;
  bioZh?: string;
  achievements: string[];
  coreBeliefs: string;
  coreBeliefsEn?: string;
  coreBeliefsZh?: string;
  famousQuotes: string[];
  famousQuotesEn: string[];
  famousQuotesZh: string[];
  works: string[];
  worksEn: string[];
  worksZh: string[];
  speeches: string[];
  speechesEn: string[];
  speechesZh: string[];
  links?: Record<string, string>;
  avatar?: string;
  images: string[];
  systemPrompt: string;
  systemPromptEn?: string;
  systemPromptZh?: string;
  isActive: boolean;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBoardMemberRequest {
  name: string;
  nameEn?: string;
  nameZh?: string;
  birthYear?: number;
  deathYear?: number;
  nationality?: string;
  field: string;
  fieldEn?: string;
  fieldZh?: string;
  bio: string;
  bioEn?: string;
  bioZh?: string;
  achievements: string[];
  coreBeliefs: string;
  coreBeliefsEn?: string;
  coreBeliefsZh?: string;
  famousQuotes: string[];
  famousQuotesEn: string[];
  famousQuotesZh: string[];
  works: string[];
  worksEn: string[];
  worksZh: string[];
  speeches: string[];
  speechesEn: string[];
  speechesZh: string[];
  links?: Record<string, string>;
  avatar?: string;
  images: string[];
  systemPrompt: string;
  systemPromptEn?: string;
  systemPromptZh?: string;
  isPremium?: boolean;
}

// 用戶智囊團相關類型
export interface UserBoard {
  id: string;
  userId: string;
  memberId: string;
  position: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  member: BoardMember;
}

export interface AddToBoardRequest {
  memberId: string;
  position?: number;
}

// 聊天相關類型
export interface ChatSession {
  id: string;
  userId: string;
  title?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  memberId?: string;
  role: MessageRole;
  content: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  member?: BoardMember;
}

export interface CreateChatSessionRequest {
  title?: string;
}

export interface SendMessageRequest {
  sessionId: string;
  content: string;
  memberIds?: string[]; // 如果為空，則使用用戶的整個智囊團
}

export interface ChatResponse {
  message: ChatMessage;
  session: ChatSession;
}

// 訂閱相關類型
export interface Subscription {
  id: string;
  stripeCustomerId: string;
  stripeSubscriptionId?: string;
  planType: PlanType;
  status: SubscriptionStatus;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubscriptionRequest {
  planType: PlanType;
  paymentMethodId: string;
}

export interface UpdateSubscriptionRequest {
  planType?: PlanType;
  paymentMethodId?: string;
}

// 支付相關類型
export interface Payment {
  id: string;
  userId: string;
  stripePaymentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description?: string;
  createdAt: Date;
}

// 枚舉類型
export enum PlanType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  PAST_DUE = 'PAST_DUE',
  UNPAID = 'UNPAID',
  INCOMPLETE = 'INCOMPLETE',
  INCOMPLETE_EXPIRED = 'INCOMPLETE_EXPIRED',
  TRIALING = 'TRIALING',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
  REFUNDED = 'REFUNDED',
}

export enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}

// AI 相關類型
export interface AIContext {
  userMessage: string;
  boardMembers: BoardMember[];
  sessionHistory: ChatMessage[];
  userLanguage: string;
}

export interface AIResponse {
  content: string;
  memberId: string;
  metadata?: Record<string, any>;
}

// 配置類型
export interface AppConfig {
  aiProvider: 'openai' | 'claude' | 'local';
  openaiApiKey?: string;
  claudeApiKey?: string;
  stripeSecretKey?: string;
  stripePublishableKey?: string;
  databaseUrl: string;
  jwtSecret: string;
  redisUrl?: string;
}

// 錯誤類型
export interface AppError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

// 語言支援
export type SupportedLanguage = 'zh-TW' | 'zh-CN' | 'en';

export interface LocalizedContent {
  'zh-TW': string;
  'zh-CN': string;
  'en': string;
}
