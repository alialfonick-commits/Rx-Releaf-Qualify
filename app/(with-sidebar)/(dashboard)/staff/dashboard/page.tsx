"use client"

import Navbar from "@/app/components/navbar"
import RecentVisit from "@/app/components/recentVisit"
import Stats from "@/app/components/stats"
import VisitRequest from "@/app/components/visitRequest"
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

  return (
  
    <>
      <Navbar title="Staff Dashboard" subtitle="Create and manage virtual visit requests" />
      <VisitRequest />
      <Stats stats={data.stats} />
      <RecentVisit />
    </>
  )
}