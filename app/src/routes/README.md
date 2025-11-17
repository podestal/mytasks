# Routes Directory

This directory contains route definitions - they map URLs to handlers.

## Structure

- `index.ts` - Aggregates all routes
- `projects.ts` - Project-related routes
- `users.ts` - User-related routes (future)
- etc.

## Example: routes/projects.ts

```ts
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
projectsRouter.get('/:id', getProjectHandler)      // GET /api/projects/:id
projectsRouter.patch('/:id', updateProjectHandler) // PATCH /api/projects/:id
projectsRouter.delete('/:id', deleteProjectHandler) // DELETE /api/projects/:id

export default projectsRouter
```

## Example: routes/index.ts

```ts
import { Hono } from 'hono'
import projectsRouter from './projects'
// import usersRouter from './users'
import type { D1Database } from '@cloudflare/workers-types'

type Env = {
  DB?: D1Database
}

const router = new Hono<{ Bindings: Env }>()

// Health check
router.get('/', (c) => {
  return c.json({ status: 'ok', message: 'MyTasks API' })
})

// Mount all route modules
router.route('/projects', projectsRouter)
// router.route('/users', usersRouter)

export default router
```

## Usage in index.ts

```ts
// In your main index.ts:
import router from './routes'
app.route('/api', router)
```

