// 應用常量定義

// 計劃限制
export const PLAN_LIMITS = {
  FREE: {
    dailyQueries: 3,
    monthlyQueries: 50,
    maxBoardMembers: 3,
    maxChatSessions: 5,
    features: ['basic_chat', 'limited_members'],
  },
  BASIC: {
    dailyQueries: 10,
    monthlyQueries: 200,
    maxBoardMembers: 5,
    maxChatSessions: 20,
    features: ['basic_chat', 'extended_members', 'chat_history'],
  },
  PROFESSIONAL: {
    dailyQueries: 50,
    monthlyQueries: 1000,
    maxBoardMembers: 10,
    maxChatSessions: 100,
    features: ['basic_chat', 'extended_members', 'chat_history', 'premium_members', 'export_data'],
  },
  ENTERPRISE: {
    dailyQueries: -1, // 無限制
    monthlyQueries: -1, // 無限制
    maxBoardMembers: -1, // 無限制
    maxChatSessions: -1, // 無限制
    features: ['all_features', 'api_access', 'priority_support', 'custom_integration'],
  },
} as const;

// 計劃價格 (USD)
export const PLAN_PRICES = {
  FREE: 0,
  BASIC: 9.99,
  PROFESSIONAL: 19.99,
  ENTERPRISE: 49.99,
} as const;

// 計劃名稱
export const PLAN_NAMES = {
  FREE: '免費版',
  BASIC: '基礎版',
  PROFESSIONAL: '專業版',
  ENTERPRISE: '企業版',
} as const;

// 計劃描述
export const PLAN_DESCRIPTIONS = {
  FREE: '適合個人用戶試用',
  BASIC: '適合個人用戶日常使用',
  PROFESSIONAL: '適合專業人士和小團隊',
  ENTERPRISE: '適合大型企業和組織',
} as const;

// 支援的語言
export const SUPPORTED_LANGUAGES = ['zh-TW', 'zh-CN', 'en'] as const;

// 語言顯示名稱
export const LANGUAGE_NAMES = {
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
  'en': 'English',
} as const;

// 智囊團成員領域
export const BOARD_MEMBER_FIELDS = [
  'business',
  'technology',
  'science',
  'philosophy',
  'politics',
  'economics',
  'psychology',
  'education',
  'arts',
  'sports',
  'medicine',
  'law',
  'history',
  'literature',
  'religion',
  'military',
  'diplomacy',
  'environment',
  'social_work',
  'other',
] as const;

// 領域顯示名稱
export const FIELD_NAMES = {
  business: '商業',
  technology: '科技',
  science: '科學',
  philosophy: '哲學',
  politics: '政治',
  economics: '經濟學',
  psychology: '心理學',
  education: '教育',
  arts: '藝術',
  sports: '體育',
  medicine: '醫學',
  law: '法律',
  history: '歷史',
  literature: '文學',
  religion: '宗教',
  military: '軍事',
  diplomacy: '外交',
  environment: '環境',
  social_work: '社會工作',
  other: '其他',
} as const;

// API 限制
export const API_LIMITS = {
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 分鐘
  RATE_LIMIT_MAX_REQUESTS: 100, // 每 15 分鐘最多 100 次請求
  MAX_MESSAGE_LENGTH: 4000,
  MAX_BOARD_MEMBERS_PER_USER: 20,
  MAX_CHAT_SESSIONS_PER_USER: 200,
  MAX_MESSAGES_PER_SESSION: 1000,
} as const;

// 文件上傳限制
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain'],
} as const;

// 快取時間 (秒)
export const CACHE_TTL = {
  BOARD_MEMBERS: 3600, // 1 小時
  USER_PROFILE: 1800, // 30 分鐘
  CHAT_SESSION: 300, // 5 分鐘
  SUBSCRIPTION_INFO: 600, // 10 分鐘
} as const;

