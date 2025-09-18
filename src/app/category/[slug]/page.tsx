import { notFound } from 'next/navigation';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { specCategories } from '@/lib/categories';
import { PhoneCard } from '@/components/phone-card';
import { ComparisonBar } from '@/components/comparison-bar';
import { useCompare } from '@/contexts/compare-context';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const getPhonesForCategory = (slug: string): Phone[] => {
  switch (slug) {
    case 'best-camera-phones':
      return [...allPhones].sort((a,b) => parseInt(b.specs.main_camera.main_sensor_resolution) - parseInt(a.specs.main_camera.main_sensor_resolution)).slice(0, 10);
    case 'best-battery-phones':
      return [...allPhones].sort((a,b) => parseInt(b.specs.battery.capacity_mah) - parseInt(a.specs.battery.capacity_mah)).slice(0, 10);
    case 'best-gaming-phones':
       return allPhones.filter(p => p.specs.platform.chipset.includes('Snapdragon 8 Gen 3') || p.specs.platform.chipset.includes('Apple A17 Pro') || p.specs.platform.chipset.includes('Snapdragon 8 Gen 2')).slice(0, 10);
    case 'flagship-phones':
        return allPhones.filter(p => p.price > 900).slice(0, 10);
    case '5g-phones':
        return allPhones.filter(p => p.specs.network.network_technology.includes('5G')).slice(0, 10);
    default:
      return [];
  }
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const category = specCategories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }
  
  const phones = getPhonesForCategory(slug);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {category.title}
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          {category.description}
        </p>
      </div>
      
      {phones.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {phones.map(phone => (
                <PhoneCard key={phone.id} phone={phone} onAddToCompare={() => {
                  // This is a server component, so interactivity needs client-side logic.
                  // For now, onAddToCompare is a no-op here.
                  // To make this interactive, we'd need a client component wrapper.
                }} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-muted-foreground">No phones found for this category yet.</p>
        </div>
      )}
    </div>
  );
}
