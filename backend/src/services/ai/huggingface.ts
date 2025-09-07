import { BaseAIProvider } from './base';
import { AIContext, AIResponse, ModelInfo, AIError } from './types';
import { logger } from '@/utils/logger';

export class HuggingFaceProvider extends BaseAIProvider {
  name = 'HuggingFace';
  version = '1.0.0';
  private apiKey: string;
  private model: string;
  private baseUrl = 'https://api-inference.huggingface.co/models';

  constructor(config: any) {
    super(config);
    this.apiKey = config.apiKey;
    this.model = config.model || 'microsoft/DialoGPT-medium';
  }

  async initialize(): Promise<void> {
    try {
      this.validateConfig();
      
      if (!this.apiKey) {
        throw new AIError('HuggingFace API key is required', 'API_KEY_MISSING', 500);
      }

      // 測試連接
      await this.testConnection();
      this.isInitialized = true;
      
      logger.info('HuggingFace provider initialized successfully');
    } catch (error) {
      this.handleError(error, 'initialization');
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      await this.testConnection();
      return true;
    } catch (error) {
      logger.error('HuggingFace health check failed:', error);
      return false;
    }
  }

  async generateResponse(context: AIContext): Promise<AIResponse> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const startTime = Date.now();
      
      // 構建提示詞
      const prompt = this.buildPrompt(context);
      
      // 調用 HuggingFace API
      const response = await this.callHuggingFaceAPI(prompt);
      
      const responseTime = Date.now() - startTime;
      const content = this.cleanResponse(response[0]?.generated_text || '');
      const memberId = this.selectMemberForResponse(context);

      const aiResponse: AIResponse = {
        content,
        memberId,
        metadata: {
          model: this.model,
          tokensUsed: 0, // HuggingFace 不提供 token 計數
          responseTime,
          confidence: 0.7, // HuggingFace 通常有中等置信度
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
      capabilities: ['text-generation', 'conversation'],
    };
  }

  private async testConnection(): Promise<void> {
    const testPrompt = "Hello, how are you?";
    await this.callHuggingFaceAPI(testPrompt);
  }

  private async callHuggingFaceAPI(prompt: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${this.model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: this.config.maxTokens || 2000,
          temperature: this.config.temperature || 0.7,
          do_sample: true,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new AIError(
        `HuggingFace API error: ${response.status} ${response.statusText}`,
        'API_ERROR',
        response.status,
        errorData
      );
    }

    return await response.json();
  }

  private buildPrompt(context: AIContext): string {
    const { userMessage, boardMembers, selectedMemberIds, userLanguage } = context;
    
    let prompt = `你是一個專業的智囊團系統，能夠模擬不同領域專家的思考方式和回答風格。

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
        prompt += `\n現在請以 ${member.name} 的身份回答問題。\n`;
        prompt += `專業領域：${member.field}\n`;
        prompt += `核心理念：${member.coreBeliefs}\n`;
      } else {
        prompt += `\n請綜合以下專家的觀點來回答：\n`;
        selectedMembers.forEach(member => {
          prompt += `- ${member.name}（${member.field}）\n`;
        });
      }
    } else {
      prompt += `\n請綜合智囊團中所有專家的觀點來回答問題。\n`;
    }

    // 語言指示
    const languageInstructions = {
      'zh-TW': '請用繁體中文回答。',
      'zh-CN': '请用简体中文回答。',
      'en': 'Please respond in English.',
    };

    prompt += `\n${languageInstructions[userLanguage as keyof typeof languageInstructions] || languageInstructions['zh-TW']}`;
    prompt += `\n\n用戶問題：${userMessage}\n\n回答：`;

    return prompt;
  }

  private selectMemberForResponse(context: AIContext): string {
    const { boardMembers, selectedMemberIds } = context;
    
    if (selectedMemberIds && selectedMemberIds.length > 0) {
      const randomIndex = Math.floor(Math.random() * selectedMemberIds.length);
      return selectedMemberIds[randomIndex];
    }
    
    if (boardMembers.length > 0) {
      const randomIndex = Math.floor(Math.random() * boardMembers.length);
      return boardMembers[randomIndex].id;
    }
    
    return boardMembers[0]?.id || 'unknown';
  }
}
