# PRD: Notion CMS 기반 개발 지식 아카이브

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | DevArchive — Notion 기반 개발 지식 아카이브 |
| **목적** | Notion에서 작성한 개발 노트, 트러블슈팅, 레퍼런스를 웹사이트로 자동 퍼블리싱 |
| **CMS 선택 이유** | 비개발자도 Notion에서 글 작성 시 웹사이트에 즉시 반영, 별도 DB 불필요 |
| **타겟 사용자** | 개발 팀원, 지식을 공유하고 싶은 개인 개발자 |
| **배포 환경** | Vercel (ISR로 빌드 없이 콘텐츠 업데이트) |

---

## 2. 문제 정의

- 개발 중 발견한 지식과 트러블슈팅이 Notion에만 쌓여 팀 외부와 공유 불가
- 기존 블로그 플랫폼은 코드 블록, 표, 토글 같은 Notion 블록을 그대로 렌더링하지 못함
- 콘텐츠 수정 시마다 배포 파이프라인을 거쳐야 하는 번거로움

---

## 3. 핵심 기능

### MVP (1차 구현)

| 기능 | 설명 | 우선순위 |
|------|------|---------|
| 글 목록 페이지 | Notion DB에서 발행 상태 글 조회 및 카드형 목록 표시 | P0 |
| 글 상세 페이지 | Notion 페이지 블록을 HTML로 렌더링 | P0 |
| 카테고리 필터 | select 필드 기반 카테고리별 필터링 | P1 |
| 태그 필터 | multi_select 필드 기반 태그 필터링 | P1 |
| 다크모드 | next-themes 기반 라이트/다크 전환 | P1 |
| 반응형 디자인 | 모바일/태블릿/데스크톱 대응 | P0 |

### 2차 구현 (추후)

- 전문 검색 (Notion API의 search 엔드포인트 활용)
- 조회수 카운터 (Supabase 연동)
- 시리즈 기능 (연관 글 묶기)
- RSS 피드 생성

---

## 4. 기술 스택

| 영역 | 기술 | 선택 이유 |
|------|------|---------|
| Frontend | Next.js 15 (App Router) | ISR로 Notion 변경사항 자동 반영 |
| Language | TypeScript (strict) | 타입 안전성, any 금지 |
| CMS | Notion API (`@notionhq/client`) | 기존 Notion 워크스페이스 활용 |
| Styling | Tailwind CSS + shadcn/ui | 빠른 UI 구성 |
| Icons | Lucide React | shadcn/ui 기본 아이콘셋 |
| Deployment | Vercel | Next.js 최적화 + Webhook 연동 |

---

## 5. Notion 데이터베이스 구조

### 메인 DB: `DevArchive Posts`

| 필드명 | Notion 타입 | 설명 | 필수 |
|--------|------------|------|------|
| `Title` | title | 글 제목 | ✅ |
| `Category` | select | 분류 (Next.js / React / TypeScript / DevOps / etc.) | ✅ |
| `Tags` | multi_select | 세부 태그 (복수 선택) | ✅ |
| `Status` | select | `Draft` / `Published` | ✅ |
| `PublishedAt` | date | 발행일 | ✅ |
| `Summary` | rich_text | 카드에 표시할 요약 (150자 이내) | ✅ |
| `CoverImage` | url | 썸네일 이미지 URL | - |
| `Slug` | rich_text | URL 경로 (영문, 중복 불가) | ✅ |

### 상태 흐름

```
Draft → Published → (Archived)
```

- `Status = Published` 인 글만 웹사이트에 표시
- `Status = Draft` 는 Notion에서만 볼 수 있음

---

## 6. 화면 구성

### 6.1 홈 (`/`)
- 최근 발행 글 6개 카드형 목록
- 카테고리별 빠른 접근 버튼
- 전체 글 보기 링크

### 6.2 글 목록 (`/posts`)
- 전체 글 카드형 그리드 (무한 스크롤 또는 페이지네이션)
- 카테고리 + 태그 필터 (URL 파라미터로 상태 유지)
- 글 카드 구성: 썸네일, 제목, 요약, 카테고리, 발행일

