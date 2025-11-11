#!/bin/bash

# PostgreSQL Setup Script

echo "🐘 Setting up PostgreSQL for the application..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed!"
    echo ""
    echo "Install PostgreSQL using Homebrew:"
    echo "  brew install postgresql@15"
    echo "  brew services start postgresql@15"
    echo ""
    exit 1
fi

echo "✅ PostgreSQL is installed"

# Check if PostgreSQL is running
if ! pg_isready -U postgres &> /dev/null; then
    echo "⚠️  PostgreSQL is not running"
    echo "Starting PostgreSQL..."
    
    # Try to start with Homebrew
    if command -v brew &> /dev/null; then
        brew services start postgresql@15 2>/dev/null || brew services start postgresql 2>/dev/null
        sleep 3
    fi
fi

# Check again if PostgreSQL is running
if ! pg_isready -U postgres &> /dev/null; then
    echo "❌ Could not start PostgreSQL"
    echo "Please start PostgreSQL manually:"
    echo "  brew services start postgresql@15"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database if it doesn't exist
echo "📦 Creating database 'auth_db'..."
psql -U postgres -c "CREATE DATABASE auth_db;" 2>/dev/null || echo "Database might already exist (that's okay)"

# Check if database was created
if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw auth_db; then
    echo "✅ Database 'auth_db' is ready"
else
    echo "⚠️  Could not create database. You may need to create it manually:"
    echo "  psql postgres"
    echo "  CREATE DATABASE auth_db;"
    echo "  \\q"
fi

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npm run prisma:generate

# Run migrations
echo "🗄️  Running database migrations..."
npm run prisma:migrate

echo ""
echo "✅ PostgreSQL setup complete!"
echo ""
echo "Your .env file should contain:"
echo "  DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/auth_db?schema=public\""
echo ""
echo "To start the server:"
echo "  npm run dev"

