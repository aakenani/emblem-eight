'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArchiveImage } from '@/lib/sanity';
import GalleryHeader from './GalleryHeader';
import ImageGrid from './ImageGrid';
import ImageList from './ImageList';
import ImageMasonry from './ImageMasonry';

type ViewMode = 'grid' | 'list' | 'masonry';

interface GalleryViewProps {
  images: ArchiveImage[];
  locale: string;
}

export default function GalleryView({ images, locale }: GalleryViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations('Gallery');

  // Filter images based on search query
  const filteredImages = images.filter((image) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const titleMatch = image.title?.en?.toLowerCase().includes(query) || 
                       image.title?.ar?.toLowerCase().includes(query);
    const descMatch = image.description?.en?.toLowerCase().includes(query) || 
                      image.description?.ar?.toLowerCase().includes(query);
    const tagMatch = image.tags?.some(tag => tag.toLowerCase().includes(query));
    
    return titleMatch || descMatch || tagMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <GalleryHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalImages={images.length}
        locale={locale}
      />

      <div className="mt-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground mb-4">
              {searchQuery ? t('noResults') : t('noImages')}
            </p>
            {!searchQuery && (
              <p className="text-muted-foreground">{t('uploadFirst')}</p>
            )}
          </div>
        ) : (
          <>
            {viewMode === 'grid' && <ImageGrid images={filteredImages} locale={locale} />}
            {viewMode === 'list' && <ImageList images={filteredImages} locale={locale} />}
            {viewMode === 'masonry' && <ImageMasonry images={filteredImages} locale={locale} />}
          </>
        )}
      </div>
    </div>
  );
}

