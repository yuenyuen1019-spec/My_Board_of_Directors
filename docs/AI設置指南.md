# AI 設置指南

## 概述

本指南將幫助您設置 AI 整合功能，支持多種 AI 提供商，包括 Perplexity AI、OpenAI 和 Claude。

## 支持的 AI 提供商

### 1. Perplexity AI (推薦) 🌟
- **優點**: 更便宜、支持實時搜索、回答更準確
- **缺點**: 相對較新的服務
- **價格**: 通常比 OpenAI 便宜 50-70%

### 2. OpenAI
- **優點**: 功能強大、穩定、廣泛支持
- **缺點**: 較貴
- **價格**: 較高，但功能完整

### 3. Claude (Anthropic)
- **優點**: 高質量回答、安全性好
- **缺點**: 可用性有限
- **價格**: 中等

## 快速設置

### 步驟 1: 創建環境變量文件

```bash
# 複製環境變量模板
cp env.example .env
```

### 步驟 2: 選擇 AI 提供商

#### 選項 A: Perplexity AI (推薦)

1. 前往 [Perplexity API 設置頁面](https://www.perplexity.ai/settings/api)
2. 登入您的帳戶
3. 點擊 "Create API Key"
4. 複製生成的 API Key
5. 編輯 `.env` 文件：

```bash
# 設置 Perplexity 為主要提供商
AI_PROVIDER=perplexity
PERPLEXITY_API_KEY=您的API_KEY

# 可選：自定義模型設置
PERPLEXITY_MODEL=llama-3.1-sonar-small-128k-online
PERPLEXITY_TEMPERATURE=0.7
PERPLEXITY_MAX_TOKENS=2000
```

#### 選項 B: OpenAI

1. 前往 [OpenAI API Keys 頁面](https://platform.openai.com/api-keys)
2. 登入您的帳戶
3. 點擊 "Create new secret key"
4. 複製生成的 API Key
5. 編輯 `.env` 文件：

```bash
# 設置 OpenAI 為主要提供商
AI_PROVIDER=openai
OPENAI_API_KEY=您的API_KEY

# 可選：自定義模型設置
OPENAI_MODEL=gpt-4
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=2000
```

#### 選項 C: Claude

1. 前往 [Anthropic Console](https://console.anthropic.com/)
2. 登入您的帳戶
3. 創建 API Key
4. 編輯 `.env` 文件：

```bash
# 設置 Claude 為主要提供商
AI_PROVIDER=claude
CLAUDE_API_KEY=您的API_KEY

# 可選：自定義模型設置
CLAUDE_MODEL=claude-3-sonnet-20240229
CLAUDE_TEMPERATURE=0.7
CLAUDE_MAX_TOKENS=2000
```

### 步驟 3: 測試設置

```bash
# 進入後端目錄
cd backend

# 運行 AI 測試
npm run test:ai
```

## 自動設置腳本

您也可以使用自動設置腳本：

```bash
# 運行設置腳本
cd backend
npm run setup:ai
```

腳本會引導您完成整個設置過程。

## 環境變量說明

### 基本配置

```bash
# AI 提供商選擇
AI_PROVIDER=perplexity  # openai | perplexity | claude | local

# 通用設置
AI_DEFAULT_TEMPERATURE=0.7
AI_DEFAULT_MAX_TOKENS=2000
AI_DEFAULT_TIMEOUT=30000
```

### Perplexity 專用設置

```bash
PERPLEXITY_API_KEY=您的API_KEY
PERPLEXITY_MODEL=llama-3.1-sonar-small-128k-online
PERPLEXITY_TEMPERATURE=0.7
PERPLEXITY_MAX_TOKENS=2000
PERPLEXITY_TIMEOUT=30000
```

### OpenAI 專用設置

```bash
OPENAI_API_KEY=您的API_KEY
OPENAI_MODEL=gpt-4
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=2000
OPENAI_TIMEOUT=30000
```

### Claude 專用設置

```bash
CLAUDE_API_KEY=您的API_KEY
CLAUDE_MODEL=claude-3-sonnet-20240229
CLAUDE_TEMPERATURE=0.7
CLAUDE_MAX_TOKENS=2000
CLAUDE_TIMEOUT=30000
```

## 模型選擇建議

### Perplexity 模型

- `llama-3.1-sonar-small-128k-online` (推薦) - 平衡性能和成本
- `llama-3.1-sonar-large-128k-online` - 更高質量，但更貴
- `llama-3.1-sonar-huge-128k-online` - 最高質量，最貴

### OpenAI 模型

- `gpt-4` (推薦) - 最高質量
- `gpt-3.5-turbo` - 更便宜，但質量較低

### Claude 模型

- `claude-3-sonnet-20240229` (推薦) - 平衡性能和成本
- `claude-3-opus-20240229` - 最高質量
- `claude-3-haiku-20240307` - 最便宜

## 故障排除

### 常見問題

#### 1. API Key 無效
```
❌ API Key 未設置或無效
```
**解決方案**: 檢查 API Key 是否正確複製，確保沒有多餘的空格

#### 2. 網絡連接問題
```
❌ 網絡連接失敗
```
**解決方案**: 檢查網絡連接，確保可以訪問 AI 提供商的 API

#### 3. 額度不足
```
❌ 額度不足
```
**解決方案**: 檢查您的 AI 提供商帳戶餘額

#### 4. 模型不可用
```
❌ 模型不可用
```
**解決方案**: 嘗試使用不同的模型，或檢查模型名稱是否正確

### 調試模式

啟用詳細日誌：

```bash
# 設置調試模式
NODE_ENV=development
DEBUG=ai:*
```

### 健康檢查

```bash
# 檢查 AI 服務健康狀態
curl http://localhost:8000/api/ai/health
```

## 性能優化

### 1. 調整參數

```bash
# 降低溫度以獲得更一致的回答
AI_DEFAULT_TEMPERATURE=0.3

# 減少最大 token 數以節省成本
AI_DEFAULT_MAX_TOKENS=1000

# 增加超時時間以處理複雜問題
AI_DEFAULT_TIMEOUT=60000
```

### 2. 緩存設置

```bash
# 啟用 Redis 緩存 (可選)
REDIS_URL=redis://localhost:6379
```

### 3. 批量處理

對於大量請求，考慮使用批量處理來提高效率。

## 安全注意事項

### 1. API Key 保護

- 永遠不要將 API Key 提交到版本控制系統
- 使用環境變量存儲 API Key
- 定期輪換 API Key

### 2. 訪問控制

- 限制 API 使用量
- 監控異常使用模式
- 設置適當的速率限制

### 3. 數據隱私

- 避免在提示詞中包含敏感信息
- 了解 AI 提供商的數據使用政策
- 考慮使用本地模型處理敏感數據

## 成本優化

### 1. 選擇合適的模型

- 對於簡單問題，使用較便宜的模型
- 對於複雜問題，使用高質量模型
- 根據實際需求調整模型

### 2. 優化提示詞

- 使用清晰、簡潔的提示詞
- 避免不必要的重複
- 設置適當的上下文長度

### 3. 監控使用量

- 定期檢查 API 使用量
- 設置使用量警報
- 優化請求頻率

## 支援

如果您遇到問題，請：

1. 檢查本指南的故障排除部分
2. 查看項目文檔
3. 提交 Issue 到項目倉庫

---

**最後更新**: 2025-01-27  
**版本**: v1.1
