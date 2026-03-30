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

// Server startup
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});