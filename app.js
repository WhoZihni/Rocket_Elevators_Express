require('dotenv').config();

const express = require('express');
const fetchAgents = require('./data/agents-list');
const { calcResidential, tierPricing } = require('./data/calcul');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
let agents = [];

/**
 * GET /hello
 * Endpoint: Returns a simple greeting message and logs the port number to console.
 * Method: GET
 * Route: /hello
 * Parameters: None
 * Response: 200 - Plain text string "Hello World!"
 * Error Handling: Returns 500 with JSON error object on failure
 */
app.get('/hello', (req, res) => {
  try {
    console.log(`Port in use: ${port}`);
    res.status(200).send('Hello World!');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /status
 * Endpoint: Returns the current server status including port and environment name.
 * Method: GET
 * Route: /status
 * Parameters: None
 * Response: 200 - JSON object with message containing PORT and ENV_NAME from .env
 * Error Handling: Returns 500 with JSON error object on failure
 */
app.get('/status', (req, res) => {
  try {
    res.status(200).json({ message: `Server running on port ${process.env.PORT} in ${process.env.ENV_NAME} mode` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /error
 * Endpoint: Demonstrates error handling by intentionally throwing an error.
 * Method: GET
 * Route: /error
 * Parameters: None
 * Response: 500 - JSON error object with error message "Something went wrong"
 * Error Handling: Catches thrown error and returns 500 status with error details
 */
app.get('/error', (req, res) => {
  try {
    throw new Error('Something went wrong');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /email-list
 * Endpoint: Retrieves all agent email addresses from the agents array.
 * Method: GET
 * Route: /email-list
 * Parameters: None
 * Response: 200 - Plain text string with comma-separated email addresses (no spaces)
 * Error Handling: Returns 500 with JSON error object on failure
 */
app.get('/email-list', (req, res) => {
  try {
    const emailList = agents.map(agent => agent.email).join(',');
    res.status(200).send(emailList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /region-avg
 * Endpoint: Calculates average rating and fee for agents in a specified region.
 * Method: GET
 * Route: /region-avg
 * Parameters: Query param 'region' (string, case-insensitive)
 * Response: 200 - JSON object with region, avg_rating, and avg_fee; or message if no agents found
 * Error Handling: Returns 500 with JSON error object on failure
 */
app.get('/region-avg', (req, res) => {
  try {
    const region = req.query.region;
    const filtered = agents.filter(a => a.region.toLowerCase() === region.toLowerCase());
    if (filtered.length === 0) {
      return res.status(200).json({ message: "No agents found in this region." });
    }
    const avg_rating = parseFloat((filtered.reduce((sum, a) => sum + a.rating, 0) / filtered.length).toFixed(2));
    const avg_fee_value = parseFloat((filtered.reduce((sum, a) => sum + a.fee, 0) / filtered.length).toFixed(2));
    const avg_fee = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(avg_fee_value);
    return res.status(200).json({ region, avg_rating, avg_fee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /calc-residential
 * Endpoint: Calculates the number of elevators required and total cost for a residential building.
 * Method: GET
 * Route: /calc-residential
 * Parameters: Query params - number_of_apartments (integer > 0), number_of_floors (integer > 0), tier (standard|premium|excelium)
 * Response: 200 - JSON object with elevators_required and total_cost; 400 - JSON error for validation failures
 * Error Handling: Returns 500 with JSON error object on failure; returns 400 for invalid tier or non-integer inputs
 */
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
    const formattedResult = {
      elevators_required: result.elevators_required,
      total_cost: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(result.total_cost)
    };
    return res.status(200).json(formattedResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /contact-us
 * Endpoint: Accepts contact form submission and returns confirmation message.
 * Method: POST
 * Route: /contact-us
 * Parameters: Request body - first_name (string), last_name (string), message (string)
 * Response: 200 - JSON object with message containing sender's full name; logs response to console
 * Error Handling: Returns 500 with JSON error object on failure
 */
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