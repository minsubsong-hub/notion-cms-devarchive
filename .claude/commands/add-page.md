---
description: 새 Next.js 페이지(App Router)를 생성합니다.
argument-hint: "[라우트경로] 예: about / dashboard/settings"
---

Next.js 15 App Router 기준으로 새 페이지를 생성해줘.

## 입력값
- 라우트 경로: $1 (예: about → src/app/about/page.tsx)

## 생성할 파일

### page.tsx
```tsx
export default function ${PageName}Page() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">${PageTitle}</h1>
        {/* 여기에 페이지 내용 추가 */}
      </div>
    </main>
  )
}
```

### (선택) loading.tsx
```tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  )
}
```

## 규칙
- 라우트 경로의 각 세그먼트를 폴더로 생성
- 파일명은 항상 page.tsx
- 컴포넌트명은 경로 기반 PascalCase로 변환 (예: dashboard/settings → DashboardSettingsPage)

## 완료 후
- 생성된 파일 경로와 접속 URL을 알려줘 (예: http://localhost:3000/about)
