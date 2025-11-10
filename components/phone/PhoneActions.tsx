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
        className="bg-[#4169E1] hover:bg-[#4169E1]/90 text-white text-sm sm:text-base px-3 sm:px-4"
        size="sm"
      >
        + Compare
      </Button>
    </div>
  );
}
