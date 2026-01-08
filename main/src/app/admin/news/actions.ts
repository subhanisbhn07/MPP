
'use server';

import { generateNewsArticles } from '@/ai/flows/generate-news-articles';

type ActionResult = {
  success: boolean;
  data?: any;
  error?: string;
};

export async function handleGenerateNews(): Promise<ActionResult> {
  try {
    const result = await generateNewsArticles();
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Error generating news content from AI flow:', error);
    return { success: false, error: error.message || 'Failed to generate content.' };
  }
}
