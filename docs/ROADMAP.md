# ROADMAP: DevArchive — Notion CMS 기반 개발 지식 아카이브

> **개발 원칙**: 골격 → 공통 모듈 → 핵심 기능 → 추가 기능 → 최적화/배포
>
> 기능을 먼저 만들면 공통 로직이 없어 중복 코드가 발생하고, 나중에 수정 시 모든 기능을 다시 고쳐야 합니다.
> 견고한 기반(골격 + 공통 모듈) 위에 기능을 쌓아야 유지보수와 확장이 쉽습니다.

---

## Phase 1: 프로젝트 골격 구축 (예상: 0.5일)

> **왜 먼저 하는가?** 환경 설정과 프로젝트 구조가 없으면 어떤 기능도 만들 수 없습니다.
> 잘못된 구조 위에 기능을 올리면 나중에 전체를 다시 뜯어야 합니다.

### 작업 목록

- [ ] Notion Integration 생성 및 API 키 발급
- [ ] `.env.local` 환경 변수 파일 구성 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`, `REVALIDATE_SECRET`)
- [ ] `.env.example` 파일 생성 (팀 공유용 환경 변수 템플릿)
- [ ] Notion 데이터베이스 생성 (PRD 명세 기준: Title, Category, Tags, Status, PublishedAt, Summary, Slug)
- [ ] `@notionhq/client` 패키지 설치
- [ ] `src/types/post.ts` — Post, Category, Tag 타입 정의
- [ ] `src/app/layout.tsx` — ThemeProvider, 전역 레이아웃 구조 확정
- [ ] `src/app/globals.css` — CSS 변수 및 다크모드 토큰 확인

### 완료 기준

- `npm run type-check` 오류 없음
- Notion API 키로 데이터베이스 조회 성공 확인
- 다크모드 토글 정상 작동

---

## Phase 2: 공통 모듈 개발 (예상: 1.5일)

> **왜 먼저 하는가?** 글 목록, 글 상세, 필터 기능 모두 Notion API를 호출합니다.
> 공통 함수 없이 각 기능에서 직접 API를 호출하면 중복 코드가 3배로 늘어납니다.
> 공통 모듈을 먼저 만들어야 이후 모든 기능이 이 위에서 빠르게 구현됩니다.

### 작업 목록

**Notion API 클라이언트 (`src/lib/notion.ts`)**
- [ ] `getPublishedPosts()` — Status=Published 글 목록 조회
- [ ] `getPostBySlug(slug)` — Slug 기반 단일 글 조회
- [ ] `getPostBlocks(pageId)` — 페이지 블록 조회
- [ ] `getCategories()` — 카테고리 목록 조회

**Notion 블록 렌더러 (`src/lib/notion-renderer.ts`)**
- [ ] paragraph, heading1/2/3 렌더링
- [ ] code 블록 렌더링 (언어 명시)
- [ ] bulleted_list, numbered_list 렌더링
- [ ] toggle 블록 렌더링
- [ ] callout 블록 렌더링
- [ ] image 블록 렌더링
- [ ] 미지원 블록 fallback UI

**Zod 스키마 (`src/lib/schemas/post.schema.ts`)**
- [ ] `postSchema` — Notion API 응답 검증
- [ ] `postListSchema` — 목록 응답 검증

**공통 컴포넌트**
- [ ] `src/components/common/PostCard.tsx` — 카드형 글 미리보기
- [ ] `src/components/layout/Header.tsx` — 로고, 네비게이션, 다크모드 토글
- [ ] `src/components/layout/Footer.tsx` — 저작권, 링크

**Zustand 스토어 (`src/stores/filter-store.ts`)**
- [ ] `selectedCategory`, `selectedTags` 상태
- [ ] `setCategory()`, `toggleTag()`, `resetFilter()` 액션

### 완료 기준

- Notion API 함수 단위 테스트로 데이터 정상 반환 확인
- PostCard 컴포넌트 Storybook 또는 예제 페이지에서 렌더링 확인
- `npm run type-check` 오류 없음

---

## Phase 3: 핵심 기능 개발 (예상: 2일)

> **왜 이 순서인가?** Phase 2의 공통 모듈이 완성되었으므로, 이제 각 페이지는
> `getPublishedPosts()`, `getPostBySlug()` 등을 호출만 하면 됩니다.
> 글 목록과 상세는 서비스의 핵심이므로 추가 기능보다 먼저 완성합니다.

### 작업 목록

**홈 페이지 (`src/app/page.tsx`)**
- [ ] 최근 발행 글 6개 카드 그리드
- [ ] 카테고리 빠른 접근 버튼
- [ ] "전체 글 보기" 링크

**글 목록 페이지 (`src/app/posts/page.tsx`)**
- [ ] ISR 설정 (`revalidate: 60`)
- [ ] 전체 글 카드 그리드 (페이지네이션)
- [ ] URL 파라미터로 필터 상태 유지 (`?category=NextJS&tag=ISR`)

**글 상세 페이지 (`src/app/posts/[slug]/page.tsx`)**
- [ ] `getPostBySlug()` + `getPostBlocks()`로 데이터 로드
- [ ] `notion-renderer.ts`로 블록 렌더링
- [ ] ISR 설정 (`revalidate: 60`)
- [ ] 이전/다음 글 네비게이션
- [ ] 태그 클릭 → 목록 필터 이동

**목차 컴포넌트 (`src/components/post/TableOfContents.tsx`)**
- [ ] h2/h3 블록 추출하여 자동 목차 생성
- [ ] 스크롤 위치에 따른 활성 항목 하이라이트

**On-demand ISR API (`src/app/api/revalidate/route.ts`)**
- [ ] `REVALIDATE_SECRET` 검증
- [ ] `/posts`, `/posts/[slug]` 경로 재검증

### 완료 기준

- Notion에서 글 `Status = Published`로 변경 후 60초 이내 목록에 반영
- 코드 블록이 언어별 하이라이팅과 함께 렌더링
- 모바일(375px)에서 레이아웃 깨짐 없음

---

## Phase 4: 추가 기능 개발 (예상: 1.5일)

> **왜 이 순서인가?** 핵심 기능(목록/상세)이 완성된 후에 추가 기능을 올립니다.
> 핵심 기능 없이 필터부터 만들면 테스트할 기반이 없어 개발이 비효율적입니다.

### 작업 목록

**카테고리 필터 (`src/components/filter/CategoryFilter.tsx`)**
- [ ] `getCategories()`로 동적 카테고리 목록
- [ ] 선택된 카테고리 URL 파라미터 반영
- [ ] Zustand `filter-store` 연동

**태그 필터 (`src/components/filter/TagFilter.tsx`)**
- [ ] 글 목록에서 사용된 태그 집계
- [ ] 다중 선택 지원
- [ ] 선택된 태그 URL 파라미터 반영

**loading.tsx 스켈레톤**
- [ ] `src/app/posts/loading.tsx` — 목록 스켈레톤
- [ ] `src/app/posts/[slug]/loading.tsx` — 상세 스켈레톤

**SEO 메타데이터**
- [ ] `generateMetadata()` — 글 제목/요약으로 og:title, og:description 자동 설정
- [ ] `sitemap.ts` — 전체 글 URL 사이트맵 생성

### 완료 기준

- 카테고리 + 태그 필터 조합 동작 확인
- URL을 복사해서 열어도 동일한 필터 상태 유지
- og:image, og:description SNS 미리보기 정상 표시

---

## Phase 5: 최적화 및 배포 (예상: 1일)

> **왜 마지막인가?** 기능이 확정된 후에 최적화해야 의미가 있습니다.
> 기능이 바뀔 때마다 최적화를 다시 해야 하면 낭비입니다.

### 작업 목록

**성능 최적화**
- [ ] `next/image`로 모든 이미지 교체 (Notion 이미지 URL 포함)
- [ ] `React.memo` 적용 (PostCard, TableOfContents 등 무거운 컴포넌트)
- [ ] Lighthouse 성능 점수 85점 이상 달성

**코드 품질**
- [ ] `npm run type-check` 오류 0개 최종 확인
- [ ] `npm run lint` 오류 0개 최종 확인
- [ ] `deploy-helper` 서브에이전트로 배포 전 체크리스트 실행

**Vercel 배포**
- [ ] Vercel 프로젝트 생성 및 환경 변수 등록
- [ ] Notion Webhook → Vercel On-demand ISR 연결
- [ ] 도메인 설정 (선택)
- [ ] 배포 후 실제 Notion 글 수정 → 반영 확인

### 완료 기준

- Lighthouse 성능 85점 이상 / 접근성 90점 이상
- Notion 수정 후 60초 이내 웹사이트 자동 반영
- TypeScript 빌드 오류 0개

---

## 전체 일정 요약

| Phase | 내용 | 예상 기간 | 누적 |
|-------|------|---------|------|
| Phase 1 | 프로젝트 골격 구축 | 0.5일 | 0.5일 |
| Phase 2 | 공통 모듈 개발 | 1.5일 | 2일 |
| Phase 3 | 핵심 기능 개발 | 2일 | 4일 |
| Phase 4 | 추가 기능 개발 | 1.5일 | 5.5일 |
| Phase 5 | 최적화 및 배포 | 1일 | **6.5일** |

---

*작성일: 2026-06-12*
*기반 문서: [PRD.md](./PRD.md)*
