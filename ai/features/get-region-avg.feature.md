# 🤖 GET /region-avg — Feature Specification

---

## Feature Identity

- **Feature Name:** GET /region-avg Endpoint
- **Related Area:** Backend

---

## Feature Goal

Implement an endpoint that accepts a region query parameter and calculates the average rating and average fee for all agents in that region. This endpoint introduces query parameter handling, array filtering, and conditional response logic based on data availability.

---

## Feature Scope

### In Scope (Included)

- Query parameter handling (`?region=North`)
- Array.filter() to find matching agents
- Calculation of averages using reduce or loop
- Proper rounding of averages
- Conditional response (agents found vs. not found)
- Error handling

### Out of Scope (Excluded)

- Sorting results
- Pagination
- Authentication or authorization
- Database lookups

---

## Sub-Requirements (Feature Breakdown)

1. **Query Parameter** — Read `req.query.region` from URL query string
2. **Filter Agents** — Use .filter() to find agents matching the requested region (case-sensitivity decision: document choice)
3. **No Agents Case** — If no agents found, return: `{ message: "No agents found in this region." }`
4. **Calculate Averages** — If agents found, calculate average rating and average fee
5. **Round Averages** — Use Math.round() or .toFixed(2) to clean up decimal places
6. **Response Format** — Return `{ region: "North", avg_rating: 4.5, avg_fee: 525 }`
7. **Error Handling** — Wrap logic in try/catch, return 500 on error

---

## User Flow / Logic (High Level)

1. Client sends GET request to `/region-avg?region=North`
2. Route reads region from query string
3. Route filters agents array to match region
4. If no matches found, return "no agents" message with 200 status
5. If matches found, calculate averages of rating and fee fields
6. Round averages for clean display
7. Return object with region, avg_rating, avg_fee
8. Client receives JSON response

---

## Interfaces (Pages, Endpoints, Screens)

### Backend / API

- **Endpoint:** `GET /region-avg`
- **URL:** `http://localhost:3000/region-avg?region=North`
- **Query Parameters:**
  - `region` (string, required) — Name of region to query
- **Request Body:** None
- **Response Body (Found):** JSON object
  ```json
  { "region": "North", "avg_rating": 4.5, "avg_fee": 525 }
  ```
- **Response Body (Not Found):** JSON object
  ```json
  { "message": "No agents found in this region." }
  ```
- **Response Status:** 200 (both cases), 500 on error
- **Error Response:** `{ "error": "error message" }` with 500 status

---

## Data Used or Modified

- **Reading:** `data/agents-list.js` (agents array)
  - Each agent has: region, rating, fee
- **Writing:** None
- **Modifying:** None

---

## Tech Constraints (Feature-Level)

- Must read region from query parameter using `req.query.region`
- Must use .filter() to find matching agents
- Averages must be rounded nicely (no long decimal strings like 4.534234523)
- Must handle case where no agents exist for region gracefully
- Must return 200 in both success and "not found" cases (not 404)

---

## Acceptance Criteria

- [ ] Query parameter `?region=Name` is readable
- [ ] Agents are filtered by region
- [ ] If no agents found, response is: `{ message: "No agents found in this region." }`
- [ ] If agents found, response contains region, avg_rating, avg_fee
- [ ] Averages are rounded (Math.round or .toFixed)
- [ ] avg_rating is average of agent rating values
- [ ] avg_fee is average of agent fee values
- [ ] Response status is 200 in all valid cases
- [ ] If region parameter is missing, endpoint handles gracefully (returns "no agents" or error)
- [ ] Case sensitivity is documented and consistent
- [ ] When .env PORT changes, correct region filtering still works
- [ ] If error occurs, status is 500

---

## Notes for the AI

- This is the first endpoint with query parameters; establish the pattern clearly
- Average calculation can use reduce() or a loop; keep it junior-friendly
- Rounding matters: Math.round(4.567) = 5, but often you want .toFixed(2) = 4.57
- Test with multiple regions to ensure filtering works correctly
- The "no agents" message format is specific and grading-checked; use exact wording

---
