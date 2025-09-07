# API 文檔

## 概述

我的董事會 API 提供完整的智囊團管理、聊天互動和用戶管理功能。

**Base URL**: `http://localhost:8000/api`

## 認證

API 使用 JWT (JSON Web Token) 進行認證。在請求頭中包含認證令牌：

```
Authorization: Bearer <your-jwt-token>
```

## 錯誤處理

所有 API 錯誤都遵循統一的格式：

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "錯誤描述",
  "details": {}
}
```

## 端點

### 認證 (Authentication)

#### POST /auth/register
註冊新用戶

**請求體**:
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "名字",
  "lastName": "姓氏",
  "language": "zh-TW"
}
```

**回應**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "username": "username",
      "firstName": "名字",
      "lastName": "姓氏",
      "language": "zh-TW",
      "planType": "FREE",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "token": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

#### POST /auth/login
用戶登入

**請求體**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**回應**:
```json
{
  "success": true,
  "data": {
    "user": { /* 用戶資訊 */ },
    "token": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

#### POST /auth/refresh
刷新令牌

**請求體**:
```json
{
  "refreshToken": "refresh_token"
}
```

### 用戶管理 (Users)

#### GET /users/profile
獲取當前用戶資料

**認證**: 需要

**回應**:
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username",
    "firstName": "名字",
    "lastName": "姓氏",
    "avatar": "avatar_url",
    "language": "zh-TW",
    "timezone": "Asia/Taipei",
    "planType": "PROFESSIONAL",
    "planExpiresAt": "2024-12-31T23:59:59Z",
    "dailyQueriesUsed": 5,
    "monthlyQueriesUsed": 150,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### PUT /users/profile
更新用戶資料

**認證**: 需要

**請求體**:
```json
{
  "firstName": "新名字",
  "lastName": "新姓氏",
  "language": "zh-CN",
  "timezone": "Asia/Shanghai"
}
```

### 智囊團成員 (Board Members)

#### GET /board-members
獲取智囊團成員列表

**查詢參數**:
- `page`: 頁碼 (預設: 1)
- `limit`: 每頁數量 (預設: 10)
- `field`: 領域篩選
- `search`: 搜尋關鍵字
- `isPremium`: 是否為付費內容

**回應**:
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "member_id",
        "name": "史蒂夫·賈伯斯",
        "nameEn": "Steve Jobs",
        "field": "technology",
        "bio": "蘋果公司聯合創始人...",
        "achievements": ["創建蘋果公司", "推出 iPhone"],
        "coreBeliefs": "設計不僅是外觀，更是功能...",
        "famousQuotes": ["Stay hungry, stay foolish."],
        "avatar": "avatar_url",
        "isPremium": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### GET /board-members/:id
獲取特定智囊團成員詳情

**回應**:
```json
{
  "success": true,
  "data": {
    "id": "member_id",
    "name": "史蒂夫·賈伯斯",
    "nameEn": "Steve Jobs",
    "nameZh": "史蒂夫·乔布斯",
    "birthYear": 1955,
    "deathYear": 2011,
    "nationality": "美國",
    "field": "technology",
    "bio": "蘋果公司聯合創始人...",
    "achievements": ["創建蘋果公司"],
    "coreBeliefs": "設計不僅是外觀...",
    "famousQuotes": ["Stay hungry, stay foolish."],
    "works": ["iPhone", "iPad"],
    "speeches": ["史丹佛大學畢業演講"],
    "links": {
      "wikipedia": "https://en.wikipedia.org/wiki/Steve_Jobs"
    },
    "avatar": "avatar_url",
    "images": ["image1.jpg", "image2.jpg"],
    "systemPrompt": "你是史蒂夫·賈伯斯...",
    "isPremium": false
  }
}
```

### 用戶智囊團 (User Board)

#### GET /users/board
獲取當前用戶的智囊團

**認證**: 需要

**回應**:
```json
{
  "success": true,
  "data": [
    {
      "id": "user_board_id",
      "userId": "user_id",
      "memberId": "member_id",
      "position": 1,
      "isActive": true,
      "member": {
        "id": "member_id",
        "name": "史蒂夫·賈伯斯",
        "field": "technology",
        "avatar": "avatar_url"
      }
    }
  ]
}
```

#### POST /users/board
添加成員到智囊團

**認證**: 需要

**請求體**:
```json
{
  "memberId": "member_id",
  "position": 1
}
```

#### DELETE /users/board/:memberId
從智囊團移除成員

**認證**: 需要

#### PUT /users/board/:memberId/position
更新成員在智囊團中的位置

**認證**: 需要

**請求體**:
```json
{
  "position": 2
}
```

### 聊天 (Chat)

#### GET /chat/sessions
獲取聊天會話列表

**認證**: 需要

**回應**:
```json
{
  "success": true,
  "data": [
    {
      "id": "session_id",
      "title": "會話標題",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### POST /chat/sessions
創建新聊天會話

**認證**: 需要

**請求體**:
```json
{
  "title": "新會話"
}
```

#### GET /chat/sessions/:id/messages
獲取會話訊息

**認證**: 需要

**回應**:
```json
{
  "success": true,
  "data": [
    {
      "id": "message_id",
      "role": "USER",
      "content": "用戶問題",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": "message_id",
      "role": "ASSISTANT",
      "content": "AI 回應",
      "memberId": "member_id",
      "member": {
        "id": "member_id",
        "name": "史蒂夫·賈伯斯",
        "avatar": "avatar_url"
      },
      "createdAt": "2024-01-01T00:01:00Z"
    }
  ]
}
```

#### POST /chat/sessions/:id/messages
發送訊息

**認證**: 需要

**請求體**:
```json
{
  "content": "用戶問題",
  "memberIds": ["member_id1", "member_id2"]
}
```

**回應**:
```json
{
  "success": true,
  "data": {
    "message": {
      "id": "message_id",
      "role": "ASSISTANT",
      "content": "AI 回應",
      "memberId": "member_id",
      "createdAt": "2024-01-01T00:01:00Z"
    },
    "session": {
      "id": "session_id",
      "title": "會話標題"
    }
  }
}
```

### 訂閱 (Subscriptions)

#### GET /subscriptions
獲取當前用戶的訂閱資訊

**認證**: 需要

**回應**:
```json
{
  "success": true,
  "data": {
    "id": "subscription_id",
    "planType": "PROFESSIONAL",
    "status": "ACTIVE",
    "currentPeriodStart": "2024-01-01T00:00:00Z",
    "currentPeriodEnd": "2024-02-01T00:00:00Z"
  }
}
```

#### POST /subscriptions
創建新訂閱

**認證**: 需要

**請求體**:
```json
{
  "planType": "PROFESSIONAL",
  "paymentMethodId": "pm_1234567890"
}
```

#### PUT /subscriptions
更新訂閱

**認證**: 需要

**請求體**:
```json
{
  "planType": "ENTERPRISE"
}
```

#### DELETE /subscriptions
取消訂閱

**認證**: 需要

### Webhooks

#### POST /webhooks/stripe
Stripe 支付 webhook

用於處理 Stripe 的支付事件，如訂閱創建、更新、取消等。

## 狀態碼

- `200` - 成功
- `201` - 創建成功
- `400` - 請求錯誤
- `401` - 未認證
- `403` - 權限不足
- `404` - 資源不存在
- `429` - 請求過於頻繁
- `500` - 服務器錯誤

## 速率限制

API 有速率限制：
- 一般請求：每 15 分鐘 100 次
- 認證請求：每 15 分鐘 10 次
- 聊天請求：根據用戶計劃限制

## 分頁

支援分頁的端點使用以下查詢參數：
- `page`: 頁碼 (從 1 開始)
- `limit`: 每頁數量 (預設 10，最大 100)

分頁回應包含 `pagination` 對象：
```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```
