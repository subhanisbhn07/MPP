
'use server';

/**
 * @fileOverview An AI agent that generates all dynamic content for the homepage.
 * This includes news, events, guides, blog posts, and featured phones.
 *
 * - generatePhoneLists - Generates various lists of phones (trending, flagship, etc.).
 * - generateCommunityContent - Generates events, guides, and leaks.
 * - generateNewsAndBlog - Generates news articles and blog posts.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
    PhoneListsSchema,
    CommunityContentSchema,
    NewsAndBlogSchema,
    type PhoneListsOutput,
    type CommunityContentOutput,
    type NewsAndBlogOutput
} from '@/ai/schemas/homepage-content';


// Generic prompt for generating content based on a given schema and description
async function generateContent<T extends z.ZodTypeAny>(
  name: string,
  outputSchema: T,
  description: string
): Promise<z.infer<T>> {
  const prompt = ai.definePrompt({
    name: `${name}Prompt`,
    output: { schema: outputSchema },
    prompt: `You are an expert mobile phone journalist and analyst. Your task is to generate content for a specific section of a mobile phone comparison website's homepage. 
    
    The current date is: ${new Date().toDateString()}.
    
    Generate the following content: ${description}.
    
    You must find real, relevant data. For phones, provide the brand and exact model name. For blog posts and news, create compelling, realistic titles and descriptions. Use placeholder images from picsum.photos where required.
    
    Generate a JSON object that strictly conforms to the provided schema.`,
  });

  const { output } = await prompt();
  if (!output) {
    throw new Error(`Failed to generate content for ${name}.`);
  }
  return output;
}

// Flow for generating phone lists
const generatePhoneListsFlow = ai.defineFlow(
  { name: 'generatePhoneListsFlow', outputSchema: PhoneListsSchema },
  () => generateContent('phoneLists', PhoneListsSchema, 'All phone category lists for the homepage.')
);

// Flow for generating community content
const generateCommunityContentFlow = ai.defineFlow(
  { name: 'generateCommunityContentFlow', outputSchema: CommunityContentSchema },
  () => generateContent('communityContent', CommunityContentSchema, 'Upcoming events, guides, and leaks/rumors.')
);

// Flow for generating news and blog posts
const generateNewsAndBlogFlow = ai.defineFlow(
  { name: 'generateNewsAndBlogFlow', outputSchema: NewsAndBlogSchema },
  () => generateContent('newsAndBlog', NewsAndBlogSchema, 'A list of news articles and blog posts.')
);


// Exported wrapper functions
export async function generatePhoneLists(): Promise<PhoneListsOutput> {
  return await generatePhoneListsFlow();
}

export async function generateCommunityContent(): Promise<CommunityContentOutput> {
  return await generateCommunityContentFlow();
}

export async function generateNewsAndBlog(): Promise<NewsAndBlogOutput> {
    return await generateNewsAndBlogFlow();
}
