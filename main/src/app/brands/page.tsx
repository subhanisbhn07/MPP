
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function BrandsPage() {
    const brandsData = [
        { name: 'Acer', devices: 104 }, { name: 'alcatel', devices: 413 }, { name: 'Allview', devices: 157 },
        { name: 'Amazon', devices: 25 }, { name: 'Amoi', devices: 47 }, { name: 'Apple', devices: 138 },
        { name: 'Archos', devices: 43 }, { name: 'Asus', devices: 207 }, { name: 'AT&T', devices: 4 },
        { name: 'Benefon', devices: 9 }, { name: 'BenQ', devices: 35 }, { name: 'BenQ-Siemens', devices: 28 },
        { name: 'Bird', devices: 61 }, { name: 'BlackBerry', devices: 92 }, { name: 'Blackview', devices: 99 },
        { name: 'BLU', devices: 369 }, { name: 'Bosch', devices: 10 }, { name: 'BQ', devices: 20 },
        { name: 'Casio', devices: 5 }, { name: 'Cat', devices: 22 }, { name: 'Celkon', devices: 229 },
        { name: 'Chea', devices: 12 }, { name: 'Coolpad', devices: 53 }, { name: 'Cubot', devices: 94 },
        { name: 'Dell', devices: 20 }, { name: 'Doogee', devices: 139 }, { name: 'Emporia', devices: 15 },
        { name: 'Energizer', devices: 78 }, { name: 'Ericsson', devices: 40 }, { name: 'Eten', devices: 22 },
        { name: 'Fairphone', devices: 5 }, { name: 'Fujitsu Siemens', devices: 2 }, { name: 'Garmin-Asus', devices: 5 },
        { name: 'Gigabyte', devices: 63 }, { name: 'Gionee', devices: 95 }, { name: 'Google', devices: 39 },
        { name: 'Haier', devices: 59 }, { name: 'HMD', devices: 25 }, { name: 'Honor', devices: 273 },
        { name: 'HP', devices: 41 }, { name: 'HTC', devices: 295 }, { name: 'Huawei', devices: 491 },
        { name: 'i-mate', devices: 34 }, { name: 'i-mobile', devices: 37 }, { name: 'Icemobile', devices: 61 },
        { name: 'Infinix', devices: 162 }, { name: 'Innostream', devices: 18 }, { name: 'iNQ', devices: 5 },
        { name: 'Intex', devices: 15 }, { name: 'itel', devices: 47 }, { name: 'Jolla', devices: 3 },
        { name: 'Karbonn', devices: 60 }, { name: 'Kyocera', devices: 28 }, { name: 'Lava', devices: 171 },
        { name: 'LeEco', devices: 9 }, { name: 'Lenovo', devices: 255 }, { name: 'LG', devices: 667 },
        { name: 'Maxon', devices: 31 }, { name: 'Maxwest', devices: 41 }, { name: 'Meizu', devices: 86 },
        { name: 'Micromax', devices: 289 }, { name: 'Microsoft', devices: 32 }, { name: 'Mitac', devices: 12 },
        { name: 'Mitsubishi', devices: 25 }, { name: 'Modu', devices: 8 }, { name: 'Motorola', devices: 659 },
        { name: 'MWg', devices: 5 }, { name: 'NEC', devices: 73 }, { name: 'Neonode', devices: 3 },
        { name: 'NIU', devices: 30 }, { name: 'Nokia', devices: 591 }, { name: 'Nothing', devices: 9 },
        { name: 'Nvidia', devices: 3 }, { name: 'O2', devices: 45 }, { name: 'OnePlus', devices: 94 },
        { name: 'Oppo', devices: 357 }, { name: 'Orange', devices: 19 }, { name: 'Oscal', devices: 29 },
        { name: 'Oukitel', devices: 74 }, { name: 'Palm', devices: 17 }, { name: 'Panasonic', devices: 123 },
        { name: 'Pantech', devices: 72 }, { name: 'Parla', devices: 10 }, { name: 'Philips', devices: 233 },
        { name: 'Plum', devices: 113 }, { name: 'Posh', devices: 30 }, { name: 'Prestigio', devices: 56 },
        { name: 'QMobile', devices: 90 }, { name: 'Qtek', devices: 21 }, { name: 'Razer', devices: 2 },
        { name: 'Realme', devices: 260 }, { name: 'Sagem', devices: 120 }, { name: 'Samsung', devices: 1440 },
        { name: 'Sendo', devices: 19 }, { name: 'Sewon', devices: 25 }, { name: 'Sharp', devices: 81 },
        { name: 'Siemens', devices: 94 }, { name: 'Sonim', devices: 22 }, { name: 'Sony', devices: 161 },
        { name: 'Sony Ericsson', devices: 188 }, { name: 'Spice', devices: 120 }, { name: 'T-Mobile', devices: 69 },
        { name: 'TCL', devices: 90 }, { name: 'Tecno', devices: 175 }, { name: 'Tel.Me.', devices: 7 },
        { name: 'Telit', devices: 30 }, { name: 'Thuraya', devices: 2 }, { name: 'Toshiba', devices: 35 },
        { name: 'Ulefone', devices: 130 }, { name: 'Umidigi', devices: 76 }, { name: 'Unnecto', devices: 30 },
        { name: 'Vertu', devices: 17 }, { name: 'verykool', devices: 139 }, { name: 'vivo', devices: 546 },
        { name: 'VK Mobile', devices: 31 }, { name: 'Vodafone', devices: 87 }, { name: 'Wiko', devices: 101 },
        { name: 'WND', devices: 5 }, { name: 'XCute', devices: 4 }, { name: 'Xiaomi', devices: 467 },
        { name: 'XOLO', devices: 81 }, { name: 'Yezz', devices: 113 }, { name: 'Yota', devices: 3 },
        { name: 'YU', devices: 13 }, { name: 'ZTE', devices: 415 }
    ].sort((a, b) => a.name.localeCompare(b.name));

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
    Cat: "https://cdn.worldvectorlogo.com/logos/cat-logo.svg",
    Oppo: "https://cdn.worldvectorlogo.com/logos/oppo-2.svg",
    Realme: "https://cdn.worldvectorlogo.com/logos/realme-1.svg",
    Huawei: "https://cdn.worldvectorlogo.com/logos/huawei-2.svg",
    Nokia: "https://cdn.worldvectorlogo.com/logos/nokia-3.svg",
    LG: "https://cdn.worldvectorlogo.com/logos/lg-1.svg",
    Lenovo: "https://cdn.worldvectorlogo.com/logos/lenovo-3.svg",
    HTC: "https://cdn.worldvectorlogo.com/logos/htc-1.svg",
    BlackBerry: "https://cdn.worldvectorlogo.com/logos/blackberry-2.svg",
  };

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
        {brandsData.map((brand) => (
          <Link key={brand.name} href={`/search?q=${brand.name}`}>
            <Card className="p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow h-full relative overflow-hidden">
               {brandLogos[brand.name] ? (
                  <div className="relative w-20 h-20 mb-3 invert-0 dark:invert">
                    <Image
                      src={brandLogos[brand.name]}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
               ) : (
                 <div className="h-20 mb-3 flex items-center justify-center">
                    <h2 className="text-2xl font-bold">{brand.name}</h2>
                 </div>
               )}
              <p className="font-semibold text-sm">{brand.name}</p>
              <Badge variant="secondary" className="mt-1">{brand.devices} Devices</Badge>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

    
