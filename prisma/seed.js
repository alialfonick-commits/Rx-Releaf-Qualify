const { PrismaClient, Role } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME || "Admin"

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required")
  }

  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.upsert({
    where: { email },
    create: {
      name,
      email,
      password: hashedPassword,
      role: Role.ADMIN,
      isActive: true,
      isDeleted: false,
    },
    update: {
      name,
      password: hashedPassword,
      role: Role.ADMIN,
      isActive: true,
      isDeleted: false,
    },
  })

  console.log(`Admin user ready: ${email}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
