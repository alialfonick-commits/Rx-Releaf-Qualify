import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { isNonEmptyString, parsePositiveNumber } from "@/lib/validation";

export async function POST(req: Request) {
  const limited = rateLimit(req, {
    key: "pharmacy-packages",
    limit: 60,
    windowMs: 15 * 60 * 1000,
  });

  if (limited) {
    return limited;
  }

  try {
    const body = await req.json();

    if (!parsePositiveNumber(body.examId) || !isNonEmptyString(body.state)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

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
          exam_ids: [Number(body.examId)],
          patient_state: body.state,
        }),
      }
    );

    if (!res.ok) {
      console.error("Qualiphy pharmacy package fetch failed");

      return NextResponse.json(
        { error: "Failed to fetch pharmacy packages" },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch {
    console.error("Pharmacy package route error");

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
