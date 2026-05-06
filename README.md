# PhD Knowledge Wiki (MEAN Stack)

This starter project gives you a **MongoDB + Express + Angular + Node.js** architecture for building a public-facing literature review and PhD project wiki inspired by Karpathy-style knowledge systems.

## What this build supports

- Upload chapter PDFs.
- Write chapter-level notes and summaries.
- Store and query chapter metadata in MongoDB.
- Save page-to-page cross-reference objects between chapters.

## Project structure

- `server/`: Express + Mongoose API (`/api/chapters`) and PDF upload endpoint.
- `client/`: Angular frontend with chapter upload and listing UI.

## Quick start

1. Install dependencies:
   ```bash
   npm run install:all
   ```
2. Set MongoDB connection string:
   - Create `server/.env` with:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/phd-wiki
   PORT=5000
   ```
3. Run both frontend and backend:
   ```bash
   npm run dev
   ```

## Next improvements

- Add PDF page rendering in Angular via `pdf.js`.
- Add in-text bidirectional links from page references.
- Add auth for private drafting + public publishing toggle.
- Add full-text search over chapter notes.
