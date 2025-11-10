import { PhoneSpec } from '@/lib/types';
import { UltraCompactPhoneRow } from './ultra-compact-phone-row';
import { chunkIntoColumns } from '@/lib/utils';

interface ThreeColumnListSectionProps {
  title: string;
  variant: 'yellow' | 'blue';
  phones: PhoneSpec[];
  rowsPerCol?: number;
  onCompare?: (phoneId: string) => void;
}

export function ThreeColumnListSection({ 
  title, 
  variant, 
  phones, 
  rowsPerCol = 9,
  onCompare 
}: ThreeColumnListSectionProps) {
  const bgColor = variant === 'yellow' ? 'bg-[#FFD700]' : 'bg-[#4169E1]';
  const textColor = variant === 'yellow' ? 'text-gray-900' : 'text-white';
  
  const displayPhones = phones.slice(0, rowsPerCol * 3);
  const columns = chunkIntoColumns(displayPhones, 3);

  return (
    <section className={`${bgColor} py-6`}>
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${textColor}`}>{title}</h2>
          <button className={`text-sm ${textColor} hover:underline`}>View all →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-2">
              {column.map(phone => (
                <UltraCompactPhoneRow
                  key={phone.id}
                  phone={phone}
                  onCompare={onCompare}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
