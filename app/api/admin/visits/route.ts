import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
      select: {
        id: true,
        caseNumber: true,
        createdAt: true,
        status: true,
        consultationType: true,

        patient: {
          select: {
            id: true,
            firstName: true, // later encrypt/decrypt
            lastName: true,
            dob: true,
          },
        },

        staff: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 4. AUDIT LOG (CRITICAL)
    // await prisma.auditLog.create({
    //   data: {
    //     userId: session.user.id,
    //     action: "VIEW_VISITS",
    //     entity: "Exam",
    //     entityId: "bulk",
    //   },
    // });

    return NextResponse.json({ visits });

  } catch (error) {
    // 5. SAFE ERROR HANDLING (no PHI leak)
    console.error("Visits fetch error"); // don't log sensitive data

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}