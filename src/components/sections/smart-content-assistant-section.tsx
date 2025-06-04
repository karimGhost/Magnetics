// components/SmartContentAssistantSection.tsx
// Place this file in `components/SmartContentAssistantSection.tsx`

"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2, AlertTriangle, ExternalLink, BookOpen } from 'lucide-react';
// This import is crucial for your client-side fetch helper
import { recommendTechArticles, type RecommendTechArticlesOutput } from '@/ai/flows/recommend-tech-articles'; // Your client-side fetch helper

// You need to define the client-side `recommendTechArticles` function as it was provided in your initial prompt.
// This function acts as a wrapper for your API call.
async function recommendTechArticlesClient({ keywords }: { keywords: string }): Promise<RecommendTechArticlesOutput> {
  const res = await fetch('/api/recommend-tech-articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keywords }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'API error');
  }
  return res.json();
}


import { useToast } from "@/hooks/use-toast"; // Ensure you have this hook from Shadcn UI

export function SmartContentAssistantSection() {
  const [keywords, setKeywords] = useState('');
  const [recommendations, setRecommendations] = useState<RecommendTechArticlesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) {
      setError("Please enter some keywords.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendations(null); // Clear previous recommendations

    try {
      // Call the client-side fetch helper
      const result = await recommendTechArticlesClient({ keywords });
      if (result && result.articleTitles && result.articleTitles.length > 0) {
        setRecommendations(result);
      } else {
        setError("No relevant articles found for your keywords. Try different terms.");
      }
    } catch (err: any) { // Use any for error type if you're not strictly typing
      console.error("Error fetching recommendations:", err);
      setError(`Sorry, something went wrong while fetching recommendations: ${err.message || 'Unknown error'}. Please try again later.`);
      toast({
        title: "Error",
        description: `Failed to fetch recommendations: ${err.message || 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="assistant" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
            <Lightbulb className="inline-block w-4 h-4 mr-1 mb-0.5" />
            Quick Help
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Magnetics AI Content Assistant</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Looking for tech tips, repair guides, or articles? Enter some keywords, and our AI assistant will find relevant content for you.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle>Find Tech Articles & Guides</CardTitle>
            <CardDescription>Enter keywords like "laptop battery replacement" or "smartphone security tips".</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="e.g., fix slow computer, iphone screen repair..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="text-base"
                aria-label="Keywords for tech articles"
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Get Recommendations"
                )}
              </Button>
            </form>
          </CardContent>
          
          {error && (
            <CardFooter className="flex flex-col items-start border-t px-6 py-4">
               <div className="flex items-center text-destructive">
                <AlertTriangle className="mr-2 h-5 w-5" />
                <p>{error}</p>
              </div>
            </CardFooter>
          )}

          {recommendations && recommendations.articleTitles.length > 0 && (
            <CardFooter className="flex flex-col items-start border-t px-6 py-4 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Recommended For You:</h3>
              <div className="w-full space-y-3">
                {recommendations.articleTitles.map((title, index) => (
                  <div key={index} className="p-3 border rounded-md bg-secondary/50 hover:bg-secondary/70 transition-colors">
                    <h4 className="font-medium text-primary flex items-center">
                      <BookOpen size={18} className="mr-2 shrink-0" />
                      {title}
                    </h4>
                    {recommendations.articleDescriptions[index] && (
                      <p className="text-sm text-muted-foreground mt-1">{recommendations.articleDescriptions[index]}</p>
                    )}
                    {/* Link to Google Search for the article */}
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(title + " tech article")}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline mt-2 inline-flex items-center"
                    >
                      Read More <ExternalLink size={12} className="ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  );
}