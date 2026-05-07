import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit";
import { examListSelect } from "@/lib/examSelect";

export async function GET(req: NextRequest) {
  try {
    // 1. AUTHENTICATION
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. AUTHORIZATION
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 3. FETCH DATA (minimum necessary)
    const visits = await prisma.exam.findMany({
      select: examListSelect,
      orderBy: {
        createdAt: "desc",
      },
    });

    await writeAuditLog({
      userId: session.user.id,
      action: "VIEW_ADMIN_VISITS",
      entity: "Exam",
      entityId: "bulk",
      req,
    });

    return NextResponse.json({ visits });

  } catch {
    // 5. SAFE ERROR HANDLING (no PHI leak)
    console.error("Visits fetch error"); // don't log sensitive data

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
