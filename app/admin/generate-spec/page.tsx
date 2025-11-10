'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';

export default function GenerateSpecPage() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedSpec, setGeneratedSpec] = useState<Record<string, unknown> | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    setTimeout(() => {
      setGeneratedSpec({
        brand,
        model,
        displaySize: 6.7,
        ram: [8, 12],
        storage: [128, 256, 512],
        batteryCapacity: 5000,
        mainCameraMP: 50,
      });
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1E3A8A] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">AI Spec Generator</h1>
          <p className="text-white/80">Generate phone specifications using AI</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Generate Phone Specifications</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Brand</label>
                <Input
                  placeholder="e.g., Samsung"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Model</label>
                <Input
                  placeholder="e.g., Galaxy S24 Ultra"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!brand || !model || generating}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {generating ? 'Generating...' : 'Generate Specifications'}
            </Button>

            {generatedSpec && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold mb-4">Generated Specifications</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(generatedSpec, null, 2)}
                </pre>
                <Button className="mt-4 w-full">
                  Save to Database
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
