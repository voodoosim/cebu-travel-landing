#!/bin/bash
set -e

# Vultr API로 세부.com 전용 VPS 생성
# 사용법: VULTR_API_KEY=xxx bash scripts/create-vps.sh

API_KEY="${VULTR_API_KEY:-$(grep VULTR_API_KEY /home/sasori/workspace/bots/proxybot/.env 2>/dev/null | cut -d= -f2)}"

if [ -z "$API_KEY" ]; then
  echo "VULTR_API_KEY가 필요합니다"
  exit 1
fi

HEADERS=(-H "Authorization: Bearer $API_KEY" -H "Content-Type: application/json")

# 설정
REGION="nrt"           # 도쿄 (한국에서 가장 가까운 Vultr 리전)
PLAN="vc2-1c-1gb"      # 1 vCPU, 1GB RAM, 25GB SSD — $6/mo
OS_ID=2284             # Ubuntu 24.04 LTS
LABEL="cebuguide"

echo "=== 세부.com VPS 생성 ==="
echo "리전: $REGION (도쿄)"
echo "플랜: $PLAN (1vCPU/1GB/$6mo)"
echo ""

# SSH 키 목록 확인
echo "[1/4] SSH 키 확인..."
SSH_KEYS=$(curl -s "https://api.vultr.com/v2/ssh-keys" "${HEADERS[@]}")
SSH_KEY_ID=$(echo "$SSH_KEYS" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for key in data.get('ssh_keys', []):
    if 'wsl' in key.get('name', '').lower() or 'ed25519' in key.get('name', '').lower():
        print(key['id'])
        break
" 2>/dev/null || echo "")

if [ -z "$SSH_KEY_ID" ]; then
  echo "WSL SSH 키를 찾을 수 없습니다. 등록된 키 목록:"
  echo "$SSH_KEYS" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for key in data.get('ssh_keys', []):
    print(f\"  - {key['name']} ({key['id']})\")" 2>/dev/null
  echo ""
  read -p "사용할 SSH 키 ID를 입력하세요: " SSH_KEY_ID
fi

echo "SSH 키: $SSH_KEY_ID"

# VPS 생성
echo ""
echo "[2/4] VPS 생성 중..."
RESULT=$(curl -s -X POST "https://api.vultr.com/v2/instances" \
  "${HEADERS[@]}" \
  -d "{
    \"region\": \"$REGION\",
    \"plan\": \"$PLAN\",
    \"os_id\": $OS_ID,
    \"label\": \"$LABEL\",
    \"sshkey_id\": [\"$SSH_KEY_ID\"],
    \"backups\": \"disabled\",
    \"enable_ipv6\": false
  }")

INSTANCE_ID=$(echo "$RESULT" | python3 -c "import json,sys; print(json.load(sys.stdin)['instance']['id'])" 2>/dev/null)

if [ -z "$INSTANCE_ID" ]; then
  echo "VPS 생성 실패:"
  echo "$RESULT" | python3 -m json.tool 2>/dev/null || echo "$RESULT"
  exit 1
fi

echo "인스턴스 ID: $INSTANCE_ID"

# IP 할당 대기
echo ""
echo "[3/4] IP 할당 대기 중..."
for i in $(seq 1 60); do
  INSTANCE=$(curl -s "https://api.vultr.com/v2/instances/$INSTANCE_ID" "${HEADERS[@]}")
  IP=$(echo "$INSTANCE" | python3 -c "import json,sys; print(json.load(sys.stdin)['instance']['main_ip'])" 2>/dev/null)
  STATUS=$(echo "$INSTANCE" | python3 -c "import json,sys; print(json.load(sys.stdin)['instance']['status'])" 2>/dev/null)
  POWER=$(echo "$INSTANCE" | python3 -c "import json,sys; print(json.load(sys.stdin)['instance']['power_status'])" 2>/dev/null)

  if [ "$IP" != "0.0.0.0" ] && [ -n "$IP" ] && [ "$STATUS" = "active" ] && [ "$POWER" = "running" ]; then
    break
  fi
  echo "  대기 중... ($i) status=$STATUS power=$POWER ip=$IP"
  sleep 5
done

if [ "$IP" = "0.0.0.0" ] || [ -z "$IP" ]; then
  echo "IP 할당 시간 초과"
  exit 1
fi

PASSWORD=$(echo "$INSTANCE" | python3 -c "import json,sys; print(json.load(sys.stdin)['instance']['default_password'])" 2>/dev/null)

# 결과 출력
echo ""
echo "[4/4] 완료!"
echo ""
echo "=========================================="
echo "세부.com VPS 정보"
echo "=========================================="
echo "IP: $IP"
echo "ID: $INSTANCE_ID"
echo "Password: $PASSWORD"
echo "SSH: ssh root@$IP"
echo ""
echo "=== 다음 단계 ==="
echo "1. SSH config 추가:"
echo "   Host cebu"
echo "     HostName $IP"
echo "     User root"
echo "     IdentityFile ~/.ssh/id_ed25519_wsl"
echo ""
echo "2. 서버 초기 설정:"
echo "   ssh cebu 'apt update && apt install -y docker.io docker-compose-plugin nginx certbot python3-certbot-nginx git'"
echo ""
echo "3. 프로젝트 클론 & 배포:"
echo "   ssh cebu 'git clone https://github.com/voodoosim/cebu-travel-landing.git /root/cebuguide'"
echo "   scp .env cebu:/root/cebuguide/.env"
echo "   ssh cebu 'cd /root/cebuguide && docker compose up -d --build'"
echo ""
echo "4. Cloudflare A 레코드: 세부.com → $IP"
echo "=========================================="
