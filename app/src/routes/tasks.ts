import { D1Database } from "@cloudflare/workers-types"
import { createTaskHandler } from "../handlers/tasks"
import { Hono } from "hono"

type Env = {
    DB?: D1Database
  }

const tasksRouter = new Hono<{ Bindings: Env }>()

tasksRouter.post('/', createTaskHandler)

export default tasksRouter