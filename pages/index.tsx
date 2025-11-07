// pages/index.tsx
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse('');
    setError('');
    setAudioUrl('');

    try {
      const res = await fetch('/api/santa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse('Kalėdų Senelis jau kalba!');
      setAudioUrl(data.audioUrl);
    } catch (err) {
      console.error('Klaida siunčiant žinutę:', err);
      setError('❌ Klaida! Nepavyko paleisti garso.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎅 Pasikalbėk su Kalėdų Seneliu</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          cols={40}
        />
        <br />
        <button type="submit">Sižsti</button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <strong>Senelis:</strong>
        <p>{response}</p>
        {audioUrl && (
          <audio controls autoPlay src={audioUrl}></audio>
        )}
        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}
      </div>
    </div>
  );
}