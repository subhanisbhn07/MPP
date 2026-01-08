
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function LeaksManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Leaks & Rumors Management</h1>
            <p className="text-muted-foreground">
            Create, edit, and manage all leaks and rumors.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2" />
            New Leak
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leaks & Rumors</CardTitle>
          <CardDescription>A list of all leaks and rumors in your system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No items found.</p>
            <Button variant="link">Create your first leak or rumor</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
