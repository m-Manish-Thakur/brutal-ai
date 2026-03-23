"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  role: "user" | "assistant";
  content: string;
};

const ChatMessage = ({ role, content }: Props) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx("w-full flex mb-4", {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      <div
        className={clsx(
          "max-w-[70%] px-4 py-3 rounded-2xl text-sm",
          isUser ? "bg-indigo-500 text-white rounded-br-none" : "bg-[#2a2a2a] text-gray-200 rounded-bl-none"
        )}
      >
        {content}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
