
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Logo } from '@/components/logo';
import {
  Home,
  Smartphone,
  Sparkles,
  Bot,
  PenSquare,
  Newspaper,
  Calendar,
  Rss,
  BarChart2,
  Settings,
  LayoutDashboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/phones', label: 'Manage Phones', icon: Smartphone },
  { href: '/admin/generate-spec', label: 'AI Spec Generator', icon: Sparkles },
  { href: '/admin/content-automation', label: 'Page Management', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog & Guides', icon: PenSquare },
  { href: '/admin/news', label: 'News Articles', icon: Newspaper },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/leaks', label: 'Leaks & Rumors', icon: Rss },
  { href: '/admin/seo', label: 'SEO', icon: BarChart2 },
];

export function AdminNav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  if (isMobile) {
    return (
      <nav className="grid gap-6 text-lg font-medium">
        <Link
          href="/admin"
          className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
        >
          <Logo className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">MobilePhonesPro</span>
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
              pathname.startsWith(item.href) && item.href !== '/admin' ? 'text-foreground' : pathname === '/admin' && item.href === '/admin' ? 'text-foreground' : ''
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <TooltipProvider>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/admin"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Logo className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">MobilePhonesPro</span>
        </Link>
        {navItems.map((item) => (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                  pathname.startsWith(item.href) && item.href !== '/admin' ? 'bg-accent text-accent-foreground' : pathname === '/admin' && item.href === '/admin' ? 'bg-accent text-accent-foreground' : ''
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
        <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </TooltipProvider>
  );
}
