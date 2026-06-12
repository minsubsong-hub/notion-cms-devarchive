---
description: Zod 스키마 + React Hook Form 기반의 폼 컴포넌트를 생성합니다.
argument-hint: "[폼이름] [필드목록 쉼표구분] 예: Login email,password"
---

React Hook Form + Zod 검증이 적용된 폼 컴포넌트를 생성해줘.

## 입력값
- 폼 이름: $1 (예: Login → LoginForm)
- 필드 목록: $2 (쉼표 구분, 예: email,password,name)

## 생성할 파일

### 1. Zod 스키마: `src/lib/schemas/$1.schema.ts`
- $2의 각 필드에 맞는 Zod 타입 추론
  - email → z.string().email()
  - password → z.string().min(8)
  - name → z.string().min(2)
  - 그 외 → z.string().min(1)
- FormValues 타입도 export

### 2. 폼 컴포넌트: `src/components/common/$1Form.tsx`
- useForm + zodResolver 적용
- 각 필드: Label + Input + 에러 메시지
- 제출 버튼 (로딩 상태 포함)
- onSubmit prop으로 외부에서 처리 가능하게 구성

## 규칙
- shadcn/ui의 Input, Label, Button 컴포넌트 사용
- any 타입 사용 금지
- 에러 메시지는 한국어로 작성

## 완료 후
- 생성된 파일 목록과 컴포넌트 사용 예시를 보여줘
