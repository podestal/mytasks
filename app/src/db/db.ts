import { drizzle } from 'drizzle-orm/better-sqlite3'
// @ts-ignore
import Database from 'better-sqlite3'

const sqliteFilePath = process.env.SQLITE_PATH!

// Create or open a local SQLite database file.
export const sqlite = new Database(sqliteFilePath)

// Drizzle client for SQLite
export const db = drizzle(sqlite)