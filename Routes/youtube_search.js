// For Searching
const ytSearch = require('youtube-search-api');
const express = require('express')
const app = express()
const router = express.Router()

// Try for example
// 8c6kE5LKTMI
// https://www.youtube.com/watch?v=8c6kE5LKTMI
// https://www.youtube.com/watch?v={AgyTHzjBS-c}


async function searchYouTubeVideo(query) {
    try {
        const results = await ytSearch.GetListByKeyword(query, false, 10); // `query` is the search term, and `10` is the number of results
        // console.log('Search results:', results.items);
        // console.log('Search results:')

        return results.items;
    } catch (error) {

        // console.error('Error searching YouTube:', error);
        return error;
    }
}


router.get('/video',async(req, res)=>{
    let query = req.body.title;
    
    try {
        const results = await ytSearch.GetListByKeyword(query, false, 20); // `query` is the search term, and `10` is the number of results
        res.send(results.items)
    } catch (error) {
        res.send("Error chhe bhai")
    }
})


module.exports = router