import ChatLayoutClient from "@/components/chat-layout-client"
import type * as React from "react"

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <ChatLayoutClient>{children}</ChatLayoutClient>
}
