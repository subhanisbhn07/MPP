'use server';

import { generateMobileSpec, GenerateMobileSpecInput } from '@/ai/flows/generate-mobile-spec';

export async function handleGenerateSpec(input: GenerateMobileSpecInput) {
  try {
    const result = await generateMobileSpec(input);
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Error generating mobile spec:', error);
    return { success: false, error: error.message || 'Failed to generate specification from AI flow.' };
  }
}
