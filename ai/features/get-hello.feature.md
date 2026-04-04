# 🤖 GET /hello — Feature Specification

---

## Feature Identity

- **Feature Name:** GET /hello Endpoint
- **Related Area:** Backend

---

## Feature Goal

Implement the simplest endpoint that introduces the Express server setup pattern. This endpoint serves as a proof-of-concept that the server is running and handles basic HTTP requests correctly. It establishes the foundation for all subsequent endpoints.

---

## Feature Scope

### In Scope (Included)

- Express route handler for HTTP GET method
- Route path: `/hello`
- Server startup and port configuration
- Console logging of port number
- Response body containing exact string "Hello World!"
- Basic error handling

### Out of Scope (Excluded)

- Extracting port into data file (simple enough to stay in app.js)
- Request parameters or query strings
- Response headers beyond standard application/text
- Middleware customization

---

## Sub-Requirements (Feature Breakdown)

1. **Server Setup** — Define Express app, set port (from process.env.PORT with fallback to 3000), and start server with app.listen()
2. **Console Logging** — Log port number to console on startup (grading requirement: exact output checked)
3. **Route Handler** — Define GET route at `/hello`
4. **Response Body** — Return exact string "Hello World!" (no JSON, plain text)
5. **Error Handling** — Wrap route logic in try/catch, return 500 status on error

---

## User Flow / Logic (High Level)

1. Server starts, reads PORT from environment
2. Server listens on that port, logs confirmation to console
3. Client (Postman) sends GET request to `http://localhost:3000/hello`
4. Route handler catches request
5. Route executes, logs port to console (within the endpoint)
6. Response "Hello World!" is sent to client
7. Client receives HTTP 200 status and response body

---

## Interfaces (Pages, Endpoints, Screens)

### Backend / API

- **Endpoint:** `GET /hello`
- **URL:** `http://localhost:3000/hello`
- **Parameters:** None
- **Request Body:** None
- **Response Body:** Plain text string: `Hello World!`
- **Response Status:** 200 on success, 500 on error
- **Error Response:** `{ "error": "message" }` (JSON) with 500 status

---

## Data Used or Modified

- **Reading:** `process.env.PORT` (optional, defaults to 3000)
- **Writing:** Console output (port number)
- **Modifying:** None

---

## Tech Constraints (Feature-Level)

- Use Express GET method only
- No external data files or modules for this endpoint
- No query parameters or request body parsing needed
- Response must be plain text, not JSON
- Error handling must not crash server

---

## Acceptance Criteria

- [ ] Endpoint at `/hello` is reachable
- [ ] Response status code is 200
- [ ] Response body is exactly "Hello World!"
- [ ] Port number is logged to console on server startup
- [ ] Port number is logged again when the endpoint is called (within route handler)
- [ ] If port is changed in .env, the logged value matches the new port
- [ ] If an error occurs, status is 500 and error message is returned
- [ ] Server does not crash on error

---

## Notes for the AI

- This is the simplest endpoint; use it to set the pattern for all others
- Logging port twice (once on startup, once in route) confirms the endpoint is executing
- Do not overthink this; the grader is checking exact output format
- Use `console.log()` directly, not a logging library

---
