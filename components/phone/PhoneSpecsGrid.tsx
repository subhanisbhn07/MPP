import { Monitor, Cpu, Camera, HardDrive, Battery, RefreshCw } from 'lucide-react';

interface PhoneSpecsGridProps {
  displaySize?: number;
  ram?: number[];
  mainCameraMP?: number;
  storage?: number[];
  batteryCapacity?: number;
  displayRefreshRate?: number;
  chipset?: string;
  className?: string;
}

export function PhoneSpecsGrid({
  displaySize,
  ram,
  mainCameraMP,
  storage,
  batteryCapacity,
  displayRefreshRate,
  chipset,
  className = '',
}: PhoneSpecsGridProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-xs sm:text-sm ${className}`}>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Monitor className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
        <span className="text-gray-700 truncate">{displaySize ? `${displaySize}"` : 'N/A'}</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
        <span className="text-gray-700 truncate">{mainCameraMP ? `${mainCameraMP}MP` : 'N/A'}</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Battery className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
        <span className="text-gray-700 truncate">{batteryCapacity || 'N/A'}</span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
        <span className="text-gray-700 truncate">{ram && ram.length > 0 ? `${Math.max(...ram)}GB` : 'N/A'}</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <HardDrive className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
        <span className="text-gray-700 truncate">
          {storage && storage.length > 0 ? `${Math.max(...storage)}GB` : 'NVMe'}
        </span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
        <span className="text-gray-700 truncate">{displayRefreshRate ? `${displayRefreshRate}Hz` : 'N/A'}</span>
      </div>

      <div className="col-span-2 sm:col-span-3 flex items-center gap-1.5 sm:gap-2">
        <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
        <span className="text-gray-700 text-xs truncate">{chipset || 'N/A'}</span>
      </div>
    </div>
  );
}
