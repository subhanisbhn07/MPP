

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, LayoutDashboard, Search, Smartphone, Star, Newspaper, FileText, Tag, BarChart, Calendar, Rss, Layers, Heading, PanelTop, PanelBottom, Menu } from "lucide-react";
import Link from "next/link";

const pages = [
    {
        title: "Menu Management",
        description: "Manage navigation links, logos, sitemaps, and other menu items for the header and footer.",
        icon: Menu,
        href: "#"
    },
    {
        title: "Hero Banner",
        description: "Customize the main heading, promotional text, and call-to-action on the homepage.",
        icon: Heading,
        href: "#"
    },
    {
        title: "Phone Category Section",
        description: "Manage all dynamic sections for the homepage and define content for category pages like 'Best Camera' or 'Gaming'.",
        icon: LayoutDashboard,
        href: "/admin/content-automation/homepage"
    },
    {
        title: "Phone Detail Pages",
        description: "Manage the database of all phones and their specifications.",
        icon: Smartphone,
        href: "/admin/phones"
    },
    {
        title: "Compare Page",
        description: "Manage settings for the side-by-side comparison page, such as default phones or featured comparisons.",
        icon: Layers,
        href: "/compare"
    },
    {
        title: "News Articles",
        description: "Create, edit, and publish news articles. Use AI to generate content.",
        icon: Newspaper,
        href: "/admin/news"
    },
    {
        title: "Blog & Guides",
        description: "Write and manage long-form blog posts and user guides.",
        icon: FileText,
        href: "/admin/blog"
    },
    {
        title: "Deals Page",
        description: "Manage and display current promotions and discounted phones.",
        icon: Tag,
        href: "#"
    },
    {
        title: "Brands Page",
        description: "Control the list and order of manufacturers displayed on the brands page.",
        icon: BarChart,
        href: "/brands"
    },
    {
        title: "Events Page",
        description: "Update the calendar with upcoming launch events and industry news.",
        icon: Calendar,
        href: "/admin/events"
    },
    {
        title: "Leaks & Rumors Page",
        description: "Post and manage the latest leaks and rumors in the mobile world.",
        icon: Rss,
        href: "/admin/leaks"
    },
     {
        title: "Search Page",
        description: "Configure search filters, sorting options, and featured results.",
        icon: Search,
        href: "/search"
    },
];

export default function PageBuilder() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Page Builder for MPP</h1>
        <p className="text-muted-foreground">
          Visually build and manage all pages of your MobilePhonesPro site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
            <Card key={page.title} className="flex flex-col hover:border-primary/50 transition-all">
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-muted rounded-md">
                           <page.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>{page.title}</CardTitle>
                            <CardDescription className="mt-1 text-xs leading-5">{page.description}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow flex items-end">
                    <Link href={page.href} className="flex items-center text-sm font-semibold text-primary">
                        Manage Page <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
