import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { uploadToR2 } from '@/lib/r2';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const locale = formData.get('locale') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudflare R2
    const r2Url = await uploadToR2(buffer, file.name, file.type);

    // Also upload to Sanity
    const sanityAsset = await client.assets.upload('image', buffer, {
      filename: file.name,
    });

    // Create Sanity document
    const doc = await client.create({
      _type: 'archiveImage',
      title: {
        en: file.name.replace(/\.[^/.]+$/, ''),
        ar: '',
      },
      slug: {
        _type: 'slug',
        current: file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/\s+/g, '-'),
      },
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: sanityAsset._id,
        },
      },
      r2Url: r2Url,
      featured: false,
      order: 0,
    });

    return NextResponse.json({
      success: true,
      document: doc,
      r2Url: r2Url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

