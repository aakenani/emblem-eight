import { getTranslations } from 'next-intl/server';
import { client, queries } from '@/lib/sanity';
import GalleryView from '@/components/gallery/GalleryView';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Gallery' });
  
  return {
    title: t('title'),
  };
}

async function getImages() {
  try {
    const images = await client.fetch(queries.getAllImages(0, 100));
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

export default async function GalleryPage({ params: { locale } }: { params: { locale: string } }) {
  const images = await getImages();

  return (
    <div className="min-h-screen bg-background">
      <GalleryView images={images} locale={locale} />
    </div>
  );
}

