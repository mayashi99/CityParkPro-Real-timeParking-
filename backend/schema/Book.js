// Create a model
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: String

});

const Book = mongoose.model('Book', bookSchema);

exports.Book = Book;
