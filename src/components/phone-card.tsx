
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
    <div className="text-center p-1 border-dashed border rounded-md flex flex-col items-center justify-center h-16">
        <Icon className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
        <p className="text-xs font-bold leading-tight">{value}</p>
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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg rounded-md">
       <Link href={phoneUrl} className="flex flex-col gap-2 p-3">
        {/* Top Section: Image */}
        <div className="relative w-full aspect-[4/5] flex-shrink-0">
            <Image
            src={phone.image}
            alt={`${phone.brand} ${phone.model}`}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="mobile phone"
            />
        </div>

        {/* Middle Section: Content */}
        <div className="flex-1 w-full">
            <div className="flex justify-between items-start">
                <div>
                    <Badge variant="outline">{phone.brand}</Badge>
                    <h3 className="text-base font-bold leading-tight mt-1">{phone.model}</h3>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-primary">${phone.price}</p>
                     <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400"/>
                        <span>4.2</span>
                     </div>
                </div>
            </div>

            <div className="mt-2 grid grid-cols-4 gap-1 text-center">
                <SpecItem icon={Smartphone} value={`${phone.specs.display.size_inches}"`} />
                <SpecItem icon={Camera} value={phone.specs.main_camera.main_sensor_resolution} />
                <SpecItem icon={Battery} value={phone.specs.battery.capacity_mah} />
                <SpecItem icon={Cpu} value={phone.specs.platform.chipset.split(' ')[0]} />
            </div>
        </div>

        {/* Bottom Section: Actions */}
        <div className="flex justify-end items-center gap-2">
            {user && (
            <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={handleWishlistClick}
            >
                <Heart className={cn("h-4 w-4", inWishlist && "fill-red-500 text-red-500")} />
                <span className="sr-only">Wishlist</span>
            </Button>
            )}
            <Button 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={handleCompareClick} 
            aria-label={`Compare ${phone.model}`}
            >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add to compare</span>
            </Button>
        </div>
       </Link>
    </Card>
  );
}
