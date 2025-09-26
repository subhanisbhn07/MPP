
'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Card } from '@/components/ui/card';
import { initialMenuData } from '@/lib/menu-data'; // In a real app, this would be fetched

export function Footer() {
  const { footer } = initialMenuData;

  const footerColumns = [
    { title: 'Brands', links: footer.brands },
    { title: 'Categories', links: footer.categories },
    { title: 'Quick Links', links: footer.quickLinks },
    { title: 'Company', links: footer.company },
  ];

  return (
    <footer className="w-full">
      <div className="px-4 pb-4">
        <Card className="bg-primary text-primary-foreground rounded-2xl">
          <div className="grid items-start gap-8 pb-8 pt-6 lg:grid-cols-3 lg:py-8 px-6">
            <div className="flex flex-col gap-2">
              <Link href="/" className="flex items-center space-x-2">
                <Logo />
                <span className="font-bold">MobilePhonesPro</span>
              </Link>
              <p className="text-sm text-primary-foreground/80">
                AI-powered mobile discovery & comparisons.
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              {footerColumns.map(column => (
                <div key={column.title} className="grid gap-1">
                  <h3 className="font-semibold">{column.title}</h3>
                  {column.links.map(link => (
                    <Link key={link.id} href={link.href} className="text-primary-foreground/80 hover:text-primary-foreground">
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mx-6">
            <div className="flex items-center justify-center py-4">
              <p className="text-sm text-primary-foreground/80">
                &copy; {new Date().getFullYear()} MobilePhonesPro. All rights reserved.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </footer>
  );
}
