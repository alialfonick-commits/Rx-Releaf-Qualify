"use client"

import { useState } from "react"

export default function CreateStaffForm({ onSuccess }: any) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isActive, setIsActive] = useState(true)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch("/api/admin/staff/create-staff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        isActive
      })
    })

    const data = await res.json()

    if (data.error) {
      alert(data.error)
      return
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
    }

    alert("Staff created successfully")

    setName("")
    setEmail("")
    setPhone("")
    setPassword("")

    onSuccess && onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border space-y-3">

      <h2 className="font-semibold">Create Staff</h2>

      <input
        className="border p-2 w-full"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

    <input
    type="password"
    className="border p-2 w-full"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    />
    <div className="flex items-center justify-between">
  <span>Status</span>

  <button
    type="button"
    onClick={() => setIsActive(!isActive)}
    className={`px-4 py-1 rounded-full text-white ${
      isActive ? "bg-green-600" : "bg-gray-400"
    }`}
  >
    {isActive ? "Active" : "Inactive"}
  </button>
</div>

      <button className="bg-[#476B59] text-white px-4 py-2 rounded">
        Create Staff
      </button>
    </form>
  )
}