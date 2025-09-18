
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Eye, EyeOff, Save, GripVertical, Edit, PlusCircle, Search } from "lucide-react";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Type definition for a homepage section
type HomepageSection = {
  id: string;
  title: string;
  description: string;
  isVisible: boolean;
  selectedPhoneIds: number[];
  maxSelect: number;
};

// Component for the selection dialog
function SelectPhonesDialog({
  isOpen,
  onOpenChange,
  onSave,
  section,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (phoneIds: number[]) => void;
  section: HomepageSection;
}) {
  const [selectedIds, setSelectedIds] = useState<number[]>(section.selectedPhoneIds);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleSelect = (phoneId: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(phoneId)) {
        return prev.filter(id => id !== phoneId);
      }
      if (prev.length < section.maxSelect) {
        return [...prev, phoneId];
      }
      return prev;
    });
  };

  const filteredPhones = allPhones.filter(phone => 
    phone.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
    phone.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Phones for: {section.title}</DialogTitle>
          <p className="text-sm text-muted-foreground">Select up to {section.maxSelect} phones for this section.</p>
        </DialogHeader>
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search phones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <ScrollArea className="h-96 border rounded-md p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredPhones.map(phone => {
                    const isSelected = selectedIds.includes(phone.id);
                    return (
                        <Card 
                            key={phone.id} 
                            onClick={() => handleToggleSelect(phone.id)}
                            className={cn(
                                "flex items-center gap-3 p-2 cursor-pointer transition-colors",
                                isSelected ? "border-primary bg-primary/10" : "hover:bg-muted"
                            )}
                        >
                             <div className="relative w-12 h-16 flex-shrink-0">
                                <Image src={phone.image} alt={phone.model} fill className="object-contain" data-ai-hint="mobile phone" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{phone.brand}</p>
                                <p className="text-xs text-muted-foreground">{phone.model}</p>
                            </div>
                        </Card>
                    );
                })}
                </div>
            </ScrollArea>
             <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Selected: {selectedIds.length} / {section.maxSelect}</p>
                <Button onClick={() => { onSave(selectedIds); onOpenChange(false); }}>
                    <Save className="mr-2 h-4 w-4"/>
                    Save Selections
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


// Initial configuration for each content section card
const initialSections: HomepageSection[] = [
    { id: 'trendingPhones', title: 'Trending Phones', description: 'A list of 12 trending phones currently popular in the market.', isVisible: true, selectedPhoneIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], maxSelect: 12 },
    { id: 'latestPhones', title: 'Latest Launches', description: 'A list of the 12 most recently launched phones.', isVisible: true, selectedPhoneIds: [10, 9, 8, 7, 5, 2, 13, 14, 15, 16, 17, 18], maxSelect: 12 },
    { id: 'flagshipPhones', title: 'Flagship Phones', description: 'A list of 12 flagship-tier phones.', isVisible: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'performancePhones', title: 'Best for Gaming', description: 'A list of 12 phones best for gaming and performance.', isVisible: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'batteryPhones', title: 'Longest Battery Life', description: 'A list of 12 phones with the best battery life.', isVisible: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'cameraPhones', title: 'Top Camera Phones', description: 'A list of 12 phones with the best camera systems.', isVisible: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'foldablePhones', title: 'Foldable Phones', description: 'A list of 12 popular foldable phones.', isVisible: true, selectedPhoneIds: [4, 5, 6, 8, 19, 20], maxSelect: 12 },
    { id: 'ruggedPhones', title: 'Rugged & Durable Phones', description: 'A list of 12 rugged and durable phones.', isVisible: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'uniquePhones', title: 'Unique & Niche Phones', description: 'A list of 12 unique or niche-market phones.', isVisible: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'iosPhones', title: 'Top iOS Phones', description: 'A list of the top 12 iOS phones available.', isVisible: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'androidPhones', title: 'Top Android Phones', description: 'A list of the top 12 Android phones available.', isVisible: true, selectedPhoneIds: [], maxSelect: 12 },
    { id: 'upcomingEvents', title: 'Upcoming Calendar', description: 'A list of upcoming mobile phone launch events.', isVisible: false, selectedPhoneIds: [], maxSelect: 0 },
    { id: 'guides', title: 'Guides', description: 'A list of interesting guides or deep-dive topics.', isVisible: false, selectedPhoneIds: [], maxSelect: 0 },
    { id: 'leaks', title: 'Leaks & Rumors', description: 'A list of recent and interesting leaks or rumors.', isVisible: false, selectedPhoneIds: [], maxSelect: 0 },
    { id: 'blogPosts', title: 'Blog Posts', description: 'A list of blog posts on various topics.', isVisible: false, selectedPhoneIds: [], maxSelect: 0 },
    { id: 'news', title: 'News Articles', description: 'A list of recent news articles.', isVisible: false, selectedPhoneIds: [], maxSelect: 0 },
];


export default function HomepageContentPage() {
  const [sections, setSections] = useState<HomepageSection[]>(initialSections);
  const [editingSection, setEditingSection] = useState<HomepageSection | null>(null);
  const { toast } = useToast();

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const item = newSections.splice(index, 1)[0];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    newSections.splice(newIndex, 0, item);
    setSections(newSections);
  };
  
  const toggleVisibility = (id: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, isVisible: !section.isVisible } : section
    ));
  };
  
  const handleSavePhoneSelection = (sectionId: string, phoneIds: number[]) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, selectedPhoneIds: phoneIds } : section
    ));
  };

  const handleSaveLayout = () => {
    console.log("Saving new homepage layout and content:", sections);
    toast({
      title: 'Layout Saved!',
      description: 'The new homepage configuration has been saved.',
    });
  };

  const getPhoneById = (id: number) => allPhones.find(p => p.id === id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Homepage Content & Layout</h1>
            <p className="text-muted-foreground">
            Reorder, toggle, and curate the content for each homepage section.
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

      <div className="space-y-4">
        {sections.map((section, index) => {
            const hasPhoneSelection = section.maxSelect > 0;
            return (
            <Card key={section.id} className="p-4">
                <div className="flex items-center">
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
                        {hasPhoneSelection && (
                           <Button variant="outline" size="sm" onClick={() => setEditingSection(section)}>
                             <Edit className="mr-2 h-3 w-3" />
                             Edit Content
                           </Button>
                        )}
                        <div className="flex flex-col">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveSection(index, 'up')} disabled={index === 0}>
                                <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1}>
                                <ArrowDown className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                {hasPhoneSelection && section.selectedPhoneIds.length > 0 && (
                    <div className="ml-10 mt-3">
                        <div className="flex flex-wrap items-center gap-2">
                           {section.selectedPhoneIds.map(id => {
                               const phone = getPhoneById(id);
                               return phone ? (
                                   <div key={id} className="relative w-12 h-16 border rounded-md p-1 bg-muted/50">
                                       <Image src={phone.image} alt={phone.model} fill className="object-contain" data-ai-hint="mobile phone" />
                                   </div>
                               ) : null;
                           })}
                        </div>
                    </div>
                )}
            </Card>
        )})}
      </div>
      
      {editingSection && (
          <SelectPhonesDialog 
              isOpen={!!editingSection}
              onOpenChange={(isOpen) => !isOpen && setEditingSection(null)}
              onSave={(phoneIds) => handleSavePhoneSelection(editingSection.id, phoneIds)}
              section={editingSection}
          />
      )}
    </div>
  );
}
