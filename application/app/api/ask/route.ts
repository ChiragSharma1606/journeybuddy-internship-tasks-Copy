import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("question" in body) ||
    typeof body.question !== "string"
  ) {
    return NextResponse.json({ error: "Please provide a question as text." }, { status: 400 });
  }

  const question = body.question.trim();

  if (!question) {
    return NextResponse.json({ error: "Question cannot be empty." }, { status: 400 });
  }

  if (question.length > 2000) {
    return NextResponse.json({ error: "Please keep your question under 2,000 characters." }, { status: 413 });
  }

  // Temporary demo response. Replace this with the LangChain retrieval/agent pipeline later.
  const answer =
    "Thanks for your question! JourneyBuddy's interface and API are connected. " +
    "This is a demo response for now; the next development step is to connect real retrieval and AI services. " +
    "You asked: " + question;

  return NextResponse.json({ answer });
}
