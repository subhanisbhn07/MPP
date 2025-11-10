import Link from 'next/link';
import { Card } from '@/components/ui/card';

const brands = [
  'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Oppo', 'Vivo', 
  'Realme', 'Motorola', 'Nokia', 'Sony', 'Asus', 'Huawei', 'Honor',
  'Nothing', 'Infinix', 'Tecno', 'Itel'
];

export default function BrandsPage() {
  const groupedBrands = brands.reduce((acc, brand) => {
    const firstLetter = brand[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#4169E1] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">All Brands</h1>
          <p className="text-white/80">Browse phones by manufacturer</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="space-y-8">
          {Object.entries(groupedBrands).sort().map(([letter, brandList]) => (
            <div key={letter}>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{letter}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {brandList.map(brand => (
                  <Link key={brand} href={`/search?brand=${brand}`}>
                    <Card className="p-6 hover:border-blue-500 transition-colors cursor-pointer">
                      <h3 className="font-semibold text-lg">{brand}</h3>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
