
'use server';

import { 
  generateSectionContent,
} from '@/ai/flows/generate-homepage-content';
import { AllSections, PhoneListsSchema, CommunityContentSchema, NewsAndBlogSchema } from '@/ai/schemas/homepage-content';

type ActionResult = {
  success: boolean;
  data?: any;
  error?: string;
};

// A map to determine which parent schema a section belongs to.
const sectionSchemaMap: Record<string, (typeof AllSections)> = {
    trendingPhones: PhoneListsSchema,
    latestPhones: PhoneListsSchema,
    flagshipPhones: PhoneListsSchema,
    performancePhones: PhoneListsSchema,
    batteryPhones: PhoneListsSchema,
    cameraPhones: PhoneListsSchema,
    foldablePhones: PhoneListsSchema,
    ruggedPhones: PhoneListsSchema,
    uniquePhones: PhoneListsSchema,
    iosPhones: PhoneListsSchema,
    androidPhones: PhoneListsSchema,
    upcomingEvents: CommunityContentSchema,
    guides: CommunityContentSchema,
    leaks: CommunityContentSchema,
    blogPosts: NewsAndBlogSchema,
    news: NewsAndBlogSchema,
};


export async function handleGenerateContent(section: string): Promise<ActionResult> {
  try {
    const parentSchema = sectionSchemaMap[section];
    if (!parentSchema) {
         throw new Error('Invalid section provided.');
    }

    const result = await generateSectionContent({
        section,
        parentSchema,
    });
    
    return { success: true, data: result };
  } catch (error: any) {
    console.error(`Error generating content for section ${section}:`, error);
    return { success: false, error: error.message || 'Failed to generate content from AI flow.' };
  }
}
