
'use server';

import { generateMobileSpec, GenerateMobileSpecInput } from '@/ai/flows/generate-mobile-spec';
import { promises as fs } from 'fs';
import path from 'path';

// Define the structure for the complete phone object
type PhoneData = {
  id: number;
  brand: string;
  model: string;
  image: string;
  images: string[];
  youtubeVideoId: string;
  price: number;
  specs: any;
};

export async function handleGenerateSpec(input: GenerateMobileSpecInput) {
  try {
    const result = await generateMobileSpec(input);
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Error generating mobile spec:', error);
    return { success: false, error: error.message || 'Failed to generate specification from AI flow.' };
  }
}

export async function handleSaveToDatabase(phoneData: PhoneData) {
  try {
    const phonesDir = path.join(process.cwd(), 'src', 'database', 'phones');
    // Ensure the directory exists
    await fs.mkdir(phonesDir, { recursive: true });

    // Sanitize the model name to create a valid filename
    const fileName = `${phoneData.brand.toLowerCase().replace(/ /g, '-')}-${phoneData.model.toLowerCase().replace(/ /g, '-')}.json`;
    const filePath = path.join(phonesDir, fileName);

    // Prepare the full phone object to be saved
    const fullPhoneData = {
        ...phoneData,
        specs: phoneData.specs // The specs are already in the correct format
    };
    
    // Write the file to the database directory
    await fs.writeFile(filePath, JSON.stringify(fullPhoneData, null, 2), 'utf-8');
    
    console.log(`Successfully saved phone data to ${filePath}`);
    return { success: true, message: `Saved ${phoneData.model} to the database.` };

  } catch (error: any) {
    console.error('Error saving phone to database:', error);
    return { success: false, error: error.message || 'Failed to save phone data.' };
  }
}
