
'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { MenuItem, MenuStructure } from '@/lib/menu-data';
import { initialMenuData } from '@/lib/menu-data';
import { handleUpdateMenu } from './actions';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { PlusCircle, Trash2, GripVertical, Save, Loader2 } from "lucide-react";


function SortableMenuItem({ item, onRemove, onUpdate }: { item: MenuItem; onRemove: (id: string) => void; onUpdate: (id: string, newLabel: string, newUrl: string) => void; }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    
    return (
        <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-2 border rounded-lg bg-muted/50">
            <div {...attributes} {...listeners} className="p-1 cursor-grab">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-grow grid grid-cols-2 gap-2">
                 <Input value={item.label} onChange={(e) => onUpdate(item.id, e.target.value, item.href)} placeholder="Label" />
                 <Input value={item.href} onChange={(e) => onUpdate(item.id, item.label, e.target.value)} placeholder="URL" />
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onRemove(item.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
        </div>
    );
}

function AddLinkDialog({ isOpen, onOpenChange, onAdd }: { isOpen: boolean, onOpenChange: (open: boolean) => void, onAdd: (label: string, url: string) => void }) {
    const [label, setLabel] = useState('');
    const [url, setUrl] = useState('');

    const handleAdd = () => {
        if (label && url) {
            onAdd(label, url);
            setLabel('');
            setUrl('');
            onOpenChange(false);
        }
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Link</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="label" className="text-right">Label</Label>
                        <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="url" className="text-right">URL</Label>
                        <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAdd}>Add Link</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


function MenuColumnEditor({ title, description, items, onUpdate, onSave }: { title: string, description: string, items: MenuItem[], onUpdate: (newItems: MenuItem[]) => void, onSave: () => void }) {
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);
            onUpdate(arrayMove(items, oldIndex, newIndex));
        }
    };

    const handleRemove = (id: string) => {
        onUpdate(items.filter(item => item.id !== id));
    };

    const handleAdd = (label: string, href: string) => {
        const newItem: MenuItem = { id: `new-${Date.now()}`, label, href };
        onUpdate([...items, newItem]);
    };
    
    const handleItemUpdate = (id: string, newLabel: string, newUrl: string) => {
      onUpdate(items.map(item => item.id === id ? { ...item, label: newLabel, href: newUrl } : item));
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 mb-4 min-h-[100px]">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={items} strategy={verticalListSortingStrategy}>
                            {items.map(item => (
                                <SortableMenuItem key={item.id} item={item} onRemove={handleRemove} onUpdate={handleItemUpdate} />
                            ))}
                        </SortableContext>
                    </DndContext>
                     {items.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed rounded-lg">
                           <p className="text-sm text-muted-foreground">No links in this menu.</p>
                        </div>
                    )}
                </div>
                <Button variant="outline" className="w-full" onClick={() => setAddDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Link
                </Button>
            </CardContent>
            <AddLinkDialog isOpen={isAddDialogOpen} onOpenChange={setAddDialogOpen} onAdd={handleAdd} />
        </Card>
    );
}

export default function MenuManagementPage() {
    const [menuData, setMenuData] = useState<MenuStructure>(initialMenuData);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleUpdateColumn = (key: keyof MenuStructure, newItems: MenuItem[]) => {
        setMenuData(prev => ({
            ...prev,
            [key]: newItems,
        }));
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        const result = await handleUpdateMenu(menuData);
        if (result.success) {
            toast({
                title: 'Success!',
                description: 'Menu structure has been saved.',
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.error || 'Failed to save menu structure.',
            });
        }
        setLoading(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
                    <p className="text-muted-foreground">
                        Manage navigation links, logos, and other menu items for the header and footer.
                    </p>
                </div>
                <Button onClick={handleSaveChanges} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {loading ? 'Saving...' : 'Save All Changes'}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <MenuColumnEditor
                    title="Header Navigation"
                    description="Links that appear in the main site header."
                    items={menuData.header}
                    onUpdate={(newItems) => handleUpdateColumn('header', newItems)}
                    onSave={handleSaveChanges}
                />
                
                <MenuColumnEditor
                    title="Footer Navigation"
                    description="All links that appear in the site footer."
                    items={menuData.footer}
                    onUpdate={(newItems) => handleUpdateColumn('footer', newItems)}
                    onSave={handleSaveChanges}
                />
            </div>
        </div>
    );
}
