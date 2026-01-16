import { redirect } from 'next/navigation';
import { allPhones } from '@/lib/data';

interface PhoneIdPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PhoneIdPage({ params }: PhoneIdPageProps) {
  const { id } = await params;
  const phoneId = parseInt(id, 10);
  const phone = allPhones.find((p) => p.id === phoneId);

  if (!phone) {
    redirect('/');
  }

  const brandSlug = phone.brand.toLowerCase();
  const modelSlug = phone.model.toLowerCase().replace(/ /g, '-');
  redirect(`/${brandSlug}/${modelSlug}`);
}
    
