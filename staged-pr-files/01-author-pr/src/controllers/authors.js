import {
  getAllAuthors as getAllAuthorsFromDb,
  getAuthorById as getAuthorByIdFromDb,
  createAuthor as createAuthorInDb,
  updateAuthor as updateAuthorInDb,
  deleteAuthor as deleteAuthorFromDb,
  authorHasBooks
} from '../models/authors.js';

const validAuthor = (body) =>
  body &&
  typeof body.name === 'string' &&
  body.name.trim().length > 0 &&
  Number.isInteger(body.birthYear) &&
  body.birthYear > 0;

const getAllAuthors = async (req, res) => {
  try {
    return res.status(200).json(await getAllAuthorsFromDb());
  } catch (error) {
    console.error('GET /authors failed:', error.message);
    return res.status(500).json({ message: 'Unable to retrieve authors.' });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await getAuthorByIdFromDb(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found.' });
    return res.status(200).json(author);
  } catch (error) {
    console.error('GET /authors/:id failed:', error.message);
    return res.status(500).json({ message: 'Unable to retrieve author.' });
  }
};

const createAuthor = async (req, res) => {
  const { id, name, birthYear } = req.body ?? {};
  if (typeof id !== 'string' || !id.trim() || !validAuthor({ name, birthYear })) {
    return res.status(400).json({ message: 'id, name, and a valid birthYear are required.' });
  }
  try {
    if (await getAuthorByIdFromDb(id)) {
      return res.status(400).json({ message: 'An author with this id already exists.' });
    }
    const author = await createAuthorInDb({ id, name: name.trim(), birthYear });
    return res.status(201).json(author);
  } catch (error) {
    console.error('POST /authors failed:', error.message);
    return res.status(500).json({ message: 'Unable to create author.' });
  }
};

const updateAuthor = async (req, res) => {
  const { name, birthYear } = req.body ?? {};
  if (!validAuthor({ name, birthYear })) {
    return res.status(400).json({ message: 'name and a valid birthYear are required.' });
  }
  try {
    const author = await updateAuthorInDb(req.params.id, { name: name.trim(), birthYear });
    if (!author) return res.status(404).json({ message: 'Author not found.' });
    return res.status(200).json(author);
  } catch (error) {
    console.error('PUT /authors/:id failed:', error.message);
    return res.status(500).json({ message: 'Unable to update author.' });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const author = await getAuthorByIdFromDb(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found.' });
    if (await authorHasBooks(req.params.id)) {
      return res.status(409).json({ message: 'Cannot delete an author who still has books.' });
    }
    await deleteAuthorFromDb(req.params.id);
    return res.status(204).send();
  } catch (error) {
    console.error('DELETE /authors/:id failed:', error.message);
    return res.status(500).json({ message: 'Unable to delete author.' });
  }
};

export { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
