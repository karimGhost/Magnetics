// app/api/recommend-tech-articles/route.ts
import { NextResponse } from 'next/server';
import { recommendTechArticles as recommendTechArticlesAI } from '@/ai/flows/recommend-tech-articles';

export async function POST(request: Request) {
  try {
    const { keywords } = await request.json();

    if (!keywords || typeof keywords !== 'string') {
      return NextResponse.json({ message: 'Keywords are required and must be a string.' }, { status: 400 });
    }

    const recommendations = await recommendTechArticlesAI({ keywords });
    return NextResponse.json(recommendations, { status: 200 });

  } catch (error) {
    console.error("Error in /api/recommend-tech-articles:", error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
// No default export needed for App Router API routes 

