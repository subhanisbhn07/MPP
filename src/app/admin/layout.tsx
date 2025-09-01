'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Home,
  Smartphone,
  Sparkles,
  Newspaper,
  PenSquare,
  BarChart2,
  FileUp,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
             <Logo />
             <span className="text-lg font-semibold">Admin Panel</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin')}
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
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-4">
             <SidebarTrigger className="md:hidden" />
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
