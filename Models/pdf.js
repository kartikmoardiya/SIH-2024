const mongoose = require('mongoose');


const pdfSchema = new mongoose.Schema({
    pdfName : {
        type : String,
        required : true
    },
})

const pdfModel = mongoose.model('pdf', pdfSchema);

module.exports = pdfModel;