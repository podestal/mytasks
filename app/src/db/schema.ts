import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const projects = pgTable('projects', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description'),
    created_at: timestamp('created_at').defaultNow(),
});