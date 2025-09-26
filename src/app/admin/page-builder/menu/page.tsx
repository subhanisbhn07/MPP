
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function MenuManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
            <p className="text-muted-foreground">
            Manage the main navigation, header, and footer content for the site.
            </p>
        </div>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Header Navigation</CardTitle>
              <CardDescription>Links that appear in the main site header.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No header links configured.</p>
                <Button variant="link">Add a link</Button>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Footer Navigation</CardTitle>
              <CardDescription>Links that appear in the four columns of the site footer.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No footer links configured.</p>
                <Button variant="link">Add a link</Button>
              </div>
            </CardContent>
          </Card>
       </div>
    </div>
  );
}
