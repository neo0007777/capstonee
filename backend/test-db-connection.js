// Test Database Connection
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
    
    await prisma.$connect();
    console.log('✅ Successfully connected to PostgreSQL!');
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Database version:', result[0]?.version || 'Unknown');
    
    // Check if User table exists
    const userCount = await prisma.user.count();
    console.log(`✅ User table exists (${userCount} users)`);
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 PostgreSQL is not running!');
      console.error('   Start PostgreSQL: brew services start postgresql@15');
    } else if (error.message.includes('password authentication failed')) {
      console.error('\n💡 Wrong password!');
      console.error('   Update DATABASE_URL in .env with correct password');
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      console.error('\n💡 Database does not exist!');
      console.error('   Create database: psql postgres -c "CREATE DATABASE auth_db;"');
    } else if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.error('\n💡 Database tables do not exist!');
      console.error('   Run migrations: npm run prisma:migrate');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

