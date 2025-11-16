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
  id: integer('id').primaryKey(),              // set in app code
  name: text('name').notNull(),
  description: text('description'),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});