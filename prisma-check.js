const prisma = require("./src/config/prisma");

async function main() {
  await prisma.$connect();
  console.log("✅ Prisma CONNECTED");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
