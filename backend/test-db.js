const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  console.log("Testing database connection using your .env DATABASE_URL...");
  try {
    await prisma.$connect();
    console.log("SUCCESS: Connected to PostgreSQL database successfully!");
    const count = await prisma.college.count();
    console.log(`SUCCESS: Found ${count} colleges in the database.`);
  } catch (err) {
    console.error("ERROR: Failed to connect to database:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
