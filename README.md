# 我的董事會 (My Board of Directors)

一個讓用戶選擇已故或當代名人作為智囊團成員的AI問答應用。

[![項目狀態](https://img.shields.io/badge/狀態-開發中-yellow)](https://github.com/your-repo)
[![完成度](https://img.shields.io/badge/完成度-70%25-green)](https://github.com/your-repo)
[![最後更新](https://img.shields.io/badge/最後更新-2025--01--28-blue)](https://github.com/your-repo)

## 功能特色

- 🧠 **智囊團成員資料庫管理** - 豐富的歷史人物資料庫
- 💬 **AI模擬名人思考風格的問答系統** - 個性化AI回應
- 👥 **用戶自定義智囊團組建** - 自由選擇智囊團成員
- 💰 **分級付費功能** - 多層次訂閱計劃
- 🌍 **多語言支援** - 繁中/簡中/英文
- 📱 **現代化響應式界面** - 適配所有設備
- 🔧 **完善的開發工具** - 數據庫工具、測試服務器
- 🚀 **高性能架構** - 優化的數據庫查詢和AI服務

## 技術棧

### 前端
- Next.js 14 + TypeScript
- Tailwind CSS + shadcn/ui
- Zustand (狀態管理)
- next-i18next (國際化)

### 後端
- Node.js + Express + TypeScript
- Prisma + PostgreSQL
- JWT + bcrypt (身份驗證)
- Stripe (支付處理)

### AI整合
- OpenAI API (主要)
- LangChain (AI應用框架)
- 可擴展的AI提供商架構

## 項目結構

```
├── frontend/          # Next.js 前端應用
├── backend/           # Express 後端API
├── shared/            # 共享類型和工具
├── docs/              # 文檔
└── docker/            # Docker 配置
```

## 快速開始

### 開發環境設置

1. **安裝依賴**
```bash
# 前端
cd frontend && npm install

# 後端
cd backend && npm install
```

2. **環境變量設置**
```bash
# 複製環境變量模板
cp env.example .env.local
```

3. **數據庫初始化**
```bash
# 生成 Prisma 客戶端
cd backend && npx prisma generate

# 運行數據庫遷移
cd backend && npx prisma db push

# 填充測試數據
cd backend && npx prisma db seed
```

4. **啟動開發服務器**
```bash
# 前端 (http://localhost:3000)
cd frontend && npm run dev

# 後端主服務器 (http://localhost:8000)
cd backend && npm run dev

# 測試服務器 (http://localhost:8001)
cd backend && node test-server.js
```

### 服務器端點

- **前端應用**: http://localhost:3000
- **後端API**: http://localhost:8000/api
- **測試服務器**: http://localhost:8001/api
- **健康檢查**: http://localhost:8000/health

## 最新進展 (2025-01-28)

### 🎉 今日成就
- ✅ **AI 聊天功能完全實現** - 實現完整的對話系統和 API 端點
- ✅ **Mock AI 智能升級** - 支持問題類型識別和個性化回應
- ✅ **首頁對話框修復** - 首頁和聊天頁面都完全可用
- ✅ **測試環境完善** - 創建獨立測試頁面和完整錯誤處理
- ✅ **測試環境優化** - 建立快速開發測試環境

### 📊 進度提升
- 總體進度：55% → 70% (+15%)
- AI 整合：35% → 70% (+35%)
- 前端開發：55% → 70% (+15%)
- 後端開發：55% → 70% (+15%)

### 🎯 下週計劃
1. 升級到真實 AI 提供商 (OpenRouter)
2. 完善用戶認證系統
3. 添加更多智囊團成員
4. 整合測試服務器與主服務器

## 項目狀態

### 已完成功能 ✅
- 基礎架構搭建
- 數據庫設計和工具
- 核心 API 端點
- 前端聊天界面
- AI 服務架構
- 測試環境

### 進行中功能 🔄
- 用戶認證系統
- AI 回應個性化
- 付費訂閱系統

### 計劃功能 ⏳
- 更多智囊團成員
- 企業功能
- 部署優化

## 部署

- **前端**: Vercel
- **後端**: Railway/Render
- **資料庫**: Supabase
- **AI 服務**: OpenAI API

## 文檔

- [API 文檔](docs/API.md)
- [進度報告](docs/進度報告.md)
- [設計概念](docs/設計概念.md)
- [計劃大綱](docs/計劃大綱.md)

## 授權

MIT License
