# 我的董事會 (My Board of Directors)

一個讓用戶選擇已故或當代名人作為智囊團成員的AI問答應用。

## 功能特色

- 🧠 智囊團成員資料庫管理
- 💬 AI模擬名人思考風格的問答系統
- 👥 用戶自定義智囊團組建
- 💰 分級付費功能
- 🌍 多語言支援（繁中/簡中/英文）
- 📱 現代化響應式界面

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

1. 安裝依賴
```bash
# 前端
cd frontend && npm install

# 後端
cd backend && npm install
```

2. 環境變量設置
```bash
# 複製環境變量模板
cp .env.example .env.local
```

3. 啟動開發服務器
```bash
# 前端 (http://localhost:3000)
cd frontend && npm run dev

# 後端 (http://localhost:8000)
cd backend && npm run dev
```

## 部署

- 前端: Vercel
- 後端: Railway/Render
- 資料庫: Supabase

## 授權

MIT License
