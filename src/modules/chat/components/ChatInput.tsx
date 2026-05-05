import { useState, type FormEvent } from "react";
import { AudioLines, Mic, Plus, SendHorizontal } from "lucide-react";

type ChatInputUIProps = {
  loading: boolean;
  onSend: (message: string) => Promise<void>;
};

const ChatInputUI = ({ loading, onSend }: ChatInputUIProps) => {
  const [inputValue, setInputValue] = useState("");
  const canSend = inputValue.trim().length > 0 && !loading;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = inputValue.trim();

    if (!message || loading) return;

    setInputValue("");
    await onSend(message);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center p-4 pb-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-3xl items-center rounded-full border border-white/5 px-4 py-2 shadow-2xl"
      >
        <button
          aria-label="Add attachment"
          className="p-2 text-zinc-400 hover:text-white"
          type="button"
        >
          <Plus size={20} />
        </button>

        <input
          className="flex-1 bg-transparent px-3 py-2 text-[16px] text-zinc-100 placeholder-zinc-500 outline-none"
          disabled={loading}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Ask AssistAI"
          type="text"
          value={inputValue}
        />

        <button
          aria-label="Use microphone"
          className="p-2 text-zinc-400 hover:text-white"
          type="button"
        >
          <Mic size={20} />
        </button>

        <button
          aria-label={canSend ? "Send message" : "Voice mode"}
          className={`rounded-full p-2 transition-all ${
            canSend ? "bg-white text-black" : "bg-[#676767] text-zinc-300"
          }`}
          disabled={loading}
          type="submit"
        >
          {canSend ? <SendHorizontal size={20} /> : <AudioLines size={20} />}
        </button>
      </form>

      <p className="mt-3 hidden text-center text-[12px] text-zinc-500 lg:block">
        Assist AI can make mistakes. Check important info.
      </p>
    </div>
  );
};

export default ChatInputUI;
