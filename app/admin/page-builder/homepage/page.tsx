'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { GripVertical, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  type: string;
  visible: boolean;
  order: number;
}

export default function HomepageBuilderPage() {
  const [sections, setSections] = useState<Section[]>([
    { id: '1', title: 'Hero Section', type: 'hero', visible: true, order: 1 },
    { id: '2', title: 'Search Bar', type: 'search', visible: true, order: 2 },
    { id: '3', title: 'Trending Phones', type: 'trending', visible: true, order: 3 },
    { id: '4', title: 'Latest Launches', type: 'latest', visible: true, order: 4 },
    { id: '5', title: 'Featured Phones', type: 'featured', visible: true, order: 5 },
    { id: '6', title: 'Latest News', type: 'news', visible: true, order: 6 },
    { id: '7', title: 'Quick Compare', type: 'compare', visible: true, order: 7 },
  ]);

  const toggleVisibility = (id: string) => {
    setSections(sections.map(s =>
      s.id === id ? { ...s, visible: !s.visible } : s
    ));
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    setSections(newSections.map((s, i) => ({ ...s, order: i + 1 })));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1E3A8A] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">Homepage Page Builder</h1>
          <p className="text-white/80">Customize your homepage layout</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sections</h2>
              <Button className="bg-[#4169E1] hover:bg-[#4169E1]/90">
                Save Changes
              </Button>
            </div>

            <Card className="divide-y">
              {sections.map((section, index) => (
                <div key={section.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold">{section.title}</h3>
                      <p className="text-sm text-gray-500">{section.type}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch
                        checked={section.visible}
                        onCheckedChange={() => toggleVisibility(section.id)}
                      />
                      {section.visible ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveSection(section.id, 'up')}
                        disabled={index === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveSection(section.id, 'down')}
                        disabled={index === sections.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Live Preview</h2>
            <Card className="p-4 bg-gray-100">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="space-y-2">
                  {sections.filter(s => s.visible).map(section => (
                    <div
                      key={section.id}
                      className={`p-4 text-center font-medium ${
                        section.type === 'hero' || section.type === 'trending' || section.type === 'featured' || section.type === 'compare'
                          ? 'bg-[#FFD700]'
                          : 'bg-[#4169E1] text-white'
                      }`}
                    >
                      {section.title}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
