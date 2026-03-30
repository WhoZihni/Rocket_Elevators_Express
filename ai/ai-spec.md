# 🤖 AI_SPEC — Rocket Elevators Express API Specification

---

## Project Identity

- **Project Name:** Rocket Elevators Express API
- **Short Description:** A RESTful API server built with Node.js and Express that exposes 7 business endpoints for Rocket Elevators, including agent lookups, regional statistics, elevator cost calculations, and contact form handling.
- **Project Type:** Node.js + Express REST API (backend only, no database, no frontend)

---

## Goal and Scope

### Goal

Build a modular, production-quality backend API that serves Rocket Elevators' business needs by exposing endpoints for agent data retrieval, regional analysis, elevator quoting calculations, and contact form submissions. The server must follow clean architecture principles with separated concerns (routes, business logic, and data), be fully tested in Postman, and be deployable with proper environment configuration.

### In Scope (Build Now)

- 7 fully functional HTTP endpoints (6 GET, 1 POST)
- Separate data file (`data/agents-list.js`) containing at least 8–10 agent records
- Separate calculation file (`data/calcul.js`) for elevator formula logic
- Environment variables configuration (`.env` with `PORT` and `ENV_NAME`)
- Error handling (try/catch on all routes, proper HTTP status codes)
- Complete AI specification document and 7 individual feature specs
- Postman collection (`PostmanCollection.json`) with all endpoints
- Complete README.md with project structure, setup, and API documentation
- CONCEPTS.md explaining 3 challenging concepts with file/line references
- 5 LeetCode challenge solutions with screenshots saved to `./LeetCode-Challenges/`
- 3 YouTube videos (Concepts, LeetCode explanation, Technical demo)
- Git workflow with feature branches → dev → main

### Out of Scope (Do NOT Build)

- Database or data persistence (data is in-memory via JavaScript files only)
- Authentication or authorization
- Frontend application or HTML templates
- Additional frameworks (no ORM, no GraphQL, no caching layers)
- Automated testing or unit tests (manual Postman testing only)
- Deployment to production or containerization
- Logging middleware beyond console.log()
- Rate limiting or throttling
- API versioning (e.g., `/v1/...`)

---

## Users and Use Cases

- **Developer/Tester:** Uses Postman to call each endpoint with valid and invalid inputs, verifies correct responses, error handling, and console logging.
- **Grader/Coach:** Reviews Git history for proper branching, reads specification documents to verify alignment with requirements, checks code structure and modular architecture, and watches videos to assess technical understanding.

---

## Feature Index (Links Only)

Each of the following features has its own specification document:

- [GET /hello](./features/get-hello.feature.md)
- [GET /status](./features/get-status.feature.md)
- [GET /error](./features/get-error.feature.md)
- [GET /email-list](./features/get-email-list.feature.md)
- [GET /region-avg](./features/get-region-avg.feature.md)
- [GET /calc-residential](./features/get-calc-residential.feature.md)
- [POST /contact-us](./features/post-contact-us.feature.md)

---

## Pages / Routes (Project Map)

All endpoints are backend only (no pages, no UI).

### API Routes

- **GET /hello** — Returns "Hello World!" and logs port to console
- **GET /status** — Returns server status with PORT and ENV_NAME from .env
- **GET /error** — Demonstrates error handling with a thrown error
- **GET /email-list** — Returns comma-separated list of all agent emails
- **GET /region-avg?region=North** — Returns average rating and fee for agents in a given region
- **GET /calc-residential?number_of_apartments=120&number_of_floors=15&tier=premium** — Calculates elevator count and total cost based on inputs
- **POST /contact-us** — Accepts form data (first_name, last_name, message), returns confirmation, logs to console

---

## Data and Models (Simple)

### Agent Object (stored in `data/agents-list.js`)

```
{
  id: number,
  first_name: string,
  last_name: string,
  email: string (unique, properly formatted),
  region: string (one of: "North", "South", "East", "West"),
  rating: number (decimal between 1.0 and 5.0),
  fee: number (e.g., 400, 550, 700)
}
```

Minimum 8–10 agents with at least 3 different regions represented.

### Contact Form Object (from `POST /contact-us` request body)

```
{
  first_name: string,
  last_name: string,
  message: string
}
```

### Tier Pricing (stored in `data/agents-list.js` or separate pricing file)

```
{
  standard: 20000,
  premium: 35000,
  excelium: 55000
}
```

Cost per elevator for each tier.

---

## Tech Stack and Tools

### Backend

- **Node.js** — JavaScript runtime (version 14+ recommended)
- **Express.js** — Lightweight web framework for HTTP server and routing

### Configuration

- **dotenv** — Load environment variables from `.env` file

### Development

- **nodemon** — Auto-restart server on file changes

### Testing

- **Postman** — API client for testing all endpoints

### NOT Allowed

- No database (MongoDB, PostgreSQL, etc.)
- No authentication libraries (passport, JWT, etc.)
- No additional web frameworks (Fastify, Koa, etc.)
- No ORM or query builders (Mongoose, Sequelize, etc.)
- No templating engines (EJS, Handlebars, etc.)

