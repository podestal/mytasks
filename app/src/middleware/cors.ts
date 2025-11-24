import { cors } from 'hono/cors'
import type { Context } from 'hono'

// Parse ALLOWED_HOSTS from environment variable
// Supports comma-separated list: http://localhost:5173,http://example.com
const getAllowedOrigins = (allowedHosts?: string): string[] => {
  // Try to get from parameter first (Cloudflare Workers c.env), then fallback to process.env (local dev)
  const hosts = allowedHosts || (typeof process !== 'undefined' ? process.env.ALLOWED_HOSTS : undefined) || ''

  if (!hosts) {
    return []
  }
  // Split by comma and trim whitespace
  return hosts.split(',').map(host => host.trim()).filter(Boolean)
}

// Create CORS middleware with dynamic origin checking
// Works with both Cloudflare Workers (c.env) and local dev (process.env)
export const corsMiddleware = cors({
  origin: (origin, c: Context) => {
    // Get ALLOWED_HOSTS from Cloudflare Workers env (c.env) or fallback to process.env for local dev
    const allowedHosts = c.env?.ALLOWED_HOSTS || (typeof process !== 'undefined' ? process.env.ALLOWED_HOSTS : undefined)
    const allowedOrigins = getAllowedOrigins(allowedHosts)
    
    // Allow all origins if '*' is in the list (development mode)
    if (allowedOrigins.includes('*')) {
      return origin || '*'
    }
    
    // Check if the request origin is in the allowed list
    if (origin && allowedOrigins.includes(origin)) {
      return origin
    }
    
    // If no origin header (same-origin request), allow it
    if (!origin) {
      return '*'
    }
    
    // Reject origin not in allowed list - return null to deny
    return null
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  credentials: true,
  maxAge: 86400, // 24 hours
})

