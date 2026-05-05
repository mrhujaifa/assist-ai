import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import conversationApi, { type Message } from "../Agent/api/agent.ai";
import { agentApi as aiApi } from "../Agent/api/edge-functions.api";
import { authApi } from "../auth/api/auth.api";
import ChatInputUI from "./components/ChatInput";
import ChatUI, { type ChatMessage } from "./components/ChatUi";

const createMessage = (
  role: ChatMessage["role"],
  content: string
): ChatMessage => ({
  id: crypto.randomUUID(),
  role,
  content,
  createdAt: new Date().toISOString(),
});

const toChatMessage = (message: Message): ChatMessage => ({
  id: message.id,
  role: message.role,
  content: message.content,
  createdAt: message.created_at ?? new Date().toISOString(),
});

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedConversationId = searchParams.get("conversation");

  const loadConversation = async (selectedId: string) => {
    setLoading(true);

    try {
      const savedMessages = await conversationApi.getMessages(selectedId);
      setConversationId(selectedId);
      setMessages(savedMessages.map(toChatMessage));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Could not load messages.";
      setMessages([createMessage("assistant", errorMessage)]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      if (!selectedConversationId) {
        setConversationId(null);
        setMessages([]);
        return;
      }

      void loadConversation(selectedConversationId);
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [selectedConversationId]);

  const handleSend = async (message: string) => {
    const userMessage = createMessage("user", message);

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await authApi.getCurrentUser();

      if (userError || !user) {
        throw new Error("Please login first.");
      }

      let activeConversationId = conversationId;

      if (!activeConversationId) {
        const conversation = await conversationApi.createConversation(user.id);
        activeConversationId = conversation.id;
        setConversationId(activeConversationId);
      }

      if (!activeConversationId) {
        throw new Error("Conversation create failed.");
      }

      await conversationApi.sendMessage({
        conversation_id: activeConversationId,
        user_id: user.id,
        role: "user",
        content: message,
      });

      if (selectedConversationId !== activeConversationId) {
        setSearchParams({ conversation: activeConversationId });
      }

      const reply = await aiApi.generateReply(message);
      const assistantMessage = createMessage("assistant", reply);

      await conversationApi.sendMessage({
        conversation_id: activeConversationId,
        user_id: user.id,
        role: "assistant",
        content: reply,
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", errorMessage),
      ]);
    } finally {
      setLoading(false);
      window.dispatchEvent(new Event("chat-history-updated"));
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] pb-32">
      <ChatUI messages={messages} loading={loading} />
      <ChatInputUI loading={loading} onSend={handleSend} />
    </div>
  );
};

export default Chat;
