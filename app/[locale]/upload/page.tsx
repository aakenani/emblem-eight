import { getTranslations } from 'next-intl/server';
import UploadView from '@/components/upload/UploadView';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Upload' });
  
  return {
    title: t('title'),
  };
}

export default function UploadPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <UploadView locale={locale} />
    </div>
  );
}

