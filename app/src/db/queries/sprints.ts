import { D1Database } from '@cloudflare/workers-types'
import { getDb, db } from '../db'
import { Sprint } from '../types'
import { sprint } from '../schema'

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