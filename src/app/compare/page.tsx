
import { allPhones } from "@/lib/data"
import { Phone, PhoneSpec, specCategories } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { PlusCircle } from 'lucide-react'

export default function ComparePage() {
  const comparisonPhones = allPhones.slice(0, 3); // Example with 3 phones

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
                    <TableHead className="w-[200px] min-w-[150px] font-semibold text-foreground sticky left-0 bg-background z-10">Feature</TableHead>
                    {comparisonPhones.map(phone => (
                      <TableHead key={phone.id} className="min-w-[200px] text-center">
                        <div className="flex flex-col items-center p-2">
                           <Image src={phone.image} alt={phone.model} width={100} height={150} className="object-contain rounded-md mb-2 h-36" data-ai-hint="mobile phone" />
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
                  {specCategories.map((category) => (
                    <React.Fragment key={category.category}>
                      <TableRow className="bg-muted/50">
                        <TableCell colSpan={comparisonPhones.length + 2} className="font-bold text-primary sticky left-0 bg-muted/50 z-10">
                          {category.title}
                        </TableCell>
                      </TableRow>
                      {category.specs.map(spec => (
                         <TableRow key={spec.key}>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">{spec.label}</TableCell>
                            {comparisonPhones.map(phone => (
                               <TableCell key={phone.id} className="text-center">
                                 {(phone.specs[category.category] as any)?.[spec.key] || 'N/A'}
                               </TableCell>
                            ))}
                             {comparisonPhones.length < 4 && <TableCell />}
                         </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">Price</TableCell>
                    {comparisonPhones.map(phone => (
                       <TableCell key={phone.id} className="text-center text-lg font-bold text-primary">${phone.price}</TableCell>
                    ))}
                    {comparisonPhones.length < 4 && <TableCell />}
                  </TableRow>
                   <TableRow>
                    <TableCell className="sticky left-0 bg-background z-10"></TableCell>
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
