import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/common/theme-toggle'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">Next.js Starter Kit</h1>
          <ThemeToggle />
        </div>

        {/* 소개 카드 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>스타터킷 구성</CardTitle>
            <CardDescription>포함된 기술 스택과 예제 페이지</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ Next.js 15 (App Router)</li>
              <li>✅ TypeScript (strict mode)</li>
              <li>✅ Tailwind CSS</li>
              <li>✅ shadcn/ui 컴포넌트</li>
              <li>✅ 다크모드 (next-themes)</li>
              <li>✅ Zustand 상태관리</li>
              <li>✅ React Hook Form + Zod 폼 검증</li>
            </ul>
          </CardContent>
        </Card>

        {/* 예제 페이지 링크 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">폼 예제</CardTitle>
              <CardDescription>React Hook Form + Zod 검증</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/examples/form">
                <Button className="w-full">보러가기</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">상태관리 예제</CardTitle>
              <CardDescription>Zustand 카운터 예제</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/examples/counter">
                <Button variant="outline" className="w-full">보러가기</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
