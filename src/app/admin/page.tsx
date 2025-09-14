import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Smartphone, PenSquare, FileUp, BarChart2, Newspaper, Bot, Calendar, Rss } from 'lucide-react';
import Link from "next/link";
import { allPhones } from "@/lib/data";

export default function AdminDashboard() {
  
  const totalPhones = allPhones.length;
  const totalArticles = 57; // Placeholder
  const aiGenerations = 218; // Placeholder

  const navTiles = [
    { href: '/admin/phones', label: 'Manage Phones', icon: Smartphone, description: 'Add, edit, and view all phone entries.' },
    { href: '/admin/generate-spec', label: 'AI Spec Generator', icon: Sparkles, description: 'Create new phone specs with AI assistance.' },
    { href: '/admin/content-automation', label: 'Homepage Content AI', icon: Bot, description: 'Automate homepage content sections.' },
    { href: '/admin/blog', label: 'Blog & Guides', icon: PenSquare, description: 'Write and manage articles and helpful guides.' },
    { href: '/admin/news', label: 'News Articles', icon: Newspaper, description: 'Manage breaking news and industry updates.' },
    { href: '/admin/events', label: 'Upcoming Events', icon: Calendar, description: 'Manage the upcoming events calendar.' },
    { href: '/admin/leaks', label: 'Leaks & Rumors', icon: Rss, description: 'Manage leaks and rumors for the homepage.' },
    { href: '/admin/seo', label: 'SEO Management', icon: BarChart2, description: 'Optimize pages for search engines.' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a quick overview and your command center.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Phones</CardTitle>
             <div className="p-2 bg-primary/10 rounded-md">
                <Smartphone className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPhones}</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Articles</CardTitle>
            <div className="p-2 bg-primary/10 rounded-md">
                <PenSquare className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Generations</CardTitle>
            <div className="p-2 bg-primary/10 rounded-md">
                <Sparkles className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiGenerations}</div>
            <p className="text-xs text-muted-foreground">Usage this month</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Admin Tools</h2>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {navTiles.map(tile => (
              <Link href={tile.href} key={tile.href}>
                <Card className="hover:bg-muted/50 transition-colors h-full">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-md">
                        <tile.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{tile.label}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tile.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
