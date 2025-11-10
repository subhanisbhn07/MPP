interface PhoneTitleProps {
  brand: string;
  model: string;
  className?: string;
}

export function PhoneTitle({ brand, model, className = '' }: PhoneTitleProps) {
  return (
    <div className={className}>
      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{brand}</div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-0.5 line-clamp-2">{model}</h3>
    </div>
  );
}
