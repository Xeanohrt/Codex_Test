# PhD Knowledge Wiki (MEAN-style)

This project lets you publish chapter-based PhD notes with uploaded PDFs and page-level cross-references.

## Local development

1. Install dependencies:
   ```bash
   npm run install:all
   ```
2. Start API + frontend:
   ```bash
   npm run dev
   ```
3. API health check:
   ```bash
   http://localhost:5000/api/health
   ```

## Deploy online with Vercel (API)

This repository now includes a Vercel serverless entrypoint at `api/index.js` and `vercel.json` routing for `/api/*`.

### Steps

1. Push this repo to GitHub.
2. In Vercel, create a new project from this repository.
3. Add environment variables:
   - `MONGODB_URI` (required, use MongoDB Atlas for production)
   - `UPLOADS_DIR` (optional; defaults to `/tmp/uploads` on Vercel)
4. Deploy.

After deploy, test:
- `https://<your-vercel-domain>/api/health`

## Important Vercel note about file uploads

Vercel serverless functions have ephemeral filesystem storage. Uploaded PDFs written to `/tmp` are temporary and will not persist long-term. For production, move PDF storage to durable object storage (e.g., Vercel Blob, AWS S3, Cloudinary, or similar) and store only URLs in MongoDB.

## Current features

- Create chapters with PDF upload.
- Edit chapter metadata/content.
- Add page-to-page chapter cross-references.
- Fetch references with populated target chapter metadata.
