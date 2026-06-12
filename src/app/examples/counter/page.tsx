'use client'

import { useCounterStore } from '@/stores/counter-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function CounterPage() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <Link href="/" className="text-sm text-muted-foreground hover:underline mb-6 block">
          ← 홈으로
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Zustand 카운터 예제</CardTitle>
            <CardDescription>전역 상태관리 기본 예제</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <span className="text-6xl font-bold">{count}</span>
            <div className="flex gap-3">
              <Button variant="outline" onClick={decrement}>−</Button>
              <Button variant="secondary" onClick={reset}>초기화</Button>
              <Button onClick={increment}>+</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
