
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Phone } from '@/lib/types';
import { allPhones } from '@/lib/data';
import type { HomepageSection } from '../page';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Trash2, GripVertical, Eye, EyeOff, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

function SelectPhonesDialog({
  isOpen,
  onOpenChange,
  onSave,
  section,
  currentPhoneIds,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (phoneIds: number[]) => void;
  section: HomepageSection;
  currentPhoneIds: number[];
}) {
  const [selectedIds, setSelectedIds] = useState<number[]>(currentPhoneIds);
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
                    Save Selections
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


export function HomepageSectionEditor({ section, onUpdate, onToggleVisibility }: { section: HomepageSection; onUpdate: (sectionId: string, phoneIds: number[]) => void; onToggleVisibility: () => void; }) {
  const [selectedPhones, setSelectedPhones] = useState<Phone[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const phones = section.selectedPhoneIds.map(id => allPhones.find(p => p.id === id)).filter(Boolean) as Phone[];
    setSelectedPhones(phones);
  }, [section.selectedPhoneIds]);

  const handleSave = (newIds: number[]) => {
    onUpdate(section.id, newIds);
  };
  
  const handleRemove = (phoneId: number) => {
    const newIds = section.selectedPhoneIds.filter(id => id !== phoneId);
    onUpdate(section.id, newIds);
  };
  
  const [draggedItem, setDraggedItem] = useState<Phone | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Phone) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: Phone) => {
    if (!draggedItem) return;

    const currentIndex = selectedPhones.indexOf(draggedItem);
    const targetIndex = selectedPhones.indexOf(targetItem);
    
    if (currentIndex === -1 || targetIndex === -1) return;

    let newPhones = [...selectedPhones];
    newPhones.splice(currentIndex, 1);
    newPhones.splice(targetIndex, 0, draggedItem);

    onUpdate(section.id, newPhones.map(p => p.id));
    setDraggedItem(null);
  };

  return (
     <Card>
        <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
                <Label htmlFor={`visibility-${section.id}`} className="flex items-center gap-2 text-xs">
                    {section.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    {section.isVisible ? 'Visible' : 'Hidden'}
                </Label>
                <Switch 
                    id={`visibility-${section.id}`} 
                    checked={section.isVisible}
                    onCheckedChange={onToggleVisibility}
                />
            </div>
        </CardHeader>
        <CardContent>
            {section.isPhoneSection ? (
              <>
                <div className="space-y-3">
                    {selectedPhones.map(phone => (
                        <div 
                            key={phone.id}
                            className="flex items-center gap-4 p-2 border rounded-lg bg-muted/50"
                            draggable
                            onDragStart={(e) => handleDragStart(e, phone)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, phone)}
                        >
                            <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                            <div className="relative w-12 h-16 flex-shrink-0">
                               <Image src={phone.image} alt={phone.model} fill className="object-contain" data-ai-hint="mobile phone" />
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold">{phone.brand}</p>
                                <p className="text-sm text-muted-foreground">{phone.model}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleRemove(phone.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}
                </div>
                 <Button variant="dashed" className="w-full mt-4" onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Phone
                </Button>
                
                <SelectPhonesDialog 
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onSave={handleSave}
                    section={section}
                    currentPhoneIds={section.selectedPhoneIds}
                />
              </>
            ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">This section is managed elsewhere.</p>
                    <Badge variant="secondary" className="mt-2">e.g., News, Blog, or Events page</Badge>
                </div>
            )}
        </CardContent>
     </Card>
  );
}

