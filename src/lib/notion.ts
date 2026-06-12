import { Client } from '@notionhq/client'
import type { Post, PostBlock } from '@/types/post'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DATABASE_ID = process.env.NOTION_DATABASE_ID!

const DEMO_POSTS: Post[] = [
  {
    id: 'demo-1',
    title: 'Next.js 15 App Router 완벽 가이드',
    slug: 'nextjs-15-app-router-guide',
    summary: 'Next.js 15의 App Router 핵심 개념인 Server Components, Streaming, ISR을 실전 예제와 함께 설명합니다.',
    category: 'Next.js',
    tags: ['App Router', 'ISR', 'Server Components'],
    status: 'Published',
    publishedAt: '2026-06-01',
  },
  {
    id: 'demo-2',
    title: 'TypeScript strict mode 실전 적용기',
    slug: 'typescript-strict-mode',
    summary: 'any 타입 없이 TypeScript strict mode를 운영 프로젝트에 적용하면서 겪은 트러블슈팅과 해결 방법을 공유합니다.',
    category: 'TypeScript',
    tags: ['strict', 'type-safety', '트러블슈팅'],
    status: 'Published',
    publishedAt: '2026-05-28',
  },
  {
    id: 'demo-3',
    title: 'Supabase RLS 5가지 패턴',
    slug: 'supabase-rls-patterns',
    summary: 'Supabase Row Level Security의 5가지 핵심 패턴을 예제 코드와 함께 정리합니다.',
    category: 'Supabase',
    tags: ['RLS', 'PostgreSQL', '보안'],
    status: 'Published',
    publishedAt: '2026-05-20',
  },
  {
    id: 'demo-4',
    title: 'Zustand vs Jotai: 상태관리 라이브러리 비교',
    slug: 'zustand-vs-jotai',
    summary: '2026년 기준 Zustand와 Jotai의 차이점, 번들 사이즈, 사용성을 실제 프로젝트 기준으로 비교합니다.',
    category: 'React',
    tags: ['Zustand', 'Jotai', '상태관리'],
    status: 'Published',
    publishedAt: '2026-05-15',
  },
  {
    id: 'demo-5',
    title: 'Claude Code로 PRD부터 배포까지 자동화하기',
    slug: 'claude-code-automation',
    summary: 'Claude Code의 서브에이전트, 커스텀 커맨드, 훅을 활용해 PRD 작성부터 Vercel 배포까지 자동화한 워크플로우를 공유합니다.',
    category: 'DevOps',
    tags: ['Claude Code', 'MCP', '자동화'],
    status: 'Published',
    publishedAt: '2026-06-10',
  },
  {
    id: 'demo-6',
    title: 'Tailwind CSS v4 마이그레이션 가이드',
    slug: 'tailwindcss-v4-migration',
    summary: 'Tailwind CSS v3에서 v4로 마이그레이션할 때 주의해야 할 breaking changes와 새로운 기능을 정리합니다.',
    category: 'CSS',
    tags: ['Tailwind', 'v4', '마이그레이션'],
    status: 'Published',
    publishedAt: '2026-06-05',
  },
]

const DEMO_BLOCKS: PostBlock[] = [
  { id: 'b1', type: 'heading_2', content: { rich_text: [{ plain_text: '개요', annotations: {} }] } },
  { id: 'b2', type: 'paragraph', content: { rich_text: [{ plain_text: '이 글은 Notion을 CMS로 활용하는 DevArchive 프로젝트의 데모 콘텐츠입니다. 실제 Notion API 키를 연결하면 Notion에서 작성한 글이 자동으로 표시됩니다.', annotations: {} }] } },
  { id: 'b3', type: 'heading_2', content: { rich_text: [{ plain_text: '핵심 내용', annotations: {} }] } },
  { id: 'b4', type: 'bulleted_list_item', content: { rich_text: [{ plain_text: 'Notion에서 글 작성 → 즉시 웹사이트 반영', annotations: {} }] } },
  { id: 'b5', type: 'bulleted_list_item', content: { rich_text: [{ plain_text: 'Next.js ISR로 60초마다 자동 갱신', annotations: {} }] } },
  { id: 'b6', type: 'bulleted_list_item', content: { rich_text: [{ plain_text: 'TypeScript strict mode로 타입 안전성 보장', annotations: {} }] } },
  { id: 'b7', type: 'code', content: { rich_text: [{ plain_text: '// Notion API로 글 목록 조회\nconst posts = await getPublishedPosts()\nconsole.log(posts)', annotations: {} }] } },
  { id: 'b8', type: 'callout', content: { icon: { emoji: '💡' }, rich_text: [{ plain_text: 'Notion API 키를 설정하면 실제 콘텐츠가 표시됩니다.', annotations: {} }] } },
]

export async function getPublishedPosts(): Promise<Post[]> {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    return DEMO_POSTS
  }

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
    return DEMO_POSTS
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPublishedPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

export async function getPostBlocks(pageId: string): Promise<PostBlock[]> {
  if (!process.env.NOTION_API_KEY) return DEMO_BLOCKS

  try {
    const response = await notion.blocks.children.list({ block_id: pageId })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.results.map((block: any) => ({
      id: block.id,
      type: block.type,
      content: block[block.type],
    }))
  } catch {
    return DEMO_BLOCKS
  }
}
