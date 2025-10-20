import { MeiliSearch } from 'meilisearch';

// Initialize Meilisearch client
export const searchClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST!,
  apiKey: process.env.MEILISEARCH_ADMIN_KEY,
});

// Initialize the images index
export async function initializeSearchIndex() {
  try {
    const index = searchClient.index('images');
    
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

    // Configure filterable attributes
    await index.updateFilterableAttributes([
      'featured',
      'tags',
      'metadata.date',
    ]);

    // Configure sortable attributes
    await index.updateSortableAttributes([
      '_createdAt',
      '_updatedAt',
      'order',
    ]);

    console.log('Meilisearch index initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Meilisearch index:', error);
  }
}

// Sync a document to Meilisearch
export async function syncToMeilisearch(document: any) {
  try {
    const index = searchClient.index('images');
    await index.addDocuments([document], { primaryKey: '_id' });
  } catch (error) {
    console.error('Failed to sync to Meilisearch:', error);
  }
}

// Batch sync documents to Meilisearch
export async function batchSyncToMeilisearch(documents: any[]) {
  try {
    const index = searchClient.index('images');
    await index.addDocuments(documents, { primaryKey: '_id' });
    console.log(`Synced ${documents.length} documents to Meilisearch`);
  } catch (error) {
    console.error('Failed to batch sync to Meilisearch:', error);
  }
}

// Delete a document from Meilisearch
export async function deleteFromMeilisearch(documentId: string) {
  try {
    const index = searchClient.index('images');
    await index.deleteDocument(documentId);
  } catch (error) {
    console.error('Failed to delete from Meilisearch:', error);
  }
}

