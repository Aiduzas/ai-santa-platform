import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    const res = await fetch("/api/santa-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data.reply || "Atsiprašau, įvyko klaida.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">🎅 Pasikalbėk su Kalėdų Seneliu</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Parašyk savo klausimą..."
        rows={4}
        className="w-full max-w-xl p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
      >
        {loading ? "Kalėdų Senelis galvoja..." : "Siųsti"}
      </button>
      {response && (
        <div className="mt-6 bg-white p-4 rounded shadow w-full max-w-xl">
          <strong>Senelis:</strong>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
