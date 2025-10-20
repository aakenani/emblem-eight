import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { client, queries } from '@/lib/sanity';
import ImageDetailView from '@/components/gallery/ImageDetailView';

async function getImage(slug: string) {
  try {
    const image = await client.fetch(queries.getImageBySlug(slug));
    return image;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

export async function generateMetadata({ 
  params: { locale, slug } 
}: { 
  params: { locale: string; slug: string } 
}) {
  const image = await getImage(slug);
  
  if (!image) {
    return { title: 'Image Not Found' };
  }

  const title = locale === 'ar' && image.title?.ar ? image.title.ar : image.title?.en;
  
  return {
    title: title || 'Archive Image',
  };
}

export default async function ImageDetailPage({ 
  params: { locale, slug } 
}: { 
  params: { locale: string; slug: string } 
}) {
  const image = await getImage(slug);

  if (!image) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ImageDetailView image={image} locale={locale} />
    </div>
  );
}

