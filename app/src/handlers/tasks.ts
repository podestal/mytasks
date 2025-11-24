import { Context } from "hono"
import { createTask, deleteTaskById, getTasksBySprintId, updateTaskById } from "../db/queries/tasks"
import { D1Database } from "@cloudflare/workers-types"

type Env = {
    DB?: D1Database
}

export const getTasksBySprintIdHandler = async (c: Context<{ Bindings: Env }>) => {
    try {
        const sprintId = parseInt(c.req.param('sprintId'))
        const tasks = await getTasksBySprintId(sprintId, c.env.DB)
        return c.json(tasks)
    } catch (error: any) {
        console.error('Error getting tasks by sprint ID:', error)
        return c.json({ error: error.message || 'Internal server error' }, 500)
    }
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

export const updateTaskByIdHandler = async (c: Context<{ Bindings: Env }>) => {
    try {
        const id = parseInt(c.req.param('id'))
        const body = await c.req.json()
        const task = await updateTaskById(id, body, c.env.DB)
        return c.json(task, 200)
    } catch (error: any) {
        console.error('Error updating task by ID:', error)
        return c.json({ error: error.message || 'Internal server error' }, 500)
    }
}

export const deleteTaskByIdHandler = async (c: Context<{ Bindings: Env }>) => {
    try {
        const id = parseInt(c.req.param('id'))
        await deleteTaskById(id, c.env.DB)
        return c.json({ message: 'Task deleted successfully' }, 200)
    } catch (error: any) {
        console.error('Error deleting task by ID:', error)
        return c.json({ error: error.message || 'Internal server error' }, 500)
    }
}

