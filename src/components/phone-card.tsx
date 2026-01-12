
import Image from 'next/image';
import type { Phone } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Smartphone, Camera, Battery, Plus, Star, Cpu, MemoryStick, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';
import { calculatePhoneRating, getRatingColor, getRatingLabel } from '@/lib/rating';

interface PhoneCardProps {
  phone: Phone;
  onAddToCompare: (phone: Phone) => void;
}

const SpecItem = ({ icon: Icon, value }: { icon: React.ElementType, value: string }) => (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="truncate">{value}</span>
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
  
  const truncatedChipset = phone.specs.platform.chipset.length > 30 
    ? `${phone.specs.platform.chipset.substring(0, 27)}...`
    : phone.specs.platform.chipset;

  // Calculate dynamic rating
  const rating = calculatePhoneRating(phone, phone.releaseDate);
  const ratingColor = getRatingColor(rating.overall);
  const ratingLabel = getRatingLabel(rating.overall);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg rounded-md w-full border border-border">
      <Link href={phoneUrl} className="flex">
        {/* Left Section: Image */}
        <div className="relative w-28 min-h-[140px] flex-shrink-0 bg-gradient-to-b from-muted/20 to-muted/40 border-r">
            {user && (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-1 left-1 h-7 w-7 z-10 bg-background/50 hover:bg-background/80 rounded-full"
                    onClick={handleWishlistClick}
                >
                    <Heart className={cn("h-4 w-4", inWishlist && "fill-red-500 text-red-500")} />
                    <span className="sr-only">Wishlist</span>
                </Button>
            )}
            <div className="absolute inset-2">
              <Image
                  src={phone.image}
                  alt={`${phone.brand} ${phone.model}`}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="mobile phone"
                  sizes="96px"
              />
            </div>
        </div>

        {/* Right Section: Content */}
        <div className="flex flex-col justify-between w-full p-3">
            <div className="flex justify-between">
                <div>
                    <Badge variant="outline">{phone.brand}</Badge>
                    <h3 className="text-base font-bold leading-tight mt-1">{phone.model}</h3>
                </div>
                <div className="text-right flex-shrink-0">
                    <div className="flex items-center justify-end gap-1">
                        <div 
                          className="flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold"
                          style={{ backgroundColor: ratingColor }}
                          title={`${ratingLabel} - Hardware: ${rating.hardware.toFixed(0)}, Software: ${rating.software.toFixed(0)}, Value: ${rating.value.toFixed(0)}`}
                        >
                          {rating.overall.toFixed(0)}
                        </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5">{ratingLabel}</span>
                </div>
            </div>

            <div className="my-2 space-y-1">
                <div className="grid grid-cols-3 gap-x-3 gap-y-1">
                    <SpecItem icon={Smartphone} value={`${phone.specs.display.size_inches}"`} />
                    <SpecItem icon={Camera} value={phone.specs.main_camera.main_sensor_resolution} />
                    <SpecItem icon={Battery} value={phone.specs.battery.capacity_mah} />
                    <SpecItem icon={MemoryStick} value={phone.specs.memory.ram_capacities} />
                    <SpecItem icon={Cpu} value={phone.specs.memory.storage_type} />
                    <SpecItem icon={RefreshCw} value={`${phone.specs.display.refresh_rate_hz}Hz`} />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Cpu className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{truncatedChipset}</span>
                </div>
            </div>

            <div className="flex justify-between items-end">
                <p className="text-lg font-bold text-primary">${phone.price}</p>
                <Button 
                    size="sm"
                    className="h-8 px-3"
                    onClick={handleCompareClick} 
                    aria-label={`Compare ${phone.model}`}
                >
                    <Plus className="h-4 w-4 mr-1" />
                    Compare
                </Button>
            </div>
        </div>
      </Link>
    </Card>
  );
}
