// GLOBAL TEST SETUP
//
// This file runs BEFORE any modules are loaded, ensuring environment variables
// are set before env.config.ts validates them.

import type { TestProject } from 'vitest/node'
import { INestApplication } from '@nestjs/common'

declare module 'vitest' {
  export interface TestContext {
    app?: INestApplication
  }
}

export default async function setup(_project: TestProject) {
  process.env.NODE_ENV = 'test'
  process.env.CLIENTS_WEB_APP_URL = 'http://localhost:3000'
  process.env.CLIENTS_WEB_SSR_URL = 'http://localhost:5174'
  process.env.S3_ENDPOINT = 'http://localhost:9000'
  process.env.S3_REGION = 'us-east-1'
  process.env.S3_ACCESS_KEY_ID = 'minioadmin'
  process.env.S3_SECRET_ACCESS_KEY = 'minioadmin'
  process.env.S3_BUCKET = 'test'

  process.env.API_BASE_URL = 'http://localhost:3000'
  process.env.API_PORT = '3000'
  process.env.BETTER_AUTH_SECRET = 'test-secret-key-for-testing-only'
  process.env.TRUSTED_ORIGINS = 'http://localhost:3000'

  process.env.MISTRAL_API_KEY = 'test'
  process.env.LANGFUSE_SECRET_KEY = 'test'
  process.env.LANGFUSE_PUBLIC_KEY = 'test'
  process.env.LANGFUSE_BASE_URL = 'http://localhost:3000'
  process.env.AI_DISABLED = 'true'

  return function teardown() {}
}
