import { Context } from "hono"
import { createSprint, deleteSprint, getAllSprints, updateSprint } from "../db/queries/sprints"
import { D1Database } from "@cloudflare/workers-types"

type Env = {
    DB?: D1Database
}

export const createSprintHandler = async (c: Context<{ Bindings: Env }>) => {
    try {
      const body = await c.req.json()
      const sprint = await createSprint(body, c.env.DB)
      return c.json(sprint, 201)
    } catch (error: any) {
      console.error('Error creating sprint:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
}

export const getAllSprintsHandler = async (c: Context<{ Bindings: Env }>) => {
    try {
      const sprints = await getAllSprints(c.env.DB)
      return c.json(sprints)
    } catch (error: any) {
      console.error('Error getting sprints:', error)
      return c.json({ error: error.message || 'Internal server error' }, 500)
    }
}
  
export const updateSprintHandler = async (c: Context<{ Bindings: Env }>) => {
    try {
      const body = await c.req.json()
      const sprint = await updateSprint(parseInt(c.req.param('id')), body, c.env.DB)
      return c.json(sprint)
    } catch (error: any) {
      console.error('Error updating sprint:', error)
      return c.json({ error: error.message || 'Internal server error' }, 500)
    }
}

export const deleteSprintHandler = async (c: Context<{ Bindings: Env }>) => {
    try {
      const id = parseInt(c.req.param('id'))
      await deleteSprint(id, c.env.DB)
      return c.json({ message: 'Sprint deleted successfully' }, 200)
    } catch (error: any) {
      console.error('Error deleting sprint:', error)
      return c.json({ error: error.message || 'Internal server error' }, 500)
    }
}