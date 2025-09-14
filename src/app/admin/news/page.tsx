
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateNews } from './actions';
import type { NewsPost } from '@/ai/schemas/homepage-content';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles, Loader2, Save, Edit } from "lucide-react";
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';


type GeneratedNews = NewsPost[];

export default function NewsManagementPage() {
  const [loading, setLoading] = useState(false);
  const [stagedNews, setStagedNews] = useState<GeneratedNews | null>(null);
  const { toast } = useToast();

  async function handleGenerate() {
    setLoading(true);
    setStagedNews(null);

    try {
      const response = await handleGenerateNews();
      if (response.success && response.data) {
        setStagedNews(response.data);
        toast({
          title: 'Success!',
          description: `Staged ${response.data.length} new news articles for review.`,
        });
      } else {
        throw new Error(response.error || 'AI flow did not return news articles.');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: error.message || 'Failed to generate news content. Please try again.',
      });
      setStagedNews(null);
    } finally {
      setLoading(false);
    }
  }

  const handlePublish = () => {
    // In a real application, this would save `stagedNews` to a database (e.g., Firestore).
    // The live site would then fetch its news from that database.
    console.log("Publishing staged news:", stagedNews);
    toast({
      title: 'Published!',
      description: 'The staged news articles have been published to the live site.',
    });
    setStagedNews(null); // Clear the stage after publishing
  };
  
  const renderStagedContent = (content: GeneratedNews) => {
     return (
        <div className="space-y-3">
           {content.map((item, index) => (
               <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-x-4 items-center text-sm p-3 border rounded-md bg-muted/50">
                   <div className="relative aspect-video mb-2 md:mb-0 md:col-span-1">
                      <Image src={item.image} alt={item.title} fill className="object-cover rounded-md" data-ai-hint="mobile technology" />
                   </div>
                   <div className="md:col-span-3">
                      <div className='flex items-center gap-2'>
                        {item.isFeatured && <Badge variant="destructive">Featured</Badge>}
                        <p className="text-xs font-bold text-primary">{item.badge}</p>
                      </div>
                      <p className="font-semibold mt-1">{item.title}</p>
                   </div>
                   <div className="md:col-span-1 flex justify-end">
                     <Button asChild variant="outline" size="sm">
                       <Link href={`/admin/news/edit/${item.id}`}>
                         <Edit className="mr-2 h-4 w-4" />
                         Edit
                       </Link>
                     </Button>
                   </div>
               </div>
           ))}
        </div>
     )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage all news articles and updates.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button onClick={handleGenerate} disabled={loading}>
            {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Sparkles className="mr-2 h-4 w-4" />
            )}
            {loading ? 'Generating...' : 'Generate with AI'}
            </Button>
            <Button>
                <PlusCircle className="mr-2" />
                New Manual Post
            </Button>
        </div>
      </div>

      {stagedNews && (
        <Card>
          <CardHeader className='flex-row items-center justify-between'>
            <div>
              <CardTitle>Staged Articles for Review</CardTitle>
              <CardDescription>
                Review and edit the AI-generated articles below before publishing.
              </CardDescription>
            </div>
            <Button onClick={handlePublish}>
              <Save className="mr-2" />
              Publish {stagedNews.length} Articles
            </Button>
          </CardHeader>
          <CardContent>
             <Accordion type="single" collapsible className="w-full" defaultValue='item-1'>
                 <AccordionItem value="item-1">
                   <AccordionTrigger className="text-sm">View Generated Articles</AccordionTrigger>
                   <AccordionContent>
                      {renderStagedContent(stagedNews)}
                   </AccordionContent>
                 </AccordionItem>
              </Accordion>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Published Articles</CardTitle>
          <CardDescription>A list of all news articles currently live on your site.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No news articles found.</p>
            <Button variant="link">Create your first article</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
