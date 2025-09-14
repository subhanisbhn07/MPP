
/**
 * @fileOverview Schemas and types for homepage content generation.
 */

import {z} from 'zod';

// Schemas for different content types
export const PhoneReferenceSchema = z.object({
  brand: z.string().describe('The brand of the phone, e.g., "Samsung"'),
  model: z.string().describe('The model of the phone, e.g., "Galaxy S24 Ultra"'),
});

export const EventSchema = z.object({
  date: z.string().describe('The 2-digit day, e.g., "28"'),
  month: z.string().describe('The 3-letter abbreviated month, e.g., "AUG"'),
  title: z.string().describe('The title of the event.'),
  description: z.string().describe('A short description of the event.'),
});

export const GuideSchema = z.object({
  badge: z.string().describe('A short category badge for the guide, e.g., "Deep Dive" or "Tips & Tricks".'),
  title: z.string().describe('The title of the guide.'),
});

export const LeakSchema = z.object({
    badge: z.enum(['Rumor', 'Leak']).describe('Whether this is a rumor or a confirmed leak.'),
    title: z.string().describe('The title of the leak/rumor.')
});

export const BlogPostSchema = z.object({
  image: z.string().describe('A placeholder image URL from picsum.photos.'),
  badge: z.string().describe('A short category badge for the post, e.g., "Buying Guides".'),
  title: z.string().describe('The title of the blog post.'),
  excerpt: z.string().describe('A short excerpt or summary of the blog post.'),
});

export const NewsPostSchema = z.object({
    id: z.string().uuid().describe("A unique identifier for the news article."),
    image: z.string().url().describe('A placeholder image URL from picsum.photos.'),
    badge: z.string().describe('A category badge, e.g., "BREAKING", "Industry News", "Events".'),
    title: z.string().describe('The headline of the news article.'),
    content: z.string().describe('The full content of the news article, formatted in Markdown.'),
    isFeatured: z.boolean().optional().describe('Set to true if this is the main, featured story.')
})
export type NewsPost = z.infer<typeof NewsPostSchema>;


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

// Union of all schemas
export const AllSections = z.union([PhoneListsSchema, CommunityContentSchema, NewsAndBlogSchema]);
