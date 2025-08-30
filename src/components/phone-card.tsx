import Image from 'next/image';
import type { Phone } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layers, Heart, Smartphone, Cpu, Battery, Camera } from 'lucide-react';
import Link from 'next/link';

interface PhoneCardProps {
  phone: Phone;
}

export function PhoneCard({ phone }: PhoneCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/phone/${phone.id}`}>
          <Image
            src={phone.image}
            alt={`${phone.brand} ${phone.model}`}
            width={400}
            height={300}
            className="aspect-video w-full object-cover"
            data-ai-hint="mobile phone"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <Badge variant="secondary" className="mb-2">{phone.brand}</Badge>
        <CardTitle className="text-lg font-bold">
          <Link href={`/phone/${phone.id}`}>{phone.model}</Link>
        </CardTitle>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Smartphone size={16} className="text-primary"/> <span>{phone.specs.display}</span></div>
          <div className="flex items-center gap-2"><Camera size={16} className="text-primary"/> <span>{phone.specs.camera}</span></div>
          <div className="flex items-center gap-2"><Cpu size={16} className="text-primary"/> <span>{phone.specs.processor}</span></div>
          <div className="flex items-center gap-2"><Battery size={16} className="text-primary"/> <span>{phone.specs.battery}</span></div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 bg-secondary/30">
        <p className="text-xl font-bold text-primary">${phone.price}</p>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Layers className="h-5 w-5" />
            <span className="sr-only">Compare</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
