import { edgeFunctionsService } from "../../services/edge-functions.service";

export default function HomePage() {
  async function handleTest() {
    try {
      const data = await edgeFunctionsService.helloWorld("Hujaifa");
      alert(data.message);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <main className="p-6">
      <button
        onClick={handleTest}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Test Edge Function
      </button>
    </main>
  );
}
