type Case = {
    id: string
    treatment: string
    paymentStatus: "PENDING" | "PAID" | "FAILED"
    patient: {
      firstName: string
      lastName: string
    }
  }
  
  export default function CaseTable({ cases }: { cases: Case[] }) {
    return (
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Treatment</th>
            <th>Status</th>
          </tr>
        </thead>
  
        <tbody>
          {cases.map((c) => (
            <tr key={c.id}>
              <td>
                {c.patient.firstName} {c.patient.lastName}
              </td>
  
              <td>{c.treatment}</td>
  
              <td>
                {c.paymentStatus === "PAID" && "✅ Paid"}
                {c.paymentStatus === "PENDING" && "🟡 Pending"}
                {c.paymentStatus === "FAILED" && "❌ Failed"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }