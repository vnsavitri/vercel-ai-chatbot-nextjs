import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const response = await openai.createChatCompletion({
      model: 'gpt-4',  // Replace with your model
      messages,
    });

    return NextResponse.json({ response: response.data });
  } catch (error) {
    return new Response('Error communicating with OpenAI API', {
      status: 500,
    });
  }
}
