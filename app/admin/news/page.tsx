'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockNews } from '@/lib/mock-data';
import { Sparkles, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminNewsPage() {
  const [generating, setGenerating] = useState(false);

  const handleGenerateNews = async () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1E3A8A] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">News Management</h1>
          <p className="text-white/80">Create and manage news articles</p>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="published">
          <TabsList>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="generate">AI Generate</TabsTrigger>
          </TabsList>

          <TabsContent value="published" className="mt-6">
            <div className="mb-6">
              <Button className="bg-[#4169E1] hover:bg-[#4169E1]/90">
                Create New Article
              </Button>
            </div>

            <Card>
              <div className="divide-y">
                {mockNews.map(article => (
                  <div key={article.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{article.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{article.category}</p>
                        <p className="text-gray-600">{article.excerpt}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          Published: {new Date(article.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="drafts" className="mt-6">
            <Card className="p-12 text-center">
              <p className="text-gray-500">No draft articles</p>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">AI News Generator</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Topic</label>
                  <Input placeholder="e.g., Latest smartphone releases" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input placeholder="e.g., News, Reviews, Rumors" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Articles</label>
                  <Input type="number" placeholder="5" defaultValue="5" />
                </div>
              </div>

              <Button
                onClick={handleGenerateNews}
                disabled={generating}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {generating ? 'Generating...' : 'Generate News Articles'}
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
