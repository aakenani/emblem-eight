# Emblem Eight - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │
│  │  English   │  │   Arabic   │  │  Multi-View Gallery  │  │
│  │    UI      │  │     UI     │  │ (Grid/List/Masonry)  │  │
│  └────────────┘  └────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js 14 App Router                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Server Components (SSR)    │  Client Components     │  │
│  │  • Gallery Pages            │  • Upload Interface    │  │
│  │  • Image Details            │  • Interactive Gallery │  │
│  │  • i18n Routing             │  • Edit Forms          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
           │                │                │
           ▼                ▼                ▼
┌──────────────────┐ ┌──────────────┐ ┌─────────────────┐
│   Sanity CMS     │ │  Meilisearch │ │  Cloudflare R2  │
│                  │ │               │ │                 │
│  • Content Store │ │  • Fast Search│ │  • Image Store  │
│  • Image Assets  │ │  • Filtering  │ │  • CDN Delivery │
│  • Metadata      │ │  • i18n       │ │  • Backup       │
└──────────────────┘ └──────────────┘ └─────────────────┘
           │                                    
           ▼                                    
┌──────────────────┐                           
│   OpenAI API     │                           
│                  │                           
│  • GPT-4 Vision  │                           
│  • AI Insights   │                           
│  • Bilingual     │                           
└──────────────────┘                           
```

## Data Flow

### Image Upload Flow
```
User → Upload Component → API Route → [Sanity + R2] → Meilisearch Sync
```

### Gallery View Flow
```
Server Component → Sanity Query → Transform Data → Client Render
```

### Search Flow
```
User Input → Meilisearch API → Results → Gallery Update
```

### AI Insights Flow
```
User Request → API Route → OpenAI API → Update Sanity → UI Refresh
```

## Directory Structure

```
emblemdata-8/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── layout.tsx         # Locale-specific layout
│   │   ├── page.tsx           # Homepage
│   │   ├── gallery/
│   │   │   ├── page.tsx       # Gallery index
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Image detail
│   │   └── upload/
│   │       └── page.tsx       # Upload interface
│   ├── api/                   # API routes
│   │   ├── upload/
│   │   │   └── route.ts       # File upload
│   │   ├── ai-insights/
│   │   │   └── route.ts       # AI generation
│   │   └── search/
│   │       └── route.ts       # Search endpoint
│   ├── studio/                # Sanity Studio
│   │   └── [[...index]]/
│   │       └── page.tsx
│   ├── globals.css            # Global styles
│   └── page.tsx               # Root redirect
│
├── components/
│   ├── gallery/               # Gallery components
│   │   ├── GalleryView.tsx
│   │   ├── GalleryHeader.tsx
│   │   ├── ImageGrid.tsx
│   │   ├── ImageList.tsx
│   │   ├── ImageMasonry.tsx
│   │   └── ImageDetailView.tsx
│   ├── upload/                # Upload components
│   │   └── UploadView.tsx
│   └── ui/                    # UI components (shadcn)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── tabs.tsx
│       └── ...
│
├── lib/
│   ├── sanity.ts              # Sanity client & types
│   ├── meilisearch.ts         # Search configuration
│   ├── r2.ts                  # R2 storage utilities
│   ├── ai.ts                  # AI integration
│   └── utils.ts               # Utility functions
│
├── sanity/
│   ├── schemas/
│   │   ├── index.ts
│   │   └── archiveImage.ts    # Image schema
│   ├── sanity.config.ts
│   └── sanity.cli.ts
│
├── messages/                  # i18n translations
│   ├── en.json
│   └── ar.json
│
└── scripts/
    └── init-meilisearch.js    # Setup script
```

## Key Technologies

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Component library
- **next-intl**: Internationalization

### Backend
- **Sanity CMS**: Content management
- **Cloudflare R2**: Object storage
- **Meilisearch**: Search engine
- **OpenAI API**: AI insights

### Deployment
- **Vercel**: Hosting platform
- **Edge Functions**: Serverless API routes

## Performance Optimizations

1. **Image Optimization**
   - Next.js Image component
   - Cloudflare R2 CDN
   - WebP format
   - Lazy loading

2. **Data Fetching**
   - Server-side rendering
   - Incremental static regeneration
   - API route caching

3. **Search**
   - Meilisearch instant search
   - Client-side filtering
   - Debounced queries

4. **Bundle Size**
   - Code splitting
   - Tree shaking
   - Dynamic imports

## Security Considerations

1. **API Protection**
   - Environment variables for secrets
   - API key rotation
   - Rate limiting

2. **Upload Security**
   - File type validation
   - Size limits
   - Virus scanning (recommended)

3. **Access Control**
   - Sanity token permissions
   - R2 bucket policies
   - CORS configuration

## Scalability

### Horizontal Scaling
- Vercel Edge Network
- Cloudflare CDN
- Meilisearch clustering

### Vertical Scaling
- Image compression
- Lazy loading
- Pagination
- Infinite scroll

## Monitoring & Analytics

Recommended integrations:
- Vercel Analytics
- Sentry (error tracking)
- Plausible/Google Analytics
- Sanity Studio usage

## Future Enhancements

1. **Features**
   - Advanced filtering
   - Collections/Albums
   - Social sharing
   - Comments system

2. **Technical**
   - Progressive Web App
   - Offline support
   - Advanced caching
   - Real-time updates

3. **AI Features**
   - Auto-tagging
   - Similar images
   - Smart cropping
   - Content moderation

## Development Workflow

```
Local Dev → Git → GitHub → Vercel → Production
              ↓
          CI/CD Tests
              ↓
        Preview Deploy
```

## Environment-Specific Configurations

### Development
- Local Meilisearch
- Sanity development dataset
- Local R2 emulator (optional)

### Staging
- Staging Meilisearch
- Sanity staging dataset
- Test R2 bucket

### Production
- Production Meilisearch
- Sanity production dataset
- Production R2 bucket
- CDN enabled
- Analytics enabled

## API Endpoints

### Public Endpoints
- `GET /api/search` - Search images
- `GET /[locale]/gallery` - View gallery
- `GET /[locale]/gallery/[slug]` - Image details

### Protected Endpoints
- `POST /api/upload` - Upload images
- `POST /api/ai-insights` - Generate insights
- `PATCH /api/images/[id]` - Update metadata

## Database Schema (Sanity)

### archiveImage Document
```typescript
{
  _id: string
  _createdAt: datetime
  _updatedAt: datetime
  title: { en: string, ar: string }
  slug: slug
  image: image
  description: { en: text, ar: text }
  tags: string[]
  metadata: {
    date: datetime
    author: string
    source: string
    location: string
    copyright: string
  }
  aiInsights: {
    en: text
    ar: text
    generatedAt: datetime
  }
  r2Url: url
  featured: boolean
  order: number
}
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Sanity project deployed
- [ ] Meilisearch instance running
- [ ] R2 bucket configured
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Analytics integrated
- [ ] Error tracking enabled
- [ ] Backup strategy in place

