"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

const ChatInput = ({ onSend }: { onSend: (msg: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="w-full p-4 pb-10">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything..."
            className="h-14 w-full px-5 pr-14 rounded-full bg-[#303030] border border-muted/10 text-white outline-none"
          />

          <Button onClick={handleSend} className="absolute top-2 right-2 bg-indigo-500 size-10 rounded-full">
            <HugeiconsIcon icon={ArrowRight02Icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
