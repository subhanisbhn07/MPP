
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateSpec, handleSaveToDatabase } from '../actions';
import type { GenerateMobileSpecOutput } from '@/ai/flows/generate-mobile-spec';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Sparkles, Loader2, Save, FileJson } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Brand name must be at least 2 characters.' }),
  model: z.string().min(1, { message: 'Model name is required.' }),
});

// Function to convert camelCase or snake_case to Title Case
const toTitleCase = (str: string) => {
  if (!str) return '';
  return str
    .replace(/([A-Z])/g, ' $1') // insert a space before all caps
    .replace(/_/g, ' ') // replace underscores with a space
    .replace(/\w\S*/g, (txt) => { // capitalize the first letter of each word
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
    .trim();
};


export function SpecGenerationClient() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<GenerateMobileSpecOutput | null>(null);
  const [generatedPhoneDetails, setGeneratedPhoneDetails] = useState({ name: '', model: ''});
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      model: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    setGeneratedPhoneDetails(values);
    try {
      const response = await handleGenerateSpec(values);
      if (response.success && response.data) {
        setResult(response.data);
        toast({
          title: 'Success!',
          description: `Specifications for ${values.name} ${values.model} generated.`,
        });
      } else {
         throw new Error(response.error || 'An unknown error occurred.');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: error.message || 'Failed to generate specifications. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }
  
  const handleSave = async () => {
    if (!result || !generatedPhoneDetails.model) return;
    setSaving(true);

    const fullPhoneData = {
        id: Date.now(), // Use a timestamp for a unique ID
        brand: generatedPhoneDetails.name,
        model: generatedPhoneDetails.model,
        image: `https://picsum.photos/seed/${generatedPhoneDetails.model.replace(/ /g, '-')}/400/500`,
        images: [],
        youtubeVideoId: '',
        price: 0, // Admin can edit this later
        specs: result
    };
    
    try {
        const response = await handleSaveToDatabase(fullPhoneData);
        if(response.success){
            toast({
                title: "Phone Saved",
                description: response.message
            });
        } else {
            throw new Error(response.error || 'An unknown error occurred during save.');
        }
    } catch (error: any) {
         toast({
            variant: "destructive",
            title: "Save Failed",
            description: error.message,
        });
    } finally {
        setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Enter Phone Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Samsung" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Galaxy S24 Ultra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading || saving} className="w-full">
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Specifications
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
                <CardTitle>Generated Specifications</CardTitle>
                <CardDescription>Review the generated specs below. You can then save to the database.</CardDescription>
            </div>
            {result && (
              <Button size="sm" onClick={handleSave} disabled={saving || loading}>
                {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Save className="mr-2 h-4 w-4" />
                )}
                Save to Database
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating... this may take a moment.</p>
              </div>
            )}
            {!loading && !result && (
              <div className="flex flex-col items-center justify-center h-96 text-center border-2 border-dashed rounded-lg">
                <FileJson className="h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground mt-4">
                  Your generated specifications will appear here.
                </p>
              </div>
            )}
            {result && (
              <Accordion type="multiple" className="w-full" defaultValue={Object.keys(result)}>
                {Object.entries(result).map(([category, specs]) => (
                   <AccordionItem value={category} key={category}>
                     <AccordionTrigger className="text-lg font-semibold capitalize">{toTitleCase(category)}</AccordionTrigger>
                     <AccordionContent>
                        <div className="space-y-3 pt-2">
                           {typeof specs === 'object' && specs !== null && !Array.isArray(specs) ? (
                            Object.entries(specs).map(([key, value]) => (
                               <div key={key} className="grid grid-cols-3 gap-4 text-sm">
                                  <span className="font-medium text-muted-foreground col-span-1">
                                      {toTitleCase(key)}
                                  </span>
                                  <span className="col-span-2">{String(value)}</span>
                               </div>
                            ))
                           ) : (
                             <p>{String(specs)}</p>
                           )}
                        </div>
                     </AccordionContent>
                   </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
