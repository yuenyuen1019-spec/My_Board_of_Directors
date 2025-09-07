import { BaseAIProvider } from './base';
import { AIContext, AIResponse, ModelInfo, AIError } from './types';
import { logger } from '@/utils/logger';

export class MockProvider extends BaseAIProvider {
  name = 'Mock';
  version = '1.0.0';

  constructor(config: any) {
    super(config);
  }

  async initialize(): Promise<void> {
    try {
      this.isInitialized = true;
      logger.info('Mock provider initialized successfully');
    } catch (error) {
      this.handleError(error, 'initialization');
    }
  }

  async isHealthy(): Promise<boolean> {
    return true; // Mock 提供商總是健康的
  }

  async generateResponse(context: AIContext): Promise<AIResponse> {
    try {
      const startTime = Date.now();
      
      // 模擬處理時間
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const responseTime = Date.now() - startTime;
      const content = this.generateMockResponse(context);
      const memberId = this.selectMemberForResponse(context);

      const aiResponse: AIResponse = {
        content,
        memberId,
        metadata: {
          model: 'mock-ai-v1.0',
          tokensUsed: Math.floor(Math.random() * 100) + 50,
          responseTime,
          confidence: 0.8,
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
      name: 'mock-ai-v1.0',
      version: '1.0.0',
      maxTokens: 2000,
      supportedLanguages: ['zh-TW', 'zh-CN', 'en'],
      capabilities: ['text-generation', 'conversation', 'reasoning'],
    };
  }

  private generateMockResponse(context: AIContext): string {
    const { userMessage, boardMembers, selectedMemberIds, userLanguage } = context;
    
    // 獲取選中的成員
    let selectedMembers = [];
    if (selectedMemberIds && selectedMemberIds.length > 0) {
      selectedMembers = boardMembers.filter(member => 
        selectedMemberIds.includes(member.id)
      );
    } else {
      selectedMembers = boardMembers.slice(0, 1);
    }

    const member = selectedMembers[0];
    const memberName = member?.name || '智囊團成員';
    const memberField = member?.field || '專業領域';

    // 根據問題類型生成不同的回應
    const responses = this.getResponsesByQuestionType(userMessage, memberName, memberField, userLanguage);
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return randomResponse;
  }

  private getResponsesByQuestionType(question: string, memberName: string, field: string, language: string): string[] {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('如何') || lowerQuestion.includes('怎麼') || lowerQuestion.includes('how')) {
      return this.getHowToResponses(memberName, field, language);
    } else if (lowerQuestion.includes('什麼') || lowerQuestion.includes('什麼是') || lowerQuestion.includes('what')) {
      return this.getWhatResponses(memberName, field, language);
    } else if (lowerQuestion.includes('為什麼') || lowerQuestion.includes('why')) {
      return this.getWhyResponses(memberName, field, language);
    } else if (lowerQuestion.includes('建議') || lowerQuestion.includes('advice')) {
      return this.getAdviceResponses(memberName, field, language);
    } else {
      return this.getGeneralResponses(memberName, field, language);
    }
  }

  private getHowToResponses(memberName: string, field: string, language: string): string[] {
    if (language === 'zh-TW' || language === 'zh-CN') {
      return [
        `作為${memberName}，我認為在${field}領域，成功需要專注於核心原則。首先，要明確你的目標和價值觀。其次，建立一個清晰的執行計劃。最後，保持持續的學習和改進。記住，偉大的成就往往來自於對細節的關注和對長期目標的堅持。`,
        `從我的經驗來看，在${field}中取得成功需要三個關鍵要素：創新思維、執行力和團隊合作。創新思維幫助你找到新的解決方案，執行力確保想法能夠實現，而團隊合作則讓你能夠發揮集體智慧的力量。`,
        `我建議採用系統性的方法來解決這個問題。首先分析現狀，識別關鍵挑戰，然後制定分階段的解決方案。在${field}領域，我發現最有效的方法是將複雜問題分解為可管理的小步驟。`
      ];
    } else {
      return [
        `As ${memberName}, I believe that success in ${field} requires focusing on core principles. First, clarify your goals and values. Second, establish a clear execution plan. Finally, maintain continuous learning and improvement. Remember, great achievements often come from attention to detail and persistence toward long-term goals.`,
        `From my experience, success in ${field} requires three key elements: innovative thinking, execution capability, and teamwork. Innovative thinking helps you find new solutions, execution capability ensures ideas can be realized, and teamwork allows you to leverage the power of collective wisdom.`
      ];
    }
  }

  private getWhatResponses(memberName: string, field: string, language: string): string[] {
    if (language === 'zh-TW' || language === 'zh-CN') {
      return [
        `在${field}領域，我認為最重要的是理解本質。這不僅僅是表面的知識，而是深層的理解和洞察。作為${memberName}，我發現真正的智慧來自於對基本原理的掌握和對變化的適應能力。`,
        `從我的角度來看，${field}的核心在於平衡創新與實用性。我們需要保持對新技術和新方法的開放態度，同時確保我們的解決方案能夠真正解決實際問題。`,
        `我認為${field}的關鍵在於持續學習和適應。世界在不斷變化，我們必須保持好奇心，不斷探索新的可能性，同時保持對核心價值的堅持。`
      ];
    } else {
      return [
        `In the field of ${field}, I believe the most important thing is understanding the essence. This is not just surface knowledge, but deep understanding and insight. As ${memberName}, I've found that true wisdom comes from mastering fundamental principles and adapting to change.`,
        `From my perspective, the core of ${field} lies in balancing innovation with practicality. We need to maintain an open attitude toward new technologies and methods while ensuring our solutions can truly solve real problems.`
      ];
    }
  }

  private getWhyResponses(memberName: string, field: string, language: string): string[] {
    if (language === 'zh-TW' || language === 'zh-CN') {
      return [
        `這個問題觸及了${field}的根本。作為${memberName}，我認為原因在於我們對本質的理解不夠深入。真正的成功來自於對基本原理的掌握，而不是表面的技巧。`,
        `從我的經驗來看，這背後的原因是多方面的。首先，我們需要理解市場的需求和變化。其次，我們必須保持對質量的堅持。最後，我們需要建立可持續的發展模式。`,
        `我認為這反映了我們在${field}中面臨的挑戰。成功需要的不僅僅是技術能力，還需要對人性的理解、對市場的洞察，以及對未來的遠見。`
      ];
    } else {
      return [
        `This question touches the root of ${field}. As ${memberName}, I believe the reason lies in our insufficient understanding of the essence. True success comes from mastering fundamental principles, not superficial techniques.`,
        `From my experience, the reasons behind this are multifaceted. First, we need to understand market needs and changes. Second, we must maintain our commitment to quality. Finally, we need to establish sustainable development models.`
      ];
    }
  }

  private getAdviceResponses(memberName: string, field: string, language: string): string[] {
    if (language === 'zh-TW' || language === 'zh-CN') {
      return [
        `作為${memberName}，我的建議是：保持專注，堅持你的核心價值觀。在${field}領域，我發現最成功的人都是那些能夠在變化中保持不變的人。他們知道什麼是重要的，什麼是暫時的。`,
        `我建議你採用漸進式的方法。不要試圖一次性解決所有問題，而是專注於最重要的幾個方面。在${field}中，我發現持續的小改進往往比大的變革更有效。`,
        `我的建議是建立一個支持系統。無論是在${field}還是生活中，我們都需要他人的幫助和指導。找到那些能夠挑戰你、支持你的人，他們將成為你成功路上的重要夥伴。`
      ];
    } else {
      return [
        `As ${memberName}, my advice is: stay focused and stick to your core values. In the field of ${field}, I've found that the most successful people are those who can remain constant in the face of change. They know what's important and what's temporary.`,
        `I recommend adopting a gradual approach. Don't try to solve all problems at once, but focus on the most important aspects. In ${field}, I've found that continuous small improvements are often more effective than major changes.`
      ];
    }
  }

  private getGeneralResponses(memberName: string, field: string, language: string): string[] {
    if (language === 'zh-TW' || language === 'zh-CN') {
      return [
        `作為${memberName}，我認為這是一個很好的問題。在${field}領域，我們經常面臨類似的挑戰。關鍵是要保持開放的心態，同時堅持我們的核心原則。`,
        `從我的經驗來看，這個問題反映了${field}中的一個重要趨勢。我們需要適應變化，但也要保持對本質的理解。成功往往來自於在變與不變之間找到平衡。`,
        `我認為這是一個值得深入思考的問題。在${field}中，我們需要不斷學習和成長，同時保持對質量的堅持。記住，真正的成功不是一蹴而就的，而是需要持續的努力和改進。`
      ];
    } else {
      return [
        `As ${memberName}, I think this is a great question. In the field of ${field}, we often face similar challenges. The key is to maintain an open mind while sticking to our core principles.`,
        `From my experience, this question reflects an important trend in ${field}. We need to adapt to change while maintaining our understanding of the essence. Success often comes from finding balance between change and constancy.`
      ];
    }
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
    
    return 'mock-member-1';
  }
}
