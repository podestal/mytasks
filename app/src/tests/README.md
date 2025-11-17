# Tests Directory

This directory contains test files.

## Structure

- `handlers/` - Handler tests
- `routes/` - Route integration tests
- `db/` - Database query tests
- `utils/` - Utility function tests

## Example: tests/handlers/projects.test.ts

```ts
import { describe, it, expect, beforeEach, mock } from 'bun:test'
import { getProjectsHandler, createProjectHandler } from '../../handlers/projects'
import * as queries from '../../db/queries'

// Mock the queries module
mock.module('../../db/queries', () => ({
  getProjects: mock(() => Promise.resolve([{ id: 1, name: 'Test' }])),
  createProject: mock(() => Promise.resolve({ id: 1, name: 'Test' })),
}))

describe('Projects Handlers', () => {
  const mockContext = {
    env: { DB: {} as any },
    req: {
      param: (key: string) => key === 'id' ? '1' : undefined,
      json: async () => ({ name: 'Test Project', description: 'Test' }),
    },
    json: (data: any, status?: number) => ({ data, status: status || 200 }),
  } as any

  it('should get projects', async () => {
    const result = await getProjectsHandler(mockContext)
    expect(result.status).toBe(200)
  })

  it('should create project', async () => {
    const result = await createProjectHandler(mockContext)
    expect(result.status).toBe(201)
  })
})
```

## Example: tests/db/queries.test.ts

```ts
import { describe, it, expect } from 'bun:test'
import { getProjects } from '../../db/queries'
import { db } from '../../db/db'

describe('Database Queries', () => {
  it('should get all projects', async () => {
    // Use local db for testing
    const projects = await getProjects(undefined) // undefined = use local db
    expect(Array.isArray(projects)).toBe(true)
  })
})
```

## Running Tests

```bash
bun test                    # Run all tests
bun test --watch           # Watch mode
bun test handlers/         # Run specific test directory
```

