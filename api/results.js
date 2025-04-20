let sessions = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { sessionId } = req.query;
    const session = sessions.find(s => s.sessionId == sessionId);
    if (session) {
      res.status(200).json(session.tracks);
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
