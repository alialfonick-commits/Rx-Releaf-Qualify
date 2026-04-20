"use client"

import { useEffect, useState } from "react"
import StaffTable from "@/app/components/staffTable"

export default function StaffPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch("/api/admin/staff")
    const json = await res.json()
    setData(json)
  }

  if (!data) return <p>Loading...</p>

  return (
    <div className="p-5 space-y-5">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Stat title="Total Staff" value={data.stats.total} />
        <Stat title="Active Staff" value={data.stats.active} />
        <Stat title="Inactive Staff" value={data.stats.inactive} />
      </div>

      {/* Table */}
      <StaffTable staff={data.staff} />

    </div>
  )
}

function Stat({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold">{value}</h2>
    </div>
  )
}