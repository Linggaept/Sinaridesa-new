"use client"

import { Button } from "@/components/ui/button"
import type * as React from "react"
import { ChatProvider, useChat } from "./chat-context"
import ChatSidebar from "./chat-sidebar"

function ChatShell({ children }: { children: React.ReactNode }) {
  const { conversations, activeId, selectConversation, newChat, sidebarOpen, setSidebarOpen } = useChat()

  return (
    <div className="h-[100dvh] flex bg-background">
      {/* Sidebar desktop */}
      <div className="hidden md:block">
        <ChatSidebar
          conversations={conversations.map((c : any) => ({
            id: c.id,
            title: c.title,
            lastMessage: c.messages[c.messages.length - 1]?.content,
          }))}
          selectedId={activeId}
          onSelect={selectConversation}
          header={
            <Button
              size="sm"
              variant="secondary"
              className="bg-sidebar-accent text-sidebar-accent-foreground"
              onClick={newChat}
            >
              Chat Baru
            </Button>
          }
        />
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Tutup sidebar"
          />
          <div className="fixed inset-y-0 left-0 w-72 md:hidden">
            <ChatSidebar
              conversations={conversations.map((c : any) => ({
                id: c.id,
                title: c.title,
                lastMessage: c.messages[c.messages.length - 1]?.content,
              }))}
              selectedId={activeId}
              onSelect={selectConversation}
              header={
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-sidebar-accent text-sidebar-accent-foreground"
                  onClick={newChat}
                >
                  Chat Baru
                </Button>
              }
            />
          </div>
        </>
      )}

      {/* Area utama */}
      <main className="flex-1 flex flex-col h-full w-full">{children}</main>
    </div>
  )
}

export default function ChatLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider>
      <ChatShell>{children}</ChatShell>
    </ChatProvider>
  )
}