### 6.3 글 상세 (`/posts/[slug]`)
- Notion 블록 렌더링 (텍스트, 코드블록, 표, 토글, 이미지, 콜아웃)
- 목차 (h2/h3 기반 자동 생성)
- 이전/다음 글 네비게이션
- 태그 클릭 → 태그 필터 목록으로 이동

### 6.4 카테고리 (`/posts?category=[name]`)
- 필터 파라미터 방식으로 별도 페이지 없이 처리

---

## 7. API 설계

### Notion API 호출 패턴

```typescript
// 글 목록 조회
GET /api/posts?category=NextJS&tag=ISR&page=1

// 글 상세 조회 (slug 기반)
GET /api/posts/[slug]
```

### 캐싱 전략

| 페이지 | 방식 | revalidate |
|--------|------|-----------|
| 글 목록 | ISR | 60초 |
| 글 상세 | ISR | 60초 |
| Vercel Webhook | On-demand ISR | Notion 저장 시 즉시 |

---

## 8. 환경 변수

```bash
# .env.local
NOTION_API_KEY=secret_xxxx          # Notion Integration 토큰
NOTION_DATABASE_ID=xxxx             # DevArchive Posts DB ID
REVALIDATE_SECRET=xxxx              # Vercel On-demand ISR 시크릿
```

---

## 9. 폴더 구조

```
src/
├── app/
│   ├── page.tsx                    # 홈
│   ├── posts/
│   │   ├── page.tsx                # 글 목록
│   │   └── [slug]/page.tsx         # 글 상세
│   └── api/
│       ├── posts/route.ts          # 목록 API
│       └── revalidate/route.ts     # Webhook 재검증 API
├── components/
│   ├── post/
│   │   ├── PostCard.tsx            # 목록 카드
│   │   ├── PostList.tsx            # 카드 그리드
│   │   ├── PostDetail.tsx          # 상세 본문
│   │   └── TableOfContents.tsx     # 목차
│   ├── filter/
│   │   ├── CategoryFilter.tsx
│   │   └── TagFilter.tsx
│   └── common/
│       └── ThemeToggle.tsx
├── lib/
│   ├── notion.ts                   # Notion API 클라이언트
│   ├── notion-renderer.ts          # 블록 → HTML 변환
│   └── schemas/
│       └── post.schema.ts          # Zod 스키마
├── stores/
│   └── filter-store.ts             # 필터 상태 (Zustand)
└── types/
    └── post.ts                     # Post 타입 정의
```

---

## 10. 구현 단계 (예상 소요 시간)

| 단계 | 작업 | 예상 시간 |
|------|------|---------|
| 1 | Notion Integration 생성, DB 생성, 환경 변수 설정 | 30분 |
| 2 | `lib/notion.ts` — API 클라이언트 및 글 목록/상세 조회 함수 | 1시간 |
| 3 | Zod 스키마 정의, 타입 설정 | 30분 |
| 4 | 홈 + 글 목록 페이지 구현 | 1시간 |
| 5 | Notion 블록 렌더러 구현 (코드블록, 토글, 콜아웃 포함) | 2시간 |
| 6 | 글 상세 페이지 + 목차 구현 | 1시간 |
| 7 | 카테고리/태그 필터 구현 (Zustand) | 1시간 |
| 8 | ISR + Vercel Webhook 설정 | 30분 |
| 9 | 스타일 마무리 + 반응형 검증 | 1시간 |
| **합계** | | **약 8.5시간** |

---

## 11. 성공 기준 (MVP 완료 조건)

- [ ] Notion에서 `Status = Published`로 변경 시 60초 이내 웹사이트에 반영
- [ ] 코드블록이 문법 하이라이팅과 함께 렌더링
- [ ] 모바일(375px)에서 레이아웃 깨짐 없음
- [ ] Lighthouse 성능 점수 85점 이상
- [ ] TypeScript 빌드 오류 0개

---

## 12. 리스크 및 대응

| 리스크 | 대응 방안 |
|--------|---------|
| Notion API 속도 제한 (초당 3회) | ISR 캐싱으로 실제 API 호출 최소화 |
| Notion 블록 타입 미지원 | 미지원 블록은 fallback UI로 표시 |
| 이미지 외부 URL 만료 | `next/image` + Vercel 이미지 최적화 적용 |

---

*작성일: 2026-06-12*  
*작성자: DevArchive 프로젝트팀*
