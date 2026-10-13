# Docker Containerization

## Objective

Design and document a multi-stage Docker build that packages an application with its runtime dependencies. This module demonstrates containerization, image optimization, environment configuration, and security best practices using the JourneyBuddy Next.js application.

## 1. Multi-Stage Build Strategy

A multi-stage Docker build separates dependency installation, application compilation, and production runtime execution. This helps reduce the final image size and excludes unnecessary development files.

```text
Source Code
    |
    v
Dependencies Stage
Install npm Dependencies
    |
    v
Builder Stage
Build Next.js Application
    |
    v
Runtime Stage
Copy Standalone Build Artifacts
    |
    v
Run as Non-Root User
    |
    v
Expose Port 3000
    |
    v
Start Application
```

### Benefits

- Reduces unnecessary files in the production image.
- Separates build-time dependencies from runtime artifacts.
- Improves build-cache reuse.
- Supports consistent execution across environments.
- Helps reduce the attack surface by running as a non-root user.

## 2. JourneyBuddy Dockerfile

JourneyBuddy is a Next.js application configured to use the standalone production output. The following Dockerfile uses three stages: dependencies, builder, and runner.

```dockerfile
FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

### Explanation

- **Dependencies stage:** Installs the packages defined in `package.json` and `package-lock.json` using `npm ci`.
- **Builder stage:** Copies the source code and builds the Next.js application.
- **Runner stage:** Copies only the standalone server and static build artifacts required to run the application.
- **Non-root user:** Runs the production server as the `nextjs` user rather than root.
- **Port 3000:** Exposes the port used by the Next.js application.

### Next.js Configuration

The `next.config.ts` file must enable standalone output:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

The standalone build generates a production server and the required runtime dependencies.

## 3. Docker Ignore Configuration

A `.dockerignore` file prevents unnecessary files from being sent to the Docker build context.

Example configuration:

```text
node_modules
.next
.git
.env
.env.*
!.env.example
npm-debug.log*
coverage
```

### Benefits

- Excludes local dependencies and generated build files.
- Reduces the size of the Docker build context.
- Prevents local environment files from being included in the build context.
- Helps improve build performance.

**Security note:** `.dockerignore` is an additional safeguard, not a replacement for secret management. Never copy API keys into the Docker image.

## 4. Build and Run the Application

Run these commands from the `application` directory.

### Step 1: Build the image

```bash
docker build -t journeybuddy .
```

This command builds the Docker image using the Dockerfile in the current directory.

### Step 2: Start the container

Create a `.env.local` file containing your Gemini API key, then run:

```bash
docker run -d --name journeybuddy-app -p 3000:3000 --env-file .env.local journeybuddy
```

The environment file is provided at runtime. Do not commit it to GitHub.

### Step 3: Access the application

Open the following URL in a browser:

http://localhost:3000

### Step 4: Stop and remove the container

```bash
docker stop journeybuddy-app
docker rm journeybuddy-app
```

### Step 5: Rebuild after code changes

Stop and remove the existing container, rebuild the image, and start a new container using the commands above.

## 5. Configuration and Environment Variables

JourneyBuddy uses environment variables to configure sensitive information and runtime behavior.

Example `.env.local` entry:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder with your own API key.

Best practices:

- Keep API keys outside the source code.
- Do not commit `.env.local` to GitHub.
- Configure production secrets through the hosting platform's secret-management mechanism.
- Avoid printing secrets in logs.
- Validate configuration before starting services.

## 6. Layer Optimization

Docker image layers can be optimized through careful ordering of build instructions.

Recommended practices:

- Copy dependency manifests before application source code.
- Use `npm ci` for reproducible dependency installation when a lockfile is available.
- Use multi-stage builds to separate build dependencies from runtime files.
- Exclude unnecessary files through `.dockerignore`.
- Use maintained base images and rebuild them regularly.
- Avoid installing unnecessary packages in the runtime stage.

## 7. Security Best Practices

- Run the application as a non-root user where practical.
- Do not hardcode secrets in Dockerfiles.
- Never include real API keys in source code or container images.
- Use environment variables or a secrets manager for credentials.
- Keep base images and application dependencies updated.
- Expose only the required application ports.
- Restrict access to production services using appropriate network and access controls.

## 8. Testing and Verification

After building and running the container, verify the following:

- The Docker image builds without errors.
- The container starts successfully.
- The application is accessible at `http://localhost:3000`.
- The chatbot returns responses when the Gemini API is available and correctly configured.
- Invalid requests and API failures are handled appropriately.
- API credentials are not committed to the repository or embedded in the image.

Docker support alone does not prove that every external service or the complete integrated architecture is operational. Testing should be performed in the target environment.

## 9. Limitations

This Docker configuration packages the JourneyBuddy Next.js application as a standalone container.

It does not automatically deploy the application to the cloud or implement the other services described in the final integration architecture, such as Firebase Authentication, Redis, MongoDB Atlas Vector Search, Pinecone, LangChain, Google ADK, or Google Cloud infrastructure.

Those components require their own implementation and integration before they can be considered operational.

## 10. Conclusion

Docker multi-stage builds provide a repeatable way to package and run the JourneyBuddy application. By using standalone output, excluding unnecessary files, keeping secrets outside the image, and running as a non-root user, the configuration follows important containerization and security practices.

## Official Documentation

- Docker documentation: https://docs.docker.com/
- Dockerfile reference: https://docs.docker.com/reference/dockerfile/
- Docker build best practices: https://docs.docker.com/build/building/best-practices/
- Docker build context and `.dockerignore`: https://docs.docker.com/build/concepts/context/
- Next.js deployment documentation: https://nextjs.org/docs/app/building-your-application/deploying
- Next.js standalone output: https://nextjs.org/docs/app/api-reference/config/next-config-js/output
- Node.js documentation: https://nodejs.org/docs/latest/api/
