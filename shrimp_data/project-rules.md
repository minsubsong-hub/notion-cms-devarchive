# DevArchive 프로젝트 규칙

## 프로젝트 정보
- **이름**: DevArchive — Notion CMS 기반 개발 지식 아카이브
- **기술 스택**: Next.js 15, TypeScript (strict), Tailwind CSS, shadcn/ui, Notion API

## 개발 순서 원칙
반드시 다음 순서를 지켜야 합니다:
1. **골격 (Phase 1)**: 환경 설정, 타입 정의
2. **공통 모듈 (Phase 2)**: API 함수, 컴포넌트, 스토어
3. **핵심 기능 (Phase 3)**: 목록/상세 페이지
4. **추가 기능 (Phase 4)**: 필터, SEO
5. **최적화/배포 (Phase 5)**: 성능, Vercel

## 코딩 규칙
- TypeScript strict mode 준수, `any` 타입 사용 금지
- 컴포넌트 파일명: PascalCase
- 함수는 30줄 이하 유지
- 들여쓰기: 2칸 스페이스
- ESLint 오류 없이 커밋

## 작업 의존성 원칙
- Phase N의 작업은 Phase N-1이 완료된 후 시작
- 공통 모듈(Phase 2) 없이 개별 기능(Phase 3) 시작 금지
- 각 작업 완료 전 `npm run type-check` 통과 확인
