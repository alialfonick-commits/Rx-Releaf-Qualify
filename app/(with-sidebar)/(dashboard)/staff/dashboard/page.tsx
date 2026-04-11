"use client"

import { useEffect, useState } from "react"
import { signOut } from "next-auth/react"
import CaseTable from "@/app/components/staff/CaseTable"

export default function StaffDashboard() {
  const [cases, setCases] = useState<any[]>([])

  useEffect(() => {
    fetchCases()
  }, [])

  const fetchCases = async () => {
    const res = await fetch("/api/staff/cases")
    const data = await res.json()
    setCases(data)
  }

  const handleCreateExam = async () => {
    await fetch("/api/staff/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "1234567890",
          dob: "1990-01-01",
          birthSex: "MALE",
          patientState: "CA",
          treatment: "Basic Consultation"
        })
    })
  
    fetchCases()
  }

  return (
    <div>
      <h1>Staff Dashboard</h1>

      <h2>Cases</h2>

      {cases.length === 0 ? (
        <p>No cases yet</p>
      ) : (
        <CaseTable cases={cases} />
      )}
      <button onClick={handleCreateExam}>
        Add Test Exam
      </button>

      <button onClick={() => signOut({ callbackUrl: "/login" })}>
        Logout
      </button>
    </div>
  )
}