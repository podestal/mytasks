// import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
// import { sql } from "drizzle-orm";

// export const projects = sqliteTable('projects', {
//     id: text('id')
//         .primaryKey()
//         .default(sql`lower(hex(randomblob(16)))`),
//     name: text('name').notNull(),
//     description: text('description'),
//     created_at: integer('created_at', { mode: 'timestamp_ms' })
//         .default(sql`(unixepoch('now') * 1000)`),
// });
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