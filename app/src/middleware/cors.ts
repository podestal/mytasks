import { cors } from 'hono/cors'

// Parse ALLOWED_HOSTS from environment variable
// Supports comma-separated list: http://localhost:5173,http://example.com
const getAllowedOrigins = (): string[] => {
  const allowedHosts = process.env.ALLOWED_HOSTS || ''


  if (!allowedHosts) {
    return []
  }
  // Split by comma and trim whitespace
  return allowedHosts.split(',').map(host => host.trim()).filter(Boolean)
}

// Create CORS middleware with dynamic origin checking
export const corsMiddleware = cors({
  origin: (origin) => {
    const allowedOrigins = getAllowedOrigins()
    
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

