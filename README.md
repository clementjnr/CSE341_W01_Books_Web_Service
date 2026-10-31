# CSE 341 W01 — Books Web Service

A read-only Express API backed by MongoDB Atlas. It implements the Week 01 specification:
- `GET /books` — all books, HTTP 200.
- `GET /books/:id` — one book by its custom `id`, HTTP 200; HTTP 404 when missing.
- Unexpected database/server errors return a safe JSON message with HTTP 500.

## 1. Requirements

- Node.js 20.6 or newer
- Git
- MongoDB Atlas account and a cluster
- GitHub account
- Render account for deployment

## 2. Open this project in VS Code

Extract the ZIP. In VS Code choose **File → Open Folder** and select the extracted `CSE341_W01_Books_Web_Service` folder. Open **Terminal → New Terminal**.

Check Node and npm:

```bash
node -v
npm -v
```

If Node is older than 20.6, install a current LTS version of Node.js, then restart VS Code.

Install project dependencies:

```bash
npm install
```

## 3. Set up MongoDB Atlas

1. Sign in to MongoDB Atlas and open your project and cluster.
2. In **Database → Data Explorer**, create a database named `cse341-books-db` and a collection named `books` if they do not already exist.
3. Insert at least three documents. Use Atlas's JSON mode and enter each document separately:

```json
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}
```

```json
{
  "id": "b2",
  "author": "Daniel Okafor",
  "title": "The Quiet Horizon",
  "publicationDate": "2019-04-22"
}
```

```json
{
  "id": "b3",
  "author": "Amara Lewis",
  "title": "A Map of Small Stars",
  "publicationDate": "2023-11-05"
}
```

4. Make sure every document has a unique string `id`, plus `author`, `title`, and `publicationDate`. The date format is `YYYY-MM-DD`.
5. In **Database Access**, make sure you have a database user and know its password.
6. In **Network Access**, allow your current public IP address. For local development, do not use `0.0.0.0/0` unless you understand and accept the security risk.
7. Choose **Connect → Drivers → Node.js** and copy the Atlas connection string. Replace the username/password placeholders as needed. If your password contains special characters, URL-encode them in the URI.

Do not put your Atlas password or URI in source code or in GitHub.

## 4. Configure your local environment

1. In VS Code's Explorer, copy `.env.example` and name the copy `.env`.
2. Open `.env` and replace the example `MONGODB_URI` with your real Atlas connection string.
3. Keep these settings:

```dotenv
PORT=3000
MONGODB_URI=your-real-atlas-connection-string
MONGODB_DB_NAME=cse341-books-db
```

The `MONGODB_URI` line above is an illustration only. Use your actual URI on your computer. Never paste it into a public issue, pull request, screenshot, video, or chat.
4. Confirm `.env` is ignored by Git. The `.gitignore` file already includes `.env`.

## 5. Run and test locally

Start the server:

```bash
npm run dev
```

Keep that terminal running. It should report a successful MongoDB connection and that the server is listening.

Open these URLs in your browser, replacing nothing for local testing:

- Root check: `http://localhost:3000/`
- All books: `http://localhost:3000/books`
- Existing book: `http://localhost:3000/books/b1`
- Missing book: `http://localhost:3000/books/not-a-real-id`

Expected results:
- `/` returns `{"message":"Server is running"}`.
- `/books` returns a JSON array and HTTP 200.
- `/books/b1` returns one JSON object and HTTP 200.
- `/books/not-a-real-id` returns `{"message":"Book not found"}` and HTTP 404.

You can also test status codes from a second terminal:

```bash
curl -i http://localhost:3000/books
curl -i http://localhost:3000/books/b1
curl -i http://localhost:3000/books/not-a-real-id
```

Stop the server with `Ctrl+C`.

## 6. GitHub workflow — use issues and pull requests

Do not publish `.env`. Before your first commit, run:

```bash
git status
```

If `.env` appears as an untracked file, stop and check `.gitignore` before committing.

### Create the GitHub repository

1. On GitHub, create a new repository, for example `cse341-w01-books-web-service`.
2. If you are publishing this folder as a new repository, use the repository instructions GitHub displays. In the terminal, the usual commands are:

```bash
git init
git add .
git status
git commit -m "Set up Books API project"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your own GitHub repository URL. If this folder is already a Git repository, do not run `git init` or add another remote blindly; check `git status` and `git remote -v` first.

### Create the four required GitHub issues

Create the four issues using the exact titles and descriptions in your Canvas instructions:
1. `Create the books collection and connect the app to MongoDB`
2. `Implement a route to retrieve all books`
3. `Implement a route to retrieve one book by id`
4. `Deploy and test the application`

Include the relevant Test Plan in each issue. Record each issue number.

### Make a branch and pull request for each code issue

For each of Issues 1–3, work on its own branch, push it, then open a PR to `main`. Include the appropriate closing keyword and issue number in the PR description, for example `Closes #2`, plus the tests you ran. Merge the PR only after checking the diff and tests.

