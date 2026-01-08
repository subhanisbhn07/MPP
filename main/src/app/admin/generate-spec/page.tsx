import { SpecGenerationClient } from "./components/spec-generation-client";

export default function GenerateSpecPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Spec Generator</h1>
        <p className="text-muted-foreground">
          Generate detailed mobile phone specifications using AI. Just enter the brand and model.
        </p>
      </div>
      <SpecGenerationClient />
    </div>
  );
}
