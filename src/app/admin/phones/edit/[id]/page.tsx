
import { notFound } from 'next/navigation';
import { allPhones } from '@/lib/data';
import { specCategoryGroups } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Save } from 'lucide-react';
import { handleUpdatePhone } from './actions';

interface EditPhonePageProps {
  params: {
    id: string;
  };
}

export default function EditPhonePage({ params }: EditPhonePageProps) {
  const phoneId = parseInt(params.id, 10);
  const phone = allPhones.find((p) => p.id === phoneId);

  if (!phone) {
    notFound();
  }
  
  // Create a list of all unique spec keys to render the form
  const allSpecKeys = specCategoryGroups.flatMap(group => 
    group.specs.map(spec => ({
      ...spec,
      category: group.category
    }))
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Phone</h1>
            <p className="text-muted-foreground">
              Editing specs for: <span className="font-semibold">{phone.brand} {phone.model}</span>
            </p>
         </div>
         <Button form="edit-phone-form" type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
         </Button>
      </div>

      <form id="edit-phone-form" action={handleUpdatePhone} className="space-y-6">
        <input type="hidden" name="id" value={phone.id} />

        <Card>
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" name="brand" defaultValue={phone.brand} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" name="model" defaultValue={phone.model} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" name="price" type="number" defaultValue={phone.price} />
                </div>
                 <div className="space-y-2 md:col-span-3">
                    <Label htmlFor="image">Main Image URL</Label>
                    <Input id="image" name="image" defaultValue={phone.image} />
                </div>
                 <div className="space-y-2 md:col-span-3">
                    <Label htmlFor="youtubeVideoId">YouTube Video ID</Label>
                    <Input id="youtubeVideoId" name="youtubeVideoId" defaultValue={phone.youtubeVideoId} />
                </div>
            </CardContent>
        </Card>

        <Card>
           <CardHeader>
                <CardTitle>Full Specifications</CardTitle>
                <CardDescription>
                    Edit the detailed specifications for the phone below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Accordion type="multiple" className="w-full" defaultValue={specCategoryGroups.map(g => g.category)}>
                    {specCategoryGroups.map((group) => (
                        <AccordionItem value={group.category} key={group.category}>
                            <AccordionTrigger className="text-lg font-semibold capitalize">{group.title}</AccordionTrigger>
                            <AccordionContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 pt-4">
                                {group.specs.map(spec => {
                                    const specPath = `${group.category}.${spec.key}`;
                                    const value = (phone.specs[group.category] as any)?.[spec.key] ?? '';
                                    return (
                                        <div key={spec.key} className="space-y-2">
                                            <Label htmlFor={specPath}>{spec.label}</Label>
                                            <Input 
                                                id={specPath}
                                                name={specPath}
                                                defaultValue={value}
                                            />
                                        </div>
                                    )
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                 </Accordion>
            </CardContent>
        </Card>
      </form>
    </div>
  );
}
