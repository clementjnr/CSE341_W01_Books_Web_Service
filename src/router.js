// Issue #3: GET /books/:id route
// Returns a single book by its ID from cse341-books-db.books collection
// Test Plan: GET /books/b1 returns one book, GET /books/invalid returns 404

import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

const router = express.Router();

router.get('/books', getBooksHandler);
router.get('/books/:id', getBookByIdHandler);

export default router;
