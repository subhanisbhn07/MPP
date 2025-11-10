'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl font-bold">MobilePhonesPro</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link href="/search" className="text-xs lg:text-sm font-medium hover:text-primary">
              Search
            </Link>
            <Link href="/compare" className="text-sm font-medium hover:text-primary">
              Compare
            </Link>
            <Link href="/brands" className="text-sm font-medium hover:text-primary">
              Brands
            </Link>
            <Link href="/news" className="text-sm font-medium hover:text-primary">
              News
            </Link>
            <Link href="/guides" className="text-sm font-medium hover:text-primary">
              Guides
            </Link>
            <Link href="/deals" className="text-sm font-medium hover:text-primary">
              Deals
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden lg:flex items-center">
            <Input
              type="search"
              placeholder="Search phones..."
              className="w-48 xl:w-64 text-sm"
            />
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 sm:h-10 sm:w-10">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {user ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Button variant="ghost" onClick={signOut} className="hidden md:flex text-xs lg:text-sm">
                Sign Out
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="default" className="hidden md:flex text-xs lg:text-sm px-3 lg:px-4">
                Sign In
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8 sm:h-10 sm:w-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container flex flex-col gap-4 py-4">
            <Link href="/search" className="text-sm font-medium hover:text-primary">
              Search
            </Link>
            <Link href="/compare" className="text-sm font-medium hover:text-primary">
              Compare
            </Link>
            <Link href="/brands" className="text-sm font-medium hover:text-primary">
              Brands
            </Link>
            <Link href="/news" className="text-sm font-medium hover:text-primary">
              News
            </Link>
            <Link href="/guides" className="text-sm font-medium hover:text-primary">
              Guides
            </Link>
            <Link href="/deals" className="text-sm font-medium hover:text-primary">
              Deals
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="text-sm font-medium hover:text-primary">
                  Profile
                </Link>
                <button onClick={signOut} className="text-sm font-medium hover:text-primary text-left">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="text-sm font-medium hover:text-primary">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
