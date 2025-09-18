
'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Eye, EyeOff, Save, GripVertical } from "lucide-react";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

// Type definition for a homepage section
type HomepageSection = {
  id: string;
  title: string;
  description: string;
  isVisible: boolean;
};

// Initial configuration for each content section card
const initialSections: HomepageSection[] = [
    { id: 'trendingPhones', title: 'Trending Phones', description: 'A list of 6 trending phones currently popular in the market.', isVisible: true },
    { id: 'latestPhones', title: 'Latest Launches', description: 'A list of the 6 most recently launched phones.', isVisible: true },
    { id: 'flagshipPhones', title: 'Flagship Phones', description: 'A list of 6 flagship-tier phones.', isVisible: true },
    { id: 'performancePhones', title: 'Best for Gaming', description: 'A list of 6 phones best for gaming and performance.', isVisible: true },
    { id: 'batteryPhones', title: 'Longest Battery Life', description: 'A list of 6 phones with the best battery life.', isVisible: true },
    { id: 'cameraPhones', title: 'Top Camera Phones', description: 'A list of 6 phones with the best camera systems.', isVisible: true },
    { id: 'foldablePhones', title: 'Foldable Phones', description: 'A list of 6 popular foldable phones.', isVisible: true },
    { id: 'ruggedPhones', title: 'Rugged & Durable Phones', description: 'A list of 6 rugged and durable phones.', isVisible: true },
    { id: 'uniquePhones', title: 'Unique & Niche Phones', description: 'A list of 6 unique or niche-market phones.', isVisible: true },
    { id: 'iosPhones', title: 'Top iOS Phones', description: 'A list of the top 6 iOS phones available.', isVisible: true },
    { id: 'androidPhones', title: 'Top Android Phones', description: 'A list of the top 6 Android phones available.', isVisible: true },
    { id: 'upcomingEvents', title: 'Upcoming Calendar', description: 'A list of upcoming mobile phone launch events.', isVisible: true },
    { id: 'guides', title: 'Guides', description: 'A list of interesting guides or deep-dive topics.', isVisible: true },
    { id: 'leaks', title: 'Leaks & Rumors', description: 'A list of recent and interesting leaks or rumors.', isVisible: true },
    { id: 'blogPosts', title: 'Blog Posts', description: 'A list of blog posts on various topics.', isVisible: true },
    { id: 'news', title: 'News Articles', description: 'A list of recent news articles.', isVisible: true },
];


export default function HomepageContentPage() {
  const [sections, setSections] = useState<HomepageSection[]>(initialSections);
  const { toast } = useToast();

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;

    const newSections = [...sections];
    const sectionToMove = newSections[index];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    newSections[index] = newSections[swapIndex];
    newSections[swapIndex] = sectionToMove;
    
    setSections(newSections);
  };
  
  const toggleVisibility = (id: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, isVisible: !section.isVisible } : section
    ));
  };

  const handleSaveLayout = () => {
    // In a real application, this would save the `sections` array to a database.
    // The homepage would then fetch this configuration to render sections in the correct order.
    console.log("Saving new homepage layout:", sections);
    toast({
      title: 'Layout Saved!',
      description: 'The new homepage section order has been saved.',
    });
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Homepage Layout Manager</h1>
            <p className="text-muted-foreground">
            Drag and drop to reorder sections, and toggle their visibility on the homepage.
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
            This is a layout manager simulation. Saving will log the new order to the console. The live homepage currently uses a static layout.
          </AlertDescription>
        </Alert>

      <div className="space-y-4">
        {sections.map((section, index) => (
            <Card key={section.id} className="flex items-center p-4">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                <div className="flex-grow ml-4">
                    <CardTitle className="text-base">{section.title}</CardTitle>
                    <CardDescription className="text-xs">{section.description}</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                     <div className="flex items-center space-x-2">
                        <Switch 
                            id={`visibility-${section.id}`} 
                            checked={section.isVisible}
                            onCheckedChange={() => toggleVisibility(section.id)}
                        />
                        <Label htmlFor={`visibility-${section.id}`} className="flex items-center gap-2 text-xs">
                           {section.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                           {section.isVisible ? 'Visible' : 'Hidden'}
                        </Label>
                    </div>
                    <div className="flex flex-col">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveSection(index, 'up')} disabled={index === 0}>
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                         <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1}>
                            <ArrowDown className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
}
