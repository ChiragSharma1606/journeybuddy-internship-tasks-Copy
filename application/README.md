# JourneyBuddy Application (Prototype)

This folder contains the first runnable application slice for the Intelligent Assistant System.

## Current Features

- Next.js App Router interface for asking questions.
- Server-side `POST /api/ask` endpoint.
- Basic JSON and question validation.
- Demo responses so the interface can be tested without external API keys.
- Responsive chat-style UI.

## Requirements

- Node.js 20.9 or newer
- npm

## Run Locally

From this folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Test the API

```bash
curl -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Plan a weekend trip"}'
```

An empty or invalid question should return a JSON error response.

## Current Limitations

The API returns a demo response. Firebase authentication, Redis rate limiting, MongoDB Atlas Vector Search, Pinecone, LangChain/LLM integration, Google ADK mobile client, Docker image, and GCP deployment have not been connected or tested yet.

Do not enter secrets or sensitive personal information. Do not treat the demo response as AI-generated advice.
