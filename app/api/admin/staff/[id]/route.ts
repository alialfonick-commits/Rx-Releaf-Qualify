import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
  ) {
    const { id } = await context.params  // ✅ MUST await
  
    const session = await getServerSession(authOptions)
  
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  
    const body = await req.json()
    const { isActive } = body
  
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }
  
    try {
      const user = await prisma.user.update({
        where: { id },
        data: { isActive }
      })
  
      return NextResponse.json({ success: true, user })
  
    } catch (error) {
      console.error(error)
      return NextResponse.json({ error: "Failed to update" }, { status: 500 })
    }
  }

  export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
  ) {
    const { id } = await context.params
  
    const session = await getServerSession(authOptions)
  
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  
    try {
      await prisma.user.update({
        where: { id },
        data: { isDeleted: true }
      })
  
      return NextResponse.json({ success: true })
  
    } catch (error) {
      console.error(error)
      return NextResponse.json({ error: "Delete failed" }, { status: 500 })
    }
  }