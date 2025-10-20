# Quick Setup Guide

Follow these steps to get Emblem Eight up and running quickly.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity CMS

First, you need a Sanity account and project:

1. Go to [sanity.io](https://sanity.io) and sign up
2. Create a new project
3. Note your Project ID and Dataset name
4. Generate an API token with Editor privileges

### 3. Configure Environment Variables

Create `.env.local` in the root directory:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-15
SANITY_API_TOKEN=your_token_here

# Cloudflare R2 (Optional - can skip initially)
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=emblem-eight-images
NEXT_PUBLIC_R2_PUBLIC_URL=https://your-bucket.r2.dev

# Meilisearch (Optional - can skip initially)
NEXT_PUBLIC_MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_ADMIN_KEY=your_admin_key

# OpenAI (Optional - for AI insights)
OPENAI_API_KEY=your_openai_key
```

### 4. Start Development Server

```bash
npm run dev
```

Your app should now be running at `http://localhost:3000`

### 5. Access Sanity Studio

Navigate to `http://localhost:3000/studio` to access the CMS interface.

## Optional: Set Up Meilisearch

### Using Docker (Easiest)

```bash
docker run -d -p 7700:7700 getmeili/meilisearch:latest
```

### Initialize the Index

```bash
npm run meilisearch:init
```

## Optional: Set Up Cloudflare R2

1. Log in to Cloudflare Dashboard
2. Go to R2 section
3. Create a new bucket
4. Generate API credentials
5. Set up a public domain (optional but recommended)
6. Add credentials to `.env.local`

## Testing the App

1. **Visit Homepage**: `http://localhost:3000`
2. **Upload Images**: Go to Upload page and drag-drop some images
3. **View Gallery**: Check different view modes (Grid, List, Masonry)
4. **Edit Metadata**: Click on an image and edit its details
5. **Search**: Use the search bar (if Meilisearch is set up)
6. **Language Switch**: Toggle between English and Arabic

## Common Issues

### "Module not found" errors
```bash
rm -rf node_modules
npm install
```

### Sanity Studio not loading
- Check your SANITY_PROJECT_ID is correct
- Ensure the Sanity token has proper permissions

### Images not uploading
- Check your R2 credentials
- Or comment out R2 code in `/app/api/upload/route.ts` to use only Sanity

### TypeScript errors
```bash
npm run build
```
This will show all type errors that need fixing.

## Next Steps

1. **Customize Design**: Edit `app/globals.css` for colors and themes
2. **Add More Languages**: Add translation files in `/messages`
3. **Configure Search**: Fine-tune Meilisearch settings
4. **Deploy**: Push to GitHub and deploy on Vercel

## Getting Help

- Check the main README.md for detailed documentation
- Open an issue on GitHub
- Review the code comments for implementation details

Happy archiving! 🎉

