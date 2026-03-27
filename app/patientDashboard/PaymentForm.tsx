"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearVisit } from "@/store/visitSlice"
import { persistor, RootState } from "@/store/store"
import { useRouter } from "next/navigation"

interface PaymentFormProps {
  amount: number
}

export default function PaymentForm({ amount }: PaymentFormProps) {
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const router = useRouter()
  const visit = useSelector((state: RootState) => state.visit)
  const patient = useSelector((state: RootState) => state.patient)
  

  const initialized = useRef(false)
  const cardRef = useRef<any>(null)

  const dispatch = useDispatch()

  // ✅ wait for Square SDK
  const waitForSquare = async () => {
    return new Promise<any>((resolve, reject) => {
      const start = Date.now()

      const interval = setInterval(() => {
        if ((window as any).Square) {
          clearInterval(interval)
          resolve((window as any).Square)
        }

        if (Date.now() - start > 5000) {
          clearInterval(interval)
          reject("Square SDK load timeout")
        }
      }, 50)
    })
  }

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    async function initSquare() {
      try {
        const Square = await waitForSquare()

        const payments = Square.payments(
          process.env.NEXT_PUBLIC_SQUARE_APP_ID,
          process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
        )

        const card = await payments.card()
        await card.attach("#card-container")

        cardRef.current = card

        // small delay for smooth UI
        setTimeout(() => setLoading(false), 150)
      } catch (err) {
        console.error("Square init failed:", err)
        setLoading(false)
      }
    }

    initSquare()
  }, [])

  // payment handler
  const handlePayment = async () => {
    if (paying || !cardRef.current) return

    setPaying(true)

    const result = await cardRef.current.tokenize()

    if (result.status !== "OK") {
      console.error("Tokenization failed")
      setPaying(false)
      return
    }

    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: result.token,
          amount,
          visit,
          patient
        })
      })

      const data = await res.json()

      if (data.success) {
        //  clear redux
        window.location.href = `/thank-you?orderId=${data.orderId}&amount=${data.amount}&date=${data.date}`
        
        dispatch(clearVisit())

        // clear persisted store (important)
        await persistor.purge()

      } else {
        alert("Payment failed")
        setPaying(false)
      }
    } catch (err) {
      console.error(err)
      setPaying(false)
    }
  }

  return (
    <>
      {/* Card Container + Skeleton */}
      <div className="col-span-12 relative h-[56px] overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-[9999]">
            <Skeleton className="h-full w-full rounded-md bg-gray-200" />
          </div>
        )}

        <div
          id="card-container"
          className={`h-full w-full ${loading ? "invisible" : "visible"}`}
        />
      </div>

      {/* Back Button */}
      <Button
       onClick={() => router.push("/")}
       className="bg-[#5E6E66] col-span-6 hover:bg-[#D39A05]">
        Back
      </Button>

      {/* Pay Button */}
      <Button
        onClick={handlePayment}
        disabled={loading || paying}
        className="bg-[#D39A05] hover:bg-[#5E6E66] col-span-6 text-white px-6 rounded disabled:opacity-50 flex items-center justify-center"
      >
        {paying ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Processing...
          </span>
        ) : (
          `Pay $${amount}`
        )}
      </Button>
    </>
  )
}