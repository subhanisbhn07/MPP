import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  const articles = [
    {
      title: "Snapdragon 8 Gen 4: What to Expect",
      category: "Industry News",
      image: "https://picsum.photos/600/402",
      excerpt: "A deep dive into the next generation of mobile processors.",
    },
    {
      title: "Apple's Next Event Announced",
      category: "Industry News",
      image: "https://picsum.photos/600/403",
      excerpt: "Mark your calendars for the reveal of the new iPhone 17 series.",
    },
    {
      title: "Pixel 9 Leaks Show New Design",
      category: "Rumors",
      image: "https://picsum.photos/600/404",
      excerpt: "Early renders suggest a significant design overhaul for Google's next flagship.",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Latest News
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Stay updated with the latest in mobile technology.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
           <Card key={article.title} className="overflow-hidden">
             <Link href="#">
                <Image
                  src={article.image}
                  width={600}
                  height={400}
                  alt={article.title}
                  className="object-cover aspect-video"
                  data-ai-hint="mobile technology"
                />
                <CardHeader>
                  <Badge>{article.category}</Badge>
                  <CardTitle className="mt-2 text-xl">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{article.excerpt}</p>
                </CardContent>
             </Link>
           </Card>
        ))}
      </div>
    </div>
  );
}
