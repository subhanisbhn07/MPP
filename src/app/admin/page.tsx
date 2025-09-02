import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Smartphone, PenSquare, ArrowRight, Activity, Edit, PlusCircle } from 'lucide-react';
import Link from "next/link";
import { allPhones } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


export default function AdminDashboard() {
  
  const totalPhones = allPhones.length;
  // Placeholder data for articles and generations
  const totalArticles = 57;
  const aiGenerations = 218;

  const quickLinks = [
    { href: '/admin/phones/add', label: 'Add New Phone', icon: PlusCircle },
    { href: '/admin/generate-spec', label: 'Generate with AI', icon: Sparkles },
    { href: '/admin/blog/new', label: 'Write a Post', icon: PenSquare },
  ];
  
  const recentPhones = allPhones.slice(0, 5);
  
  const recentActivities = [
    { type: 'AI Generation', description: 'Generated specs for iPhone 16 Pro', time: '2m ago' },
    { type: 'Blog Post', description: 'Published "Best Camera Phones of 2024"', time: '1h ago' },
    { type: 'Phone Edit', description: 'Updated price for Galaxy S24 Ultra', time: '3h ago' },
    { type: 'SEO Update', description: 'Updated meta tags for "Foldable Phones"', time: '5h ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a quick overview of your site.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
              <Card>
                 <CardHeader>
                    <CardTitle>Recent Phones</CardTitle>
                     <CardDescription>The 5 most recently added phones to the catalog.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Table>
                        <TableBody>
                            {recentPhones.map(phone => (
                                <TableRow key={phone.id}>
                                    <TableCell>
                                       <div className="flex items-center gap-4">
                                            <div className="relative h-16 w-12">
                                                <Image 
                                                    src={phone.image} 
                                                    alt={phone.model}
                                                    fill
                                                    className="rounded-md object-contain"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium">{phone.model}</p>
                                                <p className="text-sm text-muted-foreground">{phone.brand}</p>
                                            </div>
                                       </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/phones/edit/${phone.id}`}>
                                                <Edit className="mr-2 h-3 w-3" />
                                                Edit
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                  </CardContent>
              </Card>
          </div>
          <div className="lg:col-span-1 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        {quickLinks.map(link => (
                            <Button key={link.href} asChild variant="outline" className="justify-start">
                                <Link href={link.href}>
                                    <link.icon className="mr-2 h-4 w-4" />
                                    {link.label}
                                </Link>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <Avatar>
                                      <AvatarFallback>
                                        <Activity className="h-4 w-4 text-muted-foreground" />
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{activity.type}</p>
                                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
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
