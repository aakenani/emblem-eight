# Deployment Guide - Emblem Eight

## 🚀 Quick Deploy to Vercel (Recommended)

Vercel is the recommended platform as it's made by the Next.js team and provides the best performance and developer experience.

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select `emblem-eight` from your repositories
   - Click "Import"

3. **Configure Environment Variables**
   
   Add these in the Vercel dashboard (Settings → Environment Variables):

   ```env
   # Sanity CMS
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-03-15
   SANITY_API_TOKEN=your_token_with_write_permissions
   
   # Cloudflare R2 (Optional but recommended)
   R2_ACCOUNT_ID=your_account_id
   R2_ACCESS_KEY_ID=your_access_key
   R2_SECRET_ACCESS_KEY=your_secret_key
   R2_BUCKET_NAME=emblem-eight-images
   NEXT_PUBLIC_R2_PUBLIC_URL=https://your-bucket.r2.dev
   
   # Meilisearch (Required for search)
   NEXT_PUBLIC_MEILISEARCH_HOST=https://your-meilisearch-instance.com
   MEILISEARCH_ADMIN_KEY=your_admin_key
   
   # OpenAI (Optional - for AI insights)
   OPENAI_API_KEY=sk-your-openai-key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build
   - Your app will be live at `https://emblem-eight.vercel.app` (or your custom domain)

5. **Done!** 🎉

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: emblem-eight
# - Directory: ./
# - Build settings: (use defaults)

# Add environment variables
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
# ... repeat for all env vars

# Deploy to production
vercel --prod
```

## 📋 Pre-Deployment Checklist

### 1. Set Up Required Services

#### ✅ Sanity CMS (Required)
- [ ] Create project at https://sanity.io
- [ ] Deploy studio: `cd sanity && sanity deploy`
- [ ] Generate API token with Editor privileges
- [ ] Add CORS origin in Sanity dashboard: `https://your-domain.vercel.app`

#### ✅ Meilisearch (Required for search)
- [ ] Sign up at https://cloud.meilisearch.com OR
- [ ] Self-host on your server/VPS
- [ ] Get API URL and admin key
- [ ] Run: `npm run meilisearch:init` locally first

#### ⚠️ Cloudflare R2 (Recommended)
- [ ] Create R2 bucket in Cloudflare dashboard
- [ ] Generate API credentials
- [ ] Set up public domain for bucket
- [ ] Test upload locally

#### ⚠️ OpenAI (Optional)
- [ ] Get API key from https://platform.openai.com
- [ ] Add billing information
- [ ] Test API key locally

### 2. Test Locally First

```bash
# Build the project
npm run build

# Test the production build
npm run start

# Visit http://localhost:3000 and test:
# - Both languages (EN/AR)
# - Image upload
# - Gallery views
# - Search functionality
# - Image detail pages
```

### 3. Configure Domain (Optional)

In Vercel dashboard:
- Go to Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

## 🌐 Alternative Deployment Options

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

**Note**: Configure environment variables in Netlify dashboard.

### Option 3: AWS Amplify

1. Go to AWS Amplify Console
2. Connect your GitHub repository
3. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
4. Add environment variables
5. Deploy

### Option 4: Docker + Any VPS

```bash
# Build Docker image
docker build -t emblem-eight .

# Run container
docker run -p 3000:3000 emblem-eight
```

**Note**: You'll need to create a `Dockerfile` first.

### Option 5: Traditional Server (VPS)

```bash
# On your server
git clone https://github.com/aakenani/emblem-eight.git
cd emblem-eight
npm install
npm run build

# Use PM2 to run
npm i -g pm2
pm2 start npm --name "emblem-eight" -- start

# Set up nginx as reverse proxy
```

## 🔧 Post-Deployment Configuration

### 1. Deploy Sanity Studio

Your Sanity Studio can be accessed at `https://your-domain.vercel.app/studio`, but you can also deploy it separately:

```bash
cd sanity
sanity deploy
# Your studio will be at: https://your-project.sanity.studio
```

### 2. Initialize Meilisearch Index

After deployment, you need to initialize and sync your search index:

```bash
# Run locally (connected to production Meilisearch)
npm run meilisearch:init
npm run meilisearch:sync
```

Or set up a webhook in Sanity to auto-sync on content changes.

### 3. Set Up CORS

