"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const ChatWindow = ({ messages }: { messages: Message[] }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Autoscroll: follow new content during streaming
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 120;

    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messages.length === 0) return null;

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
      <div className="max-w-3xl mx-auto">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
