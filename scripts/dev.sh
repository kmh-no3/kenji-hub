#!/bin/bash

# 開発環境用スクリプト

echo "🚀 Kenji Hub 開発環境を起動します..."

# 既存のプロセスを停止
echo "📋 既存のプロセスを確認中..."
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️  ポート3000が使用中です。既存のプロセスを停止します..."
    kill $(lsof -ti:3000)
    sleep 2
fi

# Dockerコンテナを停止
echo "🐳 既存のDockerコンテナを停止中..."
docker-compose down

# Dockerコンテナを起動
echo "🐳 Dockerコンテナを起動中..."
docker-compose up dev
