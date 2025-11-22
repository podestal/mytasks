import { getDb, db } from "../db"
import { tasks } from "../schema"
import { Task } from "../types"
import { D1Database } from "@cloudflare/workers-types"

export const createTask = async (task: Task, d1?: D1Database): Promise<Task> => {
    /**
     * Create a task
     * @param task - Task data
     * @param d1 - D1Database instance
     * @returns Promise<Task>
     */
    const database = d1 ? getDb(d1) : db
    if (!database) {
        throw new Error('Database not available. Use getDb(d1) in Cloudflare Workers or set SQLITE_PATH for local dev.')
    }
    const result: Task = await database
        .insert(tasks)
        .values(task)
        .returning()
    if (!result) {
        throw new Error('Failed to create task: no result returned')
    }
    return result
}