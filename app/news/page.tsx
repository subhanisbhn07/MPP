import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockNews } from '@/lib/mock-data';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#4169E1] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">Latest News</h1>
          <p className="text-white/80">Stay updated with the latest mobile phone news</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNews.map(article => (
            <Card key={article.id} className="overflow-hidden">
              <div className="aspect-video relative bg-gray-200">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  News Image
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-medium mb-2">
                  {article.category}
                </div>
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  <Link href={`/news/${article.slug}`}>
                    <Button variant="outline" size="sm">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
