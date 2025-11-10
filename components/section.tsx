import { ReactNode } from 'react';

interface SectionProps {
  variant: 'yellow' | 'blue';
  title: string;
  children: ReactNode;
}

export function Section({ variant, title, children }: SectionProps) {
  const bgColor = variant === 'yellow' ? 'bg-[#FFD700]' : 'bg-[#4169E1]';
  const textColor = variant === 'yellow' ? 'text-gray-900' : 'text-white';

  return (
    <section className={`${bgColor} py-8`}>
      <div className="container">
        <h2 className={`text-2xl font-bold ${textColor} mb-6`}>{title}</h2>
        {children}
      </div>
    </section>
  );
}
