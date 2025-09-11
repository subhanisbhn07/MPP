

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allPhones } from "@/lib/data";
import { PlusCircle, Edit, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Phone } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
            
            <Card>
                <CardContent className="p-6 pt-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allPhones.map(phone => (
                                <TableRow key={phone.id}>
                                    <TableCell>
                                        <div className="w-12 h-16 relative rounded-md overflow-hidden">
                                            <Image 
                                                src={phone.image} 
                                                alt={phone.model} 
                                                fill 
                                                className="object-cover"
                                                data-ai-hint="mobile phone"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{phone.brand}</TableCell>
                                    <TableCell className="font-medium">{phone.model}</TableCell>
                                    <TableCell>${phone.price}</TableCell>
                                    <TableCell>{phone.specs.body.form_factor}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {getTags(phone).map(tag => (
                                                <Badge key={tag.label} variant={tag.variant as any}>{tag.label}</Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={`/admin/phones/edit/${phone.id}`}>
                                                   <Edit className="mr-2 h-4 w-4" />
                                                   <span>Edit</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
