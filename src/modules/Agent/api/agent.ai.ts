import { supabase } from "../../../lib/superbase";

export type MessageRole = "user" | "assistant";

export type Conversation = {
  id: string;
  user_id: string;
  created_at?: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  user_id: string;
  role: MessageRole;
  content: string;
  created_at?: string;
};

type SendMessagePayload = {
  conversation_id: string;
  user_id: string;
  role: MessageRole;
  content: string;
};

const agentApi = {
  // 1. Create conversation
  createConversation: async (user_id: string) => {
    const { data, error } = await supabase
      .from("conversations")
      .insert({ id: crypto.randomUUID(), user_id })
      .select()
      .single();

    if (error) throw error;
    return data as Conversation;
  },

  // 2. Send message (user or assistant)
  sendMessage: async (payload: SendMessagePayload) => {
    const { data, error } = await supabase
      .from("messages")
      .insert({ id: crypto.randomUUID(), ...payload })
      .select()
      .single();

    if (error) throw error;
    return data as Message;
  },

  // 3. Get messages of a conversation
  getMessages: async (conversation_id: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversation_id)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data as Message[];
  },

  getUserMessages: async (user_id: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data as Message[];
  },
};

export default agentApi;
