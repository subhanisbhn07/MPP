
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Save, PanelRightOpen, PanelRightClose, Eye, EyeOff, GripVertical } from "lucide-react";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HomepageSectionEditor } from './components/section-editor';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PhoneCard } from '@/components/phone-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();

  const activeSection = sections.find(s => s.id === activeSectionId);
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
    <div className="flex h-[calc(100vh-10rem)]">
        <main className={cn("flex-1 transition-all duration-300 pr-4 flex justify-center items-center", isSidebarOpen ? "lg:mr-[450px]" : "mr-0")}>
            <div className="w-full max-w-[420px] mx-auto">
                 <div className="flex items-center justify-between mb-2 sticky top-0 bg-muted/80 backdrop-blur-sm z-10 rounded-md p-1">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">Mobile Preview</h1>
                    </div>
                     <div className="flex items-center gap-2">
                        <Button size="sm" onClick={handleSaveLayout}>
                            <Save className="mr-2 h-4 w-4" />
                            Save
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            {isSidebarOpen ? <PanelRightClose /> : <PanelRightOpen />}
                        </Button>
                    </div>
                </div>

                <div className="relative mx-auto border-black dark:border-gray-800 bg-black border-[10px] rounded-[2.5rem] h-[780px] w-full shadow-xl">
                    <div className="w-[140px] h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                    <div className="h-[46px] w-[3px] bg-black absolute -left-[13px] top-[72px] rounded-l-lg"></div>
                    <div className="h-[46px] w-[3px] bg-black absolute -left-[13px] top-[124px] rounded-l-lg"></div>
                    <div className="h-[64px] w-[3px] bg-black absolute -right-[13px] top-[142px] rounded-r-lg"></div>
                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background">
                         <ScrollArea className="h-full w-full">
                            <div className="p-2 space-y-4">
                                 <Alert className="scale-90">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Simulation</AlertTitle>
                                    <AlertDescription>
                                        This is a layout and content manager simulation. Saving will log the new configuration to the console.
                                    </AlertDescription>
                                </Alert>
                                {visibleSections.map(section => (
                                    <Card key={section.id} className="overflow-hidden !p-0">
                                        <CardHeader className="p-3">
                                            <CardTitle className="text-lg">{section.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-3">
                                             {section.isPhoneSection ? (
                                                <div className="grid grid-cols-1 gap-2">
                                                {section.selectedPhoneIds.slice(0, 6).map(id => {
                                                    const phone = allPhones.find(p => p.id === id);
                                                    if (!phone) return null;
                                                    return <PhoneCard key={id} phone={phone} onAddToCompare={() => {}}/>
                                                })}
                                                </div>
                                            ) : (
                                                <p className="text-muted-foreground text-center py-8 text-sm">Non-phone section placeholder.</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </main>
        
        <aside className={cn("fixed top-[4.5rem] right-4 bottom-4 z-20 transition-transform duration-300 ease-in-out", isSidebarOpen ? "translate-x-0" : "translate-x-[calc(100%+2rem)]")}>
             <Card className="h-full w-[450px] flex flex-col">
                <CardHeader>
                    <CardTitle>Homepage Sections</CardTitle>
                    <CardDescription>Drag to reorder. Click to edit.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-2 overflow-hidden">
                    <ScrollArea className="flex-1 pr-4 -mr-4">
                     <div className="space-y-2">
                        {sections.map((section) => (
                            <Card 
                                key={section.id} 
                                className={cn("p-3 transition-colors cursor-pointer", activeSectionId === section.id ? "bg-primary/10 border-primary" : "hover:bg-muted")}
                                onClick={() => setActiveSectionId(section.id)}
                                draggable
                                onDragStart={(e) => handleDragStart(e, section)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, section)}
                            >
                                <div className="flex items-center">
                                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                    <div className="flex-grow ml-3">
                                        <p className="font-semibold text-sm">{section.title}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor={`vis-sidebar-${section.id}`} className="sr-only">Visibility</Label>
                                        <Switch 
                                            id={`vis-sidebar-${section.id}`}
                                            checked={section.isVisible}
                                            onCheckedChange={() => toggleVisibility(section.id)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                         {section.isVisible ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                                    </div>
                                </div>
                            </Card>
                        ))}
                      </div>
                    </ScrollArea>
                    <Separator className="my-4"/>
                    <div className="flex-shrink-0">
                         {activeSection ? (
                            <HomepageSectionEditor 
                                key={activeSection.id}
                                section={activeSection}
                                onUpdate={updateSectionContent}
                            />
                          ) : (
                            <div className="text-center text-muted-foreground py-12">
                                <p>Select a section to edit.</p>
                            </div>
                          )}
                    </div>
                </CardContent>
            </Card>
        </aside>
    </div>
  );
}
