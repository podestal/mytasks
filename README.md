# MyTasks Server

A full-stack task management server built with Hono, Drizzle ORM, and Cloudflare Workers/D1. Supports both local development with Bun SQLite and production deployment on Cloudflare Workers with D1.

## 🚀 Features

- **Dual Environment Support**: Seamlessly switch between local development (Bun SQLite) and Cloudflare Workers (D1)
- **Type-Safe Database**: Using Drizzle ORM with SQLite
- **Fast Runtime**: Built on Hono framework
- **Easy Deployment**: One command deploy to Cloudflare Workers

## 📋 Prerequisites

- [Bun](https://bun.sh/) (for local development)
- [Docker](https://www.docker.com/) and Docker Compose (for containerized development)
- [Cloudflare Account](https://dash.cloudflare.com/) (for production deployment)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (included as dev dependency)

## 🛠️ Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mytasks/server
```

### 2. Create Environment File

Create `app/.env` file with the following variables:

```env
# Local Development
SQLITE_PATH=./data/data.sqlite

# Cloudflare Configuration
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_D1_DATABASE_ID=your_database_id_here
CLOUDFLARE_API_TOKEN=your_api_token_here
```

**How to get Cloudflare credentials:**
- **Account ID**: Found in Cloudflare Dashboard → Right sidebar
- **D1 Database ID**: Found in Workers & Pages → D1 → Your database → Database ID
- **API Token**: Create at [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
  - Required permissions: `D1:Edit`, `Workers Scripts:Edit`, `Account:Read`

### 3. Install Dependencies

```bash
cd app
bun install
```

## 🏃 Local Development

### Option 1: Using Docker (Recommended)

```bash
# From project root
docker-compose build
docker-compose up -d
docker-compose exec bun bash

# Inside container
cd /app/app
bun run dev
```

Your server will be available at `http://localhost:3000`

### Option 2: Direct Bun

```bash
cd app
bun run dev
```

### Database Setup (Local)

The local SQLite database will be created automatically at `app/data/data.sqlite` when you first run the app.

To run migrations manually:
```bash
bun run db:generate  # Generate migrations
bun run db:migrate   # Apply migrations (if using drizzle-kit migrate)
```

## ☁️ Cloudflare Workers Development

### Setup D1 Database

1. **Create D1 Database** (if not already created):
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Workers & Pages → D1
   - Click "Create database"
   - Name it `mytasks-db`
   - Copy the Database ID and add it to your `.env` file

2. **Update `wrangler.toml`**:
   - Update `database_id` with your D1 database ID

3. **Run Migrations on D1**:
   ```bash
   # Local D1 (for testing)
   bunx wrangler d1 migrations apply mytasks-db
   
   # Remote D1 (production)
   bunx wrangler d1 migrations apply mytasks-db --remote
   ```

### Test Locally with D1

```bash
# Start Wrangler dev server (connects to local D1)
bunx wrangler dev

# Server will be available at http://localhost:8787
```

### Deploy to Cloudflare Workers

```bash
bunx wrangler deploy
```

After deployment, you'll get a URL like:
```
https://mytasks-server.your-subdomain.workers.dev
```

## 📡 API Endpoints

All endpoints are prefixed with `/api`:

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
  ```json
  {
    "name": "Project Name",
    "description": "Project description"
  }
  ```

## 🗂️ Project Structure

```
server/
├── app/
│   ├── src/
│   │   ├── db/
│   │   │   ├── db.ts           # Unified DB factory (D1/Bun SQLite)
│   │   │   ├── db-local.ts     # Local Bun SQLite implementation
│   │   │   ├── queries.ts      # Database queries
│   │   │   ├── schema.ts       # Drizzle schema definitions
│   │   │   └── migrations/     # Database migrations
│   │   └── index.ts           # Hono app entry point
│   ├── drizzle.config.ts       # Drizzle Kit configuration
│   ├── wrangler.toml          # Cloudflare Workers configuration
│   └── package.json
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## 🔄 Environment Switching

The code automatically detects the environment:

- **Cloudflare Workers**: When `c.env.DB` (D1Database) is provided
- **Local Development**: When `SQLITE_PATH` environment variable is set

No code changes needed when switching environments!

## 🔒 Security

**Important**: Never commit sensitive information to Git!

- ✅ `.env` is in `.gitignore`
- ✅ `data.sqlite` is in `.gitignore`
- ✅ API tokens should never be committed

Before pushing to GitHub, verify:
```bash
git status
# Make sure .env and data.sqlite are not listed
```

## 🐛 Troubleshooting

### "Could not locate bindings file" (better-sqlite3)
- This happens when native modules aren't built for your platform
- Solution: Rebuild in Docker or use `bun rebuild better-sqlite3`

### "Database not initialized" error
- **Local**: Make sure `SQLITE_PATH` is set in `.env`
- **Cloudflare**: Make sure D1 binding is configured in `wrangler.toml`

### Wrangler authentication issues
- Make sure `CLOUDFLARE_API_TOKEN` is set in your `.env` file
- Verify token has correct permissions (D1:Edit, Workers Scripts:Edit)

### Port already in use
- Change ports in `docker-compose.yml` if 3000 or 8787 are taken

## 📚 Resources

- [Hono Documentation](https://hono.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)

## 📝 License

[Your License Here]

