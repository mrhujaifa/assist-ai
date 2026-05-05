import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

type ChatUiProps = {
  messages: ChatMessage[];
  loading: boolean;
};

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const ChatUi = ({ messages, loading }: ChatUiProps) => {
  const { user } = useAuth();

  const greetings = [
    "ready to build something awesome?",
    "what are we creating today?",
    "let’s turn your idea into reality!",
    "what can I help you build today?",
  ];

  const [randomGreeting] = useState(() => {
    return greetings[Math.floor(Math.random() * greetings.length)];
  });

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-90 lg:block lg:pt-120 lg:pl-40 lg:pr-70 px-6">
        <div className="max-w-xl w-full text-center lg:text-left space-y-6 mx-auto lg:mx-0">
          {/* Greeting */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl text-center lg:text-3xl font-semibold text-gray-300 leading-tight">
              {user?.name
                ? `${user.name}, ${randomGreeting}`
                : `Hey! ${randomGreeting}`}
            </h1>

            <p className="text-zinc-400 text-base md:text-lg text-center">
              What can I help you with today?
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 lg:px-20 flex w-full max-w-4xl flex-col gap-4 py-6">
      {messages.map((message) => {
        const isUser = message.role === "user";

        return (
          <div
            key={message.id}
            className={`chat ${isUser ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-header text-xs text-zinc-500">
              {isUser ? "You" : "AssistAI"}
              <time className="ml-2">{formatTime(message.createdAt)}</time>
            </div>
            <div
              className={`chat-bubble whitespace-pre-wrap ${
                isUser ? "chat-bubble-primary" : ""
              }`}
            >
              {message.content}
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="chat chat-start">
          <div className="chat-header text-xs text-zinc-500">AssistAI</div>
          <div className="chat-bubble">Thinking...</div>
        </div>
      )}
    </div>
  );
};

export default ChatUi;
