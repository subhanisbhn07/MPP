'use server';

import { 
  generatePhoneLists,
  generateCommunityContent,
  generateNewsAndBlog
} from '@/ai/flows/generate-homepage-content';

type ActionResult = {
  success: boolean;
  data?: any;
  error?: string;
};

export async function handleGenerateContent(section: string): Promise<ActionResult> {
  try {
    let result;
    switch (section) {
      case 'phoneLists':
        result = await generatePhoneLists();
        break;
      case 'communityContent':
        result = await generateCommunityContent();
        break;
      case 'newsAndBlog':
        result = await generateNewsAndBlog();
        break;
      default:
        throw new Error('Invalid section provided.');
    }
    return { success: true, data: result };
  } catch (error: any) {
    console.error(`Error generating content for section ${section}:`, error);
    return { success: false, error: error.message || 'Failed to generate content from AI flow.' };
  }
}
