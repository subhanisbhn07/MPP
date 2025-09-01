
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allPhones } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import type { Phone } from "@/lib/types";


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
                        Here you can add, edit, and manage all phone entries.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2" />
                    Add New Phone
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Phone Catalog ({allPhones.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-24">Image</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allPhones.map(phone => (
                                <TableRow key={phone.id}>
                                    <TableCell>
                                        <div className="relative h-20 w-16">
                                            <Image 
                                                src={phone.image} 
                                                alt={phone.model}
                                                fill
                                                className="rounded-md object-contain"
                                                data-ai-hint="mobile phone"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{phone.brand}</TableCell>
                                    <TableCell>{phone.model}</TableCell>
                                    <TableCell>${phone.price}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{phone.specs.body.form_factor}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {getTags(phone).map(tag => (
                                                <Badge key={tag.label} variant={tag.variant as any}>{tag.label}</Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/phones/edit/${phone.id}`}>Edit</Link>
                                        </Button>
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
