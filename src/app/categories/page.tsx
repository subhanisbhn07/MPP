import { Card, CardContent } from "@/components/ui/card";
import { Camera, Battery, Gamepad2, Smartphone, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CategoriesPage() {
  const categories = [
    { name: "Best Camera Phones", icon: Camera, href: "/search?category=camera" },
    { name: "Best Battery Life", icon: Battery, href: "/search?category=battery" },
    { name: "Top Gaming Phones", icon: Gamepad2, href: "/search?category=gaming" },
    { name: "Best Foldable Phones", icon: Smartphone, href: "/search?category=foldable" },
    { name: "Most Rugged Phones", icon: Shield, href: "/search?category=rugged" },
    { name: "Unique & Innovative", icon: Sparkles, href: "/search?category=unique" },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Browse by Category
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Find the perfect phone that fits your specific needs.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors h-full">
              <category.icon className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
