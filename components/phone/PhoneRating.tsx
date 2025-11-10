import { Star } from 'lucide-react';

interface PhoneRatingProps {
  rating: number;
  reviewCount: number;
  className?: string;
}

export function PhoneRating({ rating, reviewCount, className = '' }: PhoneRatingProps) {
  return (
    <div className={`flex items-center gap-1 text-xs sm:text-sm ${className}`}>
      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      <span className="text-gray-500">({reviewCount})</span>
    </div>
  );
}
