"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getSession } from "next-auth/react"
import { ArrowRight, Eye, EyeOff, KeyRound, Lock, Mail, MoveLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mfaCode, setMfaCode] = useState("")
  const [step, setStep] = useState<"credentials" | "mfa">("credentials")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    if (step === "credentials") {
      const res = await fetch("/api/auth/mfa/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      setIsSubmitting(false)

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error || "Invalid email or password.")
        return
      }

      setStep("mfa")
      return
    }

    const res = await signIn("credentials", {
      email,
      password,
      mfaCode,
      redirect: false,
    })

    setIsSubmitting(false)

    if (res?.error) {
      setError("Invalid verification code.")
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
        <h1>{step === "credentials" ? "Welcome Back" : "Check Your Email"}</h1>
        <p>
          {step === "credentials"
            ? "Sign in to your Rx Releaf account"
            : "Enter the verification code sent to your email"}
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
              disabled={step === "mfa" || isSubmitting}
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={step === "mfa" || isSubmitting}
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

          {step === "mfa" && (
            <div>
              <label htmlFor="mfaCode">
                <KeyRound color="#708E86" size={18} /> Verification Code
              </label>
              <input
                id="mfaCode"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="123456"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                disabled={isSubmitting}
              />
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-[#D7424233] bg-[#D742420D] px-3 py-2 text-sm font-medium text-[#D74242]"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || (step === "mfa" && mfaCode.length !== 6)}
            className="w-full bg-[#6F8E86] text-white py-3 rounded-[10px] flex items-center justify-center gap-2 shadow-[0px_0px_8px_2px_#5ACCF24D] hover:bg-[#D39A05] cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Please wait..." : step === "credentials" ? "Send Code" : "Log In"} <ArrowRight size={18} />
          </button>

          {step === "mfa" && (
            <button
              type="button"
              onClick={() => {
                setStep("credentials")
                setMfaCode("")
                setError("")
              }}
              className="w-full text-sm text-[#708E86] hover:text-[#D39A05] transition"
            >
              Use a different email or password
            </button>
          )}
        </form>

        <Link href="/" className="text-sm text-[#22222299] mt-4 font-medium flex justify-center items-center gap-2 hover:text-[#D39A05] transition">
          <MoveLeft color="#D39A05" size={24} /> Back to homepage
        </Link>
      </div>
    </div>
  )
}
