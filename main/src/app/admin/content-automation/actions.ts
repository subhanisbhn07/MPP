'use server';

import { generateSectionContent } from '@/ai/flows/generate-homepage-content';
import { AllSections } from '@/ai/schemas/homepage-content';
import type { z } from 'zod';

type ActionResult = {
  success: boolean;
  data?: any;
  error?: string;
};

type GenerateContentInput = {
    section: string;
    parentSchema: z.ZodObject<any, any, any>;
};

export async function handleGenerateHomepageContent(input: GenerateContentInput): Promise<ActionResult> {
  try {
    // The parentSchema cannot be passed directly from client to server component,
    // so we re-associate it here on the server.
    const result = await generateSectionContent({ section: input.section, parentSchema: AllSections });
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Error generating homepage content from AI flow:', error);
    return { success: false, error: error.message || 'Failed to generate content.' };
  }
}
