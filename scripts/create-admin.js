const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/create-admin.js email@example.com');
    process.exit(1);
  }

  const user = await prisma.user.upsert({
    where: { email },
    update: { role: 'ADMIN' },
    create: {
      email,
      role: 'ADMIN',
    },
  });

  console.log(`[완료] ${user.email} -> ADMIN (id: ${user.id})`);
}

main()
  .catch((e) => {
    console.error('[오류]', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
