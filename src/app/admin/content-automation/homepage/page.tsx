
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateHomepageContent } from '../actions';
import { PhoneListsSchema, CommunityContentSchema, NewsAndBlogSchema } from '@/ai/schemas/homepage-content';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Save, AlertTriangle } from "lucide-react";
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Type definitions for the generated content
type GeneratedPhoneList = { brand: string; model: string; }[];
type GeneratedEvents = { date: string; month: string; title: string; description: string; }[];
type GeneratedGuides = { badge: string; title: string; }[];
type GeneratedLeaks = { badge: string; title: string; }[];
type GeneratedBlogPosts = { image: string; badge: string; title: string; excerpt: string; }[];
type GeneratedNews = any[]; // Using 'any' for simplicity as it's complex

type StagedContent = {
  trendingPhones?: GeneratedPhoneList;
  latestPhones?: GeneratedPhoneList;
  flagshipPhones?: GeneratedPhoneList;
  performancePhones?: GeneratedPhoneList;
  batteryPhones?: GeneratedPhoneList;
  cameraPhones?: GeneratedPhoneList;
  foldablePhones?: GeneratedPhoneList;
  ruggedPhones?: GeneratedPhoneList;
  uniquePhones?: GeneratedPhoneList;
  iosPhones?: GeneratedPhoneList;
  androidPhones?: GeneratedPhoneList;
  upcomingEvents?: GeneratedEvents;
  guides?: GeneratedGuides;
  leaks?: GeneratedLeaks;
  blogPosts?: GeneratedBlogPosts;
  news?: GeneratedNews;
};

// Configuration for each content section card
const contentSections = [
    { id: 'trendingPhones', title: 'Trending Phones', description: 'A list of 6 trending phones currently popular in the market.', schema: PhoneListsSchema },
    { id: 'latestPhones', title: 'Latest Launches', description: 'A list of the 6 most recently launched phones.', schema: PhoneListsSchema },
    { id: 'flagshipPhones', title: 'Flagship Phones', description: 'A list of 6 flagship-tier phones.', schema: PhoneListsSchema },
    { id: 'performancePhones', title: 'Best for Gaming', description: 'A list of 6 phones best for gaming and performance.', schema: PhoneListsSchema },
    { id: 'batteryPhones', title: 'Longest Battery Life', description: 'A list of 6 phones with the best battery life.', schema: PhoneListsSchema },
    { id: 'cameraPhones', title: 'Top Camera Phones', description: 'A list of 6 phones with the best camera systems.', schema: PhoneListsSchema },
    { id: 'foldablePhones', title: 'Foldable Phones', description: 'A list of 6 popular foldable phones.', schema: PhoneListsSchema },
    { id: 'ruggedPhones', title: 'Rugged & Durable Phones', description: 'A list of 6 rugged and durable phones.', schema: PhoneListsSchema },
    { id: 'uniquePhones', title: 'Unique & Niche Phones', description: 'A list of 6 unique or niche-market phones.', schema: PhoneListsSchema },
    { id: 'iosPhones', title: 'Top iOS Phones', description: 'A list of the top 6 iOS phones available.', schema: PhoneListsSchema },
    { id: 'androidPhones', title: 'Top Android Phones', description: 'A list of the top 6 Android phones available.', schema: PhoneListsSchema },
    { id: 'upcomingEvents', title: 'Upcoming Calendar', description: 'A list of upcoming mobile phone launch events.', schema: CommunityContentSchema },
    { id: 'guides', title: 'Guides', description: 'A list of interesting guides or deep-dive topics.', schema: CommunityContentSchema },
    { id: 'leaks', title: 'Leaks & Rumors', description: 'A list of recent and interesting leaks or rumors.', schema: CommunityContentSchema },
    { id: 'blogPosts', title: 'Blog Posts', description: 'A list of blog posts on various topics.', schema: NewsAndBlogSchema },
    { id: 'news', title: 'News Articles', description: 'A list of recent news articles.', schema: NewsAndBlogSchema },
];


