
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { message } = req.body;

  // Čia įrašytum Azure + ElevenLabs integraciją (bus papildyta)
  const fakeReply = "Ho ho ho! Ačiū už tavo žinutę!";

  res.status(200).json({ reply: fakeReply });
}
