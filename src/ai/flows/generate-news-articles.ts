
'use server';

/**
 * @fileOverview A specialized AI agent for generating mobile phone news articles.
 *
 * - generateNewsArticles - A function that generates a list of news articles.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { NewsPostSchema } from '@/ai/schemas/homepage-content';
import { v4 as uuidv4 } from 'uuid';

// Define the output schema for a list of news articles
const NewsArticlesOutputSchema = z.array(NewsPostSchema).min(5).describe('A list of recent news articles. The first item in the list should be the most important, featured story.');

const generateNewsArticlesFlow = ai.defineFlow(
  {
    name: 'generateNewsArticlesFlow',
    outputSchema: NewsArticlesOutputSchema,
  },
  async () => {
    const prompt = ai.definePrompt({
      name: 'generateNewsArticlesPrompt',
      output: { schema: NewsArticlesOutputSchema },
      prompt: `You are an expert mobile phone journalist and analyst for a top-tier tech news site. Your task is to generate a list of current, engaging, and realistic news articles.

      The current date is: ${new Date().toDateString()}.

      Please generate a list of at least 5 news articles.
      - The articles should cover recent events, product announcements, significant leaks, or important industry trends related to mobile phones, chipsets (like Snapdragon, Apple A-series), and major mobile operating systems (iOS, Android).
      - Create compelling, realistic headlines and assign a relevant category badge (e.g., "BREAKING", "Industry News", "Events", "Analysis", "Rumor").
      - For each article, write a full, well-structured article body in Markdown format. The content should be at least 3-4 paragraphs long, providing context, details, and analysis.
      - Set the 'isFeatured' flag to true for the single most important, headline-worthy story in the list. Only one article should be featured.
      - For each article, provide a placeholder image URL from picsum.photos. Ensure each image URL is unique.
      - Each article must have a unique UUID for the 'id' field.
      
      Generate a JSON object that strictly conforms to the provided schema.`,
    });

    const { output } = await prompt();
    if (!output) {
      throw new Error('Failed to generate news articles.');
    }
    
    // Ensure unique IDs if the model fails to generate them.
    return output.map(article => ({ ...article, id: article.id || uuidv4() }));
  }
);

/**
 * Generates a list of news articles using the AI flow.
 * @returns A promise that resolves to an array of news articles.
 */
export async function generateNewsArticles(): Promise<z.infer<typeof NewsArticlesOutputSchema>> {
  return await generateNewsArticlesFlow();
}
