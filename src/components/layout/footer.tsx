
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Card } from '@/components/ui/card';

export function Footer() {
  return (
    <footer className="w-full">
      <div className="container pb-4">
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
              <div className="grid gap-1">
                <h3 className="font-semibold">Brands</h3>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Apple</Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Samsung</Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Google</Link>
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold">Categories</h3>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Gaming Phones</Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Camera Phones</Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">5G Phones</Link>
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold">Quick Links</h3>
                <Link href="/compare" className="text-primary-foreground/80 hover:text-primary-foreground">Compare</Link>
                <Link href="/news" className="text-primary-foreground/80 hover:text-primary-foreground">News</Link>
                 <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Sitemap</Link>
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold">Company</h3>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">About</Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Contact</Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Privacy</Link>
              </div>
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
