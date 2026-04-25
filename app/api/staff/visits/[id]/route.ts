import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { writeAuditLog } from "@/lib/audit"

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const session = await getServerSession(authOptions)
  
    if (!session || session.user.role !== "STAFF") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  
    const { id: examId } = await params 
    const staffId = session.user.id
   
    try {
      const exam = await prisma.exam.findFirst({
        where: { id: examId, staffId },
        select: { id: true },
      })

      if (!exam) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }

      await prisma.exam.delete({
        where: { id: exam.id }
      })

      await writeAuditLog({
        userId: staffId,
        action: "DELETE_STAFF_VISIT",
        entity: "Exam",
        entityId: exam.id,
        req,
      })
   
      return NextResponse.json({ success: true })
    } catch {
      return NextResponse.json(
        { error: "Failed to delete exam" },
        { status: 500 }
      )
    }
}
