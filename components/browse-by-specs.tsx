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
    <section className="bg-[#4169E1] py-6">
      <div className="container">
        <h2 className="text-xl font-bold text-white mb-4">Browse by Specs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {specs.map((spec) => {
            const Icon = spec.icon;
            return (
              <a
                key={spec.label}
                href={spec.href}
                className="bg-white rounded p-3 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
              >
                <Icon className="w-6 h-6 text-[#4169E1]" />
                <span className="text-xs font-medium text-center">{spec.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
