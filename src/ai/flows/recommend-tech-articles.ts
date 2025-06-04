// my-app/ai/flows/recommend-tech-articles.ts
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

export type RecommendTechArticlesOutput = {
  articleTitles: string[];
  articleDescriptions: string[];
};



export async function recommendTechArticles({ keywords }: { keywords: string }): Promise<RecommendTechArticlesOutput> {
  const apiKey = process.env.GEMINI_API_KEY; // <<< 

  if (!apiKey) {
    console.error('GOOGLE_API_KEY is not set. Please check your .env.local file.');
    throw new Error('Server configuration error: Google API Key is missing.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // const model = genAI.getGenerativeModel({ model: 'gemini-pro' }); // Using gemini-pro for text generation
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Use the recommended model for text
// const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' }); // This is for vision, not text, so likely wrong for this task.

  const prompt = `Based on the keywords "${keywords}", recommend 3 to 5 tech article titles and a brief description for each.
  Format your response strictly as a JSON array of objects, where each object has 'title' and 'description' keys.
  Ensure the output is a valid JSON string, and nothing else.
  
  Example of desired JSON output:
  [
    {"title": "How to Replace a Laptop SSD", "description": "A step-by-step guide to upgrading your laptop's storage for better performance."},
    {"title": "Understanding Wi-Fi 6E", "description": "Explore the benefits and features of the latest Wi-Fi standard for faster and more reliable connections."},
    {"title": "Troubleshooting Common Smartphone Issues", "description": "Learn to diagnose and fix everyday problems with your iPhone or Android device."}
  ]
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    });

const response = await result.response;
    const text = response.text();

    let cleanedText = text.trim(); // Trim whitespace from start/end

    // Regular expression to extract content within a 'json' markdown code block
    // It looks for ```json (or just ```) followed by content, then ```
    const jsonBlockRegex = /```json\s*([\s\S]*?)\s*```|```([\s\S]*?)```/;
    const match = cleanedText.match(jsonBlockRegex);

    if (match) {
        // Use the first non-null capturing group (either after ```json or just ```)
        cleanedText = match[1] || match[2];
    }

    // Fallback if no markdown block was found, assume it's just raw JSON
    if (!cleanedText) {
        cleanedText = text.trim();
    }

    let parsedContent: { title: string; description: string }[];
    try {
      // Attempt to parse the cleaned JSON response
      parsedContent = JSON.parse(cleanedText); // <<< Use cleanedText here

      // Basic validation to ensure it's an array of objects with title/description
      if (!Array.isArray(parsedContent) || !parsedContent.every(item => typeof item === 'object' && item !== null && 'title' in item && 'description' in item)) {
        throw new Error("Parsed content is not in the expected array of objects format.");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", cleanedText, parseError); // Log cleanedText for debugging
      throw new Error("AI response was not in the expected JSON format. Raw response: " + text.substring(0, 200) + "..."); // Still show original raw text if necessary
    }
 const articleTitles = parsedContent.map(item => item.title);
    const articleDescriptions = parsedContent.map(item => item.description);

    return { articleTitles, articleDescriptions };

  } catch (error: any) {
    console.error("Error generating content with Gemini:", error);
    // Return a fallback or re-throw a more specific error
    return {
      articleTitles: ["Failed to get recommendations from AI"],
      articleDescriptions: [`An error occurred: ${error.message || 'Unknown AI error'}. Check your GOOGLE_API_KEY and network connection.`],
    };}
}
