import { Card } from '@/components/ui/card';

export default function GuidesPage() {
  const guides = [
    {
      id: 1,
      title: 'How to Choose the Perfect Smartphone',
      description: 'A comprehensive guide to selecting the right phone for your needs',
      category: 'Buying Guide'
    },
    {
      id: 2,
      title: 'Understanding Camera Specifications',
      description: 'Learn what megapixels, aperture, and sensor size really mean',
      category: 'Technical'
    },
    {
      id: 3,
      title: 'Battery Life Tips and Tricks',
      description: 'Maximize your smartphone battery performance',
      category: 'Tips & Tricks'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#4169E1] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">Guides</h1>
          <p className="text-white/80">Expert guides to help you make informed decisions</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map(guide => (
            <Card key={guide.id} className="p-6">
              <div className="text-sm text-blue-600 font-medium mb-2">
                {guide.category}
              </div>
              <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
              <p className="text-gray-600">{guide.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
