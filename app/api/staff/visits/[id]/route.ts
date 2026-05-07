import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { deleteExamWithQualiphyCancel } from "@/lib/deleteExam"

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
      const result = await deleteExamWithQualiphyCancel({
        examId,
        userId: staffId,
        action: "DELETE_STAFF_VISIT",
        req,
      })
   
      return NextResponse.json(result.body, { status: result.status })
    } catch {
      return NextResponse.json(
        { error: "Failed to delete exam" },
        { status: 500 }
      )
    }
}
