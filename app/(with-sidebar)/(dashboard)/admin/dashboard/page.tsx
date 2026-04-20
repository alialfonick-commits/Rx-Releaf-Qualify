"use client"

import Navbar from "@/app/components/navbar"
import WelcomeBar from "@/app/components/welcomeBar"
import { Activity, AlertTriangle, Calendar, Clock, DollarSign, Folder, MapPin, User } from "lucide-react"
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
  <div>
    <Navbar />
    <WelcomeBar />

    {/* 📊 METRICS */}
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
      <Card title="Active Cases" value={metrics.activeCases} icon={Folder} />
      <Card title="Pending" value={metrics.pending} icon={AlertTriangle} />
      <Card title="Completed Today" value={metrics.completedToday}  icon={DollarSign} />
      <Card title="Phone Visits" value={metrics.phoneVisits} icon={Activity} />
    </div>

    {/* 📋 TABLE */}
    <h2 className="text-lg font-semibold text-[#2B363B] my-3 mb-2">
      Recent Visits
    </h2>

    <div className="border border-[#DCE5DF] rounded-xl overflow-hidden">
      
      {/* ✅ Responsive wrapper */}
      <div className="w-full overflow-x-auto">
        
        <table className="w-full min-w-225 text-sm">
          
          <thead className="bg-[#F4F6F44D] text-[#6A7C73] font-medium text-left">
            <tr>
              <th className="px-4 py-3">Visit ID</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="[&_tr]:border-t [&_tr]:border-[#EEF2EF] [&_tr]:hover:bg-gray-50">
            {visits.map((v: any) => (
              <tr key={v.id}>
                
                <td className="px-4 py-3 font-medium text-[#486B57]">
                  {v.id.slice(0, 6)}
                </td>

                <td className="px-4 py-3">
                <div className="flex items-center gap-1 text-[#2E3833]">
                  <User className="size-4 text-[#6A7C73]" />
                  {v.patient.firstName} {v.patient.lastName}
                </div>
              </td>

                <td className="px-4 py-3 capitalize text-[#2E3833]">
                  {v.consultationType}
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1 text-[13px] text-[#2E3833]">
                      <Calendar className="size-3.5 text-[#6A7C73]" />
                      {new Date(v.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] text-[#6A7C73]">
                      <Clock className="size-3.5" />
                      {new Date(v.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-[#2E3833]">
                  {v.providerName || "Pending"}
                </td>

                <td className="px-4 py-3">
                  {v.paymentStatus === "PAID" && (
                    <span className="bg-[#39AC6326] text-[#39AC63] px-3 py-1 rounded-full text-[13px] font-medium">
                      Paid
                    </span>
                  )}
                  {v.paymentStatus === "PENDING" && (
                    <span className="bg-[#EEB32B26] text-[#322A1B] px-3 py-1 rounded-full text-[13px] font-medium">
                      Pending
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-[#2E3833]">
                    <MapPin className="size-3.5 text-[#6A7C73]" />
                    {v.patientState}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {v.status === "IN_PROGRESS" && (
                    <span className="bg-[#DFA62026] text-[#322A1B] px-3 py-1 rounded-full text-[13px] font-medium">
                      In Progress
                    </span>
                  )}

                  {v.status === "COMPLETED" && (
                    <span className="bg-[#39AC6326] text-[#39AC63] px-3 py-1 rounded-full text-[13px] font-medium">
                      Completed
                    </span>
                  )}

                  {v.status === "PENDING" && (
                    <span className="bg-[#DFA62026] text-[#322A1B] px-1.5 py-1 rounded-full text-[12px] font-medium">
                      Pending Provider
                    </span>
                  )}

                  {v.status === "CANCELLED" && (
                    <span className="bg-[#D74242] text-white px-3 py-1 rounded-full text-[13px] font-medium">
                      Cancelled
                    </span>
                  )}

                  {v.status === "INVITED" && (
                    <span className="bg-[#3399CC26] text-[#3399CC] px-3 py-1 rounded-full text-[13px] font-medium">
                      Scheduled
                    </span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  </div>
)
}

function Card({ title, value, icon: Icon, }: { title: string; value: number; icon?: any }) {
  return (
   <div className="border border-[#DCE5DF] rounded-xl xl:px-4 xl:py-5 sm:p-4 p-2.5 bg-white flex max-[485px]:flex-col min-[485px]:items-center max-[485px]:gap-1.5 justify-between">

      {/* LEFT CONTENT */}
      <div className="max-[485px]:order-2">
        <span className="text-[13px] sm:text-[15px] text-[#6A7C73]">
          {title}
        </span>
        <h3 className="text-lg sm:text-2xl font-semibold text-[#2E3833] sm:mt-0.5">
          {value}
        </h3>
      </div>

      {/* RIGHT ICON */}
      <div className="max-[485px]:order-1 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
        <Icon size={20} className="text-gray-600" />
      </div>
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