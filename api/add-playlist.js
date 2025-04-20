// Add Playlist
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { playlistName } = req.body;
    const accessToken = await getAccessToken();

    // Example logic to add a playlist to Spotify
    const response = await fetch('https://api.spotify.com/v1/users/user_id/playlists', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        description: 'New playlist description',
        public: false
      })
    });

    if (response.ok) {
      const playlistData = await response.json();
      res.status(201).json({ message: 'Playlist added', playlistId: playlistData.id });
    } else {
      const errorData = await response.json();
      res.status(response.status).json({ message: errorData.error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
