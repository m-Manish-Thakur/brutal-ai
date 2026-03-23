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

  const handleSend = async (text: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Fake AI response (replace with API)
    setTimeout(() => {
      const aiMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "Thinking brutally... " + text,
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 h-full">
        <Sidebar />
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1 h-full bg-[#181818]">
        {/* Messages OR Empty State */}
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">Start a conversation</div>
        ) : (
          <ChatWindow messages={messages} />
        )}

        {/* Input */}
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Page;
