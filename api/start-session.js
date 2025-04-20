let sessions = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { playlistName } = req.body;
    const sessionId = sessions.length + 1;
    sessions.push({ sessionId, playlistName, tracks: [] });
    res.status(201).json({ message: 'Session started', sessionId });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
