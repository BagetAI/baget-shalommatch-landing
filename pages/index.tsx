import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to sign up. Please try again.');
      }
    } catch {
      setError('Failed to sign up. Please try again.');
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
        ShalomMatch
      </h1>

      <p className="max-w-lg text-center text-gray-700 mb-8 px-4">
        The dating app crafted for olim hadashim in Tel Aviv. Connect, integrate, and
        find meaningful relationships with others who share your unique journey.
      </p>

      <section className="max-w-xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-700">
          Join the ShalomMatch waitlist
        </h2>

        {submitted ? (
          <p className="text-green-600 text-center font-medium">
            Thank you for joining the waitlist! We&apos;ll be in touch soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              aria-label="Email address"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Join Waitlist
            </button>
          </form>
        )}
      </section>

      <footer className="mt-12 text-center text-sm text-gray-500 max-w-md px-4">
        <p>47; 2024 ShalomMatch. Designed for olim hadashim in Tel Aviv. All rights reserved.</p>
      </footer>
    </main>
  );
}
