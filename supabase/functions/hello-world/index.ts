import "@supabase/functions-js/edge-runtime.d.ts";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  const { name } = await req.json();

  return new Response(
    JSON.stringify({
      message: `Hello ${name}`,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
});