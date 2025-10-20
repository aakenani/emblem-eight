const { createClient } = require('@sanity/client');
const { MeiliSearch } = require('meilisearch');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-15',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const meilisearchClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_ADMIN_KEY,
});

async function syncToMeilisearch() {
  console.log('🚀 Starting sync to Meilisearch...\n');

  try {
    // Fetch all images from Sanity
    console.log('📦 Fetching images from Sanity...');
    const images = await sanityClient.fetch(`
      *[_type == "archiveImage"] {
        _id,
        _createdAt,
        _updatedAt,
        title,
        slug,
        description,
        tags,
        metadata,
        featured,
        order
      }
    `);

    console.log(`✓ Found ${images.length} images\n`);

    if (images.length === 0) {
      console.log('ℹ️  No images to sync. Add some images in Sanity Studio first.');
      return;
    }

    // Get or create the index
    console.log('📊 Connecting to Meilisearch index...');
    const index = meilisearchClient.index('images');

    // Add documents to Meilisearch
    console.log('⬆️  Uploading documents to Meilisearch...');
    const result = await index.addDocuments(images, { primaryKey: '_id' });

    console.log(`✓ Upload task created: ${result.taskUid}\n`);

    // Wait for the task to complete
    console.log('⏳ Waiting for indexing to complete...');
    await index.waitForTask(result.taskUid);

    // Get stats
    const stats = await index.getStats();
    console.log('\n📈 Index Statistics:');
    console.log(`   • Total documents: ${stats.numberOfDocuments}`);
    console.log(`   • Index size: ${(stats.indexSize / 1024).toFixed(2)} KB`);
    console.log(`   • Processing: ${stats.isIndexing ? 'Yes' : 'No'}`);

    console.log('\n✅ Sync completed successfully!');
    console.log('\nYou can now search your images in the gallery.');
  } catch (error) {
    console.error('\n❌ Sync failed:', error.message);
    
    if (error.message.includes('project_id')) {
      console.error('\n💡 Make sure your Sanity credentials are correct in .env.local');
    } else if (error.message.includes('MeiliSearchCommunicationError')) {
      console.error('\n💡 Make sure Meilisearch is running on', process.env.NEXT_PUBLIC_MEILISEARCH_HOST);
      console.error('   Start it with: docker-compose up -d');
    }
    
    process.exit(1);
  }
}

// Run the sync
syncToMeilisearch();

