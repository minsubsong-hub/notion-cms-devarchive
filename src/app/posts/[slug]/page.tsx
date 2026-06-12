import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPublishedPosts, getPostBySlug, getPostBlocks } from '@/lib/notion'
import { renderBlock } from '@/lib/notion-renderer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts()
    return posts.map((post) => ({ slug: post.slug }))
  } catch {
    // 빌드 타임에 API 키가 없는 경우 빈 배열 반환 (ISR로 런타임에 처리)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: '글을 찾을 수 없습니다' }
  return { title: `${post.title} | DevArchive`, description: post.summary }
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const blocks = await getPostBlocks(post.id)

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/posts">
        <Button variant="ghost" size="sm" className="mb-6">← 목록으로</Button>
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            {post.category && <Badge>{post.category}</Badge>}
            <span className="text-sm text-muted-foreground">{formattedDate}</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
          <p className="text-muted-foreground">{post.summary}</p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} className="bg-muted text-muted-foreground">#{tag}</Badge>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {blocks.map((block) => renderBlock(block))}
        </div>
      </article>
    </main>
  )
}
