# PhD Knowledge Wiki (MEAN Stack)

Short answer: **the previous version was only a starter scaffold, not a full wiki yet**.

This updated version is closer to a real wiki workflow by supporting:

- chapter uploads (PDF + notes),
- persistent chapter records,
- page-to-page chapter cross-references,
- and rendering those references back in the UI.

## Current capability checklist

- ✅ Upload chapter PDFs and save chapter notes.
- ✅ Store data in MongoDB through Express + Mongoose.
- ✅ Add source-page → target-page cross-references between chapters.
- ✅ Display cross-references for each chapter in Angular.
- ⚠️ Not yet implemented: in-browser PDF page renderer, bidirectional backlink graph, semantic search, auth, and publication workflow.

## Project structure

- `server/`: Express + Mongoose API (`/api/chapters`) and PDF upload endpoint.
- `client/`: Angular frontend with chapter upload, listing, and cross-reference linking UI.

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

## Next improvements to reach “Karpathy-style LLM wiki”

- Render PDF pages inline in Angular with page anchors.
- Add auto-created reverse links (bidirectional cross-references).
- Add full-text + embedding search over your chapter notes.
- Add project/section hierarchy and citation graph views.


## Editing in the frontend

You can now edit existing chapter title, summary, and notes directly in the Angular UI using the **Edit Chapter** button.
