import {
  getAllBooks,
  getBookById,
  authorExists,
  createBook,
  updateBook,
  deleteBook
} from '../models/books.js';

const validBookDetails = (body) =>
  body &&
  typeof body.authorId === 'string' && body.authorId.trim().length > 0 &&
  typeof body.title === 'string' && body.title.trim().length > 0 &&
  typeof body.publicationDate === 'string' &&
  /^\d{4}-\d{2}-\d{2}$/.test(body.publicationDate);

const getBooksHandler = async (req, res) => {
  try {
    return res.status(200).json(await getAllBooks());
  } catch (error) {
    console.error('GET /books failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookByIdHandler = async (req, res) => {
  try {
    const book = await getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    return res.status(200).json(book);
  } catch (error) {
    console.error('GET /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createBookHandler = async (req, res) => {
  const { id } = req.body ?? {};
  if (typeof id !== 'string' || !id.trim() || !validBookDetails(req.body)) {
    return res.status(400).json({
      message: 'id, authorId, title, and publicationDate (YYYY-MM-DD) are required.'
    });
  }
  try {
    if (await getBookById(id)) {
      return res.status(400).json({ message: 'A book with this id already exists.' });
    }
    if (!(await authorExists(req.body.authorId))) {
      return res.status(400).json({ message: 'authorId must match an existing author.' });
    }
    const book = await createBook({
      id,
      authorId: req.body.authorId,
      title: req.body.title.trim(),
      publicationDate: req.body.publicationDate
    });
    return res.status(201).json(book);
  } catch (error) {
    console.error('POST /books failed:', error.message);
    return res.status(500).json({ message: 'Unable to create book.' });
  }
};

const updateBookHandler = async (req, res) => {
  if (!validBookDetails(req.body)) {
    return res.status(400).json({
      message: 'authorId, title, and publicationDate (YYYY-MM-DD) are required.'
    });
  }
  try {
    if (!(await authorExists(req.body.authorId))) {
      return res.status(400).json({ message: 'authorId must match an existing author.' });
    }
    const book = await updateBook(req.params.id, {
      authorId: req.body.authorId,
      title: req.body.title.trim(),
      publicationDate: req.body.publicationDate
    });
    if (!book) return res.status(404).json({ message: 'Book not found.' });
    return res.status(200).json(book);
  } catch (error) {
    console.error('PUT /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Unable to update book.' });
  }
};

const deleteBookHandler = async (req, res) => {
  try {
    const result = await deleteBook(req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('DELETE /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Unable to delete book.' });
  }
};

export {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
};
