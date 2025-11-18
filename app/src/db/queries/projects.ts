import { D1Database } from '@cloudflare/workers-types'
import { getDb, db } from '../db'
import { projects } from '../schema'
import { desc } from 'drizzle-orm'
import { Project } from '../types'

// Unified queries that work with both local SQLite and D1
export const getProjects = async (d1?: D1Database) => {
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    return await database
        .select()
        .from(projects)
        .orderBy(desc(projects.created_at))
}

export const createProject = async (
    project: Omit<Project, 'id' | 'created_at' | 'updated_at'>,
    d1?: D1Database
) => {
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    const result = await database
        .insert(projects)
        .values(project)
        .returning()
    
    // returning() returns an array, get the first element
    if (!result || result.length === 0) {
        throw new Error('Failed to create project: no result returned')
    }
    
    return result[0]
}