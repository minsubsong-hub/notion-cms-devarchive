export interface Post {
  id: string
  title: string
  slug: string
  summary: string
  category: string
  tags: string[]
  status: 'Draft' | 'Published'
  publishedAt: string
  coverImage?: string
}

export interface PostBlock {
  id: string
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
}
