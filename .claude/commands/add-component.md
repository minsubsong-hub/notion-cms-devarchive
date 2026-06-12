---
description: 새 React 컴포넌트를 생성합니다. 위치와 종류를 지정할 수 있습니다.
argument-hint: "[컴포넌트명] [ui|common|layout? 기본값=common]"
---

다음 조건에 맞춰 React 컴포넌트를 생성해줘.

## 입력값
- 컴포넌트 이름: $1 (PascalCase로 변환해서 사용)
- 컴포넌트 종류: $2 (기본값: common / 선택: ui, common, layout)

## 생성 위치
- ui → `src/components/ui/$1.tsx`
- common → `src/components/common/$1.tsx`
- layout → `src/components/layout/$1.tsx`

## 생성할 파일 내용 (TypeScript + Tailwind CSS)
```tsx
import { cn } from '@/lib/utils'

interface ${1}Props {
  className?: string
  children?: React.ReactNode
}

export function ${1}({ className, children }: ${1}Props) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  )
}
```

## 완료 후
- 생성된 파일 경로를 알려줘
- 사용 예시 코드도 한 줄 보여줘
