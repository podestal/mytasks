import { Hono } from 'hono'
import projectsRouter from './routes/projects'
import type { D1Database } from '@cloudflare/workers-types'
import sprintsRouter from './routes/sprints'

type Env = {
  DB?: D1Database
}

const app = new Hono<{ Bindings: Env }>().basePath('/api')

// Health check
app.get('/', (c) => {
  return c.json({ status: 'ok', message: 'MyTasks API' })
})

// Mount project routes
app.route('/projects', projectsRouter)
app.route('/sprints', sprintsRouter)

export default app
