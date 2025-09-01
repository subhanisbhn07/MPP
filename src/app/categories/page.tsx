import { Card } from "@/components/ui/card";
import { allPhones } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function BrandsPage() {
  const brands = [...new Set(allPhones.map((p) => p.brand))].sort();

  const brandLogos: Record<string, string> = {
    Samsung: "https://cdn.worldvectorlogo.com/logos/samsung-4.svg",
    Apple: "https://cdn.worldvectorlogo.com/logos/apple-11.svg",
    Google: "https://cdn.worldvectorlogo.com/logos/google-g-2015.svg",
    OnePlus: "https://cdn.worldvectorlogo.com/logos/oneplus-3.svg",
    Xiaomi: "https://cdn.worldvectorlogo.com/logos/xiaomi-2.svg",
    Motorola: "https://cdn.worldvectorlogo.com/logos/motorola-3.svg",
    Nothing: "https://cdn.worldvectorlogo.com/logos/nothing-2.svg",
    Asus: "https://cdn.worldvectorlogo.com/logos/asus-6.svg",
    Sony: "https://cdn.worldvectorlogo.com/logos/sony-14.svg",
    Fairphone: "https://cdn.worldvectorlogo.com/logos/fairphone-1.svg",
    Ulefone: "https://asset.brandfetch.io/id0Vmjr09Y/idgs339Ab4.svg",
    CAT: "https://cdn.worldvectorlogo.com/logos/cat-logo.svg",
    Oppo: "https://cdn.worldvectorlogo.com/logos/oppo-2.svg",
  };
  
  const getBrandPhoneCount = (brand: string) => {
    return allPhones.filter(p => p.brand === brand).length;
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Browse by Brand
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore phones from all your favorite manufacturers.
        </p>
      </div>
      <div className="grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {brands.map((brand) => (
          <Link key={brand} href={`/search?q=${brand}`}>
            <Card className="p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow h-full relative overflow-hidden">
               {brandLogos[brand] ? (
                  <div className="relative w-20 h-20 mb-3 invert-0 dark:invert">
                    <Image
                      src={brandLogos[brand]}
                      alt={`${brand} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
               ) : (
                 <div className="h-20 mb-3 flex items-center justify-center">
                    <h2 className="text-2xl font-bold">{brand}</h2>
                 </div>
               )}
              <p className="font-semibold text-sm">{brand}</p>
              <Badge variant="secondary" className="mt-1">{getBrandPhoneCount(brand)} Phones</Badge>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
