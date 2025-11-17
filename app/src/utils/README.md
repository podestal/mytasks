# Utils Directory

This directory contains utility functions and helpers.

## Structure

- `validation.ts` - Input validation helpers
- `helpers.ts` - General helper functions
- `constants.ts` - App constants
- etc.

## Example: utils/validation.ts

```ts
// Validate project input
export const validateProject = (data: any) => {
  const errors: string[] = []
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required')
  }
  
  if (data.name && data.name.length > 255) {
    errors.push('Name must be less than 255 characters')
  }
  
  if (data.description && typeof data.description !== 'string') {
    errors.push('Description must be a string')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}
```

## Example: utils/helpers.ts

```ts
// Parse ID from params
export const parseId = (id: string | undefined): number | null => {
  if (!id) return null
  const parsed = parseInt(id)
  return isNaN(parsed) ? null : parsed
}

// Format error response
export const formatError = (message: string, status: number = 500) => {
  return {
    error: message,
    status
  }
}
```

## Example: utils/constants.ts

```ts
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const

export const MAX_PROJECT_NAME_LENGTH = 255
export const MAX_DESCRIPTION_LENGTH = 1000
```

