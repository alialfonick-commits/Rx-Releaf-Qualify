import { prisma } from "@/lib/prisma"
import ViewVisitDetails from "@/app/components/viewVisitDetails"

export default async function VisitPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!id) {
    return <p>Invalid visit ID</p>
  }

  const visit = await prisma.exam.findUnique({
    where: { id },
    include: {
      patient: true,
      staff: true
    }
  })

  if (!visit) {
    return <p>Visit not found</p>
  }

  return <ViewVisitDetails visit={visit} />
}