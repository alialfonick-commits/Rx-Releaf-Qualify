"use client"

import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch("/api/admin/dashboard")
    const json = await res.json()
    setData(json)
  }

  if (!data) return <p>Loading...</p>

  const { metrics, visits } = data

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      {/* 📊 METRICS */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <Card title="Active Cases" value={metrics.activeCases} />
        <Card title="Pending" value={metrics.pending} />
        <Card title="Completed Today" value={metrics.completedToday} />
        <Card title="Phone Visits" value={metrics.phoneVisits} />
      </div>

      {/* 📋 TABLE */}
      <h2>Recent Visits</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Visit ID</th>
            <th>Patient</th>
            <th>Type</th>
            <th>Date</th>
            <th>Provider</th>
            <th>Payment</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {visits.map((v: any) => (
            <tr key={v.id}>
              <td>{v.id.slice(0, 6)}</td>

              <td>
                {v.patient.firstName} {v.patient.lastName}
              </td>

              <td>{v.consultationType}</td>

              <td>{new Date(v.createdAt).toLocaleString()}</td>

              <td>{v.providerName || "-"}</td>

              <td>
                {v.paymentStatus === "PAID" && "✅"}
                {v.paymentStatus === "PENDING" && "🟡"}
              </td>

              <td>{v.patientState}</td>

              <td>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 10,
        minWidth: 150
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  )
}

// "use client"

// import { useState } from "react"
// import { signOut } from "next-auth/react"

// export default function AdminDashboard() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleCreateStaff = async () => {
//     const res = await fetch("/api/admin/create-staff", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ email, password })
//     })

//     const data = await res.json()

//     if (!res.ok) {
//       alert(data.error || "Something went wrong")
//       return
//     }

//     alert("✅ Staff created successfully")

//     // clear form
//     setEmail("")
//     setPassword("")
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Admin Dashboard</h1>

//       <h2>Create Staff</h2>

//       <input
//         type="email"
//         placeholder="Staff Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <br /><br />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={handleCreateStaff}>
//         Create Staff
//       </button>

//       <button onClick={() => signOut({ callbackUrl: "/login" })}>
//         Logout
//       </button>
//     </div>
//   )
// }