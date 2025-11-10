import { PhoneSpec } from '@/lib/types';
import { PhoneImage } from './PhoneImage';
import { PhoneTitle } from './PhoneTitle';
import { PhoneRating } from './PhoneRating';
import { PhoneSpecsGrid } from './PhoneSpecsGrid';
import { PhonePrice } from './PhonePrice';
import { PhoneActions } from './PhoneActions';

interface PhoneCardProps {
  phone: PhoneSpec;
  onCompare?: (phoneId: string) => void;
  variant?: 'featured' | 'compact';
}

export function PhoneCard({ phone, onCompare, variant = 'featured' }: PhoneCardProps) {
  const rating = phone.rating || 0;
  const reviewCount = phone.reviewCount || 0;

  if (variant === 'featured') {
    return (
      <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer">
        <div className="p-4 flex flex-row gap-4">
          <PhoneImage 
            alt={`${phone.brand} ${phone.model}`}
            className="w-28 h-44 flex-shrink-0"
          />
          
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-start justify-between mb-2 gap-2">
              <PhoneTitle brand={phone.brand} model={phone.model} />
              <PhoneRating rating={rating} reviewCount={reviewCount} />
            </div>

            <PhoneSpecsGrid
              displaySize={phone.displaySize}
              ram={phone.ram}
              mainCameraMP={phone.mainCameraMP}
              storage={phone.storage}
              batteryCapacity={phone.batteryCapacity}
              displayRefreshRate={phone.displayRefreshRate}
              chipset={phone.chipset}
              className="mb-4"
            />

            <div className="flex items-center justify-between mt-auto gap-3">
              <PhonePrice price={phone.price || 999} />
              <PhoneActions phoneId={phone.id} onCompare={onCompare} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
