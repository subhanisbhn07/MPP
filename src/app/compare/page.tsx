import { popularPhones } from "@/lib/data"
import { Phone } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { PlusCircle, Smartphone, Camera, Cpu, BatteryCharging } from 'lucide-react'

export default function ComparePage() {
  const comparisonPhones = popularPhones.slice(0, 3); // Example with 3 phones

  const specsOrder: (keyof Phone['specs'])[] = ['display', 'camera', 'processor', 'battery'];
  const specIcons = {
    display: <Smartphone className="mr-2 h-4 w-4 text-muted-foreground" />,
    camera: <Camera className="mr-2 h-4 w-4 text-muted-foreground" />,
    processor: <Cpu className="mr-2 h-4 w-4 text-muted-foreground" />,
    battery: <BatteryCharging className="mr-2 h-4 w-4 text-muted-foreground" />,
  };
  const specLabels = {
    display: "Display",
    camera: "Camera",
    processor: "Processor",
    battery: "Battery & Charging",
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Compare Phones
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Select up to 4 phones and compare their specs side-by-side.
        </p>
      </div>

      <div className="mt-12">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] min-w-[150px] font-semibold text-foreground">Feature</TableHead>
                    {comparisonPhones.map(phone => (
                      <TableHead key={phone.id} className="min-w-[200px]">
                        <div className="flex flex-col items-center text-center">
                           <Image src={phone.image} alt={phone.model} width={150} height={100} className="object-contain rounded-md mb-2" data-ai-hint="mobile phone" />
                           <p className="font-bold">{phone.brand}</p>
                           <p>{phone.model}</p>
                        </div>
                      </TableHead>
                    ))}
                    {comparisonPhones.length < 4 && (
                       <TableHead className="min-w-[200px]">
                        <div className="flex flex-col items-center justify-center h-full text-center p-4 border-2 border-dashed rounded-lg">
                           <Button variant="ghost" className="flex flex-col h-auto p-4">
                            <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Add Phone</span>
                           </Button>
                        </div>
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specsOrder.map(specKey => (
                     <TableRow key={specKey}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {specIcons[specKey]}
                            {specLabels[specKey]}
                          </div>
                        </TableCell>
                        {comparisonPhones.map(phone => (
                           <TableCell key={phone.id} className="text-center">{phone.specs[specKey]}</TableCell>
                        ))}
                         {comparisonPhones.length < 4 && <TableCell />}
                     </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-medium">Price</TableCell>
                    {comparisonPhones.map(phone => (
                       <TableCell key={phone.id} className="text-center text-lg font-bold text-primary">${phone.price}</TableCell>
                    ))}
                    {comparisonPhones.length < 4 && <TableCell />}
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    {comparisonPhones.map(phone => (
                       <TableCell key={phone.id} className="text-center">
                          <Button>View Details</Button>
                       </TableCell>
                    ))}
                    {comparisonPhones.length < 4 && <TableCell />}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
