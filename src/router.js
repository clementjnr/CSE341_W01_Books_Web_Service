import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';
import {
  getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor
} from './controllers/authors.js';

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required: [id, name, birthYear]
 *       properties:
 *         id: { type: string, example: a1 }
 *         name: { type: string, example: Jane Austen }
 *         birthYear: { type: integer, example: 1775 }
 */

/** @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200: { description: Array of books }
 *       500: { description: Internal server error }
 */
router.get('/books', getBooksHandler);

/** @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by custom ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Book found }
 *       404: { description: Book not found }
 *       500: { description: Internal server error }
 */
router.get('/books/:id', getBookByIdHandler);

/** @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200: { description: Array of authors }
 *       500: { description: Unable to retrieve authors }
 */
router.get('/authors', getAllAuthors);

/** @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by custom ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Author found }
 *       404: { description: Author not found }
 *       500: { description: Unable to retrieve author }
 */
router.get('/authors/:id', getAuthorById);

/** @openapi
 * /authors:
 *   post:
 *     summary: Create an author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, name, birthYear]
 *             properties:
 *               id: { type: string, example: a4 }
 *               name: { type: string, example: Example Author }
 *               birthYear: { type: integer, example: 1980 }
 *     responses:
 *       201: { description: Author created }
 *       400: { description: Invalid data or duplicate ID }
 *       500: { description: Unable to create author }
 */
router.post('/authors', createAuthor);

/** @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, birthYear]
 *             properties:
 *               name: { type: string, example: Updated Author }
 *               birthYear: { type: integer, example: 1981 }
 *     responses:
 *       200: { description: Author updated }
 *       400: { description: Invalid data }
 *       404: { description: Author not found }
 *       500: { description: Unable to update author }
 */
router.put('/authors/:id', updateAuthor);

/** @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Author deleted; no response body }
 *       404: { description: Author not found }
 *       409: { description: Author still has books }
 *       500: { description: Unable to delete author }
 */
router.delete('/authors/:id', deleteAuthor);

export default router;
