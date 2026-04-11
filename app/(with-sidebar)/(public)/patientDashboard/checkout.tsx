'use client'
import { Check, Shield } from "lucide-react";
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import PaymentForm from "@/app/(with-sidebar)/(public)/patientDashboard/PaymentForm"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Checkout() {

 const visit = useSelector((state:RootState)=>state.visit)
 const [isHydrated, setIsHydrated] = useState(false)
 const router = useRouter()

 useEffect(() => {
  setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated && !visit.packagePrice) {
      router.push("/")
    }
  }, [isHydrated, visit.packagePrice])

 const platformFee = 5
 const total = visit.packagePrice + platformFee

  return (
    <>

      <div className="max-w-170 px-3.75 mx-auto [&_strong]:font-semibold">
        <div className="border border-[#D7DED3] bg-white shadow-[0px_1px_2px_0px_#0000000D] px-5 py-6 rounded-xl [&_strong]:text-xl [&_p]:text-[#677E73] [&_p]:text-sm">
          <strong>Order Summary</strong>
          <div className="flex justify-between pt-5 [&_span]:font-semibold">
            <div className="[&_span]:font-medium!">
              <span>Urgent Care Consultation + Prescription</span>
              <p>Licensed provider consultation</p>
            </div>
            <span>${visit.packagePrice}</span>
          </div>
          <div className="bg-[#D7DED3] h-px mt-2"></div>
          <div className="flex justify-between items-center pt-5 text-sm">
            <p>Platform Fee</p>
            <span>${platformFee}</span>
          </div>
          <div className="bg-[#D7DED3] h-px mt-2"></div>
          <div className="flex justify-between items-center pt-4.5 [&_strong]:text-xl [&_span]:text-xl [&_span]:font-bold [&_span]:text-[#D39A05]">
            <strong>Total</strong>
            <span>${total}</span>
          </div>
        </div>

        <div className="p-5 mt-6 rounded-xl bg-[#CCD7C680] [&_li]:flex [&_li]:items-center [&_li]:mt-2 [&_li]:gap-3 [&_li]:text-[15px] [&_li>svg]:size-[18] [&_li>svg]:bg-[#5E6E6633] [&_li>svg]:p-1 [&_li>svg]:rounded-full">
          <strong>What's Included</strong>
          <ul>
            <li><Check />Licensed provider review within minutes</li>
            <li><Check />Prescription sent directly to your pharmacy</li>
            <li><Check />Follow-up support if needed</li>
            <li><Check />HIPAA-compliant secure platform</li>
          </ul>
        </div>

        <div className="flex justify-center items-center gap-1.5 pt-6 text-[#677E73] text-[15px]">
          <Shield size={16} />
          <p>Secure checkout powered by industry-standard encryption</p>
        </div>

        <div className="grid grid-cols-12 gap-3 pt-6 [&_Button]:py-6 [&_Button]:w-full [&_Button]:text-white [&_Button]:cursor-pointer">
          <PaymentForm amount={total} />

        </div>
      </div>
    </>
  );
}