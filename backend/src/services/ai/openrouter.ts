import { BaseAIProvider } from './base';
import { AIContext, AIResponse, ModelInfo, AIError } from './types';
import { logger } from '@/utils/logger';

export class OpenRouterProvider extends BaseAIProvider {
  name = 'OpenRouter';
  version = '1.0.0';
  private apiKey: string;
  private model: string;
  private baseUrl = 'https://openrouter.ai/api/v1';

  constructor(config: any) {
    super(config);
    this.apiKey = config.apiKey;
    this.model = config.model || 'meta-llama/llama-3.1-8b-instruct:free';
  }

  async initialize(): Promise<void> {
    try {
      this.validateConfig();
      
      if (!this.apiKey) {
        throw new AIError('OpenRouter API key is required', 'API_KEY_MISSING', 500);
      }

      // 測試連接
      await this.testConnection();
      this.isInitialized = true;
      
      logger.info('OpenRouter provider initialized successfully');
    } catch (error) {
      this.handleError(error, 'initialization');
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      await this.testConnection();
      return true;
    } catch (error) {
      logger.error('OpenRouter health check failed:', error);
      return false;
    }
  }

  async generateResponse(context: AIContext): Promise<AIResponse> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const startTime = Date.now();
      
      // 構建消息
      const messages = this.buildMessages(context);
      
      // 調用 OpenRouter API
      const response = await this.callOpenRouterAPI(messages);
      
      const responseTime = Date.now() - startTime;
      const content = this.cleanResponse(response.choices[0]?.message?.content || '');
      const memberId = this.selectMemberForResponse(context);

      const aiResponse: AIResponse = {
        content,
        memberId,
        metadata: {
          model: this.model,
          tokensUsed: response.usage?.total_tokens || 0,
          responseTime,
          confidence: 0.8, // OpenRouter 通常有較高的置信度
        },
      };

      this.validateResponse(aiResponse);
      this.logUsage(aiResponse, context);

      return aiResponse;
    } catch (error) {
      this.handleError(error, 'generateResponse');
    }
  }

  getModelInfo(): ModelInfo {
    return {
      name: this.model,
      version: '1.0.0',
      maxTokens: this.config.maxTokens || 2000,
      supportedLanguages: ['zh-TW', 'zh-CN', 'en'],
      capabilities: ['text-generation', 'conversation', 'reasoning'],
    };
  }

  private async testConnection(): Promise<void> {
    const testMessages = [
      {
        role: 'system',
        content: 'You are a helpful assistant.'
      },
      {
        role: 'user',
        content: 'Hello'
      }
    ];

    await this.callOpenRouterAPI(testMessages);
  }

  private async callOpenRouterAPI(messages: Array<{ role: string; content: string }>): Promise<any> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000', // 可選：用於追蹤
        'X-Title': 'My Board of Directors', // 可選：應用名稱
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages,
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxTokens || 2000,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new AIError(
        `OpenRouter API error: ${response.status} ${response.statusText}`,
        'API_ERROR',
        response.status,
        errorData
      );
    }

    return await response.json();
  }

  private buildMessages(context: AIContext): Array<{ role: string; content: string }> {
    const messages: Array<{ role: string; content: string }> = [];
    
    // 系統提示詞
    const systemPrompt = this.buildSystemPromptForContext(context);
    messages.push({
      role: 'system',
      content: systemPrompt,
    });

    // 對話歷史
    const history = this.buildConversationHistory(context);
    messages.push(...history);

    // 用戶問題
    const userPrompt = this.buildUserPrompt(context);
    messages.push({
      role: 'user',
      content: userPrompt,
    });

    return messages;
  }

  private buildSystemPromptForContext(context: AIContext): string {
    const { boardMembers, userLanguage, selectedMemberIds } = context;
    
    let systemPrompt = `你是一個專業的智囊團系統，能夠模擬不同領域專家的思考方式和回答風格。

請根據以下指導原則回答問題：
1. 保持專業性和客觀性
2. 提供實用和有價值的建議
3. 如果問題超出專業範圍，請誠實說明
4. 使用清晰、易懂的語言
5. 適當引用相關的理論或經驗

`;

    if (selectedMemberIds && selectedMemberIds.length > 0) {
      const selectedMembers = boardMembers.filter(member => 
        selectedMemberIds.includes(member.id)
      );
      
      if (selectedMembers.length === 1) {
        const member = selectedMembers[0];
        systemPrompt += `\n現在請以 ${member.name} 的身份回答問題。\n`;
        systemPrompt += `專業領域：${member.field}\n`;
        systemPrompt += `核心理念：${member.coreBeliefs}\n`;
        systemPrompt += `個人風格：${this.buildSystemPrompt(member, userLanguage)}\n`;
      } else {
        systemPrompt += `\n請綜合以下專家的觀點來回答：\n`;
        selectedMembers.forEach(member => {
          systemPrompt += `- ${member.name}（${member.field}）\n`;
        });
      }
    } else {
      systemPrompt += `\n請綜合智囊團中所有專家的觀點來回答問題。\n`;
    }

    // 語言指示
    const languageInstructions = {
      'zh-TW': '請用繁體中文回答。',
      'zh-CN': '请用简体中文回答。',
      'en': 'Please respond in English.',
    };

    systemPrompt += `\n${languageInstructions[userLanguage as keyof typeof languageInstructions] || languageInstructions['zh-TW']}`;

    return systemPrompt;
  }

  private selectMemberForResponse(context: AIContext): string {
    const { boardMembers, selectedMemberIds } = context;
    
    if (selectedMemberIds && selectedMemberIds.length > 0) {
      // 如果指定了特定成員，隨機選擇一個
      const randomIndex = Math.floor(Math.random() * selectedMemberIds.length);
      return selectedMemberIds[randomIndex];
    }
    
    // 如果沒有指定，隨機選擇一個智囊團成員
    if (boardMembers.length > 0) {
      const randomIndex = Math.floor(Math.random() * boardMembers.length);
      return boardMembers[randomIndex].id;
    }
    
    // 如果沒有智囊團成員，返回第一個成員的 ID（這種情況不應該發生）
    return boardMembers[0]?.id || 'unknown';
  }
}
