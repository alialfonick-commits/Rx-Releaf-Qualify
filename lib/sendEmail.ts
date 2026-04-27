import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const fromAddress = "Rx Releaf <info@rxreleaf.net>"

export async function sendPaymentEmail(
  email: string,
  name: string,
  link: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  try {
    const response = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "Complete Your Payment",
      html: `<div style="font-family: sans-serif; background: #F4F6F4; padding: 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0"
        style="max-width: 500px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden;">
          <!-- HEADER -->
          <tr>
            <td style="background: #708E86; padding: 10px 24px 0; color: #FFFFFF; text-align: center;">
              <img src="${baseUrl}/logo.png" alt="logo" style="max-width: 130px;">
            </td>
          </tr>
          <!-- BODY -->
          <tr>
            <td style="padding: 28px 24px;">
              <h3 style="margin: 0 0 15px; font-size: 17px; color: #2E3833;">Complete Your Visit Payment</h3>
              <p style="margin:0 0 6px; color: #6A7C73; font-size: 13px;">Hi <span style="font-weight: 600;">${name}</span>,</p>
              <p style="margin:0 0 20px; color: #6A7C73; font-size: 13px; line-height: 1.4;">Your virtual visit request has been created. To proceed with coordination and provider assignment please complete your secure payment using the link below.</p>

              <!-- CTA BUTTON -->
              <div style="text-align: center; margin: 30px 0;"><a href="${link}"
              style="display:inline-block; padding-right: 36px !important; padding: 9px 13px; color: #FFFFFF; text-decoration: none; border-radius: 6px; font-weight:600; font-size: 14px; background: #D9A520 url(${baseUrl}/next.png) right 12px center no-repeat; background-size: 17px;">Complete Payment</a>
              </div>

              <!-- INFO BOX -->
              <div style="background: #0da2e70d; border: 1px solid #0da2e733; border-radius: 8px; padding: 10px; margin-top: 10px;">
                <p style="margin:0; font-size: 16px; color: #2E3833; font-weight:500;">Secure Payment Link Details</p>
                <ul style="margin: 10px 0 0; padding-left: 0; color: #6A7C73; font-size:13px; line-height: 1.6; list-style: none;">
                  <li style="padding-left: 25px; background: url(${baseUrl}/icon-1.png) left center no-repeat; background-size: 17px; margin-bottom: 3px;">Single-use secure link</li>
                  <li style="padding-left: 25px; background: url(${baseUrl}/icon-2.png) left center no-repeat; background-size: 17px; margin-bottom: 3px;">Valid for 24 hours</li>
                  <li style="padding-left: 25px; background: url(${baseUrl}/icon-3.png) left center no-repeat; background-size: 17px;">Linked to your specific visit request</li>
                </ul>
              </div>
              <!-- DISCLAIMER -->
              <p style="margin-top: 20px; font-size: 13px; color: #6A7C73; line-height :1.4;">Completing payment does not guarantee provider assignment. Your request will be reviewed and coordinated after payment is received.</p>
            </td>
          </tr>
          <!-- FOOTER -->
          <tr>
            <td style="padding:18px 24px; text-align: center; background: #FBFAF9; border-top:1px solid #E6ECE8;">
            <p style="margin:0; font-size:12px; color: #6A7C73;">Need help? Reply to this email or contact support.</p>
            <p style="margin: 6px 0 0; font-size: 11px; color: #9AA7A0;">
              © ${new Date().getFullYear()}, Rx Releaf. All rights reserved.
            </p>
            </td>
          </tr>
        </table>
      </div>`
    })

    return response

  } catch (error) {
    console.error("Email error:", error)
    throw error
  }
}

export async function sendMfaCodeEmail(email: string, code: string) {
  try {
    return await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "Your Rx Releaf verification code",
      html: `<div style="font-family: sans-serif; background: #F4F6F4; padding: 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; margin: 0 auto; background: #FFFFFF; border-radius: 10px; overflow: hidden;">
          <tr>
            <td style="padding: 28px 24px;">
              <h2 style="margin: 0 0 12px; color: #2E3833; font-size: 20px;">Verification code</h2>
              <p style="margin: 0 0 18px; color: #6A7C73; font-size: 14px; line-height: 1.5;">Use this code to finish signing in to Rx Releaf. It expires in 10 minutes.</p>
              <p style="letter-spacing: 8px; font-size: 28px; font-weight: 700; color: #2E3833; margin: 0 0 18px;">${code}</p>
              <p style="margin: 0; color: #6A7C73; font-size: 12px;">If you did not request this code, contact your administrator.</p>
            </td>
          </tr>
        </table>
      </div>`,
    })
  } catch {
    console.error("MFA email failed")
    throw new Error("Failed to send verification code")
  }
}
