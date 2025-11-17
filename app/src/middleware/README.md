# Middleware Directory

This directory contains reusable middleware functions.

## Structure

- `error.ts` - Global error handler
- `cors.ts` - CORS middleware
- `auth.ts` - Authentication middleware
- `logger.ts` - Request logging
- etc.

## Example: middleware/error.ts

```ts
import type { ErrorHandler } from 'hono'

// Global error handler for Hono
export const errorHandler: ErrorHandler = (error, c) => {
  console.error('Unhandled error:', error)
  return c.json(
    {
      error: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    },
    500
  )
}
```

## Example: middleware/cors.ts

```ts
import type { Context, Next } from 'hono'

export const cors = async (c: Context, next: Next) => {
  c.header('Access-Control-Allow-Origin', '*')
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204)
  }
  
  await next()
}
```

## Example: middleware/auth.ts

```ts
import type { Context, Next } from 'hono'

export const auth = async (c: Context, next: Next) => {
  const token = c.req.header('Authorization')
  
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  // Verify token here
  // const user = await verifyToken(token)
  // c.set('user', user)
  
  await next()
}
```

## Usage in index.ts

```ts
import { errorHandler } from './middleware/error'
import { cors } from './middleware/cors'

app.onError(errorHandler)
app.use('*', cors)
```

