import 'dotenv/config'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import projectsRouter from './routes/projects'
import type { D1Database } from '@cloudflare/workers-types'
import sprintsRouter from './routes/sprints'
import { corsMiddleware } from './middleware/cors'

type Env = {
  DB?: D1Database
}

const app = new Hono<{ Bindings: Env }>().basePath('/api')

const isDev = process.env.NODE_ENV !== 'production'

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

// Explicit server setup for Bun (ensures logs work properly)
if (typeof Bun !== 'undefined') {
  const port = Number(process.env.PORT) || 3000
  
  // Only show detailed logs in development mode
  if (isDev) {
    console.log('🚀 Starting MyTasks API Server...')
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`🌐 CORS allowed hosts: ${process.env.ALLOWED_HOSTS || 'none configured'}`)
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
