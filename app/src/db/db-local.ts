// Local development database (Bun SQLite) - only imported in local dev
// This file is never imported in Cloudflare Workers builds

// @ts-ignore - bun:sqlite only available in Bun runtime
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

const sqliteFilePath = process.env.SQLITE_PATH!

export function createLocalDb() {
  const sqlite = new Database(sqliteFilePath)
  return drizzle(sqlite)
}

