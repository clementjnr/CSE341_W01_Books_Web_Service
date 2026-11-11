import { getDb } from '../db/connect.js';

const bookFields = { _id: 0, id: 1, authorId: 1, title: 1, publicationDate: 1 };

const getAllBooks = async () => {
  const db = getDb();
  return db.collection('books').find({}, { projection: bookFields }).toArray();
};

const getBookById = async (id) => {
  const db = getDb();
  return db.collection('books').findOne({ id }, { projection: bookFields });
};

const authorExists = async (authorId) => {
  const db = getDb();
  return db.collection('authors').findOne({ id: authorId }, { projection: { _id: 1 } });
};

const createBook = async (book) => {
  const db = getDb();
  await db.collection('books').insertOne(book);
  return getBookById(book.id);
};

const updateBook = async (id, book) => {
  const db = getDb();
  const result = await db.collection('books').updateOne({ id }, { $set: book });
  if (result.matchedCount === 0) return null;
  return getBookById(id);
};

const deleteBook = async (id) => {
  const db = getDb();
  return db.collection('books').deleteOne({ id });
};

export { getAllBooks, getBookById, authorExists, createBook, updateBook, deleteBook };
