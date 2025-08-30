import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div className="container grid items-center gap-8 pb-8 pt-6 lg:grid-cols-3 lg:py-8">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="font-bold">MobilePhonesPro</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            AI-powered mobile discovery & comparisons.
          </p>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div className="grid gap-1">
            <h3 className="font-semibold">Brands</h3>
            <Link href="#" className="hover:text-primary">Apple</Link>
            <Link href="#" className="hover:text-primary">Samsung</Link>
            <Link href="#" className="hover:text-primary">Google</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Categories</h3>
            <Link href="#" className="hover:text-primary">Gaming Phones</Link>
            <Link href="#" className="hover:text-primary">Camera Phones</Link>
            <Link href="#" className="hover:text-primary">5G Phones</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Quick Links</h3>
            <Link href="/compare" className="hover:text-primary">Compare</Link>
            <Link href="#" className="hover:text-primary">News</Link>
             <Link href="#" className="hover:text-primary">Sitemap</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" className="hover:text-primary">About</Link>
            <Link href="#" className="hover:text-primary">Contact</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex items-center justify-center py-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MobilePhonesPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
