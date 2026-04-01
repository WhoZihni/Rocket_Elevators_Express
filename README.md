# Rocket Elevators Express API

A RESTful backend API built with Node.js and Express for Rocket Elevators, a modern elevator consulting and supply company. This API provides endpoints for agent management, regional analysis, elevator cost calculations, and contact form submissions. It demonstrates clean architecture principles with separated concerns (routes, business logic, and data files), modular design patterns, and production-ready error handling.

## Tech Stack

- **Node.js** — JavaScript runtime for server-side execution
- **Express.js** (v5.2.1) — Lightweight web framework for routing and middleware
- **dotenv** (v17.3.1) — Environment variable management for configuration
- **nodemon** (v3.1.14) — Development tool for auto-restarting the server on file changes
- **No Database** — Data is stored in-memory via JavaScript modules; agents are fetched from an external API and stored in memory

## Project Structure

```
Rocket_Elevators_Express/
├── app.js                          # Main Express application with all 7 route endpoints
├── package.json                    # Project dependencies and scripts
├── .env                            # Environment variables (PORT, ENV_NAME)
├── .gitignore                      # Git ignore rules
├── README.md                       # This file — project documentation
├── CONCEPTS.md                     # Explanation of 3 challenging concepts with file references
├── data/
│   ├── agents-list.js             # Fetches agent data from external API and exports fetchAgents function
│   └── calcul.js                  # Business logic for elevator calculations (calcResidential function)
├── ai/
│   ├── ai-spec.md                 # Complete API specification and project overview
│   └── features/                  # Feature specifications for each endpoint
│       ├── get-hello.feature.md
│       ├── get-status.feature.md
│       ├── get-error.feature.md
│       ├── get-email-list.feature.md
│       ├── get-region-avg.feature.md
│       ├── get-calc-residential.feature.md
│       └── post-contact-us.feature.md
├── postman/
│   └── collections/               # Postman collection (PostmanCollection.json) with all endpoints
├── LeetCode-Challenges/           # Directory for storing LeetCode solutions and screenshots
└── CONCEPTS.md                    # Documentation of 3 key concepts used in the project
```

## Installation / Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/WhoZihni/Rocket_Elevators_Express.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd Rocket_Elevators_Express
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a `.env` file** in the project root with the following variables:
   ```
   PORT=3000
   ENV_NAME=development
   ```

5. **Start the development server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` and automatically restart when files change (thanks to nodemon).

## Environment Variables

The application reads the following environment variables from the `.env` file:

- **PORT** — The port number on which the Express server runs (default: 3000). Example: `PORT=3000`
- **ENV_NAME** — The name of the current environment (e.g., development, production). Used by the `/status` endpoint to indicate the running environment. Example: `ENV_NAME=development`

These variables are loaded at application startup using `dotenv` and accessed via `process.env.PORT` and `process.env.ENV_NAME` throughout the app.

## API Documentation

### Endpoint Overview

The Rocket Elevators Express API exposes 7 endpoints: 6 GET endpoints and 1 POST endpoint.

#### 1. GET /hello

Returns a simple greeting message and logs the port number to the console.

| Property | Value |
|----------|-------|
| **Method** | GET |
| **Route** | `/hello` |
| **Parameters** | None |
| **Sample Request** | `GET http://localhost:3000/hello` |
| **Success Response** | Status: 200<br>Body: `Hello World!` (plain text) |
| **Error Response** | Status: 500<br>Body: `{ "error": "error message" }` |

#### 2. GET /status

Returns the current server status including the port and environment name from `.env`.

| Property | Value |
|----------|-------|
| **Method** | GET |
| **Route** | `/status` |
| **Parameters** | None |
| **Sample Request** | `GET http://localhost:3000/status` |
| **Success Response** | Status: 200<br>Body: `{ "message": "Server running on port 3000 in development mode" }` |
| **Error Response** | Status: 500<br>Body: `{ "error": "error message" }` |

#### 3. GET /error

Demonstrates error handling by intentionally throwing an error and catching it.

| Property | Value |
|----------|-------|
| **Method** | GET |
| **Route** | `/error` |
| **Parameters** | None |
| **Sample Request** | `GET http://localhost:3000/error` |
| **Success Response** | Status: 500<br>Body: `{ "error": "Something went wrong" }` |
| **Error Response** | Status: 500<br>Body: `{ "error": "error message" }` |

#### 4. GET /email-list

Retrieves all agent email addresses from the agents array and returns them as a comma-separated string.

| Property | Value |
|----------|-------|
| **Method** | GET |
| **Route** | `/email-list` |
| **Parameters** | None |
| **Sample Request** | `GET http://localhost:3000/email-list` |
| **Success Response** | Status: 200<br>Body: `orlando@rocket.com,anna@rocket.com,bob@rocket.com` (plain text) |
| **Error Response** | Status: 500<br>Body: `{ "error": "error message" }` |

#### 5. GET /region-avg

Calculates the average rating and average fee for all agents in a specified region (case-insensitive).

| Property | Value |
|----------|-------|
| **Method** | GET |
| **Route** | `/region-avg` |
| **Parameters** | Query: `region` (string) — the region name (e.g., "north", "south") |
| **Sample Request** | `GET http://localhost:3000/region-avg?region=north` |
| **Success Response** | Status: 200<br>Body: `{ "region": "north", "avg_rating": 92.5, "avg_fee": 11250.0 }` |
| **No Agents Response** | Status: 200<br>Body: `{ "message": "No agents found in this region." }` |
| **Error Response** | Status: 500<br>Body: `{ "error": "error message" }` |

