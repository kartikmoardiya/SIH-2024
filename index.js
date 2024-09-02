const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./Database/db');
const router = express.Router();
const model = require('./Models/user')
const PORT = process.env.PORT || 3000;


const youtube_search = require('./Routes/youtube_search')
const video_description = require('./Routes/video_description')
const video_growth = require('./Routes/video_growth')
const mp4_to_text = require('./Routes/mp4_to_text')
const test = require('./test')


app.use(bodyParser.json());
app.use('/youtube',youtube_search);
app.use('/video',video_description);
app.use('/growth',video_growth);
app.use('/test',test)
app.use('/',mp4_to_text);
app.get('/',(req,res)=>{
    res.json({msg:"Welcome, Welcome, Bhale Padhara"});
})

app.listen(PORT, ()=>{
    console.log("Listing on port 3000...");
})