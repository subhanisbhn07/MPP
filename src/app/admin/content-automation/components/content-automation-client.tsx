'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateHomepageContent } from '../actions';
import type { GenerateHomepageContentOutput } from '@/ai/flows/generate-homepage-content';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Loader2, Save, Sparkles, AlertTriangle, BookOpen, Calendar, Newspaper, Smartphone, Rss } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

// Function to convert camelCase to Title Case
const toTitleCase = (str: string) => {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export function ContentAutomationClient() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateHomepageContentOutput | null>(null);
  const { toast } = useToast();

  async function handleGenerate() {
    setLoading(true);
    setResult(null);
    try {
      const response = await handleGenerateHomepageContent();
      if (response.success && response.data) {
        setResult(response.data);
        toast({
          title: 'Success!',
          description: `New homepage content has been generated.`,
        });
      } else {
        throw new Error(response.error || 'An unknown error occurred.');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: error.message || 'Failed to generate content. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }
  
  const ICONS: { [key: string]: React.ElementType } = {
      trendingPhones: Smartphone,
      latestPhones: Smartphone,
      flagshipPhones: Smartphone,
      performancePhones: Smartphone,
      batteryPhones: Smartphone,
      cameraPhones: Smartphone,
      foldablePhones: Smartphone,
      ruggedPhones: Smartphone,
      uniquePhones: Smartphone,
      iosPhones: Smartphone,
      androidPhones: Smartphone,
      upcomingEvents: Calendar,
      guides: BookOpen,
      leaks: Rss,
      blogPosts: BookOpen,
      news: Newspaper,
  }

  const renderContent = (key: string, content: any) => {
     if (!Array.isArray(content)) return <p>{String(content)}</p>;

     if (key.toLowerCase().includes('phone')) {
         return (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                 {content.map((phone, index) => (
                     <div key={index} className="text-xs p-2 border rounded-md bg-muted/50">
                         <p className="font-bold">{phone.brand}</p>
                         <p className="text-muted-foreground">{phone.model}</p>
                     </div>
                 ))}
             </div>
         )
     }

     return (
        <div className="space-y-3">
           {content.map((item, index) => (
               <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-x-4 text-sm p-3 border rounded-md bg-muted/50">
                   {item.image && (
                      <div className="relative aspect-video mb-2 md:mb-0">
                         <Image src={item.image} alt={item.title} fill className="object-cover rounded-md" data-ai-hint="mobile technology" />
                      </div>
                   )}
                   <div className={item.image ? "md:col-span-2" : "md:col-span-3"}>
                      {item.badge && <p className="text-xs font-bold text-primary">{item.badge}</p>}
                      <p className="font-semibold">{item.title}</p>
                      {item.description && <p className="text-muted-foreground text-xs">{item.description}</p>}
                      {item.excerpt && <p className="text-muted-foreground text-xs">{item.excerpt}</p>}
                       <div className="flex items-center gap-2 text-xs text-muted-foreground">
                         {item.date && <p>{item.date} {item.month}</p>}
                       </div>
                   </div>
               </div>
           ))}
        </div>
     )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1 lg:sticky top-24">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Bot /> AI Content Generator
            </CardTitle>
            <CardDescription>
                Click the button to have AI generate and stage new content for all dynamic sections of the homepage. Review the content and then publish it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGenerate} disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Homepage Content
            </Button>
            <div className="flex items-start gap-2 text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded-md border border-dashed">
                <AlertTriangle className="w-8 h-8 flex-shrink-0" />
                <p>
                    This is a simulation. In a real application, you would connect this to a database (like Firestore) to save and publish the content.
                </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Staged Content</CardTitle>
            {result && (
              <Button size="sm">
                <Save className="mr-2 h-4 w-4" />
                Publish All Content
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating... this may take a few moments.</p>
              </div>
            )}
            {!loading && !result && (
              <div className="flex items-center justify-center h-96 text-center">
                <p className="text-muted-foreground">
                  Generated homepage content will appear here for your review.
                </p>
              </div>
            )}
            {result && (
              <Accordion type="multiple" className="w-full" defaultValue={Object.keys(result)}>
                {Object.entries(result).map(([category, content]) => {
                    const Icon = ICONS[category] || Sparkles;
                    return (
                       <AccordionItem value={category} key={category}>
                         <AccordionTrigger className="text-lg font-semibold capitalize">
                            <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-primary" />
                                {toTitleCase(category)}
                            </div>
                         </AccordionTrigger>
                         <AccordionContent>
                           {renderContent(category, content)}
                         </AccordionContent>
                       </AccordionItem>
                    )
                })}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
