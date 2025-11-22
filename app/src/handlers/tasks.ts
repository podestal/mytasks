import { Context } from "hono"
import { createTask } from "../db/queries/tasks"
import { D1Database } from "@cloudflare/workers-types"

type Env = {
    DB?: D1Database
}

export const createTaskHandler = async (c: Context<{ Bindings: Env }>) => {
    try {
        const body = await c.req.json()
        const task = await createTask(body, c.env.DB)
        return c.json(task, 201)
    } catch (error: any) {
        console.error('Error creating task:', error)
        return c.json({ error: error.message || 'Internal server error' }, 500)
    }
}

