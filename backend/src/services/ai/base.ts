import { AIProvider, AIContext, AIResponse, ModelInfo, AIError } from './types';
import { logger } from '@/utils/logger';

// AI 服務基礎抽象類
export abstract class BaseAIProvider implements AIProvider {
  protected config: any;
  protected isInitialized: boolean = false;

  constructor(config: any) {
    this.config = config;
  }

  abstract name: string;
  abstract version: string;

  // 初始化提供者
  abstract initialize(): Promise<void>;

  // 健康檢查
  abstract isHealthy(): Promise<boolean>;

  // 生成回應
  abstract generateResponse(context: AIContext): Promise<AIResponse>;

  // 獲取模型資訊
  abstract getModelInfo(): ModelInfo;

  // 驗證配置
  protected validateConfig(): void {
    if (!this.config) {
      throw new AIError('AI provider configuration is required', 'CONFIG_MISSING', 500);
    }
  }

  // 構建系統提示詞
  protected buildSystemPrompt(member: any, language: string): string {
    const prompts = {
      'zh-TW': member.systemPrompt || member.systemPromptZh,
      'zh-CN': member.systemPromptZh || member.systemPrompt,
      'en': member.systemPromptEn || member.systemPrompt,
    };

    return prompts[language as keyof typeof prompts] || member.systemPrompt;
  }

  // 構建用戶提示詞
  protected buildUserPrompt(context: AIContext): string {
    const { userMessage, boardMembers, selectedMemberIds } = context;
    
    let prompt = `用戶問題：${userMessage}\n\n`;
    
    if (selectedMemberIds && selectedMemberIds.length > 0) {
      const selectedMembers = boardMembers.filter(member => 
        selectedMemberIds.includes(member.id)
      );
      
      if (selectedMembers.length === 1) {
        const member = selectedMembers[0];
        prompt += `請以 ${member.name} 的身份和專業背景來回答這個問題。\n`;
        prompt += `專業領域：${member.field}\n`;
        prompt += `核心理念：${member.coreBeliefs}\n`;
      } else {
        prompt += `請綜合以下智囊團成員的觀點來回答：\n`;
        selectedMembers.forEach(member => {
          prompt += `- ${member.name}（${member.field}）：${member.coreBeliefs}\n`;
        });
      }
    } else {
      prompt += `請綜合以下智囊團成員的觀點來回答：\n`;
      boardMembers.forEach(member => {
        prompt += `- ${member.name}（${member.field}）：${member.coreBeliefs}\n`;
      });
    }

    return prompt;
  }

  // 構建對話歷史
  protected buildConversationHistory(context: AIContext): Array<{ role: string; content: string }> {
    const { sessionHistory } = context;
    
    return sessionHistory.map(message => ({
      role: message.role.toLowerCase(),
      content: message.content,
    }));
  }

  // 處理錯誤
  protected handleError(error: any, operation: string): never {
    logger.error(`AI Provider ${this.name} ${operation} failed:`, error);
    
    if (error instanceof AIError) {
      throw error;
    }

    // 根據錯誤類型創建適當的 AIError
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      throw new AIError(
        'AI service rate limit exceeded',
        'RATE_LIMIT_EXCEEDED',
        429,
        error
      );
    }

    if (error.code === 'INSUFFICIENT_QUOTA') {
      throw new AIError(
        'AI service quota exceeded',
        'QUOTA_EXCEEDED',
        402,
        error
      );
    }

    if (error.code === 'MODEL_NOT_FOUND') {
      throw new AIError(
        'AI model not found',
        'MODEL_NOT_FOUND',
        404,
        error
      );
    }

    throw new AIError(
      `AI service error during ${operation}`,
      'AI_SERVICE_ERROR',
      500,
      error
    );
  }

  // 記錄使用情況
  protected logUsage(response: AIResponse, context: AIContext): void {
    logger.info('AI usage logged', {
      provider: this.name,
      model: response.metadata?.model,
      tokensUsed: response.metadata?.tokensUsed,
      responseTime: response.metadata?.responseTime,
      memberCount: context.boardMembers.length,
      selectedMemberCount: context.selectedMemberIds?.length || 0,
    });
  }

  // 驗證回應
  protected validateResponse(response: AIResponse): void {
    if (!response.content || response.content.trim().length === 0) {
      throw new AIError(
        'AI provider returned empty response',
        'EMPTY_RESPONSE',
        500
      );
    }

    if (!response.memberId) {
      throw new AIError(
        'AI provider response missing memberId',
        'MISSING_MEMBER_ID',
        500
      );
    }
  }

  // 清理回應內容
  protected cleanResponse(content: string): string {
    // 移除多餘的空白字符
    let cleaned = content.trim();
    
    // 移除可能的 AI 標記
    cleaned = cleaned.replace(/^(AI|Assistant|助手|助理):\s*/i, '');
    
    // 確保回應以適當的標點符號結尾
    if (!/[.!?。！？]$/.test(cleaned)) {
      cleaned += '。';
    }

    return cleaned;
  }
}
