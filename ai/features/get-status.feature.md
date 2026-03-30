# 🤖 GET /status — Feature Specification

---

## Feature Identity

- **Feature Name:** GET /status Endpoint
- **Related Area:** Backend

---

## Feature Goal

Implement an endpoint that returns the current server status by reading and display both the PORT and ENV_NAME from the `.env` file. This endpoint introduces environment variable configuration using dotenv and demonstrates that the server can access and return external configuration.

---

## Feature Scope

### In Scope (Included)

- dotenv library setup and configuration
- Reading PORT and ENV_NAME from .env file via process.env
- Route handler for GET /status
- Response message containing both values
- Error handling with try/catch

### Out of Scope (Excluded)

- Storing additional environment variables beyond PORT and ENV_NAME
- Dynamic environment switching (dev/prod/test)
- Validation of environment variables

---

## Sub-Requirements (Feature Breakdown)

1. **dotenv Setup** — Call `require('dotenv').config()` at the very top of app.js before any routes are defined
2. **.env File** — Create `.env` with `PORT=3000` and `ENV_NAME=development` (exact format)
3. **Environment Reading** — Access `process.env.PORT` and `process.env.ENV_NAME` in the route handler
4. **Response Format** — Return a message containing both PORT and ENV_NAME (e.g., "Server running on port 3000 in development mode")
5. **Error Handling** — Wrap route in try/catch, return 500 on error

---

## User Flow / Logic (High Level)

1. Server starts, dotenv reads .env file and populates process.env
2. All subsequent code can access environment variables via process.env
3. Client sends GET request to `/status`
4. Route handler reads `process.env.PORT` and `process.env.ENV_NAME`
5. Route constructs message string containing both values
6. Response is returned with HTTP 200

---

## Interfaces (Pages, Endpoints, Screens)

### Backend / API

- **Endpoint:** `GET /status`
- **URL:** `http://localhost:3000/status`
- **Parameters:** None
- **Request Body:** None
- **Response Body:** JSON object with status message
  Example: `{ "message": "Server running on port 3000 in development mode" }`
- **Response Status:** 200 on success, 500 on error
- **Error Response:** `{ "error": "error message" }` with 500 status

---

## Data Used or Modified

- **Reading:** `process.env.PORT` and `process.env.ENV_NAME` from .env file
- **Writing:** None
- **Modifying:** None

---

## Tech Constraints (Feature-Level)

- Must use dotenv; no hardcoding allowed
- Both environment variables must come directly from .env
- Response must include both values in human-readable text (not just a JSON object with raw values)
- Changing .env and restarting server must change the response output

---

## Acceptance Criteria

- [ ] .env file exists in project root with PORT and ENV_NAME
- [ ] dotenv is required and configured at top of app.js
- [ ] GET /status returns HTTP 200
- [ ] Response includes port number from .env
- [ ] Response includes environment name from .env
- [ ] Response is a readable message (not a raw key-value object)
- [ ] Changing .env PORT value and restarting updates the response
- [ ] Changing .env ENV_NAME value and restarting updates the response
- [ ] If .env is missing, error is caught and 500 is returned
- [ ] Server does not crash if .env values are missing

---

## Notes for the AI

- The grader will verify that values come from .env, not hardcoded
- Test this by changing .env and restarting the server before committing
- Do not use require('./package.json') to get version or other values; ENV_NAME must come from .env only
- Keep the message format clear and human-readable

---
