import type { Context } from 'hono'
import type { D1Database } from '@cloudflare/workers-types'
import { getProjects, createProject } from '../db/queries/projects'

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
    const project = await createProject(body, c.env.DB)
    return c.json(project, 201)
  } catch (error: any) {
    console.error('Error creating project:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
}

// Future handlers (when you add these queries):
// 
// GET /api/projects/:id
// export const getProjectHandler = async (c: Context<{ Bindings: Env }>) => {
//   try {
//     const id = parseInt(c.req.param('id'))
//     const project = await getProject(id, c.env.DB)
//     if (!project) {
//       return c.json({ error: 'Project not found' }, 404)
//     }
//     return c.json(project)
//   } catch (error: any) {
//     console.error('Error fetching project:', error)
//     return c.json({ error: error.message || 'Internal server error' }, 500)
//   }
// }
//
// PATCH /api/projects/:id
// export const updateProjectHandler = async (c: Context<{ Bindings: Env }>) => {
//   try {
//     const id = parseInt(c.req.param('id'))
//     const body = await c.req.json()
//     const project = await updateProject(id, body, c.env.DB)
//     return c.json(project)
//   } catch (error: any) {
//     console.error('Error updating project:', error)
//     return c.json({ error: error.message || 'Internal server error' }, 500)
//   }
// }
//
// DELETE /api/projects/:id
// export const deleteProjectHandler = async (c: Context<{ Bindings: Env }>) => {
//   try {
//     const id = parseInt(c.req.param('id'))
//     await deleteProject(id, c.env.DB)
//     return c.json({ success: true })
//   } catch (error: any) {
//     console.error('Error deleting project:', error)
//     return c.json({ error: error.message || 'Internal server error' }, 500)
//   }
// }

