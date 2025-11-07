export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    // 1. Sukuriame SSML išteksto
    const ssml = `
      <speak version='1.0' xml:lang='lt-LT'>
        <voice name='lt-LT-LeonasNeural'>
          <prosody rate="0%" pitch="0%">
            ${message}
          </prosody>
        </voice>
      </speak>
    `;

    // 2. Azure: konvertuojam į tarimą (arba praleidžiam – tiesiog perduodam ElevenLabs)
    // Šiame MVP – praleidžiam Azure Audio generation, naudojam tik SSML logiką

    // 3. ElevenLabs – siunčiam tekstą su Santa balsu
    const elevenResponse = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + process.env.ELEVENLABS_VOICE_ID, {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: message,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.3,
          similarity_boost: 0.9
        }
      })
    });

    if (!elevenResponse.ok) {
      const err = await elevenResponse.text();
      throw new Error("ElevenLabs error: " + err);
    }

    const audioBuffer = await elevenResponse.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString("base64");
    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

    res.status(200).json({ reply: "Kalėdų Senelis jau kalba!", audioUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
