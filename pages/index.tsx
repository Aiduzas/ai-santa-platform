import { useState } from 'react';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [santaResponse, setSantaResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setSantaResponse('Kalėdų Senelis jau kalba!');

    try {
      const response = await fetch('/api/santa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      });

      const data = await response.json();
      console.log('Audio URL:', data.audioUrl);

      const audio = new Audio(data.audioUrl);
      await audio.play();

      setSantaResponse('✔️ Kalėdų Senelio atsakymas paleistas!');
    } catch (error) {
      console.error('Klaida siunčiant žinutę:', error);
      setSantaResponse('❌ Klaida! Nepavyko paleisti garso.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🎅 Pasikalbėk su Kalėdų Seneliu</h1>
      <textarea
        rows={3}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ width: '300px' }}
      />
      <br />
      <button onClick={handleSend} disabled={loading}>
        Siųsti
      </button>
      <p><strong>Senelis:</strong></p>
      <p>{santaResponse}</p>
    </div>
  );
}
