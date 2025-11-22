import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const sprint = sqliteTable('sprints', {
  id: integer('id').primaryKey(),
  project_id: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  deadline: text('deadline').notNull(), // Date format: 'YYYY-MM-DD'
  status: text('status').notNull().default('A'), // 'A' = Active, 'C' = Canceled, 'D' = Completed
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})


export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey(),
  sprint_id: integer('sprint_id').notNull().references(() => sprint.id, { onDelete: 'cascade' }),
  description: text('description').notNull(),
  status: text('status').notNull().default('T'), // 'T' = To Do, 'P' = In Progress, 'R' = Review, 'D' = Done
  priority: text('priority').notNull().default('low'), // 'low' = Low, 'medium' = Medium, 'high' = High
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})
