// Vote on Track
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { trackId, vote } = req.body;
    // Logic to handle voting
    res.status(200).json({ message: 'Vote counted' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
