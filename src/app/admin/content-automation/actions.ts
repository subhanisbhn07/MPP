'use server';

import { generateHomepageContent } from '@/ai/flows/generate-homepage-content';

export async function handleGenerateHomepageContent() {
  try {
    const result = await generateHomepageContent();
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Error generating homepage content:', error);
    return { success: false, error: error.message || 'Failed to generate content from AI flow.' };
  }
}
