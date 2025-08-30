import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UpcomingPage() {
  const upcomingPhones = [
    { name: "Galaxy S25 Ultra", date: "Jan 2025", description: "Rumored to feature a new 200MP sensor and even faster charging." },
    { name: "iPhone 17", date: "Sep 2025", description: "Expected to have an under-display front camera and A19 chip." },
    { name: "Pixel 10 Pro", date: "Oct 2025", description: "Will likely debut with the new Tensor G5 chip and advanced AI features." },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Upcoming Phones
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Get a sneak peek at the most anticipated smartphones of the year.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {upcomingPhones.map((phone) => (
           <Card key={phone.name}>
             <CardHeader>
               <CardTitle>{phone.name}</CardTitle>
               <p className="text-sm text-muted-foreground">{phone.date}</p>
             </CardHeader>
             <CardContent>
               <p>{phone.description}</p>
             </CardContent>
           </Card>
        ))}
      </div>
    </div>
  );
}
