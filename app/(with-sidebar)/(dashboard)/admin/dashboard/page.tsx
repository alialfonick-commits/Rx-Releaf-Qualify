"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"

export default function AdminDashboard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleCreateStaff = async () => {
    const res = await fetch("/api/admin/create-staff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error || "Something went wrong")
      return
    }

    alert("✅ Staff created successfully")

    // clear form
    setEmail("")
    setPassword("")
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <h2>Create Staff</h2>

      <input
        type="email"
        placeholder="Staff Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleCreateStaff}>
        Create Staff
      </button>

      <button onClick={() => signOut({ callbackUrl: "/login" })}>
        Logout
      </button>
    </div>
  )
}