import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PhoneSpec } from '@/lib/types';
import { Star, Monitor, Cpu, Camera, HardDrive, Battery, RefreshCw } from 'lucide-react';

interface PhoneCardFeaturedProps {
  phone: PhoneSpec;
  onCompare?: (phoneId: string) => void;
}

export function PhoneCardFeatured({ phone, onCompare }: PhoneCardFeaturedProps) {
  const rating = phone.rating || 0;
  const reviewCount = phone.reviewCount || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 hover:shadow-md transition-shadow">
      <div className="w-full sm:w-32 h-48 sm:h-40 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden mx-auto sm:mx-0">
        <span className="text-xs text-gray-400">Phone Image</span>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="text-xs sm:text-sm text-gray-600">{phone.brand}</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{phone.model}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
            <span className="text-gray-500">({reviewCount})</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 mb-3 sm:mb-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Monitor className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 truncate">{phone.displaySize ? `${phone.displaySize}"` : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 truncate">{phone.mainCameraMP ? `${phone.mainCameraMP}MP` : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Battery className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 truncate">{phone.batteryCapacity || 'N/A'}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 truncate">{phone.ram && phone.ram.length > 0 ? `${Math.max(...phone.ram)}GB` : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <HardDrive className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 truncate">
              {phone.storage && phone.storage.length > 0 ? `${Math.max(...phone.storage)}GB` : 'NVMe'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 truncate">{phone.displayRefreshRate ? `${phone.displayRefreshRate}Hz` : 'N/A'}</span>
          </div>

          <div className="col-span-2 sm:col-span-3 flex items-center gap-1.5 sm:gap-2">
            <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 text-xs truncate">{phone.chipset || 'N/A'}</span>
          </div>
        </div>

        <div className="flex items-center sm:items-end justify-between mt-auto gap-2">
          <div className="text-2xl sm:text-3xl font-bold text-[#4169E1]">
            ${phone.price || 999}
          </div>
          <Button
            onClick={() => onCompare?.(phone.id)}
            className="bg-[#4169E1] hover:bg-[#4169E1]/90 text-white text-sm sm:text-base px-3 sm:px-4"
            size="sm"
          >
            + Compare
          </Button>
        </div>
      </div>
    </div>
  );
}
