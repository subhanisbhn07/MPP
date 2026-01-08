
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function BlogManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog & Guides</h1>
            <p className="text-muted-foreground">
            Create, edit, and manage all blog posts and helpful guides.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2" />
            New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>A list of all blog posts and guides in your system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No posts found.</p>
            <Button variant="link">Create your first post</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
