'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GripVertical, Edit, Trash2, Plus } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  order: number;
}

export default function MenuManagementPage() {
  const [headerMenu] = useState<MenuItem[]>([
    { id: '1', label: 'Search', href: '/search', order: 1 },
    { id: '2', label: 'Compare', href: '/compare', order: 2 },
    { id: '3', label: 'Brands', href: '/brands', order: 3 },
    { id: '4', label: 'News', href: '/news', order: 4 },
    { id: '5', label: 'Guides', href: '/guides', order: 5 },
    { id: '6', label: 'Deals', href: '/deals', order: 6 },
  ]);

  const [footerMenu] = useState<MenuItem[]>([
    { id: '7', label: 'Search Phones', href: '/search', order: 1 },
    { id: '8', label: 'Compare Phones', href: '/compare', order: 2 },
    { id: '9', label: 'All Brands', href: '/brands', order: 3 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1E3A8A] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">Menu Management</h1>
          <p className="text-white/80">Manage site navigation</p>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="header">
          <TabsList>
            <TabsTrigger value="header">Header Menu</TabsTrigger>
            <TabsTrigger value="footer">Footer Menu</TabsTrigger>
          </TabsList>

          <TabsContent value="header" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Header Navigation</h2>
              <Button className="bg-[#4169E1] hover:bg-[#4169E1]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </div>

            <Card className="divide-y">
              {headerMenu.map(item => (
                <div key={item.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.label}</h3>
                      <p className="text-sm text-gray-500">{item.href}</p>
                    </div>

                    <div className="flex gap-2">
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
            </Card>
          </TabsContent>

          <TabsContent value="footer" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Footer Navigation</h2>
              <Button className="bg-[#4169E1] hover:bg-[#4169E1]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </div>

            <Card className="divide-y">
              {footerMenu.map(item => (
                <div key={item.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.label}</h3>
                      <p className="text-sm text-gray-500">{item.href}</p>
                    </div>

                    <div className="flex gap-2">
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
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