Suggested branch names:
- Issue 1: `connect-to-mongodb`
- Issue 2: `add-get-books-route`
- Issue 3: `get-book-by-id`

For each issue, the basic Git flow is:

```bash
git switch main
git pull origin main
git switch -c YOUR_BRANCH_NAME
```

Make the change for that issue, then:

```bash
git add .
git status
git commit -m "Describe the change"
git push -u origin YOUR_BRANCH_NAME
```

Open GitHub → Pull requests → New pull request. Base: `main`; compare: your branch. In the PR description, include `Closes #ISSUE_NUMBER` and your test results. Merge the PR, then update your local main:

```bash
git switch main
git pull origin main
```

Delete a local feature branch only after it has been merged and you have switched to `main`:

```bash
git branch -d YOUR_BRANCH_NAME
```

**Important:** This ZIP contains the finished Week 01 implementation as a starting point. To meet the course workflow, create the issues and make the three feature PRs in a way that genuinely records your work. Do not claim that a PR/issue was merged or closed unless GitHub confirms it.

## 7. Deploy to Render

1. Push your finished code to GitHub and make sure it is on `main`.
2. In Render, create a **Web Service** connected to your GitHub repository.
3. Use these settings:
   - Runtime: Node
   - Build command: `npm install`
   - Start command: `npm start`
4. In the Render service's **Environment** settings, add:
   - `MONGODB_URI` — your real Atlas URI
   - `MONGODB_DB_NAME` — `cse341-books-db`
5. Do not manually set `PORT`; Render provides it.
6. In Render's service details, find **Outbound IP Addresses**. Add the listed ranges to MongoDB Atlas **Security → Network Access → IP Access List**. Add only the ranges Render provides. Wait for Atlas to apply the change.
7. Wait for Render's deployment to succeed. Check the logs if it fails.
8. Test your real Render URL, for example:

```bash
curl -i https://YOUR-RENDER-SERVICE.onrender.com/books
curl -i https://YOUR-RENDER-SERVICE.onrender.com/books/b1
curl -i https://YOUR-RENDER-SERVICE.onrender.com/books/not-a-real-id
```

Replace the example hostname with your actual Render URL. Save that URL in this README or a GitHub issue comment. Do not publish secrets.

## 8. Walk-through video (less than 2 minutes)

Record your screen with your voice. Do not show your `.env` file, database password, or connection string.

Suggested script:
1. “Hello, my name is [your name]. This is my CSE 341 Week 01 Books API.”
2. Show the deployed `/books` endpoint returning the array.
3. Show `/books/b1` returning one book.
4. Show `/books/not-a-real-id` returning the 404 message.
5. In VS Code, open `src/controllers/books.js`. Explain:
   - `req.params.id` reads the ID from the URL.
   - `getBookById` asks the model/database for the matching book.
   - A found book returns HTTP 200 with JSON.
   - No matching book returns HTTP 404 and `Book not found`.
   - An unexpected error is logged on the server, while the client gets HTTP 500 and a safe `Internal server error` message.
6. Explain that 200 means success, 404 means the requested book does not exist, and 500 means an unexpected server-side problem.
7. Upload the video somewhere the grader can access and test the link in a private/incognito window.

## 9. Reflection submission checklist

Use the reflection template in `reflection-template.md` as a guide. Replace every bracketed prompt with truthful details from your own work. Include:
- Links to your three merged pull requests
- Link(s) to your GitHub issue(s)
- Link to your deployed API
- Link to your walkthrough video
- One implementation decision and link to the relevant code file
- Explanation of how sensitive data is kept out of GitHub, with a link to the repository's `.gitignore` (never link or show your real `.env`)
- A task that took more or less time than expected
- One process improvement for next week

Upload the completed reflection document to Canvas as a `.md` or `.txt` file. Do not submit this README as the reflection unless your instructor specifically says to.

## 10. Rubric checklist

- [ ] PR link provided; PR is merged and closed.
- [ ] GitHub issue link provided; issue is closed.
- [ ] Time-spent reflection gives a specific example.
- [ ] Walkthrough video is under 2 minutes and meets the required points.
- [ ] Sensitive-data handling is explained; no secret is committed.
- [ ] An implementation decision is explained and linked to code.
- [ ] A process improvement is identified.
- [ ] Final reflection is uploaded to Canvas.
