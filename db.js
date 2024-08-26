// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function connectToDB() {
  await client.connect();
  console.log('Connected to MongoDB');
  return client.db('scraper'); // Replace with your database name
}

module.exports = { connectToDB };
