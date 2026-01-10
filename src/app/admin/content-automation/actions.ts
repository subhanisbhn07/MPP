'use server';

import { generateSectionContent } from '@/ai/flows/generate-homepage-content';

type ActionResult = {
  success: boolean;
  data?: any;
  error?: string;
};

type GenerateContentInput = {
    section: string;
};

export async function handleGenerateHomepageContent(input: GenerateContentInput): Promise<ActionResult> {
  try {
    const result = await generateSectionContent({ section: input.section });
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Error generating homepage content from AI flow:', error);
    return { success: false, error: error.message || 'Failed to generate content.' };
  }
}
