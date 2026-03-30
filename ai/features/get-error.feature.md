# 🤖 GET /error — Feature Specification

---

## Feature Identity

- **Feature Name:** GET /error Endpoint
- **Related Area:** Backend

---

## Feature Goal

Implement an endpoint that demonstrates error handling patterns. The route intentionally throws an error inside a try/catch block to verify that the server can catch exceptions, format them properly, and return appropriate error responses without crashing.

---

## Feature Scope

### In Scope (Included)

- Route handler for GET /error
- try/catch error handling block
- Throwing a custom Error object
- Returning error response with appropriate HTTP status code (500)
- JSON error formatting

### Out of Scope (Excluded)

- Global error middleware
- Error logging to file
- Conditional error throwing based on parameters
- Different error types or status codes

---

## Sub-Requirements (Feature Breakdown)

1. **Try Block** — Route handler begins with `try { }`
2. **Error Throwing** — Inside try block, execute `throw new Error("Something went wrong")`
3. **Catch Block** — Route handler has `catch (error) { }` that captures the thrown error
4. **Error Response** — In catch block, return JSON response: `{ "error": error.message }`
5. **Status Code** — Set response status to 500: `res.status(500).json(...)`

---

## User Flow / Logic (High Level)

1. Client sends GET request to `/error`
2. Route handler enters try block
3. throw new Error() is executed
4. Execution jumps to catch block
5. catch block constructs error response JSON
6. Response is sent with HTTP 500 status
7. Client receives error message and 500 status

---

## Interfaces (Pages, Endpoints, Screens)

### Backend / API

- **Endpoint:** `GET /error`
- **URL:** `http://localhost:3000/error`
- **Parameters:** None
- **Request Body:** None
- **Response Body (Success):** N/A (this endpoint always errors)
- **Response Status:** Always 500
- **Error Response:** `{ "error": "Something went wrong" }`

---

## Data Used or Modified

- **Reading:** None
- **Writing:** None
- **Modifying:** None

---

## Tech Constraints (Feature-Level)

- Must use try/catch block
- Must throw error inside try (not in catch)
- Status code must be 500, not 200
- Error message must be extracted from error object property, not hardcoded string
- Response must be JSON format

---

## Acceptance Criteria

- [ ] GET /error is callable
- [ ] Response status code is 500 (not 200)
- [ ] Response body is valid JSON
- [ ] Response body includes an "error" property
- [ ] "error" property contains the error message
- [ ] try/catch block is visible in code
- [ ] Error is thrown inside try block
- [ ] catch block handles the error and returns response
- [ ] Server does not crash after error handling
- [ ] Subsequent requests to other endpoints work normally after this endpoint is called

---

## Notes for the AI

- This endpoint is explicitly designed to throw an error; it is not a bug
- The grader will check that the status code is NOT 200
- Do not suppress the error or return 200; returning non-200 on error is the whole point
- Use the error message property (error.message) in the response, not a hardcoded string

---
