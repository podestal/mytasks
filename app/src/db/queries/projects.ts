import { D1Database } from '@cloudflare/workers-types'
import { getDb, db } from '../db'
import { projects } from '../schema'
import { desc, eq } from 'drizzle-orm'
import { Project } from '../types'

export const getProjects = async (d1?: D1Database): Promise<Project[]> => {
    /**
     * Get all projects
     * @param d1 - D1Database instance
     * @returns Promise<Project[]>
     */
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    return await database
        .select()
        .from(projects)
        .orderBy(desc(projects.created_at))
}

export const getProjectById = async (id: number, d1?: D1Database): Promise<Project | undefined> => {
    /**
     * Get a project by ID
     * @param id - Project ID
     * @param d1 - D1Database instance
     * @returns Promise<Project | undefined>
     */
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    const result: Project[] = await database
        .select()
        .from(projects)
        .where(eq(projects.id, id))
        .limit(1)
    
    // Return first project or undefined if not found
    return result[0] || undefined
}

export const updateProject = async (id: number, project: Omit<Project, 'id' | 'created_at' | 'updated_at'>, d1?: D1Database): Promise<Project> => {
    /**
     * Update a project
     * @param id - Project ID
     * @param project - Project data
     * @param d1 - D1Database instance
     * @returns Promise<Project>
     */
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    const result: Project[] = await database
        .update(projects)
        .set(project)
        .where(eq(projects.id, id))
        .returning()
    // returning() returns an array, get the first element
    if (!result || result.length === 0) {
        throw new Error('Failed to update project: no result returned')
    }
    return result[0]
}

export const createProject = async (
    project: Omit<Project, 'id' | 'created_at' | 'updated_at'>,
    d1?: D1Database
): Promise<Project> => {
    /**
     * Create a project
     * @param project - Project data
     * @param d1 - D1Database instance
     * @returns Promise<Project>
     */
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    const result: Project[] = await database
        .insert(projects)
        .values(project)
        .returning()
    
    // returning() returns an array, get the first element
    if (!result || result.length === 0) {
        throw new Error('Failed to create project: no result returned')
    }
    
    return result[0]
}

export const deleteProject = async (id: number, d1?: D1Database): Promise<void> => {
    /**
     * Delete a project
     * @param id - Project ID
     * @param d1 - D1Database instance
     * @returns Promise<void>
     */
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    const result: Project[] = await database
        .delete(projects)
        .where(eq(projects.id, id))
        .returning()
    if (!result || result.length === 0) {
        throw new Error('Failed to delete project: no result returned')
    }
}
