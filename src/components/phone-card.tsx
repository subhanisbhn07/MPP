
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

const SpecItem = ({ icon: Icon, value, label }: { icon: React.ElementType, value: string, label: string }) => (
    <Card className="flex-1 bg-muted/50">
        <CardContent className="p-2 text-center">
            <Icon className="h-5 w-5 mx-auto mb-1 text-primary" />
            <p className="text-xs font-bold leading-tight">{value}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
        </CardContent>
    </Card>
);

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
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
       <Link href={phoneUrl} className="p-4">
        <div className="relative">
            <div className="aspect-square w-full h-full overflow-hidden">
                <Image
                src={phone.image}
                alt={`${phone.brand} ${phone.model}`}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="mobile phone"
                />
            </div>
            {user && (
            <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-0 right-0 h-8 w-8 bg-black/20 hover:bg-black/40 text-white rounded-full"
                onClick={handleWishlistClick}
            >
                <Heart className={cn("h-4 w-4", inWishlist && "fill-red-500 text-red-500")} />
                <span className="sr-only">Wishlist</span>
            </Button>
            )}
        </div>
       </Link>
      <div className="flex flex-col flex-1 p-4 pt-0 justify-between">
        <div>
            <Badge variant="secondary" className="mb-1 self-start">{phone.brand}</Badge>
            <CardTitle className="text-base font-bold leading-tight">
              <Link href={phoneUrl}>{phone.model}</Link>
            </CardTitle>
            
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <SpecItem icon={Smartphone} value={`${phone.specs.display.size_inches}"`} label={phone.specs.display.panel_type.split(',')[0]} />
                <SpecItem icon={Camera} value={phone.specs.main_camera.main_sensor_resolution} label="Main Camera" />
                <SpecItem icon={Battery} value={`${phone.specs.battery.capacity_mah} mAh`} label="Battery" />
                <SpecItem icon={Cpu} value={phone.specs.platform.chipset.split('(')[0].trim()} label="Chipset" />
            </div>
        </div>
        <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-bold text-primary flex-shrink-0">${phone.price}</p>
            <Button variant="outline" size="sm" onClick={handleCompareClick} aria-label={`Compare ${phone.model}`} className="flex-shrink-0">
              <GitCompare className="h-4 w-4 mr-2" />
              Compare
            </Button>
        </div>
      </div>
    </Card>
  );
}
