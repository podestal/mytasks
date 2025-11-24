// Note: dotenv is not needed in Cloudflare Workers (they use c.env)
// For local dev with Bun, dotenv can be loaded via CLI: bun --env-file=.env run src/index.ts
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import projectsRouter from './routes/projects'
import type { D1Database } from '@cloudflare/workers-types'
import sprintsRouter from './routes/sprints'
import { corsMiddleware } from './middleware/cors'
import tasksRouter from './routes/tasks'

type Env = {
  DB?: D1Database
  ALLOWED_HOSTS?: string
}

const app = new Hono<{ Bindings: Env }>().basePath('/api')

// Safe check for NODE_ENV (works in both Workers and local dev)
const isDev = typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'

// Global error handler
app.onError((err, c) => {
  console.error('Global error:', err)
  console.error('Error stack:', err.stack)
  return c.json({ 
    error: err.message || 'Internal server error',
    // Only show stack in development
    ...(isDev && { stack: err.stack })
  }, 500)
})

app.use('*', logger())

// Apply CORS middleware
app.use('*', corsMiddleware)

// Health check
app.get('/', (c) => {
  return c.json({ status: 'ok', message: 'MyTasks API' })
})

// Mount project routes
app.route('/projects', projectsRouter)
app.route('/sprints', sprintsRouter)
app.route('/tasks', tasksRouter)

// Explicit server setup for Bun (ensures logs work properly)
if (typeof Bun !== 'undefined') {
  const port = Number(process.env.PORT) || 3000
  
  // Only show detailed logs in development mode
  if (isDev) {
    console.log('🚀 Starting MyTasks API Server...')
    console.log(`📝 Environment: ${typeof process !== 'undefined' ? process.env.NODE_ENV || 'development' : 'cloudflare-workers'}`)
    console.log(`🌐 CORS allowed hosts: ${typeof process !== 'undefined' ? process.env.ALLOWED_HOSTS || 'none configured' : 'configured via c.env'}`)
    console.log(`🔗 Server running at http://localhost:${port}`)
    console.log('📊 Request logs will appear below:\n')
  }
  
  // Explicitly serve the app with Bun
  Bun.serve({
    port,
    fetch: app.fetch,
    error(error) {
      // Always log errors, but with less detail in production
      if (isDev) {
        console.error('❌ Server error:', error)
      } else {
        console.error('❌ Server error')
      }
      return new Response('Internal Server Error', { status: 500 })
    },
  })
  
  if (isDev) {
    console.log(`✅ Server started successfully on port ${port}`)
  }
}

// Export for Cloudflare Workers or auto-detection
export default app
