import { D1Database } from '@cloudflare/workers-types'
import { getDb, db } from '../db'
import { Sprint } from '../types'
import { sprint } from '../schema'
import { desc, eq } from 'drizzle-orm'

export const createSprint = async (sprintData: Omit<Sprint, 'id' | 'created_at' | 'updated_at'>, d1?: D1Database): Promise<Sprint> => {
    /**
     * Create a sprint
     * @param sprint - Sprint data
     * @param d1 - D1Database instance
     * @returns Promise<Sprint>
     */
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    const result: Sprint = await database
        .insert(sprint)
        .values(sprintData)
        .returning()
    if (!result) {
        throw new Error('Failed to create sprint: no result returned')
    }
    return result
}

export const getSprintsByProjectId = async (projectId: number, d1?: D1Database): Promise<Sprint[]> => {
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    const result: Sprint[] = await database
        .select()
        .from(sprint)
        .where(eq(sprint.project_id, projectId))
        .orderBy(desc(sprint.updated_at))
    return result
}

export const getAllSprints = async (d1?: D1Database): Promise<Sprint[]> => {
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    const result: Sprint[] = await database
        .select()
        .from(sprint)
    return result
}

export const updateSprint = async (id: number, sprintData: Omit<Sprint, 'id' | 'created_at' | 'updated_at'>, d1?: D1Database): Promise<Sprint> => {
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    const result: Sprint = await database
        .update(sprint)
        .set(sprintData)
        .where(eq(sprint.id, id))
        .returning()
    return result
}

export const deleteSprint = async (id: number, d1?: D1Database): Promise<void> => {
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    await database
        .delete(sprint)
        .where(eq(sprint.id, id))
}