const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Placeholder route
app.get('/', (req, res) => {
  res.send('Welcome to SpotifyVoteApp!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
