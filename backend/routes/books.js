var express = require('express');
var router = express.Router();
const { Book } = require('../schema/Book');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('indexhjvjhv');
});

router.post('/', async function (req, res, next) {
  const { title, author, year } = req.body;
    const book = new Book({ title, author, year });
    try {
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
});


/* GET: Retrieve all books 
router.get('/', async function (req, res) {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send(error);
    }
});*/

/* GET: Retrieve a single book by ID 
router.get('/:id', async function (req, res) {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send({ message: "Book not found" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).send(error);
    }
});*/

/* PUT: Update a book by ID 
router.put('/:id', async function (req, res) {
    try {
        const { title, author, year } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, year },
            { new: true, runValidators: true }
        );

        if (!updatedBook) return res.status(404).send({ message: "Book not found" });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).send(error);
    }
});*/

/* DELETE: Remove a book by ID 
router.delete('/:id', async function (req, res) {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).send({ message: "Book not found" });
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
});*/

module.exports = router;
