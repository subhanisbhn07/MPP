'use server';

/**
 * @fileOverview An AI agent that generates all dynamic content for the homepage.
 * This includes news, events, guides, blog posts, and featured phones.
 *
 * - generateHomepageContent - A function that generates the content.
 * - GenerateHomepageContentOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {allPhones} from '@/lib/data';
import type {Phone} from '@/lib/types';

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


// The main output schema for the entire flow
export const GenerateHomepageContentOutputSchema = z.object({
  trendingPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 trending phones currently popular in the market.'),
  latestPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of the 6 most recently launched phones.'),
  flagshipPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 flagship-tier phones.'),
  performancePhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 phones best for gaming and performance.'),
  batteryPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 phones with the best battery life.'),
  cameraPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 phones with the best camera systems.'),
  foldablePhones: z.array(PhoneReferenceEma).length(6).describe('A list of 6 popular foldable phones.'),
  ruggedPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 rugged and durable phones.'),
  uniquePhones: z.array(PhoneReferenceSchema).length(6).describe('A list of 6 unique or niche-market phones.'),
  iosPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of the top 6 iOS phones available.'),
  androidPhones: z.array(PhoneReferenceSchema).length(6).describe('A list of the top 6 Android phones available.'),
  upcomingEvents: z.array(EventSchema).length(3).describe('A list of 3 upcoming mobile phone launch events or announcements.'),
  guides: z.array(GuideSchema).length(3).describe('A list of 3 interesting guides or deep-dive topics.'),
  leaks: z.array(LeakSchema).length(3).describe('A list of 3 recent and interesting leaks or rumors.'),
  blogPosts: z.array(BlogPostSchema).length(6).describe('A list of 6 blog posts on various topics like buying guides, tips, and industry insights.'),
  news: z.array(NewsPostSchema).min(5).describe('A list of recent news articles. The first item in the list should be the most important, featured story.'),
});

export type GenerateHomepageContentOutput = z.infer<typeof GenerateHomepageContentOutputSchema>;


const prompt = ai.definePrompt({
  name: 'generateHomepageContentPrompt',
  output: { schema: GenerateHomepageContentOutputSchema },
  prompt: `You are an expert mobile phone journalist and analyst. Your task is to generate a complete set of content for a mobile phone comparison website's homepage. You must generate content for all the requested sections based on the current date and the latest information in the mobile industry.

The current date is: ${new Date().toDateString()}.

You must find real, relevant phones for each category. For each phone, provide the brand and exact model name.
For blog posts and news, create compelling, realistic titles and descriptions. Ensure one news article is marked as featured. Use placeholder images from picsum.photos.

Generate a JSON object that strictly conforms to the provided schema.
`,
});

const generateHomepageContentFlow = ai.defineFlow(
  {
    name: 'generateHomepageContentFlow',
    outputSchema: GenerateHomepageContentOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    if (!output) {
      throw new Error('Failed to generate homepage content.');
    }
    return output;
  }
);


// Exported wrapper function
export async function generateHomepageContent(): Promise<GenerateHomepageContentOutput> {
  const generatedData = await generateHomepageContentFlow();
  
  // Post-processing to map generated phone names to actual phone data from `allPhones`
  // This is a placeholder for a real database lookup. We are not using this for now.
  const getPhoneByName = (brand: string, model: string): Phone | undefined => 
    allPhones.find(p => p.brand.toLowerCase() === brand.toLowerCase() && p.model.toLowerCase() === model.toLowerCase());

  return generatedData;
}
