import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

/**
 * Seed data for local development and end-to-end tests. Records are upserted
 * on their reference so that the script is safe to run repeatedly.
 */
const seedInquiries = [
  {
    reference: "DDE-2026-SEED01",
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    phone: "+919876543210",
    programme: "BSc Computer Science",
    programmeSlug: "bsc-computer-science",
    level: "Undergraduate",
    intake: "Autumn 2026",
    message:
      "I would like to know the application deadline and whether the merit scholarship covers the full tuition.",
    source: "website-form",
    consent: true,
    status: "NEW" as const,
    priority: "HOT" as const,
  },
  {
    reference: "DDE-2026-SEED02",
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    phone: "+919812345678",
    programme: "MSc Machine Intelligence",
    programmeSlug: "msc-machine-intelligence",
    level: "Graduate",
    intake: "Spring 2027",
    message:
      "I have four years of backend experience and would like to understand the entry requirements for the part time route.",
    source: "referral",
    consent: true,
    status: "IN_REVIEW" as const,
    priority: "WARM" as const,
  },
  {
    reference: "DDE-2026-SEED03",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+919900112233",
    programme: "BA Interaction Design",
    programmeSlug: "ba-interaction-design",
    level: "Undergraduate",
    intake: "Autumn 2027",
    message:
      "Could you review my portfolio before I apply? I am currently in my final year of school.",
    source: "open-day",
    consent: true,
    status: "CONTACTED" as const,
    priority: "NURTURE" as const,
  },
]

async function main(): Promise<void> {
  for (const inquiry of seedInquiries) {
    await prisma.inquiry.upsert({
      where: { reference: inquiry.reference },
      update: {},
      create: {
        ...inquiry,
        events: {
          create: {
            type: "CREATED",
            message: `Enquiry received from ${inquiry.source}.`,
          },
        },
      },
    })
  }

  const total = await prisma.inquiry.count()
  console.info(`Seed complete. ${total} enquiries in the database.`)
}

main()
  .catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => {
    void prisma.$disconnect()
  })
