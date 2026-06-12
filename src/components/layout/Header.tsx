import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <BookOpen className="h-5 w-5" />
          DevArchive
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/posts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            글 목록
          </Link>
        </nav>
      </div>
    </header>
  )
}
