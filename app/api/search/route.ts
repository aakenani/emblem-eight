import { NextRequest, NextResponse } from 'next/server';
import { searchClient } from '@/lib/meilisearch';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const locale = searchParams.get('locale') || 'en';

    if (!query) {
      return NextResponse.json(
        { error: 'No query provided' },
        { status: 400 }
      );
    }

    // Search using Meilisearch
    const results = await searchClient.index('images').search(query, {
      limit: 50,
      attributesToHighlight: ['title', 'description', 'tags'],
      attributesToSearchOn: [
        `title.${locale}`,
        `description.${locale}`,
        'tags',
      ],
    });

    return NextResponse.json({
      hits: results.hits,
      estimatedTotalHits: results.estimatedTotalHits,
      processingTimeMs: results.processingTimeMs,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

