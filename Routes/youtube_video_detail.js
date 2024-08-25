const ytdl = require('ytdl-core');
const express = require('express')
const app = express()
const router = express.Router()


router.get('/detail', async (req, res) => {
    const videoUrls = [
        'https://www.youtube.com/watch?v=9kQ1JUDleWg',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',

        // Add more URLs here
    ];

    try {
        const descriptions = await Promise.all(videoUrls.map(async (videoUrl) => {
            const info = await ytdl.getInfo(videoUrl);
            return info.videoDetails.description;
        }));

        res.json({ data: descriptions });
    } catch (error) {
        console.error('Error fetching video info:', error);
        res.status(500).json({ error: 'Failed to fetch video details' });
    }
});

module.exports = router;


module.exports = router