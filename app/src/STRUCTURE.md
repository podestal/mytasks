# Project Structure Guide

## Current Structure

```
src/
├── index.ts              # Main entry point (your current file)
├── routes/               # Route definitions (NEW)
│   ├── README.md        # Route examples
│   ├── index.ts         # Route aggregator
│   └── projects.ts      # Project routes
├── handlers/             # Request handlers (NEW)
│   ├── README.md        # Handler examples
│   └── projects.ts      # Project handlers
├── middleware/           # Middleware (NEW)
│   ├── README.md        # Middleware examples
│   ├── error.ts         # Error handler
│   └── cors.ts          # CORS middleware
├── utils/                # Utilities (NEW)
│   ├── README.md        # Utility examples
│   ├── validation.ts    # Input validation
│   └── helpers.ts       # Helper functions
├── tests/                # Tests (NEW)
│   ├── README.md        # Test examples
│   ├── handlers/        # Handler tests
│   └── db/              # Database tests
└── db/                   # Database layer (EXISTING)
    ├── db.ts
    ├── db-local.ts
    ├── queries.ts
    ├── schema.ts
    └── types.ts
```

## Migration Path

### Step 1: Create the folders
All folders are created with README files showing examples.

### Step 2: Gradually move code
1. Start with one route (e.g., projects)
2. Create `handlers/projects.ts` with your current handler logic
3. Create `routes/projects.ts` with route definitions
4. Update `index.ts` to use the new route structure
5. Test that it still works
6. Repeat for other routes

### Step 3: Add middleware
- Add error handler
- Add CORS if needed
- Add auth when ready

### Step 4: Add utilities
- Validation helpers
- Common functions

## Benefits

✅ **Separation of Concerns**: Routes, handlers, and DB logic are separate
✅ **Scalability**: Easy to add new features
✅ **Testability**: Each layer can be tested independently
✅ **Maintainability**: Clear organization makes code easier to understand
✅ **Reusability**: Middleware and utils can be reused across routes

## Example: Adding a New Endpoint

1. **Add query** in `db/queries.ts`:
   ```ts
   export const updateProject = async (id, updates, d1) => { ... }
   ```

2. **Add handler** in `handlers/projects.ts`:
   ```ts
   export const updateProjectHandler = async (c) => { ... }
   ```

3. **Add route** in `routes/projects.ts`:
   ```ts
   projectsRouter.patch('/:id', updateProjectHandler)
   ```

Done! The route is automatically available at `/api/projects/:id`

