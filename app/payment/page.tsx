import SideBar from "../components/sidebar/sideBar"
import Checkout from "../patientDashboard/checkout"

export default function PaymentPage() {
 return (
  <>
    <SideBar />
    <div className="bg-[#F6F7F2] px-4 py-2 shadow-[1px_0px_10px_4px_#00000021] max-md:pt-13! max-md:p-2! overflow-y-auto w-full">
      <Checkout />
    </div>
  </>
 )
}