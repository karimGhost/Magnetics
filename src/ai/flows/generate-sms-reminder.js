'use server';
/**
 * @fileOverview Generates personalized SMS reminders for clients based on repair details.
 *
 * - generateSMSReminder - A function to generate SMS reminders.
 * - GenerateSMSReminderInputSchema - The Zod schema for the input.
 * - GenerateSMSReminderOutputSchema - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSMSReminderInputSchema = z.object({
  clientName: z.string().describe('The name of the client.'),
  itemName: z.string().describe('The name of the item being repaired.'),
  collectionDate: z.string().describe('The date the item will be ready for collection (e.g., YYYY-MM-DD).'),
  technicianName: z.string().describe('The name of the technician.'),
});

const GenerateSMSReminderOutputSchema = z.object({
  smsReminder: z.string().describe('The personalized SMS reminder message.'),
});

export async function generateSMSReminder(input) {
  return generateSMSReminderFlow(input);
}

const generateSMSReminderPrompt = ai.definePrompt({
  name: 'generateSMSReminderPrompt',
  input: {schema: GenerateSMSReminderInputSchema},
  output: {schema: GenerateSMSReminderOutputSchema},
  prompt: `You are an expert SMS message generator for Magnetics Repair Shop. Generate a personalized SMS reminder for the client.

  Client Name: {{{clientName}}}
  Item Name: {{{itemName}}}
  Collection Date: {{{collectionDate}}}

  Technician Name: {{{technicianName}}}

  The SMS should thank the client for choosing Magnetics Repair Shop, inform them that their item will be ready by the collection date, and include a friendly closing.
  `,
});

const generateSMSReminderFlow = ai.defineFlow(
  {
    name: 'generateSMSReminderFlow',
    inputSchema: GenerateSMSReminderInputSchema,
    outputSchema: GenerateSMSReminderOutputSchema,
  },
  async input => {
    const {output} = await generateSMSReminderPrompt(input);
    return output;
  }
);
