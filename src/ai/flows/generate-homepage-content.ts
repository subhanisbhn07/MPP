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

// Schemas for different content types
const PhoneReferenceSchema = z.object({
  brand: z.string().describe('The brand of the phone, e.g., "Samsung"'),
  model: z.string().describe('The model of the phone, e.g., "Galaxy S24 Ultra"'),
});

const EventSchema = z.object({
  date: z.string().describe('The 2-digit day, e.g., "28"'),
  month: z.string().describe('The 3-letter abbreviated month, e.g., "AUG"'),
  title: z.string().describe('The title of the event.'),
  description: z.string().describe('A short description of the event.'),
});

const GuideSchema = z.object({
  badge: z.string().describe('A short category badge for the guide, e.g., "Deep Dive" or "Tips & Tricks".'),
  title: z.string().describe('The title of the guide.'),
});

const LeakSchema = z.object({
    badge: z.enum(['Rumor', 'Leak']).describe('Whether this is a rumor or a confirmed leak.'),
    title: z.string().describe('The title of the leak/rumor.')
});

const BlogPostSchema = z.object({
  image: z.string().describe('A placeholder image URL from picsum.photos.'),
  badge: z.string().describe('A short category badge for the post, e.g., "Buying Guides".'),
  title: z.string().describe('The title of the blog post.'),
  excerpt: z.string().describe('A short excerpt or summary of the blog post.'),
});

const NewsPostSchema = z.object({
    image: z.string().describe('A placeholder image URL from picsum.photos.'),
    badge: z.string().describe('A category badge, e.g., "BREAKING", "Industry News", "Events".'),
    title: z.string().describe('The headline of the news article.'),
    isFeatured: z.boolean().optional().describe('Set to true if this is the main, featured story.')
})

// Schema for Phone Lists
export const PhoneListsSchema = z.object({
  trendingPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 trending phones currently popular in the market.'),
  latestPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of the 6 most recently launched phones.'),
  flagshipPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 flagship-tier phones.'),
  performancePhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 phones best for gaming and performance.'),
  batteryPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 phones with the best battery life.'),
  cameraPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 phones with the best camera systems.'),
  foldablePhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 popular foldable phones.'),
  ruggedPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 rugged and durable phones.'),
  uniquePhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 unique or niche-market phones.'),
  iosPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of the top 6 iOS phones available.'),
  androidPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of the top 6 Android phones available.'),
});
export type PhoneListsOutput = z.infer<typeof PhoneListsSchema>;

// Schema for Community Content
export const CommunityContentSchema = z.object({
  upcomingEvents: z.array(EventSchema).length(3).describe('A list of 3 upcoming mobile phone launch events or announcements.'),
  guides: z.array(GuideSchema).length(3).describe('A list of 3 interesting guides or deep-dive topics.'),
  leaks: z.array(LeakSchema).length(3).describe('A list of 3 recent and interesting leaks or rumors.'),
});
export type CommunityContentOutput = z.infer<typeof CommunityContentSchema>;


// Schema for News and Blog
export const NewsAndBlogSchema = z.object({
  blogPosts: z.array(BlogPostSchema).length(6).describe('A list of 6 blog posts on various topics like buying guides, tips, and industry insights.'),
  news: z.array(NewsPostSchema).min(5).describe('A list of recent news articles. The first item in the list should be the most important, featured story.'),
});
export type NewsAndBlogOutput = z.infer<typeof NewsAndBlogSchema>;

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
