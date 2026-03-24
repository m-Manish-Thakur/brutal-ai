"use client";

import { useState } from "react";
import ChatInput from "@/components/chat/ChatInput";
import Sidebar from "@/components/chat/Sidebar";
import { v4 as uuidv4 } from "uuid";
import ChatWindow from "@/components/chat/ChatWindow";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSend = async (text: string, mode: string) => {
    if (!text.trim() || isStreaming) return;

    const userMessage: Message = { id: uuidv4(), role: "user", content: text };
    const aiMessageId = uuidv4();
    const aiMessage: Message = { id: aiMessageId, role: "assistant", content: "" };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: text,
          mode,
          history: messages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        fullText += decoder.decode(value, { stream: true });

        // Use a local snapshot to avoid stale closure issues
        const snapshot = fullText;
        setMessages((prev) => prev.map((msg) => (msg.id === aiMessageId ? { ...msg, content: snapshot } : msg)));
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId ? { ...msg, content: "Something went wrong. Please try again." } : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#181818]">
      <div className="w-64 h-full shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 h-full min-w-0">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <p className="text-gray-400 text-sm">How can I help you today?</p>
          </div>
        ) : (
          <ChatWindow messages={messages} />
        )}

        <ChatInput onSend={handleSend} disabled={isStreaming} />
      </div>
    </div>
  );
};

export default Page;
