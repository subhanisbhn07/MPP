import { Button } from '@/components/ui/button';

interface PhoneActionsProps {
  phoneId: string;
  onCompare?: (phoneId: string) => void;
  className?: string;
}

export function PhoneActions({ phoneId, onCompare, className = '' }: PhoneActionsProps) {
  return (
    <div className={className}>
      <Button
        onClick={() => onCompare?.(phoneId)}
        className="bg-[#4169E1] hover:bg-[#3557c9] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
        size="sm"
      >
        Compare
      </Button>
    </div>
  );
}
