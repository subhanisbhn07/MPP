'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { specCategories } from '@/lib/categories';

export function BrowseBySpecsSection() {
  return (
    <Card className="rounded-lg" aria-labelledby="browse-heading">
      <CardHeader className="p-6">
        <div className="space-y-3 text-center">
          <h2 id="browse-heading" className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Browse by Specs
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Find the perfect phone tailored to your needs.
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {specCategories.map((cat) => (
            <li role="listitem" key={cat.label}>
              <Link href={cat.href}>
                <Card className="p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow h-full border-2">
                  {cat.icon && <cat.icon className="h-8 w-8 text-primary" aria-hidden="true" />}
                  <span className="font-semibold text-sm">{cat.label}</span>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
