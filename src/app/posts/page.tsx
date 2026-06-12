import { getPublishedPosts } from '@/lib/notion'
import { PostCard } from '@/components/common/PostCard'

export const revalidate = 60

export default async function PostsPage() {
  const posts = await getPublishedPosts()

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">전체 글 ({posts.length})</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">아직 발행된 글이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
