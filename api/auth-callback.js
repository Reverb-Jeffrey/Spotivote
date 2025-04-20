import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { code } = req.query;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = 'https://spotivote-8hyatnlbh-spotivotes-projects.vercel.app/api/auth-callback';

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store access and refresh tokens securely
      res.status(200).json({ message: 'Authorization successful', tokens: data });
    } else {
      res.status(response.status).json({ message: data.error_description });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
