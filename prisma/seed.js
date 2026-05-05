const { PrismaClient, Role } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123!", 10)

  await prisma.user.create({
    data: {
      email: "haris.alfonick1@gmail.com",
      password: hashedPassword,
      role: Role.ADMIN
    }
  })

  console.log("✅ Admin user created")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())