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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 flex flex-row gap-3 sm:gap-4 hover:shadow-md transition-shadow">
        <PhoneImage 
          alt={`${phone.brand} ${phone.model}`}
          className="w-28 h-44 flex-shrink-0"
        />
        
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
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
            className="mb-3 sm:mb-4"
          />

          <div className="flex items-center sm:items-end justify-between mt-auto gap-2">
            <PhonePrice price={phone.price || 999} />
            <PhoneActions phoneId={phone.id} onCompare={onCompare} />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
