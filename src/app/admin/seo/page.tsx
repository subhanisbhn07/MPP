
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SeoManagementPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO Management</h1>
        <p className="text-muted-foreground">
          Optimize metadata and content for better search engine rankings.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Global SEO Settings</CardTitle>
            <CardDescription>
              These settings apply to your entire site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="site-title" className="font-medium">Site Title Template</label>
              <Input id="site-title" placeholder="%s | Compare Phones Pro" defaultValue="%s | Compare Phones Pro" />
              <p className="text-sm text-muted-foreground">Use %s as a placeholder for the page title.</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="site-description" className="font-medium">Homepage Meta Description</label>
              <Textarea id="site-description" placeholder="The best place to compare mobile phone specifications and find the latest deals." defaultValue="The best place to compare mobile phone specifications and find the latest deals." />
            </div>
             <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page-Specific SEO</CardTitle>
             <CardDescription>
              Override global settings for a specific page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="page-select" className="font-medium">Select a Page</label>
                <Input id="page-select" placeholder="Search for a page to edit..." />
              </div>
              <div className="space-y-2">
                <label htmlFor="page-title" className="font-medium">SEO Title</label>
                <Input id="page-title" placeholder="Enter SEO title" />
              </div>
               <div className="space-y-2">
                <label htmlFor="page-description" className="font-medium">Meta Description</label>
                <Textarea id="page-description" placeholder="Enter meta description" />
              </div>
              <Button>Save Page Settings</Button>
          </CardContent>
        </Card>
      </div>
       <Card>
          <CardHeader>
            <CardTitle>Sitemap</CardTitle>
             <CardDescription>
              Manage your XML sitemap for search engines.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
              <p className="text-muted-foreground">/sitemap.xml</p>
              <Button variant="outline">Regenerate Sitemap</Button>
          </CardContent>
        </Card>
    </div>
  );
}
