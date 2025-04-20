const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const sessions = [];

// Start a new voting session
app.post('/start-session', (req, res) => {
  const { playlistName } = req.body;
  const sessionId = sessions.length + 1;
  sessions.push({ sessionId, playlistName, tracks: [] });
  res.status(201).json({ message: 'Session started', sessionId });
});

// Submit a track
app.post('/submit-track', (req, res) => {
  const { sessionId, trackLink } = req.body;
  const session = sessions.find(s => s.sessionId === sessionId);
  if (session) {
    session.tracks.push({ trackLink, votes: { yes: 0, no: 0 } });
    res.status(201).json({ message: 'Track submitted' });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
});

// Vote on a track
app.post('/vote', (req, res) => {
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
});

// Evaluate results
app.get('/results/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions.find(s => s.sessionId == sessionId);
  if (session) {
    res.status(200).json(session.tracks);
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
});

// Placeholder route
app.get('/', (req, res) => {
  res.send('Welcome to SpotifyVoteApp!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
