# 免費 AI API 設置指南

## 🆓 免費 AI 提供商

### 1. Groq (推薦) ⭐
- **完全免費** - 無需信用卡
- **超快速度** - 毫秒級回應
- **高質量模型** - Llama 3.1, Mixtral 等
- **無限制使用** - 適合開發和測試

#### 獲取 API Key：
1. 前往 [Groq Console](https://console.groq.com/)
2. 註冊帳戶（免費）
3. 點擊 "Create API Key"
4. 複製生成的 API Key

#### 設置：
```bash
AI_PROVIDER=groq
GROQ_API_KEY=您的API_KEY
```

### 2. OpenRouter (推薦) ⭐
- **免費額度** - 每月 $5 免費額度
- **多種模型** - 500+ AI 模型
- **統一 API** - 一個 API 訪問多個模型
- **高質量** - 包含最新的開源模型

#### 獲取 API Key：
1. 前往 [OpenRouter](https://openrouter.ai/)
2. 註冊帳戶
3. 前往 API Keys 頁面
4. 創建新的 API Key

#### 設置：
```bash
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=您的API_KEY
```

### 3. Hugging Face (免費)
- **完全免費** - 開源模型
- **多種選擇** - 數千個模型
- **無需信用卡** - 直接使用
- **社區支持** - 活躍的開源社區

#### 獲取 API Key：
1. 前往 [Hugging Face](https://huggingface.co/)
2. 註冊帳戶
3. 前往 Settings > Access Tokens
4. 創建新的 Token

### 4. Replicate (免費額度)
- **免費額度** - 每月 $5 免費額度
- **開源模型** - 最新的開源 AI 模型
- **簡單易用** - 清晰的 API 文檔
- **高質量** - 經過優化的模型

#### 獲取 API Key：
1. 前往 [Replicate](https://replicate.com/)
2. 註冊帳戶
3. 前往 Account > API Tokens
4. 創建新的 API Token

## 🚀 快速設置

### 步驟 1: 選擇免費提供商

#### 選項 A: Groq (最推薦)
```bash
# 設置 Groq 為主要提供商
AI_PROVIDER=groq
GROQ_API_KEY=您的API_KEY
```

#### 選項 B: OpenRouter
```bash
# 設置 OpenRouter 為主要提供商
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=您的API_KEY
```

### 步驟 2: 測試設置

```bash
# 進入後端目錄
cd backend

# 運行 AI 測試
npm run test:ai
```

## 📊 免費提供商比較

| 提供商 | 免費額度 | 速度 | 質量 | 易用性 | 推薦度 |
|--------|----------|------|------|--------|--------|
| Groq | 無限制 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| OpenRouter | $5/月 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Hugging Face | 無限制 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Replicate | $5/月 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

## 🔧 詳細設置

### Groq 設置

```bash
# 基本設置
AI_PROVIDER=groq
GROQ_API_KEY=您的API_KEY

# 可選：自定義模型
GROQ_MODEL=llama3-8b-8192  # 或 llama3-70b-8192, mixtral-8x7b-32768
GROQ_TEMPERATURE=0.7
GROQ_MAX_TOKENS=2000
```

**可用模型：**
- `llama3-8b-8192` - 快速，適合一般用途
- `llama3-70b-8192` - 高質量，較慢
- `mixtral-8x7b-32768` - 平衡性能和質量

### OpenRouter 設置

```bash
# 基本設置
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=您的API_KEY

# 可選：自定義模型
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free
OPENROUTER_TEMPERATURE=0.7
OPENROUTER_MAX_TOKENS=2000
```

**免費模型：**
- `meta-llama/llama-3.1-8b-instruct:free` - Llama 3.1 8B
- `microsoft/phi-3-mini-128k-instruct:free` - Phi-3 Mini
- `google/gemma-2-9b-it:free` - Gemma 2 9B

## 🎯 使用建議

### 開發階段
- **推薦使用 Groq** - 無限制，速度快
- 適合測試和開發
- 無需擔心額度限制

### 生產環境
- **推薦使用 OpenRouter** - 有免費額度，質量高
- 監控使用量
- 考慮升級到付費計劃

### 混合使用
- 可以同時配置多個提供商
- 系統會自動選擇可用的提供商
- 實現故障轉移

## 🔍 故障排除

### 常見問題

#### 1. API Key 無效
```
❌ API Key 未設置或無效
```
**解決方案**: 檢查 API Key 是否正確複製

#### 2. 額度不足
```
❌ 額度不足
```
**解決方案**: 
- Groq: 檢查是否有使用限制
- OpenRouter: 檢查免費額度使用情況

#### 3. 模型不可用
```
❌ 模型不可用
```
**解決方案**: 嘗試使用不同的模型

### 調試技巧

```bash
# 啟用詳細日誌
NODE_ENV=development
DEBUG=ai:*

# 檢查健康狀態
curl http://localhost:8000/api/ai/health
```

## 💡 優化建議

### 1. 模型選擇
- **快速回應**: 使用 `llama3-8b-8192`
- **高質量**: 使用 `llama3-70b-8192`
- **平衡**: 使用 `mixtral-8x7b-32768`

### 2. 參數調優
```bash
# 降低溫度以獲得更一致的回答
GROQ_TEMPERATURE=0.3

# 減少最大 token 數以節省額度
GROQ_MAX_TOKENS=1000
```

### 3. 緩存策略
- 實現回應緩存
- 避免重複請求
- 優化提示詞長度

## 📈 監控和限制

### Groq 限制
- 無明確的使用限制
- 但可能有隱藏的速率限制
- 建議監控使用情況

### OpenRouter 限制
- 每月 $5 免費額度
- 超出後需要付費
- 可以設置使用警報

## 🔄 升級路徑

### 從免費到付費
1. **Groq**: 目前完全免費，未來可能推出付費計劃
2. **OpenRouter**: 可以升級到付費計劃獲得更多額度
3. **其他提供商**: 可以添加 OpenAI、Perplexity 等付費服務

### 混合策略
```bash
# 主要使用免費服務
AI_PROVIDER=groq

# 備用付費服務
OPENAI_API_KEY=備用API_KEY
PERPLEXITY_API_KEY=備用API_KEY
```

## 🎉 開始使用

1. **選擇提供商**: 推薦從 Groq 開始
2. **獲取 API Key**: 按照上述步驟
3. **配置環境**: 設置環境變量
4. **測試功能**: 運行測試腳本
5. **開始開發**: 享受免費的 AI 功能！

---

**最後更新**: 2025-01-27  
**版本**: v1.1