---

## Repository Structure

```
Rocket_Elevators_Express/
├── app.js                      # Express server setup, all route definitions
├── .env                        # Environment variables (PORT, ENV_NAME)
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── README.md                   # Project documentation
├── CONCEPTS.md                 # 3 challenging concepts + file/line references
├── PostmanCollection.json      # Postman collection (exported)
│
├── data/
│   ├── agents-list.js         # Agent data array + tier pricing constants
│   └── calcul.js              # calcResidential() function for elevator math
│
├── ai/
│   ├── ai-spec.md             # This file (global specification)
│   └── features/
│       ├── get-hello.feature.md
│       ├── get-status.feature.md
│       ├── get-error.feature.md
│       ├── get-email-list.feature.md
│       ├── get-region-avg.feature.md
│       ├── get-calc-residential.feature.md
│       └── post-contact-us.feature.md
│
└── LeetCode-Challenges/
    ├── two-sum.png
    ├── contains-duplicate.png
    ├── valid-anagram.png
    ├── single-number.png
    └── missing-number.png
```

---

## Rules for the AI

1. **Business logic and data must NEVER be in app.js.** Data goes in `data/` folder, calculations go in `data/calcul.js`, routes only reference these modules.

2. **All route handlers must use try/catch error handling.** Every endpoint wraps its logic in `try { } catch (error) { return res.status(500).json({ error: error.message }) }`.

3. **Port and environment name must always be read from .env.** Never hardcode PORT or ENV_NAME in app.js; use `process.env.PORT` and `process.env.ENV_NAME`.

4. **Use junior-friendly code only.** Avoid advanced patterns, destructuring, arrow functions inside object literals, or complex functional programming.

5. **Do not add features not listed in the grading sheet.** No extra endpoints, no extra data fields, no extra validations beyond what is specified.

6. **Always use proper HTTP status codes.** 200 for success, 400 for client errors (validation), 500 for server errors. Never return 200 for an error.

7. **Export all modules with `module.exports`.** Use CommonJS syntax: `module.exports = { functionName }` or `module.exports = data;`

8. **Do not install or use any library not in the tech stack.** The only npm packages are: express, dotenv, nodemon. No other packages allowed.

9. **Require dotenv at the very top of app.js before any routes are defined.** Must be: `require('dotenv').config()` as the first line.

10. **Use `app.use(express.json())` middleware before defining any routes.** This enables parsing of JSON request bodies for POST endpoints.

---

## How to Run / Test the Project

### Setup

```bash
# Install dependencies
npm install

# Create .env file with required variables
echo "PORT=3000" > .env
echo "ENV_NAME=development" >> .env

# Start development server with auto-restart
npm run dev
```

### Testing

1. Open Postman
2. Import the `PostmanCollection.json` file
3. Call each endpoint and verify:
   - Response status code (200 or appropriate error code)
   - Response body format
   - Console output (for endpoints that require logging)
4. Test edge cases:
   - Missing parameters
   - Invalid data types
   - Out-of-range values
   - Non-existent data

### Expected Output

Server starts on `http://localhost:3000` with message:
```
Server running on port 3000
```

---

## Global Definition of Done

All items below must be checked before the project is considered complete:

- [ ] Repository is private; all coaches are collaborators
- [ ] Git history shows feature → dev → main workflow clearly
- [ ] app.js is organized with all 7 routes, no business logic
- [ ] data/agents-list.js contains 8–10 agents with 3+ regions
- [ ] data/calcul.js exports calcResidential() function
- [ ] .env file exists with PORT and ENV_NAME variables
- [ ] All 7 endpoints are implemented and tested in Postman
- [ ] All endpoints use try/catch error handling
- [ ] All endpoints return correct HTTP status codes
- [ ] All endpoints return proper JSON response formats
- [ ] GET /email-list returns comma-separated string, not array
- [ ] GET /region-avg returns object with region, avg_rating, avg_fee
- [ ] GET /calc-residential validates all 4 conditions (tier, numbers, integers, > 0)
- [ ] POST /contact-us includes sender name in response
- [ ] POST /contact-us logs response to console
- [ ] POST /contact-us has express.json() middleware enabled
- [ ] ai/ai-spec.md is complete with all 11 sections
- [ ] All 7 feature specs are complete with all 10 sections each
- [ ] README.md includes all required sections with accurate file paths
- [ ] CONCEPTS.md lists 3 distinct concepts with accurate file/line references
- [ ] PostmanCollection.json is saved in root directory
- [ ] LeetCode screenshots are in ./LeetCode-Challenges/ with correct naming
- [ ] Console output is clean (no debugging logs left over)
- [ ] .env is in .gitignore and not committed
- [ ] submission-summary.* is in .gitignore and not committed
- [ ] All code is properly indented and formatted
- [ ] No hardcoded values where .env variables should be used
- [ ] No commented-out code left in files

---

