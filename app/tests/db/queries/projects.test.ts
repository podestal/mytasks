import { describe, it, expect } from 'bun:test'
import { getProjects, createProject } from '../../../src/db/queries/projects'

describe('Project Queries', () => {
  // Use local database (Bun SQLite) for testing
  // Make sure SQLITE_PATH is set in your .env

  describe('getProjects', () => {
    it('should return an array', async () => {
      const projects = await getProjects(undefined)
      expect(Array.isArray(projects)).toBe(true)
    })

    it('should return projects ordered by created_at (newest first)', async () => {
      const projects = await getProjects(undefined)
      
      if (projects.length > 1) {
        const dates = projects.map(p => new Date(p.created_at).getTime())
        const sorted = [...dates].sort((a, b) => b - a)
        expect(dates).toEqual(sorted)
      }
    })
  })

  describe('createProject', () => {
    it('should create a project with all required fields', async () => {
      const uniqueName = `Test ${Date.now()}`
      const projectData = {
        name: uniqueName,
        description: 'Test description'
      }
      
      const project = await createProject(projectData, undefined)
      
      expect(project).toHaveProperty('id')
      expect(project.name).toBe(uniqueName)
      expect(project.description).toBe(projectData.description)
      expect(project).toHaveProperty('created_at')
      expect(project).toHaveProperty('updated_at')
    })

    it('should auto-generate timestamps', async () => {
      const uniqueName = `Timestamp ${Date.now()}`
      const projectData = {
        name: uniqueName,
        description: 'Test'
      }
      
      const project = await createProject(projectData, undefined)
      
      expect(project.created_at).toBeTruthy()
      expect(project.updated_at).toBeTruthy()
      expect(new Date(project.created_at).getTime()).toBeGreaterThan(0)
    })

    it('should allow description to be optional', async () => {
      const uniqueName = `No Desc ${Date.now()}`
      const projectData = {
        name: uniqueName
        // No description
      }
      
      const project = await createProject(projectData, undefined)
      
      expect(project.name).toBe(uniqueName)
      expect(project.description).toBeNull()
    })
  })
})
