import { afterEach } from 'vitest'
import { clearTestSessionStore } from '../helpers/test-auth.helper'

afterEach(async (context) => {
  if (context.app) {
    await context.app.close()
  }
  clearTestSessionStore()
})
