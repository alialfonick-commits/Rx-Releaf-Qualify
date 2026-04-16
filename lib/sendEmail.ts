import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPaymentEmail(
  email: string,
  name: string,
  link: string
) {
  try {
    const response = await resend.emails.send({
      from: "Rx Releaf <onboarding@resend.dev>", // later use your domain
      to: email,
      subject: "Complete Your Payment",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Complete Your Visit</h2>
          
          <p>Hi ${name},</p>

          <p>Your exam has been created. Please complete your payment to proceed.</p>

          <a href="${link}" 
             style="display:inline-block;padding:12px 20px;background:#476B59;color:white;text-decoration:none;border-radius:6px;">
             Pay Now
          </a>

          <p style="margin-top:20px;">
            If you have any questions, reply to this email.
          </p>
        </div>
      `
    })

    return response

  } catch (error) {
    console.error("Email error:", error)
    throw error
  }
}