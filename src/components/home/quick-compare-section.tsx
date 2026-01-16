'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusCircle, X, Shuffle, ArrowRight, Smartphone, Camera, Battery, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { generateCompareUrl } from '@/lib/utils';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { AddPhoneDialog } from '@/app/compare/components/add-phone-dialog';

interface CompareSlotProps {
  phone: Phone | null;
  onAdd: () => void;
  onRemove: () => void;
}

function CompareSlot({ phone, onAdd, onRemove }: CompareSlotProps) {
  if (!phone) {
    return (
      <Card className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center border-2 border-dashed border-primary/30 rounded-lg h-full">
          <Button
            variant="ghost"
            className="flex flex-col h-auto p-4 w-full h-full text-primary/80 hover:text-primary"
            onClick={onAdd}
            aria-label="Add phone to compare"
          >
            <PlusCircle className="h-8 w-8" aria-hidden="true" />
            <span className="mt-2 text-sm font-semibold">Add Phone</span>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1 relative group/compare-card bg-card/80 overflow-hidden">
      <CardContent className="p-4 text-center text-card-foreground">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover/compare-card:opacity-100 transition-opacity z-10"
          onClick={onRemove}
          aria-label={`Remove ${phone.brand} ${phone.model}`}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
        <div className="relative w-full h-40 mb-4">
          <Image
            src={phone.image}
            alt={`${phone.brand} ${phone.model}`}
            fill
            className="object-contain"
            data-ai-hint="mobile phone"
          />
        </div>
        <p className="font-bold text-lg truncate">{phone.brand}</p>
        <p className="text-muted-foreground truncate">{phone.model}</p>
        <div className="text-left mt-4 space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Smartphone size={14} aria-hidden="true" />
            <span>{phone.specs.display.size_inches}" {phone.specs.display.panel_type.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Camera size={14} aria-hidden="true" />
            <span>{phone.specs.main_camera.main_sensor_resolution} Main</span>
          </div>
          <div className="flex items-center gap-2">
            <Battery size={14} aria-hidden="true" />
            <span>{phone.specs.battery.capacity_mah} mAh</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <Cpu size={14} className="text-primary flex-shrink-0" />
            <span>{phone.specs.platform.chipset}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface QuickCompareSectionProps {
  popularComparisons: [string, string][];
  trendingComparisons: [string, string][];
}

export function QuickCompareSection({
  popularComparisons,
  trendingComparisons,
}: QuickCompareSectionProps) {
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const [compareSlot, setCompareSlot] = useState<number | null>(null);
  const [phone1, setPhone1] = useState<Phone | null>(null);
  const [phone2, setPhone2] = useState<Phone | null>(null);

  const handleOpenDialog = (slot: number) => {
    setCompareSlot(slot);
    setIsCompareDialogOpen(true);
  };

  const handleSelectPhone = (phone: Phone) => {
    if (compareSlot === 1) {
      setPhone1(phone);
    } else {
      setPhone2(phone);
    }
    setIsCompareDialogOpen(false);
  };

  const quickCompareUrl = useMemo(() => {
    if (phone1 && phone2) {
      return generateCompareUrl([phone1, phone2]);
    }
    return '#';
  }, [phone1, phone2]);

  const getPhoneByName = (name: string) => allPhones.find((p) => p.model === name);

  return (
    <>
      <Card className="rounded-lg" aria-labelledby="quick-compare-heading">
        <CardHeader className="p-6">
          <h2 id="quick-compare-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
            Quick Compare
          </h2>
        </CardHeader>
        <CardContent className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-8">
              <CompareSlot phone={phone1} onAdd={() => handleOpenDialog(1)} onRemove={() => setPhone1(null)} />
              <div className="flex flex-col items-center justify-center my-4 md:my-0">
                <Shuffle className="hidden md:block" aria-hidden="true" />
                <p className="text-2xl font-bold my-2">VS</p>
                {phone1 && phone2 ? (
                  <Button asChild variant="accent">
                    <Link
                      href={quickCompareUrl}
                      aria-label={`Compare ${phone1.brand} ${phone1.model} and ${phone2.brand} ${phone2.model}`}
                    >
                      Compare Now
                    </Link>
                  </Button>
                ) : (
                  <Button disabled aria-disabled variant="accent" className="opacity-60" title="Select two phones to compare">
                    Compare Now
                  </Button>
                )}
              </div>
              <CompareSlot phone={phone2} onAdd={() => handleOpenDialog(2)} onRemove={() => setPhone2(null)} />
            </div>
          </div>
          <div className="mt-8 max-w-4xl mx-auto">
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-6">
              <div>
                <h3 className="font-semibold mb-3 text-center md:text-left">Popular Comparisons</h3>
                <ul className="space-y-2 text-sm">
                  {popularComparisons.slice(0, 6).map((comp, i) => {
                    const phoneA = getPhoneByName(comp[0]);
                    const phoneB = getPhoneByName(comp[1]);
                    if (!phoneA || !phoneB) return null;
                    const url = generateCompareUrl([phoneA, phoneB]);
                    return (
                      <li key={i}>
                        <Link
                          href={url}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                        >
                          <span>
                            <span className="font-semibold">{comp[0]}</span> vs{' '}
                            <span className="font-semibold">{comp[1]}</span>
                          </span>
                          <ArrowRight size={16} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-center md:text-left">Trending Comparisons</h3>
                <ul className="space-y-2 text-sm">
                  {trendingComparisons.slice(0, 6).map((comp, i) => {
                    const phoneA = getPhoneByName(comp[0]);
                    const phoneB = getPhoneByName(comp[1]);
                    if (!phoneA || !phoneB) return null;
                    const url = generateCompareUrl([phoneA, phoneB]);
                    return (
                      <li key={i}>
                        <Link
                          href={url}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                        >
                          <span>
                            <span className="font-semibold">{comp[0]}</span> vs{' '}
                            <span className="font-semibold">{comp[1]}</span>
                          </span>
                          <ArrowRight size={16} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <AddPhoneDialog
        open={isCompareDialogOpen}
        onOpenChange={setIsCompareDialogOpen}
        onSelectPhone={handleSelectPhone}
        excludePhones={[phone1, phone2].filter(Boolean) as Phone[]}
      />
    </>
  );
}
