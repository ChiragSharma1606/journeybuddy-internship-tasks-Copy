
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("question" in body) ||
      typeof body.question !== "string"
    ) {
      return NextResponse.json(
        { error: "Please provide a question as text." },
        { status: 400 }
      );
    }

    const question = body.question.trim();

    if (!question) {
      return NextResponse.json(
        { error: "Question cannot be empty." },
        { status: 400 }
      );
    }

    if (question.length > 2000) {
      return NextResponse.json(
        { error: "Please keep your question under 2,000 characters." },
        { status: 413 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    let answer: string | undefined;
    let lastError: unknown;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash-lite",
          contents: `You are JourneyBuddy, a helpful travel assistant.
Answer the user's question clearly and practically.

User question: ${question}`,
        });

        answer = response.text;
        break;
      } catch (error) {
        lastError = error;

        const message =
          error instanceof Error ? error.message : String(error);

        const temporaryError =
          /503|UNAVAILABLE|high demand|429|RESOURCE_EXHAUSTED|500|502|504/i.test(
            message
          );

        if (!temporaryError || attempt === 2) {
          throw error;
        }

        await sleep(1000 * 2 ** attempt);
      }
    }

    if (!answer) {
      console.error("Gemini API error:", lastError);

      return NextResponse.json(
        { error: "Gemini returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Gemini API error:", error);

    return NextResponse.json(
      {
        error:
          "Gemini is temporarily unavailable or the request failed. Please try again later.",
      },
      { status: 502 }
    );
  }
}
