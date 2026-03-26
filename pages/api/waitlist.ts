import { NextApiRequest, NextApiResponse } from 'next';

let waitlistDB = new Set(); // Simple in-memory storage for prototype

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    if (waitlistDB.has(email)) {
      return res.status(409).json({ message: 'This email is already registered' });
    }

    waitlistDB.add(email);

    return res.status(200).json({ message: 'Successfully registered' });
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
}
