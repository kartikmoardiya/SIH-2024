const mongoose = require('mongoose');


const pdfSchema = new mongoose.Schema({
    pdf : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    }
})

const pdfModel = mongoose.model('pdf', pdfSchema);

module.exports = pdfModel;