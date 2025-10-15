"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  useChat,
  ChatMessage as Message,
  Role,
} from "@/components/chat-context";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatSlugPage() {
  const {
    active,
    isTyping,
    setSidebarOpen,
    sendUserMessage,
    conversations,
    setActiveId,
  } = useChat();
  const [input, setInput] = React.useState("");
  const params = useParams();

  React.useEffect(() => {
    const slug = params.slug as string;
    if (slug) {
      const currentConv = conversations.find((c) => c.id === slug);
      if (currentConv) {
        setActiveId(slug);
      }
    }
  }, [params.slug, conversations, setActiveId]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    sendUserMessage(trimmed);
    setInput("");
  }

  return (
    <div className="h-[100dvh] w-full flex bg-background">
      {/* Main area */}
      <main className="flex-1  flex flex-col h-full">
        {/* header tetap di page, tombol menu buka sidebar via context */}
        <header className="sticky top-0 z-10 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex items-center gap-2 p-3 md:p-4">
            <Button asChild variant="outline">
              <Link href="/">Kembali</Link>
            </Button>
            <Button
              variant="secondary"
              className="md:hidden"
              onClick={() => setSidebarOpen((s) => !s)}
              aria-label="Buka sidebar"
            >
              Menu
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="size-7">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  B
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium text-pretty">
                  {active?.title || "Percakapan"}
                </div>
                <div className="text-xs text-muted-foreground">
                  AI Sinari Desa
                </div>
              </div>
            </div>
          </div>
        </header>

        <ChatMessages messages={active?.messages || []} isTyping={isTyping} />

        <Separator />

        <form onSubmit={handleSend} className="p-3 md:p-4">
          <div className="flex items-center gap-2">
            <label htmlFor="message" className="sr-only">
              Tulis pesan
            </label>
            <Input
              id="message"
              placeholder="Tulis pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-muted"
            />
            <Button
              type="submit"
              className="bg-primary text-primary-foreground"
              disabled={!input.trim()}
            >
              Kirim
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

function ChatMessages({
  messages,
  isTyping,
}: {
  messages: Message[];
  isTyping?: boolean;
}) {
  // Auto scroll to bottom when messages update
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, isTyping]);

  return (
    <div ref={ref} className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="mx-auto w-full max-w-3xl">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <ChatBubble key={m.id} role={m.role} content={m.content} />
          ))}
          {isTyping && <TypingBubble key="typing" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ChatBubble({ role, content }: { role: Role; content: string }) {
  const isUser = role === "user";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.7 }}
      className={cn(
        "mb-3 md:mb-4 flex items-end gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
      role="listitem"
      aria-label={isUser ? "Pesan pengguna" : "Pesan asisten"}
    >
      {!isUser && (
        <Avatar className="size-7">
          <AvatarFallback className="bg-primary text-primary-foreground">
            A
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "prose prose-sm max-w-[85%] md:max-w-[70%] rounded-2xl px-3.5 py-2.5 shadow-sm border",
          isUser
            ? "bg-primary text-primary-foreground border-transparent prose-invert"
            : "bg-card text-foreground border-border"
        )}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>

      {isUser && (
        <Avatar className="size-7">
          <AvatarFallback className="bg-muted text-foreground">
            U
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="mb-3 md:mb-4 flex items-end gap-2 justify-start"
      aria-live="polite"
      aria-label="Asisten sedang mengetik"
    >
      <Avatar className="size-7">
        <AvatarFallback className="bg-primary text-primary-foreground">
          A
        </AvatarFallback>
      </Avatar>

      <div className="max-w-[70%] rounded-2xl px-3 py-2.5 shadow-sm border bg-card text-foreground border-border">
        <div className="flex items-center gap-1.5">
          <Dot />
          <Dot delay="0.12s" />
          <Dot delay="0.24s" />
        </div>
      </div>
    </motion.div>
  );
}

function Dot({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="inline-block size-1.5 rounded-full bg-muted-foreground/70"
      style={{
        animation: "chat-bounce 1s infinite",
        animationDelay: delay,
      }}
      aria-hidden="true"
    />
  );
}

/* Keyframes untuk loader typing */
const style = `
@keyframes chat-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: .6; }
  40% { transform: translateY(-2px); opacity: 1; }
}
`;
// Inject minimal style for typing dots
if (typeof document !== "undefined") {
  const id = "chat-typing-style";
  if (!document.getElementById(id)) {
    const el = document.createElement("style");
    el.id = id;
    el.textContent = style;
    document.head.appendChild(el);
  }
}
