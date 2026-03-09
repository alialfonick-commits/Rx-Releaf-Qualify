const BASE_URL = process.env.QUALIPHY_BASE_URL!;
const API_KEY = process.env.QUALIPHY_API_KEY!;

export async function createPatient(data: any) {
  const res = await fetch(`${BASE_URL}/patients`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create patient");

  return res.json();
}