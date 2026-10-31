import { MongoClient } from 'mongodb';

let client;
let database;

const connectToDb = async () => {
  const connectionString = process.env.MONGODB_URI;
  const databaseName = process.env.MONGODB_DB_NAME;

  if (!connectionString) {
    throw new Error('MONGODB_URI is required. Add it to your local .env file.');
  }

  if (!databaseName) {
    throw new Error('MONGODB_DB_NAME is required. Add it to your local .env file.');
  }

  client = new MongoClient(connectionString);
  await client.connect();
  database = client.db(databaseName);
  console.log(`Connected to MongoDB database: ${databaseName}`);

  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error('Database is not initialized. Call connectToDb first.');
  }

  return database;
};

export { connectToDb, getDb };
