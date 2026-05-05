import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import conversationApi, { type Message } from "../../Agent/api/agent.ai";

type ChatHistoryItem = {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: string;
};

type DashboardChatHistoryProps = {
  isExpanded: boolean;
  userId?: string;
};

const buildHistoryItems = (savedMessages: Message[]): ChatHistoryItem[] => {
  const historyMap = new Map<string, ChatHistoryItem>();

  savedMessages.forEach((message) => {
    const savedAt = message.created_at ?? new Date().toISOString();
    const existingItem = historyMap.get(message.conversation_id);

    if (!existingItem) {
      historyMap.set(message.conversation_id, {
        id: message.conversation_id,
        title: message.role === "user" ? message.content : "New chat",
        lastMessage: message.content,
        updatedAt: savedAt,
      });
      return;
    }

    if (existingItem.title === "New chat" && message.role === "user") {
      existingItem.title = message.content;
    }

    existingItem.lastMessage = message.content;
    existingItem.updatedAt = savedAt;
  });

  return Array.from(historyMap.values()).sort(
    (firstItem, secondItem) =>
      new Date(secondItem.updatedAt).getTime() -
      new Date(firstItem.updatedAt).getTime(),
  );
};

const DashboardChatHistory = ({
  isExpanded,
  userId,
}: DashboardChatHistoryProps) => {
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeConversationId = searchParams.get("conversation");

  const loadHistory = useCallback(async () => {
    if (!userId) {
      setHistory([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const savedMessages = await conversationApi.getUserMessages(userId);
      setHistory(buildHistoryItems(savedMessages));
    } catch (historyError) {
      const message =
        historyError instanceof Error
          ? historyError.message
          : "Could not load history.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void loadHistory();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [loadHistory]);

  useEffect(() => {
    const handleHistoryUpdate = () => {
      void loadHistory();
    };

    window.addEventListener("chat-history-updated", handleHistoryUpdate);
    return () =>
      window.removeEventListener("chat-history-updated", handleHistoryUpdate);
  }, [loadHistory]);

  const handleSelectConversation = (conversationId: string) => {
    navigate(`/?conversation=${conversationId}`);
  };

  return (
    <section
      className={`mt-5 border-t border-base-300 pt-4 ${
        isExpanded ? "lg:block" : "lg:hidden"
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2 px-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
          Agent history
        </p>
      </div>

      {loading && (
        <p className="px-1 text-xs text-base-content/50">Loading...</p>
      )}
      {error && <p className="px-1 text-xs text-error">{error}</p>}
      {!loading && !error && history.length === 0 && (
        <p className="px-1 text-xs text-base-content/50">No history yet.</p>
      )}

      <div className="flex flex-col gap-1">
        {history.map((item) => {
          const isActive = item.id === activeConversationId;

          return (
            <button
              className={`rounded-lg px-3 py-2 text-left transition ${
                isActive
                  ? "bg-base-200 text-primary"
                  : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
              }`}
              key={item.id}
              onClick={() => handleSelectConversation(item.id)}
              type="button"
            >
              <p className="truncate text-sm font-medium">{item.title}</p>
              <p className="mt-0.5 truncate text-xs opacity-60">
                {item.lastMessage}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardChatHistory;
