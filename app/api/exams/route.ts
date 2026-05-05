import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { ensureConsultationTypes } from "@/lib/consultationConfig";

export async function GET(req: Request) {
  const limited = rateLimit(req, {
    key: "exam-list",
    limit: 60,
    windowMs: 15 * 60 * 1000,
  });

  if (limited) {
    return limited;
  }

  await ensureConsultationTypes();

  const consultationTypes = await prisma.consultationTypeSetting.findMany({
    where: { isEnabled: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      typeKey: true,
      label: true,
      options: {
        where: { isEnabled: true },
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
        select: {
          id: true,
          qualiphyExamId: true,
          title: true,
          rxType: true,
        },
      },
    },
  });

  return NextResponse.json({ consultationTypes });
}
