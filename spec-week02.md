# CSE 341 Books API Week 02 Specification

## Version 1

### Feature 1: Book CRUD Operations and Author References

Use the complete Books Feature 1 Version 1 specification supplied in the Week 02 assignment. It defines the `id`, `authorId`, `title`, and `publicationDate` fields; GET, POST, PUT, and DELETE routes; status codes; and Swagger/deployment expectations. Copy that complete supplied text here so your submitted document contains both features' Version 1 specifications.

### Feature 2: Author CRUD Operations

#### Goal
Create an authors collection and a complete CRUD API. Every author route must be documented and testable in Swagger.

#### Data model
Author documents are stored in `authors` and contain:
- `id`: required custom string ID such as `a1`
- `name`: required string
- `birthYear`: required integer

#### Routes
- `GET /authors`: return all authors; 200 with an array; 500 for unexpected errors.
- `GET /authors/:id`: return one author; 200 with the author; 404 if missing; 500 for unexpected errors.
- `POST /authors`: body `{ "id": "a4", "name": "Example Author", "birthYear": 1980 }`; 201 with created author; 400 if a required field is missing/invalid or ID already exists; 500 for unexpected errors.
- `PUT /authors/:id`: body `{ "name": "Updated Author", "birthYear": 1981 }`; 200 with updated author; 400 if required fields are missing/invalid; 404 if author does not exist; 500 for unexpected errors.
- `DELETE /authors/:id`: 204 with no body; 404 if author does not exist; 409 if books still reference the author; 500 for unexpected errors.

#### Author deletion rule
An author cannot be deleted while one or more books have `authorId` equal to that author's `id`. Return 409 Conflict. The client must first reassign or delete those books.

#### Swagger and deployment
Document every author route in Swagger. All routes must be testable locally and from the deployed Render `/api-docs` page.

## Version 2 — revised implementation specification

### Feature 1: Books
- Store `id`, `authorId`, `title`, and `publicationDate`.
- Use custom string IDs in routes and omit MongoDB `_id` from API responses.
- Require non-empty string IDs, author IDs, and titles; require `publicationDate` in `YYYY-MM-DD` format.
- POST returns 201; invalid/missing fields, duplicate IDs, or unknown author references return 400.
- PUT requires authorId, title, and publicationDate; returns 200, 400, 404, or 500 as appropriate.
- DELETE returns 204 with no body, 404 if missing, or 500 for unexpected errors.
- GET routes return 200, 404 for a missing single book, or 500 for unexpected errors.
- Validate that authorId exists before creating or updating a book.

### Feature 2: Authors
- Store `id`, `name`, and positive integer `birthYear`.
- Use custom string IDs in route parameters and omit MongoDB `_id` from API responses.
- POST returns 201; missing/invalid fields or duplicate ID return 400.
- PUT returns 200; missing/invalid fields return 400; missing author returns 404.
- DELETE returns 204 only when the author exists and no book references it; return 404 if missing and 409 if books still reference it.
- GET routes return 200, 404 for a missing author, or 500 for unexpected errors.

### Shared requirements
- Every route has Swagger documentation, including request-body examples for POST and PUT.
- Use safe client-facing error messages; log unexpected errors on the server without exposing raw database details.
- Test all success and error cases locally and on Render through `/api-docs`.
- Keep MongoDB credentials in `.env` locally and Render environment variables in production; never commit secrets.
