# CSE 341 Week 02 — Books and Authors API

This is the Week 02 extension of the Week 01 Express/MongoDB Books API. It adds full CRUD for books and authors, validates `authorId` references, and documents every route in Swagger at `/api-docs`.

## 1. Before changing your existing repository

1. Make a backup copy of your Week 01 folder.
2. Extract this ZIP.
3. Copy the updated/new files into your existing Week 01 project, keeping the same folder structure.
4. Do not copy a real `.env` file from this ZIP (there is only `.env.example`). Keep your existing local `.env` unchanged.
5. In VS Code, open the existing project folder, not a second unrelated project.

## 2. Files changed and added

### Updated existing files
- `package.json` — adds `swagger-jsdoc` and `swagger-ui-express`, plus a Swagger script.
- `app.js` — mounts Swagger at `/api-docs`.
- `src/router.js` — adds all author routes and the book write routes, with OpenAPI comments.
- `src/models/books.js` — adds authorId projection and book create/update/delete/author lookup.
- `src/controllers/books.js` — adds POST, PUT, DELETE and validation.
- `.env.example` — same environment variable pattern; use as a reference only.
- `README.md` and `spec-week02.md` — documentation.

### New files
- `src/models/authors.js`
- `src/controllers/authors.js`
- `src/swagger.js`
- `spec-week02.md`

### Existing files kept
- `server.js`
- `src/db/connect.js`
- `.gitignore`
- your real `.env` file (local only)

## 3. MongoDB Atlas preparation — do this carefully

Use the same Atlas cluster and database from Week 01 (`cse341-books-db`).

### Create the authors collection
In Atlas → Data Explorer → `cse341-books-db`:
1. Create a collection named `authors`.
2. Insert at least three author documents, one at a time:

```json
{ "id": "a1", "name": "Jane Austen", "birthYear": 1775 }
{ "id": "a2", "name": "George Orwell", "birthYear": 1903 }
{ "id": "a3", "name": "Chinua Achebe", "birthYear": 1930 }
```

### Update the existing books
Every book must now contain `authorId`, not `author`. Edit each existing book document in Atlas and assign an author id that exists in the authors collection. For example:

```json
{ "id": "b1", "authorId": "a1", "title": "Pride and Prejudice", "publicationDate": "1813-01-28" }
```

Use your actual book IDs/titles if they differ. Remove the old `author` field after assigning `authorId`. Do not leave a book pointing to a nonexistent author.

## 4. Install and run locally

Open VS Code Terminal in the project folder. Run:

```bash
npm install
npm run dev
```

If the server starts and prints that it connected to MongoDB, open:

- `http://localhost:3000/`
- `http://localhost:3000/api-docs`

If port 3000 is already in use, stop the other server with `Ctrl+C`.

## 5. Test routes in Swagger

Open `http://localhost:3000/api-docs`. Expand each route, click **Try it out**, enter the path/body, and click **Execute**.

### Authors
- `GET /authors` — expect 200 and an array.
- `GET /authors/a1` — expect 200 and one author.
- `POST /authors` — use a new ID, e.g. `a4`; expect 201.
- `PUT /authors/a4` — body e.g. `{ "name": "Updated Example Author", "birthYear": 1982 }`; expect 200.
- `DELETE /authors/a4` — expect 204. First test that deleting `a1` returns 409 if a book still references it.

### Books
- `GET /books` — expect 200 and books containing `authorId`.
- `GET /books/b1` — expect 200 if `b1` exists.
- `POST /books` — body e.g. `{ "id": "b4", "authorId": "a1", "title": "A Test Book", "publicationDate": "2026-01-15" }`; expect 201.
- `PUT /books/b4` — body e.g. `{ "authorId": "a2", "title": "An Updated Test Book", "publicationDate": "2026-02-20" }`; expect 200.
- `DELETE /books/b4` — expect 204.

Also test error cases:
- GET a made-up ID → 404.
- POST with missing fields, duplicate ID, or unknown author → 400.
- PUT an unknown book ID → 404.
- DELETE an unknown book ID → 404.
- DELETE an author still referenced by a book → 409.

**Testing warning:** POST, PUT, and DELETE change your database. Use test IDs such as `a4` and `b4`, and clean them up when finished.

## 6. GitHub workflow — two issues and two separate pull requests

Create the two required GitHub issues from Part 2:
1. `Implement Author Collection and API`
2. `Update Book Collection to reference authors and finish Book API`

Implement the author issue first because books depend on author records. Use one branch and PR per issue. Do not put both issues' work into one PR.

Recommended sequence:
1. Start from latest `main`.
2. Create `implement-author-api`.
3. Implement authors CRUD and Swagger author docs; test locally.
4. Commit and push; open a PR that says `Closes #AUTHOR_ISSUE_NUMBER`; merge it.
5. Pull latest `main`.
6. Create `update-book-api`.
7. Implement book authorId relationship, book POST/PUT/DELETE and Swagger; test locally.
8. Commit and push; open a PR that says `Closes #BOOK_ISSUE_NUMBER`; merge it.

Example commands (replace issue numbers and branch names only when needed):

```bash
git status
git switch main
git pull origin main
git switch -c implement-author-api
```

After the author work is complete:

```bash
git add .
git commit -m "Implement author CRUD API and Swagger docs"
git push -u origin implement-author-api
```

Create the author PR on GitHub, include `Closes #ISSUE_NUMBER`, review it, and merge it. Then:

```bash
git switch main
git pull origin main
git switch -c update-book-api
```

After the book work is complete:

```bash
git add .
git commit -m "Add book CRUD and author references"
git push -u origin update-book-api
```

Create and merge the book PR with `Closes #ISSUE_NUMBER`.

**Important:** If you copy every final file into your working tree before creating the author PR, both features will be mixed together. To preserve two separate PRs, make the author changes first and merge them before applying the book changes. If you want help staging the changes in the right order, share a screenshot of your VS Code Source Control panel before committing.

## 7. Deploy to Render

Use the existing Render Web Service connected to your GitHub repository:
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `MONGODB_URI` = your existing Atlas connection string
  - `MONGODB_DB_NAME` = `cse341-books-db`
- Do not commit `.env`. Render uses its Environment settings.
- Keep your Atlas network access configuration compatible with Render's outbound connections.

After the two PRs are merged, confirm Render deploys the latest `main` commit. Test:

`https://YOUR-RENDER-SERVICE.onrender.com/api-docs`

Replace the example host with your real Render URL. Test all book and author routes in the hosted Swagger page.

## 8. Week 02 video (under 3 minutes)

1. Say your name.
2. Show the deployed Render `/api-docs` page.
3. Demonstrate one book write route (POST, PUT, or DELETE).
4. Demonstrate one author write route.
5. In VS Code, show `src/controllers/books.js` or `src/controllers/authors.js` and explain a successful response, a not-found response, and an unexpected error response.
6. Explain one status-code decision, such as 409 when deleting an author who still has books.
7. Do not show `.env`, passwords, or the MongoDB URI.

Upload the video somewhere the instructor can access, then test the link in a private/incognito browser window.

## 9. Week 02 reflection

Use the course template. Include:
- Video link
- Deployed `/api-docs` URL
- Merged Books PR and Authors PR
- Closed Books issue and Authors issue
- A truthful time-spent reflection
- How Swagger helped you
- One specific process improvement for Week 03

Do not invent links or claim tests you did not perform.
