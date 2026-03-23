import Sidebar from "@/components/chat/Sidebar";
import React from "react";

const Page = () => {
  return (
    <div className="flex items-start w-full h-screen">
      <div className="w-65 h-full">
        <Sidebar />
      </div>
      <div className="grow bg-foreground/90 h-full"></div>
    </div>
  );
};

export default Page;
