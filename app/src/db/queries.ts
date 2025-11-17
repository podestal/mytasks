import { db } from './db'
import { projects } from './schema'
import { desc } from 'drizzle-orm'
import { Project } from './types'

export const getProjects = async () => {
    return await db
    .select()
    .from(projects)
    .orderBy(desc(projects.created_at))
}


export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const [result] = await db
        .insert(projects)
        .values(project)
        .returning()
    return result
}
