# 세부가이드 홈페이지 전환 작업 일지

> 다른 AI가 이 프로젝트를 이어받을 때 참고용.
> 최종 업데이트: 2026-03-01

---

## 프로젝트 개요

- **사이트**: 세부가이드 (세부.com / xn--or3b11e.com)
- **목적**: 세부 여행 통합 가이드 (골프, 리조트, 액티비티, 패키지)
- **스택**: Next.js 16.1.6 + Tailwind v4 + NextAuth v5 beta.30 + Prisma 6
- **배포**: VPS Docker (`/root/cebuguide/`), nginx reverse proxy → :3000
- **GitHub**: voodoosim/cebu-travel-landing

---

## 전환 히스토리 (시간순)

### Phase 0: 원본 상태 (~ e330fce)

단일 스크롤 랜딩 페이지. Hero → Stats → Services → Reviews → Contact → CTA 구조.
Phase 1에서 어드민/예약/인증을 구현했으나, 성능 최적화 커밋(058995f)에서 admin/booking 페이지가 삭제됨.

### Phase 1: 매거진형 전환 시도 (cac8a3b)

page.tsx를 매거진/콘텐츠형으로 재구성:
- Hero(70vh) + Stats 오버레이
- Editor's Pick (비대칭 그리드)
- Golf 가로 스크롤 카드
- Resort & Activity 2열 그리드
- Packages 3열 카드
- Reviews + CTA+Contact 통합

공통 컴포넌트 3개 생성: DetailHero, InfoBar, RelatedItems
상세 페이지(golf/resort/activity) 전면 개편: 2열 레이아웃 + 사이드바

**문제**: 여전히 랜딩 페이지 느낌 — 길게 스크롤하는 단일 페이지 구조.

### Phase 2: 환율 시스템 전환 (3593f23)

사용자 지시: "환율은 수동으로 관리자가 업데이트 할 거야"
- 외부 API(er-api.com) 의존 제거
- `SiteSetting` 모델 추가 (prisma/schema.prisma) — key-value 방식
- `exchange.ts`: Prisma DB에서 `exchange_php` 키 조회 + React cache()
- `api/rates/route.ts`: GET (DB 읽기) + POST (ADMIN 역할 체크 후 upsert)
- FALLBACK: DB에 값 없으면 10,000 KRW = 420 PHP

### Phase 3: 이미지 교체 (36149d6)

24개 상품 전체를 고유 Unsplash URL로 교체.
기존: 5개 로컬 webp 이미지를 돌려 씀 → 상품별 고유 이미지.
StructuredData.tsx 외부 URL 호환 처리 포함.

### Phase 4: 도메인 변경 (a8a2411)

cebu.sasori.dev → 세부.com (punycode: xn--or3b11e.com)
- 12개 파일에서 canonical URL, sitemap, robots, OG URL 일괄 교체
- nginx server_name 변경
- nginx /api/rates 바이패스 제거 (Next.js 직접 처리)

### Phase 5: 홈페이지형 전환 (2d4896d → 91bb2fb)

사용자 지시: "너무 길어, 공책처럼 엮어야 해"

**최종 구조 (91bb2fb)**:
```
[SiteHeader] — 공통 sticky 헤더
[히어로 배너] — 50vh, 컴팩트
[서비스 카드 4개] — 골프/리조트/액티비티/패키지 → 각 서브페이지로 이동
[소개 + 연락처] — 2열 (왜 세부가이드? + 카카오/텔레그램/전화)
[Footer] — 4열 (브랜드, Services, Info, Contact)
```

핵심: 홈페이지는 네비게이션 허브 역할만. 콘텐츠는 서브페이지가 담당.

---

## 현재 파일 구조

### 페이지 (src/app/)

| 경로 | 역할 | 타입 |
|------|------|------|
| `/` (page.tsx) | 홈 — 네비 허브 | Static |
| `/golf/` | 골프장 목록 | Static |
| `/golf/[slug]/` | 골프장 상세 | SSG (6개) |
| `/resort/` | 리조트 목록 | Static |
| `/resort/[slug]/` | 리조트 상세 | SSG (9개) |
| `/activity/` | 액티비티 목록 | Static |
| `/activity/[slug]/` | 액티비티 상세 | SSG (6개) |
| `/package/` | 패키지 목록 | Static |
| `/faq/` | 자주 묻는 질문 | Static |
| `/login/` | 로그인 | Static |
| `/mypage/` | 마이페이지 | Dynamic |
| `/api/rates` | 환율 GET/POST | Dynamic |
| `/api/booking` | 예약 문의 | Dynamic |
| `/api/auth/[...nextauth]` | 인증 | Dynamic |

