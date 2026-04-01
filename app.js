require('dotenv').config();

const express = require('express');
const fetchAgents = require('./data/agents-list');
const { calcResidential, tierPricing } = require('./data/calcul');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
let agents = [];

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

// GET /email-list endpoint
app.get('/email-list', (req, res) => {
  try {
    const emailList = agents.map(agent => agent.email).join(',');
    res.status(200).send(emailList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /region-avg endpoint
app.get('/region-avg', (req, res) => {
  try {
    const region = req.query.region;
    const filtered = agents.filter(a => a.region.toLowerCase() === region.toLowerCase());
    if (filtered.length === 0) {
      return res.status(200).json({ message: "No agents found in this region." });
    }
    const avg_rating = parseFloat((filtered.reduce((sum, a) => sum + a.rating, 0) / filtered.length).toFixed(2));
    const avg_fee = parseFloat((filtered.reduce((sum, a) => sum + a.fee, 0) / filtered.length).toFixed(2));
    return res.status(200).json({ region, avg_rating, avg_fee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /calc-residential endpoint
app.get('/calc-residential', (req, res) => {
  try {
    const { number_of_apartments, number_of_floors, tier } = req.query;
    const validTiers = ['standard', 'premium', 'excelium'];

    if (!validTiers.includes(tier)) {
      return res.status(400).json({ error: "Invalid tier. Must be standard, premium, or excelium." });
    }

    if (!number_of_apartments || !number_of_floors || isNaN(number_of_apartments) || isNaN(number_of_floors)) {
      return res.status(400).json({ error: "number_of_apartments and number_of_floors must be numbers." });
    }

    if (!Number.isInteger(Number(number_of_apartments)) || !Number.isInteger(Number(number_of_floors))) {
      return res.status(400).json({ error: "number_of_apartments and number_of_floors must be integers." });
    }

    if (Number(number_of_apartments) <= 0 || Number(number_of_floors) <= 0) {
      return res.status(400).json({ error: "number_of_apartments and number_of_floors must be greater than zero." });
    }

    const result = calcResidential(Number(number_of_apartments), Number(number_of_floors), tier);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /contact-us endpoint
app.post('/contact-us', (req, res) => {
  try {
    const { first_name, last_name, message } = req.body;
    const response = {
      message: `Message received from ${first_name} ${last_name}`
    };
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server startup
fetchAgents()
  .then(data => { agents = data })
  .catch(err => { console.error('Failed to load agents:', err); process.exit(1) });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});