import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

// Use D1 if DRIZZLE_DRIVER=d1, otherwise use local SQLite
// Note: db:generate works the same for both (creates SQL files)
// Only db:migrate needs to target the right database
const useD1 = process.env.DRIZZLE_DRIVER === 'd1'

export default defineConfig({
    out: './src/db/migrations',
    schema: './src/db/schema.ts',
    dialect: 'sqlite',
    ...(useD1 ? {
        driver: 'd1-http',
        dbCredentials: {
            accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
            databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID!,
            token: process.env.CLOUDFLARE_API_TOKEN!,
        },
    } : {
        dbCredentials: {
            url: process.env.SQLITE_PATH || './data/data.sqlite',
        },
    }),
})