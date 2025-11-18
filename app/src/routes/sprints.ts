import { Hono } from 'hono'
import { 
    createSprintHandler
} from '../handlers/sprints'
import type { D1Database } from '@cloudflare/workers-types'

type Env = {
  DB?: D1Database
}

const sprintsRouter = new Hono<{ Bindings: Env }>()

// Define routes and map them to handlers
sprintsRouter.post('/', createSprintHandler)         // POST /api/sprints

export default sprintsRouter