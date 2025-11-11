# PostgreSQL Conversion Complete! 🐘

## What Changed

✅ **Prisma Schema** - Updated from SQLite to PostgreSQL
✅ **.env File** - Updated DATABASE_URL to PostgreSQL connection string
✅ **package.json** - Added `pg` package for PostgreSQL driver

## Next Steps

### 1. Install PostgreSQL (if not already installed)

**macOS (using Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Or download from:**
https://www.postgresql.org/download/

### 2. Create Database

**Option A: Using the setup script (Recommended)**
```bash
cd backend
./setup-postgres.sh
```

**Option B: Manual setup**
```bash
# Start PostgreSQL
brew services start postgresql@15

# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE auth_db;

# Exit
\q
```

### 3. Update .env File

Make sure your `.env` file contains:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auth_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=5001
```

**Important:** Change `postgres:postgres` to your actual PostgreSQL username and password!

### 4. Install Dependencies

```bash
cd backend
npm install
```

This will install the `pg` package needed for PostgreSQL.

### 5. Generate Prisma Client

```bash
npm run prisma:generate
```

### 6. Run Migrations

```bash
npm run prisma:migrate
```

This will create the User table in PostgreSQL.

### 7. Start Server

```bash
npm run dev
```

## Connection String Format

```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=SCHEMA
```

**Default values:**
- Username: `postgres`
- Password: `postgres` (⚠️ Change this!)
- Host: `localhost`
- Port: `5432`
- Database: `auth_db`
- Schema: `public`

## Troubleshooting

### Error: "password authentication failed"
**Solution:** Update the password in `.env` to match your PostgreSQL user password.

### Error: "database does not exist"
**Solution:** Create the database:
```bash
psql postgres
CREATE DATABASE auth_db;
\q
```

### Error: "connection refused"
**Solution:** Make sure PostgreSQL is running:
```bash
brew services start postgresql@15
```

### Error: "role does not exist"
**Solution:** Use the default `postgres` user or create a new user:
```sql
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE auth_db TO your_username;
```

## Verify Setup

Run the check script:
```bash
npm run check
```

This will verify:
- ✅ .env file exists
- ✅ Dependencies installed
- ✅ Prisma Client generated
- ✅ Database connection works

## Differences from SQLite

| Feature | SQLite | PostgreSQL |
|---------|--------|------------|
| Type | File-based | Server-based |
| Setup | No setup needed | Requires PostgreSQL server |
| Performance | Good for small apps | Better for production |
| Features | Basic | Advanced (JSON, arrays, etc.) |
| Scalability | Limited | Excellent |

## Migration Notes

- **Old SQLite database** (`prisma/dev.db`) is no longer used
- **All data** from SQLite will need to be migrated if you had any
- **New PostgreSQL database** will be created fresh
- **User data** will start empty in PostgreSQL

