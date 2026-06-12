import Link from 'next/link'
import { getPublishedPosts } from '@/lib/notion'
import { PostCard } from '@/components/common/PostCard'

export const revalidate = 60

interface PostsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { category } = await searchParams
  const allPosts = await getPublishedPosts()

  const categories = Array.from(new Set(allPosts.map((p) => p.category).filter(Boolean)))
  const filteredPosts = category ? allPosts.filter((p) => p.category === category) : allPosts

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">전체 글 ({filteredPosts.length})</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/posts"
          className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors ${
            !category
              ? 'bg-primary text-primary-foreground border-transparent'
              : 'bg-transparent text-foreground border-border hover:bg-muted'
          }`}
        >
          전체
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/posts?category=${encodeURIComponent(cat)}`}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors ${
              category === cat
                ? 'bg-primary text-primary-foreground border-transparent'
                : 'bg-transparent text-foreground border-border hover:bg-muted'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">해당 카테고리에 글이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
