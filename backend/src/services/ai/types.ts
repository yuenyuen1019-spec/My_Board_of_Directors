// AI 服務相關類型定義

export interface AIContext {
  userMessage: string;
  boardMembers: BoardMember[];
  sessionHistory: ChatMessage[];
  userLanguage: string;
  selectedMemberIds?: string[];
}

export interface BoardMember {
  id: string;
  name: string;
  nameEn?: string;
  nameZh?: string;
  field: string;
  fieldEn?: string;
  fieldZh?: string;
  bio: string;
  bioEn?: string;
  bioZh?: string;
  coreBeliefs: string;
  coreBeliefsEn?: string;
  coreBeliefsZh?: string;
  systemPrompt: string;
  systemPromptEn?: string;
  systemPromptZh?: string;
  famousQuotes: string[];
  famousQuotesEn: string[];
  famousQuotesZh: string[];
}

export interface ChatMessage {
  id: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string;
  memberId?: string;
  createdAt: Date;
}

export interface AIResponse {
  content: string;
  memberId: string;
  metadata?: {
    model?: string;
    tokensUsed?: number;
    responseTime?: number;
    confidence?: number;
  };
}

export interface AIProvider {
  name: string;
  version: string;
  isHealthy(): Promise<boolean>;
  generateResponse(context: AIContext): Promise<AIResponse>;
  getModelInfo(): ModelInfo;
}

export interface ModelInfo {
  name: string;
  version: string;
  maxTokens: number;
  supportedLanguages: string[];
  capabilities: string[];
}

export interface AIProviderConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  timeout?: number;
}

export interface AIServiceConfig {
  provider: 'openai' | 'claude' | 'local';
  openai?: AIProviderConfig;
  claude?: AIProviderConfig;
  local?: {
    modelPath?: string;
    temperature?: number;
    maxTokens?: number;
  };
  defaultTemperature: number;
  defaultMaxTokens: number;
  defaultTimeout: number;
}

// 錯誤類型
export class AIError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'AIError';
  }
}

// 提示詞模板類型
export interface PromptTemplate {
  system: string;
  user: string;
  assistant: string;
}

// 多語言提示詞模板
export interface LocalizedPromptTemplate {
  'zh-TW': PromptTemplate;
  'zh-CN': PromptTemplate;
  'en': PromptTemplate;
}
