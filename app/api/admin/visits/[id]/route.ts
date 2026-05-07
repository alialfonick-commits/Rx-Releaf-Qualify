import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { deleteExamWithQualiphyCancel } from "@/lib/deleteExam"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  try {
    const result = await deleteExamWithQualiphyCancel({
      examId: id,
      userId: session.user.id,
      action: "DELETE_ADMIN_VISIT",
      req,
    })

    return NextResponse.json(result.body, { status: result.status })
  } catch {
    return NextResponse.json(
      { error: "Failed to delete visit" },
      { status: 500 }
    )
  }
}
