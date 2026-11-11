# GitHub Issue descriptions — CSE 341 Week 02

Create TWO separate issues in your existing Week 01 repository.

---

## Issue 1 title
Implement Author Collection and API

### Description
- Create the `authors` collection with custom string IDs.
- Implement GET all, GET by ID, POST, PUT, and DELETE author routes.
- Validate author fields and duplicate IDs.
- Prevent deleting an author while books still reference that author; return 409 Conflict.
- Add complete Swagger documentation for every author route.
- Test locally through `/api-docs` and verify on the deployed Render service.

### Spec
Author fields:
- `id`: required custom string ID such as `a1`
- `name`: required non-empty string
- `birthYear`: required positive integer

Routes:
- `GET /authors`: 200 with an array; 500 for unexpected errors.
- `GET /authors/:id`: 200 with author; 404 if missing; 500 for unexpected errors.
- `POST /authors`: body `{ "id": "a4", "name": "Example Author", "birthYear": 1980 }`; 201 with created author; 400 for missing/invalid fields or duplicate ID; 500 for unexpected errors.
- `PUT /authors/:id`: body `{ "name": "Updated Author", "birthYear": 1981 }`; 200 with updated author; 400 for invalid fields; 404 if missing; 500 for unexpected errors.
- `DELETE /authors/:id`: 204 with no body; 404 if missing; 409 if one or more books still reference the author; 500 for unexpected errors.

### Test Plan
- GET /authors returns an array with status 200.
- GET /authors/:id returns an existing author.
- GET /authors/:id returns 404 for a missing author.
- POST /authors creates an author with status 201.
- POST /authors returns 400 for missing/invalid fields and duplicate IDs.
- PUT /authors/:id updates an author with status 200.
- PUT /authors/:id returns 404 for a missing author.
- DELETE /authors/:id returns 409 when a book references the author.
- DELETE /authors/:id returns 204 for an author with no books.
- All author routes are documented and testable in local and deployed Swagger.

---

## Issue 2 title
Update Book Collection to reference authors and finish Book API

### Description
- Update existing book documents and responses to use `authorId` instead of the author's name.
- Add POST, PUT, and DELETE book routes.
- Validate required fields, duplicate book IDs, and that `authorId` exists.
- Add complete Swagger documentation for every book route.
- Test locally through `/api-docs` and verify on the deployed Render service.

### Spec
Book fields:
- `id`: required custom string ID such as `b1`
- `authorId`: required string matching an existing `authors.id`
- `title`: required non-empty string
- `publicationDate`: required `YYYY-MM-DD` string

Routes:
- `GET /books`: 200 with an array; 500 for unexpected errors.
- `GET /books/:id`: 200 with a book; 404 if missing; 500 for unexpected errors.
- `POST /books`: body `{ "id": "b4", "authorId": "a1", "title": "Example Book Title", "publicationDate": "2026-01-15" }`; 201 with created book; 400 for invalid/missing fields, duplicate ID, or unknown author; 500 for unexpected errors.
- `PUT /books/:id`: body `{ "authorId": "a2", "title": "Updated Book Title", "publicationDate": "2026-02-20" }`; 200 with updated book; 400 for invalid/missing fields or unknown author; 404 if book missing; 500 for unexpected errors.
- `DELETE /books/:id`: 204 with no body; 404 if missing; 500 for unexpected errors.

### Test Plan
- GET /books and GET /books/:id responses include authorId.
- POST /books creates a book with status 201.
- POST /books returns 400 for missing fields, duplicate ID, or unknown author.
- PUT /books/:id updates a book with status 200.
- PUT /books/:id returns 400 for an unknown author and 404 for a missing book.
- DELETE /books/:id returns 204 for an existing book and 404 for a missing book.
- All book routes are documented and testable in local and deployed Swagger.
- At least one author route is retested after book changes.
