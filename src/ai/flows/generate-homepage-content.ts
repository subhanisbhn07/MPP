
'use server';

/**
 * @fileOverview An AI agent that generates dynamic content for various sections of the homepage.
 *
 * - generateSectionContent - A flexible function that generates content for a specific section based on a schema.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type {ZodTypeAny} from 'zod';
import {PhoneListsSchema, CommunityContentSchema, NewsAndBlogSchema} from '@/ai/schemas/homepage-content';

// Map of section names to their schemas
const sectionSchemaMap: Record<string, ZodTypeAny> = {
  // Phone Lists
  trendingPhones: PhoneListsSchema.shape.trendingPhones,
  latestPhones: PhoneListsSchema.shape.latestPhones,
  flagshipPhones: PhoneListsSchema.shape.flagshipPhones,
  performancePhones: PhoneListsSchema.shape.performancePhones,
  batteryPhones: PhoneListsSchema.shape.batteryPhones,
  cameraPhones: PhoneListsSchema.shape.cameraPhones,
  foldablePhones: PhoneListsSchema.shape.foldablePhones,
  ruggedPhones: PhoneListsSchema.shape.ruggedPhones,
  uniquePhones: PhoneListsSchema.shape.uniquePhones,
  iosPhones: PhoneListsSchema.shape.iosPhones,
  androidPhones: PhoneListsSchema.shape.androidPhones,
  // Community Content
  upcomingEvents: CommunityContentSchema.shape.upcomingEvents,
  guides: CommunityContentSchema.shape.guides,
  leaks: CommunityContentSchema.shape.leaks,
  // News and Blog
  blogPosts: NewsAndBlogSchema.shape.blogPosts,
  news: NewsAndBlogSchema.shape.news,
};

// Input schema for the generic content generation flow
const SectionContentInputSchema = z.object({
  section: z.string().describe('The specific section key to generate content for (e.g., "trendingPhones", "blogPosts").'),
});

// Generic prompt for generating content based on a given schema and description
const generateSectionContentFlow = ai.defineFlow(
  { 
    name: 'generateSectionContentFlow', 
    inputSchema: SectionContentInputSchema,
    outputSchema: z.any(), // Output is dynamic, so we use z.any() here and validate later
  },
  async ({ section }) => {
    // Extract the specific field and its description from the schema map
    const sectionSchema = sectionSchemaMap[section];
    if (!sectionSchema) {
      throw new Error(`Unknown section: ${section}`);
    }
    const sectionDescription = sectionSchema.description || `Content for the ${section} section.`;

    // Create a dynamic output schema for only the requested section
    const dynamicOutputSchema = z.object({
      [section]: sectionSchema,
    });

    const prompt = ai.definePrompt({
      name: `generate${section}Prompt`,
      output: { schema: dynamicOutputSchema },
      prompt: `You are an expert mobile phone journalist and analyst. Your task is to generate content for a specific section of a mobile phone comparison website's homepage. 
      
      The current date is: ${new Date().toDateString()}.
      
      Generate content ONLY for the following section: ${section}.
      Description of what's needed: "${sectionDescription}".
      
      You must find real, relevant data. For phones, provide the brand and exact model name. For blog posts and news, create compelling, realistic titles and descriptions. Use placeholder images from picsum.photos where required.
      
      Generate a JSON object that strictly conforms to the provided schema, containing only the key for the section requested.`,
    });

    const { output } = await prompt();
    if (!output) {
      throw new Error(`Failed to generate content for ${section}.`);
    }
    return output;
  }
);


// Exported wrapper function
export async function generateSectionContent(input: z.infer<typeof SectionContentInputSchema>): Promise<any> {
  return await generateSectionContentFlow(input);
}