In your Sanity dashboard (https://sanity.io/manage):
- Go to your project → API → CORS Origins
- Add your Vercel domain: `https://your-domain.vercel.app`
- Add your Sanity Studio domain if deployed separately

### 4. Configure Cloudflare R2 CORS

In Cloudflare R2 bucket settings:
```json
{
  "AllowedOrigins": ["https://your-domain.vercel.app"],
  "AllowedMethods": ["GET", "PUT", "POST"],
  "AllowedHeaders": ["*"]
}
```

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to git (already in .gitignore)
   - Use different API keys for development and production
   - Rotate API keys regularly

2. **API Routes**
   - Upload route is public - consider adding authentication
   - Rate limit your API endpoints
   - Validate file types and sizes

3. **Sanity Token**
   - Use token with minimal required permissions
   - Different tokens for read vs write operations

4. **Meilisearch**
   - Don't expose admin key in frontend
   - Use separate search-only key for frontend

## 📊 Monitoring & Analytics

### Add Analytics (Recommended)

1. **Vercel Analytics** (Built-in)
   ```tsx
   // Already configured if using Vercel
   ```

2. **Google Analytics**
   ```tsx
   // Add to layout.tsx
   <Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
   ```

3. **Plausible** (Privacy-friendly)
   ```tsx
   <Script defer data-domain="yourdomain.com" 
           src="https://plausible.io/js/script.js" />
   ```

### Error Tracking

1. **Sentry** (Recommended)
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard@latest -i nextjs
   ```

2. **LogRocket**
   ```bash
   npm install logrocket
   ```

## 🔄 Continuous Deployment

Once deployed to Vercel, every push to your `main` branch automatically deploys:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically builds and deploys
```

### Preview Deployments

Every pull request gets its own preview URL:
- Create a new branch
- Push changes
- Open PR on GitHub
- Vercel creates a preview deployment
- Test before merging

## 🐛 Troubleshooting Deployment Issues

### Build Fails

```bash
# Common issues:

# 1. TypeScript errors
npm run build
# Fix any type errors

# 2. Missing environment variables
# Add all required env vars in Vercel dashboard

# 3. Module not found
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Runtime Errors

1. Check Vercel Function Logs
2. Verify all environment variables are set
3. Check API endpoints are accessible
4. Verify CORS settings

### Images Not Loading

1. Check image domains in `next.config.mjs`
2. Verify R2 bucket is public
3. Check CORS settings on R2
4. Verify Sanity CDN is accessible

### Search Not Working

1. Verify Meilisearch host is accessible
2. Check API keys are correct
3. Run `npm run meilisearch:init`
4. Check Meilisearch logs

## 📈 Performance Optimization

After deployment, check:

1. **Lighthouse Score**
   - Run in Chrome DevTools
   - Aim for 90+ in all categories

2. **Core Web Vitals**
   - Check in Vercel Analytics
   - Optimize images if needed

3. **Bundle Size**
   - Use Vercel Bundle Analyzer
   - Remove unused dependencies

## 💰 Cost Estimate

For a production deployment:

| Service | Free Tier | Paid (Est.) |
|---------|-----------|-------------|
| Vercel | ✅ Hobby (free) | Pro: $20/mo |
| Sanity | ✅ Free (100k API requests) | Growth: $99/mo |
| Meilisearch Cloud | ❌ | Basic: $30/mo |
| Cloudflare R2 | ✅ 10GB free | ~$0.015/GB |
| OpenAI | ❌ | Pay per use (~$0.002/image) |

**Total**: Free tier possible, or ~$50-150/month for production

## 🎯 Production Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Sanity Studio deployed and accessible
- [ ] CORS configured for all services
- [ ] Meilisearch index initialized and synced
- [ ] Test upload functionality
- [ ] Test search functionality
- [ ] Test in both languages (EN/AR)
- [ ] Test on mobile devices
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Analytics installed
- [ ] Error tracking configured
- [ ] Backup strategy in place
- [ ] Documentation updated with live URLs

## 🆘 Need Help?

- **Vercel Support**: https://vercel.com/support
- **Sanity Support**: https://slack.sanity.io
- **GitHub Issues**: https://github.com/aakenani/emblem-eight/issues

---

**Ready to deploy?** Start with Method 1 (Vercel Dashboard) - it's the easiest! 🚀

