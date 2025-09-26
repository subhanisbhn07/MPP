
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Save, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function HeroBannerManagementPage() {
  const [title, setTitle] = useState('Discover. Compare. Decide.');
  const [subtitle, setSubtitle] = useState('AI-updated specs, comparisons & SEO-friendly landing pages.');
  const [buttonText, setButtonText] = useState('Compare Mobiles');
  const { toast } = useToast();

  const handleSave = () => {
    console.log("Saving Hero Banner:", { title, subtitle, buttonText });
    toast({
      title: 'Hero Banner Saved!',
      description: 'The hero banner content has been updated.',
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hero Banner Management</h1>
          <p className="text-muted-foreground">Customize the main section of your homepage.</p>
        </div>
        <div className="flex gap-2">
            <Button size="lg" variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
            </Button>
            <Button size="lg" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-8 flex-1">
        {/* Left Side: Editor */}
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Hero Content</CardTitle>
                    <CardDescription>Update the text content for the main hero banner.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="hero-title">Main Title</Label>
                        <Input id="hero-title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="hero-subtitle">Subtitle</Label>
                        <Input id="hero-subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="hero-button">Button Text</Label>
                        <Input id="hero-button" value={buttonText} onChange={(e) => setButtonText(e.target.value)} />
                    </div>
                </CardContent>
            </Card>
        </div>
        
        {/* Right Side: Preview */}
        <div className="md:col-span-1">
          <Card className="bg-accent text-accent-foreground h-full">
            <div className="flex flex-col items-center justify-center text-center h-full p-8">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{title}</h1>
                <p className="max-w-[600px] md:text-xl mt-4">{subtitle}</p>
                <div className="mt-6">
                    <Button size="lg" variant="default">{buttonText}</Button>
                </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
