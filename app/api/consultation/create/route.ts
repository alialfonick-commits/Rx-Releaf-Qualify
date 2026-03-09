import { NextResponse } from "next/server";
import { getQualiphyStateId } from "@/lib/mappers/qualiphyStateMapper";
import { createPatient } from "@/lib/services/qualiphy";

export async function POST(req: Request) {
  const body = await req.json();

  const qualiphyStateId = getQualiphyStateId(body.state);

  if (!qualiphyStateId) {
    return NextResponse.json(
      { error: "Invalid state" },
      { status: 400 }
    );
  }

  const patientPayload = {
    clinic_id: 4593,
    patient_state: qualiphyStateId,
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
  };

  try {
    const patient = await createPatient(patientPayload);

    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}