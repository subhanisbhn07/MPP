
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

const pageTemplates = [
    { 
        id: 'homepage',
        title: 'Homepage',
        description: 'Metadata for the main landing page (/).',
        placeholders: {
            title: 'MobilePhonesPro | AI-Powered Phone Comparisons & Specs',
            description: 'Find the best mobile phone for you. Compare detailed specs, prices, and reviews for thousands of phones with our AI-powered tools.'
        }
    },
    { 
        id: 'phone-page',
        title: 'Phone Page Template',
        description: 'Template for individual phone pages. Use variables like {{brand}}, {{model}}, and {{price}}.',
        placeholders: {
            title: '{{brand}} {{model}} - Full Specs, Price & Review | MobilePhonesPro',
            description: 'Get the complete specifications for the {{brand}} {{model}}, including camera, battery, display, and performance details. Compare prices and find the best deals.'
        }
    },
    { 
        id: 'compare-page',
        title: 'Comparison Page Template',
        description: 'Template for comparison pages. Use variables like {{phone1_name}} and {{phone2_name}}.',
        placeholders: {
            title: '{{phone1_name}} vs {{phone2_name}} Comparison | MobilePhonesPro',
            description: 'Side-by-side comparison of the {{phone1_name}} and {{phone2_name}}. See which phone has better specs, camera, and performance.'
        }
    },
     { 
        id: 'search-page',
        title: 'Search Page',
        description: 'Metadata for the /search page.',
        placeholders: {
            title: 'Search & Filter Phones | MobilePhonesPro',
            description: 'Search for mobile phones by name, brand, or feature. Use advanced filters to find the perfect phone for your needs.'
        }
    },
    { 
        id: 'category-page',
        title: 'Category Page Template',
        description: 'Template for category pages like /category/best-camera-phones. Use {{category_name}}.',
        placeholders: {
            title: 'Best {{category_name}} of 2024 | MobilePhonesPro',
            description: 'Discover the top-rated {{category_name}}. See our curated list based on detailed testing and specifications.'
        }
    },
    { 
        id: 'brands-page',
        title: 'Brands Page',
        description: 'Metadata for the main /brands listing page.',
        placeholders: {
            title: 'Browse All Phone Brands | MobilePhonesPro',
            description: 'Explore a comprehensive list of all mobile phone manufacturers, from Apple and Samsung to Xiaomi and Google.'
        }
    },
     { 
        id: 'deals-page',
        title: 'Deals Page',
        description: 'Metadata for the /deals page.',
        placeholders: {
            title: 'Best Phone Deals & Discounts | MobilePhonesPro',
            description: 'Find the best deals and limited-time offers on top smartphones from all major brands.'
        }
    },
    {
        id: 'news-page',
        title: 'News Page',
        description: 'Metadata for the main /news listing page.',
        placeholders: {
            title: 'Latest Mobile Phone News & Updates | MobilePhonesPro',
            description: 'Stay up-to-date with the latest breaking news, announcements, and trends in the smartphone industry.'
        }
    },
     {
        id: 'guides-page',
        title: 'Guides Page',
        description: 'Metadata for the main /guides listing page.',
        placeholders: {
            title: 'Mobile Phone Guides & How-Tos | MobilePhonesPro',
            description: 'Expert guides, tips, and tutorials to help you choose and get the most out of your smartphone.'
        }
    },
     {
        id: 'events-page',
        title: 'Upcoming Events Page',
        description: 'Metadata for the upcoming phone launch events page.',
        placeholders: {
            title: 'Upcoming Phone Launch Events | MobilePhonesPro',
            description: 'Keep track of the most anticipated upcoming smartphone launch events and announcements from around the world.'
        }
    },
     {
        id: 'leaks-page',
        title: 'Leaks & Rumors Page',
        description: 'Metadata for the leaks and rumors page.',
        placeholders: {
            title: 'Latest Phone Leaks & Rumors | MobilePhonesPro',
            description: 'Get the inside scoop on unreleased phones with the latest leaks, rumors, and renders.'
        }
    },
    { 
        id: 'profile-page',
        title: 'User Profile Page',
        description: 'Metadata for the user /profile page.',
        placeholders: {
            title: 'Your Profile | MobilePhonesPro',
            description: 'Manage your profile, view your wishlist, and see your saved comparisons.'
        }
    },
     { 
        id: 'login-page',
        title: 'Login Page',
        description: 'Metadata for the /login page.',
        placeholders: {
            title: 'Sign In | MobilePhonesPro',
            description: 'Sign in to your MobilePhonesPro account to access your profile, wishlists, and more.'
        }
    },
]

export default function SeoManagementPage() {

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Simulating save for SEO settings:", data);
    // In a real app, you'd call a server action here to save to a database.
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO Management</h1>
        <p className="text-muted-foreground">
          Optimize metadata and content for better search engine rankings across all pages.
        </p>
      </div>

      <Accordion type="multiple" className="w-full space-y-4" defaultValue={['homepage']}>
        {pageTemplates.map(template => (
            <Card key={template.id}>
                <AccordionItem value={template.id} className="border-b-0">
                    <CardHeader>
                        <AccordionTrigger className="p-0 text-left">
                            <div className="flex-1">
                                <CardTitle>{template.title}</CardTitle>
                                <CardDescription className="mt-1">
                                    {template.description}
                                </CardDescription>
                            </div>
                        </AccordionTrigger>
                    </CardHeader>
                    <AccordionContent>
                        <form onSubmit={handleSave}>
                            <CardContent className="space-y-4">
                                <input type="hidden" name="templateId" value={template.id} />
                                <div className="space-y-2">
                                <Label htmlFor={`${template.id}-title`}>SEO Title</Label>
                                <Input id={`${template.id}-title`} name="title" defaultValue={template.placeholders.title} />
                                </div>
                                <div className="space-y-2">
                                <Label htmlFor={`${template.id}-description`}>Meta Description</Label>
                                <Textarea id={`${template.id}-description`} name="description" defaultValue={template.placeholders.description} className="min-h-24" />
                                </div>
                                <Button type="submit" size="sm">
                                    <Save className="mr-2 h-4 w-4"/>
                                    Save {template.title}
                                </Button>
                            </CardContent>
                        </form>
                    </AccordionContent>
                </AccordionItem>
            </Card>
        ))}
      </Accordion>
      
       <Card>
          <CardHeader>
            <CardTitle>Sitemap</CardTitle>
             <CardDescription>
              Manage your XML sitemap for search engines. This file tells crawlers which pages are important.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
              <p className="text-sm font-mono p-2 bg-muted rounded-md">/sitemap.xml</p>
              <Button variant="outline">Regenerate Sitemap</Button>
          </CardContent>
        </Card>
    </div>
  );
}
