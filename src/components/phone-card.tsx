
import Image from 'next/image';
import type { Phone } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layers, Heart, Smartphone, Camera } from 'lucide-react';
import Link from 'next/link';

interface PhoneCardProps {
  phone: Phone;
  onAddToCompare: (phone: Phone) => void;
}

export function PhoneCard({ phone, onAddToCompare }: PhoneCardProps) {

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCompare(phone);
  };

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <Link href={`/phone/${phone.id}`}>
          <div className="aspect-[4/5] w-full overflow-hidden">
            <Image
              src={phone.image}
              alt={`${phone.brand} ${phone.model}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="mobile phone"
            />
          </div>
        </Link>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 bg-black/20 hover:bg-black/40 text-white rounded-full">
          <Heart className="h-4 w-4" />
          <span className="sr-only">Wishlist</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <Badge variant="secondary" className="mb-2">{phone.brand}</Badge>
        <CardTitle className="text-base font-bold leading-tight">
          <Link href={`/phone/${phone.id}`}>{phone.model}</Link>
        </CardTitle>
        <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 truncate"><Smartphone size={14} className="text-primary flex-shrink-0"/> <span>{phone.specs.display.size_inches} {phone.specs.display.panel_type.split(',')[0]}</span></div>
          <div className="flex items-center gap-2 truncate"><Camera size={14} className="text-primary flex-shrink-0"/> <span>{phone.specs.main_camera.main_sensor_resolution}MP Main</span></div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 bg-secondary/30">
        <p className="text-lg font-bold text-primary">${phone.price}</p>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCompareClick}>
            <Layers className="h-4 w-4" />
            <span className="sr-only">Compare</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
