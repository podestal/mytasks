import { Context } from "hono"
import { createSprint } from "../db/queries/sprints"
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