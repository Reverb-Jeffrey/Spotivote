import dotenv from 'dotenv';

dotenv.config();

export default function handler(req, res) {
  if (req.method === 'GET') {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = 'https://spotivote-8hyatnlbh-spotivotes-projects.vercel.app/api/auth-callback';
    const scopes = 'playlist-modify-private playlist-modify-public';

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    res.redirect(authUrl);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
