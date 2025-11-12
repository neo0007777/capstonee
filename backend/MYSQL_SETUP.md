# MySQL Setup Guide

## Prerequisites

You need to have MySQL installed on your system.

### Install MySQL

**macOS (using Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Or download from:**
https://dev.mysql.com/downloads/mysql/

## Database Setup

### Step 1: Create MySQL Database

1. **Start MySQL service:**
```bash
# macOS with Homebrew
brew services start mysql

# Or manually
mysql.server start
```

2. **Connect to MySQL:**
```bash
mysql -u root -p
```

3. **Create database:**
```sql
-- Create database
CREATE DATABASE auth_db;

-- Exit
exit;
```

### Step 2: Update .env File

The `.env` file should contain:

```env
DATABASE_URL="mysql://root:password@localhost:3306/auth_db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=5001
```

**Connection String Format:**
```
mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
```

**Default values:**
- Username: `root`
- Password: `password` (⚠️ Change this to your MySQL password!)
- Host: `localhost`
- Port: `3306`
- Database: `auth_db`

### Step 3: Install MySQL Driver

```bash
cd backend
npm install
```

This will install the `mysql2` package needed for MySQL.

### Step 4: Run Migrations

```bash
cd backend
npm run prisma:migrate
```

This will:
- Create the database tables in MySQL
- Set up the User model
- Generate Prisma Client

### Step 5: Verify Connection

```bash
cd backend
npm run check
```

This will test the database connection.

## Troubleshooting

### Error: "password authentication failed"
**Solution:** Update the password in `.env` to match your MySQL root password.

### Error: "database does not exist"
**Solution:** Create the database first:
```bash
mysql -u root -p
CREATE DATABASE auth_db;
exit;
```

### Error: "connection refused"
**Solution:** Make sure MySQL is running:
```bash
# Check if MySQL is running
brew services list | grep mysql

# Start MySQL
brew services start mysql
```

### Error: "Access denied for user"
**Solution:** Check your MySQL username and password in the `.env` file.

## Connection String Examples

**Local MySQL with default user:**
```
mysql://root:password@localhost:3306/auth_db
```

**Local MySQL with custom user:**
```
mysql://username:password@localhost:3306/auth_db
```

**Remote MySQL:**
```
mysql://username:password@host:3306/database
```

**With SSL:**
```
mysql://username:password@host:3306/database?sslmode=require
```

## Quick Setup Script

```bash
# 1. Start MySQL
brew services start mysql

# 2. Create database
mysql -u root -p -e "CREATE DATABASE auth_db;"

# 3. Update .env (already done)

# 4. Install dependencies
cd backend
npm install

# 5. Run migrations
npm run prisma:migrate

# 6. Start server
npm run dev
```

## Differences from PostgreSQL

| Feature | PostgreSQL | MySQL |
|---------|------------|-------|
| Port | 5432 | 3306 |
| Driver | `pg` | `mysql2` |
| Connection String | `postgresql://...` | `mysql://...` |
| Provider | `postgresql` | `mysql` |

