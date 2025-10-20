const { MeiliSearch } = require('meilisearch');

async function initMeilisearch() {
  const client = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST || 'http://localhost:7700',
    apiKey: process.env.MEILISEARCH_ADMIN_KEY,
  });

  try {
    // Create the images index
    await client.createIndex('images', { primaryKey: '_id' });
    console.log('✓ Created images index');

    const index = client.index('images');

    // Configure searchable attributes
    await index.updateSearchableAttributes([
      'title.en',
      'title.ar',
      'description.en',
      'description.ar',
      'tags',
      'metadata.author',
      'metadata.source',
    ]);
    console.log('✓ Configured searchable attributes');

    // Configure filterable attributes
    await index.updateFilterableAttributes([
      'featured',
      'tags',
      'metadata.date',
      '_createdAt',
    ]);
    console.log('✓ Configured filterable attributes');

    // Configure sortable attributes
    await index.updateSortableAttributes([
      '_createdAt',
      '_updatedAt',
      'order',
    ]);
    console.log('✓ Configured sortable attributes');

    // Configure ranking rules
    await index.updateRankingRules([
      'words',
      'typo',
      'proximity',
      'attribute',
      'sort',
      'exactness',
    ]);
    console.log('✓ Configured ranking rules');

    console.log('\n✅ Meilisearch initialized successfully!');
  } catch (error) {
    if (error.code === 'index_already_exists') {
      console.log('ℹ️  Index already exists, updating settings...');
      const index = client.index('images');
      
      await index.updateSearchableAttributes([
        'title.en',
        'title.ar',
        'description.en',
        'description.ar',
        'tags',
        'metadata.author',
        'metadata.source',
      ]);
      
      await index.updateFilterableAttributes([
        'featured',
        'tags',
        'metadata.date',
        '_createdAt',
      ]);
      
      await index.updateSortableAttributes([
        '_createdAt',
        '_updatedAt',
        'order',
      ]);
      
      console.log('✅ Updated existing index settings!');
    } else {
      console.error('❌ Error initializing Meilisearch:', error);
    }
  }
}

initMeilisearch();

