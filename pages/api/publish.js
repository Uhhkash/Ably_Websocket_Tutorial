import Ably from 'ably';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, text } = req.body;

  if (!type || !text) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  try {
    const ably = new Ably.Rest({ key: process.env.ABLY_SERVER_API_KEY });
    const channel = ably.channels.get('headlines');

    await channel.publish(type, { text });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error publishing to Ably:', error);
    res.status(500).json({ error: 'Failed to publish event' });
  }
}
