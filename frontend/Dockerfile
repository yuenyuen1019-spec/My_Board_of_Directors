# 使用 Node.js 18 Alpine 作為基礎鏡像
FROM node:18-alpine AS base

# 安裝必要的依賴
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 安裝依賴
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# 構建應用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 設置環境變量
ENV NEXT_TELEMETRY_DISABLED 1

# 構建應用
RUN npm run build

# 生產環境
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 創建非 root 用戶
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 複製構建產物
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
