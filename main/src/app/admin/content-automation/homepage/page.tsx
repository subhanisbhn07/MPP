

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Save, Eye, EyeOff, GripVertical } from "lucide-react";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { HomepageSectionEditor } from './components/section-editor';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PhoneCard } from '@/components/phone-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import HomePage from '@/app/page';


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
  const { toast } = useToast();

  const visibleSections = sections.filter(s => s.isVisible);

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
  
  const [draggedItem, setDraggedItem] = useState<HomepageSection | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: HomepageSection) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: HomepageSection) => {
    if (!draggedItem) return;

    const currentIndex = sections.indexOf(draggedItem);
    const targetIndex = sections.indexOf(targetItem);
    
    if (currentIndex === -1 || targetIndex === -1) return;

    let newSections = [...sections];
    newSections.splice(currentIndex, 1);
    newSections.splice(targetIndex, 0, draggedItem);

    setSections(newSections);
    setDraggedItem(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Homepage Builder</h1>
          <p className="text-muted-foreground">Drag, drop, and edit sections to build your homepage.</p>
        </div>
        <Button size="lg" onClick={handleSaveLayout}>
          <Save className="mr-2 h-4 w-4" />
          Save Layout
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 flex-1 min-h-0">
        {/* Left Side: Editor */}
        <div className="lg:col-span-1 flex flex-col gap-4 min-h-0">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Phone Sections</CardTitle>
              <CardDescription>Drag to reorder sections. Click to expand and manage content and formats.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto px-4">
              <Accordion type="multiple" className="w-full">
                {sections.map((section) => (
                  <div 
                      key={section.id}
                      className="border-b"
                  >
                      <AccordionItem value={section.id} className="border-b-0">
                           <div 
                              className="flex items-center w-full"
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, section)}
                            >
                              <div 
                                draggable 
                                onDragStart={(e) => handleDragStart(e, section)} 
                                className="p-1 cursor-grab"
                              >
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <AccordionTrigger className="flex-grow pl-2 pr-0 py-2 text-left">
                                  <div>
                                      <p className="font-semibold text-sm">{section.title}</p>
                                      <p className="text-xs text-muted-foreground">{section.description}</p>
                                  </div>
                              </AccordionTrigger>
                              <div className="flex items-center gap-2 pl-4 pr-1">
                                  <Label htmlFor={`vis-sidebar-${section.id}`} className="sr-only">Visibility</Label>
                                  <Switch 
                                      id={`vis-sidebar-${section.id}`}
                                      checked={section.isVisible}
                                      onCheckedChange={() => toggleVisibility(section.id)}
                                  />
                                   {section.isVisible ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                              </div>
                           </div>
                           <AccordionContent className="pl-2 pr-1">
                               <HomepageSectionEditor 
                                  section={section}
                                  onUpdate={updateSectionContent}
                               />
                           </AccordionContent>
                      </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Side: Preview */}
        <main className="lg:col-span-2 flex justify-center items-start overflow-hidden py-4">
          <div className="w-full max-w-[420px] shrink-0">
              <div className="relative mx-auto border-black dark:border-gray-800 bg-black border-[10px] rounded-[2.5rem] shadow-xl">
                  <div className="w-[140px] h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                  <div className="h-[46px] w-[3px] bg-black absolute -left-[13px] top-[72px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-black absolute -left-[13px] top-[124px] rounded-l-lg"></div>
                  <div className="h-[64px] w-[3px] bg-black absolute -right-[13px] top-[142px] rounded-r-lg"></div>
                  <div className="rounded-[2rem] overflow-hidden w-full h-[calc(100vh-12rem)] bg-background">
                       <ScrollArea className="h-full w-full">
                           <div className="scale-[0.9] origin-top-left">
                             <HomePage />
                           </div>
                      </ScrollArea>
                  </div>
              </div>
          </div>
        </main>
      </div>
    </div>
  );
}
