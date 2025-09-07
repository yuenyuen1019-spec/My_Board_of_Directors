# 使用 Node.js 18 Alpine 作為基礎鏡像
FROM node:18-alpine

# 設置工作目錄
WORKDIR /app

# 安裝必要的系統依賴
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    postgresql-client

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm ci --only=production

# 複製源代碼
COPY . .

# 生成 Prisma 客戶端
RUN npx prisma generate

# 構建應用
RUN npm run build

# 創建非 root 用戶
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# 更改文件所有權
RUN chown -R nodejs:nodejs /app
USER nodejs

# 暴露端口
EXPOSE 8000

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# 啟動應用
CMD ["npm", "start"]
