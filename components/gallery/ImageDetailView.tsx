'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArchiveImage, urlFor } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeftIcon, DownloadIcon, EditIcon, SaveIcon, XIcon, SparklesIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ImageDetailViewProps {
  image: ArchiveImage;
  locale: string;
}

export default function ImageDetailView({ image, locale }: ImageDetailViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const t = useTranslations('ImageDetail');
  const tCommon = useTranslations('Common');
  const { toast } = useToast();

  const imageUrl = image.r2Url || urlFor(image.image).width(1200).url();
  const title = locale === 'ar' && image.title?.ar ? image.title.ar : image.title?.en;
  const description = locale === 'ar' && image.description?.ar 
    ? image.description.ar 
    : image.description?.en;
  const aiInsight = locale === 'ar' && image.aiInsights?.ar 
    ? image.aiInsights.ar 
    : image.aiInsights?.en;

  const [editData, setEditData] = useState({
    title: title || '',
    description: description || '',
    tags: image.tags?.join(', ') || '',
    author: image.metadata?.author || '',
    source: image.metadata?.source || '',
    location: image.metadata?.location || '',
  });

  const handleSave = async () => {
    try {
      // Here you would call your API to update the image
      // For now, just show a success toast
      toast({
        title: tCommon('success'),
        description: 'Changes saved successfully',
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: tCommon('error'),
        description: 'Failed to save changes',
        variant: 'destructive',
      });
    }
  };

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      // Here you would call your API to generate AI insights
      const response = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId: image._id, locale }),
      });

      if (response.ok) {
        toast({
          title: tCommon('success'),
          description: 'AI insights generated successfully',
        });
        // Refresh the page to show new insights
        window.location.reload();
      } else {
        throw new Error('Failed to generate insights');
      }
    } catch (error) {
      toast({
        title: tCommon('error'),
        description: 'Failed to generate AI insights',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/${locale}/gallery`}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeftIcon className="w-4 h-4" />
            {locale === 'ar' ? 'العودة إلى المعرض' : 'Back to Gallery'}
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative aspect-square w-full bg-muted">
              <Image
                src={imageUrl}
                alt={title || 'Archive image'}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2">
              <DownloadIcon className="w-4 h-4" />
              {t('download')}
            </Button>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="flex-1 gap-2">
                <EditIcon className="w-4 h-4" />
                {t('edit')}
              </Button>
            )}
          </div>
        </div>

        {/* Metadata Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('metadata')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {locale === 'ar' ? 'العنوان' : 'Title'}
                    </label>
                    <Input
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t('description')}
                    </label>
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t('tags')}
                    </label>
                    <Input
                      value={editData.tags}
                      onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t('author')}
                    </label>
                    <Input
                      value={editData.author}
                      onChange={(e) => setEditData({ ...editData, author: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t('source')}
                    </label>
                    <Input
                      value={editData.source}
                      onChange={(e) => setEditData({ ...editData, source: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t('location')}
                    </label>
                    <Input
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="flex-1 gap-2">
                      <SaveIcon className="w-4 h-4" />
                      {t('save')}
                    </Button>
                    <Button 
                      onClick={() => setIsEditing(false)} 
                      variant="outline" 
                      className="flex-1 gap-2"
                    >
                      <XIcon className="w-4 h-4" />
                      {t('cancel')}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    {description && (
                      <p className="text-muted-foreground">{description}</p>
                    )}
                  </div>

                  {image.tags && image.tags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">{t('tags')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {image.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {image.metadata && (
                    <div className="space-y-2 text-sm">
                      {image.metadata.author && (
                        <div>
                          <span className="font-medium">{t('author')}: </span>
                          <span className="text-muted-foreground">{image.metadata.author}</span>
                        </div>
                      )}
                      {image.metadata.source && (
                        <div>
                          <span className="font-medium">{t('source')}: </span>
                          <span className="text-muted-foreground">{image.metadata.source}</span>
                        </div>
                      )}
                      {image.metadata.location && (
                        <div>
                          <span className="font-medium">{t('location')}: </span>
                          <span className="text-muted-foreground">{image.metadata.location}</span>
                        </div>
                      )}
                      {image.metadata.date && (
                        <div>
                          <span className="font-medium">{t('date')}: </span>
                          <span className="text-muted-foreground">
                            {new Date(image.metadata.date).toLocaleDateString(
                              locale === 'ar' ? 'ar-SA' : 'en-US'
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* AI Insights Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5 text-primary" />
                  {t('aiInsights')}
                </CardTitle>
                {!aiInsight && (
                  <Button
                    size="sm"
                    onClick={handleGenerateAI}
                    disabled={isGeneratingAI}
                  >
                    {isGeneratingAI ? tCommon('loading') : t('generateInsights')}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {aiInsight ? (
                <p className="text-muted-foreground">{aiInsight}</p>
              ) : (
                <p className="text-muted-foreground italic">
                  {locale === 'ar' 
                    ? 'لم يتم إنشاء رؤى بعد. انقر لإنشاء رؤى الذكاء الاصطناعي.'
                    : 'No insights generated yet. Click to generate AI insights.'
                  }
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

