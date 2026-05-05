export const edgeFunctionsService = {
  helloWorld: async (name: string) => {
    const response = await fetch(
      "http://127.0.0.1:54321/functions/v1/hello-world", // create a api usee supabase edge function
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to call Edge Function");
    }

    return response.json();
  },
};