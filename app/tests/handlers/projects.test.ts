import { describe, it, expect, mock } from 'bun:test'
import { getProjectsHandler, createProjectHandler } from '../../src/handlers/projects'

// Mock the queries
const mockGetProjects = mock(() => Promise.resolve([
  { id: 1, name: 'Project 1', description: 'Desc 1', created_at: '2024-01-01', updated_at: '2024-01-01' }
]))

const mockCreateProject = mock(() => Promise.resolve({
  id: 2, name: 'New Project', description: 'New Desc', created_at: '2024-01-01', updated_at: '2024-01-01'
}))

// Mock the queries module
mock.module('../../src/db/queries/projects', () => ({
  getProjects: mockGetProjects,
  createProject: mockCreateProject,
}))

describe('Projects Handlers', () => {
  const mockContext = {
    env: { DB: {} as any },
    req: {
      json: async () => ({ name: 'Test Project', description: 'Test description' }),
    },
    json: (data: any, status?: number) => ({ data, status: status || 200 }),
  } as any

  describe('getProjectsHandler', () => {
    it('should return 200 status with projects array', async () => {
      const result = await getProjectsHandler(mockContext)
      
      expect(result.status).toBe(200)
      expect(result.data).toBeArray()
      expect(mockGetProjects).toHaveBeenCalledWith(mockContext.env.DB)
    })

    it('should handle database errors and return 500', async () => {
      mockGetProjects.mockRejectedValueOnce(new Error('Database error'))
      
      const result = await getProjectsHandler(mockContext)
      
      expect(result.status).toBe(500)
      expect(result.data).toHaveProperty('error')
    })
  })

  describe('createProjectHandler', () => {
    it('should return 201 status with created project', async () => {
      const result = await createProjectHandler(mockContext)
      
      expect(result.status).toBe(201)
      expect(result.data).toHaveProperty('id')
      expect(mockCreateProject).toHaveBeenCalled()
    })

    it('should handle errors and return 500', async () => {
      mockCreateProject.mockRejectedValueOnce(new Error('Invalid input'))
      
      const result = await createProjectHandler(mockContext)
      
      expect(result.status).toBe(500)
      expect(result.data).toHaveProperty('error')
    })
  })
})
