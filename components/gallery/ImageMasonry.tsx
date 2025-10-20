'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArchiveImage, urlFor } from '@/lib/sanity';
import { Card } from '@/components/ui/card';

interface ImageMasonryProps {
  images: ArchiveImage[];
  locale: string;
}

export default function ImageMasonry({ images, locale }: ImageMasonryProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {images.map((image) => {
        const imageUrl = image.r2Url || urlFor(image.image).width(800).url();
        const title = locale === 'ar' && image.title?.ar ? image.title.ar : image.title?.en;

        return (
          <Link
            key={image._id}
            href={`/${locale}/gallery/${image.slug.current}`}
            className="block break-inside-avoid mb-4 group"
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full overflow-hidden bg-muted">
                <Image
                  src={imageUrl}
                  alt={title || 'Archive image'}
                  width={800}
                  height={600}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-2">{title}</h3>
                {image.tags && image.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {image.tags.slice(0, 2).map((tag, idx) => (
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

