const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/api', (req, res) => {
  res.send(`Hello, API! ${process.env.ENV}`);
});
app.get('/api/data', (req, res) => {
  res.send(`Hello, API! ${req}`);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start HTTP server
app.listen(port, () => {
  console.log(`HTTP server is running on http://localhost:${port}`);
});
