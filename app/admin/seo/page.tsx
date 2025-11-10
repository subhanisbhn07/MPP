'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SEOManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1E3A8A] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">SEO Management</h1>
          <p className="text-white/80">Manage SEO metadata for all pages</p>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="homepage">
          <TabsList>
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="search">Search Page</TabsTrigger>
            <TabsTrigger value="phone">Phone Details</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

          <TabsContent value="homepage" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Homepage SEO</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Page Title</label>
                  <Input
                    defaultValue="MobilePhonesPro - Discover. Compare. Decide."
                    placeholder="Page title"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <textarea
                    className="w-full min-h-24 px-3 py-2 border rounded-md"
                    defaultValue="Your ultimate destination for mobile phone comparisons, reviews, and the latest news."
                    placeholder="Meta description"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Keywords</label>
                  <Input
                    defaultValue="mobile phones, smartphone comparison, phone reviews"
                    placeholder="Comma-separated keywords"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">OG Image URL</label>
                  <Input
                    placeholder="https://example.com/og-image.jpg"
                  />
                </div>

                <Button className="bg-[#4169E1] hover:bg-[#4169E1]/90">
                  Save SEO Settings
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Search Page SEO</h2>
              <p className="text-gray-500">Configure SEO settings for the search page...</p>
            </Card>
          </TabsContent>

          <TabsContent value="phone" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Phone Details Template</h2>
              <p className="text-gray-500">Configure SEO template for phone detail pages...</p>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">News Page SEO</h2>
              <p className="text-gray-500">Configure SEO settings for news pages...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
