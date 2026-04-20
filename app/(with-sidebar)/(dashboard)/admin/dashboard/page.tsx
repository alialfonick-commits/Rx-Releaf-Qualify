"use client"
import AdminStats from "@/app/components/adminStats"
import PaymentsTable from "@/app/components/paymentTable"
import { signOut } from "next-auth/react"
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

  return (
    <>
    <button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
      <AdminStats stats={data.stats}/>
      {/* Execution Monitoring */}
      <Section title="Execution Monitoring">
          {data.monitoring.map((v: any) => (
            <div key={v.id} className="flex justify-between border-b py-2">
              <span>{v.patient.firstName} {v.patient.lastName}</span>
              <span>{v.id.slice(0, 6)}</span>
              <span>{v.status}</span>
            </div>
          ))}
        </Section>

        {/* Recent Activity */}
        <Section title="Recent Activity">
          {data.activity.map((v: any) => (
            <div key={v.id} className="border-b py-2">
              {v.patient.firstName} → {v.status}
            </div>
          ))}
        </Section>
      <div className="pt-3">
        <PaymentsTable payment={data.paymentsList} />
      </div>
    </>
  )
}
function Section({ title, children }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <h2 className="font-semibold mb-3">{title}</h2>
      {children}
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