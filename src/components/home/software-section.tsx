'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SoftwareArticle {
  badge: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'accent';
  title: string;
  href: string;
}

interface SoftwareSectionProps {
  id: string;
  title: string;
  articles: SoftwareArticle[];
}

export function SoftwareSection({ id, title, articles }: SoftwareSectionProps) {
  return (
    <Card className="rounded-lg" aria-labelledby={`${id}-heading`}>
      <CardHeader className="p-6 bg-primary text-primary-foreground rounded-t-lg">
        <h2 id={`${id}-heading`} className="text-2xl font-bold tracking-tighter sm:text-3xl">
          {title}
        </h2>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <Link href={article.href} className="block p-4">
                <Badge variant={article.badgeVariant || 'secondary'}>{article.badge}</Badge>
                <h4 className="font-semibold mt-2">{article.title}</h4>
              </Link>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
