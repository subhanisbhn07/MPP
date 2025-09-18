
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Save, GripVertical, Settings, ChevronRight } from "lucide-react";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HomepageSectionEditor } from './components/section-editor';

// Type definition for a homepage section
export type HomepageSection = {
  id: string;
  title: string;
  description: string;
  isVisible: boolean;
  isPhoneSection: boolean;
  selectedPhoneIds: number[];
  maxSelect: number;
};

// Initial configuration for each content section card
const initialSections: HomepageSection[] = [
    { id: 'trendingPhones', title: 'Trending Phones', description: 'Popular phones currently on the market.', isVisible: true, isPhoneSection: true, selectedPhoneIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], maxSelect: 12 },
    { id: 'latestPhones', title: 'Latest Launches', description: 'The most recently launched phones.', isVisible: true, isPhoneSection: true, selectedPhoneIds: [10, 9, 8, 7, 5, 2, 13, 14, 15, 16, 17, 18], maxSelect: 12 },
    { id: 'flagshipPhones', title: 'Flagship Phones', description: 'A list of flagship-tier phones.', isVisible: true, isPhoneSection: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'performancePhones', title: 'Best for Gaming', description: 'Phones best for gaming and performance.', isVisible: true, isPhoneSection: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'batteryPhones', title: 'Longest Battery Life', description: 'Phones with the best battery life.', isVisible: true, isPhoneSection: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'cameraPhones', title: 'Top Camera Phones', description: 'Phones with the best camera systems.', isVisible: true, isPhoneSection: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'foldablePhones', title: 'Foldable Phones', description: 'Popular foldable phones.', isVisible: true, isPhoneSection: true, selectedPhoneIds: [4, 5, 6, 8, 19, 20], maxSelect: 12 },
    { id: 'ruggedPhones', title: 'Rugged & Durable', description: 'Rugged and durable phones.', isVisible: true, isPhoneSection: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'uniquePhones', title: 'Unique & Niche', description: 'Unique or niche-market phones.', isVisible: true, isPhoneSection: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'iosPhones', title: 'Top iOS Phones', description: 'The top iOS phones available.', isVisible: true, isPhoneSection: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'androidPhones', title: 'Top Android Phones', description: 'The top Android phones available.', isVisible: true, isPhoneSection: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'upcomingEvents', title: 'Upcoming Calendar', description: 'Upcoming mobile phone launch events.', isVisible: false, isPhoneSection: false, selectedPhoneIds: [], maxSelect: 0 },
    { id: 'guides', title: 'Guides', description: 'Interesting guides or deep-dive topics.', isVisible: false, isPhoneSection: false, selectedPhoneIds: [], maxSelect: 0 },
    { id: 'leaks', title: 'Leaks & Rumors', description: 'Recent and interesting leaks or rumors.', isVisible: false, isPhoneSection: false, selectedPhoneIds: [], maxSelect: 0 },
    { id: 'blogPosts', title: 'Blog Posts', description: 'Blog posts on various topics.', isVisible: false, isPhoneSection: false, selectedPhoneIds: [], maxSelect: 0 },
    { id: 'news', title: 'News Articles', description: 'Recent news articles.', isVisible: false, isPhoneSection: false, selectedPhoneIds: [], maxSelect: 0 },
];


export default function HomepageContentPage() {
  const [sections, setSections] = useState<HomepageSection[]>(initialSections);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(initialSections[0]?.id || null);
  const { toast } = useToast();

  const activeSection = sections.find(s => s.id === activeSectionId);

  const toggleVisibility = (id: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, isVisible: !section.isVisible } : section
    ));
  };

  const updateSectionContent = useCallback((sectionId: string, newPhoneIds: number[]) => {
    setSections(prevSections => 
        prevSections.map(section => 
            section.id === sectionId ? { ...section, selectedPhoneIds: newPhoneIds } : section
        )
    );
  }, []);
  
  const handleSaveLayout = () => {
    console.log("Saving new homepage layout and content:", sections);
    toast({
      title: 'Layout Saved!',
      description: 'The new homepage configuration has been saved.',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Homepage Content & Layout</h1>
            <p className="text-muted-foreground">
            Select a section to manage its content and settings.
            </p>
        </div>
        <Button onClick={handleSaveLayout}>
            <Save className="mr-2 h-4 w-4" />
            Save Layout
        </Button>
      </div>

       <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Simulation</AlertTitle>
          <AlertDescription>
            This is a layout and content manager simulation. Saving will log the new configuration to the console. The live homepage currently uses static data.
          </AlertDescription>
        </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Sections</CardTitle>
              <CardDescription>Click a section to edit its content. Drag to reorder.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {sections.map((section) => (
                    <Card 
                        key={section.id} 
                        className={cn(
                            "p-3 transition-colors cursor-pointer",
                            activeSectionId === section.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                        )}
                        onClick={() => setActiveSectionId(section.id)}
                    >
                        <div className="flex items-center">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-grow ml-3">
                                <p className="font-semibold text-sm">{section.title}</p>
                                <p className="text-xs text-muted-foreground">{section.description}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                    </Card>
                ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {activeSection ? (
            <HomepageSectionEditor 
                key={activeSection.id}
                section={activeSection}
                onUpdate={updateSectionContent}
                onToggleVisibility={() => toggleVisibility(activeSection.id)}
            />
          ) : (
            <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center">
                    <p className="text-muted-foreground">Select a section from the left to begin editing.</p>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
