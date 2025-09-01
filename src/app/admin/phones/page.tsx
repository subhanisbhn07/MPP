
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


export default function ManagePhonesPage() {
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
                                <TableHead>Model</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Price</TableHead>
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
                                    <TableCell className="font-medium">{phone.model}</TableCell>
                                    <TableCell>{phone.brand}</TableCell>
                                    <TableCell>${phone.price}</TableCell>
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
