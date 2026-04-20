"use client"

import Navbar from "@/app/components/navbar"
import RecentVisit from "@/app/components/recentVisit"
import Stats from "@/app/components/stats"
import VisitRequest from "@/app/components/visitRequest"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"

export default function StaffDashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch("/api/staff/dashboard")
    const json = await res.json()
    setData(json)
  }

  if (!data) return <p>Loading...</p>

  const { stats } = data

  return (
  
    <>
      {/* <h1>Staff Dashboard</h1>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button> */}
      {/* Stats */}
      <Navbar />
      <VisitRequest />
      <Stats stats={data.stats} />
      <RecentVisit />
    </>
  )
}

function Card({ title, value }: any) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 20 }}>
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  )
}

// "use client"

// import { useEffect, useState } from "react"
// import { signOut } from "next-auth/react"
// import CaseTable from "@/app/components/staff/CaseTable"
// import Stats from "@/app/components/stats"
// import ResentCases from "@/app/components/recentCases"
// import RecentVisit from "@/app/components/recentVisit"

// export default function StaffDashboard() {
//   const [cases, setCases] = useState<any[]>([])

//   useEffect(() => {
//     fetchCases()
//   }, [])

//   const fetchCases = async () => {
//     const res = await fetch("/api/staff/cases")
//     const data = await res.json()
//     setCases(data)
//   }

//   const handleCreateExam = async () => {
//     await fetch("/api/staff/exams", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           firstName: "John",
//           lastName: "Doe",
//           email: "john@example.com",
//           phone: "1234567890",
//           dob: "1990-01-01",
//           birthSex: "MALE",
//           patientState: "CA",
//           treatment: "Basic Consultation"
//         })
//     })
  
//     fetchCases()
//   }

//   return (
//     <>
//       <div>
//         <h1>Staff Dashboard</h1>
//       </div>
//       <Stats />
//       <ResentCases />
//       <RecentVisit />
//       <div>
//         <h2>Cases</h2>

//         {cases.length === 0 ? (
//           <p>No cases yet</p>
//         ) : (
//           <CaseTable cases={cases} />
//         )}
//         <button onClick={handleCreateExam}>
//           Add Test Exam
//         </button>

//         <button onClick={() => signOut({ callbackUrl: "/login" })}>
//           Logout
//         </button>
//       </div>
//     </>
//   )
// }