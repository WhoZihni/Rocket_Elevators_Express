# 🤖 GET /calc-residential — Feature Specification

---

## Feature Identity

- **Feature Name:** GET /calc-residential Endpoint
- **Related Area:** Backend

---

## Feature Goal

Implement an endpoint that calculates the number of elevators required for a residential building and the total cost based on apartment count, floor count, and service tier. This endpoint has the most validation requirements (each is individually graded) and demonstrates business logic separation in a dedicated calculation file.

---

## Feature Scope

### In Scope (Included)

- Query parameters: number_of_apartments, number_of_floors, tier
- 4 validation checks (each graded separately)
- Calculation function in separate file (`data/calcul.js`)
- Tier pricing lookup from data file
- Total cost calculation
- Error handling and proper status codes

### Out of Scope (Excluded)

- Database lookups
- Dynamic pricing
- Building permits or compliance checks
- Delivery time estimates

---

## Sub-Requirements (Feature Breakdown)

1. **Read Parameters** — Extract from query string: `number_of_apartments`, `number_of_floors`, `tier`
2. **Validate Tier** — Check tier is one of: `standard`, `premium`, `excelium`. If not, return 400 error
3. **Validate Existence** — Check both apartments and floors are provided and are not empty. If missing, return 400
4. **Validate Numbers** — Check both apartments and floors are numbers (typeof check). If not, return 400
5. **Validate Integers** — Check both are integers using `Number.isInteger()`. If not, return 400
6. **Validate Greater Than 0** — Check both are > 0. If not, return 400
7. **Call Calculation** — Import and call `calcResidential(apartments, floors, tier)` from `data/calcul.js`
8. **Look Up Pricing** — Find cost per elevator for the tier from `data/agents-list.js` or pricing file
9. **Calculate Total** — Multiply elevators required × cost per elevator
10. **Return Response** — Return `{ elevators_required: N, total_cost: N }`
11. **Error Handling** — Wrap entire logic in try/catch, return 500 on unexpected errors

---

## User Flow / Logic (High Level)

1. Client sends GET request: `/calc-residential?number_of_apartments=120&number_of_floors=15&tier=premium`
2. Route reads all three query parameters
3. Route validates tier (must be standard/premium/excelium) → 400 if not
4. Route validates apartments and floors exist → 400 if missing
5. Route validates both are numbers → 400 if not
6. Route validates both are integers → 400 if not (no 10.5, only 10)
7. Route validates both are > 0 → 400 if not (no 0 or negative)
8. Route calls calcResidential(apartments, floors, tier)
9. calcResidential returns object with elevators_required
10. Route looks up cost per elevator for tier
11. Route calculates total_cost = elevators_required × cost_per_elevator
12. Route returns JSON with elevators_required and total_cost
13. Client receives JSON response

---

## Interfaces (Pages, Endpoints, Screens)

### Backend / API

- **Endpoint:** `GET /calc-residential`
- **URL:** `http://localhost:3000/calc-residential?number_of_apartments=120&number_of_floors=15&tier=premium`
- **Query Parameters:**
  - `number_of_apartments` (integer, required) — Must be > 0
  - `number_of_floors` (integer, required) — Must be > 0
  - `tier` (string, required) — One of: standard, premium, excelium
- **Request Body:** None
- **Response Body (Success):**
  ```json
  { "elevators_required": 4, "total_cost": 140000 }
  ```
- **Response Body (Validation Error):**
  ```json
  { "error": "Tier must be standard, premium, or excelium" }
  ```
- **Response Status:** 200 on success, 400 on validation error, 500 on server error
- **Error Response:** `{ "error": "description" }` with appropriate status code

---

## Data Used or Modified

- **Reading:**
  - Query parameters: number_of_apartments, number_of_floors, tier
  - Tier pricing from `data/agents-list.js` or separate pricing file
  - Validation rules from this spec
- **Writing:** None
- **Modifying:** None

---

## Tech Constraints (Feature-Level)

- **All validations must be present and return 400 on failure** — Each is graded separately
- Calculation logic must be in `data/calcul.js`, not in app.js
- Tier pricing must be in data file, not hardcoded in route
- Use `Number.isInteger()` for integer check (not typeof === "number")
- Return proper 400 status for validation errors, 500 for server errors
- Use try/catch at route level to catch unexpected errors

---

## Validation Rules (Critical — Each Graded)

1. **Tier Validation** — `tier` must be "standard", "premium", or "excelium"
   - If missing or invalid → return 400 with error message
2. **Existence Validation** — `number_of_apartments` and `number_of_floors` must be provided
   - If missing → return 400
3. **Type Validation** — Both must be numbers (not strings like "abc")
   - If not numbers → return 400
4. **Integer Validation** — Both must be integers (not 10.5, must be 10)
   - Use `Number.isInteger()` → return 400 if false
5. **Range Validation** — Both must be > 0 (not 0 or negative)
   - If <= 0 → return 400

---

## Acceptance Criteria

- [ ] GET /calc-residential is callable with valid parameters
- [ ] Valid request returns HTTP 200
- [ ] Valid request returns object with elevators_required and total_cost
- [ ] Invalid tier returns HTTP 400 (not 200)
- [ ] Missing apartments parameter returns HTTP 400
- [ ] Missing floors parameter returns HTTP 400
- [ ] Non-numeric apartments returns HTTP 400
- [ ] Non-numeric floors returns HTTP 400
- [ ] Decimal apartments (10.5) returns HTTP 400
- [ ] Decimal floors (10.5) returns HTTP 400
- [ ] Zero apartments returns HTTP 400
- [ ] Negative apartments returns HTTP 400
- [ ] Zero floors returns HTTP 400
- [ ] Negative floors returns HTTP 400
- [ ] Calculation logic is in data/calcul.js
- [ ] Tier pricing is in data file (not hardcoded)
- [ ] Total cost = elevators_required × cost_per_elevator
- [ ] Standard tier costs 20000 per elevator
- [ ] Premium tier costs 35000 per elevator
- [ ] Excelium tier costs 55000 per elevator
- [ ] Elevator calculation uses provided formula
- [ ] Server does not crash on validation error

---

## Elevator Calculation Formula

The formula lives in `data/calcul.js` and is called as:
```javascript
const result = calcResidential(apartments, floors, tier);
```

Formula:
```javascript
elevators = Math.ceil((apartments / floors) / 6);
banks = Math.floor(floors / 20);
if (banks > 0) {
  totalElevators = elevators * (banks + 1);
} else {
  totalElevators = elevators;
}
return { elevators_required: totalElevators };
```

Example:
- apartments = 120, floors = 15, tier = premium
- elevators = Math.ceil((120 / 15) / 6) = Math.ceil(1.33) = 2
- banks = Math.floor(15 / 20) = 0
- totalElevators = 2 (since banks = 0)
- cost_per_elevator = 35000 (premium tier)
- total_cost = 2 × 35000 = 70000

---

## Notes for the AI

- This is the most heavily graded endpoint; every validation is individually tested
- Do not skip any validation; all 4 checks must be implemented
- Return 400 for validation errors, not 500
- Test each validation error separately in Postman before committing
- The formula is provided; implement it exactly as specified
- Keep validation messages clear and helpful for debugging

---
