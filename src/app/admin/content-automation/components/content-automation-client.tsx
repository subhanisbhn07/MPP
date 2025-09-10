'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateContent } from '../actions';
import type { PhoneListsOutput, CommunityContentOutput, NewsAndBlogOutput } from '@/ai/flows/generate-homepage-content';

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
    { id: 'phoneLists', title: 'Phone Categories', icon: Smartphone, description: 'Generates all curated phone lists like Trending, Flagship, iOS, Android, etc.' },
    { id: 'communityContent', title: 'Community & Events', icon: Calendar, description: 'Generates the Upcoming Calendar, Guides, and Leaks & Rumors sections.' },
    { id: 'newsAndBlog', title: 'News & Blog', icon: Newspaper, description: 'Generates the main news grid and the list of blog posts.' },
];

export function ContentAutomationClient() {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<{ [key: string]: GeneratedContent }>({});
  const { toast } = useToast();

  async function handleGenerate(sectionId: string) {
    setLoading(sectionId);
    setResults(prev => ({ ...prev, [sectionId]: {} }));

    try {
      const response = await handleGenerateContent(sectionId);
      if (response.success && response.data) {
        setResults(prev => ({ ...prev, [sectionId]: response.data }));
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
    } finally {
      setLoading(null);
    }
  }
  
  const ICONS: { [key: string]: React.ElementType } = {
      trendingPhones: Smartphone, latestPhones: Smartphone, flagshipPhones: Smartphone,
      performancePhones: Smartphone, batteryPhones: Smartphone, cameraPhones: Smartphone,
      foldablePhones: Smartphone, ruggedPhones: Smartphone, uniquePhones: Smartphone,
      iosPhones: Smartphone, androidPhones: Smartphone, upcomingEvents: Calendar,
      guides: BookOpen, leaks: Rss, blogPosts: BookOpen, news: Newspaper,
  }

  const renderContent = (key: string, content: any) => {
     if (!content || Object.keys(content).length === 0) return null;
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
    <div className="space-y-8">
        <div className="flex items-start gap-2 text-sm text-muted-foreground mt-4 p-3 bg-muted/50 rounded-md border border-dashed">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" />
            <p>
                This is a simulation. In a real application, you would connect this to a database (like Firestore) to save and publish the staged content.
            </p>
        </div>

        {SECTIONS.map((section) => (
            <Card key={section.id}>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <CardTitle className="flex items-center gap-3">
                                <section.icon className="w-6 h-6" /> {section.title}
                            </CardTitle>
                            <CardDescription className="mt-2">{section.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button onClick={() => handleGenerate(section.id)} disabled={!!loading} className="w-full sm:w-auto">
                            {loading === section.id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="mr-2 h-4 w-4" />
                            )}
                            Generate
                            </Button>
                            {results[section.id] && Object.keys(results[section.id]).length > 0 && (
                                <Button size="sm" variant="secondary">
                                    <Save className="mr-2 h-4 w-4" />
                                    Publish
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading === section.id && (
                    <div className="flex flex-col items-center justify-center h-60 space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">Generating... this may take a few moments.</p>
                    </div>
                    )}
                    {results[section.id] && Object.keys(results[section.id]).length > 0 && (
                    <Accordion type="multiple" className="w-full" defaultValue={Object.keys(results[section.id])}>
                        {Object.entries(results[section.id]).map(([category, content]) => {
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
                    {!loading && (!results[section.id] || Object.keys(results[section.id]).length === 0) && (
                        <div className="flex items-center justify-center h-24 text-center border-dashed border-2 rounded-md">
                            <p className="text-muted-foreground">
                                Click "Generate" to stage new content for this section.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        ))}
    </div>
  );
}
