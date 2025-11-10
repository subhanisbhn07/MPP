interface PhoneTitleProps {
  brand: string;
  model: string;
  className?: string;
}

export function PhoneTitle({ brand, model, className = '' }: PhoneTitleProps) {
  return (
    <div className={className}>
      <div className="text-xs sm:text-sm text-gray-600">{brand}</div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900">{model}</h3>
    </div>
  );
}
