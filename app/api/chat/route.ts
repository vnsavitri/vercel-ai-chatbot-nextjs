import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the environment variable is set
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      messages,
      model: 'gpt-4o-mini-2024-07-18',  // Using the correct model
    });

    return NextResponse.json({ response: completion.choices[0] });
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error);
    return new Response('Error communicating with OpenAI API', {
      status: 500,
    });
  }
}
