# 🤖 POST /contact-us — Feature Specification

---

## Feature Identity

- **Feature Name:** POST /contact-us Endpoint
- **Related Area:** Backend

---

## Feature Goal

Implement the first POST endpoint that accepts a JSON request body containing contact form data. This endpoint demonstrates request body parsing, data extraction, response formatting with name recognition, and console logging. It is the simplest POST endpoint but requires proper middleware setup.

---

## Feature Scope

### In Scope (Included)

- express.json() middleware setup BEFORE routes
- JSON request body parsing
- Extracting first_name, last_name, message from req.body
- Response message that includes sender name
- Console logging of response
- Error handling

### Out of Scope (Excluded)

- Email sending
- Email validation
- Data storage or persistence
- Authentication

---

## Sub-Requirements (Feature Breakdown)

1. **Middleware Setup** — Add `app.use(express.json())` at top of app.js BEFORE any routes are defined (critical for body parsing)
2. **Route Handler** — Define POST route at `/contact-us`
3. **Read Body** — Extract `req.body.first_name`, `req.body.last_name`, `req.body.message`
4. **Construct Response** — Create message that includes sender's full name, e.g., "Message received from John Doe" (exact format matters, grading-checked)
5. **Console Logging** — Log the entire response object with `console.log()` (graded requirement: must appear in terminal)
6. **Return Response** — Return JSON response object
7. **Error Handling** — Wrap logic in try/catch, return 500 on error

---

## User Flow / Logic (High Level)

1. Client opens Postman and sets method to POST
2. Client enters URL: `http://localhost:3000/contact-us`
3. Client sets Body → raw → JSON
4. Client enters JSON: `{ "first_name": "John", "last_name": "Doe", "message": "Hello!" }`
5. Client sends request
6. express.json() middleware parses body and populates req.body
7. Route handler executes
8. Route extracts first_name, last_name, message from req.body
9. Route constructs a message like "Message received from John Doe"
10. Route logs response to console
11. Route returns JSON response
12. Client receives response and terminal shows logged object

---

## Interfaces (Pages, Endpoints, Screens)

### Backend / API

- **Endpoint:** `POST /contact-us`
- **URL:** `http://localhost:3000/contact-us`
- **Request Method:** POST
- **Request Headers:** `Content-Type: application/json`
- **Request Body:** JSON object
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "message": "Hello, I have a question about your services."
  }
  ```
- **Response Body (Success):** JSON object
  ```json
  {
    "message": "Message received from John Doe"
  }
  ```
- **Response Status:** 200 on success, 500 on error
- **Error Response:** `{ "error": "error message" }` with 500 status
- **Console Output:** Exact content of response object logged to stdout

---

## Data Used or Modified

- **Reading:** `req.body.first_name`, `req.body.last_name`, `req.body.message`
- **Writing:** Console output (console.log)
- **Modifying:** None (no persistent data storage)

---

## Tech Constraints (Feature-Level)

- `app.use(express.json())` MUST be called before routes are defined
- Response message must include both first_name and last_name
- Response must include the exact string indicating a message was received
- Console.log() must output the response object (not just a string)
- Response body must be JSON (not plain text)

---

## Acceptance Criteria

- [ ] POST method is used (not GET)
- [ ] Endpoint at `/contact-us` is reachable
- [ ] express.json() middleware is enabled (BEFORE routes)
- [ ] Request body is parsed successfully
- [ ] req.body.first_name is extracted
- [ ] req.body.last_name is extracted
- [ ] req.body.message is extracted
- [ ] Response includes both first_name and last_name in message
- [ ] Response status code is 200
- [ ] Response is valid JSON
- [ ] Response object is logged to console
- [ ] Console output includes the full response (not just a string)
- [ ] If body parameters are partially missing, error is handled gracefully
- [ ] If error occurs during processing, status is 500 and error is returned
- [ ] Server does not crash
- [ ] Response message format is consistent (e.g., "Message received from FirstName LastName")

---

## Testing Checklist (for Postman)

1. Set method to POST
2. Set URL to `http://localhost:3000/contact-us`
3. Go to Body tab → select raw → select JSON from dropdown
4. Enter JSON body exactly as shown in Interfaces section
5. Click Send
6. Verify response status is 200
7. Verify response body contains message with sender name
8. Open terminal where server is running
9. Verify logged object appears in terminal output
10. Test with different first/last names
11. Test with missing parameters (should error gracefully)

---

## Notes for the AI

- The middleware order matters: `app.use(express.json())` MUST come BEFORE route definitions
- Without middleware, req.body will be undefined and endpoint will fail silently
- The console.log() requirement is graded; terminal output will be inspected
- Response message format is grading-checked; include both names
- Test this endpoint thoroughly in Postman before pushing; body parsing errors are common

---
