'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArchiveImage, urlFor } from '@/lib/sanity';
import { Card } from '@/components/ui/card';

interface ImageListProps {
  images: ArchiveImage[];
  locale: string;
}

export default function ImageList({ images, locale }: ImageListProps) {
  return (
    <div className="space-y-4">
      {images.map((image) => {
        const imageUrl = image.r2Url || urlFor(image.image).width(400).height(300).url();
        const title = locale === 'ar' && image.title?.ar ? image.title.ar : image.title?.en;
        const description = locale === 'ar' && image.description?.ar 
          ? image.description.ar 
          : image.description?.en;

        return (
          <Link
            key={image._id}
            href={`/${locale}/gallery/${image.slug.current}`}
            className="block group"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-64 h-48 overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={title || 'Archive image'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 256px"
                  />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  {description && (
                    <p className="text-muted-foreground line-clamp-2 mb-3">
                      {description}
                    </p>
                  )}
                  {image.tags && image.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {image.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {image.metadata?.date && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {new Date(image.metadata.date).toLocaleDateString(
                        locale === 'ar' ? 'ar-SA' : 'en-US'
                      )}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

