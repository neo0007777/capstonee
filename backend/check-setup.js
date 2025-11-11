// Setup Checker Script
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

console.log('🔍 Checking backend setup...\n');

// Check 1: .env file
console.log('1. Checking .env file...');
if (fs.existsSync(path.join(__dirname, '.env'))) {
  console.log('   ✅ .env file exists');
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  if (envContent.includes('DATABASE_URL')) {
    console.log('   ✅ DATABASE_URL is set');
  } else {
    console.log('   ❌ DATABASE_URL is missing in .env');
  }
  if (envContent.includes('JWT_SECRET')) {
    console.log('   ✅ JWT_SECRET is set');
  } else {
    console.log('   ❌ JWT_SECRET is missing in .env');
  }
} else {
  console.log('   ❌ .env file not found!');
}

// Check 2: node_modules
console.log('\n2. Checking dependencies...');
if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('   ✅ node_modules exists');
} else {
  console.log('   ❌ node_modules not found. Run: npm install');
}

// Check 3: Prisma Client
console.log('\n3. Checking Prisma Client...');
if (fs.existsSync(path.join(__dirname, 'node_modules/@prisma/client'))) {
  console.log('   ✅ Prisma Client is generated');
} else {
  console.log('   ❌ Prisma Client not found. Run: npm run prisma:generate');
}

// Check 4: Database
console.log('\n4. Checking database...');
if (fs.existsSync(path.join(__dirname, 'prisma/dev.db'))) {
  console.log('   ✅ Database file exists');
} else {
  console.log('   ❌ Database file not found. Run: npm run prisma:migrate');
}

// Check 5: Database connection
console.log('\n5. Testing database connection...');
try {
  const prisma = new PrismaClient();
  await prisma.$connect();
  console.log('   ✅ Database connection successful');
  
  // Try a simple query
  const userCount = await prisma.user.count();
  console.log(`   ✅ Database is working (${userCount} users in database)`);
  
  await prisma.$disconnect();
} catch (error) {
  console.log('   ❌ Database connection failed:', error.message);
}

// Check 6: Environment variables
console.log('\n6. Checking environment variables...');
if (process.env.DATABASE_URL) {
  console.log('   ✅ DATABASE_URL:', process.env.DATABASE_URL);
} else {
  console.log('   ❌ DATABASE_URL not set');
}

if (process.env.JWT_SECRET) {
  console.log('   ✅ JWT_SECRET is set');
} else {
  console.log('   ❌ JWT_SECRET not set');
}

if (process.env.PORT) {
  console.log('   ✅ PORT:', process.env.PORT);
} else {
  console.log('   ✅ PORT: 5000 (default)');
}

console.log('\n✅ Setup check complete!\n');

