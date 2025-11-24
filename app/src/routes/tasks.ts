import { D1Database } from "@cloudflare/workers-types"
import { createTaskHandler, deleteTaskByIdHandler, getTasksBySprintIdHandler, updateTaskByIdHandler } from "../handlers/tasks"
import { Hono } from "hono"

type Env = {
    DB?: D1Database
  }

const tasksRouter = new Hono<{ Bindings: Env }>()

tasksRouter.post('/', createTaskHandler)
tasksRouter.get('/by-sprint/:sprintId', getTasksBySprintIdHandler)
tasksRouter.delete('/:id', deleteTaskByIdHandler)
tasksRouter.patch('/:id', updateTaskByIdHandler)
export default tasksRouter