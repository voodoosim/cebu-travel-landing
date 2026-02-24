#!/bin/bash
set -e

REMOTE="main"
REMOTE_DIR="/root/cebuguide"

echo "=== Deploying cebuguide to VPS ==="

# 1. Push latest code
echo "[1/4] Pushing to GitHub..."
git push origin main

# 2. Pull on server and rebuild
echo "[2/4] Pulling on server..."
ssh $REMOTE "cd $REMOTE_DIR && git pull origin main"

# 3. Build and restart
echo "[3/4] Building and restarting..."
ssh $REMOTE "cd $REMOTE_DIR && docker compose up -d --build"

# 4. Run migrations and seed
echo "[4/4] Running migrations..."
ssh $REMOTE "cd $REMOTE_DIR && docker compose exec nextjs npx prisma migrate deploy"

echo "=== Deploy complete ==="
echo "Check: https://cebu.sasori.dev"
