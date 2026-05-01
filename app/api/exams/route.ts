import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

export async function GET(req: Request) {
  const limited = rateLimit(req, {
    key: "exam-list",
    limit: 60,
    windowMs: 15 * 60 * 1000,
  });

  if (limited) {
    return limited;
  }

  const res = await fetch(
    `${process.env.QUALIPHY_BASE_URL}/api/exam_list`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.QUALIPHY_API_KEY,
      }),
    }
  );

  if (!res.ok) {
    console.error("Qualiphy exam list fetch failed");
    return NextResponse.json(
      { error: "Failed to fetch exams" },
      { status: 500 }
    );
  }

  const data = await res.json();
  // Filter urgent care exams
  const urgentCareExams = data.exams.filter(
    (exam: { title?: string; rx_type?: number }) =>
      exam.title?.startsWith("Urgent Care -") &&
    exam.rx_type === 2
  );
  
  return NextResponse.json(urgentCareExams);
}
