import Link from 'next/link';
import { specCategories } from '@/lib/categories';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Browse by Category
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Find the perfect phone for your needs by exploring our curated categories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {specCategories.map((category) => (
          <Link key={category.slug} href={category.href}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                {category.icon && (
                  <category.icon className="h-12 w-12 mx-auto text-primary mb-2" />
                )}
                <CardTitle>{category.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {category.title}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
    