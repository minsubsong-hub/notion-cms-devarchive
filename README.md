# DevArchive — Notion CMS 기반 개발 지식 아카이브

Notion을 CMS로 활용하는 개발 지식 공유 웹사이트입니다.
Notion에서 글을 작성하고 상태를 `Published`로 바꾸면 자동으로 웹사이트에 반영됩니다.

## 기술 스택

| 기술 | 용도 |
|------|------|
| Next.js 15 (App Router) | 프레임워크, ISR |
| TypeScript | 타입 안전성 |
| Tailwind CSS + shadcn/ui | 스타일링 |
| Notion API | CMS |
| Zustand | 필터 상태관리 |
| React Hook Form + Zod | 폼 검증 |
| Vercel | 배포 + Webhook |

## 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env.local
# .env.local에 Notion API 키와 DB ID 입력

# 3. 개발 서버 실행
npm run dev
```

## 환경 변수

```bash
NOTION_API_KEY=secret_xxxx       # Notion Integration 토큰
NOTION_DATABASE_ID=xxxx          # Posts 데이터베이스 ID
REVALIDATE_SECRET=xxxx           # On-demand ISR 시크릿
```

## Notion 데이터베이스 구조

| 필드 | 타입 | 설명 |
|------|------|------|
| Title | title | 글 제목 |
| Category | select | 카테고리 (Next.js, React, TypeScript 등) |
| Tags | multi_select | 세부 태그 |
| Status | select | Draft / Published |
| PublishedAt | date | 발행일 |
| Summary | rich_text | 카드 요약 (150자 이내) |
| Slug | rich_text | URL 경로 |

## 페이지 구조

- `/` — 홈 (최근 글 6개)
- `/posts` — 전체 글 목록 + 카테고리/태그 필터
- `/posts/[slug]` — 글 상세 (목차 포함)

## 문서

- [PRD (제품 요구사항 문서)](./docs/PRD.md)
