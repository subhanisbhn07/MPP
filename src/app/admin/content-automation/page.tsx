import { ContentAutomationClient } from "./components/content-automation-client";

export default function ContentAutomationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Homepage Content Automation</h1>
        <p className="text-muted-foreground">
          Use AI to generate and refresh all dynamic content on your homepage with one click.
        </p>
      </div>
      <ContentAutomationClient />
    </div>
  );
}
