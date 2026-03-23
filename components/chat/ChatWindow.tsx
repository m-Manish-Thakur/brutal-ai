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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) return null;

  return (
    <div className="flex-1 overflow-y-auto p-6">
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
