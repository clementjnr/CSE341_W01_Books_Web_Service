import { getDb } from '../db/connect.js';

const authorFields = { _id: 0, id: 1, name: 1, birthYear: 1 };

const getAllAuthors = async () => {
  const db = getDb();
  return db.collection('authors').find({}, { projection: authorFields }).toArray();
};

const getAuthorById = async (id) => {
  const db = getDb();
  return db.collection('authors').findOne({ id }, { projection: authorFields });
};

const createAuthor = async (author) => {
  const db = getDb();
  await db.collection('authors').insertOne(author);
  return getAuthorById(author.id);
};

const updateAuthor = async (id, author) => {
  const db = getDb();
  const result = await db.collection('authors').updateOne({ id }, { $set: author });
  if (result.matchedCount === 0) return null;
  return getAuthorById(id);
};

const deleteAuthor = async (id) => {
  const db = getDb();
  return db.collection('authors').deleteOne({ id });
};

const authorHasBooks = async (id) => {
  const db = getDb();
  return db.collection('books').findOne({ authorId: id }, { projection: { _id: 1 } });
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks
};
