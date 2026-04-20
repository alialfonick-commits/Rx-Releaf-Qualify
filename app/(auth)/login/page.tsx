"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getSession } from "next-auth/react"
import { ArrowRight, Eye, EyeOff, Lock, Mail, MoveLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (res?.error) {
      alert("Invalid email or password")
      return
    }
    await new Promise((r) => setTimeout(r, 200))
    const session = await getSession()

    if (session?.user.role === "ADMIN") {
      router.push("/admin/dashboard")
    } else if (session?.user.role === "STAFF") {
      router.push("/staff/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-[#F6F7F2] px-3">
      <div className="w-full max-w-md bg-white rounded-[20px] border border-[#D7DED3] sm:p-8 p-6 text-center [&_input]:w-full [&_input]:px-4 [&_input]:py-2 [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[#E2E7EE] [&_input]:focus:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-[#D39A05] [&_label]:items-center [&_label]:gap-2 [&_label]:text-[#222222] [&_label]:flex [&_label]:mb-2 [&_h1]:sm:text-3xl [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-[#2E2E2E] [&_h1]:mb-2 [&_p]:text-[#22222299] [&_p]:mb-6 [&_p]:max-sm:text-sm">

        <h1>
          Welcome Back
        </h1>
        <p>
          Sign in to your Rx Releaf account
        </p>

        <form onSubmit={handleLogin} className="space-y-5 text-left">

          <div>
            <label htmlFor="email">
              <Mail color="#708E86" size={18} /> Enter Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="someone@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">
              <Lock color="#708E86" size={18} /> Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="●●●●●●●"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#708E86] cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#6F8E86] text-white py-3 rounded-[10px] flex items-center justify-center gap-2 shadow-[0px_0px_8px_2px_#5ACCF24D] hover:bg-[#D39A05] cursor-pointer transition"
          >
            Log In <ArrowRight size={18} />
          </button>
        </form>
        <Link href="/" className="text-sm text-[#22222299] mt-4 font-medium flex justify-center items-center gap-2 hover:text-[#D39A05] transition">
          <MoveLeft color="#D39A05" size={24}/> Back to homepage
        </Link>

      </div>
    </div>
  )
}