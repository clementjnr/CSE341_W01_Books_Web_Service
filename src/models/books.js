import { getDb } from '../db/connect.js';

const bookFields = {
  _id: 0,
  id: 1,
  author: 1,
  title: 1,
  publicationDate: 1
};

const getAllBooks = async () => {
  const db = getDb();
  return db.collection('books')
    .find({}, { projection: bookFields })
    .toArray();
};

const getBookById = async (bookId) => {
  const db = getDb();
  return db.collection('books')
    .findOne({ id: bookId }, { projection: bookFields });
};

export { getAllBooks, getBookById };
