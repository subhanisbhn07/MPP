
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
  SidebarInput,
} from '@/components/ui/sidebar';
import {
  Home,
  Smartphone,
  Sparkles,
  FileUp,
  BarChart2,
  PenSquare,
  Newspaper,
  Shield,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import { useState, useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/phones', label: 'Manage Phones', icon: Smartphone },
    { href: '/admin/generate-spec', label: 'AI Spec Generator', icon: Sparkles },
    { href: '/admin/bulk-upload', label: 'Bulk Upload', icon: FileUp },
    { href: '/admin/seo', label: 'SEO', icon: BarChart2 },
    { href: '/admin/blog', label: 'Blog', icon: PenSquare },
    { href: '/admin/news', label: 'News', icon: Newspaper },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/30">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-semibold text-lg">Admin Panel</span>
            </div>
             <div className='relative mt-2'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <SidebarInput placeholder='Search...' className='pl-9' />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      // Special case for the root dashboard route
                      item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href)
                    }
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Shield />
                    <span>Back to Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col">
            <header className="p-4 border-b bg-background sticky top-0 z-20">
                 {isClient && <SidebarTrigger />}
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
