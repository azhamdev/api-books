const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/auth')
const { getAllBooks, createBook, updateBook, deleteBook, getBookById } = require('./controller')

router.get('/books', auth, getAllBooks);
router.get('/books/:id', auth, getBookById);
router.post('/books', auth, createBook);
router.put('/books/:id', auth, updateBook);
router.delete('/books/:id', auth, deleteBook);

module.exports = router;