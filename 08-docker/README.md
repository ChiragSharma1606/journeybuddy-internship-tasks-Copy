# Docker Containerization

## Objective
Design a multi-stage Docker build that packages an application with its runtime dependencies.

## 1. Multi-Stage Build Strategy

```text
Source Code
    |
    v
Builder Stage
Install Dependencies
Compile / Build Application
    |
    v
Runtime Stage
Copy Required Build Artifacts
Install Runtime Dependencies
    |
    v
Expose Application Port
    |
    v
Start Application
```

## 2. Example Dockerfile

The following example assumes a Node.js application with a build script that generates a `dist` directory.

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

**Important:** This is a template, not a verified application-specific Dockerfile. It assumes `package.json` defines a build script and produces `dist/index.js`. Adjust the build output and startup command to match the actual application.

## 3. Layer Optimization

- Copy dependency manifests before application source files to improve build-cache reuse.
- Use multi-stage builds to avoid including build-only files in the runtime image.
- Use a `.dockerignore` file to exclude `node_modules`, `.git`, local environment files, and other unnecessary files.
- Pin and update base-image versions according to the project's maintenance policy.
- Run the application as a non-root user where practical.

## 4. Configuration and Security

- Do not hardcode secrets in the Dockerfile.
- Pass configuration through environment variables or a secrets manager.
- Avoid copying development credentials into the image.
- Use only the ports required by the application.

## Official Documentation

https://docs.docker.com/
