import { Smartphone, Battery, Camera, Cpu, HardDrive, Zap, Star, TrendingUp } from 'lucide-react';

const specs = [
  { icon: Smartphone, label: 'Display', href: '/search?filter=display' },
  { icon: Battery, label: 'Battery', href: '/search?filter=battery' },
  { icon: Camera, label: 'Camera', href: '/search?filter=camera' },
  { icon: Cpu, label: 'Processor', href: '/search?filter=processor' },
  { icon: HardDrive, label: 'Storage', href: '/search?filter=storage' },
  { icon: Zap, label: 'Fast Charging', href: '/search?filter=charging' },
  { icon: Star, label: 'Premium', href: '/search?filter=premium' },
  { icon: TrendingUp, label: 'Trending', href: '/search?filter=trending' },
];

export function BrowseBySpecs() {
  return (
    <section className="bg-[#4169E1] py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Browse by Specs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
          {specs.map((spec) => {
            const Icon = spec.icon;
            return (
              <a
                key={spec.label}
                href={spec.href}
                className="bg-white rounded p-2 sm:p-3 flex flex-col items-center gap-1 sm:gap-2 hover:shadow-md transition-shadow"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#4169E1]" />
                <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">{spec.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
