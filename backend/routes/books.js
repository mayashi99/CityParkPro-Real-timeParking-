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

module.exports = router;