'use server';

import { generateMobileSpec, GenerateMobileSpecInput } from '@/ai/flows/generate-mobile-spec';

export async function handleGenerateSpec(input: GenerateMobileSpecInput) {
  try {
    const result = await generateMobileSpec(input);
    return result;
  } catch (error) {
    console.error('Error generating mobile spec:', error);
    // You might want to throw a more specific error or handle it differently
    throw new Error('Failed to generate specification from AI flow.');
  }
}
