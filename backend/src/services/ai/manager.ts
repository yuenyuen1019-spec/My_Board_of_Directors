import { AIProvider, AIContext, AIResponse, AIServiceConfig } from './types';
import { OpenAIProvider } from './openai';
import { logger } from '@/utils/logger';

// AI 服務管理器
export class AIServiceManager {
  private providers: Map<string, AIProvider> = new Map();
  private currentProvider: string;
  private config: AIServiceConfig;

  constructor(config: AIServiceConfig) {
    this.config = config;
    this.currentProvider = config.provider;
    this.initializeProviders();
  }

  // 初始化所有可用的提供者
  private async initializeProviders(): Promise<void> {
    try {
      // 初始化 OpenAI 提供者
      if (this.config.openai?.apiKey) {
        const openaiProvider = new OpenAIProvider(this.config.openai);
        await openaiProvider.initialize();
        this.providers.set('openai', openaiProvider);
        logger.info('OpenAI provider initialized');
      }

      // 初始化 Claude 提供者（待實現）
      if (this.config.claude?.apiKey) {
        // const claudeProvider = new ClaudeProvider(this.config.claude);
        // await claudeProvider.initialize();
        // this.providers.set('claude', claudeProvider);
        logger.info('Claude provider initialization pending');
      }

      // 初始化本地提供者（待實現）
      if (this.config.local) {
        // const localProvider = new LocalProvider(this.config.local);
        // await localProvider.initialize();
        // this.providers.set('local', localProvider);
        logger.info('Local provider initialization pending');
      }

      logger.info(`AI Service Manager initialized with ${this.providers.size} providers`);
    } catch (error) {
      logger.error('Failed to initialize AI providers:', error);
      throw error;
    }
  }

  // 獲取當前提供者
  getCurrentProvider(): AIProvider {
    const provider = this.providers.get(this.currentProvider);
    if (!provider) {
      throw new Error(`AI provider '${this.currentProvider}' not found`);
    }
    return provider;
  }

  // 切換提供者
  async switchProvider(providerName: string): Promise<void> {
    if (!this.providers.has(providerName)) {
      throw new Error(`AI provider '${providerName}' not available`);
    }

    const provider = this.providers.get(providerName)!;
    
    // 檢查提供者健康狀態
    const isHealthy = await provider.isHealthy();
    if (!isHealthy) {
      throw new Error(`AI provider '${providerName}' is not healthy`);
    }

    this.currentProvider = providerName;
    logger.info(`Switched to AI provider: ${providerName}`);
  }

  // 生成回應
  async generateResponse(context: AIContext): Promise<AIResponse> {
    try {
      const provider = this.getCurrentProvider();
      
      // 檢查提供者健康狀態
      const isHealthy = await provider.isHealthy();
      if (!isHealthy) {
        logger.warn(`Current provider ${this.currentProvider} is not healthy, attempting to switch`);
        
        // 嘗試切換到其他健康的提供者
        for (const [name, altProvider] of this.providers) {
          if (name !== this.currentProvider) {
            const altHealthy = await altProvider.isHealthy();
            if (altHealthy) {
              await this.switchProvider(name);
              break;
            }
          }
        }
      }

      const finalProvider = this.getCurrentProvider();
      return await finalProvider.generateResponse(context);
    } catch (error) {
      logger.error('Failed to generate AI response:', error);
      throw error;
    }
  }

  // 獲取所有可用的提供者
  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  // 獲取提供者資訊
  getProviderInfo(providerName?: string): any {
    const provider = providerName 
      ? this.providers.get(providerName)
      : this.getCurrentProvider();
    
    if (!provider) {
      return null;
    }

    return {
      name: provider.name,
      version: provider.version,
      modelInfo: provider.getModelInfo(),
      isCurrent: !providerName || providerName === this.currentProvider,
    };
  }

  // 健康檢查
  async healthCheck(): Promise<Record<string, boolean>> {
    const healthStatus: Record<string, boolean> = {};
    
    for (const [name, provider] of this.providers) {
      try {
        healthStatus[name] = await provider.isHealthy();
      } catch (error) {
        logger.error(`Health check failed for provider ${name}:`, error);
        healthStatus[name] = false;
      }
    }

    return healthStatus;
  }

  // 更新配置
  async updateConfig(newConfig: Partial<AIServiceConfig>): Promise<void> {
    this.config = { ...this.config, ...newConfig };
    
    // 重新初始化提供者
    this.providers.clear();
    await this.initializeProviders();
    
    logger.info('AI service configuration updated');
  }

  // 獲取當前配置
  getConfig(): AIServiceConfig {
    return { ...this.config };
  }
}

// 單例實例
let aiServiceManager: AIServiceManager | null = null;

// 創建 AI 服務管理器實例
export function createAIServiceManager(config: AIServiceConfig): AIServiceManager {
  if (!aiServiceManager) {
    aiServiceManager = new AIServiceManager(config);
  }
  return aiServiceManager;
}

// 獲取 AI 服務管理器實例
export function getAIServiceManager(): AIServiceManager {
  if (!aiServiceManager) {
    throw new Error('AI Service Manager not initialized. Call createAIServiceManager first.');
  }
  return aiServiceManager;
}

// 從環境變量創建配置
export function createConfigFromEnv(): AIServiceConfig {
  return {
    provider: (process.env.AI_PROVIDER as 'openai' | 'claude' | 'local') || 'openai',
    openai: process.env.OPENAI_API_KEY ? {
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || 'gpt-4',
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
      timeout: parseInt(process.env.OPENAI_TIMEOUT || '30000'),
    } : undefined,
    claude: process.env.CLAUDE_API_KEY ? {
      apiKey: process.env.CLAUDE_API_KEY,
      model: process.env.CLAUDE_MODEL || 'claude-3-sonnet-20240229',
      temperature: parseFloat(process.env.CLAUDE_TEMPERATURE || '0.7'),
      maxTokens: parseInt(process.env.CLAUDE_MAX_TOKENS || '2000'),
      timeout: parseInt(process.env.CLAUDE_TIMEOUT || '30000'),
    } : undefined,
    local: process.env.LOCAL_AI_MODEL_PATH ? {
      modelPath: process.env.LOCAL_AI_MODEL_PATH,
      temperature: parseFloat(process.env.LOCAL_AI_TEMPERATURE || '0.7'),
      maxTokens: parseInt(process.env.LOCAL_AI_MAX_TOKENS || '2000'),
    } : undefined,
    defaultTemperature: parseFloat(process.env.AI_DEFAULT_TEMPERATURE || '0.7'),
    defaultMaxTokens: parseInt(process.env.AI_DEFAULT_MAX_TOKENS || '2000'),
    defaultTimeout: parseInt(process.env.AI_DEFAULT_TIMEOUT || '30000'),
  };
}
