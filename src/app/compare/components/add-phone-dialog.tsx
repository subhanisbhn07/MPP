
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Phone } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface AddPhoneDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelectPhone: (phone: Phone) => void;
  allPhones: Phone[];
  currentPhones: Phone[];
}

export function AddPhoneDialog({
  isOpen,
  onOpenChange,
  onSelectPhone,
  allPhones,
  currentPhones,
}: AddPhoneDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPhones = allPhones.filter(
    (phone) =>
      phone.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.model.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const isPhoneSelected = (phone: Phone) => {
    return currentPhones.some(p => p.id === phone.id);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Phone to Compare</DialogTitle>
        </DialogHeader>
        <div className="p-4 pt-0">
          <Input
            placeholder="Search for a phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {filteredPhones.map((phone) => (
                <div
                  key={phone.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 relative">
                       <Image
                        src={phone.image}
                        alt={phone.model}
                        fill
                        className="object-contain rounded-md"
                        data-ai-hint="mobile phone"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{phone.model}</p>
                      <p className="text-sm text-muted-foreground">{phone.brand}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => onSelectPhone(phone)}
                    disabled={isPhoneSelected(phone)}
                  >
                    {isPhoneSelected(phone) ? 'Added' : 'Add'}
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
