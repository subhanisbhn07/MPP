import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PhoneSpec } from '@/lib/types';

interface UltraCompactPhoneRowProps {
  phone: PhoneSpec;
  onCompare?: (phoneId: string) => void;
}

export function UltraCompactPhoneRow({ phone, onCompare }: UltraCompactPhoneRowProps) {
  return (
    <div className="bg-white rounded border hover:shadow-sm p-1.5 flex items-center gap-2">
      <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
        <span className="text-[10px] text-gray-400">IMG</span>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-xs truncate leading-tight">{phone.brand} {phone.model}</h3>
        <div className="grid grid-cols-2 gap-x-2 gap-y-0 text-[11px] text-gray-600 mt-0.5 leading-tight">
          <div>
            <span className="text-gray-500">RAM:</span> {phone.ram && phone.ram.length > 0 ? `${Math.max(...phone.ram)}GB` : 'N/A'}
          </div>
          <div>
            <span className="text-gray-500">Storage:</span> {phone.storage && phone.storage.length > 0 ? `${Math.max(...phone.storage)}GB` : 'N/A'}
          </div>
          <div>
            <span className="text-gray-500">Battery:</span> {phone.batteryCapacity ? `${phone.batteryCapacity}mAh` : 'N/A'}
          </div>
          <div>
            <span className="text-gray-500">Camera:</span> {phone.mainCameraMP ? `${phone.mainCameraMP}MP` : 'N/A'}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 flex-shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="h-6 text-[11px] px-2 leading-none"
          onClick={() => onCompare?.(phone.id)}
        >
          Compare
        </Button>
        <Link href={`/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/\s+/g, '-')}`}>
          <Button
            variant="default"
            size="sm"
            className="h-6 text-[11px] px-2 w-full bg-[#4169E1] hover:bg-[#4169E1]/90 leading-none"
          >
            Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
