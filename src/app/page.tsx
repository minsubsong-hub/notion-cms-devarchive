import Link from 'next/link'
import { getPublishedPosts } from '@/lib/notion'
import { PostCard } from '@/components/common/PostCard'
import { Button } from '@/components/ui/button'

export const revalidate = 60

export default async function HomePage() {
  const posts = await getPublishedPosts()
  const recentPosts = posts.slice(0, 6)

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">DevArchive</h1>
        <p className="text-muted-foreground text-lg">
          Notion에서 작성한 개발 지식을 공유하는 아카이브입니다.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">최근 글</h2>
          <Link href="/posts">
            <Button variant="outline" size="sm">전체 보기</Button>
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">아직 발행된 글이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
