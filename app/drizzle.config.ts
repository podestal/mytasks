import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

// LOCAL DEV
// export default defineConfig({
//     out: './src/db/migrations',
//     schema: './src/db/schema.ts',
//     dialect: 'sqlite',
//     dbCredentials: {
//         url: process.env.SQLITE_PATH!,
//     },
// })

// CLOUDFLARE DEV
export default defineConfig({
    out: './src/db/migrations',
    schema: './src/db/schema.ts',
    dialect: 'sqlite',
    driver: 'd1-http',
    dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID!,
        token: process.env.CLOUDFLARE_API_TOKEN!,
    },
})