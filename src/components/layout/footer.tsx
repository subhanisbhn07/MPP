import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div className="container grid items-center gap-8 pb-8 pt-6 lg:grid-cols-3 lg:py-8">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="font-bold">Compare Phones</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your ultimate guide to mobile technology.
          </p>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" className="hover:text-primary">About Us</Link>
            <Link href="#" className="hover:text-primary">Blog</Link>
            <Link href="#" className="hover:text-primary">Careers</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Cookie Policy</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Support</h3>
            <Link href="#" className="hover:text-primary">Contact Us</Link>
            <Link href="#" className="hover:text-primary">FAQ</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Connect</h3>
            <Link href="#" className="hover:text-primary">Twitter</Link>
            <Link href="#" className="hover:text-primary">Facebook</Link>
            <Link href="#" className="hover:text-primary">Instagram</Link>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex items-center justify-center py-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Compare Phones. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
