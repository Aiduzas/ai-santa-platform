// pages/api/santa.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Tik POST metodas leidžiamas' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Nėra žinutės' });
  }

  // Čia grąžinsim tik paprastą atsakymą (testui)
  return res.status(200).json({ reply: `Ho ho ho! Tu parašei: ${message}` });
}