export default function HomepageContentPage() {
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const [stagedContent, setStagedContent] = useState<StagedContent>({});
  const { toast } = useToast();

  async function handleGenerate(sectionId: string) {
    setLoadingSection(sectionId);
    
    // Find the correct schema for the section
    const sectionConfig = contentSections.find(s => s.id === sectionId);
    if (!sectionConfig) {
        toast({
            variant: 'destructive',
            title: 'An error occurred.',
            description: 'Invalid content section specified.',
        });
        setLoadingSection(null);
        return;
    }

    try {
      const response = await handleGenerateHomepageContent({ section: sectionId, parentSchema: sectionConfig.schema });
      if (response.success && response.data) {
        setStagedContent((prev) => ({ ...prev, ...response.data }));
        toast({
          title: 'Success!',
          description: `Staged new content for ${sectionConfig.title}.`,
        });
      } else {
        throw new Error(response.error || 'AI flow did not return valid content.');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: error.message || 'Failed to generate content. Please try again.',
      });
    } finally {
      setLoadingSection(null);
    }
  }

  const handlePublish = (sectionId: keyof StagedContent) => {
    // In a real application, this would save the specific section's data to a database.
    console.log(`Publishing ${sectionId}:`, stagedContent[sectionId]);
    toast({
      title: 'Published!',
      description: `The new content for ${sectionId} has been published.`,
    });
    
    // Remove the published section from the staging area
    setStagedContent(prev => {
        const newState = {...prev};
        delete newState[sectionId];
        return newState;
    });
  };

  const renderStagedContent = (sectionId: keyof StagedContent, content: any) => {
     if (!content || (Array.isArray(content) && content.length === 0)) {
        return <p className="text-muted-foreground text-sm">No content staged.</p>;
    }
    
    // Render based on sectionId
    switch (sectionId) {
        case 'trendingPhones':
        case 'latestPhones':
        case 'flagshipPhones':
        case 'performancePhones':
        case 'batteryPhones':
        case 'cameraPhones':
        case 'foldablePhones':
        case 'ruggedPhones':
        case 'uniquePhones':
        case 'iosPhones':
        case 'androidPhones':
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {(content as GeneratedPhoneList).map((phone, i) => <Badge key={i} variant="secondary">{`${phone.brand} ${phone.model}`}</Badge>)}
                </div>
            );
        case 'upcomingEvents':
             return (
                <ul className="space-y-2">
                    {(content as GeneratedEvents).map((event, i) => (
                        <li key={i} className="text-sm p-2 bg-muted rounded-md">{event.date} {event.month}: {event.title}</li>
                    ))}
                </ul>
            );
        case 'guides':
             return (
                <ul className="space-y-2">
                    {(content as GeneratedGuides).map((guide, i) => (
                         <li key={i} className="text-sm p-2 bg-muted rounded-md"><Badge className="mr-2">{guide.badge}</Badge>{guide.title}</li>
                    ))}
                </ul>
            );
        case 'leaks':
             return (
                <ul className="space-y-2">
                    {(content as GeneratedLeaks).map((leak, i) => (
                         <li key={i} className="text-sm p-2 bg-muted rounded-md"><Badge variant="destructive" className="mr-2">{leak.badge}</Badge>{leak.title}</li>
                    ))}
                </ul>
            );
        case 'blogPosts':
             return (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     {(content as GeneratedBlogPosts).map((post, i) => (
                         <div key={i} className="flex items-start gap-3 p-2 border rounded-md">
                           <Image src={post.image} width={80} height={60} alt={post.title} className="rounded-md aspect-video object-cover" data-ai-hint="mobile technology" />
                           <div>
                            <Badge>{post.badge}</Badge>
                            <p className="text-sm font-semibold mt-1">{post.title}</p>
                           </div>
                         </div>
                     ))}
                 </div>
             );
        case 'news':
             return <p className="text-sm text-muted-foreground">News staging is handled on the News Management page.</p>

        default:
            return <p className="text-sm text-muted-foreground">Preview not available for this section.</p>;
    }
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Homepage Content Automation</h1>
        <p className="text-muted-foreground">
          Use AI to generate and refresh all dynamic content on your homepage with one click.
        </p>
      </div>

       <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Simulation</AlertTitle>
          <AlertDescription>
            This is a simulation. In a real application, you would connect this to a database (like Firestore) to save and publish the staged content, which would then be displayed on the homepage. The homepage currently uses static data.
          </AlertDescription>
        </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contentSections.map(section => (
            <Card key={section.id}>
                <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Click "Generate" to stage new content.</p>

                    {stagedContent[section.id as keyof StagedContent] && (
                         <Accordion type="single" collapsible className="w-full" >
                           <AccordionItem value="item-1">
                             <AccordionTrigger className="text-sm">View Generated Content</AccordionTrigger>
                             <AccordionContent className="pt-2">
                               {renderStagedContent(section.id as keyof StagedContent, stagedContent[section.id as keyof StagedContent])}
                             </AccordionContent>
                           </AccordionItem>
                         </Accordion>
                    )}

                    <div className="flex justify-end gap-2">
                         <Button onClick={() => handleGenerate(section.id)} disabled={loadingSection === section.id}>
                            {loadingSection === section.id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="mr-2 h-4 w-4" />
                            )}
                            {loadingSection === section.id ? 'Generating...' : 'Generate'}
                        </Button>
                        {stagedContent[section.id as keyof StagedContent] && (
                             <Button onClick={() => handlePublish(section.id as keyof StagedContent)} variant="secondary">
                                <Save className="mr-2 h-4 w-4" />
                                Publish
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
