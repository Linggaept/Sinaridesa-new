"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

type Conversation = {
  id: string
  title: string
  lastMessage?: string
  updatedAt?: string
}

type ChatSidebarProps = {
  conversations: Conversation[]
  selectedId?: string
  onSelect?: (id: string) => void
  className?: string
  header?: React.ReactNode
}

export default function ChatSidebar({ conversations, selectedId, onSelect, className, header }: ChatSidebarProps) {
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    if (!query) return conversations
    const q = query.toLowerCase()
    return conversations.filter(
      (c) => c.title.toLowerCase().includes(q) || (c.lastMessage || "").toLowerCase().includes(q),
    )
  }, [conversations, query])

  return (
    <aside
      className={cn("h-full w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground flex flex-col", className)}
      aria-label="Sidebar riwayat percakapan"
    >
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-pretty">Riwayat Chat</h2>
          {header}
        </div>
        <div className="mt-3">
          <label className="sr-only" htmlFor="search-convo">
            Cari percakapan
          </label>
          <Input
            id="search-convo"
            placeholder="Cari..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-muted"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {filtered.map((c) => {
            const selected = c.id === selectedId
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(c.id)}
                  aria-current={selected ? "page" : undefined}
                  className={cn(
                    "w-full text-left rounded-md p-2 transition-colors",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    selected && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  <div className="text-sm font-medium line-clamp-1">{c.title}</div>
                  {c.lastMessage ? (
                    <div className="text-xs text-muted-foreground line-clamp-1">{c.lastMessage}</div>
                  ) : null}
                </button>
              </li>
            )
          })}
          {filtered.length === 0 && <li className="text-xs text-muted-foreground px-2 py-3">Tidak ada hasil</li>}
        </ul>
      </div>
    </aside>
  )
}
