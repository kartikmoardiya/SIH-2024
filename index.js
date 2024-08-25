const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./Database/db');
const router = express.Router();
const model = require('./Models/user')
const PORT = process.env.PORT || 3000;


const youtube_search = require('./Routes/youtube_search')
const video_detail = require('./Routes/youtube_video_detail')


app.use(bodyParser.json());
app.use('/youtube',youtube_search);
app.use('/video',video_detail);
app.get('/',(req,res)=>{
    res.json({msg:"Welcome, Welcome, Bhale Padhara"});
})

app.listen(PORT, ()=>{
    console.log("Listing on port 3000...");
})