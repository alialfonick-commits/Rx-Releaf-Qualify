import { sendQualiphyInvite } from "@/lib/qualiphyInvite"

export async function sendToQualiphy(data: {
  examId: number
  firstName: string
  lastName: string
  email: string
  phone: string
  state: string
  dob: string | Date
}) {
  const dob = new Date(data.dob)

  if (isNaN(dob.getTime())) {
    throw new Error("Invalid DOB")
  }

  const result = await sendQualiphyInvite({
    ...data,
    dob,
  })

  if (!result.ok) {
    throw new Error(`Qualiphy invite failed with status ${result.status}`)
  }

  return result
}
