
'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

// In a real app, you would fetch this data from your 'staged' store (e.g., Firestore or a local file)
// For this simulation, we'll use localStorage to persist the staged data across reloads.

interface EditNewsPageProps {
  params: {
    id: string;
  };
}

export default function EditNewsPage({ params }: EditNewsPageProps) {
  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a simulation. In a real app, you would fetch the staged article by its ID.
    // Here, we try to retrieve it from localStorage.
    const stagedNewsRaw = localStorage.getItem('stagedNews');
    if (stagedNewsRaw) {
      const stagedNews = JSON.parse(stagedNewsRaw);
      const foundArticle = stagedNews.find((a: any) => a.id === params.id);
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        notFound();
      }
    } else {
       // If no staged data, you might redirect or show an error.
       // For now, we'll just indicate it's not found after loading.
    }
    setLoading(false);
  }, [params.id]);
  
  const handleSave = (event: React.FormEvent) => {
      event.preventDefault();
      // Logic to save the updated article would go here.
      console.log("Saving article:", article);
  }

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!article) {
    return (
        <div className="space-y-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Article Not Found</h1>
            <p className="text-muted-foreground">
                The requested article could not be found in the staging area. It might have been published or deleted.
            </p>
        </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit News Article</h1>
          <p className="text-muted-foreground">
            Review and edit the AI-generated content before publishing.
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Article Metadata</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="badge">Badge</Label>
              <Input
                id="badge"
                value={article.badge}
                onChange={(e) => setArticle({ ...article, badge: e.target.value })}
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={article.image}
                onChange={(e) => setArticle({ ...article, image: e.target.value })}
              />
            </div>
            <div className="md:col-span-3">
                 <Image src={article.image} alt="Article image" width={300} height={150} className="rounded-md object-cover aspect-video" data-ai-hint="mobile technology" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Article Content</CardTitle>
            <CardDescription>The full article body in Markdown format.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={article.content}
              onChange={(e) => setArticle({ ...article, content: e.target.value })}
              className="min-h-[500px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
