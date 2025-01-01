import Ably from 'ably';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({});
    return;
  }

  const ably = new Ably.Rest(process.env.ABLY_SERVER_API_KEY);
  const channel = ably.channels.get('headlines');

  if (req.body.type === 'event-2') {
    // Publish "event-2" real-time event
    await channel.publish('event-2', { text: req.body.text });
    res.status(200).json({ success: true });
    return;
  }

  // Default handling for other event types
  res.status(400).json({ error: 'Invalid event type' });
}
