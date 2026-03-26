"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

interface PaymentFormProps {
  amount: number
}

export default function PaymentForm({ amount }: PaymentFormProps) {
  const initialized = useRef(false)

  useEffect(() => {

    if (initialized.current) return
    initialized.current = true

    async function initSquare() {

      if (!(window as any).Square) {
        console.error("Square SDK not loaded")
        return
      }

      const payments = (window as any).Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APP_ID,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
      )

      const card = await payments.card()

      await card.attach("#card-container")

      const button = document.getElementById("pay-btn")

      if (!button) return

      button.addEventListener("click", async () => {

        const result = await card.tokenize()

        if (result.status !== "OK") {
          console.error("Tokenization failed")
          return
        }

        const res = await fetch("/api/pay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: result.token,
            amount
          })
        })

        const data = await res.json()
     
        if (data.success) {
          window.location.href = `/thank-you?orderId=${data.orderId}&amount=${data.amount}&date=${data.date}`
        } else {
          alert("Payment failed")
        }

      })

    }

    initSquare()

  }, [amount])

  return (
    <>
      <div id="card-container" className="col-span-12"></div>
      <Button
            
            className="bg-[#5E6E66] col-span-6 hover:bg-[#D39A05]"
          >
            Back
          </Button>
      <button
        id="pay-btn"
        className="bg-[#D39A05] hover:bg-[#5E6E66] col-span-6 text-white px-6 py-1! rounded"
      >
        Pay ${amount}
      </button>
    </>
  )
}