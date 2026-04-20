'use client'
import AdminStats from '@/app/components/adminStats'
import PaymentsTable from '@/app/components/paymentTable'
import { CheckCircle2, Clock, Folder, RotateCw } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function AdminDashboard () {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch('/api/admin/dashboard')
    const json = await res.json()
    setData(json)
  }

  if (!data) return <p>Loading...</p>

  return (
    <>
      {/* <button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</button> */}
      <AdminStats stats={data.stats} />
      <div className='grid grid-cols-12 gap-3.5 mt-3 items-start [&_strong]:font-medium [&_strong]:text-lg [&_strong]:text-[#2B3B33] '>
        {/* Execution Monitoring */}
        <div className='lg:col-span-8 col-span-12 mt-0 border border-[#D7DED3] rounded-xl p-4 h-111.5 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 bg-white'>
          <div className='flex items-center gap-4 mb-6'>
            {/* Icon Container */}
            <div className='flex items-center justify-center w-11 h-11 bg-[#D9E3D8] rounded-xl'>
              <Folder className='w-6 h-6 text-[#4A5D52]' />
            </div>

            {/* Text Content */}
            <div className='flex flex-col'>
              <strong>Execution Monitoring</strong>
              <p className='text-sm text-[#677E73]'>
                Real-time service execution status
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-2.5'>
            {data.monitoring.map((v: any) => {
              // Logic for Status Styles
              const isCompleted = v.status === 'Completed'
              const theme = isCompleted
                ? {
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50',
                    badge: 'bg-emerald-100 text-emerald-700',
                    label: 'Completed',
                    icon: <CheckCircle2 className='w-4.5 h-4.5' />
                  }
                : {
                    color: 'text-amber-600',
                    bg: 'bg-amber-50',
                    badge: 'bg-amber-100 text-amber-700',
                    label: 'Pending',
                    icon: <Clock className='w-4.5 h-4.5' />
                  }

              return (
                <div
                  key={v.id}
                  className='flex items-center justify-between max-[375px]:flex-col max-[375px]:items-start max-[375px]:gap-2 p-3 max-[375px]:p-2 bg-white border border-gray-200 rounded-xl'
                >
                  {/* Left Side: Icon & Patient Info */}
                  <div className='flex items-center gap-4 max-[375px]:gap-2'>
                    <div
                      className={`p-2.5 rounded-lg ${theme.bg} ${theme.color}`}
                    >
                      {theme.icon}
                    </div>
                    <div>
                      <h4 className='text-sm font-medium text-gray-800 leading-tight'>
                        {v.patient.firstName} {v.patient.lastName}
                      </h4>
                      <p className='text-[11px] text-gray-400 font-medium uppercase mt-0.5'>
                        Case # {v.id.slice(0, 6)}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Status Badge & Refresh Button */}
                  <div className='flex items-center gap-3 max-[375px]:self-end'>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-medium tracking-wider ${theme.badge}`}
                    >
                      {theme.label}
                    </span>
                    <button className='p-2 text-gray-400 hover:bg-gray-50 border border-gray-100 rounded-lg transition-colors'>
                      <RotateCw className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='lg:col-span-4 col-span-12 border border-[#D7DED3] rounded-xl p-3 h-fit bg-white'>
          <strong>Recent Activity</strong>
          <div className='h-96 overflow-auto mt-2 pr-3 pl-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            {data.activity.map((v: any, index: number) => (
              <div key={v.id} className='relative pl-8 pb-8 group'>
                {/* The Vertical Timeline Line */}
                {index !== data.activity.length - 1 && (
                  <div className='absolute left-1 top-2 w-0.5 h-full bg-gray-100' />
                )}

                {/* The Timeline Dot */}
                <div className='absolute left-0 top-1.5 w-6 h-6 flex items-center'>
                  <div className='w-2.5 h-2.5 rounded-full bg-slate-500 ring-4 ring-white' />
                </div>

                {/* Content Container */}
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1'>
                  <div className='flex-1'>
                    {/* Title / Action */}
                    <h4 className='text-[15px] font-medium text-slate-800 leading-snug capitalize!'>
                      {v.status}
                    </h4>

                    {/* Subtitle: Doctor/User and Case ID */}
                    <div className='flex items-center gap-2 mt-0.5 text-xs text-slate-400 font-medium'>
                      <span>
                        by {v.patient.firstName} {v.patient.lastName}
                      </span>
                      <span className='text-slate-300'>•</span>
                      <span className='text-teal-600 font-semibold uppercase tracking-tight'>
                        CASE-{v.id.slice(0, 7)}
                      </span>
                    </div>

                    {/* Description Description */}
                    <p className='mt-1 text-xs text-slate-500 leading-relaxed'>
                      {v.status === 'Completed'
                        ? `Successfully processed the transaction for this patient record.`
                        : `The payment is currently awaiting processing or manual intervention.`}
                    </p>
                  </div>

                  {/* Timestamp - Responsive: shifts to top right on desktop */}
                  <div className='text-[12px] text-slate-400 whitespace-nowrap pt-1'>
                    8 min ago
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {data.activity.length === 0 && (
              <p className='text-sm text-gray-400 italic py-4'>
                No recent activity recorded.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className='pt-3'>
        <PaymentsTable payment={data.paymentsList} />
      </div>
    </>
  )
}
function Section ({ title, children }: any) {
  return (
    <div className='bg-white p-4 rounded-xl border'>
      <h2 className='font-semibold mb-3'>{title}</h2>
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
