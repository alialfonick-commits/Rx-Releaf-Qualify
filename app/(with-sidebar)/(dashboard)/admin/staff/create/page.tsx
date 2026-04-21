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
<>
      {/* Header */}
      {/* <div className="flex items-center justify-between p-5 border-b border-[#F1F4F2]">
        <h2 className="text-xl font-bold text-[#2E3833]">Create New Staff</h2>
        
      </div> */}

      <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-[#6A7C73]">Full Name</label>
          <input
            className="w-full bg-[#F8FAF9] border border-[#DCE5DF] rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[#476B59] placeholder:text-[#6A7C73]/50 text-[#2E3833]"
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email & Phone Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[#6A7C73]">Email Address</label>
            <input
              className="w-full bg-[#F8FAF9] border border-[#DCE5DF] rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[#476B59] placeholder:text-[#6A7C73]/50 text-[#2E3833]"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[#6A7C73]">Phone Number</label>
            <input
              className="w-full bg-[#F8FAF9] border border-[#DCE5DF] rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[#476B59] placeholder:text-[#6A7C73]/50 text-[#2E3833]"
              placeholder="+1..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Password Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[#6A7C73]">Password</label>
            <input
              type="password"
              className="w-full bg-[#F8FAF9] border border-[#DCE5DF] rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[#476B59] text-[#2E3833]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[#6A7C73]">Confirm</label>
            <input
              type="password"
              className="w-full bg-[#F8FAF9] border border-[#DCE5DF] rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[#476B59] text-[#2E3833]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center justify-between py-2 border-t border-[#F1F4F2] mt-2">
          <span className="text-[15px] text-[#6A7C73] font-medium">Account Status</span>
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all ${
              isActive ? "bg-[#E7F5ED] text-[#39AC63]" : "bg-gray-100 text-gray-500"
            }`}
          >
            {isActive ? "ACTIVE" : "INACTIVE"}
          </button>
        </div>

        {/* Submit Button */}
        <button className="w-full cursor-pointer bg-[#D9A321] hover:bg-[#3a5849] text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm shadow-[#476B59]/20">
          Create Staff Member
        </button>
      </form>
    </>
  )
}