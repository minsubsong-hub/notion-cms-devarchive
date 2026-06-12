import { Client } from '@notionhq/client'
import type { Post, PostBlock } from '@/types/post'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DATABASE_ID = process.env.NOTION_DATABASE_ID!

export async function getPublishedPosts(): Promise<Post[]> {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) return []

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: 'Status', select: { equals: 'Published' } },
      sorts: [{ property: 'PublishedAt', direction: 'descending' }],
    })

    return response.results.map((page) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props = (page as any).properties
      return {
        id: page.id,
        title: props.Title?.title?.[0]?.plain_text ?? '',
        slug: props.Slug?.rich_text?.[0]?.plain_text ?? page.id,
        summary: props.Summary?.rich_text?.[0]?.plain_text ?? '',
        category: props.Category?.select?.name ?? '',
        tags: props.Tags?.multi_select?.map((t: { name: string }) => t.name) ?? [],
        status: props.Status?.select?.name ?? 'Draft',
        publishedAt: props.PublishedAt?.date?.start ?? '',
        coverImage: props.CoverImage?.url ?? undefined,
      }
    })
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPublishedPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

export async function getPostBlocks(pageId: string): Promise<PostBlock[]> {
  const response = await notion.blocks.children.list({ block_id: pageId })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.results.map((block: any) => ({
    id: block.id,
    type: block.type,
    content: block[block.type],
  }))
}
