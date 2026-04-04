# 🤖 GET /email-list — Feature Specification

---

## Feature Identity

- **Feature Name:** GET /email-list Endpoint
- **Related Area:** Backend

---

## Feature Goal

Implement an endpoint that retrieves all agent email addresses from the data file and returns them as a single comma-separated string. This endpoint introduces data layer separation: the agents array lives in a separate file (`data/agents-list.js`), and the route imports and uses that data.

---

## Feature Scope

### In Scope (Included)

- Separate data file at `data/agents-list.js`
- Agent object with email field
- Importing agents from data file using require()
- Array.map() to extract email field only
- String.join() to create comma-separated list
- Response as plain text string (not JSON array)
- Error handling

### Out of Scope (Excluded)

- Sorting or filtering emails
- Removing duplicates
- Email validation
- Pagination

---

## Sub-Requirements (Feature Breakdown)

1. **Data File** — Create `data/agents-list.js` with array of agent objects, each containing at least: id, first_name, last_name, email, region, rating, fee
2. **Require Data** — In app.js, import agents: `const agents = require('./data/agents-list')`
3. **Extract Emails** — Use `.map()` to pull only email field from each agent object
4. **Join String** — Use `.join(',')` to combine emails into a single comma-separated string (no spaces around commas)
5. **Response Format** — Return plain text string, not JSON array or object
6. **Error Handling** — Wrap logic in try/catch, return 500 on error

---

## User Flow / Logic (High Level)

1. Client sends GET request to `/email-list`
2. Route handler imports agents from data/agents-list.js
3. Route extracts email field from each agent using .map()
4. Route joins emails into comma-separated string
5. Route returns plain text response (status 200)
6. Client receives comma-separated email list

---

## Interfaces (Pages, Endpoints, Screens)

### Backend / API

- **Endpoint:** `GET /email-list`
- **URL:** `http://localhost:3000/email-list`
- **Parameters:** None
- **Request Body:** None
- **Response Body:** Plain text string, comma-separated emails
  Example: `agent1@example.com,agent2@example.com,agent3@example.com`
- **Response Status:** 200 on success, 500 on error
- **Response Content-Type:** text/plain (or application/text)
- **Error Response:** `{ "error": "error message" }` with 500 status

---

## Data Used or Modified

- **Reading:** `data/agents-list.js` (agents array)
  - Each agent has email property (string)
- **Writing:** None
- **Modifying:** None

---

## Tech Constraints (Feature-Level)

- Data file must export agents array using `module.exports`
- Must use .map() and .join() methods on arrays (junior-friendly JavaScript)
- Response must be plain text string, NOT JSON array like `["email1", "email2"]`
- NO spaces around commas in result
- All agents must be included (no filtering)

---

## Acceptance Criteria

- [ ] `data/agents-list.js` exists and exports agents array
- [ ] At least 8 agents are in the array
- [ ] Each agent has id, first_name, last_name, email, region, rating, fee
- [ ] All emails are unique
- [ ] All emails are properly formatted (contain @)
- [ ] GET /email-list returns HTTP 200
- [ ] Response is plain text string (not JSON)
- [ ] Response contains all agent emails
- [ ] Emails are separated by commas with no spaces
- [ ] If data file is missing, error is caught and 500 is returned
- [ ] If agents array is empty, empty string is returned (no error)

---

## Notes for the AI

- The response must be a plain text string, NOT a JSON array; this is specifically tested
- No extra spaces around commas; "email1@test.com,email2@test.com" (correct) not "email1@test.com, email2@test.com" (wrong)
- Ensure all agent objects have valid, unique email addresses before committing
- This endpoint demonstrates the pattern for all data-driven endpoints: import from file, process with junior-friendly methods, return response

---
