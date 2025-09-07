#!/bin/bash

# 快速開始腳本 - 無需 API Key
echo "🚀 我的董事會 - 快速開始"
echo "================================"

# 檢查是否在正確的目錄
if [ ! -f "package.json" ]; then
    echo "❌ 請在項目根目錄運行此腳本"
    exit 1
fi

echo "📋 設置 Mock AI 提供商 (完全免費，無需 API Key)..."

# 創建 .env 文件
if [ ! -f ".env" ]; then
    echo "📝 創建 .env 文件..."
    cp env.example .env
    echo "✅ .env 文件已創建"
else
    echo "✅ .env 文件已存在"
fi

# 設置 Mock AI 提供商
echo "🤖 設置 Mock AI 提供商..."
if ! grep -q "AI_PROVIDER=mock" .env; then
    # 如果沒有設置 AI_PROVIDER，則設置為 mock
    if ! grep -q "AI_PROVIDER=" .env; then
        echo "AI_PROVIDER=mock" >> .env
        echo "✅ 已設置 AI_PROVIDER=mock"
    else
        # 替換現有的 AI_PROVIDER
        sed -i.bak 's/AI_PROVIDER=.*/AI_PROVIDER=mock/' .env
        echo "✅ 已更新 AI_PROVIDER=mock"
    fi
else
    echo "✅ AI_PROVIDER 已設置為 mock"
fi

echo ""
echo "🎉 設置完成！"
echo ""
echo "📊 當前配置："
echo "- AI 提供商: Mock (完全免費)"
echo "- 無需 API Key"
echo "- 可以立即開始測試"
echo ""
echo "🚀 下一步："
echo "1. 進入後端目錄: cd backend"
echo "2. 安裝依賴: npm install"
echo "3. 測試 AI 功能: npm run test:ai"
echo "4. 啟動開發服務器: npm run dev"
echo ""
echo "💡 提示："
echo "- Mock AI 會生成模擬的智囊團回應"
echo "- 適合開發和測試階段使用"
echo "- 後續可以添加真實的 AI 提供商"
echo ""
echo "📚 更多選項："
echo "- 查看免費 AI 設置指南: docs/免費AI設置指南.md"
echo "- 查看 AI 設置指南: docs/AI設置指南.md"
echo ""
echo "🎯 準備開始您的智囊團之旅！"
