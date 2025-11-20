import { Hono } from 'hono'
import { 
    createSprintHandler,
    deleteSprintHandler,
    getAllSprintsHandler,
    updateSprintHandler
} from '../handlers/sprints'
import type { D1Database } from '@cloudflare/workers-types'

type Env = {
  DB?: D1Database
}

const sprintsRouter = new Hono<{ Bindings: Env }>()

// Define routes and map them to handlers
sprintsRouter.post('/', createSprintHandler)         // POST /api/sprints
sprintsRouter.get('/', getAllSprintsHandler)         // GET /api/sprints
sprintsRouter.patch('/:id', updateSprintHandler)         // PUT /api/sprints/:id
sprintsRouter.delete('/:id', deleteSprintHandler)         // DELETE /api/sprints/:id
export default sprintsRouter