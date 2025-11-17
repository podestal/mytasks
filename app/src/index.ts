import { Hono } from 'hono'
import { createProject, getProjects } from './db/queries'
import type { D1Database } from '@cloudflare/workers-types'

type Env = {
  DB?: D1Database
}

const app = new Hono<{ Bindings: Env }>().basePath('/api')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Works in both environments:
// - Cloudflare Workers: c.env.DB is provided
// - Local dev: uses db from db.ts (Bun SQLite)
app.get('/projects', async (c) => {
  const projects = await getProjects(c.env.DB)
  return c.json(projects)
})

app.post('/projects', async (c) => {
  const body = await c.req.json()
  const project = await createProject(body, c.env.DB)
  return c.json(project)
})

export default app