#### 6. GET /calc-residential

Calculates the number of elevators required for a residential building and the total cost based on the tier.

| Property | Value |
|----------|-------|
| **Method** | GET |
| **Route** | `/calc-residential` |
| **Parameters** | Query: `number_of_apartments` (integer > 0), `number_of_floors` (integer > 0), `tier` (standard \| premium \| excelium) |
| **Sample Request** | `GET http://localhost:3000/calc-residential?number_of_apartments=120&number_of_floors=15&tier=premium` |
| **Success Response** | Status: 200<br>Body: `{ "elevators_required": 4, "total_cost": 140000 }` |
| **Validation Error** | Status: 400<br>Body: `{ "error": "Invalid tier. Must be standard, premium, or excelium." }` or other validation message |
| **Error Response** | Status: 500<br>Body: `{ "error": "error message" }` |

#### 7. POST /contact-us

Accepts contact form data and returns a confirmation message. Logs the response to the console.

| Property | Value |
|----------|-------|
| **Method** | POST |
| **Route** | `/contact-us` |
| **Parameters** | Body (JSON): `first_name` (string), `last_name` (string), `message` (string) |
| **Sample Request** | `POST http://localhost:3000/contact-us`<br>Body: `{ "first_name": "John", "last_name": "Doe", "message": "I need an elevator quote." }` |
| **Success Response** | Status: 200<br>Body: `{ "message": "Message received from John Doe" }` |
| **Error Response** | Status: 500<br>Body: `{ "error": "error message" }` |

## Author

[Your Name] — [Your GitHub URL]

CodeBoxx Full-Stack Development Program — Module 4

---

## Databases Overview

Relational databases (SQL) and document databases (NoSQL) represent two fundamentally different approaches to data storage and organization. Relational databases like PostgreSQL and MySQL organize data into structured tables with predefined schemas, where each row contains related information and relationships between tables are established through foreign keys. This rigid structure ensures data consistency and integrity, making SQL databases ideal for applications where data structure is well-defined and unlikely to change frequently. However, this structure can be limiting when flexibility is needed, and scaling horizontally across multiple servers can be more complex. In contrast, NoSQL databases like MongoDB store data in flexible, document-based formats (typically JSON-like structures) without requiring a predefined schema. This flexibility allows developers to store varied data structures and evolve the data model more easily, and NoSQL databases are generally designed for easier horizontal scaling across distributed systems. The trade-off is that NoSQL databases may sacrifice some data consistency guarantees in favor of availability and performance. For applications with highly structured, relational data and strict consistency requirements, SQL is typically preferred; for applications requiring flexibility, rapid schema evolution, and horizontal scalability, NoSQL is often the better choice.

MongoDB is a popular document-oriented NoSQL database that stores data in JSON-like documents within collections (similar to tables in relational databases). Instead of rigid schemas, MongoDB allows each document to have its own structure, making it easy to add new fields or modify existing ones without altering an entire collection. MongoDB automatically generates an `_id` field for each document to ensure uniqueness and can handle complex, nested data structures naturally. Key features include flexible querying, indexing for performance, automatic replication for high availability, and built-in horizontal scaling through sharding. Unlike traditional relational systems that require joining multiple tables to retrieve related data, MongoDB can embed related data within a single document, reducing the need for complex joins. This makes MongoDB particularly well-suited for applications with evolving data requirements, rapid prototyping, and scenarios where data hierarchy and flexibility are important.

## CRUD Operations & Middleware

CRUD stands for Create, Read, Update, and Delete—the four fundamental operations for managing data in any application. Create operations add new data to the system, Read operations retrieve existing data, Update operations modify existing data, and Delete operations remove data. In the context of the Rocket Elevators Express API, while the current implementation focuses on Read and Create operations through GET and POST endpoints, these CRUD concepts provide the foundation for understanding how APIs interact with data. The GET endpoints like `/email-list` and `/region-avg` perform Read operations by retrieving and presenting agent data, while the POST `/contact-us` endpoint performs a Create operation by accepting and processing new contact form submissions. A fully featured production API would extend these patterns with Update (PUT/PATCH) and Delete (DELETE) endpoints to provide complete data management capabilities.

Middleware in Express is a function or a series of functions that execute during the request lifecycle, positioned between the incoming request and the outgoing response. Middleware can inspect the request, modify the request or response objects, end the request-response cycle, or pass control to the next middleware function. Middleware is essential in Express applications because it enables cross-cutting concerns like request body parsing, authentication, logging, error handling, and request validation without cluttering individual route handlers. By centralizing these concerns in middleware, code becomes more modular, maintainable, and reusable across multiple endpoints.

Here is a working example of middleware in use within this project:

```javascript
app.use(express.json());
```

This middleware is registered at the top of the application, before any route definitions. The `express.json()` middleware automatically parses incoming request bodies that contain JSON data and populates the `req.body` object, making the JSON payload accessible to route handlers. This is why POST endpoints like `/contact-us` can directly access `req.body.first_name`, `req.body.last_name`, and `req.body.message`—the middleware has already processed and parsed the incoming JSON. Without this middleware, the raw JSON string would remain unparsed and inaccessible to the route handlers.
