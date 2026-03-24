"use client";

import { useState, useRef, useEffect } from "react";

type Mode = "brutal" | "normal" | "mentor";

const modeLabels: Record<Mode, { label: string; desc: string }> = {
  brutal: { label: "Brutal", desc: "Raw, unfiltered feedback" },
  normal: { label: "Normal", desc: "Balanced responses" },
  mentor: { label: "Mentor", desc: "Guided, patient teaching" },
};

const ChatInput = ({ onSend, disabled }: { onSend: (msg: string, mode: Mode) => void; disabled?: boolean }) => {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<Mode>("normal");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [message]);

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSend(message, mode);
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full px-4 pb-6 pt-2 border-t border-white/5">
      <div className="max-w-3xl mx-auto space-y-2">
        {/* Mode Pills */}
        <div className="flex gap-1.5">
          {(["brutal", "normal", "mentor"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 text-xs rounded-full border transition-all duration-150 ${
                mode === m
                  ? "bg-indigo-500 border-indigo-500 text-white"
                  : "border-white/10 bg-white/5 text-gray-400 hover:text-gray-200 hover:border-white/20"
              }`}
            >
              {modeLabels[m].label}
            </button>
          ))}
          <span className="text-xs text-gray-600 self-center ml-1">{modeLabels[mode].desc}</span>
        </div>

        {/* Input box */}
        <div className="relative flex items-center gap-2 bg-[#252525] border border-white/10 rounded-2xl px-4 py-2.5 focus-within:border-indigo-500/50 transition-colors">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything… (Shift+Enter for newline)"
            rows={1}
            disabled={disabled}
            className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none resize-none max-h-40 leading-relaxed"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="shrink-0 w-8 h-8 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-150"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-600">AI can make mistakes — verify important info.</p>
      </div>
    </div>
  );
};

export default ChatInput;
