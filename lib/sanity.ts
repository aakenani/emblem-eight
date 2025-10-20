import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-15',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Type definitions for our Sanity documents
export interface ArchiveImage {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: {
    en: string;
    ar: string;
  };
  slug: {
    current: string;
  };
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  description?: {
    en?: string;
    ar?: string;
  };
  tags?: string[];
  metadata?: {
    date?: string;
    author?: string;
    source?: string;
    location?: string;
    copyright?: string;
  };
  aiInsights?: {
    en?: string;
    ar?: string;
    generatedAt?: string;
  };
  r2Url?: string;
  featured?: boolean;
  order?: number;
}

// GROQ queries
export const queries = {
  // Get all images with pagination
  getAllImages: (start = 0, end = 50) => `
    *[_type == "archiveImage"] | order(_createdAt desc) [${start}...${end}] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      image,
      description,
      tags,
      metadata,
      featured,
      order,
      r2Url
    }
  `,

  // Get single image by slug
  getImageBySlug: (slug: string) => `
    *[_type == "archiveImage" && slug.current == "${slug}"][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      image,
      description,
      tags,
      metadata,
      aiInsights,
      featured,
      order,
      r2Url
    }
  `,

  // Get featured images
  getFeaturedImages: () => `
    *[_type == "archiveImage" && featured == true] | order(order asc) {
      _id,
      _createdAt,
      title,
      slug,
      image,
      tags
    }
  `,

  // Search images
  searchImages: (query: string) => `
    *[_type == "archiveImage" && (
      title.en match "${query}*" ||
      title.ar match "${query}*" ||
      description.en match "${query}*" ||
      description.ar match "${query}*" ||
      "${query}" in tags
    )] {
      _id,
      _createdAt,
      title,
      slug,
      image,
      description,
      tags
    }
  `,

  // Get total count
  getTotalCount: () => `count(*[_type == "archiveImage"])`,
};

