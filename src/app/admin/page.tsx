
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Smartphone, PenSquare, FileUp, BarChart2, Newspaper, Bot, Calendar, Rss, ArrowRight, UserPlus, FileText, CheckCircle } from 'lucide-react';
import Link from "next/link";
import { allPhones } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminDashboard() {
  
  const totalPhones = allPhones.length;
  const totalArticles = 57; // Placeholder
  const aiGenerations = 218; // Placeholder

  const recentActivity = [
    {
      icon: UserPlus,
      description: "New user signed up: alex@example.com",
      time: "2m ago",
      user: { name: "Alex" }
    },
    {
      icon: FileText,
      description: "AI generated 5 new news articles.",
      time: "15m ago",
      user: { name: "Admin" }
    },
    {
      icon: CheckCircle,
      description: "Published 3 new blog posts.",
      time: "1h ago",
      user: { name: "Admin" }
    },
    {
      icon: Smartphone,
      description: "Specs for 'Galaxy S25' were updated.",
      time: "3h ago",
      user: { name: "AI Bot" }
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a quick overview of your site.</p>
      </div>

      {/* Stats Grid */}
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

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button asChild className="w-full justify-start">
                        <Link href="/admin/phones/edit/new"><Smartphone className="mr-2" /> Add New Phone</Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full justify-start">
                        <Link href="/admin/news"><Newspaper className="mr-2" /> Generate News</Link>
                    </Button>
                     <Button asChild variant="secondary" className="w-full justify-start">
                        <Link href="/admin/blog"><PenSquare className="mr-2" /> Write a Blog Post</Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full justify-start">
                        <Link href="/admin/content-automation"><Bot className="mr-2" /> Automate Homepage</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A log of recent events across the admin panel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback><activity.icon className="h-4 w-4" /></AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{activity.description}</p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
