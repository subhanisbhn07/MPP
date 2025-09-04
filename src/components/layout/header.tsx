
'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  UserCircle,
  Shield,
  Star,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '../ui/card';
import Image from 'next/image';

export function Header() {
  const { user, loading, signOut } = useAuth();
  const baseNavLinks = [
    { href: '/compare', label: 'Compare' },
    { href: '/categories', label: 'Brands' },
    { href: '/news', label: 'News' },
    { href: '/guides', label: 'Guides' },
    { href: '/deals', label: 'Deals' },
  ];
  
  const navLinks = user ? [...baseNavLinks, { href: '/admin', label: 'Admin' }] : baseNavLinks;

  return (
    <header className="w-full">
      <div className="px-4 pt-4">
         <Card className="rounded-2xl shadow-sm bg-primary text-primary-foreground">
            <div className="flex h-16 items-center justify-between px-4">
              {/* Mobile Menu & Logo */}
              <div className="flex items-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden mr-2 hover:bg-primary/80">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col">
                     <SheetTitle className="sr-only">Main Menu</SheetTitle>
                    <div>
                      <Link href="/" className="flex items-center space-x-2">
                        <Logo />
                        <span className="font-bold">MobilePhonesPro</span>
                      </Link>
                      <div className="mt-6 flex flex-col space-y-4">
                        {navLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center text-lg font-medium transition-colors hover:text-primary"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto pt-6">
                        <div className="rounded-lg bg-muted p-4 text-center">
                            <p className="text-xs font-semibold text-muted-foreground mb-2">SPONSORED</p>
                             <div className="relative aspect-video w-full mb-2">
                                <Image 
                                    src="https://picsum.photos/400/225" 
                                    alt="Sponsored product" 
                                    fill
                                    className="rounded-md object-cover"
                                    data-ai-hint="mobile phone"
                                />
                             </div>
                            <h4 className="font-semibold text-foreground">Galaxy S25 Pre-order</h4>
                            <p className="text-sm text-muted-foreground mb-3">Get it first on day one!</p>
                            <Button size="sm" className="w-full">Learn More</Button>
                        </div>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Desktop Logo */}
                <div className="hidden md:flex">
                  <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Logo />
                    <span className="font-bold">MobilePhonesPro</span>
                  </Link>
                </div>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition-colors hover:text-primary-foreground/80"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Right side icons */}
              <div className="flex items-center justify-end space-x-2">
                <Button variant="ghost" size="icon" asChild className="hover:bg-primary/80">
                  <Link href="/search">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Link>
                </Button>
                {user && (
                  <Button variant="ghost" size="icon" asChild className="hover:bg-primary/80">
                    <Link href="/notifications">
                      <Bell className="h-5 w-5" />
                      <span className="sr-only">Notifications</span>
                    </Link>
                  </Button>
                )}

                {loading && <Skeleton className="h-10 w-24" />}
                {!loading &&
                  (user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="relative h-8 w-8 rounded-full hover:bg-primary/80"
                        >
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={user.photoURL || undefined}
                              alt={user.displayName || 'User'}
                              data-ai-hint="person face"
                            />
                            <AvatarFallback>
                              {user.displayName?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {user.displayName}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/profile">
                            <UserCircle className="mr-2" />
                            <span>Profile</span>
                          </Link>
                        </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                          <Link href="/admin">
                            <Shield className="mr-2" />
                            <span>Admin Panel</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={signOut}>
                          <LogOut className="mr-2" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button asChild style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90">
                      <Link href="/login">
                        <User className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                    </Button>
                  ))}
              </div>
            </div>
         </Card>
      </div>
    </header>
  );
}