### 공통 컴포넌트 (src/app/components/)

| 컴포넌트 | 역할 | 사용처 |
|----------|------|--------|
| SiteHeader | sticky 헤더 + 네비게이션 | 전체 |
| MobileMenu | 모바일 햄버거 메뉴 | SiteHeader |
| PageHero | 목록 페이지 히어로 | golf/, resort/, activity/ |
| DetailHero | 상세 페이지 히어로 (이미지+제목) | [slug] 페이지 |
| InfoBar | 상세 페이지 스펙 태그 바 | [slug] 페이지 |
| RelatedItems | 관련 상품 가로 스크롤 | [slug] 페이지 |
| BookingForm | 예약 문의 폼 | 홈, 상세 |
| ExchangeRate | 환율 표시 (DB 기반) | 홈 (현재 미사용), 상세 사이드바 |
| StructuredData | JSON-LD SEO | layout.tsx |

### 데이터 & 라이브러리

| 파일 | 역할 |
|------|------|
| `src/data/products.json` | 골프 6 / 리조트 9 / 액티비티 6 / 패키지 3 |
| `src/lib/exchange.ts` | DB에서 환율 조회 + React cache() |
| `src/lib/navigation.ts` | 네비게이션 링크 정의 |
| `src/lib/prisma.ts` | Prisma 클라이언트 싱글턴 |
| `src/auth.ts` | NextAuth 설정 (Google, PrismaAdapter) |

### Prisma 스키마 (prisma/schema.prisma)

모델: User, Account, Session, GolfCourse, Resort, Activity, Booking, Quote, VerificationToken, **SiteSetting**
Enum: Role (USER/ADMIN), BookingStatus, ServiceType

---

## 디자인 시스템

- **색상**: Navy(#0a1628), Gold(#c9a96e), Ivory(#faf8f5)
- **폰트**: Playfair Display (제목, serif), Inter (본문, sans)
- **CSS 변수**: `--font-serif`, `--font-inter`
- **Tailwind 커스텀**: `bg-ivory`, `text-navy-900`, `text-gold-500`, `text-gold-gradient` 등

---

## 빌드 & 배포

### 빌드 명령어 (필수)
```bash
NODE_OPTIONS="--max-old-space-size=4096 --max-semi-space-size=128" npx next build
```
⚠️ `--max-semi-space-size=128` 없으면 V8 turboshaft 크래시 발생

### VPS 배포
```bash
ssh main "cd /root/cebuguide && git pull origin main && docker compose up -d --build"
```

### nginx 설정
- 파일: `/etc/nginx/sites-available/heritage-cebu` (심링크 → sites-enabled)
- server_name: `xn--or3b11e.com www.xn--or3b11e.com`
- proxy_pass: `http://127.0.0.1:3000`
- SSL: 미설정 (certbot 미설치)

### Docker 구성
- `cebuguide-nextjs-1`: Next.js 앱 (포트 3000)
- `cebuguide-postgres-1`: PostgreSQL 16-alpine (DB: cebuguide)
- Dockerfile CMD: `prisma db push --skip-generate && node server.js`

---

## 주의사항

1. **빌드 시 prisma:error 무시 가능** — 빌드 단계에서 DATABASE_URL 없어서 SiteSetting 조회 실패하지만, try/catch로 FALLBACK 반환하므로 빌드 성공함
2. **이미지**: 전부 외부 Unsplash URL 사용, `next.config.ts`에 `images.unsplash.com` remotePatterns 등록됨
3. **환율**: DB에 값 없으면 FALLBACK (10,000 KRW = 420 PHP). 관리자가 POST /api/rates { php: 값 } 으로 업데이트
4. **인증**: NextAuth + Google OAuth. session.user.role로 ADMIN 체크
5. **cebu-service 봇**: VPS에서 systemd로 별도 실행 중 (포트 8001). 텔레그램 봇 기능 담당, 웹 서비스와 별개

---

## TODO (미완료)

- [ ] SSL 설정 (Let's Encrypt / certbot)
- [ ] 실제 연락처 정보 교체 (현재 더미 데이터)
- [ ] 어드민 패널 복구 (058995f에서 삭제됨)
- [ ] 예약 관리 시스템
- [ ] 고객 후기 페이지 (현재 홈에서 제거됨, 별도 페이지로 분리 필요)
- [ ] 구글 로그인 실제 연동 (OAuth 키 설정)
