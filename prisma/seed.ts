import { prisma } from "@/lib/prisma";

async function main() {
  const seeds = [
    {
      slug: "personal-banking",
      title: "Personal Banking",
      summary: "Everyday accounts, savings, and loans tailored for individuals.",
      icon: "Wallet",
    },
    {
      slug: "business-banking",
      title: "Business Banking",
      summary: "Accounts, credit lines, and payment solutions for growing businesses.",
      icon: "Building2",
    },
    {
      slug: "wealth-management",
      title: "Wealth Management",
      summary: "Investment advice, portfolio management, and retirement planning.",
      icon: "TrendingUp",
    },
    {
      slug: "insurance",
      title: "Insurance",
      summary: "Protection plans for life, health, property, and travel.",
      icon: "Shield",
    },
  ];

  await prisma.service.deleteMany();

  for (const seed of seeds) {
    await prisma.service.upsert({
      where: { slug: seed.slug },
      update: seed,
      create: seed,
    });
  }

  console.log(`Seeded ${seeds.length} services.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
