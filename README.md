# Emblem Eight - Bilingual Archive Gallery

A lightning-fast, bilingual (English/Arabic) React archive application built with Next.js 14, featuring interactive multi-view galleries, AI-assisted insights, and powerful search capabilities.

## ✨ Features

- 🌍 **Bilingual Support**: Full English and Arabic support with RTL layout
- 🚀 **Lightning Fast**: Optimized with Next.js 14, Tailwind CSS, and Cloudflare R2
- 🎨 **Multi-View Gallery**: Grid, List, and Masonry layouts
- 📤 **Bulk Upload**: Drag-and-drop multiple images at once
- 🤖 **AI Insights**: OpenAI GPT-4 Vision integration for image analysis
- 🔍 **Powerful Search**: Meilisearch integration for instant results
- ✏️ **Editable Metadata**: Rich metadata editing for each image
- 📱 **Responsive Design**: Beautiful UI on all devices
- 🎨 **Modern UI**: Built with shadcn/ui components

## 🛠 Tech Stack

- **Framework**: Next.js 14 (React + TypeScript)
- **UI**: shadcn/ui + Tailwind CSS
- **i18n**: next-intl
- **CMS**: Sanity CMS
- **Storage**: Cloudflare R2 + Sanity Assets
- **Search**: Meilisearch
- **AI**: OpenAI GPT-4 Vision
- **Hosting**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   cd emblemdata-8
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your credentials:
   
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Sanity**
   
   ```bash
   npm run sanity init
   ```
   
   Follow the prompts to create a new Sanity project or connect to an existing one.

5. **Initialize Meilisearch**
   
   First, run Meilisearch (via Docker):
   ```bash
   docker run -d -p 7700:7700 getmeili/meilisearch:latest
   ```
   
   Then initialize the index:
   ```bash
   npm run meilisearch:init
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Your app will be available at `http://localhost:3000`

7. **Access Sanity Studio**
   
   Navigate to `http://localhost:3000/studio` to manage your content.

## 🔧 Configuration

### Sanity CMS

1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Add your project ID and dataset to `.env.local`
3. Generate an API token with write permissions

### Cloudflare R2

1. Create an R2 bucket in your Cloudflare dashboard
2. Generate API credentials (Access Key ID and Secret Access Key)
3. Set up a public domain for your bucket
4. Add credentials to `.env.local`

### Meilisearch

For production, consider using:
- [Meilisearch Cloud](https://www.meilisearch.com/cloud)
- Self-hosted on your server
- Docker deployment

### OpenAI (Optional)

For AI-powered image insights:
1. Get an API key from [OpenAI](https://platform.openai.com)
2. Add it to `.env.local` as `OPENAI_API_KEY`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `NEXT_PUBLIC_R2_PUBLIC_URL`
- `NEXT_PUBLIC_MEILISEARCH_HOST`
- `MEILISEARCH_ADMIN_KEY`
- `OPENAI_API_KEY` (optional)

## 📁 Project Structure

```
emblemdata-8/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── page.tsx        # Homepage
│   │   ├── gallery/        # Gallery pages
│   │   └── upload/         # Upload interface
│   ├── api/                # API routes
│   │   ├── upload/         # File upload endpoint
│   │   ├── ai-insights/    # AI analysis endpoint
│   │   └── search/         # Search endpoint
│   └── studio/             # Sanity Studio
├── components/
│   ├── gallery/            # Gallery components
│   ├── upload/             # Upload components
│   └── ui/                 # UI components (shadcn)
├── lib/
│   ├── sanity.ts           # Sanity client & queries
│   ├── meilisearch.ts      # Meilisearch config
│   ├── r2.ts               # Cloudflare R2 utilities
│   └── ai.ts               # AI integration
├── sanity/
│   ├── schemas/            # Sanity schemas
│   └── sanity.config.ts    # Sanity configuration
├── messages/               # i18n translations
│   ├── en.json
│   └── ar.json
└── scripts/
    └── init-meilisearch.js # Meilisearch setup script
```

## 🎯 Usage

### Uploading Images

1. Navigate to the Upload page
2. Drag and drop multiple images or click to select
3. Images are automatically uploaded to both Sanity and Cloudflare R2
4. View your images in the Gallery

### Gallery Views

- **Grid View**: Classic grid layout with image cards
- **List View**: Detailed list with descriptions
- **Masonry View**: Pinterest-style masonry layout

### Editing Metadata

1. Click on any image in the gallery
2. Click the "Edit" button
3. Update title, description, tags, and metadata
4. Save changes

### AI Insights

1. Open an image detail page
2. Click "Generate AI Insights"
3. AI will analyze the image and provide detailed insights
4. Insights are saved and displayed in both languages

### Search

Use the search bar in the gallery to instantly find images by:
- Title (English/Arabic)
- Description
- Tags
- Author
- Source

## 🌐 Internationalization

The app supports English (en) and Arabic (ar) with full RTL support. To add more languages:

1. Add locale to `i18n.ts`:
   ```typescript
   export const locales = ['en', 'ar', 'fr'] as const;
   ```

2. Create translation file in `messages/`:
   ```
   messages/fr.json
   ```

3. Update middleware configuration if needed

## 🔌 API Endpoints

### POST `/api/upload`
Upload images to R2 and Sanity

### POST `/api/ai-insights`
Generate AI-powered image insights

### GET `/api/search?q=query&locale=en`
Search images using Meilisearch

## 🎨 Customization

### Colors & Theme

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
```

### Fonts

Arabic font (Cairo) and Latin font (Inter) are configured in `app/[locale]/layout.tsx`.

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Sanity](https://sanity.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Meilisearch](https://www.meilisearch.com/)
- [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- [OpenAI](https://openai.com/)

---

Built with ❤️ for archiving and preserving visual history.

