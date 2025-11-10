import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">MobilePhonesPro</h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for mobile phone comparisons, reviews, and the latest news.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-primary">
                  Search Phones
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-muted-foreground hover:text-primary">
                  Compare Phones
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-muted-foreground hover:text-primary">
                  All Brands
                </Link>
              </li>
              <li>
                <Link href="/category/best-camera-phones" className="text-muted-foreground hover:text-primary">
                  Best Camera Phones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Content</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-primary">
                  News
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-primary">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-muted-foreground hover:text-primary">
                  Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/profile#wishlist" className="text-muted-foreground hover:text-primary">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MobilePhonesPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
