
import { allPhones } from "@/lib/data";
import { PhoneCard } from "@/components/phone-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";
import type { Phone } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function SearchPage() {
  const brands = [...new Set(allPhones.map(p => p.brand))];
  const [compareList, setCompareList] = useState<Phone[]>([]);
  const { toast } = useToast();

  const handleAddToCompare = (phone: Phone) => {
    setCompareList((prevList) => {
      if (prevList.find((p) => p.id === phone.id)) {
        toast({
          description: `${phone.model} is already in the comparison list.`,
        });
        return prevList;
      }
      if (prevList.length >= 4) {
        toast({
          variant: 'destructive',
          title: 'Comparison Limit Reached',
          description: 'You can only compare up to 4 phones at a time.',
        });
        return prevList;
      }
      toast({
        title: 'Added to Compare',
        description: `${phone.model} has been added to the comparison list.`,
      });
      return [...prevList, phone];
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Search Phones
        </h1>
        <div className="w-full max-w-2xl space-y-2">
            <form className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search by name, brand, or feature..."
                className="max-w-lg flex-1"
                defaultValue="Samsung"
              />
              <Button type="submit" variant="default">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={['brand', 'price']} className="w-full">
                <AccordionItem value="brand">
                  <AccordionTrigger className="text-base font-semibold">Brand</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {brands.map(brand => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox id={brand} defaultChecked={brand === 'Samsung'} />
                          <Label htmlFor={brand} className="font-normal">{brand}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base font-semibold">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <Slider defaultValue={[250, 1250]} max={2000} step={50} />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>$250</span>
                        <span>$1250</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="camera">
                  <AccordionTrigger className="text-base font-semibold">Camera</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cam-200" />
                        <Label htmlFor="cam-200" className="font-normal">200MP or more</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="cam-108" />
                        <Label htmlFor="cam-108" className="font-normal">108MP or more</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cam-50" />
                        <Label htmlFor="cam-50" className="font-normal">50MP or more</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </aside>

        <main className="md:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Showing results for "Samsung"</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPhones.filter(p => p.brand === 'Samsung').map(phone => (
              <PhoneCard key={phone.id} phone={phone} onAddToCompare={handleAddToCompare} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
