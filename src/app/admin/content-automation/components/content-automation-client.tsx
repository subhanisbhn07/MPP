
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateContent } from '../actions';
import type { PhoneListsOutput, CommunityContentOutput, NewsAndBlogOutput } from '@/ai/schemas/homepage-content';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Loader2, Save, Sparkles, AlertTriangle, BookOpen, Calendar, Newspaper, Smartphone, Rss } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

type GeneratedContent = PhoneListsOutput | CommunityContentOutput | NewsAndBlogOutput;

// Function to convert camelCase to Title Case
const toTitleCase = (str: string) => {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const SECTIONS = [
    { id: 'trendingPhones', title: 'Trending Phones', icon: Smartphone, description: 'A list of 6 trending phones currently popular in the market.' },
    { id: 'latestPhones', title: 'Latest Launches', icon: Smartphone, description: 'A list of the 6 most recently launched phones.' },
    { id: 'flagshipPhones', title: 'Flagship Phones', icon: Smartphone, description: 'A list of 6 flagship-tier phones.' },
    { id: 'performancePhones', title: 'Best for Gaming', icon: Smartphone, description: 'A list of 6 phones best for gaming and performance.' },
    { id: 'batteryPhones', title: 'Longest Battery Life', icon: Smartphone, description: 'A list of 6 phones with the best battery life.' },
    { id: 'cameraPhones', title: 'Top Camera Phones', icon: Smartphone, description: 'A list of 6 phones with the best camera systems.' },
    { id: 'foldablePhones', title: 'Foldable Phones', icon: Smartphone, description: 'A list of 6 popular foldable phones.' },
    { id: 'iosPhones', title: 'Top iOS Phones', icon: Smartphone, description: 'A list of the top 6 iOS phones available.' },
    { id: 'androidPhones', title: 'Top Android Phones', icon: Smartphone, description: 'A list of the top 6 Android phones available.' },
    { id: 'upcomingEvents', title: 'Upcoming Calendar', icon: Calendar, description: 'A list of upcoming mobile phone launch events.' },
    { id: 'guides', title: 'Guides', icon: BookOpen, description: 'A list of interesting guides or deep-dive topics.' },
    { id: 'leaks', title: 'Leaks & Rumors', icon: Rss, description: 'A list of recent and interesting leaks or rumors.' },
    { id: 'blogPosts', title: 'Blog Posts', icon: BookOpen, description: 'A list of blog posts on various topics.' },
    { id: 'news', title: 'News Articles', icon: Newspaper, description: 'A list of recent news articles.' },
];

export function ContentAutomationClient() {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<{ [key: string]: any }>({});
  const { toast } = useToast();

  async function handleGenerate(sectionId: string) {
    setLoading(sectionId);
    setResults(prev => ({ ...prev, [sectionId]: null }));

    try {
      const response = await handleGenerateContent(sectionId);
      if (response.success && response.data) {
        setResults(prev => ({ ...prev, [sectionId]: response.data[sectionId] }));
        toast({
          title: 'Success!',
          description: `New content has been generated for ${SECTIONS.find(s => s.id === sectionId)?.title}.`,
        });
      } else {
        throw new Error(response.error || 'An unknown error occurred.');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: error.message || `Failed to generate content for ${sectionId}. Please try again.`,
      });
       setResults(prev => ({ ...prev, [sectionId]: null }));
    } finally {
      setLoading(null);
    }
  }

  const renderContent = (key: string, content: any) => {
     if (!content || (Array.isArray(content) && content.length === 0)) return null;

     if (key.toLowerCase().includes('phone')) {
         return (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                 {content.map((phone: any, index: number) => (
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
           {content.map((item: any, index: number) => (
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
    <div className="space-y-8">
        <div className="flex items-start gap-2 text-sm text-muted-foreground mt-4 p-3 bg-muted/50 rounded-md border border-dashed">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" />
            <p>
                This is a simulation. In a real application, you would connect this to a database (like Firestore) to save and publish the staged content, which would then be displayed on the homepage. The homepage currently uses static data.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECTIONS.map((section) => (
            <Card key={section.id} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-start gap-3">
                       <section.icon className="w-6 h-6 flex-shrink-0 mt-1" />
                        <div>
                            <CardTitle>{section.title}</CardTitle>
                            <CardDescription className="mt-1 text-xs">{section.description}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    {loading === section.id ? (
                        <div className="flex flex-col items-center justify-center h-40 space-y-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-muted-foreground text-sm">Generating...</p>
                        </div>
                    ) : results[section.id] ? (
                       <Accordion type="single" collapsible className="w-full">
                           <AccordionItem value="item-1">
                             <AccordionTrigger className="text-sm">View Generated Content</AccordionTrigger>
                             <AccordionContent>
                               {renderContent(section.id, results[section.id])}
                             </AccordionContent>
                           </AccordionItem>
                        </Accordion>
                    ) : (
                        <div className="flex items-center justify-center h-24 text-center border-dashed border-2 rounded-md">
                            <p className="text-muted-foreground text-sm">
                                Click "Generate" to stage new content.
                            </p>
                        </div>
                    )}
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                   <div className="flex items-center gap-2">
                        <Button onClick={() => handleGenerate(section.id)} disabled={!!loading} className="w-full">
                        {loading === section.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        {loading === section.id ? 'Generating...' : 'Generate'}
                        </Button>
                        {results[section.id] && (
                            <Button size="sm" variant="secondary">
                                <Save className="mr-2 h-4 w-4" />
                                Publish
                            </Button>
                        )}
                   </div>
                </div>
            </Card>
        ))}
        </div>
    </div>
  );
}

