'use client'
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";



const VisitRequest = () => {
    const router = useRouter();
  return (
    <>
      <div className="bg-[#708E86] rounded-xl px-4 py-5 text-white flex max-lg:flex-col gap-2 max-lg:gap-4 lg:items-center items-start justify-between [&_strong]:font-medium sm:[&_strong]:text-[20px] [&_strong]:text-[18px] max-sm:[&_strong]:pb-1.25 max-sm:[&_strong]:leading-6 max-sm:[&_strong]:block mb-3 2xl:[&_p]:text-base sm:[&_p]:text-[15px] [&_p]:text-sm max-sm:[&_p]:leading-5 [&_p]:font-normal [&_p]:text-[#FFFFFFCC]">
        <div className="flex 2xl:gap-4 gap-3 max-sm:flex-col max-sm:items-start">
          <Phone size={50} color="#2E291F" className="bg-[#DFA620] lg:p-3 p-2 max-sm:p-2.5 rounded-xl max-xl:w-11 max-xl:h-11" />
          <div>
            <strong>Create Virtual Visit Request</strong>
            <p>Creates a virtual visit request for coordination. Visit is confirmed only after provider acceptance.</p>
          </div>
        </div>
        <button
         onClick={() => router.push('/staff/create-exam')}
          className="bg-[#DFA620] hover:bg-white transition-all bg-[url('/images/plussign.png')] bg-no-repeat bg-position-[left_12px_center] font-semibold sm:bg-size-[18px] bg-size-[16px] text-[#2E291F] 2xl:pl-9 pl-8 2xl:px-4 px-3 2xl:py-3 py-2.5 rounded-lg cursor-pointer max-sm:text-sm w-fit 2xl:text-base text-[15px]"
        >
          Create Request
        </button>

      </div>
    </>
  );
}
export default VisitRequest;