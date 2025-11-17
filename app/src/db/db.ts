import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'

const sqliteFilePath = process.env.SQLITE_PATH!

// Create or open a local SQLite database file using Bun's native SQLite
export const sqlite = new Database(sqliteFilePath)

// Drizzle client for SQLite
export const db = drizzle(sqlite)