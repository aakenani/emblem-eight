'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGridIcon, ListIcon, ColumnsIcon, UploadIcon, SearchIcon } from 'lucide-react';

interface GalleryHeaderProps {
  viewMode: 'grid' | 'list' | 'masonry';
  setViewMode: (mode: 'grid' | 'list' | 'masonry') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalImages: number;
  locale: string;
}

export default function GalleryHeader({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  totalImages,
  locale,
}: GalleryHeaderProps) {
  const t = useTranslations('Gallery');
  const tSearch = useTranslations('Search');
  const tNav = useTranslations('Navigation');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t('title')}</h1>
          <p className="text-muted-foreground">
            {t('totalImages')}: {totalImages}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Link href={`/${locale}`}>
            <Button variant="outline">
              {tNav('home')}
            </Button>
          </Link>
          <Link href={`/${locale}/upload`}>
            <Button className="gap-2">
              <UploadIcon className="w-4 h-4" />
              {tNav('upload')}
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={tSearch('placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
          <TabsList>
            <TabsTrigger value="grid" className="gap-2">
              <LayoutGridIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{t('grid')}</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <ListIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{t('list')}</span>
            </TabsTrigger>
            <TabsTrigger value="masonry" className="gap-2">
              <ColumnsIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{t('masonry')}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

