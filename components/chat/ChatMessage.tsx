"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  role: "user" | "assistant";
  content: string;
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 transition-all"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

const ChatMessage = ({ role, content }: Props) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx("w-full flex mb-6", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold mr-3 mt-1 shrink-0">
          A
        </div>
      )}

      <div
        className={clsx(
          "text-sm leading-relaxed",
          isUser
            ? "max-w-[75%] bg-indigo-500/90 text-white px-4 py-3 rounded-2xl rounded-br-sm"
            : "flex-1 min-w-0 text-gray-200"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ children, className }) {
                const match = /language-(\w+)/.exec(className || "");
                const lang = match ? match[1] : "";
                const codeString = String(children).replace(/\n$/, "");
                const isBlock = codeString.includes("\n") || lang;

                if (isBlock) {
                  return (
                    <div className="relative my-3 rounded-xl overflow-hidden border border-white/10">
                      {lang && (
                        <div className="flex items-center justify-between bg-[#1a1a2e] px-4 py-2 border-b border-white/10">
                          <span className="text-xs text-indigo-400 font-mono uppercase tracking-wider">{lang}</span>
                          <CopyButton text={codeString} />
                        </div>
                      )}
                      {!lang && <CopyButton text={codeString} />}
                      <SyntaxHighlighter
                        style={oneDark}
                        language={lang || "text"}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderRadius: 0,
                          background: "#0f0f1a",
                          fontSize: "0.8rem",
                          padding: "1rem",
                        }}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  );
                }

                return (
                  <code className="bg-white/10 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-[0.8em]">
                    {children}
                  </code>
                );
              },
              p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="text-gray-300">{children}</li>,
              h1: ({ children }) => <h1 className="text-lg font-semibold mb-2 text-white">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-semibold mb-2 text-white">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 text-white">{children}</h3>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-indigo-500 pl-3 italic text-gray-400 my-2">
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
              a: ({ href, children }) => (
                <a href={href} className="text-indigo-400 hover:underline" target="_blank" rel="noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
        {/* Blinking cursor while streaming */}
        {!isUser && content === "" && <span className="inline-block w-2 h-4 bg-indigo-400 animate-pulse rounded-sm" />}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
