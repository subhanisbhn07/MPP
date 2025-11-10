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
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2 text-xs ${className}`}>
      <div className="flex items-center gap-1.5">
        <Monitor className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span className="text-gray-600 font-medium truncate">{displaySize ? `${displaySize}"` : 'N/A'}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Camera className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span className="text-gray-600 font-medium truncate">{mainCameraMP ? `${mainCameraMP}MP` : 'N/A'}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Battery className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span className="text-gray-600 font-medium truncate">{batteryCapacity || 'N/A'}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <Cpu className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span className="text-gray-600 font-medium truncate">{ram && ram.length > 0 ? `${Math.max(...ram)}GB` : 'N/A'}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <HardDrive className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span className="text-gray-600 font-medium truncate">
          {storage && storage.length > 0 ? `${Math.max(...storage)}GB` : 'NVMe'}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <RefreshCw className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span className="text-gray-600 font-medium truncate">{displayRefreshRate ? `${displayRefreshRate}Hz` : 'N/A'}</span>
      </div>

      <div className="col-span-2 sm:col-span-3 flex items-center gap-1.5 mt-1">
        <Cpu className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span className="text-gray-500 text-xs truncate">{chipset || 'N/A'}</span>
      </div>
    </div>
  );
}
