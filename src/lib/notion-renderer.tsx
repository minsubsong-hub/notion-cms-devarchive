import React from 'react'
import type { PostBlock } from '@/types/post'

function renderText(richText: Array<{ plain_text: string; annotations?: { bold?: boolean; italic?: boolean; code?: boolean } }>) {
  return richText?.map((t, i) => {
    let text: React.ReactNode = t.plain_text
    if (t.annotations?.bold) text = <strong key={i}>{text}</strong>
    if (t.annotations?.italic) text = <em key={i}>{text}</em>
    if (t.annotations?.code) text = <code key={i} className="bg-muted px-1 rounded text-sm font-mono">{text}</code>
    return <span key={i}>{text}</span>
  }) ?? null
}

export function renderBlock(block: PostBlock): React.ReactNode {
  const { type, content } = block

  switch (type) {
    case 'paragraph':
      return (
        <p key={block.id} className="mb-4 leading-7">
          {renderText(content?.rich_text)}
        </p>
      )
    case 'heading_1':
      return <h1 key={block.id} className="text-3xl font-bold mt-8 mb-4">{renderText(content?.rich_text)}</h1>
    case 'heading_2':
      return <h2 key={block.id} className="text-2xl font-bold mt-6 mb-3">{renderText(content?.rich_text)}</h2>
    case 'heading_3':
      return <h3 key={block.id} className="text-xl font-semibold mt-4 mb-2">{renderText(content?.rich_text)}</h3>
    case 'bulleted_list_item':
      return <li key={block.id} className="ml-4 mb-1 list-disc">{renderText(content?.rich_text)}</li>
    case 'numbered_list_item':
      return <li key={block.id} className="ml-4 mb-1 list-decimal">{renderText(content?.rich_text)}</li>
    case 'code':
      return (
        <pre key={block.id} className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
          <code className="text-sm font-mono">{content?.rich_text?.[0]?.plain_text}</code>
        </pre>
      )
    case 'callout':
      return (
        <div key={block.id} className="flex gap-3 p-4 bg-muted rounded-lg mb-4">
          <span>{content?.icon?.emoji}</span>
          <p>{renderText(content?.rich_text)}</p>
        </div>
      )
    case 'divider':
      return <hr key={block.id} className="my-6 border-border" />
    default:
      return (
        <div key={block.id} className="bg-muted/50 p-3 rounded mb-2 text-sm text-muted-foreground">
          [{type} 블록]
        </div>
      )
  }
}
