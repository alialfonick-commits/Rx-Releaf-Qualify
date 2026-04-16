function formatDOB(dob: string | Date) {
    const date = new Date(dob)
  
    if (isNaN(date.getTime())) {
      throw new Error("Invalid DOB")
    }
  
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
  
    return `${year}-${month}-${day}`
  }
  
  export async function sendToQualiphy(data: {
    examId: number
    firstName: string
    lastName: string
    email: string
    phone: string
    state: string
    dob: string | Date
  }) {
    const response = await fetch("https://api.qualiphy.me/api/exam_invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: process.env.QUALIPHY_API_KEY,
        exams: data.examId,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_number: data.phone,
        tele_state: data.state,
        dob: formatDOB(data.dob)
      })
    })
  
    const result = await response.json()
  
    return result
  }