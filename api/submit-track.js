let sessions = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { sessionId, trackLink } = req.body;
    const session = sessions.find(s => s.sessionId === sessionId);
    if (session) {
      session.tracks.push({ trackLink, votes: { yes: 0, no: 0 } });
      res.status(201).json({ message: 'Track submitted' });
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
