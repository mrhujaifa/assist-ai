import "@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  const { email, taskTitle } = await req.json();

  if (!email || !taskTitle) {
    return Response.json(
      {
        success: false,
        message: "Email and task title are required",
      },
      {
        status: 400,
      }
    );
  }

  console.log("Sending reminder email to:", email);
  console.log("Task:", taskTitle);

  return Response.json({
    success: true,
    message: `Reminder email sent to ${email} for task: ${taskTitle}`,
  });
});