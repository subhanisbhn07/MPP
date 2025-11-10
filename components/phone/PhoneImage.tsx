interface PhoneImageProps {
  alt: string;
  className?: string;
}

export function PhoneImage({ alt, className = '' }: PhoneImageProps) {
  return (
    <div className={`bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden ${className}`}>
      <span className="text-xs text-gray-400">{alt}</span>
    </div>
  );
}
