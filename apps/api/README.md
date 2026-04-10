# API Backend

This API is built with NestJS and serves as the backend for frontend applications.
[API Guidelines](../documentation/src/content/docs/references/backend.mdx)

## Architecture

The API is organized into modules following NestJS's modular architecture (see `src/modules/`).

## Stack

Among the most important:

- [NestJS](https://github.com/nestjs/nest) as the backend framework
- [BullMQ](https://docs.bullmq.io/) for background jobs
- [Zod](https://zod.dev/) for input and output API data validation
- [ESLint](https://eslint.org/) for code formatting and implementing various syntax rules
- [Antfu](https://github.com/antfu/eslint-config)'s ESLint configuration as a base
- [DotEnv](https://github.com/motdotla/dotenv) to manage configuration files (.env) regardless of OS

## Installation

```bash
pnpm install
```

## Configuration

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `API_BASE_URL` | Public base URL of the API | Yes | - |
| `API_PORT` | Port on which the API listens | Yes | - |
| `CLIENTS_WEB_APP_URL` | SPA origin | Yes | - |
| `CLIENTS_WEB_SSR_URL` | SSR app origin | Yes | - |
| `REDIS_HOST` | Redis host (BullMQ) | No | `localhost` |
| `REDIS_PORT` | Redis port | No | `6379` |
| `NODE_ENV` | Environment (development, production, test) | No | `development` |

See [`.env.example`](./.env.example) for reference.

## Getting Started

```bash
# Copy basic env
cp .env.example .env

# Run the API in development
pnpm run dev

# Run the API in production
pnpm run build
node dist/src/main.js
```

## OpenAPI documentation

The API is automatically documented with OpenAPI (if you use the correct decorators and add `openapi()` to your zod schemas).

In development, documentation is available at `http://localhost:<API_PORT>/api/docs`.

## Building with Docker

### Building the Image

```bash
# At the project root
docker build -t lonestone/api -f apps/api/Dockerfile .
```

### Running the Container

Pass the variables required by `env.config.ts` (see `.env.example`), for example:

```bash
docker run -p 3000:3000 \
  -e API_BASE_URL=http://localhost:3000 \
  -e API_PORT=3000 \
  -e CLIENTS_WEB_APP_URL=http://localhost:5173 \
  -e CLIENTS_WEB_SSR_URL=http://localhost:5174 \
  lonestone/api
```
