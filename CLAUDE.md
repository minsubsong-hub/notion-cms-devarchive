# Project Context
- PRD 문서: @docs/PRD.md
- 개발 로드맵: @docs/ROADMAP.md

# 프로젝트 개요
DevArchive — Notion CMS 기반 개발 지식 아카이브
(Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui + Notion API)

# 기술 스택
- Next.js 15 (App Router)
- TypeScript (strict mode, any 타입 금지)
- Tailwind CSS
- shadcn/ui 컴포넌트
- Zustand (전역 상태관리)
- React Hook Form + Zod (폼 검증)
- next-themes (다크모드)

# 빌드 & 실행 명령어
- 개발 서버: npm run dev
- 빌드: npm run build
- 타입 체크: npm run type-check
- 린트: npm run lint

# 디렉토리 구조
- src/app/ : Next.js App Router 페이지
- src/components/ui/ : shadcn/ui 기본 컴포넌트
- src/components/common/ : 공통 컴포넌트
- src/components/providers/ : Context Provider
- src/lib/ : 유틸리티, Zod 스키마
- src/stores/ : Zustand 스토어
- src/types/ : TypeScript 타입 정의

# 코드 컨벤션
- 컴포넌트 파일명: PascalCase (예: ThemeToggle.tsx)
- 훅/스토어: camelCase + use 접두사 (예: useCounterStore.ts)
- Zod 스키마: [name].schema.ts
- 들여쓰기: 2칸 스페이스
- 함수는 30줄 이하 유지
