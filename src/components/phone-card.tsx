
import Image from 'next/image';
import type { Phone } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layers, Heart, Smartphone, Camera, GitCompare, Battery, Cpu } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';

interface PhoneCardProps {
  phone: Phone;
  onAddToCompare: (phone: Phone) => void;
}

export function PhoneCard({ phone, onAddToCompare }: PhoneCardProps) {
  const { user, isPhoneInWishlist, toggleWishlist } = useAuth();

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCompare(phone);
  };
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(phone.id);
  }

  const phoneUrl = `/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`;
  const inWishlist = isPhoneInWishlist(phone.id);

  return (
    <Card className="group flex flex-row overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
      <Link href={phoneUrl} className="w-1/3 flex-shrink-0 relative">
          <div className="aspect-square w-full h-full overflow-hidden">
            <Image
              src={phone.image}
              alt={`${phone.brand} ${phone.model}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="mobile phone"
            />
          </div>
        {user && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 h-8 w-8 bg-black/20 hover:bg-black/40 text-white rounded-full"
            onClick={handleWishlistClick}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-red-500 text-red-500")} />
            <span className="sr-only">Wishlist</span>
          </Button>
        )}
      </Link>
      <div className="flex flex-col flex-1 p-3 justify-between">
        <div>
            <Badge variant="secondary" className="mb-1 self-start">{phone.brand}</Badge>
            <CardTitle className="text-base font-bold leading-tight">
              <Link href={phoneUrl}>{phone.model}</Link>
            </CardTitle>
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 truncate"><Smartphone size={14} className="text-primary flex-shrink-0"/> <span>{phone.specs.display.size_inches}" {phone.specs.display.panel_type.split(',')[0]}</span></div>
              <div className="flex items-center gap-2 truncate"><Camera size={14} className="text-primary flex-shrink-0"/> <span>{phone.specs.main_camera.main_sensor_resolution} Main</span></div>
              <div className="flex items-center gap-2 truncate"><Battery size={14} className="text-primary flex-shrink-0"/> <span>{phone.specs.battery.capacity_mah} mAh</span></div>
              <div className="flex items-start gap-2"><Cpu size={14} className="text-primary flex-shrink-0 mt-0.5"/> <span>{phone.specs.platform.chipset}</span></div>
            </div>
        </div>
        <div className="flex items-center justify-between mt-2">
            <p className="text-base font-bold text-primary flex-shrink-0">${phone.price}</p>
            <Button variant="outline" size="sm" onClick={handleCompareClick} aria-label={`Compare ${phone.model}`} className="flex-shrink-0">
              <GitCompare className="h-4 w-4 mr-2" />
              Compare
            </Button>
        </div>
      </div>
    </Card>
  );
}
