let waitlistEmails = new Set();

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email || typeof email !== 'string' || !email.match(/^\S+@\S+\.\S+$/)) {
      res.status(400).json({ error: 'Invalid email address' });
      return;
    }

    if (waitlistEmails.has(email.toLowerCase())) {
      res.status(409).json({ error: 'Email already signed up' });
      return;
    }

    waitlistEmails.add(email.toLowerCase());
    res.status(201).json({ message: 'Email added to waitlist successfully' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
