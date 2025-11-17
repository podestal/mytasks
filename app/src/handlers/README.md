# Handlers Directory

This directory contains request handlers - they contain the business logic for processing requests.

## Structure

- `projects.ts` - Project-related handlers
- `users.ts` - User-related handlers (future)
- etc.

## Example: handlers/projects.ts

```ts
import type { Context } from 'hono'
import type { D1Database } from '@cloudflare/workers-types'
import { getProjects, createProject, getProject, updateProject, deleteProject } from '../db/queries'

type Env = {
  DB?: D1Database
}

// GET /api/projects
export const getProjectsHandler = async (c: Context<{ Bindings: Env }>) => {
  try {
    const projects = await getProjects(c.env.DB)
    return c.json(projects)
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
}

// POST /api/projects
export const createProjectHandler = async (c: Context<{ Bindings: Env }>) => {
  try {
    const body = await c.req.json()
    // Add validation here if needed
    const project = await createProject(body, c.env.DB)
    return c.json(project, 201)
  } catch (error: any) {
    console.error('Error creating project:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
}

// GET /api/projects/:id
export const getProjectHandler = async (c: Context<{ Bindings: Env }>) => {
  try {
    const id = parseInt(c.req.param('id'))
    const project = await getProject(id, c.env.DB)
    if (!project) {
      return c.json({ error: 'Project not found' }, 404)
    }
    return c.json(project)
  } catch (error: any) {
    console.error('Error fetching project:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
}

// PATCH /api/projects/:id
export const updateProjectHandler = async (c: Context<{ Bindings: Env }>) => {
  try {
    const id = parseInt(c.req.param('id'))
    const body = await c.req.json()
    const project = await updateProject(id, body, c.env.DB)
    return c.json(project)
  } catch (error: any) {
    console.error('Error updating project:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
}

// DELETE /api/projects/:id
export const deleteProjectHandler = async (c: Context<{ Bindings: Env }>) => {
  try {
    const id = parseInt(c.req.param('id'))
    await deleteProject(id, c.env.DB)
    return c.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting project:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
}
```

## Pattern

1. Extract data from request (params, body, query)
2. Call database query function (pass `c.env.DB`)
3. Handle errors
4. Return JSON response

