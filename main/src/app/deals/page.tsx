import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { allPhones } from "@/lib/data";

export default function DealsPage() {
  const deals = allPhones.slice(0, 6).map(phone => ({
    ...phone,
    discount: Math.floor(Math.random() * 20) + 5, // 5-25% off
  }));

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Today's Best Deals
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Limited-time offers on top smartphones. Don't miss out!
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden">
            <div className="relative">
              <Image
                src={deal.image}
                width={400}
                height={500}
                alt={deal.model}
                className="object-cover aspect-[4/5]"
                data-ai-hint="mobile phone"
              />
              <Badge variant="destructive" className="absolute top-4 left-4">
                {deal.discount}% OFF
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{deal.model}</CardTitle>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-primary">
                  ${(deal.price * (1 - deal.discount / 100)).toFixed(0)}
                </p>
                <p className="text-muted-foreground line-through">${deal.price}</p>
              </div>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="#">View Deal</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
