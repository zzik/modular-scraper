// server.js
const express = require('express');
const cors = require('cors'); // Import the cors package
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI

// Enable CORS for all routes
app.use(cors());

// Function to connect to MongoDB
async function connectToDB() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Connected to MongoDB');
  return client.db('scraper'); // Replace with your database name
}

// Route to get all job posts
app.get('/jobs', async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection('jobs'); // Replace with your collection name
    const jobs = await collection.find({}).toArray();
    
    res.json(jobs);
  } catch (error) {
    console.error('Error retrieving jobs:', error);
    res.status(500).send('Error retrieving jobs');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
