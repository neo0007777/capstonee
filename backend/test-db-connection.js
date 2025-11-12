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
    console.log('✅ Successfully connected to SQLite!');

    // Try a simple query
    const result = await prisma.$queryRaw`SELECT sqlite_version() as version`;
    console.log('✅ Database version:', result[0]?.version || 'Unknown');

    // Check if User table exists
    const userCount = await prisma.user.count();
    console.log(`✅ User table exists (${userCount} users)`);

  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);

    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 SQLite database file may be corrupted!');
      console.error('   Delete and recreate: rm prisma/dev.db && npx prisma db push');
    } else if (error.message.includes('Authentication failed') || error.message.includes('password')) {
      console.error('\n💡 Wrong password or credentials!');
      console.error('   Update DATABASE_URL in .env with correct SQLite path');
      console.error('   Format: file:./dev.db');
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      console.error('\n💡 Database does not exist!');
      console.error('   Create database: npx prisma db push');
    } else if (error.message.includes('table') && error.message.includes('does not exist')) {
      console.error('\n💡 Database tables do not exist!');
      console.error('   Run migrations: npx prisma db push');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

