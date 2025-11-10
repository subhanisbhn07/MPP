interface PhonePriceProps {
  price: number;
  currency?: string;
  className?: string;
}

export function PhonePrice({ price, currency = 'USD', className = '' }: PhonePriceProps) {
  return (
    <div className={`text-2xl sm:text-3xl font-bold text-[#4169E1] ${className}`}>
      ${price}
    </div>
  );
}
