import { Hono } from 'hono'
import { getProjectsHandler, createProjectHandler } from '../handlers/projects'
import type { D1Database } from '@cloudflare/workers-types'

type Env = {
  DB?: D1Database
}

const projectsRouter = new Hono<{ Bindings: Env }>()

// Define routes and map them to handlers
projectsRouter.get('/', getProjectsHandler)        // GET /api/projects
projectsRouter.post('/', createProjectHandler)     // POST /api/projects
// projectsRouter.get('/:id', getProjectHandler)      // GET /api/projects/:id
// projectsRouter.patch('/:id', updateProjectHandler) // PATCH /api/projects/:id
// projectsRouter.delete('/:id', deleteProjectHandler) // DELETE /api/projects/:id

export default projectsRouter