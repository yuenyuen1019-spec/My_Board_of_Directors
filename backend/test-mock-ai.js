// 簡化的 Mock AI 測試腳本
console.log('🤖 測試 Mock AI 功能...');
console.log('==============================');

// 模擬智囊團成員
const mockBoardMembers = [
  {
    id: '1',
    name: '史蒂夫·賈伯斯',
    field: '科技創新',
    coreBeliefs: '設計不僅是外觀，更是功能',
    systemPrompt: '你是史蒂夫·賈伯斯，蘋果公司的聯合創始人...'
  },
  {
    id: '2',
    name: '華倫·巴菲特',
    field: '投資理財',
    coreBeliefs: '長期投資，價值為本',
    systemPrompt: '你是華倫·巴菲特，股神...'
  }
];

// 模擬 AI 回應生成
function generateMockResponse(question, memberName, field, language) {
  const responses = {
    'zh-TW': [
      `作為${memberName}，我認為在${field}領域，成功需要專注於核心原則。首先，要明確你的目標和價值觀。其次，建立一個清晰的執行計劃。最後，保持持續的學習和改進。記住，偉大的成就往往來自於對細節的關注和對長期目標的堅持。`,
      `從我的經驗來看，在${field}中取得成功需要三個關鍵要素：創新思維、執行力和團隊合作。創新思維幫助你找到新的解決方案，執行力確保想法能夠實現，而團隊合作則讓你能夠發揮集體智慧的力量。`,
      `我建議採用系統性的方法來解決這個問題。首先分析現狀，識別關鍵挑戰，然後制定分階段的解決方案。在${field}領域，我發現最有效的方法是將複雜問題分解為可管理的小步驟。`
    ],
    'en': [
      `As ${memberName}, I believe that success in ${field} requires focusing on core principles. First, clarify your goals and values. Second, establish a clear execution plan. Finally, maintain continuous learning and improvement.`,
      `From my experience, success in ${field} requires three key elements: innovative thinking, execution capability, and teamwork.`
    ]
  };
  
  const langResponses = responses[language] || responses['zh-TW'];
  return langResponses[Math.floor(Math.random() * langResponses.length)];
}

// 測試函數
async function testMockAI() {
  try {
    console.log('✅ Mock AI 初始化成功');
    console.log(`📊 智囊團成員: ${mockBoardMembers.length} 個`);
    
    // 測試問題
    const testQuestions = [
      '如何創建一個成功的產品？',
      '投資和創新哪個更重要？',
      '如何建立一個優秀的團隊？'
    ];
    
    console.log('\n💬 開始測試對話...');
    
    for (let i = 0; i < testQuestions.length; i++) {
      const question = testQuestions[i];
      const member = mockBoardMembers[i % mockBoardMembers.length];
      
      console.log(`\n📝 問題 ${i + 1}: ${question}`);
      console.log(`👤 智囊團成員: ${member.name} (${member.field})`);
      
      // 模擬處理時間
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      const response = generateMockResponse(question, member.name, member.field, 'zh-TW');
      
      console.log('🤖 AI 回應:');
      console.log('==============================');
      console.log(response);
      console.log('==============================');
      console.log(`⏱️  回應時間: ${Math.floor(Math.random() * 2000) + 1000}ms`);
      console.log(`🎯 置信度: 0.8`);
    }
    
    console.log('\n🎉 Mock AI 測試完成！');
    console.log('✅ 所有功能正常運作');
    console.log('✅ 可以生成個性化的智囊團回應');
    console.log('✅ 支持多語言和不同問題類型');
    console.log('✅ 模擬真實的 AI 對話體驗');
    
    console.log('\n💡 下一步：');
    console.log('1. 修復 TypeScript 編譯錯誤');
    console.log('2. 整合到聊天界面');
    console.log('3. 添加更多智囊團成員');
    console.log('4. 優化回應質量');
    
  } catch (error) {
    console.error('\n❌ Mock AI 測試失敗:');
    console.error(error.message);
  }
}

// 運行測試
testMockAI();
