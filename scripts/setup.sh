#!/bin/bash

# 我的董事會 App 設置腳本
echo "🚀 開始設置我的董事會 App..."

# 檢查必要的工具
check_requirements() {
    echo "📋 檢查系統要求..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安裝，請先安裝 Node.js 18+"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm 未安裝，請先安裝 npm"
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        echo "⚠️  Docker 未安裝，將跳過 Docker 相關設置"
        DOCKER_AVAILABLE=false
    else
        DOCKER_AVAILABLE=true
    fi
    
    echo "✅ 系統要求檢查完成"
}

# 設置環境變量
setup_env() {
    echo "🔧 設置環境變量..."
    
    if [ ! -f .env ]; then
        cp env.example .env
        echo "📝 已創建 .env 文件，請編輯其中的配置"
    else
        echo "📝 .env 文件已存在"
    fi
    
    echo "⚠️  請確保在 .env 文件中設置以下變量："
    echo "   - OPENAI_API_KEY"
    echo "   - STRIPE_SECRET_KEY"
    echo "   - STRIPE_PUBLISHABLE_KEY"
    echo "   - JWT_SECRET"
}

# 安裝前端依賴
install_frontend() {
    echo "📦 安裝前端依賴..."
    cd frontend
    npm install
    cd ..
    echo "✅ 前端依賴安裝完成"
}

# 安裝後端依賴
install_backend() {
    echo "📦 安裝後端依賴..."
    cd backend
    npm install
    cd ..
    echo "✅ 後端依賴安裝完成"
}

# 設置資料庫
setup_database() {
    echo "🗄️  設置資料庫..."
    
    if [ "$DOCKER_AVAILABLE" = true ]; then
        echo "🐳 使用 Docker 啟動資料庫..."
        docker-compose up -d postgres redis
        sleep 10
    else
        echo "⚠️  請手動設置 PostgreSQL 和 Redis"
        echo "   PostgreSQL: localhost:5432"
        echo "   Redis: localhost:6379"
    fi
    
    cd backend
    echo "🔄 運行資料庫遷移..."
    npx prisma migrate dev --name init
    echo "🌱 種子資料庫..."
    npm run db:seed
    cd ..
    echo "✅ 資料庫設置完成"
}

# 構建項目
build_project() {
    echo "🔨 構建項目..."
    
    echo "構建後端..."
    cd backend
    npm run build
    cd ..
    
    echo "構建前端..."
    cd frontend
    npm run build
    cd ..
    
    echo "✅ 項目構建完成"
}

# 啟動開發服務器
start_dev() {
    echo "🚀 啟動開發服務器..."
    
    if [ "$DOCKER_AVAILABLE" = true ]; then
        echo "🐳 使用 Docker Compose 啟動所有服務..."
        docker-compose up
    else
        echo "📱 手動啟動服務..."
        echo "後端: cd backend && npm run dev"
        echo "前端: cd frontend && npm run dev"
    fi
}

# 主函數
main() {
    check_requirements
    setup_env
    install_frontend
    install_backend
    setup_database
    build_project
    
    echo ""
    echo "🎉 設置完成！"
    echo ""
    echo "📋 下一步："
    echo "1. 編輯 .env 文件，設置必要的 API 密鑰"
    echo "2. 運行 ./scripts/start-dev.sh 啟動開發服務器"
    echo "3. 訪問 http://localhost:3000 查看應用"
    echo ""
    echo "📚 文檔："
    echo "- README.md - 項目說明"
    echo "- docs/ - 詳細文檔"
    echo ""
}

# 執行主函數
main "$@"
