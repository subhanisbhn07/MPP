
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { allPhones } from "@/lib/data";
import { PlusCircle, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Phone } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ManagePhonesPage() {

    const getTags = (phone: Phone) => {
        const tags = [];
        if (phone.price > 900) tags.push({ label: 'Flagship', variant: 'default' });
        if (phone.specs.platform.chipset.includes('Snapdragon 8 Gen 3') || phone.specs.platform.chipset.includes('Apple A17 Pro')) {
             tags.push({ label: 'Gaming', variant: 'secondary' });
        }
        if (parseInt(phone.specs.battery.capacity_mah) > 5000) {
            tags.push({ label: 'Big Battery', variant: 'outline' });
        }
        if (phone.specs.body.rugged_certifications.includes("MIL-STD-810H")) {
             tags.push({ label: 'Rugged', variant: 'destructive' });
        }
        return tags;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Phones</h1>
                    <p className="text-muted-foreground">
                        Here you can add, edit, and manage all phone entries in the catalog.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2" />
                    Add New Phone
                </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allPhones.map(phone => (
                    <Card key={phone.id} className="overflow-hidden group">
                       <CardHeader className="p-0 relative">
                         <div className="absolute top-2 right-2 z-10">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>View Live</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                         </div>
                         <div className="aspect-[4/5] w-full overflow-hidden">
                            <Image
                            src={phone.image}
                            alt={`${phone.brand} ${phone.model}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint="mobile phone"
                            />
                         </div>
                       </CardHeader>
                       <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">{phone.brand}</p>
                            <h3 className="font-semibold text-lg truncate">{phone.model}</h3>
                             <div className="flex flex-wrap gap-1 mt-2">
                                {getTags(phone).map(tag => (
                                    <Badge key={tag.label} variant={tag.variant as any}>{tag.label}</Badge>
                                ))}
                            </div>
                       </CardContent>
                       <CardFooter className="p-4 pt-0 flex justify-between items-center">
                            <p className="text-xl font-bold text-primary">${phone.price}</p>
                             <Badge variant={true ? "default" : "secondary"}>
                                {true ? "Published" : "Draft"}
                            </Badge>
                       </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
