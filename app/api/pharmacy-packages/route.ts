import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.QUALIPHY_BASE_URL}/api/partner_pharmacy_treatment_packages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: process.env.QUALIPHY_API_KEY,
          pharmacy_ids: [12], // partner pharmacies
          exam_ids: [body.examId],
          patient_state: body.state,
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Qualiphy Pharmacy Package Error:", text);

      return NextResponse.json(
        { error: "Failed to fetch pharmacy packages" },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Pharmacy package route error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}