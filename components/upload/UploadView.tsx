'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, UploadCloudIcon, XIcon, CheckCircleIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';

interface UploadViewProps {
  locale: string;
}

interface UploadedFile {
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
}

export default function UploadView({ locale }: UploadViewProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const t = useTranslations('Upload');
  const tCommon = useTranslations('Common');
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
      progress: 0,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Update status to uploading
        setFiles(prev => {
          const updated = [...prev];
          updated[i] = { ...updated[i], status: 'uploading' };
          return updated;
        });

        // Create form data
        const formData = new FormData();
        formData.append('file', file.file);
        formData.append('locale', locale);

        try {
          // Upload to your API
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            // Simulate progress
            for (let progress = 0; progress <= 100; progress += 10) {
              await new Promise(resolve => setTimeout(resolve, 100));
              setFiles(prev => {
                const updated = [...prev];
                updated[i] = { ...updated[i], progress };
                return updated;
              });
            }

            setFiles(prev => {
              const updated = [...prev];
              updated[i] = { ...updated[i], status: 'success', progress: 100 };
              return updated;
            });
          } else {
            throw new Error('Upload failed');
          }
        } catch (error) {
          setFiles(prev => {
            const updated = [...prev];
            updated[i] = { ...updated[i], status: 'error' };
            return updated;
          });
        }
      }

      toast({
        title: t('success'),
        description: `${files.length} ${locale === 'ar' ? 'صور تم رفعها' : 'images uploaded'}`,
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: 'Failed to upload images',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
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

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground mb-8">{t('supportedFormats')}</p>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
                transition-colors duration-200
                ${isDragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
                }
              `}
            >
              <input {...getInputProps()} />
              <UploadCloudIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg mb-2">{t('dropzone')}</p>
              <p className="text-sm text-muted-foreground">{t('supportedFormats')}</p>
            </div>
          </CardContent>
        </Card>

        {files.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {locale === 'ar' 
                    ? `الصور المحددة (${files.length})`
                    : `Selected Images (${files.length})`
                  }
                </CardTitle>
                <Button
                  onClick={uploadFiles}
                  disabled={isUploading || files.every(f => f.status === 'success')}
                >
                  {isUploading ? t('uploading') : t('bulkUpload')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted relative">
                      <Image
                        src={file.preview}
                        alt={file.file.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      />
                      
                      {/* Status Overlay */}
                      {file.status === 'uploading' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-2xl font-bold">{file.progress}%</div>
                            <div className="text-xs">{t('uploading')}</div>
                          </div>
                        </div>
                      )}
                      
                      {file.status === 'success' && (
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                          <CheckCircleIcon className="w-12 h-12 text-green-500" />
                        </div>
                      )}
                      
                      {file.status === 'error' && (
                        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                          <XIcon className="w-12 h-12 text-red-500" />
                        </div>
                      )}

                      {/* Remove Button */}
                      {file.status === 'pending' && (
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs mt-1 truncate">{file.file.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

