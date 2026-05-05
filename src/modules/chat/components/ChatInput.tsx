import { useState } from "react";
import { Plus, Mic, AudioLines } from "lucide-react";

const ChatInputUI = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full bg-[#171717] p-4">
      {/* Main Container */}
      <div className="relative flex items-center w-full max-w-3xl group">
        {/* Input Wrapper */}
        <div className="flex items-center w-full bg-[#2f2f2f] hover:bg-[#383838] transition-colors duration-200 rounded-full px-4 py-2 shadow-lg border border-white/5">
          {/* Plus Icon (Add/Upload) */}
          <button className="p-2 text-zinc-400 hover:text-white transition-colors">
            <Plus size={20} strokeWidth={2.5} />
          </button>

          {/* Text Input */}
          <input
            type="text"
            placeholder="Ask anything"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-500 px-3 py-2 text-[16px]"
          />

          {/* Mic Icon */}
          <button className="p-2 text-zinc-400 hover:text-white transition-colors mr-1">
            <Mic size={20} />
          </button>

          {/* Voice/Wave Action Button */}
          <button className="bg-white p-2 rounded-full text-black hover:bg-zinc-200 transition-all active:scale-95 shadow-md">
            <AudioLines size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Footer Text */}
      <p className="mt-4 text-[12px] text-zinc-500">
        ChatGPT can make mistakes. Check important info.{" "}
        <span className="underline cursor-pointer hover:text-zinc-400">
          Cookie Preferences
        </span>
        .
      </p>
    </div>
  );
};

export default ChatInputUI;
