import Link from 'next/link'
import type { Post } from '@/types/post'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {post.category && <Badge>{post.category}</Badge>}
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
          <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
          <CardDescription className="line-clamp-3">{post.summary}</CardDescription>
        </CardHeader>
        {post.tags.length > 0 && (
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <Badge key={tag} className="bg-muted text-muted-foreground text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
