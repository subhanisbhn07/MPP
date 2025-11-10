import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PhoneSpec } from '@/lib/types';

interface PhoneCardProps {
  phone: PhoneSpec;
  onCompare?: (phoneId: string) => void;
}

export function PhoneCard({ phone, onCompare }: PhoneCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative bg-gray-100">
        {phone.images && phone.images[0] ? (
          <Image
            src={phone.images[0]}
            alt={`${phone.brand} ${phone.model}`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg">{phone.brand}</h3>
          <p className="text-sm text-muted-foreground">{phone.model}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">RAM:</span>
            <span className="ml-1 font-medium">
              {phone.ram && phone.ram.length > 0 ? `${Math.max(...phone.ram)}GB` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Storage:</span>
            <span className="ml-1 font-medium">
              {phone.storage && phone.storage.length > 0 ? `${Math.max(...phone.storage)}GB` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Battery:</span>
            <span className="ml-1 font-medium">
              {phone.batteryCapacity ? `${phone.batteryCapacity}mAh` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Camera:</span>
            <span className="ml-1 font-medium">
              {phone.mainCameraMP ? `${phone.mainCameraMP}MP` : 'N/A'}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {onCompare && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onCompare(phone.id)}
            >
              Compare
            </Button>
          )}
          <Link href={`/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/\s+/g, '-')}`} className="flex-1">
            <Button size="sm" className="w-full">
              Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
