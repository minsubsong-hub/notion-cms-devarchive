'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormValues } from '@/lib/schemas/contact.schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function FormExamplePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    // 실제 서비스에서는 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert(`제출 완료!\n${JSON.stringify(data, null, 2)}`)
    reset()
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <Link href="/" className="text-sm text-muted-foreground hover:underline mb-6 block">
          ← 홈으로
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>폼 예제</CardTitle>
            <CardDescription>React Hook Form + Zod 검증</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="홍길동" {...register('name')} />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" placeholder="hong@example.com" {...register('email')} />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="message">메시지</Label>
                <Input id="message" placeholder="메시지를 입력해주세요" {...register('message')} />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? '제출 중...' : '제출하기'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
