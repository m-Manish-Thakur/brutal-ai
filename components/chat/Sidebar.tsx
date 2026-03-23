import { AiMagicIcon, Edit02Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const Sidebar = () => {
  return (
    <div className="w-full bg-foreground/95 h-full p-4 relative border border-muted/10">
      <div className="flex items-center gap-3">
        <HugeiconsIcon icon={AiMagicIcon} className="h-6 text-indigo-500" />{" "}
        <h2 className="text-lg font-semibold text-background/90">Brutal.AI</h2>
      </div>

      <div className="mt-8 space-y-2">
        <div className="flex items-center text-background/80 gap-3 hover:bg-muted-foreground/20 h-9 px-3 rounded-xl text-sm cursor-pointer">
          <HugeiconsIcon icon={Edit02Icon} size={17} />
          New Chat
        </div>

        <div className="flex items-center text-background/80 gap-3 hover:bg-muted-foreground/20 h-9 px-3 rounded-xl text-sm cursor-pointer">
          <HugeiconsIcon icon={Search01Icon} size={17} />
          Search Chats
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <p className="text-xs text-muted-foreground pl-2">YOUR CHATS</p>
      </div>

      <div className="absolute bottom-4 rounded-lg bg-muted/10 w-[85%] p-2 px-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-indigo-500 flex items-center justify-center rounded-full text-xs text-background">
            MT
          </div>
          <div>
            <h2 className="text-sm text-background/90">Manish Thakur</h2>
            <p className="text-xs text-muted-foreground">manishcodes@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
