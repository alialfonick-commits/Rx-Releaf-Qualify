import { NextResponse } from "next/server";

export async function GET() {
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
    const text = await res.text();
    console.error("Qualiphy Error:", text);
    return NextResponse.json(
      { error: "Failed to fetch exams" },
      { status: 500 }
    );
  }

  const data = await res.json();

  // Filter urgent care exams
  const urgentCareExams = data.exams.filter(
    (exam: any) =>
      exam.title.startsWith("Urgent Care -") &&
      exam.rx_type === 2
  );

  return NextResponse.json(urgentCareExams);
}