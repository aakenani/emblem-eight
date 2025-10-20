import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ImageIcon, UploadIcon, SearchIcon, LayoutGridIcon } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Gallery' });
  
  return {
    title: t('title'),
  };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <ImageIcon className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Emblem Eight
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {locale === 'ar' 
              ? 'أرشيف صور ثنائي اللغة سريع البرق مع ذكاء اصطناعي ومعاينات متعددة'
              : 'A lightning-fast bilingual image archive with AI insights and multi-view galleries'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <FeatureCard
            icon={<UploadIcon className="w-8 h-8" />}
            title={locale === 'ar' ? 'رفع سريع' : 'Fast Upload'}
            description={locale === 'ar' 
              ? 'رفع جماعي للصور مع معالجة فورية'
              : 'Bulk image upload with instant processing'
            }
          />
          <FeatureCard
            icon={<LayoutGridIcon className="w-8 h-8" />}
            title={locale === 'ar' ? 'عرض متعدد' : 'Multi-View'}
            description={locale === 'ar'
              ? 'شبكة، قائمة، وعرض بناء للمعرض'
              : 'Grid, list, and masonry gallery views'
            }
          />
          <FeatureCard
            icon={<SearchIcon className="w-8 h-8" />}
            title={locale === 'ar' ? 'بحث قوي' : 'Powerful Search'}
            description={locale === 'ar'
              ? 'بحث سريع كالبرق مع Meilisearch'
              : 'Lightning-fast search with Meilisearch'
            }
          />
        </div>

        <div className="flex justify-center gap-4">
          <Link href={`/${locale}/gallery`}>
            <Button size="lg" className="text-lg px-8">
              {locale === 'ar' ? 'استكشف المعرض' : 'Explore Gallery'}
            </Button>
          </Link>
          <Link href={`/${locale}/upload`}>
            <Button size="lg" variant="outline" className="text-lg px-8">
              {locale === 'ar' ? 'رفع الصور' : 'Upload Images'}
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Link 
            href={locale === 'ar' ? '/en' : '/ar'} 
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            {locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          </Link>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

