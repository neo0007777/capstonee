#!/bin/bash

# Backend Start Script with Error Handling

echo "🚀 Starting backend server..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "📝 Creating .env file..."
    cat > .env << 'EOF'
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=5000
EOF
    echo "✅ .env file created"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if Prisma Client is generated
if [ ! -d "node_modules/@prisma/client" ]; then
    echo "🔧 Generating Prisma Client..."
    npm run prisma:generate
fi

# Check if database exists
if [ ! -f "prisma/dev.db" ]; then
    echo "🗄️  Running database migrations..."
    npm run prisma:migrate
fi

# Check if port 5000 is in use
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port 5000 is already in use!"
    echo "   Stopping existing process..."
    lsof -ti:5000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Start the server
echo "✅ Starting server on port 5000..."
npm run dev

