const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const https = require('https');

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

// Load SSL certificates
const httpsOptions = {
  key: fs.readFileSync(process.env.SECRET_KEY),
  cert: fs.readFileSync(process.env.SECRET_CERT)
};

// Start HTTPS server
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`HTTPS server is running on https://localhost:${port}`);
});
