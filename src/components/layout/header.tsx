import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, Bell, ChevronDown, User } from 'lucide-react';
import { Logo } from '@/components/logo';

export function Header() {
  const mainNavLinks = [
    { href: '/brands', label: 'Brands', dropdown: true },
    { href: '/compare', label: 'Compare' },
    { href: '/upcoming', label: 'Upcoming' },
    { href: '/categories', label: 'Categories' },
    { href: '/news-guides', label: 'News/Guides' },
    { href: '/deals', label: 'Deals' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="font-bold">MobilePhonesPro</span>
            </Link>
            <div className="mt-6 flex flex-col space-y-4">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center text-lg font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Logo */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold">MobilePhonesPro</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center px-4">
          <div className="w-full max-w-md">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search brand, model, or feature..."
                  className="w-full pl-10"
                />
              </div>
            </form>
          </div>
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
          <Button asChild>
            <Link href="/login">
              <User className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Secondary Navigation */}
      <nav className="hidden md:flex justify-center border-t">
         <div className="container flex items-center space-x-6 text-sm font-medium h-12">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
                {link.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
              </Link>
            ))}
         </div>
      </nav>
    </header>
  );
}
