
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function NewsManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">News Management</h1>
            <p className="text-muted-foreground">
            Create, edit, and manage all news articles and updates.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2" />
            New Article
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Articles</CardTitle>
          <CardDescription>A list of all news articles in your system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No news articles found.</p>
            <Button variant="link">Create your first article</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
