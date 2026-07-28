const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const profs = await prisma.professor.findMany();
  console.log("Professors in DB:");
  profs.forEach(p => console.log(`- ${p.name} (ID: ${p.id})`));
  
  // Test Sara
  const sara = profs.find(p => p.name && p.name.includes("Sara"));
  if (sara) console.log(`\nSara ID: ${sara.id}`);
  
  const marc = profs.find(p => p.name && p.name.includes("Marc"));
  if (marc) console.log(`Marc ID: ${marc.id}`);
  
  const yann = profs.find(p => p.name && p.name.includes("Yann"));
  if (yann) console.log(`Yann ID: ${yann.id}`);
}

run().catch(console.error).finally(() => prisma.$disconnect());
