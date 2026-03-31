require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

// GET /hello endpoint
app.get('/hello', (req, res) => {
  try {
    console.log(`Port in use: ${port}`);
    res.status(200).send('Hello World!');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /status endpoint
app.get('/status', (req, res) => {
  try {
    res.status(200).json({ message: `Server running on port ${process.env.PORT} in ${process.env.ENV_NAME} mode` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /error endpoint
app.get('/error', (req, res) => {
  try {
    throw new Error('Something went wrong');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server startup
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});