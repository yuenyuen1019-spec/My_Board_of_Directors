const { createAIServiceManager, createConfigFromEnv } = require('./dist/services/ai/manager');
const { prisma } = require('./dist/utils/database');

// 測試 AI 整合功能
async function testAIIntegration() {
  console.log('🤖 開始測試 AI 整合功能...');
  console.log('==============================');

  try {
    // 1. 檢查環境變量
    console.log('📋 檢查環境變量...');
    const config = createConfigFromEnv();
    
    // 檢查是否有任何 AI 提供商配置
    const hasOpenAI = config.openai?.apiKey && config.openai.apiKey !== 'your-openai-api-key-here';
    const hasPerplexity = config.perplexity?.apiKey && config.perplexity.apiKey !== 'your-perplexity-api-key-here';
    const hasGroq = config.groq?.apiKey && config.groq.apiKey !== 'your-groq-api-key-here';
    const hasOpenRouter = config.openrouter?.apiKey && config.openrouter.apiKey !== 'your-openrouter-api-key-here';
    const hasHuggingFace = config.huggingface?.apiKey && config.huggingface.apiKey !== 'your-huggingface-api-key-here';
    const hasMock = config.mock?.enabled;
    const hasClaude = config.claude?.apiKey && config.claude.apiKey !== 'your-claude-api-key-here';
    
    if (!hasOpenAI && !hasPerplexity && !hasGroq && !hasOpenRouter && !hasHuggingFace && !hasMock && !hasClaude) {
      console.error('❌ 沒有找到任何 AI 提供商配置！');
      console.log('請在 .env 文件中設置以下其中一個：');
      console.log('🆓 免費選項：');
      console.log('- AI_PROVIDER=mock (完全免費，無需 API Key)');
      console.log('- OPENROUTER_API_KEY (每月 $5 免費額度)');
      console.log('- HUGGINGFACE_API_KEY (完全免費)');
      console.log('💰 付費選項：');
      console.log('- PERPLEXITY_API_KEY');
      console.log('- OPENAI_API_KEY');
      console.log('- CLAUDE_API_KEY');
      process.exit(1);
    }
    
    console.log('✅ 環境變量檢查通過');
    console.log(`📊 AI 提供商: ${config.provider}`);
    
    // 顯示當前提供商的模型信息
    if (config.provider === 'mock' && hasMock) {
      console.log(`🤖 模型: mock-ai-v1.0`);
      console.log(`🆓 狀態: 完全免費，無需 API Key`);
    } else if (config.provider === 'openrouter' && hasOpenRouter) {
      console.log(`🤖 模型: ${config.openrouter.model}`);
      console.log(`🆓 狀態: 每月 $5 免費額度`);
    } else if (config.provider === 'huggingface' && hasHuggingFace) {
      console.log(`🤖 模型: ${config.huggingface.model}`);
      console.log(`🆓 狀態: 完全免費`);
    } else if (config.provider === 'groq' && hasGroq) {
      console.log(`🤖 模型: ${config.groq.model}`);
      console.log(`🆓 狀態: 完全免費`);
    } else if (config.provider === 'perplexity' && hasPerplexity) {
      console.log(`🤖 模型: ${config.perplexity.model}`);
      console.log(`💰 狀態: 付費服務`);
    } else if (config.provider === 'openai' && hasOpenAI) {
      console.log(`🤖 模型: ${config.openai.model}`);
      console.log(`💰 狀態: 付費服務`);
    } else if (config.provider === 'claude' && hasClaude) {
      console.log(`🤖 模型: ${config.claude.model}`);
      console.log(`💰 狀態: 付費服務`);
    }

    // 2. 初始化 AI 服務管理器
    console.log('\n🔧 初始化 AI 服務管理器...');
    const aiManager = createAIServiceManager(config);
    console.log('✅ AI 服務管理器初始化成功');

    // 3. 健康檢查
    console.log('\n🏥 執行健康檢查...');
    const healthStatus = await aiManager.healthCheck();
    console.log('健康狀態:', healthStatus);

    // 檢查當前提供商的健康狀態
    const currentProvider = config.provider;
    if (!healthStatus[currentProvider]) {
      console.error(`❌ ${currentProvider} 服務不健康！`);
      console.log('可用服務:', Object.keys(healthStatus).filter(key => healthStatus[key]));
      process.exit(1);
    }
    console.log(`✅ ${currentProvider} 服務健康`);

    // 4. 獲取智囊團成員
    console.log('\n👥 獲取智囊團成員...');
    const boardMembers = await prisma.boardMember.findMany({
      take: 2
    });
    
    if (boardMembers.length === 0) {
      console.log('⚠️  沒有找到智囊團成員，使用模擬數據...');
      // 使用模擬數據
      const mockMembers = [
        {
          id: '1',
          name: '史蒂夫·賈伯斯',
          field: '科技創新',
          coreBeliefs: '設計不僅是外觀，更是功能',
          systemPrompt: '你是史蒂夫·賈伯斯，蘋果公司的聯合創始人...'
        }
      ];
      boardMembers.push(...mockMembers);
    }
    
    console.log(`✅ 找到 ${boardMembers.length} 個智囊團成員`);

    // 5. 測試 AI 回應
    console.log('\n💬 測試 AI 回應...');
    const testContext = {
      userMessage: '如何創建一個成功的產品？',
      boardMembers: boardMembers,
      selectedMemberIds: [boardMembers[0].id],
      userLanguage: 'zh-TW',
      sessionHistory: []
    };

    console.log('📝 測試問題:', testContext.userMessage);
    console.log('👤 選中成員:', boardMembers[0].name);
    
    const response = await aiManager.generateResponse(testContext);
    
    console.log('\n🤖 AI 回應:');
    console.log('==============================');
    console.log(response.content);
    console.log('==============================');
    console.log(`⏱️  回應時間: ${response.metadata.responseTime}ms`);
    console.log(`🎯 置信度: ${response.metadata.confidence}`);
    console.log(`🔢 使用 Token: ${response.metadata.tokensUsed}`);

    // 6. 測試多成員回應
    console.log('\n👥 測試多成員回應...');
    const multiMemberContext = {
      userMessage: '投資和創新哪個更重要？',
      boardMembers: boardMembers,
      selectedMemberIds: boardMembers.map(m => m.id),
      userLanguage: 'zh-TW',
      sessionHistory: []
    };

    const multiResponse = await aiManager.generateResponse(multiMemberContext);
    
    console.log('\n🤖 多成員 AI 回應:');
    console.log('==============================');
    console.log(multiResponse.content);
    console.log('==============================');

    console.log('\n🎉 AI 整合測試完成！');
    console.log('✅ 所有功能正常運作');

  } catch (error) {
    console.error('\n❌ AI 整合測試失敗:');
    console.error(error.message);
    
    if (error.message.includes('API key')) {
      console.log('\n💡 解決方案:');
      console.log('1. 檢查 .env 文件中的 OPENAI_API_KEY');
      console.log('2. 確保 API Key 有效且有足夠的額度');
      console.log('3. 檢查網絡連接');
    }
    
    process.exit(1);
  } finally {
    // 關閉數據庫連接
    await prisma.$disconnect();
  }
}

// 運行測試
if (require.main === module) {
  testAIIntegration();
}

module.exports = { testAIIntegration };
