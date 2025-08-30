'use server';

/**
 * @fileOverview An AI agent that generates mobile phone specifications.
 *
 * - generateMobileSpec - A function that generates mobile phone specifications.
 * - GenerateMobileSpecInput - The input type for the generateMobileSpec function.
 * - GenerateMobileSpecOutput - The return type for the generateMobileSpec function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMobileSpecInputSchema = z.object({
  name: z.string().describe('The name of the mobile phone.'),
  model: z.string().describe('The model of the mobile phone.'),
});
export type GenerateMobileSpecInput = z.infer<typeof GenerateMobileSpecInputSchema>;

const GenerateMobileSpecOutputSchema = z.object({
  brand: z.string().describe('The brand of the mobile phone.'),
  model: z.string().describe('The model of the mobile phone.'),
  display: z.string().describe('The display specifications of the mobile phone.'),
  camera: z.string().describe('The camera specifications of the mobile phone.'),
  processor: z.string().describe('The processor specifications of the mobile phone.'),
  memory: z.string().describe('The memory specifications of the mobile phone.'),
  battery: z.string().describe('The battery specifications of the mobile phone.'),
  operatingSystem: z.string().describe('The operating system of the mobile phone.'),
  storage: z.string().describe('The storage specifications of the mobile phone.'),
  network: z.string().describe('The network specifications of the mobile phone.'),
  connectivity: z.string().describe('The connectivity specifications of the mobile phone.'),
  sensors: z.string().describe('The sensors available on the mobile phone.'),
  design: z.string().describe('The design specifications of the mobile phone.'),
  launchDate: z.string().describe('The launch date of the mobile phone.'),
  price: z.string().describe('The price of the mobile phone.'),
});
export type GenerateMobileSpecOutput = z.infer<typeof GenerateMobileSpecOutputSchema>;

export async function generateMobileSpec(input: GenerateMobileSpecInput): Promise<GenerateMobileSpecOutput> {
  return generateMobileSpecFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMobileSpecPrompt',
  input: {schema: GenerateMobileSpecInputSchema},
  output: {schema: GenerateMobileSpecOutputSchema},
  prompt: `You are a mobile phone expert. Generate the specifications for the following mobile phone:

Name: {{{name}}}
Model: {{{model}}}

Ensure the specifications are detailed and accurate. Output should be a valid JSON conforming to the schema.`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generateMobileSpecFlow = ai.defineFlow(
  {
    name: 'generateMobileSpecFlow',
    inputSchema: GenerateMobileSpecInputSchema,
    outputSchema: GenerateMobileSpecOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