// 錯誤代碼
export const ERROR_CODES = {
  // 認證錯誤
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
  AUTH_INSUFFICIENT_PERMISSIONS: 'AUTH_INSUFFICIENT_PERMISSIONS',
  
  // 用戶錯誤
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  USER_QUOTA_EXCEEDED: 'USER_QUOTA_EXCEEDED',
  
  // 智囊團成員錯誤
  BOARD_MEMBER_NOT_FOUND: 'BOARD_MEMBER_NOT_FOUND',
  BOARD_MEMBER_ALREADY_ADDED: 'BOARD_MEMBER_ALREADY_ADDED',
  BOARD_MEMBER_LIMIT_EXCEEDED: 'BOARD_MEMBER_LIMIT_EXCEEDED',
  
  // 聊天錯誤
  CHAT_SESSION_NOT_FOUND: 'CHAT_SESSION_NOT_FOUND',
  CHAT_MESSAGE_TOO_LONG: 'CHAT_MESSAGE_TOO_LONG',
  CHAT_QUOTA_EXCEEDED: 'CHAT_QUOTA_EXCEEDED',
  
  // 訂閱錯誤
  SUBSCRIPTION_NOT_FOUND: 'SUBSCRIPTION_NOT_FOUND',
  SUBSCRIPTION_ALREADY_ACTIVE: 'SUBSCRIPTION_ALREADY_ACTIVE',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  
  // 系統錯誤
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const;

// 成功訊息
export const SUCCESS_MESSAGES = {
  USER_CREATED: '用戶創建成功',
  USER_UPDATED: '用戶資料更新成功',
  USER_DELETED: '用戶刪除成功',
  LOGIN_SUCCESS: '登入成功',
  LOGOUT_SUCCESS: '登出成功',
  
  BOARD_MEMBER_ADDED: '智囊團成員添加成功',
  BOARD_MEMBER_REMOVED: '智囊團成員移除成功',
  BOARD_MEMBER_UPDATED: '智囊團成員更新成功',
  
  CHAT_SESSION_CREATED: '聊天會話創建成功',
  CHAT_SESSION_UPDATED: '聊天會話更新成功',
  CHAT_SESSION_DELETED: '聊天會話刪除成功',
  MESSAGE_SENT: '訊息發送成功',
  
  SUBSCRIPTION_CREATED: '訂閱創建成功',
  SUBSCRIPTION_UPDATED: '訂閱更新成功',
  SUBSCRIPTION_CANCELED: '訂閱取消成功',
  PAYMENT_SUCCESS: '支付成功',
} as const;

// 默認 AI 提示詞模板
export const DEFAULT_AI_PROMPTS = {
  SYSTEM_PROMPT: `你是一位專業的智囊團成員，請根據你的專業背景和經驗來回答用戶的問題。

你的回答應該：
1. 體現你的專業知識和經驗
2. 保持你的個人風格和觀點
3. 提供實用和有價值的建議
4. 使用適當的語言和語氣
5. 如果問題超出你的專業範圍，請誠實說明

請用繁體中文回答，除非用戶特別要求其他語言。`,

  SYSTEM_PROMPT_EN: `You are a professional board member advisor. Please answer user questions based on your professional background and experience.

Your responses should:
1. Reflect your professional knowledge and experience
2. Maintain your personal style and perspective
3. Provide practical and valuable advice
4. Use appropriate language and tone
5. If the question is outside your expertise, please be honest about it

Please respond in English unless the user specifically requests another language.`,

  SYSTEM_PROMPT_ZH: `你是一位专业的智囊团成员，请根据你的专业背景和经验来回答用户的问题。

你的回答应该：
1. 体现你的专业知识和经验
2. 保持你的个人风格和观点
3. 提供实用和有价值的建议
4. 使用适当的语言和语气
5. 如果问题超出你的专业范围，请诚实说明

请用简体中文回答，除非用户特别要求其他语言。`,
} as const;
