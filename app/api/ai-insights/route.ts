import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { generateAIInsights } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { imageId, locale } = await request.json();

    if (!imageId) {
      return NextResponse.json(
        { error: 'No image ID provided' },
        { status: 400 }
      );
    }

    // Fetch the image document
    const image = await client.getDocument(imageId);

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Generate AI insights
    const insights = await generateAIInsights(image, locale);

    // Update the document with AI insights
    await client
      .patch(imageId)
      .set({
        aiInsights: {
          [locale]: insights,
          generatedAt: new Date().toISOString(),
        },
      })
      .commit();

    return NextResponse.json({
      success: true,
      insights,
    });
  } catch (error) {
    console.error('AI insights error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI insights' },
      { status: 500 }
    );
  }
}

