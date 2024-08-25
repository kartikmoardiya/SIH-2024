const ytdl = require('ytdl-core');
const express = require('express')
const app = express()
const router = express.Router()

router.get('/detail', async (req, res) => {
    const videoUrls = [
        'https://www.youtube.com/watch?v=9kQ1JUDleWg',
        'https://www.youtube.com/watch?v=9kQ1JUDleWg',
        'https://www.youtube.com/watch?v=9kQ1JUDleWg',
        'https://www.youtube.com/watch?v=9kQ1JUDleWg',
        'https://www.youtube.com/watch?v=9kQ1JUDleWg',
        'https://www.youtube.com/watch?v=9kQ1JUDleWg',
         
    ];

    let des;
    videoUrls.forEach(videoUrl => {
        ytdl.getInfo(videoUrl)
            .then(info => {
                des+=info.videoDetails.description;
                // console.log('Description for', videoUrl, ':', info.videoDetails.description);
            })
            .catch(error => console.error('Error fetching video info for', videoUrl, ':', error));
    });
    res.json({data:des})
})

module.exports = router