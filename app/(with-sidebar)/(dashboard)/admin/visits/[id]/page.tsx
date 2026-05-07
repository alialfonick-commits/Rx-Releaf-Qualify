import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import ViewVisitDetails from "@/app/components/viewVisitDetails"

export default async function AdminVisitPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    return <p className="p-4">Unauthorized</p>
  }

  const { id } = await params

  if (!id) {
    return <p className="p-4">Invalid visit ID</p>
  }

  const visit = await prisma.exam.findUnique({
    where: { id },
    include: {
      patient: true,
      staff: true,
    },
  })

  if (!visit) {
    return <p className="p-4">Visit not found</p>
  }

  return <ViewVisitDetails visit={visit} backHref="/admin/visits" />
}
