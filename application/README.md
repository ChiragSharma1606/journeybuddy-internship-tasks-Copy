# JourneyBuddy Application

## Overview

JourneyBuddy is a prototype travel assistant built with Next.js. It provides a chat interface where users can ask travel-related questions and receive responses through the Gemini API.

## Features

- Next.js App Router frontend
- Chat-style user interface
- Server-side API endpoint at `/api/ask`
- Gemini API integration for AI-generated responses
- Input validation and error handling
- Markdown rendering for formatted responses
- Docker support using a multi-stage build

## Technology Stack

- Next.js
- React and TypeScript
- Google Gemini API (`@google/genai`)
- React Markdown and remark-gfm
- Docker

## Requirements

- Node.js 22 or newer
- npm
- A valid Gemini API key for AI responses
- Docker, if running the containerized version

## Environment Setup

Create a `.env.local` file in this directory and add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder with your own API key. Never commit `.env.local` or expose your API key publicly.

## Run Locally

From this directory, run:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Run with Docker

Build the Docker image:

```bash
docker build -t journeybuddy .
```

Run the container:

```bash
docker run -d --name journeybuddy-app -p 3000:3000 --env-file .env.local journeybuddy
```

Open [http://localhost:3000](http://localhost:3000).

To stop the container:

```bash
docker stop journeybuddy-app
docker rm journeybuddy-app
```

## API Endpoint

`POST /api/ask`

Example request body:

```json
{
  "question": "Plan a two-day trip to Goa"
}
```

The endpoint validates the question and returns an answer when the Gemini API request succeeds. API availability may depend on model availability, network connectivity, and API quotas.

## Limitations

This application is a prototype. Firebase authentication, Redis rate limiting, MongoDB Atlas vector search, Pinecone, a LangChain retrieval pipeline, Google ADK mobile integration, and Google Cloud deployment are not yet confirmed as integrated into this running application.

The Docker image supports running the Next.js application in a container. It does not, by itself, deploy the application publicly.

## Security

- Keep API keys in environment variables.
- Do not commit `.env.local`.
- Do not expose secrets in screenshots, logs, or source code.

## Related Documentation

See the repository's module folders and `final-integration-project/README.md` for the conceptual architecture and integration design.
