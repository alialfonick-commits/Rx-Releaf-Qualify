export async function sendPaymentEmail(email: string, link: string) {
    console.log(`
      Sending email to ${email}
  
      Please complete your payment:
      ${link}
    `)
  }