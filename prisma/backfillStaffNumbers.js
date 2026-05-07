const { PrismaClient, Role } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  const aggregate = await prisma.user.aggregate({
    where: { role: Role.STAFF },
    _max: { staffNumber: true },
  })

  let nextStaffNumber = (aggregate._max.staffNumber || 0) + 1

  const staffWithoutNumbers = await prisma.user.findMany({
    where: {
      role: Role.STAFF,
      staffNumber: null,
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      email: true,
    },
  })

  for (const staff of staffWithoutNumbers) {
    await prisma.user.update({
      where: { id: staff.id },
      data: { staffNumber: nextStaffNumber },
    })

    console.log(`Assigned STF-${String(nextStaffNumber).padStart(3, "0")} to ${staff.email}`)
    nextStaffNumber += 1
  }

  if (staffWithoutNumbers.length === 0) {
    console.log("No staff records needed backfill")
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
