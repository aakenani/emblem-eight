'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArchiveImage, urlFor } from '@/lib/sanity';
import { Card } from '@/components/ui/card';

interface ImageGridProps {
  images: ArchiveImage[];
  locale: string;
}

export default function ImageGrid({ images, locale }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => {
        const imageUrl = image.r2Url || urlFor(image.image).width(500).height(500).url();
        const title = locale === 'ar' && image.title?.ar ? image.title.ar : image.title?.en;

        return (
          <Link
            key={image._id}
            href={`/${locale}/gallery/${image.slug.current}`}
            className="group"
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={imageUrl}
                  alt={title || 'Archive image'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold truncate">{title}</h3>
                {image.tags && image.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {image.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

