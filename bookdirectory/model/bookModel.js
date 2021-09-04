const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
    name:String,
    genre:String,
    author:String,
    rating:Number
})

let Book =new mongoose.model('Book',bookSchema);
module.exports = Book;