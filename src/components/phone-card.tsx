
import Image from 'next/image';
import type { Phone } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Smartphone, Camera, Battery, Plus, Star, Cpu } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';

interface PhoneCardProps {
  phone: Phone;
  onAddToCompare: (phone: Phone) => void;
}

const SpecItem = ({ icon: Icon, value }: { icon: React.ElementType, value: string }) => (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{value}</span>
    </div>
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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg rounded-md w-full relative">
       {user && (
          <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 left-2 h-7 w-7 z-10 bg-background/50 hover:bg-background/80"
              onClick={handleWishlistClick}
          >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-red-500 text-red-500")} />
              <span className="sr-only">Wishlist</span>
          </Button>
      )}
       <Link href={phoneUrl} className="flex items-center gap-4 p-3">
        {/* Left Section: Image */}
        <div className="relative w-24 h-32 flex-shrink-0">
            <Image
            src={phone.image}
            alt={`${phone.brand} ${phone.model}`}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="mobile phone"
            />
        </div>

        {/* Right Section: Content */}
        <div className="flex flex-col justify-between w-full self-stretch">
            {/* Top part: title, price */}
             <div className="flex justify-between items-start">
                <div>
                    <Badge variant="outline">{phone.brand}</Badge>
                    <h3 className="text-base font-bold leading-tight mt-1">{phone.model}</h3>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-primary">${phone.price}</p>
                </div>
            </div>

            {/* Middle part: specs */}
            <div className="my-2 grid grid-cols-2 gap-x-3 gap-y-1">
                <SpecItem icon={Smartphone} value={`${phone.specs.display.size_inches}"`} />
                <SpecItem icon={Camera} value={phone.specs.main_camera.main_sensor_resolution} />
                <SpecItem icon={Battery} value={phone.specs.battery.capacity_mah} />
                <SpecItem icon={Cpu} value={phone.specs.platform.chipset.split(' ')[0]} />
                <SpecItem icon={Cpu} value={phone.specs.memory.ram_capacities} />
            </div>

            {/* Bottom part: rating and compare button */}
            <div className="flex justify-between items-end">
                 <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400"/>
                    <span className="font-semibold">4.2</span>
                    <span>(142)</span>
                </div>
                <Button 
                    size="sm" 
                    className="rounded-full"
                    onClick={handleCompareClick} 
                    aria-label={`Compare ${phone.model}`}
                >
                    <Plus className="h-4 w-4 mr-1" />
                    <span>Compare</span>
                </Button>
            </div>
        </div>
       </Link>
    </Card>
  );
}
