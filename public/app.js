console.log('SpotifyVoteApp is ready!');

document.getElementById('start-session-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const playlistName = document.getElementById('playlist-name').value;
    const response = await fetch('/start-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlistName })
    });
    const data = await response.json();
    alert(data.message);
});

document.getElementById('submit-track-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const sessionId = document.getElementById('session-id').value;
    const trackLink = document.getElementById('track-link').value;
    const response = await fetch('/submit-track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, trackLink })
    });
    const data = await response.json();
    alert(data.message);
});
