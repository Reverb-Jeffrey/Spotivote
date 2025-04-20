let sessions = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { sessionId, trackLink, vote } = req.body;
    const session = sessions.find(s => s.sessionId === sessionId);
    if (session) {
      const track = session.tracks.find(t => t.trackLink === trackLink);
      if (track) {
        if (vote === 'yes') track.votes.yes++;
        if (vote === 'no') track.votes.no++;
        res.status(200).json({ message: 'Vote counted' });
      } else {
        res.status(404).json({ message: 'Track not found' });
      }
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
