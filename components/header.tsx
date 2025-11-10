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
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">MobilePhonesPro</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
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
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center">
            <Input
              type="search"
              placeholder="Search phones..."
              className="w-64"
            />
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" onClick={signOut} className="hidden md:flex">
                Sign Out
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="default" className="hidden md:flex">
                Sign In
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
