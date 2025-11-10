import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockPhones } from '@/lib/mock-data';

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#FFD700] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Best Deals</h1>
          <p className="text-gray-800">Find the best prices on top smartphones</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPhones.map(phone => (
            <Card key={phone.id} className="p-6">
              <div className="aspect-square bg-gray-200 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-400">Image</span>
              </div>
              <h3 className="font-bold text-lg mb-1">{phone.brand} {phone.model}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-green-600">${phone.price}</span>
                <span className="text-sm text-gray-500 line-through">${phone.price + 100}</span>
              </div>
              <Button className="w-full bg-[#4169E1] hover:bg-[#4169E1]/90">
                View Deal
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
