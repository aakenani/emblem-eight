# Emblem Eight - Complete File Tree

```
emblemdata-8/
│
├── 📱 Application Code
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx                 # Locale-specific layout with i18n
│   │   │   ├── page.tsx                   # Homepage with features
│   │   │   ├── loading.tsx                # Loading state
│   │   │   ├── error.tsx                  # Error boundary
│   │   │   ├── gallery/
│   │   │   │   ├── page.tsx               # Gallery index page
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx           # Individual image detail
│   │   │   └── upload/
│   │   │       └── page.tsx               # Upload interface page
│   │   ├── api/
│   │   │   ├── upload/
│   │   │   │   └── route.ts               # File upload API
│   │   │   ├── ai-insights/
│   │   │   │   └── route.ts               # AI analysis API
│   │   │   └── search/
│   │   │       └── route.ts               # Search API endpoint
│   │   ├── studio/
│   │   │   └── [[...index]]/
│   │   │       └── page.tsx               # Sanity Studio route
│   │   ├── globals.css                    # Global styles & Tailwind
│   │   ├── page.tsx                       # Root redirect to /en
│   │   └── not-found.tsx                  # 404 page
│   │
│   ├── components/
│   │   ├── gallery/
│   │   │   ├── GalleryView.tsx            # Main gallery container
│   │   │   ├── GalleryHeader.tsx          # Header with controls
│   │   │   ├── ImageGrid.tsx              # Grid view layout
│   │   │   ├── ImageList.tsx              # List view layout
│   │   │   ├── ImageMasonry.tsx           # Masonry view layout
│   │   │   └── ImageDetailView.tsx        # Full image detail view
│   │   ├── upload/
│   │   │   └── UploadView.tsx             # Upload interface
│   │   └── ui/                            # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── tabs.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── use-toast.ts
│   │
│   ├── lib/
│   │   ├── sanity.ts                      # Sanity client & queries
│   │   ├── meilisearch.ts                 # Meilisearch config
│   │   ├── r2.ts                          # Cloudflare R2 utilities
│   │   ├── ai.ts                          # OpenAI integration
│   │   └── utils.ts                       # Utility functions
│   │
│   └── sanity/
│       ├── schemas/
│       │   ├── index.ts                   # Schema exports
│       │   └── archiveImage.ts            # Image document schema
│       ├── sanity.config.ts               # Sanity configuration
│       ├── sanity.cli.ts                  # Sanity CLI config
│       └── tsconfig.json                  # Sanity TypeScript config
│
├── 🌍 Internationalization
│   ├── messages/
│   │   ├── en.json                        # English translations
│   │   └── ar.json                        # Arabic translations
│   ├── i18n.ts                            # i18n configuration
│   └── middleware.ts                      # Locale routing middleware
│
├── 🎨 Styling & Configuration
│   ├── tailwind.config.ts                 # Tailwind configuration
│   ├── postcss.config.js                  # PostCSS configuration
│   ├── components.json                    # shadcn/ui config
│   └── .cursorrules                       # Cursor IDE rules
│
├── ⚙️ Configuration Files
│   ├── next.config.mjs                    # Next.js configuration
│   ├── tsconfig.json                      # TypeScript configuration
│   ├── package.json                       # Dependencies & scripts
│   ├── .eslintrc.json                     # ESLint rules
│   ├── vercel.json                        # Vercel deployment config
│   ├── docker-compose.yml                 # Docker services
│   └── .gitignore                         # Git ignore rules
│
├── 🔧 Scripts
│   ├── scripts/
│   │   ├── init-meilisearch.js            # Initialize search index
│   │   └── sync-to-meilisearch.js         # Sync data to search
│
├── 📚 Documentation
│   ├── README.md                          # Main documentation
│   ├── SETUP.md                           # Quick setup guide
│   ├── ARCHITECTURE.md                    # System architecture
│   ├── CONTRIBUTING.md                    # How to contribute
│   ├── PROJECT_SUMMARY.md                 # Project overview
│   ├── FILE_TREE.md                       # This file!
│   └── .env.example                       # Environment variables template
│
└── 📦 Generated & Dependencies
    ├── node_modules/                      # NPM dependencies (not in git)
    ├── .next/                             # Next.js build output (not in git)
    └── .env.local                         # Local environment (not in git)
```

## 📊 File Count by Category

| Category | Count | Purpose |
|----------|-------|---------|
| Pages | 8 | Route handlers and page components |
| Components | 15 | Reusable UI components |
| API Routes | 3 | Backend endpoints |
| Libraries | 5 | Utility functions and clients |
| Schemas | 1 | Sanity content models |
| Config Files | 10 | Project configuration |
| Documentation | 6 | Guides and references |
| Scripts | 2 | Automation and setup |
| i18n | 3 | Internationalization |
| Styling | 2 | CSS and design tokens |

**Total Application Files**: ~55 files

## 🔑 Key File Purposes

### Critical Application Files
- `app/[locale]/layout.tsx` - Sets up i18n, fonts, and global providers
- `lib/sanity.ts` - All Sanity queries and types
- `components/gallery/GalleryView.tsx` - Main gallery logic
- `components/upload/UploadView.tsx` - File upload handling

### Configuration Essentials
- `next.config.mjs` - Next.js settings, image domains
- `i18n.ts` - Locale configuration
- `middleware.ts` - Handles routing for locales
- `.env.local` - Your secrets (create from .env.example)

### Setup Scripts
- `scripts/init-meilisearch.js` - One-time search setup
- `scripts/sync-to-meilisearch.js` - Sync content to search

### Documentation
- `README.md` - Start here!
- `SETUP.md` - Quick start guide
- `ARCHITECTURE.md` - Deep dive into the system

## 🎯 Where to Start

**For Developers:**
1. Read `SETUP.md`
2. Check `app/[locale]/page.tsx` for homepage
3. Explore `components/gallery/` for main features
4. Review `lib/sanity.ts` for data layer

**For Designers:**
1. `app/globals.css` for theme colors
2. `components/ui/` for base components
3. `tailwind.config.ts` for design tokens

**For Content:**
1. `sanity/schemas/archiveImage.ts` for content structure
2. Navigate to `/studio` when app is running
3. `messages/` for translations

## 🚀 Most Important Files for Customization

1. **Branding**: `app/globals.css` (colors), `app/[locale]/page.tsx` (homepage)
2. **Content Model**: `sanity/schemas/archiveImage.ts`
3. **Translations**: `messages/en.json`, `messages/ar.json`
4. **Configuration**: `.env.local`, `next.config.mjs`

## 📝 Files You Should NOT Modify

- `node_modules/` - Dependencies (managed by npm)
- `.next/` - Build output (generated)
- `components/ui/*` - shadcn components (update via CLI)

## 🔄 Files That Update Automatically

- `.next/` - On every build
- `node_modules/` - On npm install
- Type definitions - On TypeScript compilation

---

**Note**: This is the complete file structure of your Emblem Eight application. All files have been created and are ready to use!

