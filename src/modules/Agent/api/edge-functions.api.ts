import { supabase } from "../../../lib/superbase";

const getFunctionErrorMessage = async (error: unknown) => {
  const fallback =
    error instanceof Error ? error.message : "Failed to call Edge Function";

  if (!error || typeof error !== "object" || !("context" in error)) {
    return fallback;
  }

  const context = (error as { context?: unknown }).context;

  if (!(context instanceof Response)) {
    return fallback;
  }

  try {
    const body = await context.clone().json();
    return typeof body?.error === "string" ? body.error : fallback;
  } catch {
    return fallback;
  }
};

export const agentApi = {
  generateReply: async (message: string) => {
    if (!message?.trim()) {
      throw new Error("Message is required");
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("No auth session found. User not logged in.");
    }

    const { data, error } = await supabase.functions.invoke("generate-reply", {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: { message },
    });

    if (error) {
      throw new Error(await getFunctionErrorMessage(error));
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    return data.reply;
  },
};
