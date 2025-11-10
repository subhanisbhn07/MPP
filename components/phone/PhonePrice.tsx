interface PhonePriceProps {
  price: number;
  currency?: string;
  className?: string;
}

export function PhonePrice({ price, currency = 'USD', className = '' }: PhonePriceProps) {
  return (
    <div className={`text-xl sm:text-2xl font-bold text-gray-900 ${className}`}>
      ${price.toLocaleString()}
    </div>
  );
}
