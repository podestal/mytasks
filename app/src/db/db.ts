// Unified database factory - works for both local dev and Cloudflare Workers
import type { D1Database } from '@cloudflare/workers-types'

// For Cloudflare Workers with D1
function createD1Db(d1: D1Database) {
  const { drizzle } = require('drizzle-orm/d1')
  return drizzle(d1)
}

// Factory function - automatically detects environment
export function getDb(d1?: D1Database) {
  // Cloudflare Workers: use D1 (when d1 is provided)
  if (d1) {
    return createD1Db(d1)
  }
  
  // Local development: use Bun SQLite
  // Use eval to prevent bundler from analyzing this path
  if (typeof process !== 'undefined' && process.env?.SQLITE_PATH) {
    try {
      // @ts-ignore - eval prevents static analysis
      const localDbModule = eval('require')('./db-local')
      return localDbModule.createLocalDb()
    } catch (e) {
      throw new Error('Local database not available. Make sure you are running in local development mode.')
    }
  }
  
  throw new Error('Database not initialized. Provide D1 binding (c.env.DB) for Cloudflare Workers or set SQLITE_PATH for local development.')
}

// Export for local dev convenience (when running with Bun directly, not in Workers)
let localDb: any = null
export const db = (() => {
  try {
    if (typeof process !== 'undefined' && process.env?.SQLITE_PATH && !process.env.CF_PAGES) {
      if (!localDb) {
        // @ts-ignore - eval prevents static analysis
        const localDbModule = eval('require')('./db-local')
        localDb = localDbModule.createLocalDb()
      }
      return localDb
    }
  } catch {
    // Ignore if not in local dev environment
  }
  return null
})()
