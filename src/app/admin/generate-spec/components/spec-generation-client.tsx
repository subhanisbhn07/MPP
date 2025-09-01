'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateSpec } from '../actions';
import type { GenerateMobileSpecOutput } from '@/ai/flows/generate-mobile-spec';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Sparkles, Loader2, Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Brand name must be at least 2 characters.' }),
  model: z.string().min(1, { message: 'Model name is required.' }),
});

export function SpecGenerationClient() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateMobileSpecOutput | null>(null);
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
    try {
      const response = await handleGenerateSpec(values);
      if (response.success && response.data) {
        setResult(response.data);
        toast({
          title: 'Success!',
          description: `Specifications for ${response.data.brand} ${response.data.model} generated.`,
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
                <Button type="submit" disabled={loading} className="w-full">
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Generated Specifications</CardTitle>
            {result && (
              <Button size="sm">
                <Save className="mr-2 h-4 w-4" />
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
              <div className="flex items-center justify-center h-96 text-center">
                <p className="text-muted-foreground">
                  Your generated specifications will appear here.
                </p>
              </div>
            )}
            {result && (
              <div className="space-y-4">
                {Object.entries(result).map(([key, value]) => (
                  <div key={key}>
                    <div className="grid grid-cols-3 gap-4">
                      <span className="font-semibold capitalize text-muted-foreground">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="col-span-2">{value}</span>
                    </div>
                    <Separator className="mt-2" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
