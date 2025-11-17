import { Hono } from 'hono'
import { createProject, getProjects } from './db/queries'

const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/projects', async (c) => {
  const projects = await getProjects()
  return c.json(projects)
})

app.post('/projects', async (c) => {
  const body = await c.req.json()
  const project = await createProject(body)
  return c.json(project)
})

export default app